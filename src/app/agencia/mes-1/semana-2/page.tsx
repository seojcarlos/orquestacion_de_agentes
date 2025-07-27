'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, CheckCircle, Circle, Code, FileCode, Terminal, Clock, Brain, Star, Flask, Database } from 'lucide-react'

interface Ejercicio {
  id: string
  titulo: string
  descripcion: string
  codigo?: string
  solucion?: string
  tipo: 'concepto' | 'practica' | 'proyecto'
  dificultad: 'facil' | 'medio' | 'dificil'
  tiempo: number
  completado: boolean
}

export default function Semana2Page() {
  const [progreso, setProgreso] = useState(0)
  const [ejerciciosCompletados, setEjerciciosCompletados] = useState<Set<string>>(new Set())

  const ejercicios: Ejercicio[] = [
    // TAREA F1-M1-S2: TaskManager v0.1
    {
      id: 'f1-m1-s2-d1',
      titulo: 'Día 1: Implementar createTask + Validación',
      descripcion: 'Construir el núcleo del TaskManager con creación y validación robusta de tareas.',
      codigo: `class TaskManager {
  constructor() {
    this.tasks = new Map();
    this.validator = new TaskValidator();
    this.idCounter = 0;
  }
  
  /**
   * Crea una nueva tarea con validación completa
   * @param {Object} taskData - Datos de la tarea
   * @returns {Object} Tarea creada con ID único
   */
  createTask(taskData) {
    // Tu implementación aquí
    const taskId = this.generateId();
    const task = {
      id: taskId,
      ...taskData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Validar antes de guardar
    const validation = this.validator.validate(task);
    if (!validation.isValid) {
      throw new Error('Tarea inválida: ' + validation.errors.join(', '));
    }
    
    this.tasks.set(taskId, task);
    return task;
  }
  
  generateId() {
    return \`task_\${++this.idCounter}_\${Date.now()}\`;
  }
}`,
      tipo: 'practica',
      dificultad: 'medio',
      tiempo: 50,
      completado: false
    },
    {
      id: 'f1-m1-s2-d2',
      titulo: 'Día 2: updateTaskStatus + Estados',
      descripcion: 'Implementar gestión de estados de tareas con transiciones válidas.',
      codigo: `// Extender TaskManager con gestión de estados
class TaskManager extends BaseTaskManager {
  constructor() {
    super();
    // Estados válidos y sus transiciones
    this.validTransitions = {
      'pending': ['processing', 'cancelled'],
      'processing': ['completed', 'failed', 'pending'],
      'completed': ['pending'], // permitir reprocessing
      'failed': ['pending', 'processing'],
      'cancelled': ['pending']
    };
  }
  
  /**
   * Actualiza el estado de una tarea
   * @param {string} taskId - ID de la tarea
   * @param {string} newStatus - Nuevo estado
   * @returns {Object} Tarea actualizada
   */
  updateTaskStatus(taskId, newStatus) {
    // Tu implementación aquí
    const task = this.getTask(taskId);
    if (!task) {
      throw new Error(\`Tarea no encontrada: \${taskId}\`);
    }
    
    // Validar transición de estado
    const validStates = this.validTransitions[task.status] || [];
    if (!validStates.includes(newStatus)) {
      throw new Error(\`Transición inválida: \${task.status} -> \${newStatus}\`);
    }
    
    // Actualizar tarea
    task.status = newStatus;
    task.updatedAt = new Date().toISOString();
    
    // Log de cambio de estado
    this.logStateChange(taskId, task.status, newStatus);
    
    return task;
  }
}`,
      tipo: 'practica',
      dificultad: 'medio',
      tiempo: 45,
      completado: false
    },
    {
      id: 'f1-m1-s2-d3',
      titulo: 'Día 3: setTaskOutput + Manejo de Resultados',
      descripcion: 'Implementar almacenamiento y gestión de outputs de tareas procesadas.',
      codigo: `// Sistema de outputs con validación y storage
class TaskManager extends BaseTaskManager {
  constructor() {
    super();
    this.outputs = new Map(); // Almacenamiento separado para outputs
    this.outputValidator = new OutputValidator();
  }
  
  /**
   * Establece el output de una tarea completada
   * @param {string} taskId - ID de la tarea
   * @param {any} output - Resultado del procesamiento
   * @param {Object} metadata - Metadatos adicionales
   */
  setTaskOutput(taskId, output, metadata = {}) {
    const task = this.getTask(taskId);
    if (!task) {
      throw new Error(\`Tarea no encontrada: \${taskId}\`);
    }
    
    // Validar que la tarea esté en estado correcto
    if (!['processing', 'completed'].includes(task.status)) {
      throw new Error(\`No se puede set output en estado: \${task.status}\`);
    }
    
    // Crear objeto output estructurado
    const outputData = {
      taskId,
      content: output,
      type: this.detectOutputType(output),
      size: this.calculateOutputSize(output),
      metadata: {
        ...metadata,
        timestamp: new Date().toISOString(),
        processingTime: this.calculateProcessingTime(task)
      }
    };
    
    // Validar output
    const validation = this.outputValidator.validate(outputData);
    if (!validation.isValid) {
      throw new Error('Output inválido: ' + validation.errors.join(', '));
    }
    
    // Guardar output
    this.outputs.set(taskId, outputData);
    
    // Actualizar tarea a completada si aún está processing
    if (task.status === 'processing') {
      this.updateTaskStatus(taskId, 'completed');
    }
    
    return outputData;
  }
  
  getTaskOutput(taskId) {
    return this.outputs.get(taskId);
  }
}`,
      tipo: 'practica',
      dificultad: 'medio',
      tiempo: 60,
      completado: false
    },
    {
      id: 'f1-m1-s2-d4',
      titulo: 'Día 4: Sistema de Historial + Persistencia',
      descripcion: 'Implementar historial de cambios y persistencia básica con localStorage.',
      codigo: `// Sistema de historial y persistencia
class TaskManager extends BaseTaskManager {
  constructor() {
    super();
    this.history = [];
    this.persistence = new TaskPersistence();
    this.loadFromStorage();
  }
  
  /**
   * Registra cambios en el historial
   * @private
   */
  logStateChange(taskId, oldStatus, newStatus) {
    const historyEntry = {
      id: this.generateHistoryId(),
      taskId,
      action: 'status_change',
      oldValue: oldStatus,
      newValue: newStatus,
      timestamp: new Date().toISOString(),
      metadata: {
        userAgent: navigator.userAgent,
        sessionId: this.getSessionId()
      }
    };
    
    this.history.push(historyEntry);
    this.saveToStorage();
    
    // Mantener historial limitado (últimas 1000 entradas)
    if (this.history.length > 1000) {
      this.history = this.history.slice(-1000);
    }
  }
  
  /**
   * Persiste el estado actual
   */
  saveToStorage() {
    try {
      const data = {
        tasks: Array.from(this.tasks.entries()),
        outputs: Array.from(this.outputs.entries()),
        history: this.history.slice(-100), // Solo últimas 100 entradas
        metadata: {
          version: '1.0.0',
          savedAt: new Date().toISOString()
        }
      };
      
      this.persistence.save('taskManager', data);
    } catch (error) {
      console.error('Error guardando estado:', error);
    }
  }
  
  /**
   * Carga el estado desde storage
   */
  loadFromStorage() {
    try {
      const data = this.persistence.load('taskManager');
      if (data) {
        this.tasks = new Map(data.tasks || []);
        this.outputs = new Map(data.outputs || []);
        this.history = data.history || [];
        
        // Restaurar contador de IDs
        this.restoreIdCounter();
      }
    } catch (error) {
      console.error('Error cargando estado:', error);
    }
  }
  
  /**
   * Obtiene historial de una tarea específica
   */
  getTaskHistory(taskId) {
    return this.history.filter(entry => entry.taskId === taskId);
  }
  
  /**
   * Obtiene estadísticas del historial
   */
  getHistoryStats() {
    const stats = {
      totalEntries: this.history.length,
      actionTypes: {},
      dateRange: {
        oldest: null,
        newest: null
      }
    };
    
    this.history.forEach(entry => {
      // Contar tipos de acciones
      stats.actionTypes[entry.action] = (stats.actionTypes[entry.action] || 0) + 1;
      
      // Determinar rango de fechas
      const date = new Date(entry.timestamp);
      if (!stats.dateRange.oldest || date < stats.dateRange.oldest) {
        stats.dateRange.oldest = date;
      }
      if (!stats.dateRange.newest || date > stats.dateRange.newest) {
        stats.dateRange.newest = date;
      }
    });
    
    return stats;
  }
}`,
      tipo: 'practica',
      dificultad: 'dificil',
      tiempo: 75,
      completado: false
    },
    {
      id: 'f1-m1-s2-d5',
      titulo: 'Día 5: Queries y Paginación + API Endpoints',
      descripcion: 'Crear sistema de consultas avanzadas y endpoints REST para el TaskManager.',
      codigo: `// Sistema de queries y API REST
class TaskManager extends BaseTaskManager {
  /**
   * Consulta tareas con filtros y paginación
   */
  queryTasks(options = {}) {
    const {
      status,
      type,
      priority,
      createdAfter,
      createdBefore,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = options;
    
    let tasks = Array.from(this.tasks.values());
    
    // Aplicar filtros
    if (status) tasks = tasks.filter(t => t.status === status);
    if (type) tasks = tasks.filter(t => t.type === type);
    if (priority) tasks = tasks.filter(t => t.priority === priority);
    if (createdAfter) tasks = tasks.filter(t => new Date(t.createdAt) > new Date(createdAfter));
    if (createdBefore) tasks = tasks.filter(t => new Date(t.createdAt) < new Date(createdBefore));
    if (search) {
      const searchLower = search.toLowerCase();
      tasks = tasks.filter(t => 
        t.input.toLowerCase().includes(searchLower) ||
        t.id.toLowerCase().includes(searchLower)
      );
    }
    
    // Ordenar
    tasks.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    // Paginar
    const total = tasks.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTasks = tasks.slice(startIndex, endIndex);
    
    return {
      tasks: paginatedTasks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: endIndex < total,
        hasPrev: page > 1
      },
      filters: options
    };
  }
}

// API REST Endpoints
class TaskManagerAPI {
  constructor(taskManager) {
    this.taskManager = taskManager;
  }
  
  // GET /tasks - Listar tareas con filtros
  async getTasks(req) {
    try {
      const query = req.query || {};
      const result = this.taskManager.queryTasks(query);
      
      return {
        status: 200,
        data: result,
        message: 'Tareas obtenidas exitosamente'
      };
    } catch (error) {
      return {
        status: 400,
        error: error.message
      };
    }
  }
  
  // POST /tasks - Crear nueva tarea
  async createTask(req) {
    try {
      const taskData = req.body;
      const task = this.taskManager.createTask(taskData);
      
      return {
        status: 201,
        data: task,
        message: 'Tarea creada exitosamente'
      };
    } catch (error) {
      return {
        status: 400,
        error: error.message
      };
    }
  }
  
  // PUT /tasks/:id/status - Actualizar estado
  async updateTaskStatus(req) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const task = this.taskManager.updateTaskStatus(id, status);
      
      return {
        status: 200,
        data: task,
        message: 'Estado actualizado exitosamente'
      };
    } catch (error) {
      return {
        status: 400,
        error: error.message
      };
    }
  }
  
  // GET /tasks/:id/history - Historial de tarea
  async getTaskHistory(req) {
    try {
      const { id } = req.params;
      const history = this.taskManager.getTaskHistory(id);
      
      return {
        status: 200,
        data: history,
        message: 'Historial obtenido exitosamente'
      };
    } catch (error) {
      return {
        status: 404,
        error: 'Tarea no encontrada'
      };
    }
  }
}`,
      tipo: 'proyecto',
      dificultad: 'dificil',
      tiempo: 90,
      completado: false
    },
    // EJERCICIOS ORIGINALES (mantenidos para compatibilidad)
    {
      id: 'concepto-memoria',
      titulo: 'Sistema de Memoria Persistente',
      descripcion: 'Comprende cómo implementar memoria que persiste entre sesiones y se integra con el contexto de conversación.',
      tipo: 'concepto',
      dificultad: 'medio',
      tiempo: 25,
      completado: false
    },
    {
      id: 'practica-memoria',
      titulo: 'Agente con Memoria Avanzada',
      descripcion: 'Mejora tu agente básico añadiendo un sistema de memoria que recuerde conversaciones y contexto a largo plazo.',
      codigo: `class AgenteConMemoria extends AgenteBasico {
  constructor(config = {}) {
    super(config);
    this.memoriaLargoPlazo = new Map();
    this.contextoActual = null;
    this.limitMemoriaLP = config.limitMemoriaLP || 100;
  }
  
  async procesar(entrada) {
    // Recuperar contexto relevante
    const contextoRelevante = await this.buscarContextoRelevante(entrada);
    
    // Procesar con contexto
    const respuesta = await this.generarRespuestaConContexto(entrada, contextoRelevante);
    
    // Actualizar memoria a largo plazo
    await this.actualizarMemoriaLP(entrada, respuesta);
    
    return respuesta;
  }
  
  async buscarContextoRelevante(entrada) {
    // Implementar búsqueda semántica en memoria
    // Por ahora, búsqueda simple por palabras clave
    const palabrasClave = this.extraerPalabrasClave(entrada);
    const contextosRelevantes = [];
    
    for (const [clave, contexto] of this.memoriaLargoPlazo) {
      if (this.tieneRelevancia(palabrasClave, contexto)) {
        contextosRelevantes.push(contexto);
      }
    }
    
    return contextosRelevantes.slice(0, 5); // Top 5 más relevantes
  }
}`,
      tipo: 'practica',
      dificultad: 'dificil',
      tiempo: 90,
      completado: false
    }
  ];

  // Cargar progreso desde localStorage
  useEffect(() => {
    const progresoGuardado = localStorage.getItem('academia-semana-2-progreso')
    if (progresoGuardado) {
      const { completados, progreso: porcentaje } = JSON.parse(progresoGuardado)
      setEjerciciosCompletados(new Set(completados))
      setProgreso(porcentaje)
    }
  }, [])

  // Guardar progreso en localStorage
  useEffect(() => {
    const completados = Array.from(ejerciciosCompletados)
    const porcentajeProgreso = Math.round((completados.length / ejercicios.length) * 100)
    
    localStorage.setItem('academia-semana-2-progreso', JSON.stringify({
      completados,
      progreso: porcentajeProgreso
    }))
    
    setProgreso(porcentajeProgreso)
  }, [ejerciciosCompletados, ejercicios.length])

  const toggleEjercicio = (ejercicioId: string) => {
    const nuevosCompletados = new Set(ejerciciosCompletados)
    if (nuevosCompletados.has(ejercicioId)) {
      nuevosCompletados.delete(ejercicioId)
    } else {
      nuevosCompletados.add(ejercicioId)
    }
    setEjerciciosCompletados(nuevosCompletados)
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'concepto': return <FileCode className="w-5 h-5 text-blue-400" />
      case 'practica': return <Code className="w-5 h-5 text-green-400" />
      case 'proyecto': return <Star className="w-5 h-5 text-purple-400" />
      default: return <Circle className="w-5 h-5" />
    }
  }

  const getDificultadColor = (dificultad: string) => {
    switch (dificultad) {
      case 'facil': return 'text-green-400 bg-green-900/20 border-green-800'
      case 'medio': return 'text-yellow-400 bg-yellow-900/20 border-yellow-800'
      case 'dificil': return 'text-red-400 bg-red-900/20 border-red-800'
      default: return 'text-gray-400 bg-gray-900/20 border-gray-800'
    }
  }

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'concepto': return 'Concepto'
      case 'practica': return 'Práctica'
      case 'proyecto': return 'Proyecto'
      default: return tipo
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/agencia/mes-1"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-green-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">Semana 2: TaskManager v0.1</h1>
                <p className="text-gray-400">Construye el núcleo de gestión de tareas</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progreso de la Semana</span>
              <span className="text-sm text-gray-400">{progreso}% completado</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-600 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progreso}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
              <span>{ejerciciosCompletados.size} de {ejercicios.length} ejercicios</span>
              <span>~{ejercicios.reduce((acc, ej) => acc + ej.tiempo, 0)} min total</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tarea F1-M1-S2 Introduction */}
        <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-800/30 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-green-600/20 border border-green-600/30 rounded-full text-sm font-medium text-green-400">
              F1-M1-S2
            </div>
            <h2 className="text-xl font-semibold text-green-400">TaskManager v0.1</h2>
          </div>
          <p className="text-gray-300 mb-4">
            <strong>🎯 Objetivo:</strong> Construir el núcleo de gestión de tareas con validación, estados y persistencia
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3 text-green-300">Contenido Expandido (5 días)</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <strong>Día 1:</strong> createTask + Validación de entrada
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <strong>Día 2:</strong> updateTaskStatus + Estados de tarea
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <strong>Día 3:</strong> setTaskOutput + Manejo de resultados
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <strong>Día 4:</strong> Sistema de historial + Persistencia
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <strong>Día 5:</strong> Queries y paginación + API endpoints
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3 text-blue-300">Memoria y Persistencia</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Sistema de memoria a largo plazo
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Persistencia con localStorage
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Contexto relevante automático
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Búsqueda semántica básica
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-800/30 rounded-lg">
            <p className="text-yellow-300 text-sm">
              <strong>📦 Entregables:</strong> TaskManager funcional + API + Tests + Memoria persistente
            </p>
          </div>
        </div>

        {/* Access to Detailed Tasks */}
        <div className="mb-8 text-center">
          <Link
            href="/agencia/mes-1/semana-2/tareas"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-lg font-medium transition-all transform hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            Ver Tareas Detalladas por Días (F1-M1-S2)
          </Link>
          <p className="text-gray-400 text-sm mt-2">
            Accede al contenido expandido de 5 días con implementación paso a paso del TaskManager
          </p>
        </div>

        {/* Exercises */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Ejercicios Prácticos</h2>
          
          {ejercicios.map((ejercicio) => (
            <div
              key={ejercicio.id}
              className={`bg-gray-900 border rounded-xl p-6 transition-all ${
                ejerciciosCompletados.has(ejercicio.id)
                  ? 'border-green-600/30 bg-green-900/10'
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              {/* Exercise Header */}
              <div className="flex items-start gap-4 mb-4">
                <button
                  onClick={() => toggleEjercicio(ejercicio.id)}
                  className="mt-1"
                >
                  {ejerciciosCompletados.has(ejercicio.id) ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-600 hover:text-gray-400" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getTipoIcon(ejercicio.tipo)}
                    <h3 className="text-lg font-semibold">{ejercicio.titulo}</h3>
                    <span className={`text-xs px-2 py-1 rounded border ${getDificultadColor(ejercicio.dificultad)}`}>
                      {ejercicio.dificultad}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {ejercicio.tiempo} min
                    </div>
                  </div>
                  
                  <span className={`text-xs px-2 py-1 rounded ${
                    ejercicio.tipo === 'concepto' 
                      ? 'bg-blue-900/20 text-blue-400'
                      : ejercicio.tipo === 'practica'
                      ? 'bg-green-900/20 text-green-400'
                      : 'bg-purple-900/20 text-purple-400'
                  }`}>
                    {getTipoLabel(ejercicio.tipo)}
                  </span>
                </div>
              </div>

              {/* Exercise Description */}
              <p className="text-gray-400 mb-4 ml-10">{ejercicio.descripcion}</p>

              {/* Code Block */}
              {ejercicio.codigo && (
                <div className="ml-10">
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Terminal className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-400">Código base</span>
                    </div>
                    <pre className="text-sm overflow-x-auto">
                      <code className="language-javascript text-gray-300">
                        {ejercicio.codigo}
                      </code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="flex justify-end mt-4 ml-10">
                <button
                  onClick={() => toggleEjercicio(ejercicio.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    ejerciciosCompletados.has(ejercicio.id)
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {ejerciciosCompletados.has(ejercicio.id) ? 'Completado' : 'Marcar como completado'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps */}
        {progreso === 100 && (
          <div className="mt-8 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-800/30 rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-4 text-green-400">🎉 ¡Semana 2 Completada!</h3>
            <p className="text-gray-300 mb-6">
              Has construido un TaskManager funcional. Ahora estás listo para crear agentes especializados.
            </p>
            <Link
              href="/agencia/mes-1/semana-3"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
            >
              Continuar a Semana 3 <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}