import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import dotenv from 'dotenv';
import EventEmitter from 'events';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar nuestras clases
import TaskManager from './core/TaskManager.js';
import PromptManager from './core/PromptManager.js';
import ContentCreatorAgent from './agents/ContentCreatorAgent.js';
import DatabaseManager from './database/Database.js';

// Obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar variables de entorno
dotenv.config();

/**
 * Servidor Express principal de la Agencia IA Multi-Agente con integración Claude Flow
 * 
 * Características:
 * - API REST para gestión de tareas
 * - WebSocket para actualizaciones en tiempo real
 * - Sistema de agentes conectado
 * - Arquitectura basada en eventos
 * - Memoria persistente con SQLite
 * - Integración con Claude Flow
 */
class AgencyServer {
  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
      }
    });
    
    this.port = process.env.PORT || 3001;
    
    // Inicializar componentes del sistema
    this.initializeComponents();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupWebSocket();
    this.setupEventListeners();
    this.initializeClaudeFlow();
  }

  /**
   * Inicializa los componentes principales del sistema
   */
  initializeComponents() {
    console.log('🔧 Inicializando componentes...');
    
    // EventBus para comunicación entre componentes
    this.eventBus = new EventEmitter();
    
    // Inicializar base de datos SQLite
    this.databaseManager = new DatabaseManager();
    const dbInitialized = this.databaseManager.initialize();
    
    if (dbInitialized) {
      console.log('✅ Base de datos SQLite inicializada');
      this.memoryDb = this.databaseManager.db;
      this.db = this.databaseManager.getAdapter();
    } else {
      console.log('⚠️  Usando almacenamiento en memoria (fallback)');
      this.memoryDb = null;
      
      // Mock Database para tareas (fallback)
      this.db = {
      tasks: new Map(),
      projects: new Map(),
      
      async insert(collection, data) {
        if (collection === 'tasks') {
          this.tasks.set(data.taskId, data);
          return data;
        }
        return null;
      },
      
      async findOne(collection, query) {
        if (collection === 'tasks') {
          if (query.taskId) {
            return this.tasks.get(query.taskId) || null;
          }
        }
        return null;
      },
      
      async find(collection, query, options = {}) {
        if (collection === 'tasks') {
          let results = Array.from(this.tasks.values());
          
          if (query.targetAgent) {
            results = results.filter(task => task.targetAgent === query.targetAgent);
          }
          if (query.status && query.status.$in) {
            results = results.filter(task => query.status.$in.includes(task.status));
          }
          if (query.projectId) {
            results = results.filter(task => task.projectId === query.projectId);
          }
          
          if (options.sort) {
            results.sort((a, b) => {
              if (options.sort.priority) {
                return (b.priority || 0) - (a.priority || 0);
              }
              return 0;
            });
          }
          
          if (options.limit) {
            results = results.slice(0, options.limit);
          }
          
          return results;
        }
        return [];
      },
      
      async update(collection, query, data) {
        if (collection === 'tasks' && query.taskId) {
          const existing = this.tasks.get(query.taskId);
          if (existing) {
            this.tasks.set(query.taskId, { ...existing, ...data });
            return { ...existing, ...data };
          }
        }
        return null;
      }
    };
    }
    
    // Adaptador para TaskManager (solo si usamos fallback)
    const dbAdapter = dbInitialized ? this.db : {
      tasks: {
        insert: (data) => this.db.insert('tasks', data),
        findOne: (query) => this.db.findOne('tasks', query),
        find: (query) => ({ 
          sort: (sortOptions) => ({ 
            limit: (limitCount) => this.db.find('tasks', query, { sort: sortOptions, limit: limitCount }) 
          }) 
        }),
        update: (query, data) => this.db.update('tasks', query, data)
      }
    };
    
    // Inicializar gestores
    this.promptManager = new PromptManager();
    this.taskManager = new TaskManager(dbAdapter, this.eventBus);
    
    // Inicializar agentes según configuración Claude Flow
    this.agents = {
      content_creator: new ContentCreatorAgent(this.taskManager, this.promptManager, null),
      asistente: new ContentCreatorAgent(this.taskManager, this.promptManager, null), // Temporalmente usar ContentCreator
      ejecutor: new ContentCreatorAgent(this.taskManager, this.promptManager, null),  // Temporalmente usar ContentCreator
      profesor: new ContentCreatorAgent(this.taskManager, this.promptManager, null)   // Temporalmente usar ContentCreator
    };
    
    console.log('✅ Componentes del sistema inicializados');
  }

  /**
   * Inicializa la integración con Claude Flow
   */
  initializeClaudeFlow() {
    console.log('🔗 Inicializando Claude Flow...');
    
    // Cargar configuración de agentes
    try {
      const configPath = path.join(process.cwd(), '.claude-flow/agents.config.js');
      console.log('📍 Buscando configuración en:', configPath);
      
      import(configPath).then(module => {
        this.claudeFlowConfig = module.default;
        console.log('✅ Configuración de Claude Flow cargada');
        
        // Actualizar configuración de agentes según Claude Flow
        if (this.claudeFlowConfig.agents) {
          Object.entries(this.claudeFlowConfig.agents).forEach(([agentId, config]) => {
            if (this.agents[agentId]) {
              // Actualizar configuración del agente
              console.log(`📋 Configurando agente ${agentId} con Claude Flow`);
            }
          });
        }
      }).catch(error => {
        console.warn('⚠️  No se pudo cargar la configuración de Claude Flow:', error.message);
        this.claudeFlowConfig = null;
      });
    } catch (error) {
      console.warn('⚠️  Claude Flow no está configurado:', error.message);
      this.claudeFlowConfig = null;
    }
    
    console.log('✅ Claude Flow inicializado');
  }

  /**
   * Guarda un contexto en la memoria persistente de Claude Flow
   */
  saveToMemory(agentId, contextType, content) {
    if (this.databaseManager) {
      this.databaseManager.saveMemory(agentId, contextType, content);
    }
  }

  /**
   * Registra una interacción entre agentes
   */
  logAgentInteraction(sessionId, agentFrom, agentTo, message) {
    if (this.databaseManager) {
      this.databaseManager.logInteraction(sessionId, agentFrom, agentTo, message);
    }
  }

  /**
   * Registra el historial de una tarea
   */
  logTaskHistory(taskId, agentId, action, result, durationMs) {
    if (this.databaseManager) {
      this.databaseManager.logTaskHistory(taskId, agentId, action, result, durationMs);
    }
  }

  /**
   * Configura middleware de Express
   */
  setupMiddleware() {
    // CORS
    this.app.use(cors({
      origin: ['http://localhost:3000', 'http://localhost:3001', '*'],
      credentials: true
    }));
    
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    // Servir archivos estáticos desde public
    this.app.use(express.static(path.join(__dirname, '../public')));
    
    // Logging
    this.app.use((req, res, next) => {
      console.log(`${req.method} ${req.path}`, req.body);
      next();
    });
  }

  /**
   * Configura las rutas de la API
   */
  setupRoutes() {
    // Ruta de salud del sistema
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        components: {
          taskManager: 'running',
          promptManager: 'running',
          agents: Object.keys(this.agents),
          database: 'connected',
          claudeFlow: this.claudeFlowConfig ? 'active' : 'inactive',
          memory: this.memoryDb ? 'connected' : 'disconnected'
        }
      });
    });

    // CRUD de tareas con soporte Claude Flow
    this.app.post('/api/tasks', async (req, res) => {
      try {
        const { projectId, targetAgent, prompt, context = {}, priority = 5 } = req.body;
        
        if (!projectId || !targetAgent || !prompt) {
          return res.status(400).json({
            error: 'Missing required fields: projectId, targetAgent, prompt'
          });
        }
        
        // Determinar si es un modo especial de Claude Flow
        const isSwarmMode = context.mode === 'swarm';
        const isWorkflowMode = context.mode === 'workflow';
        const isHiveMindMode = context.mode === 'hive-mind';
        
        // Crear tarea
        const task = await this.taskManager.createTask({
          projectId,
          requesterAgent: context.sessionId || 'human',
          targetAgent,
          input: {
            prompt,
            context: {
              ...context,
              claudeFlow: {
                swarm: isSwarmMode,
                workflow: isWorkflowMode,
                hiveMind: isHiveMindMode
              }
            },
            data: req.body.data || null
          },
          priority: isSwarmMode ? 10 : priority
        });
        
        // Guardar en memoria si está habilitado
        if (context.memory && context.sessionId) {
          this.saveToMemory(targetAgent, 'task_created', {
            taskId: task.taskId,
            prompt: prompt,
            mode: context.mode,
            sessionId: context.sessionId
          });
        }
        
        // Emitir evento para procesamiento
        this.eventBus.emit('task:ready_for_processing', task);
        
        res.status(201).json(task);
      } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: error.message });
      }
    });

    this.app.get('/api/tasks/:taskId', async (req, res) => {
      try {
        const task = await this.taskManager.getTask(req.params.taskId);
        if (!task) {
          return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
      } catch (error) {
        console.error('Error getting task:', error);
        res.status(500).json({ error: error.message });
      }
    });

    this.app.get('/api/tasks', async (req, res) => {
      try {
        const { agent, status, projectId, limit = 50 } = req.query;
        
        const query = {};
        if (agent) query.targetAgent = agent;
        if (status) query.status = { $in: status.split(',') };
        if (projectId) query.projectId = projectId;
        
        const tasks = await this.db.find('tasks', query, { limit: parseInt(limit) });
        res.json(tasks);
      } catch (error) {
        console.error('Error listing tasks:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Feedback humano
    this.app.post('/api/tasks/:taskId/feedback', async (req, res) => {
      try {
        const { approved, comments, corrections } = req.body;
        
        const feedback = {
          wasApproved: Boolean(approved),
          correction: comments || corrections || '',
          rating: approved ? 5 : 2,
          reviewerId: 'human'
        };
        
        const result = await this.taskManager.applyHumanFeedback(req.params.taskId, feedback);
        
        // Guardar feedback en memoria
        if (result) {
          this.saveToMemory(result.targetAgent, 'feedback_received', {
            taskId: req.params.taskId,
            approved: approved,
            feedback: feedback
          });
        }
        
        res.json({
          message: 'Feedback applied successfully',
          task: result
        });
      } catch (error) {
        console.error('Error applying feedback:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Métricas de agentes mejoradas
    this.app.get('/api/agents/:agentId/metrics', async (req, res) => {
      try {
        const { agentId } = req.params;
        const { timeRange = '24h' } = req.query;
        
        // Obtener métricas básicas
        const metrics = await this.taskManager.getAgentMetrics(agentId, timeRange);
        
        // Agregar métricas de Claude Flow si está disponible
        if (this.memoryDb) {
          try {
            const recentTasks = this.memoryDb.prepare(`
              SELECT COUNT(*) as count, AVG(duration_ms) as avg_duration
              FROM task_history
              WHERE agent_id = ? AND created_at > datetime('now', '-1 day')
            `).get(agentId);
            
            metrics.claudeFlowStats = {
              recentTaskCount: recentTasks.count || 0,
              averageDuration: recentTasks.avg_duration || 0
            };
          } catch (error) {
            console.error('Error obteniendo métricas de Claude Flow:', error);
          }
        }
        
        res.json({
          agentId,
          timeRange,
          metrics
        });
      } catch (error) {
        console.error('Error getting agent metrics:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Dashboard general mejorado
    this.app.get('/api/dashboard', async (req, res) => {
      try {
        const allTasks = Array.from(this.db.tasks.values());
        
        const dashboard = {
          totalTasks: allTasks.length,
          tasksByStatus: {
            pending: allTasks.filter(t => t.status === 'pending').length,
            in_progress: allTasks.filter(t => t.status === 'in_progress').length,
            completed: allTasks.filter(t => t.status === 'completed').length,
            failed: allTasks.filter(t => t.status === 'failed').length,
            needs_validation: allTasks.filter(t => t.status === 'needs_validation').length
          },
          agentMetrics: {},
          recentTasks: allTasks
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 10),
          claudeFlowStatus: {
            enabled: !!this.claudeFlowConfig,
            memoryConnected: !!this.memoryDb,
            activeAgents: Object.keys(this.agents)
          }
        };
        
        // Agregar métricas por agente
        for (const agentId of Object.keys(this.agents)) {
          const agent = this.agents[agentId];
          const agentTasks = allTasks.filter(t => t.targetAgent === agentId);
          const completedTasks = agentTasks.filter(t => t.status === 'completed');
          
          dashboard.agentMetrics[agentId] = {
            tasksProcessed: agentTasks.length,
            tasksCompleted: completedTasks.length,
            successRate: agentTasks.length > 0 
              ? Math.round((completedTasks.length / agentTasks.length) * 100) 
              : 0,
            averageDuration: 0, // Calculado en base a execution.duration
            isActive: true
          };
        }
        
        res.json(dashboard);
      } catch (error) {
        console.error('Error getting dashboard:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // Procesar tarea manualmente
    this.app.post('/api/tasks/:taskId/process', async (req, res) => {
      try {
        const task = await this.taskManager.getTask(req.params.taskId);
        if (!task) {
          return res.status(404).json({ error: 'Task not found' });
        }
        
        const agent = this.agents[task.targetAgent];
        if (!agent) {
          return res.status(400).json({ error: `Agent ${task.targetAgent} not available` });
        }
        
        const startTime = Date.now();
        const result = await agent.processTask(task);
        const duration = Date.now() - startTime;
        
        // Registrar en historial
        this.logTaskHistory(task.taskId, task.targetAgent, 'manual_process', 'completed', duration);
        
        res.json({
          message: 'Task processed successfully',
          result,
          duration
        });
      } catch (error) {
        console.error('Error processing task:', error);
        res.status(500).json({ error: error.message });
      }
    });
  }

  /**
   * Configura WebSocket para actualizaciones en tiempo real
   */
  setupWebSocket() {
    this.io.on('connection', (socket) => {
      console.log(`🔌 Cliente conectado: ${socket.id}`);
      
      // Enviar estado inicial
      socket.emit('system:status', {
        status: 'connected',
        agents: Object.keys(this.agents),
        claudeFlow: !!this.claudeFlowConfig,
        timestamp: new Date().toISOString()
      });
      
      // Manejo de eventos de Claude Flow
      socket.on('claudeflow:session', (sessionId) => {
        socket.join(`session:${sessionId}`);
        console.log(`Cliente ${socket.id} unido a sesión ${sessionId}`);
      });
      
      socket.on('disconnect', () => {
        console.log(`🔌 Cliente desconectado: ${socket.id}`);
      });
      
      socket.on('subscribe:task', (taskId) => {
        socket.join(`task:${taskId}`);
        console.log(`Cliente ${socket.id} suscrito a tarea ${taskId}`);
      });
      
      socket.on('unsubscribe:task', (taskId) => {
        socket.leave(`task:${taskId}`);
        console.log(`Cliente ${socket.id} desuscrito de tarea ${taskId}`);
      });
      
      // Eventos de agentes
      socket.on('agent:message', (data) => {
        const { agentId, message, sessionId } = data;
        if (sessionId) {
          this.io.to(`session:${sessionId}`).emit('agent:message', {
            agent: agentId,
            content: message,
            timestamp: new Date().toISOString()
          });
        }
      });
    });
  }

  /**
   * Configura listeners para eventos del sistema
   */
  setupEventListeners() {
    // Eventos de tareas
    this.eventBus.on('task:created', (task) => {
      console.log(`📝 Tarea creada: ${task.taskId}`);
      this.io.emit('task:created', task);
      
      // Registrar en historial
      this.logTaskHistory(task.taskId, task.targetAgent, 'created', null, 0);
    });
    
    this.eventBus.on('task:in_progress', (task) => {
      console.log(`⚡ Tarea en progreso: ${task.taskId}`);
      this.io.emit('task:updated', task);
      this.io.to(`task:${task.taskId}`).emit('task:status_changed', task);
      
      // Notificar a la sesión si es de Claude Flow
      if (task.input?.context?.sessionId) {
        this.io.to(`session:${task.input.context.sessionId}`).emit('task:updated', task);
      }
    });
    
    this.eventBus.on('task:completed', (task) => {
      console.log(`✅ Tarea completada: ${task.taskId}`);
      this.io.emit('task:completed', task);
      this.io.to(`task:${task.taskId}`).emit('task:completed', task);
      
      // Registrar duración
      if (task.execution?.duration) {
        this.logTaskHistory(task.taskId, task.targetAgent, 'completed', 'success', task.execution.duration);
      }
      
      // Notificar a la sesión
      if (task.input?.context?.sessionId) {
        this.io.to(`session:${task.input.context.sessionId}`).emit('task:completed', task);
      }
    });
    
    this.eventBus.on('task:failed', (task) => {
      console.log(`❌ Tarea fallida: ${task.taskId}`);
      this.io.emit('task:failed', task);
      this.io.to(`task:${task.taskId}`).emit('task:failed', task);
      
      // Registrar fallo
      this.logTaskHistory(task.taskId, task.targetAgent, 'failed', task.error || 'unknown', 0);
      
      // Notificar a la sesión
      if (task.input?.context?.sessionId) {
        this.io.to(`session:${task.input.context.sessionId}`).emit('task:failed', task);
      }
    });
    
    this.eventBus.on('task:needs_validation', (task) => {
      console.log(`🔍 Tarea necesita validación: ${task.taskId}`);
      this.io.emit('validation:required', task);
    });
    
    // Procesar tareas automáticamente
    this.eventBus.on('task:ready_for_processing', async (task) => {
      try {
        const agent = this.agents[task.targetAgent];
        if (agent) {
          console.log(`🤖 Procesando tarea ${task.taskId} con ${task.targetAgent}`);
          
          // Si es modo swarm, distribuir entre agentes
          if (task.input?.context?.claudeFlow?.swarm) {
            await this.processSwarmTask(task);
          } else if (task.input?.context?.claudeFlow?.workflow) {
            await this.processWorkflowTask(task);
          } else {
            // Procesamiento normal
            setImmediate(async () => {
              try {
                const startTime = Date.now();
                await agent.processTask(task);
                const duration = Date.now() - startTime;
                
                // Registrar métricas
                this.logTaskHistory(task.taskId, task.targetAgent, 'processed', 'success', duration);
              } catch (error) {
                console.error(`Error procesando tarea ${task.taskId}:`, error);
                this.logTaskHistory(task.taskId, task.targetAgent, 'process_error', error.message, 0);
              }
            });
          }
        } else {
          console.warn(`⚠️  Agente ${task.targetAgent} no disponible para tarea ${task.taskId}`);
        }
      } catch (error) {
        console.error('Error en auto-procesamiento:', error);
      }
    });
  }

  /**
   * Procesa una tarea en modo Swarm (múltiples agentes)
   */
  async processSwarmTask(task) {
    console.log(`🐝 Procesando tarea en modo Swarm: ${task.taskId}`);
    
    // Por ahora, simplemente procesar con el agente asignado
    // En una implementación completa, distribuiría subtareas entre múltiples agentes
    const agent = this.agents[task.targetAgent];
    if (agent) {
      const startTime = Date.now();
      await agent.processTask(task);
      const duration = Date.now() - startTime;
      
      this.logTaskHistory(task.taskId, task.targetAgent, 'swarm_processed', 'success', duration);
    }
  }

  /**
   * Procesa una tarea en modo Workflow
   */
  async processWorkflowTask(task) {
    console.log(`🔄 Procesando tarea en modo Workflow: ${task.taskId}`);
    
    // Por ahora, procesar normalmente
    // En una implementación completa, seguiría los pasos del workflow definido
    const agent = this.agents[task.targetAgent];
    if (agent) {
      const startTime = Date.now();
      await agent.processTask(task);
      const duration = Date.now() - startTime;
      
      this.logTaskHistory(task.taskId, task.targetAgent, 'workflow_processed', 'success', duration);
    }
  }

  /**
   * Inicia el servidor
   */
  start() {
    this.server.listen(this.port, () => {
      console.log(`
🚀 Servidor de Agencia IA con Claude Flow
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Puerto: ${this.port}
📊 Dashboard: http://localhost:${this.port}/api/dashboard
🔗 WebSocket: ws://localhost:${this.port}
💊 Health: http://localhost:${this.port}/health
🧠 Claude Flow: ${this.claudeFlowConfig ? 'Activo' : 'Inactivo'}
💾 Memoria: ${this.memoryDb ? 'Conectada' : 'Desconectada'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `);
    });
  }

  /**
   * Para el servidor gracefully
   */
  stop() {
    if (this.databaseManager) {
      this.databaseManager.close();
    }
    
    this.server.close(() => {
      console.log('🛑 Servidor detenido');
    });
  }
}

// Crear e iniciar el servidor si este archivo es ejecutado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const server = new AgencyServer();
  server.start();
  
  // Manejo de cierre limpio
  process.on('SIGINT', () => {
    console.log('\n🛑 Cerrando servidor...');
    server.stop();
    process.exit(0);
  });
}

export default AgencyServer;
