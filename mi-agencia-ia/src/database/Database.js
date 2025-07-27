import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Clase Database para gestionar la persistencia con SQLite
 */
class DatabaseManager {
  constructor(dbPath = null) {
    const defaultPath = path.join(__dirname, '../../data/agency.db');
    this.dbPath = dbPath || defaultPath;
    this.db = null;
  }

  /**
   * Inicializa la conexión a la base de datos y crea las tablas
   */
  initialize() {
    try {
      // Crear directorio si no existe
      const dbDir = path.dirname(this.dbPath);
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }

      // Conectar a SQLite
      this.db = new Database(this.dbPath, { verbose: console.log });
      
      console.log('📦 Conectado a SQLite:', this.dbPath);
      
      // Crear tablas
      this.createTables();
      
      // Preparar statements comunes
      this.prepareStatements();
      
      return true;
    } catch (error) {
      console.error('❌ Error inicializando base de datos:', error);
      return false;
    }
  }

  /**
   * Crea las tablas necesarias
   */
  createTables() {
    // Tabla de tareas
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        task_id TEXT PRIMARY KEY,
        project_id TEXT NOT NULL,
        parent_task_id TEXT,
        status TEXT NOT NULL,
        priority INTEGER DEFAULT 5,
        requester_agent TEXT NOT NULL,
        target_agent TEXT NOT NULL,
        input TEXT NOT NULL,
        output TEXT,
        execution TEXT,
        history TEXT,
        human_feedback TEXT,
        metadata TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (parent_task_id) REFERENCES tasks(task_id)
      )
    `);

    // Índices para tareas
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
      CREATE INDEX IF NOT EXISTS idx_tasks_project ON tasks(project_id);
      CREATE INDEX IF NOT EXISTS idx_tasks_agent ON tasks(target_agent);
      CREATE INDEX IF NOT EXISTS idx_tasks_created ON tasks(created_at);
    `);

    // Tabla de memoria para Claude Flow
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS memory_contexts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        agent_id TEXT NOT NULL,
        context_type TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `);

    // Tabla de interacciones entre agentes
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS agent_interactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        agent_from TEXT NOT NULL,
        agent_to TEXT NOT NULL,
        message TEXT NOT NULL,
        timestamp TEXT NOT NULL
      )
    `);

    // Tabla de historial de tareas
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS task_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id TEXT NOT NULL,
        agent_id TEXT NOT NULL,
        action TEXT NOT NULL,
        result TEXT,
        duration_ms INTEGER,
        created_at TEXT NOT NULL,
        FOREIGN KEY (task_id) REFERENCES tasks(task_id)
      )
    `);

    // Tabla de proyectos
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        project_id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        owner TEXT,
        config TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `);

    // Tabla de métricas de agentes
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS agent_metrics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        agent_id TEXT NOT NULL,
        metric_type TEXT NOT NULL,
        value REAL NOT NULL,
        metadata TEXT,
        timestamp TEXT NOT NULL
      )
    `);

    console.log('✅ Tablas creadas correctamente');
  }

  /**
   * Prepara statements SQL comunes
   */
  prepareStatements() {
    this.statements = {
      // Tareas
      insertTask: this.db.prepare(`
        INSERT INTO tasks (
          task_id, project_id, parent_task_id, status, priority,
          requester_agent, target_agent, input, output, execution,
          history, human_feedback, metadata, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `),
      
      getTask: this.db.prepare('SELECT * FROM tasks WHERE task_id = ?'),
      
      updateTask: this.db.prepare(`
        UPDATE tasks SET 
          status = ?, output = ?, execution = ?, history = ?, 
          human_feedback = ?, metadata = ?, updated_at = ?
        WHERE task_id = ?
      `),
      
      // Memoria
      insertMemory: this.db.prepare(`
        INSERT INTO memory_contexts (agent_id, context_type, content, created_at, updated_at)
        VALUES (?, ?, ?, datetime('now'), datetime('now'))
      `),
      
      // Interacciones
      insertInteraction: this.db.prepare(`
        INSERT INTO agent_interactions (session_id, agent_from, agent_to, message, timestamp)
        VALUES (?, ?, ?, ?, datetime('now'))
      `),
      
      // Historial
      insertHistory: this.db.prepare(`
        INSERT INTO task_history (task_id, agent_id, action, result, duration_ms, created_at)
        VALUES (?, ?, ?, ?, ?, datetime('now'))
      `)
    };
  }

  /**
   * Adaptador para compatibilidad con el sistema existente
   */
  getAdapter() {
    return {
      tasks: {
        insert: async (data) => {
          try {
            this.statements.insertTask.run(
              data.taskId,
              data.projectId,
              data.parentTaskId,
              data.status,
              data.priority,
              data.requesterAgent,
              data.targetAgent,
              JSON.stringify(data.input),
              JSON.stringify(data.output),
              JSON.stringify(data.execution),
              JSON.stringify(data.history),
              JSON.stringify(data.humanFeedback),
              JSON.stringify(data.metadata),
              data.createdAt,
              data.updatedAt
            );
            return data;
          } catch (error) {
            console.error('Error insertando tarea:', error);
            throw error;
          }
        },
        
        findOne: async (query) => {
          try {
            if (query.taskId) {
              const row = this.statements.getTask.get(query.taskId);
              if (row) {
                return this.parseTaskRow(row);
              }
            }
            return null;
          } catch (error) {
            console.error('Error buscando tarea:', error);
            return null;
          }
        },
        
        find: (query) => {
          return {
            sort: (sortOptions) => ({
              limit: async (limitCount) => {
                try {
                  let sql = 'SELECT * FROM tasks WHERE 1=1';
                  const params = [];
                  
                  if (query.targetAgent) {
                    sql += ' AND target_agent = ?';
                    params.push(query.targetAgent);
                  }
                  
                  if (query.status?.$in) {
                    sql += ` AND status IN (${query.status.$in.map(() => '?').join(',')})`;
                    params.push(...query.status.$in);
                  }
                  
                  if (query.projectId) {
                    sql += ' AND project_id = ?';
                    params.push(query.projectId);
                  }
                  
                  if (sortOptions.priority) {
                    sql += ' ORDER BY priority DESC';
                  }
                  
                  sql += ' LIMIT ?';
                  params.push(limitCount);
                  
                  const rows = this.db.prepare(sql).all(...params);
                  return rows.map(row => this.parseTaskRow(row));
                } catch (error) {
                  console.error('Error buscando tareas:', error);
                  return [];
                }
              }
            })
          };
        },
        
        update: async (query, data) => {
          try {
            if (query.taskId) {
              const task = await this.tasks.findOne(query);
              if (task) {
                const updated = { ...task, ...data };
                this.statements.updateTask.run(
                  updated.status,
                  JSON.stringify(updated.output),
                  JSON.stringify(updated.execution),
                  JSON.stringify(updated.history),
                  JSON.stringify(updated.humanFeedback),
                  JSON.stringify(updated.metadata),
                  new Date().toISOString(),
                  query.taskId
                );
                return updated;
              }
            }
            return null;
          } catch (error) {
            console.error('Error actualizando tarea:', error);
            throw error;
          }
        }
      }
    };
  }

  /**
   * Parsea una fila de tarea de la base de datos
   */
  parseTaskRow(row) {
    return {
      taskId: row.task_id,
      projectId: row.project_id,
      parentTaskId: row.parent_task_id,
      status: row.status,
      priority: row.priority,
      requesterAgent: row.requester_agent,
      targetAgent: row.target_agent,
      input: JSON.parse(row.input),
      output: row.output ? JSON.parse(row.output) : null,
      execution: row.execution ? JSON.parse(row.execution) : {},
      history: row.history ? JSON.parse(row.history) : [],
      humanFeedback: row.human_feedback ? JSON.parse(row.human_feedback) : null,
      metadata: row.metadata ? JSON.parse(row.metadata) : {},
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  /**
   * Guarda un contexto en la memoria
   */
  saveMemory(agentId, contextType, content) {
    try {
      this.statements.insertMemory.run(agentId, contextType, JSON.stringify(content));
    } catch (error) {
      console.error('Error guardando memoria:', error);
    }
  }

  /**
   * Registra una interacción entre agentes
   */
  logInteraction(sessionId, agentFrom, agentTo, message) {
    try {
      this.statements.insertInteraction.run(sessionId, agentFrom, agentTo, message);
    } catch (error) {
      console.error('Error registrando interacción:', error);
    }
  }

  /**
   * Registra el historial de una tarea
   */
  logTaskHistory(taskId, agentId, action, result, durationMs) {
    try {
      this.statements.insertHistory.run(taskId, agentId, action, result, durationMs);
    } catch (error) {
      console.error('Error registrando historial:', error);
    }
  }

  /**
   * Obtiene métricas de un agente
   */
  getAgentMetrics(agentId, timeRange = '24h') {
    try {
      const timeLimit = timeRange === '24h' ? '-1 day' : '-7 days';
      
      const metrics = this.db.prepare(`
        SELECT 
          COUNT(*) as total_tasks,
          SUM(CASE WHEN action = 'completed' THEN 1 ELSE 0 END) as completed_tasks,
          AVG(CASE WHEN action = 'completed' THEN duration_ms ELSE NULL END) as avg_duration
        FROM task_history
        WHERE agent_id = ? AND created_at > datetime('now', ?)
      `).get(agentId, timeLimit);
      
      return {
        totalTasks: metrics.total_tasks || 0,
        completedTasks: metrics.completed_tasks || 0,
        averageDuration: metrics.avg_duration || 0,
        successRate: metrics.total_tasks > 0 
          ? (metrics.completed_tasks / metrics.total_tasks) * 100 
          : 0
      };
    } catch (error) {
      console.error('Error obteniendo métricas:', error);
      return {
        totalTasks: 0,
        completedTasks: 0,
        averageDuration: 0,
        successRate: 0
      };
    }
  }

  /**
   * Cierra la conexión a la base de datos
   */
  close() {
    if (this.db) {
      this.db.close();
      console.log('📦 Base de datos cerrada');
    }
  }
}

export default DatabaseManager;
