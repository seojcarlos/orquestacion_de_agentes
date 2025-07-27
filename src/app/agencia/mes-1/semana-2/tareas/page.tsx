'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, CheckCircle, Circle, Code, FileText, Database, Settings, GitBranch, Server } from 'lucide-react'

interface TareaDiaria {
  dia: number
  titulo: string
  objetivo: string
  teoria: string
  practica: string
  tecnologias: string[]
  entregables: string[]
  tiempoTeoria: number
  tiempoPractica: number
  completado: boolean
}

export default function TareasF1M1S2Page() {
  const [progreso, setProgreso] = useState(0)
  const [tareasCompletadas, setTareasCompletadas] = useState<Set<number>>(new Set())

  const tareas: TareaDiaria[] = [
    {
      dia: 1,
      titulo: 'Implementar createTask + Validación',
      objetivo: 'Construir el núcleo del TaskManager con creación y validación robusta de tareas',
      teoria: `
**Arquitectura del TaskManager:**

El TaskManager es el corazón de nuestro sistema de agentes. Gestiona todas las tareas que los agentes deben procesar.

**Componentes principales:**
1. **Task Storage**: Map() para almacenamiento en memoria
2. **Validator**: Validación usando los schemas JSON
3. **ID Generator**: Generación de IDs únicos y seguros
4. **State Manager**: Gestión de estados de las tareas

**Patrón de diseño - Repository:**
```javascript
// Separación de responsabilidades
class TaskRepository {
  // Almacenamiento y persistencia
}

class TaskValidator {
  // Validación de datos
}

class TaskManager {
  // Lógica de negocio
}
```

**Estados de una tarea:**
- **pending**: Esperando ser procesada
- **processing**: Siendo procesada por un agente
- **completed**: Completada exitosamente
- **failed**: Falló durante el procesamiento
- **cancelled**: Cancelada por el usuario

**Validación robusta:**
- Schemas JSON para estructura
- Sanitización de entrada
- Validación de tipos
- Límites de tamaño
- Caracteres permitidos
      `,
      practica: `
**Ejercicio Práctico:**

1. **Crear TaskManager base**:
\`\`\`javascript
// src/lib/tasks/TaskManager.js
const TaskValidator = require('../validators/TaskValidator');

class TaskManager {
  constructor() {
    this.tasks = new Map();
    this.validator = new TaskValidator();
    this.idCounter = 0;
    this.maxTasks = 1000; // Límite de tareas en memoria
  }
  
  /**
   * Crea una nueva tarea con validación completa
   * @param {Object} taskData - Datos de la tarea
   * @returns {Object} Tarea creada con ID único
   */
  createTask(taskData) {
    // 1. Verificar límite de tareas
    if (this.tasks.size >= this.maxTasks) {
      throw new Error(\`Límite de tareas alcanzado: \${this.maxTasks}\`);
    }
    
    // 2. Generar ID único
    const taskId = this.generateId();
    
    // 3. Crear estructura de tarea
    const task = {
      id: taskId,
      type: taskData.type || 'text',
      input: taskData.input,
      priority: taskData.priority || 3,
      status: 'pending',
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: taskData.userId || 'anonymous',
        agentId: null,
        attempts: 0,
        estimatedDuration: taskData.estimatedDuration || null
      },
      ...taskData
    };
    
    // 4. Validar estructura completa
    const validation = this.validator.validate(task);
    if (!validation.isValid) {
      const errors = validation.errors.map(e => e.message || e.schemaPath).join(', ');
      throw new Error(\`Tarea inválida: \${errors}\`);
    }
    
    // 5. Sanitizar entrada
    task.input = this.sanitizeInput(task.input);
    
    // 6. Guardar en storage
    this.tasks.set(taskId, task);
    
    // 7. Log de auditoría
    this.logAction('task_created', {
      taskId,
      type: task.type,
      priority: task.priority
    });
    
    return { ...task }; // Retornar copia para evitar mutaciones
  }
  
  /**
   * Genera ID único y seguro
   */
  generateId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    const counter = (++this.idCounter).toString(36);
    return \`task_\${timestamp}_\${counter}_\${random}\`;
  }
  
  /**
   * Sanitiza entrada del usuario
   */
  sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    return input
      .trim()
      .replace(/[<>]/g, '') // Remover < y >
      .slice(0, 5000); // Límite de caracteres
  }
  
  /**
   * Obtiene una tarea por ID
   */
  getTask(taskId) {
    const task = this.tasks.get(taskId);
    return task ? { ...task } : null;
  }
  
  /**
   * Obtiene todas las tareas
   */
  getAllTasks() {
    return Array.from(this.tasks.values()).map(task => ({ ...task }));
  }
  
  /**
   * Obtiene estadísticas del manager
   */
  getStats() {
    const tasks = Array.from(this.tasks.values());
    const stats = {
      total: tasks.length,
      byStatus: {},
      byType: {},
      byPriority: {},
      averageAge: 0
    };
    
    // Contar por estado
    tasks.forEach(task => {
      stats.byStatus[task.status] = (stats.byStatus[task.status] || 0) + 1;
      stats.byType[task.type] = (stats.byType[task.type] || 0) + 1;
      stats.byPriority[task.priority] = (stats.byPriority[task.priority] || 0) + 1;
    });
    
    // Calcular edad promedio
    if (tasks.length > 0) {
      const totalAge = tasks.reduce((sum, task) => {
        return sum + (Date.now() - new Date(task.metadata.createdAt).getTime());
      }, 0);
      stats.averageAge = Math.round(totalAge / tasks.length / 1000); // en segundos
    }
    
    return stats;
  }
  
  /**
   * Log de acciones para auditoría
   */
  logAction(action, data) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      data
    };
    
    // En desarrollo, usar console
    console.log('[TaskManager]', logEntry);
    
    // En producción, enviar a sistema de logging
    // this.logger.info(logEntry);
  }
}

module.exports = TaskManager;
\`\`\`

2. **Crear tests unitarios**:
\`\`\`javascript
// tests/TaskManager.test.js
const TaskManager = require('../src/lib/tasks/TaskManager');

describe('TaskManager', () => {
  let taskManager;
  
  beforeEach(() => {
    taskManager = new TaskManager();
  });
  
  describe('createTask', () => {
    test('crea tarea válida', () => {
      const taskData = {
        type: 'text',
        input: 'Hola mundo',
        priority: 2
      };
      
      const task = taskManager.createTask(taskData);
      
      expect(task.id).toBeDefined();
      expect(task.status).toBe('pending');
      expect(task.input).toBe('Hola mundo');
      expect(task.metadata.createdAt).toBeDefined();
    });
    
    test('rechaza tarea inválida', () => {
      const taskData = {
        type: 'invalid_type',
        input: '',
        priority: 10 // Fuera de rango
      };
      
      expect(() => {
        taskManager.createTask(taskData);
      }).toThrow('Tarea inválida');
    });
    
    test('sanitiza entrada', () => {
      const taskData = {
        type: 'text',
        input: '  <script>alert("xss")</script>  '
      };
      
      const task = taskManager.createTask(taskData);
      expect(task.input).toBe('scriptalert("xss")/script');
    });
    
    test('genera IDs únicos', () => {
      const task1 = taskManager.createTask({ type: 'text', input: 'test1' });
      const task2 = taskManager.createTask({ type: 'text', input: 'test2' });
      
      expect(task1.id).not.toBe(task2.id);
    });
    
    test('respeta límite de tareas', () => {
      // Crear manager con límite bajo para testing
      const limitedManager = new TaskManager();
      limitedManager.maxTasks = 2;
      
      // Crear tareas hasta el límite
      limitedManager.createTask({ type: 'text', input: 'test1' });
      limitedManager.createTask({ type: 'text', input: 'test2' });
      
      // La tercera debe fallar
      expect(() => {
        limitedManager.createTask({ type: 'text', input: 'test3' });
      }).toThrow('Límite de tareas alcanzado');
    });
  });
  
  describe('getTask', () => {
    test('retorna tarea existente', () => {
      const created = taskManager.createTask({ type: 'text', input: 'test' });
      const retrieved = taskManager.getTask(created.id);
      
      expect(retrieved).toEqual(created);
    });
    
    test('retorna null para tarea inexistente', () => {
      const task = taskManager.getTask('non-existent');
      expect(task).toBeNull();
    });
  });
  
  describe('getStats', () => {
    test('calcula estadísticas correctamente', () => {
      taskManager.createTask({ type: 'text', input: 'test1', priority: 1 });
      taskManager.createTask({ type: 'code', input: 'test2', priority: 1 });
      taskManager.createTask({ type: 'text', input: 'test3', priority: 2 });
      
      const stats = taskManager.getStats();
      
      expect(stats.total).toBe(3);
      expect(stats.byStatus.pending).toBe(3);
      expect(stats.byType.text).toBe(2);
      expect(stats.byType.code).toBe(1);
      expect(stats.byPriority[1]).toBe(2);
      expect(stats.byPriority[2]).toBe(1);
    });
  });
});
\`\`\`

3. **Ejecutar y validar**:
\`\`\`bash
npm test TaskManager.test.js
\`\`\`
      `,
      tecnologias: ['JavaScript ES6+', 'Map', 'JSON Schema', 'Jest', 'Error handling'],
      entregables: [
        'TaskManager.js funcional con createTask',
        'Sistema de validación robusto',
        'Generación de IDs únicos',
        'Tests unitarios completos',
        'Sanitización de entrada',
        'Sistema de logging básico'
      ],
      tiempoTeoria: 35,
      tiempoPractica: 85,
      completado: false
    },
    {
      dia: 2,
      titulo: 'updateTaskStatus + Estados',
      objetivo: 'Implementar gestión de estados de tareas con transiciones válidas y logging',
      teoria: `
**Máquina de Estados para Tareas:**

Una tarea puede estar en diferentes estados y solo ciertas transiciones son válidas.

**Estados válidos:**
- **pending** → processing, cancelled
- **processing** → completed, failed, pending (retry)
- **completed** → pending (reprocess)
- **failed** → pending, processing (retry)
- **cancelled** → pending (reactivate)

**Patrón State Machine:**
```javascript
class TaskStateMachine {
  constructor() {
    this.transitions = {
      'pending': ['processing', 'cancelled'],
      'processing': ['completed', 'failed', 'pending'],
      'completed': ['pending'],
      'failed': ['pending', 'processing'],
      'cancelled': ['pending']
    };
  }
  
  isValidTransition(from, to) {
    return this.transitions[from]?.includes(to) || false;
  }
}
```

**Metadata de transiciones:**
- Timestamp de cambio
- Usuario que hizo el cambio
- Razón del cambio
- Agente que procesaba (si aplica)

**Optimistic vs Pessimistic Locking:**
- **Optimistic**: Asumimos que no habrá conflictos
- **Pessimistic**: Bloqueamos la tarea durante modificación

**Eventos de estado:**
Cada cambio de estado puede disparar eventos para otros sistemas.
      `,
      practica: `
**Ejercicio Práctico:**

1. **Extender TaskManager con estados**:
\`\`\`javascript
// src/lib/tasks/TaskManager.js (agregar métodos)
class TaskManager extends BaseTaskManager {
  constructor() {
    super();
    this.validTransitions = {
      'pending': ['processing', 'cancelled'],
      'processing': ['completed', 'failed', 'pending'],
      'completed': ['pending'], // reprocessing
      'failed': ['pending', 'processing'], // retry
      'cancelled': ['pending'] // reactivate
    };
    this.stateHistory = new Map(); // Historial por tarea
  }
  
  /**
   * Actualiza el estado de una tarea
   * @param {string} taskId - ID de la tarea
   * @param {string} newStatus - Nuevo estado
   * @param {Object} options - Opciones adicionales
   * @returns {Object} Tarea actualizada
   */
  updateTaskStatus(taskId, newStatus, options = {}) {
    const {
      reason = 'No reason provided',
      agentId = null,
      userId = 'system',
      metadata = {}
    } = options;
    
    // 1. Obtener tarea actual
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new Error(\`Tarea no encontrada: \${taskId}\`);
    }
    
    // 2. Validar transición
    const currentStatus = task.status;
    if (!this.isValidTransition(currentStatus, newStatus)) {
      throw new Error(
        \`Transición inválida: \${currentStatus} -> \${newStatus}. \` +
        \`Transiciones válidas: \${this.validTransitions[currentStatus]?.join(', ') || 'ninguna'}\`
      );
    }
    
    // 3. Verificar concurrencia (optimistic locking)
    const now = new Date().toISOString();
    if (task.metadata.lockUntil && task.metadata.lockUntil > now) {
      throw new Error(\`Tarea bloqueada hasta: \${task.metadata.lockUntil}\`);
    }
    
    // 4. Crear entrada de historial ANTES del cambio
    const historyEntry = {
      timestamp: now,
      fromStatus: currentStatus,
      toStatus: newStatus,
      reason,
      agentId,
      userId,
      metadata: {
        ...metadata,
        duration: this.calculateStateDuration(task)
      }
    };
    
    // 5. Actualizar tarea
    const previousStatus = task.status;
    task.status = newStatus;
    task.metadata.updatedAt = now;
    task.metadata.lastStatusChange = now;
    
    // Actualizar contadores específicos por estado
    if (newStatus === 'processing') {
      task.metadata.attempts = (task.metadata.attempts || 0) + 1;
      task.metadata.processingStarted = now;
      task.metadata.agentId = agentId;
    } else if (newStatus === 'completed') {
      task.metadata.completedAt = now;
      task.metadata.processingDuration = this.calculateProcessingDuration(task);
    } else if (newStatus === 'failed') {
      task.metadata.failedAt = now;
      task.metadata.lastError = reason;
    }
    
    // 6. Guardar en historial
    if (!this.stateHistory.has(taskId)) {
      this.stateHistory.set(taskId, []);
    }
    this.stateHistory.get(taskId).push(historyEntry);
    
    // 7. Limitar historial (últimas 50 entradas por tarea)
    const history = this.stateHistory.get(taskId);
    if (history.length > 50) {
      this.stateHistory.set(taskId, history.slice(-50));
    }
    
    // 8. Log de auditoría
    this.logAction('status_changed', {
      taskId,
      from: previousStatus,
      to: newStatus,
      reason,
      agentId,
      userId
    });
    
    // 9. Disparar eventos (si hay listeners)
    this.emitStatusChangeEvent(task, previousStatus, newStatus);
    
    return { ...task };
  }
  
  /**
   * Verifica si una transición de estado es válida
   */
  isValidTransition(fromStatus, toStatus) {
    const validStates = this.validTransitions[fromStatus];
    return validStates && validStates.includes(toStatus);
  }
  
  /**
   * Obtiene tareas por estado
   */
  getTasksByStatus(status) {
    return Array.from(this.tasks.values())
      .filter(task => task.status === status)
      .map(task => ({ ...task }));
  }
  
  /**
   * Obtiene historial de estados de una tarea
   */
  getTaskStateHistory(taskId) {
    return this.stateHistory.get(taskId) || [];
  }
  
  /**
   * Calcula duración en estado actual
   */
  calculateStateDuration(task) {
    const start = new Date(task.metadata.lastStatusChange || task.metadata.createdAt);
    const now = new Date();
    return now.getTime() - start.getTime(); // en milisegundos
  }
  
  /**
   * Calcula duración total de procesamiento
   */
  calculateProcessingDuration(task) {
    if (!task.metadata.processingStarted) return null;
    
    const start = new Date(task.metadata.processingStarted);
    const end = new Date();
    return end.getTime() - start.getTime();
  }
  
  /**
   * Bloquea una tarea temporalmente
   */
  lockTask(taskId, durationMs = 5000) {
    const task = this.tasks.get(taskId);
    if (!task) throw new Error(\`Tarea no encontrada: \${taskId}\`);
    
    const lockUntil = new Date(Date.now() + durationMs).toISOString();
    task.metadata.lockUntil = lockUntil;
    
    return lockUntil;
  }
  
  /**
   * Emite evento de cambio de estado
   */
  emitStatusChangeEvent(task, oldStatus, newStatus) {
    // En una implementación real, esto sería un EventEmitter
    console.log(\`[EVENT] Task \${task.id}: \${oldStatus} -> \${newStatus}\`);
    
    // Aquí podrías integrar con sistemas externos:
    // - Webhooks
    // - Notifications
    // - Analytics
    // - Other microservices
  }
  
  /**
   * Obtiene estadísticas de transiciones
   */
  getTransitionStats() {
    const stats = {
      totalTransitions: 0,
      byTransition: {},
      averageProcessingTime: 0,
      failureRate: 0
    };
    
    let totalProcessingTime = 0;
    let completedTasks = 0;
    let failedTasks = 0;
    
    this.stateHistory.forEach((history) => {
      stats.totalTransitions += history.length;
      
      history.forEach((entry) => {
        const transition = \`\${entry.fromStatus}->\${entry.toStatus}\`;
        stats.byTransition[transition] = (stats.byTransition[transition] || 0) + 1;
        
        if (entry.toStatus === 'completed' && entry.metadata.duration) {
          totalProcessingTime += entry.metadata.duration;
          completedTasks++;
        } else if (entry.toStatus === 'failed') {
          failedTasks++;
        }
      });
    });
    
    if (completedTasks > 0) {
      stats.averageProcessingTime = totalProcessingTime / completedTasks;
    }
    
    const totalTasks = completedTasks + failedTasks;
    if (totalTasks > 0) {
      stats.failureRate = (failedTasks / totalTasks) * 100;
    }
    
    return stats;
  }
}
\`\`\`

2. **Tests para gestión de estados**:
\`\`\`javascript
// tests/TaskManager.states.test.js
describe('TaskManager - Estados', () => {
  let taskManager;
  let task;
  
  beforeEach(() => {
    taskManager = new TaskManager();
    task = taskManager.createTask({
      type: 'text',
      input: 'test task'
    });
  });
  
  describe('updateTaskStatus', () => {
    test('transición válida pending -> processing', () => {
      const updated = taskManager.updateTaskStatus(task.id, 'processing', {
        agentId: 'agent-1',
        reason: 'Starting processing'
      });
      
      expect(updated.status).toBe('processing');
      expect(updated.metadata.agentId).toBe('agent-1');
      expect(updated.metadata.attempts).toBe(1);
    });
    
    test('rechaza transición inválida', () => {
      expect(() => {
        taskManager.updateTaskStatus(task.id, 'completed'); // pending -> completed no válido
      }).toThrow('Transición inválida');
    });
    
    test('mantiene historial de cambios', () => {
      taskManager.updateTaskStatus(task.id, 'processing');
      taskManager.updateTaskStatus(task.id, 'completed');
      
      const history = taskManager.getTaskStateHistory(task.id);
      expect(history).toHaveLength(2);
      expect(history[0].fromStatus).toBe('pending');
      expect(history[0].toStatus).toBe('processing');
      expect(history[1].fromStatus).toBe('processing');
      expect(history[1].toStatus).toBe('completed');
    });
    
    test('calcula duraciones correctamente', () => {
      // Simular paso del tiempo
      const originalNow = Date.now;
      let mockTime = Date.now();
      Date.now = () => mockTime;
      
      taskManager.updateTaskStatus(task.id, 'processing');
      
      mockTime += 5000; // 5 segundos después
      taskManager.updateTaskStatus(task.id, 'completed');
      
      const updated = taskManager.getTask(task.id);
      expect(updated.metadata.processingDuration).toBeGreaterThan(4000);
      
      Date.now = originalNow; // Restaurar
    });
  });
  
  describe('concurrencia', () => {
    test('respeta locks de tarea', () => {
      taskManager.lockTask(task.id, 1000);
      
      expect(() => {
        taskManager.updateTaskStatus(task.id, 'processing');
      }).toThrow('Tarea bloqueada');
    });
  });
});
\`\`\`
      `,
      tecnologias: ['State Machines', 'Event handling', 'Concurrency', 'Optimistic locking', 'History tracking'],
      entregables: [
        'Sistema de estados con transiciones válidas',
        'Historial de cambios por tarea',
        'Gestión de concurrencia básica',
        'Cálculo de duraciones',
        'Tests de transiciones',
        'Eventos de cambio de estado'
      ],
      tiempoTeoria: 30,
      tiempoPractica: 75,
      completado: false
    },
    {
      dia: 3,
      titulo: 'setTaskOutput + Manejo de Resultados',
      objetivo: 'Implementar almacenamiento y gestión de outputs de tareas con validación y metadatos',
      teoria: `
**Gestión de Outputs:**

Los outputs son el resultado del procesamiento de una tarea por un agente. Requieren manejo especial:

**Tipos de outputs:**
1. **Text**: Respuestas de texto simple
2. **Structured**: JSON, XML, datos estructurados
3. **Binary**: Archivos, imágenes, audio
4. **Stream**: Datos que llegan en chunks
5. **Error**: Outputs de error con stack traces

**Consideraciones importantes:**
- **Tamaño**: Límites de almacenamiento
- **Formato**: Validación de estructura
- **Encoding**: UTF-8, Base64, etc.
- **Metadata**: Información sobre el procesamiento
- **Versionado**: Múltiples versiones del mismo output

**Patrón Composite para Outputs:**
```javascript
class Output {
  constructor(type, content, metadata) {
    this.type = type;
    this.content = content;
    this.metadata = metadata;
  }
}

class TextOutput extends Output {
  constructor(content, metadata) {
    super('text', content, metadata);
  }
}

class StructuredOutput extends Output {
  constructor(data, schema, metadata) {
    super('structured', data, { ...metadata, schema });
  }
}
```

**Storage Strategy:**
- **Inline**: Para outputs pequeños (<1KB)
- **Referenced**: Para outputs grandes (>1KB)
- **Compressed**: Para outputs repetitivos
- **Encrypted**: Para outputs sensibles
      `,
      practica: `
**Ejercicio Práctico:**

1. **Sistema de Outputs**:
\`\`\`javascript
// src/lib/outputs/OutputManager.js
class OutputManager {
  constructor() {
    this.outputs = new Map(); // taskId -> output
    this.references = new Map(); // outputId -> storage location
    this.validator = new OutputValidator();
    this.compressor = new OutputCompressor();
    this.maxInlineSize = 1024; // 1KB
  }
  
  /**
   * Almacena el output de una tarea
   */
  setOutput(taskId, content, options = {}) {
    const {
      type = 'text',
      format = 'plain',
      encoding = 'utf8',
      metadata = {},
      compress = false,
      version = 1
    } = options;
    
    // 1. Detectar tipo automáticamente si no se especifica
    const detectedType = this.detectOutputType(content);
    const finalType = type === 'auto' ? detectedType : type;
    
    // 2. Crear estructura de output
    const output = {
      id: this.generateOutputId(taskId),
      taskId,
      type: finalType,
      format,
      encoding,
      size: this.calculateSize(content),
      version,
      createdAt: new Date().toISOString(),
      metadata: {
        ...metadata,
        processingTime: metadata.processingTime || 0,
        agentId: metadata.agentId || null,
        checksum: this.calculateChecksum(content)
      }
    };
    
    // 3. Validar estructura
    const validation = this.validator.validate(output);
    if (!validation.isValid) {
      throw new Error(\`Output inválido: \${validation.errors.join(', ')}\`);
    }
    
    // 4. Decidir estrategia de almacenamiento
    if (output.size <= this.maxInlineSize) {
      // Almacenamiento inline
      output.content = content;
      output.storage = 'inline';
    } else {
      // Almacenamiento referenciado
      const referenceId = this.storeReference(content, compress);
      output.referenceId = referenceId;
      output.storage = 'referenced';
      output.compressed = compress;
    }
    
    // 5. Comprimir si es necesario y beneficioso
    if (compress && output.storage === 'inline') {
      const compressed = this.compressor.compress(content);
      if (compressed.length < content.length * 0.8) { // Solo si ahorra 20%+
        output.content = compressed;
        output.compressed = true;
        output.originalSize = output.size;
        output.size = compressed.length;
      }
    }
    
    // 6. Manejar versionado
    const existingOutput = this.outputs.get(taskId);
    if (existingOutput) {
      output.previousVersion = existingOutput.version;
      output.version = existingOutput.version + 1;
    }
    
    // 7. Guardar output
    this.outputs.set(taskId, output);
    
    // 8. Log de auditoría
    this.logOutputAction('output_set', {
      taskId,
      outputId: output.id,
      type: finalType,
      size: output.size,
      storage: output.storage
    });
    
    return output;
  }
  
  /**
   * Recupera el output de una tarea
   */
  getOutput(taskId) {
    const output = this.outputs.get(taskId);
    if (!output) return null;
    
    // Clonar para evitar mutaciones
    const result = { ...output };
    
    // Recuperar contenido si está referenciado
    if (output.storage === 'referenced') {
      result.content = this.getReference(output.referenceId);
    }
    
    // Descomprimir si es necesario
    if (output.compressed) {
      result.content = this.compressor.decompress(result.content);
    }
    
    return result;
  }
  
  /**
   * Detecta automáticamente el tipo de output
   */
  detectOutputType(content) {
    if (typeof content === 'string') {
      try {
        JSON.parse(content);
        return 'structured';
      } catch {
        return 'text';
      }
    } else if (content instanceof Buffer) {
      return 'binary';
    } else if (typeof content === 'object') {
      return 'structured';
    }
    return 'unknown';
  }
  
  /**
   * Calcula el tamaño del contenido
   */
  calculateSize(content) {
    if (typeof content === 'string') {
      return Buffer.byteLength(content, 'utf8');
    } else if (content instanceof Buffer) {
      return content.length;
    } else if (typeof content === 'object') {
      return Buffer.byteLength(JSON.stringify(content), 'utf8');
    }
    return 0;
  }
  
  /**
   * Calcula checksum para verificar integridad
   */
  calculateChecksum(content) {
    const crypto = require('crypto');
    const data = typeof content === 'string' ? content : JSON.stringify(content);
    return crypto.createHash('sha256').update(data).digest('hex').slice(0, 16);
  }
  
  /**
   * Genera ID único para output
   */
  generateOutputId(taskId) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 6);
    return \`out_\${taskId}_\${timestamp}_\${random}\`;
  }
  
  /**
   * Almacena referencia para outputs grandes
   */
  storeReference(content, compress = false) {
    const referenceId = \`ref_\${Date.now()}_\${Math.random().toString(36).substr(2)}\`;
    
    let data = content;
    if (compress) {
      data = this.compressor.compress(content);
    }
    
    // En implementación real, esto iría a:
    // - File system
    // - Database BLOB
    // - Object storage (S3, etc.)
    // - Redis
    this.references.set(referenceId, data);
    
    return referenceId;
  }
  
  /**
   * Recupera contenido referenciado
   */
  getReference(referenceId) {
    return this.references.get(referenceId);
  }
  
  /**
   * Elimina output y sus referencias
   */
  deleteOutput(taskId) {
    const output = this.outputs.get(taskId);
    if (!output) return false;
    
    // Eliminar referencia si existe
    if (output.referenceId) {
      this.references.delete(output.referenceId);
    }
    
    // Eliminar output
    this.outputs.delete(taskId);
    
    this.logOutputAction('output_deleted', { taskId, outputId: output.id });
    return true;
  }
  
  /**
   * Obtiene estadísticas de outputs
   */
  getOutputStats() {
    const outputs = Array.from(this.outputs.values());
    
    const stats = {
      total: outputs.length,
      totalSize: 0,
      byType: {},
      byStorage: {},
      averageSize: 0,
      compressionRatio: 0
    };
    
    let compressedCount = 0;
    let originalSize = 0;
    let compressedSize = 0;
    
    outputs.forEach(output => {
      stats.totalSize += output.size;
      stats.byType[output.type] = (stats.byType[output.type] || 0) + 1;
      stats.byStorage[output.storage] = (stats.byStorage[output.storage] || 0) + 1;
      
      if (output.compressed) {
        compressedCount++;
        originalSize += output.originalSize || output.size;
        compressedSize += output.size;
      }
    });
    
    if (outputs.length > 0) {
      stats.averageSize = stats.totalSize / outputs.length;
    }
    
    if (compressedCount > 0) {
      stats.compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;
    }
    
    return stats;
  }
  
  /**
   * Limpia outputs antiguos
   */
  cleanup(maxAge = 24 * 60 * 60 * 1000) { // 24 horas por defecto
    const cutoff = new Date(Date.now() - maxAge);
    let cleanedCount = 0;
    
    for (const [taskId, output] of this.outputs.entries()) {
      if (new Date(output.createdAt) < cutoff) {
        this.deleteOutput(taskId);
        cleanedCount++;
      }
    }
    
    return cleanedCount;
  }
  
  logOutputAction(action, data) {
    console.log(\`[OutputManager] \${action}\`, data);
  }
}

// src/lib/outputs/OutputValidator.js
class OutputValidator {
  validate(output) {
    const errors = [];
    
    if (!output.id) errors.push('ID requerido');
    if (!output.taskId) errors.push('Task ID requerido');
    if (!output.type) errors.push('Tipo requerido');
    if (output.size < 0) errors.push('Tamaño inválido');
    
    // Validar tipos específicos
    if (output.type === 'structured' && output.content) {
      try {
        if (typeof output.content === 'string') {
          JSON.parse(output.content);
        }
      } catch {
        errors.push('Contenido estructurado inválido');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// src/lib/outputs/OutputCompressor.js
class OutputCompressor {
  compress(data) {
    // Implementación simple de compresión
    // En producción usar zlib, gzip, etc.
    if (typeof data === 'string') {
      return this.compressString(data);
    }
    return data;
  }
  
  decompress(data) {
    if (typeof data === 'string' && data.startsWith('COMPRESSED:')) {
      return this.decompressString(data);
    }
    return data;
  }
  
  compressString(str) {
    // Compresión básica por repetición
    let compressed = str;
    const patterns = {};
    
    // Encontrar patrones repetidos
    for (let i = 0; i < str.length - 2; i++) {
      const pattern = str.substr(i, 3);
      patterns[pattern] = (patterns[pattern] || 0) + 1;
    }
    
    // Reemplazar patrones frecuentes
    Object.entries(patterns)
      .filter(([_, count]) => count > 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10) // Top 10 patterns
      .forEach(([pattern], index) => {
        const token = \`\${String.fromCharCode(1 + index)}\`;
        compressed = compressed.split(pattern).join(token);
      });
    
    return \`COMPRESSED:\${compressed}\`;
  }
  
  decompressString(compressed) {
    // Implementación inversa
    return compressed.replace('COMPRESSED:', '');
  }
}

module.exports = { OutputManager, OutputValidator, OutputCompressor };
\`\`\`

2. **Integrar con TaskManager**:
\`\`\`javascript
// Extender TaskManager
class TaskManager extends BaseTaskManager {
  constructor() {
    super();
    this.outputManager = new OutputManager();
  }
  
  /**
   * Establece el output de una tarea
   */
  setTaskOutput(taskId, content, metadata = {}) {
    const task = this.getTask(taskId);
    if (!task) {
      throw new Error(\`Tarea no encontrada: \${taskId}\`);
    }
    
    // Validar estado de la tarea
    if (!['processing', 'completed'].includes(task.status)) {
      throw new Error(\`No se puede establecer output en estado: \${task.status}\`);
    }
    
    // Crear output con metadata extendida
    const outputMetadata = {
      ...metadata,
      agentId: task.metadata.agentId,
      processingTime: this.calculateProcessingDuration(task),
      attempts: task.metadata.attempts
    };
    
    // Almacenar output
    const output = this.outputManager.setOutput(taskId, content, {
      metadata: outputMetadata
    });
    
    // Actualizar tarea a completada si aún está processing
    if (task.status === 'processing') {
      this.updateTaskStatus(taskId, 'completed', {
        reason: 'Output set successfully',
        metadata: { outputId: output.id }
      });
    }
    
    return output;
  }
  
  /**
   * Obtiene el output de una tarea
   */
  getTaskOutput(taskId) {
    return this.outputManager.getOutput(taskId);
  }
  
  /**
   * Elimina el output de una tarea
   */
  deleteTaskOutput(taskId) {
    return this.outputManager.deleteOutput(taskId);
  }
}
\`\`\`

3. **Tests para outputs**:
\`\`\`javascript
// tests/OutputManager.test.js
describe('OutputManager', () => {
  let outputManager;
  
  beforeEach(() => {
    outputManager = new OutputManager();
  });
  
  test('almacena output de texto inline', () => {
    const content = 'Hola mundo';
    const output = outputManager.setOutput('task-1', content);
    
    expect(output.type).toBe('text');
    expect(output.storage).toBe('inline');
    expect(output.content).toBe(content);
  });
  
  test('almacena output grande como referencia', () => {
    const content = 'A'.repeat(2000); // 2KB
    const output = outputManager.setOutput('task-2', content);
    
    expect(output.storage).toBe('referenced');
    expect(output.referenceId).toBeDefined();
  });
  
  test('detecta tipo automáticamente', () => {
    const jsonContent = '{"key": "value"}';
    const output = outputManager.setOutput('task-3', jsonContent, { type: 'auto' });
    
    expect(output.type).toBe('structured');
  });
  
  test('comprime cuando es beneficioso', () => {
    const repetitiveContent = 'abc'.repeat(100);
    const output = outputManager.setOutput('task-4', repetitiveContent, { compress: true });
    
    if (output.compressed) {
      expect(output.size).toBeLessThan(output.originalSize);
    }
  });
});
\`\`\`
      `,
      tecnologias: ['Data storage', 'Compression', 'Checksums', 'File handling', 'Memory management'],
      entregables: [
        'OutputManager completo con validación',
        'Sistema de almacenamiento inline/referenciado',
        'Compresión automática de outputs',
        'Detección automática de tipos',
        'Verificación de integridad con checksums',
        'Tests unitarios para outputs'
      ],
      tiempoTeoria: 40,
      tiempoPractica: 95,
      completado: false
    },
    {
      dia: 4,
      titulo: 'Sistema de Historial + Persistencia',
      objetivo: 'Implementar historial de cambios completo y persistencia con localStorage/IndexedDB',
      teoria: `
**Sistemas de Persistencia:**

**1. LocalStorage:**
- Límite: ~5-10MB
- Síncrono
- Solo strings
- Persiste entre sesiones

**2. SessionStorage:**
- Límite: ~5-10MB
- Solo durante la sesión
- Por pestaña/tab

**3. IndexedDB:**
- Límite: Mucho mayor (GB)
- Asíncrono
- Objetos complejos
- Transaccional

**Estrategias de Persistencia:**
1. **Write-through**: Escribir inmediatamente
2. **Write-behind**: Escribir en batch
3. **Write-around**: Solo cuando sea necesario

**Patrón Repository:**
```javascript
class TaskRepository {
  async save(task) { /* implementación */ }
  async findById(id) { /* implementación */ }
  async findAll(criteria) { /* implementación */ }
}
```

**Versionado de Data:**
- Migración de schemas
- Backward compatibility
- Rollback capability

**Compresión de Historial:**
- Snapshots periódicos
- Delta compression
- Retention policies
      `,
      practica: `
**Ejercicio Práctico:**

1. **Sistema de Persistencia**:
\`\`\`javascript
// src/lib/persistence/PersistenceManager.js
class PersistenceManager {
  constructor(options = {}) {
    this.storage = options.storage || 'localStorage'; // 'localStorage', 'sessionStorage', 'indexedDB'
    this.prefix = options.prefix || 'taskManager_';
    this.version = options.version || '1.0.0';
    this.maxHistorySize = options.maxHistorySize || 1000;
    this.compressionThreshold = options.compressionThreshold || 100; // entries
  }
  
  /**
   * Guarda datos con versionado y compresión
   */
  async save(key, data) {
    try {
      const wrapper = {
        version: this.version,
        timestamp: new Date().toISOString(),
        checksum: this.calculateChecksum(data),
        data: data
      };
      
      // Comprimir si es necesario
      if (this.shouldCompress(data)) {
        wrapper.data = this.compress(data);
        wrapper.compressed = true;
      }
      
      const serialized = JSON.stringify(wrapper);
      
      if (this.storage === 'localStorage') {
        localStorage.setItem(this.prefix + key, serialized);
      } else if (this.storage === 'sessionStorage') {
        sessionStorage.setItem(this.prefix + key, serialized);
      } else if (this.storage === 'indexedDB') {
        await this.saveToIndexedDB(key, wrapper);
      }
      
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  }
  
  /**
   * Carga datos con validación
   */
  async load(key) {
    try {
      let serialized;
      
      if (this.storage === 'localStorage') {
        serialized = localStorage.getItem(this.prefix + key);
      } else if (this.storage === 'sessionStorage') {
        serialized = sessionStorage.getItem(this.prefix + key);
      } else if (this.storage === 'indexedDB') {
        return await this.loadFromIndexedDB(key);
      }
      
      if (!serialized) return null;
      
      const wrapper = JSON.parse(serialized);
      
      // Validar checksum
      const expectedChecksum = this.calculateChecksum(wrapper.data);
      if (wrapper.checksum !== expectedChecksum && !wrapper.compressed) {
        console.warn('Checksum mismatch - data may be corrupted');
      }
      
      // Descomprimir si es necesario
      if (wrapper.compressed) {
        wrapper.data = this.decompress(wrapper.data);
      }
      
      // Migrar si es necesario
      if (wrapper.version !== this.version) {
        wrapper.data = await this.migrate(wrapper.data, wrapper.version, this.version);
      }
      
      return wrapper.data;
    } catch (error) {
      console.error('Error loading data:', error);
      return null;
    }
  }
  
  /**
   * Elimina datos
   */
  async delete(key) {
    try {
      if (this.storage === 'localStorage') {
        localStorage.removeItem(this.prefix + key);
      } else if (this.storage === 'sessionStorage') {
        sessionStorage.removeItem(this.prefix + key);
      } else if (this.storage === 'indexedDB') {
        await this.deleteFromIndexedDB(key);
      }
      return true;
    } catch (error) {
      console.error('Error deleting data:', error);
      return false;
    }
  }
  
  /**
   * Lista todas las claves
   */
  async keys() {
    const keys = [];
    
    if (this.storage === 'localStorage' || this.storage === 'sessionStorage') {
      const storage = this.storage === 'localStorage' ? localStorage : sessionStorage;
      
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keys.push(key.substring(this.prefix.length));
        }
      }
    } else if (this.storage === 'indexedDB') {
      return await this.getKeysFromIndexedDB();
    }
    
    return keys;
  }
  
  /**
   * Calcula checksum para verificar integridad
   */
  calculateChecksum(data) {
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
  }
  
  /**
   * Determina si los datos deben comprimirse
   */
  shouldCompress(data) {
    const size = JSON.stringify(data).length;
    return size > 1024; // Comprimir si es mayor a 1KB
  }
  
  /**
   * Comprime datos
   */
  compress(data) {
    // Implementación básica - en producción usar LZ4, gzip, etc.
    const str = JSON.stringify(data);
    const compressed = this.simpleCompress(str);
    return compressed;
  }
  
  /**
   * Descomprime datos
   */
  decompress(compressedData) {
    const decompressed = this.simpleDecompress(compressedData);
    return JSON.parse(decompressed);
  }
  
  /**
   * Migra datos entre versiones
   */
  async migrate(data, fromVersion, toVersion) {
    console.log(\`Migrating data from \${fromVersion} to \${toVersion}\`);
    
    // Definir migraciones
    const migrations = {
      '1.0.0': {
        '1.1.0': (data) => {
          // Ejemplo: añadir campo nuevo
          if (Array.isArray(data)) {
            return data.map(item => ({
              ...item,
              newField: 'defaultValue'
            }));
          }
          return data;
        }
      }
    };
    
    let currentData = data;
    let currentVersion = fromVersion;
    
    // Aplicar migraciones secuencialmente
    while (currentVersion !== toVersion) {
      const migration = migrations[currentVersion]?.[toVersion];
      if (migration) {
        currentData = migration(currentData);
        currentVersion = toVersion;
      } else {
        console.warn(\`No migration path from \${currentVersion} to \${toVersion}\`);
        break;
      }
    }
    
    return currentData;
  }
  
  /**
   * Compresión simple por frecuencia
   */
  simpleCompress(str) {
    const freq = {};
    const result = [];
    
    // Analizar frecuencias
    for (const char of str) {
      freq[char] = (freq[char] || 0) + 1;
    }
    
    // Crear diccionario simple
    const common = Object.entries(freq)
      .filter(([_, count]) => count > 3)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([char], idx) => [char, String.fromCharCode(1 + idx)]);
    
    let compressed = str;
    const dictionary = {};
    
    common.forEach(([original, replacement]) => {
      compressed = compressed.split(original).join(replacement);
      dictionary[replacement] = original;
    });
    
    return {
      compressed,
      dictionary
    };
  }
  
  /**
   * Descompresión simple
   */
  simpleDecompress(compressedData) {
    if (typeof compressedData === 'string') return compressedData;
    
    let { compressed, dictionary } = compressedData;
    
    Object.entries(dictionary).forEach(([replacement, original]) => {
      compressed = compressed.split(replacement).join(original);
    });
    
    return compressed;
  }
  
  // Métodos específicos para IndexedDB
  async saveToIndexedDB(key, data) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.prefix + 'db', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['data'], 'readwrite');
        const store = transaction.objectStore('data');
        
        const putRequest = store.put({ key, ...data });
        putRequest.onsuccess = () => resolve(true);
        putRequest.onerror = () => reject(putRequest.error);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('data')) {
          const store = db.createObjectStore('data', { keyPath: 'key' });
          store.createIndex('timestamp', 'timestamp');
        }
      };
    });
  }
  
  async loadFromIndexedDB(key) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.prefix + 'db', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['data'], 'readonly');
        const store = transaction.objectStore('data');
        
        const getRequest = store.get(key);
        getRequest.onsuccess = () => {
          const result = getRequest.result;
          resolve(result ? { data: result.data, compressed: result.compressed } : null);
        };
        getRequest.onerror = () => reject(getRequest.error);
      };
    });
  }
}

// src/lib/history/HistoryManager.js
class HistoryManager {
  constructor(persistenceManager) {
    this.persistence = persistenceManager;
    this.history = [];
    this.maxEntries = 1000;
    this.snapshotInterval = 100; // Snapshot cada 100 entradas
  }
  
  /**
   * Añade entrada al historial
   */
  async addEntry(entry) {
    const historyEntry = {
      id: this.generateEntryId(),
      timestamp: new Date().toISOString(),
      ...entry
    };
    
    this.history.push(historyEntry);
    
    // Mantener límite de entradas
    if (this.history.length > this.maxEntries) {
      await this.createSnapshot();
      this.history = this.history.slice(-this.maxEntries / 2); // Mantener mitad
    }
    
    // Persistir inmediatamente entradas críticas
    if (entry.critical) {
      await this.persistence.save('history_current', this.history);
    }
    
    return historyEntry;
  }
  
  /**
   * Crea snapshot del historial
   */
  async createSnapshot() {
    const snapshot = {
      id: this.generateSnapshotId(),
      timestamp: new Date().toISOString(),
      entries: [...this.history],
      summary: this.generateSummary(this.history)
    };
    
    const snapshotKey = \`history_snapshot_\${snapshot.id}\`;
    await this.persistence.save(snapshotKey, snapshot);
    
    return snapshot;
  }
  
  /**
   * Busca en el historial
   */
  search(criteria) {
    const { taskId, action, fromDate, toDate, limit = 50 } = criteria;
    
    let results = this.history;
    
    if (taskId) {
      results = results.filter(entry => entry.taskId === taskId);
    }
    
    if (action) {
      results = results.filter(entry => entry.action === action);
    }
    
    if (fromDate) {
      results = results.filter(entry => new Date(entry.timestamp) >= new Date(fromDate));
    }
    
    if (toDate) {
      results = results.filter(entry => new Date(entry.timestamp) <= new Date(toDate));
    }
    
    return results
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }
  
  generateEntryId() {
    return \`hist_\${Date.now()}_\${Math.random().toString(36).substr(2, 6)}\`;
  }
  
  generateSnapshotId() {
    return \`snap_\${Date.now()}_\${Math.random().toString(36).substr(2, 6)}\`;
  }
  
  generateSummary(entries) {
    const summary = {
      totalEntries: entries.length,
      dateRange: {
        from: entries[0]?.timestamp,
        to: entries[entries.length - 1]?.timestamp
      },
      actions: {},
      tasks: new Set()
    };
    
    entries.forEach(entry => {
      summary.actions[entry.action] = (summary.actions[entry.action] || 0) + 1;
      if (entry.taskId) summary.tasks.add(entry.taskId);
    });
    
    summary.uniqueTasks = summary.tasks.size;
    delete summary.tasks; // No serializar Set
    
    return summary;
  }
}
\`\`\`

2. **Integrar con TaskManager**:
\`\`\`javascript
class TaskManager extends BaseTaskManager {
  constructor(options = {}) {
    super();
    this.persistence = new PersistenceManager(options.persistence);
    this.historyManager = new HistoryManager(this.persistence);
    this.autoSave = options.autoSave !== false;
    this.saveInterval = options.saveInterval || 30000; // 30 segundos
    
    this.loadFromPersistence();
    
    if (this.autoSave) {
      this.startAutoSave();
    }
  }
  
  /**
   * Carga estado desde persistencia
   */
  async loadFromPersistence() {
    try {
      const data = await this.persistence.load('taskManager_state');
      if (data) {
        this.tasks = new Map(data.tasks || []);
        this.outputs = new Map(data.outputs || []);
        this.historyManager.history = data.history || [];
        
        console.log(\`Loaded \${this.tasks.size} tasks from persistence\`);
      }
    } catch (error) {
      console.error('Error loading from persistence:', error);
    }
  }
  
  /**
   * Guarda estado actual
   */
  async saveToPersistence() {
    try {
      const data = {
        tasks: Array.from(this.tasks.entries()),
        outputs: Array.from(this.outputs.entries()),
        history: this.historyManager.history.slice(-500), // Solo últimas 500 entradas
        metadata: {
          version: '1.0.0',
          savedAt: new Date().toISOString(),
          totalTasks: this.tasks.size
        }
      };
      
      await this.persistence.save('taskManager_state', data);
      return true;
    } catch (error) {
      console.error('Error saving to persistence:', error);
      return false;
    }
  }
  
  /**
   * Inicia guardado automático
   */
  startAutoSave() {
    this.autoSaveInterval = setInterval(async () => {
      await this.saveToPersistence();
    }, this.saveInterval);
  }
  
  /**
   * Detiene guardado automático
   */
  stopAutoSave() {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }
  }
  
  /**
   * Override para añadir persistencia a operaciones
   */
  async createTask(taskData) {
    const task = super.createTask(taskData);
    
    await this.historyManager.addEntry({
      action: 'task_created',
      taskId: task.id,
      data: { type: task.type, priority: task.priority }
    });
    
    if (this.autoSave) {
      await this.saveToPersistence();
    }
    
    return task;
  }
  
  async updateTaskStatus(taskId, newStatus, options = {}) {
    const task = super.updateTaskStatus(taskId, newStatus, options);
    
    await this.historyManager.addEntry({
      action: 'status_changed',
      taskId,
      data: { from: options.previousStatus, to: newStatus, reason: options.reason }
    });
    
    return task;
  }
  
  /**
   * Exporta datos para backup
   */
  async exportData() {
    const data = {
      tasks: Array.from(this.tasks.entries()),
      outputs: Array.from(this.outputs.entries()),
      history: this.historyManager.history,
      metadata: {
        exportedAt: new Date().toISOString(),
        version: '1.0.0'
      }
    };
    
    return JSON.stringify(data, null, 2);
  }
  
  /**
   * Importa datos desde backup
   */
  async importData(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      
      this.tasks = new Map(data.tasks || []);
      this.outputs = new Map(data.outputs || []);
      this.historyManager.history = data.history || [];
      
      await this.saveToPersistence();
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
}
\`\`\`
      `,
      tecnologias: ['localStorage', 'IndexedDB', 'Data migration', 'Compression', 'Backup/restore'],
      entregables: [
        'PersistenceManager con múltiples backends',
        'Sistema de historial con snapshots',
        'Migración automática de versiones',
        'Compresión de datos automática',
        'Export/import de backups',
        'Auto-save con intervalos configurables'
      ],
      tiempoTeoria: 45,
      tiempoPractica: 105,
      completado: false
    },
    {
      dia: 5,
      titulo: 'Queries y Paginación + API Endpoints',
      objetivo: 'Crear sistema de consultas avanzadas, paginación eficiente y endpoints REST completos',
      teoria: `
**Query Optimization:**

**1. Indexing Strategy:**
- Índices por estado, tipo, prioridad
- Índices compuestos para queries comunes
- Índices parciales para subconjuntos

**2. Pagination Patterns:**
- **Offset-based**: LIMIT/OFFSET (simple pero ineficiente)
- **Cursor-based**: Usando IDs o timestamps (escalable)
- **Keyset-based**: Usando claves ordenadas (más eficiente)

**3. Filtering & Sorting:**
- Múltiples criterios de filtrado
- Ordenamiento multi-campo
- Búsqueda de texto completo

**REST API Design:**
```
GET /tasks                    # Listar con filtros
GET /tasks/:id               # Obtener específica
POST /tasks                  # Crear nueva
PUT /tasks/:id               # Actualizar completa
PATCH /tasks/:id             # Actualizar parcial
DELETE /tasks/:id            # Eliminar
GET /tasks/:id/history       # Historial
GET /tasks/:id/output        # Output
```

**Response Envelope:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "hasNext": true
  },
  "filters": {...},
  "meta": {...}
}
```

**Caching Strategies:**
- Query result caching
- ETag for conditional requests
- Cache invalidation on updates
      `,
      practica: `
**Ejercicio Práctico:**

1. **Query Engine**:
\`\`\`javascript
// src/lib/query/QueryEngine.js
class QueryEngine {
  constructor(dataSource) {
    this.dataSource = dataSource; // TaskManager
    this.indexes = new Map();
    this.queryCache = new Map();
    this.cacheTimeout = 60000; // 1 minuto
    
    this.buildIndexes();
  }
  
  /**
   * Construye índices para optimizar queries
   */
  buildIndexes() {
    const tasks = Array.from(this.dataSource.tasks.values());
    
    // Índice por estado
    this.indexes.set('status', this.buildFieldIndex(tasks, 'status'));
    
    // Índice por tipo
    this.indexes.set('type', this.buildFieldIndex(tasks, 'type'));
    
    // Índice por prioridad
    this.indexes.set('priority', this.buildFieldIndex(tasks, 'priority'));
    
    // Índice temporal (por fecha de creación)
    this.indexes.set('createdAt', this.buildTemporalIndex(tasks, 'metadata.createdAt'));
    
    // Índice de texto completo
    this.indexes.set('fulltext', this.buildFullTextIndex(tasks));
  }
  
  /**
   * Ejecuta query con optimizaciones
   */
  async query(criteria = {}) {
    const {
      // Filtros
      status,
      type,
      priority,
      createdAfter,
      createdBefore,
      search,
      agentId,
      userId,
      
      // Ordenamiento
      sortBy = 'createdAt',
      sortOrder = 'desc',
      
      // Paginación
      page = 1,
      limit = 20,
      cursor = null,
      
      // Opciones
      includeOutput = false,
      includeHistory = false,
      useCache = true
    } = criteria;
    
    // Generar clave de cache
    const cacheKey = this.generateCacheKey(criteria);
    
    // Verificar cache
    if (useCache && this.queryCache.has(cacheKey)) {
      const cached = this.queryCache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.result;
      }
    }
    
    // Obtener conjunto inicial usando índices
    let candidateIds = this.getCandidateIds(criteria);
    
    // Aplicar filtros adicionales
    let tasks = this.applyFilters(candidateIds, criteria);
    
    // Aplicar búsqueda de texto
    if (search) {
      tasks = this.applyTextSearch(tasks, search);
    }
    
    // Ordenar
    tasks = this.applySorting(tasks, sortBy, sortOrder);
    
    // Paginar
    const paginationResult = this.applyPagination(tasks, { page, limit, cursor });
    
    // Enriquecer con datos adicionales
    if (includeOutput) {
      paginationResult.data = await this.enrichWithOutputs(paginationResult.data);
    }
    
    if (includeHistory) {
      paginationResult.data = await this.enrichWithHistory(paginationResult.data);
    }
    
    // Preparar resultado
    const result = {
      data: paginationResult.data,
      pagination: paginationResult.pagination,
      filters: criteria,
      meta: {
        totalFiltered: tasks.length,
        executionTime: Date.now() - startTime,
        cacheHit: false,
        indexesUsed: this.getUsedIndexes(criteria)
      }
    };
    
    // Guardar en cache
    if (useCache) {
      this.queryCache.set(cacheKey, {
        result,
        timestamp: Date.now()
      });
    }
    
    return result;
  }
  
  /**
   * Obtiene IDs candidatos usando índices
   */
  getCandidateIds(criteria) {
    const { status, type, priority, createdAfter, createdBefore } = criteria;
    let candidateIds = null;
    
    // Usar el índice más selectivo primero
    if (status) {
      const statusIndex = this.indexes.get('status');
      candidateIds = this.intersectSets(candidateIds, statusIndex.get(status));
    }
    
    if (type) {
      const typeIndex = this.indexes.get('type');
      candidateIds = this.intersectSets(candidateIds, typeIndex.get(type));
    }
    
    if (priority) {
      const priorityIndex = this.indexes.get('priority');
      candidateIds = this.intersectSets(candidateIds, priorityIndex.get(priority));
    }
    
    // Filtro temporal
    if (createdAfter || createdBefore) {
      const temporalIds = this.getTemporalIds(createdAfter, createdBefore);
      candidateIds = this.intersectSets(candidateIds, temporalIds);
    }
    
    // Si no hay filtros específicos, usar todas las tareas
    if (candidateIds === null) {
      candidateIds = new Set(this.dataSource.tasks.keys());
    }
    
    return candidateIds;
  }
  
  /**
   * Aplica filtros adicionales
   */
  applyFilters(candidateIds, criteria) {
    const { agentId, userId } = criteria;
    let tasks = [];
    
    for (const taskId of candidateIds) {
      const task = this.dataSource.tasks.get(taskId);
      if (!task) continue;
      
      let include = true;
      
      if (agentId && task.metadata.agentId !== agentId) {
        include = false;
      }
      
      if (userId && task.metadata.userId !== userId) {
        include = false;
      }
      
      if (include) {
        tasks.push(task);
      }
    }
    
    return tasks;
  }
  
  /**
   * Aplica búsqueda de texto
   */
  applyTextSearch(tasks, searchTerm) {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    const terms = normalizedSearch.split(/\\s+/);
    
    return tasks.filter(task => {
      const searchableText = [
        task.id,
        task.input,
        task.type,
        JSON.stringify(task.metadata)
      ].join(' ').toLowerCase();
      
      // Todos los términos deben estar presentes
      return terms.every(term => searchableText.includes(term));
    });
  }
  
  /**
   * Aplica ordenamiento
   */
  applySorting(tasks, sortBy, sortOrder) {
    return tasks.sort((a, b) => {
      let aVal = this.getNestedValue(a, sortBy);
      let bVal = this.getNestedValue(b, sortBy);
      
      // Manejar valores nulos
      if (aVal === null || aVal === undefined) aVal = '';
      if (bVal === null || bVal === undefined) bVal = '';
      
      // Comparar
      let comparison = 0;
      if (aVal < bVal) comparison = -1;
      else if (aVal > bVal) comparison = 1;
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }
  
  /**
   * Aplica paginación
   */
  applyPagination(tasks, options) {
    const { page, limit, cursor } = options;
    const total = tasks.length;
    
    if (cursor) {
      // Cursor-based pagination
      return this.applyCursorPagination(tasks, cursor, limit);
    } else {
      // Offset-based pagination
      const offset = (page - 1) * limit;
      const paginatedTasks = tasks.slice(offset, offset + limit);
      
      return {
        data: paginatedTasks,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: offset + limit < total,
          hasPrev: page > 1,
          nextCursor: paginatedTasks.length > 0 ? 
            paginatedTasks[paginatedTasks.length - 1].id : null
        }
      };
    }
  }
  
  /**
   * Paginación basada en cursor
   */
  applyCursorPagination(tasks, cursor, limit) {
    let startIndex = 0;
    
    if (cursor) {
      startIndex = tasks.findIndex(task => task.id === cursor) + 1;
      if (startIndex === 0) startIndex = tasks.length; // Cursor no encontrado
    }
    
    const paginatedTasks = tasks.slice(startIndex, startIndex + limit);
    
    return {
      data: paginatedTasks,
      pagination: {
        cursor,
        limit,
        hasNext: startIndex + limit < tasks.length,
        hasPrev: startIndex > 0,
        nextCursor: paginatedTasks.length > 0 ? 
          paginatedTasks[paginatedTasks.length - 1].id : null,
        prevCursor: startIndex > 0 ? tasks[startIndex - 1]?.id : null
      }
    };
  }
  
  /**
   * Construye índice por campo
   */
  buildFieldIndex(items, field) {
    const index = new Map();
    
    items.forEach(item => {
      const value = this.getNestedValue(item, field);
      if (!index.has(value)) {
        index.set(value, new Set());
      }
      index.get(value).add(item.id);
    });
    
    return index;
  }
  
  /**
   * Construye índice temporal
   */
  buildTemporalIndex(items, field) {
    const sortedItems = items
      .map(item => ({
        id: item.id,
        timestamp: new Date(this.getNestedValue(item, field))
      }))
      .sort((a, b) => a.timestamp - b.timestamp);
    
    return sortedItems;
  }
  
  /**
   * Construye índice de texto completo
   */
  buildFullTextIndex(items) {
    const index = new Map();
    
    items.forEach(item => {
      const text = [item.id, item.input, item.type].join(' ').toLowerCase();
      const words = text.split(/\\W+/).filter(word => word.length > 2);
      
      words.forEach(word => {
        if (!index.has(word)) {
          index.set(word, new Set());
        }
        index.get(word).add(item.id);
      });
    });
    
    return index;
  }
  
  /**
   * Obtiene valor anidado usando dot notation
   */
  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }
  
  /**
   * Intersección de conjuntos
   */
  intersectSets(setA, setB) {
    if (setA === null) return setB;
    if (setB === null) return setA;
    
    const result = new Set();
    for (const item of setA) {
      if (setB.has(item)) {
        result.add(item);
      }
    }
    return result;
  }
  
  /**
   * Genera clave de cache
   */
  generateCacheKey(criteria) {
    const sortedCriteria = Object.keys(criteria)
      .sort()
      .reduce((obj, key) => {
        obj[key] = criteria[key];
        return obj;
      }, {});
    
    return JSON.stringify(sortedCriteria);
  }
  
  /**
   * Invalida cache
   */
  invalidateCache(pattern = null) {
    if (pattern) {
      for (const key of this.queryCache.keys()) {
        if (key.includes(pattern)) {
          this.queryCache.delete(key);
        }
      }
    } else {
      this.queryCache.clear();
    }
  }
}
\`\`\`

2. **API REST Endpoints**:
\`\`\`javascript
// src/api/TaskAPI.js
class TaskAPI {
  constructor(taskManager) {
    this.taskManager = taskManager;
    this.queryEngine = new QueryEngine(taskManager);
  }
  
  /**
   * GET /tasks
   */
  async getTasks(request) {
    try {
      const query = this.parseQuery(request.query);
      const result = await this.queryEngine.query(query);
      
      return this.successResponse(result, 'Tasks retrieved successfully');
    } catch (error) {
      return this.errorResponse(400, error.message);
    }
  }
  
  /**
   * GET /tasks/:id
   */
  async getTask(request) {
    try {
      const { id } = request.params;
      const task = this.taskManager.getTask(id);
      
      if (!task) {
        return this.errorResponse(404, 'Task not found');
      }
      
      // Enriquecer con datos adicionales si se solicita
      let enrichedTask = { ...task };
      
      if (request.query.include_output) {
        enrichedTask.output = this.taskManager.getTaskOutput(id);
      }
      
      if (request.query.include_history) {
        enrichedTask.history = this.taskManager.getTaskStateHistory(id);
      }
      
      return this.successResponse(enrichedTask, 'Task retrieved successfully');
    } catch (error) {
      return this.errorResponse(500, error.message);
    }
  }
  
  /**
   * POST /tasks
   */
  async createTask(request) {
    try {
      const taskData = request.body;
      
      // Validar entrada
      const validation = this.validateTaskData(taskData);
      if (!validation.isValid) {
        return this.errorResponse(400, 'Invalid task data', validation.errors);
      }
      
      const task = this.taskManager.createTask(taskData);
      
      // Invalidar cache de queries
      this.queryEngine.invalidateCache();
      
      return this.successResponse(task, 'Task created successfully', 201);
    } catch (error) {
      return this.errorResponse(400, error.message);
    }
  }
  
  /**
   * PATCH /tasks/:id/status
   */
  async updateTaskStatus(request) {
    try {
      const { id } = request.params;
      const { status, reason, metadata } = request.body;
      
      if (!status) {
        return this.errorResponse(400, 'Status is required');
      }
      
      const task = this.taskManager.updateTaskStatus(id, status, {
        reason,
        metadata,
        userId: request.user?.id || 'api'
      });
      
      this.queryEngine.invalidateCache(\`status:\${status}\`);
      
      return this.successResponse(task, 'Task status updated successfully');
    } catch (error) {
      return this.errorResponse(400, error.message);
    }
  }
  
  /**
   * PUT /tasks/:id/output
   */
  async setTaskOutput(request) {
    try {
      const { id } = request.params;
      const { content, metadata } = request.body;
      
      const output = this.taskManager.setTaskOutput(id, content, metadata);
      
      return this.successResponse(output, 'Task output set successfully');
    } catch (error) {
      return this.errorResponse(400, error.message);
    }
  }
  
  /**
   * GET /tasks/:id/history
   */
  async getTaskHistory(request) {
    try {
      const { id } = request.params;
      const history = this.taskManager.getTaskStateHistory(id);
      
      return this.successResponse(history, 'Task history retrieved successfully');
    } catch (error) {
      return this.errorResponse(404, 'Task not found');
    }
  }
  
  /**
   * GET /tasks/stats
   */
  async getStats(request) {
    try {
      const stats = {
        tasks: this.taskManager.getStats(),
        transitions: this.taskManager.getTransitionStats(),
        outputs: this.taskManager.outputManager.getOutputStats()
      };
      
      return this.successResponse(stats, 'Stats retrieved successfully');
    } catch (error) {
      return this.errorResponse(500, error.message);
    }
  }
  
  /**
   * DELETE /tasks/:id
   */
  async deleteTask(request) {
    try {
      const { id } = request.params;
      const deleted = this.taskManager.deleteTask(id);
      
      if (!deleted) {
        return this.errorResponse(404, 'Task not found');
      }
      
      this.queryEngine.invalidateCache();
      
      return this.successResponse(null, 'Task deleted successfully');
    } catch (error) {
      return this.errorResponse(500, error.message);
    }
  }
  
  // Métodos auxiliares
  parseQuery(query) {
    const parsed = {};
    
    // Filtros simples
    ['status', 'type', 'priority', 'agentId', 'userId', 'search'].forEach(field => {
      if (query[field]) parsed[field] = query[field];
    });
    
    // Filtros de fecha
    if (query.created_after) parsed.createdAfter = query.created_after;
    if (query.created_before) parsed.createdBefore = query.created_before;
    
    // Ordenamiento
    if (query.sort_by) parsed.sortBy = query.sort_by;
    if (query.sort_order) parsed.sortOrder = query.sort_order;
    
    // Paginación
    if (query.page) parsed.page = parseInt(query.page);
    if (query.limit) parsed.limit = Math.min(parseInt(query.limit), 100); // Máximo 100
    if (query.cursor) parsed.cursor = query.cursor;
    
    // Opciones
    parsed.includeOutput = query.include_output === 'true';
    parsed.includeHistory = query.include_history === 'true';
    parsed.useCache = query.use_cache !== 'false';
    
    return parsed;
  }
  
  validateTaskData(data) {
    const errors = [];
    
    if (!data.input || typeof data.input !== 'string') {
      errors.push('Input is required and must be a string');
    }
    
    if (data.type && !['text', 'code', 'analysis', 'creative'].includes(data.type)) {
      errors.push('Invalid task type');
    }
    
    if (data.priority && (data.priority < 1 || data.priority > 5)) {
      errors.push('Priority must be between 1 and 5');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  successResponse(data, message, status = 200) {
    return {
      status,
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    };
  }
  
  errorResponse(status, message, details = null) {
    return {
      status,
      success: false,
      error: {
        message,
        details,
        timestamp: new Date().toISOString()
      }
    };
  }
}
\`\`\`

3. **Tests para Query Engine**:
\`\`\`javascript
// tests/QueryEngine.test.js
describe('QueryEngine', () => {
  let taskManager;
  let queryEngine;
  
  beforeEach(() => {
    taskManager = new TaskManager();
    
    // Crear datos de prueba
    for (let i = 0; i < 50; i++) {
      taskManager.createTask({
        type: i % 2 === 0 ? 'text' : 'code',
        input: \`Test task \${i}\`,
        priority: (i % 5) + 1,
        userId: \`user-\${i % 3}\`
      });
    }
    
    queryEngine = new QueryEngine(taskManager);
  });
  
  test('filtra por estado', async () => {
    const result = await queryEngine.query({ status: 'pending' });
    expect(result.data.every(task => task.status === 'pending')).toBe(true);
  });
  
  test('pagina correctamente', async () => {
    const result = await queryEngine.query({ page: 1, limit: 10 });
    
    expect(result.data).toHaveLength(10);
    expect(result.pagination.page).toBe(1);
    expect(result.pagination.limit).toBe(10);
    expect(result.pagination.total).toBe(50);
    expect(result.pagination.hasNext).toBe(true);
  });
  
  test('busca texto', async () => {
    const result = await queryEngine.query({ search: 'task 15' });
    expect(result.data.some(task => task.input.includes('15'))).toBe(true);
  });
  
  test('usa cache', async () => {
    const query = { status: 'pending', limit: 5 };
    
    const result1 = await queryEngine.query(query);
    const result2 = await queryEngine.query(query);
    
    expect(result2.meta.cacheHit).toBe(true);
  });
});
\`\`\`
      `,
      tecnologias: ['Indexing', 'Pagination', 'REST APIs', 'Caching', 'Query optimization', 'Express.js'],
      entregables: [
        'QueryEngine con índices optimizados',
        'Sistema de paginación cursor y offset',
        'API REST completa con todos los endpoints',
        'Cache de queries con invalidación',
        'Búsqueda de texto completo',
        'Tests completos de queries y API'
      ],
      tiempoTeoria: 50,
      tiempoPractica: 120,
      completado: false
    }
  ];

  // Cargar progreso desde localStorage
  useEffect(() => {
    const progresoGuardado = localStorage.getItem('academia-f1-m1-s2-tareas')
    if (progresoGuardado) {
      const { completadas, progreso: porcentaje } = JSON.parse(progresoGuardado)
      setTareasCompletadas(new Set(completadas))
      setProgreso(porcentaje)
    }
  }, [])

  // Guardar progreso en localStorage
  useEffect(() => {
    const completadas = Array.from(tareasCompletadas)
    const porcentajeProgreso = Math.round((completadas.length / tareas.length) * 100)
    
    localStorage.setItem('academia-f1-m1-s2-tareas', JSON.stringify({
      completadas,
      progreso: porcentajeProgreso
    }))
    
    setProgreso(porcentajeProgreso)
  }, [tareasCompletadas, tareas.length])

  const toggleTarea = (dia: number) => {
    const nuevasCompletadas = new Set(tareasCompletadas)
    if (nuevasCompletadas.has(dia)) {
      nuevasCompletadas.delete(dia)
    } else {
      nuevasCompletadas.add(dia)
    }
    setTareasCompletadas(nuevasCompletadas)
  }

  const getTiempoTotal = (tarea: TareaDiaria) => tarea.tiempoTeoria + tarea.tiempoPractica

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/agencia/mes-1/semana-2"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-green-600/20 border border-green-600/30 rounded-full text-sm font-medium text-green-400">
                F1-M1-S2
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">TaskManager v0.1</h1>
                <p className="text-gray-400">5 días de desarrollo estructurado</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progreso de Tareas</span>
              <span className="text-sm text-gray-400">{progreso}% completado</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-600 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progreso}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
              <span>{tareasCompletadas.size} de {tareas.length} tareas</span>
              <span>~{tareas.reduce((acc, t) => acc + getTiempoTotal(t), 0)} min total</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Objective */}
        <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-800/30 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3 text-green-400">🎯 Objetivo de la Tarea</h2>
          <p className="text-gray-300 mb-4">
            Construir el núcleo de gestión de tareas con validación robusta, estados, persistencia y API REST completa.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
              <div className="font-medium text-green-400 mb-1">🔧 Tecnologías</div>
              <div className="text-gray-400">JavaScript ES6+, UUID, Express.js, IndexedDB</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
              <div className="font-medium text-blue-400 mb-1">📦 Entregables</div>
              <div className="text-gray-400">TaskManager + API + Tests + Persistencia</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
              <div className="font-medium text-purple-400 mb-1">⏱️ Duración</div>
              <div className="text-gray-400">~{tareas.reduce((acc, t) => acc + getTiempoTotal(t), 0)} minutos</div>
            </div>
          </div>
        </div>

        {/* Daily Tasks */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Tareas Diarias Detalladas</h2>
          
          {tareas.map((tarea) => (
            <div
              key={tarea.dia}
              className={`bg-gray-900 border rounded-xl p-6 transition-all ${
                tareasCompletadas.has(tarea.dia)
                  ? 'border-green-600/30 bg-green-900/10'
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              {/* Task Header */}
              <div className="flex items-start gap-4 mb-6">
                <button
                  onClick={() => toggleTarea(tarea.dia)}
                  className="mt-1"
                >
                  {tareasCompletadas.has(tarea.dia) ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-600 hover:text-gray-400" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-green-400" />
                    <span className="px-2 py-1 bg-green-900/20 text-green-400 text-xs rounded">
                      Día {tarea.dia}
                    </span>
                    <h3 className="text-lg font-semibold">{tarea.titulo}</h3>
                  </div>
                  
                  <p className="text-gray-400 mb-3">{tarea.objetivo}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Teoría: {tarea.tiempoTeoria}min
                    </div>
                    <div className="flex items-center gap-1">
                      <Code className="w-3 h-3" />
                      Práctica: {tarea.tiempoPractica}min
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      Total: {getTiempoTotal(tarea)}min
                    </div>
                  </div>
                </div>
              </div>

              {/* Theory Section */}
              <div className="ml-10 space-y-6">
                <div className="bg-blue-950/20 border border-blue-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-blue-400 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Teoría ({tarea.tiempoTeoria} minutos)
                  </h4>
                  <div className="text-gray-300 text-sm whitespace-pre-line">
                    {tarea.teoria}
                  </div>
                </div>

                {/* Practice Section */}
                <div className="bg-green-950/20 border border-green-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-green-400 mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Práctica ({tarea.tiempoPractica} minutos)
                  </h4>
                  <div className="text-gray-300 text-sm whitespace-pre-line">
                    {tarea.practica}
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {tarea.tecnologias.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Deliverables */}
                <div className="bg-yellow-950/20 border border-yellow-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-yellow-400 mb-2 text-sm">📦 Entregables</h5>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {tarea.entregables.map((entregable, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        {entregable}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => toggleTarea(tarea.dia)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      tareasCompletadas.has(tarea.dia)
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {tareasCompletadas.has(tarea.dia) ? 'Completado' : 'Marcar como completado'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps */}
        {progreso === 100 && (
          <div className="mt-8 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-800/30 rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-4 text-green-400">🎉 ¡Tarea F1-M1-S2 Completada!</h3>
            <p className="text-gray-300 mb-6">
              Has construido un TaskManager completo con API REST. Ahora estás listo para crear agentes especializados.
            </p>
            <Link
              href="/agencia/mes-1/semana-2"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
            >
              Volver a Semana 2 <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}