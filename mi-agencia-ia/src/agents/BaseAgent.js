/**
 * BaseAgent - Clase padre para todos los agentes del sistema
 * 
 * Define el contrato que deben implementar todos los agentes especializados.
 * Proporciona funcionalidad común como validación, logging y manejo de errores.
 */
class BaseAgent {
  constructor(agentId, taskManager, promptManager, costOptimizer) {
    this.agentId = agentId;
    this.taskManager = taskManager;
    this.promptManager = promptManager;
    this.costOptimizer = costOptimizer;
    
    // Configuración por defecto
    this.config = {
      maxRetries: 3,
      timeoutMs: 30000,
      enableCache: true,
      defaultModel: 'gpt-3.5-turbo'
    };
    
    // Métricas del agente
    this.metrics = {
      tasksProcessed: 0,
      successfulTasks: 0,
      failedTasks: 0,
      totalExecutionTime: 0,
      totalCost: 0
    };
  }

  /**
   * Método principal que procesa una tarea
   * Este método debe ser implementado por cada agente especializado
   * @param {Object} task - Tarea a procesar
   * @returns {Object} Resultado de la tarea
   */
  async processTask(task) {
    throw new Error(`processTask must be implemented by ${this.constructor.name}`);
  }

  /**
   * Valida que una tarea sea compatible con este agente
   * @param {Object} task - Tarea a validar
   * @throws {Error} Si la tarea no es válida
   */
  validateTask(task) {
    if (!task) {
      throw new Error('Task is required');
    }
    
    if (!task.taskId) {
      throw new Error('Task must have a taskId');
    }
    
    if (task.targetAgent !== this.agentId) {
      throw new Error(`Task is not assigned to this agent. Expected: ${this.agentId}, Got: ${task.targetAgent}`);
    }
    
    if (!task.input?.prompt) {
      throw new Error('Task must have input.prompt');
    }
  }

  /**
   * Ejecuta una llamada a la IA con optimización de costos
   * @param {string} prompt - Prompt a ejecutar
   * @param {Object} context - Contexto adicional
   * @param {Object} options - Opciones de ejecución
   * @returns {Object} Resultado de la IA
   */
  async executeWithAI(prompt, context = {}, options = {}) {
    const startTime = Date.now();
    
    try {
      // 1. Verificar caché si está habilitado
      if (this.config.enableCache && this.costOptimizer) {
        const cacheResult = await this.costOptimizer.checkCache({
          targetAgent: this.agentId,
          input: { prompt, context }
        });
        
        if (cacheResult.hit) {
          console.log(`Cache hit for ${this.agentId}: ${cacheResult.type}`);
          return {
            ...cacheResult.data.result,
            fromCache: true,
            cacheType: cacheResult.type
          };
        }
      }

      // 2. Seleccionar modelo óptimo
      const selectedModel = this.costOptimizer ? 
        await this.costOptimizer.selectModel({
          targetAgent: this.agentId,
          input: { prompt, context },
          metadata: options
        }) : this.config.defaultModel;

      // 3. Ejecutar con el modelo seleccionado
      const result = await this.callAIModel(selectedModel, prompt, context, options);
      
      // 4. Calcular métricas
      const duration = (Date.now() - startTime) / 1000;
      const execution = {
        agentId: this.agentId,
        modelUsed: selectedModel,
        duration,
        tokensConsumed: result.tokensUsed || 0,
        cost: result.cost || 0,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date().toISOString()
      };

      // 5. Guardar en caché
      if (this.config.enableCache && this.costOptimizer) {
        await this.costOptimizer.saveToCache({
          targetAgent: this.agentId,
          input: { prompt, context }
        }, result);
      }

      // 6. Actualizar métricas del agente
      this.updateMetrics(execution, true);

      return { ...result, execution };
      
    } catch (error) {
      const duration = (Date.now() - startTime) / 1000;
      this.updateMetrics({ duration, cost: 0 }, false);
      
      console.error(`Error in ${this.agentId}.executeWithAI:`, error);
      throw error;
    }
  }

  /**
   * Realiza la llamada al modelo de IA específico
   * @param {string} model - Modelo a usar
   * @param {string} prompt - Prompt
   * @param {Object} context - Contexto
   * @param {Object} options - Opciones
   * @returns {Object} Respuesta del modelo
   */
  async callAIModel(model, prompt, context, options) {
    // Por ahora simulamos la llamada a la IA
    // En una implementación real, aquí iría la integración con OpenAI/Anthropic
    
    const mockResponse = {
      data: `Respuesta simulada de ${model} para el agente ${this.agentId}`,
      explanation: `Este es un resultado mock para el prompt: ${prompt.substring(0, 100)}...`,
      confidenceScore: 0.85 + Math.random() * 0.15,
      alternativeSolutions: [],
      warnings: [],
      tokensUsed: Math.floor(Math.random() * 1000) + 500,
      cost: (Math.random() * 0.05) + 0.01
    };
    
    // Simular tiempo de procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    return mockResponse;
  }

