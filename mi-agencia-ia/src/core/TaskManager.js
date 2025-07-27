import { v4 as uuidv4 } from 'uuid';
import { validateTask } from './taskValidator.js';

/**
 * TaskManager - Gestiona el ciclo de vida completo de las tareas
 * 
 * Responsabilidades:
 * - Crear y validar tareas según el schema definido
 * - Mantener el historial completo de cambios
 * - Gestionar el estado y transiciones de las tareas
 * - Implementar el bucle de corrección automático
 * - Generar métricas de rendimiento
 */
class TaskManager {
  constructor(db, eventBus) {
    this.db = db;
    this.eventBus = eventBus;
    
    // Configuración de umbrales de confidence
    this.confidenceThresholds = {
      completed: 0.9,
      needsValidation: 0.7,
      failed: 0.0
    };
  }

  /**
   * Crea una nueva tarea siguiendo el schema v1.0
   * @param {Object} taskData - Datos de la tarea
   * @returns {Object} La tarea creada
   */
  async createTask({
    projectId,
    requesterAgent,
    targetAgent,
    input,
    priority = 5,
    parentTaskId = null
  }) {
    const task = {
      taskId: uuidv4(),
      projectId,
      parentTaskId,
      status: 'pending',
      priority,
      requesterAgent,
      targetAgent,
      input,
      output: null,
      execution: {},
      history: [{
        timestamp: new Date().toISOString(),
        agent: 'system',
        action: 'task_created',
        details: { requesterAgent, targetAgent }
      }],
      humanFeedback: null,
      metadata: {
        version: '1.0',
        environment: process.env.NODE_ENV || 'development',
        tenantId: projectId, // Por ahora usamos projectId como tenant
        tags: []
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Validar contra el schema
    const validation = validateTask(task);
    if (!validation.valid) {
      throw new Error(`Invalid task: ${validation.errors.join(', ')}`);
    }

    // Guardar en DB
    await this.db.tasks.insert(task);

    // Emitir evento
    this.eventBus.emit('task:created', task);

    return task;
  }

  /**
   * Obtiene una tarea por su ID
   * @param {string} taskId - ID de la tarea
   * @returns {Object|null} La tarea o null si no existe
   */
  async getTask(taskId) {
    return await this.db.tasks.findOne({ taskId });
  }

  /**
   * Actualiza el estado de una tarea
   * @param {string} taskId - ID de la tarea
   * @param {string} newStatus - Nuevo estado
   * @param {Object} details - Detalles adicionales
   * @returns {Object} La tarea actualizada
   */
  async updateTaskStatus(taskId, newStatus, details = {}) {
    const task = await this.db.tasks.findOne({ taskId });
    if (!task) throw new Error(`Task ${taskId} not found`);

    const oldStatus = task.status;
    task.status = newStatus;
    task.updatedAt = new Date().toISOString();

    // Agregar al historial
    task.history.push({
      timestamp: new Date().toISOString(),
      agent: details.agent || 'system',
      action: `status_changed_${oldStatus}_to_${newStatus}`,
      details
    });

    await this.db.tasks.update({ taskId }, task);

    // Emitir evento específico según el nuevo estado
    this.eventBus.emit(`task:${newStatus}`, task);
    
    // Si necesita validación, agregarlo a la cola de validación
    if (newStatus === 'needs_validation') {
      await this.addToValidationQueue(task);
    }

    return task;
  }

  /**
   * Registra el output de un agente
   * @param {string} taskId - ID de la tarea
   * @param {Object} output - Output del agente
   * @param {Object} execution - Datos de ejecución
   * @returns {Object} La tarea actualizada
   */
  async setTaskOutput(taskId, output, execution) {
    const task = await this.db.tasks.findOne({ taskId });
    if (!task) throw new Error(`Task ${taskId} not found`);

    task.output = output;
    task.execution = execution;
    task.updatedAt = new Date().toISOString();

    // Determinar siguiente estado basado en confidence
    let newStatus = 'completed';
    if (output.confidenceScore <= this.confidenceThresholds.failed) {
      newStatus = 'failed';
    } else if (output.confidenceScore < this.confidenceThresholds.completed) {
      newStatus = 'needs_validation';
    }
    
    task.history.push({
      timestamp: new Date().toISOString(),
      agent: execution.agentId || 'unknown',
      action: 'output_generated',
      details: {
        confidenceScore: output.confidenceScore,
        tokensUsed: execution.tokensConsumed,
        modelUsed: execution.modelUsed
      }
    });

    await this.db.tasks.update({ taskId }, task);
    await this.updateTaskStatus(taskId, newStatus, { agent: execution.agentId });

    return task;
  }

  /**
   * Implementa el bucle de corrección con feedback humano
   * @param {string} taskId - ID de la tarea
   * @param {Object} feedback - Feedback del revisor
   * @returns {Object} Tarea original o nueva tarea de corrección
   */
  async applyHumanFeedback(taskId, feedback) {
    const task = await this.db.tasks.findOne({ taskId });
    if (!task) throw new Error(`Task ${taskId} not found`);

    task.humanFeedback = {
      ...feedback,
      reviewTime: new Date().toISOString()
    };

    if (!feedback.wasApproved && feedback.correction) {
      // Crear nueva tarea con la corrección
      const correctionTask = await this.createTask({
        projectId: task.projectId,
        requesterAgent: 'human',
        targetAgent: task.targetAgent,
        input: {
          prompt: `
La tarea anterior fue rechazada. Feedback del revisor: "${feedback.correction}"

Por favor, intenta de nuevo teniendo en cuenta esta corrección.

Tarea original: ${task.input.prompt}
`,
          context: {
            ...task.input.context,
            previousAttempt: task.output,
            humanFeedback: feedback.correction
          },
          data: task.input.data
        },
        priority: task.priority + 1, // Mayor prioridad para correcciones
        parentTaskId: task.taskId
      });

      // Marcar tarea original como corregida
      await this.updateTaskStatus(taskId, 'cancelled', {
        agent: 'human',
        reason: 'needs_correction',
        correctionTaskId: correctionTask.taskId
      });

      return correctionTask;
    } else if (feedback.wasApproved) {
      await this.updateTaskStatus(taskId, 'completed', {
        agent: 'human',
        validatedBy: feedback.reviewerId
      });
    }

    await this.db.tasks.update({ taskId }, task);
    return task;
  }

  /**
   * Obtiene tareas pendientes para un agente específico
   * @param {string} agentId - ID del agente
   * @param {number} limit - Límite de tareas a retornar
   * @returns {Array} Lista de tareas pendientes
   */
  async getTasksForAgent(agentId, limit = 10) {
    return await this.db.tasks.find({
      targetAgent: agentId,
      status: { $in: ['pending', 'queued'] }
    })
    .sort({ priority: -1, createdAt: 1 })
    .limit(limit);
  }

  /**
   * Calcula métricas de rendimiento para un agente
   * @param {string} agentId - ID del agente
   * @param {string} timeRange - Rango de tiempo ('24h', '7d', '30d')
   * @returns {Object} Métricas del agente
   */
  async getAgentMetrics(agentId, timeRange = '24h') {
    const since = new Date();
    if (timeRange === '24h') since.setHours(since.getHours() - 24);
    else if (timeRange === '7d') since.setDate(since.getDate() - 7);
    else if (timeRange === '30d') since.setDate(since.getDate() - 30);

    const tasksQuery = await this.db.tasks.find({
      targetAgent: agentId,
      updatedAt: { $gte: since.toISOString() },
      status: { $in: ['completed', 'failed', 'needs_validation'] }
    });
    
    const tasks = tasksQuery.sort ? await tasksQuery.sort({}).limit(1000) : (Array.isArray(tasksQuery) ? tasksQuery : []);

    const completedTasks = tasks.filter(t => t.status === 'completed');
    const failedTasks = tasks.filter(t => t.status === 'failed');
    const needsValidationTasks = tasks.filter(t => t.status === 'needs_validation');
    const tasksWithFeedback = tasks.filter(t => t.humanFeedback);
    const approvedTasks = tasksWithFeedback.filter(t => t.humanFeedback.wasApproved);

    return {
      totalTasks: tasks.length,
      completedTasks: completedTasks.length,
      failedTasks: failedTasks.length,
      needsValidation: needsValidationTasks.length,
      avgConfidence: tasks
        .filter(t => t.output?.confidenceScore)
        .reduce((sum, t) => sum + t.output.confidenceScore, 0) / tasks.length || 0,
      avgExecutionTime: tasks
        .filter(t => t.execution?.duration)
        .reduce((sum, t) => sum + t.execution.duration, 0) / tasks.length || 0,
      totalCost: tasks
        .filter(t => t.execution?.cost)
        .reduce((sum, t) => sum + t.execution.cost, 0),
      humanApprovalRate: tasksWithFeedback.length > 0 ? 
        approvedTasks.length / tasksWithFeedback.length : 0,
      successRate: tasks.length > 0 ? completedTasks.length / tasks.length : 0
    };
  }

  /**
   * Agrega una tarea a la cola de validación
   * @param {Object} task - Tarea que necesita validación
   */
  async addToValidationQueue(task) {
    // Emitir evento para notificar que hay una tarea para validar
    this.eventBus.emit('validation:required', {
      taskId: task.taskId,
      priority: task.priority,
      reason: task.output?.confidenceScore < this.confidenceThresholds.completed ? 
        'low_confidence' : 'agent_request'
    });
  }

  /**
   * Obtiene el historial de feedback para análisis de patrones
   * @param {string} taskId - ID de la tarea
   * @returns {Array} Historial de feedback relacionado
   */
  async getFeedbackHistory(taskId) {
    const task = await this.getTask(taskId);
    const feedbackHistory = [];
    
    // Recorrer el historial de la tarea
    for (const historyItem of task.history) {
      if (historyItem.action.includes('feedback') || historyItem.action.includes('correction')) {
        feedbackHistory.push(historyItem);
      }
    }
    
    // Si tiene tarea padre, incluir su feedback también
    if (task.parentTaskId) {
      const parentFeedback = await this.getFeedbackHistory(task.parentTaskId);
      feedbackHistory.unshift(...parentFeedback);
    }
    
    return feedbackHistory;
  }

  /**
   * Busca tareas similares exitosas para referencia
   * @param {Object} task - Tarea actual
   * @returns {Array} Tareas similares exitosas
   */
  async findSuccessfulSimilarTasks(task) {
    return await this.db.tasks.find({
      targetAgent: task.targetAgent,
      status: 'completed',
      'humanFeedback.wasApproved': true,
      projectId: task.projectId
    })
    .sort({ 'humanFeedback.rating': -1 })
    .limit(5);
  }
}

export default TaskManager;