  /**
   * Actualiza las métricas del agente
   * @param {Object} execution - Datos de ejecución
   * @param {boolean} success - Si fue exitoso
   */
  updateMetrics(execution, success) {
    this.metrics.tasksProcessed++;
    this.metrics.totalExecutionTime += execution.duration;
    this.metrics.totalCost += execution.cost || 0;
    
    if (success) {
      this.metrics.successfulTasks++;
    } else {
      this.metrics.failedTasks++;
    }
  }

  /**
   * Obtiene las métricas actuales del agente
   * @returns {Object} Métricas del agente
   */
  getMetrics() {
    return {
      ...this.metrics,
      successRate: this.metrics.tasksProcessed > 0 ? 
        this.metrics.successfulTasks / this.metrics.tasksProcessed : 0,
      avgExecutionTime: this.metrics.tasksProcessed > 0 ? 
        this.metrics.totalExecutionTime / this.metrics.tasksProcessed : 0,
      avgCost: this.metrics.tasksProcessed > 0 ? 
        this.metrics.totalCost / this.metrics.tasksProcessed : 0
    };
  }

  /**
   * Prepara el contexto para el prompt
   * @param {Object} task - Tarea actual
   * @returns {Object} Contexto preparado
   */
  prepareContext(task) {
    return {
      agentId: this.agentId,
      taskId: task.taskId,
      priority: task.priority,
      ...task.input.context,
      currentDate: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    };
  }

  /**
   * Maneja errores de forma consistente
   * @param {Error} error - Error ocurrido
   * @param {Object} task - Tarea que causó el error
   * @returns {Object} Resultado de error estructurado
   */
  handleError(error, task) {
    console.error(`Error in ${this.agentId} processing task ${task.taskId}:`, error);
    
    return {
      data: null,
      explanation: `Error procesando la tarea: ${error.message}`,
      confidenceScore: 0,
      alternativeSolutions: [],
      warnings: [`Error: ${error.message}`],
      error: {
        type: error.constructor.name,
        message: error.message,
        stack: error.stack
      }
    };
  }

  /**
   * Registra el progreso de una tarea
   * @param {Object} task - Tarea en progreso
   * @param {string} status - Nuevo estado
   * @param {Object} details - Detalles adicionales
   */
  async updateTaskProgress(task, status, details = {}) {
    if (this.taskManager) {
      await this.taskManager.updateTaskStatus(task.taskId, status, {
        agent: this.agentId,
        ...details
      });
    }
  }

  /**
   * Finaliza el procesamiento de una tarea
   * @param {Object} task - Tarea procesada
   * @param {Object} result - Resultado obtenido
   */
  async completeTask(task, result) {
    if (this.taskManager) {
      await this.taskManager.setTaskOutput(task.taskId, result, result.execution);
    }
  }

  /**
   * Método de utilidad para crear subtareas
   * @param {Object} parentTask - Tarea padre
   * @param {string} targetAgent - Agente objetivo
   * @param {string} prompt - Prompt para la subtarea
   * @param {Object} additionalContext - Contexto adicional
   * @returns {Object} Subtarea creada
   */
  async createSubtask(parentTask, targetAgent, prompt, additionalContext = {}) {
    if (!this.taskManager) {
      throw new Error('TaskManager not available for creating subtasks');
    }

    return await this.taskManager.createTask({
      projectId: parentTask.projectId,
      requesterAgent: this.agentId,
      targetAgent,
      input: {
        prompt,
        context: {
          ...parentTask.input.context,
          ...additionalContext,
          parentTaskId: parentTask.taskId
        },
        data: parentTask.input.data
      },
      priority: parentTask.priority,
      parentTaskId: parentTask.taskId
    });
  }

  /**
   * Obtiene la configuración específica del agente
   * Debe ser sobrescrito por agentes especializados
   * @returns {Object} Configuración del agente
   */
  getAgentConfig() {
    return {
      agentId: this.agentId,
      type: 'base',
      capabilities: ['basic_processing'],
      supportedTaskTypes: ['generic'],
      requiredContext: ['prompt']
    };
  }
}

export default BaseAgent;