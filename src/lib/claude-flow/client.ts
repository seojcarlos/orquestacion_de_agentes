/**
 * Cliente de Claude Flow para Next.js
 * Proporciona integración con el sistema de agentes
 */

import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import EventEmitter from 'events';

interface ClaudeFlowConfig {
  apiUrl?: string;
  wsUrl?: string;
  autoConnect?: boolean;
  memory?: boolean;
}

interface Task {
  taskId: string;
  projectId: string;
  targetAgent: string;
  prompt: string;
  context?: any;
  priority?: number;
  status?: string;
  output?: any;
}

interface AgentMetrics {
  tasksProcessed: number;
  successRate: number;
  averageDuration: number;
}

class ClaudeFlowClient extends EventEmitter {
  private config: ClaudeFlowConfig;
  private socket: Socket | null = null;
  private connected: boolean = false;
  private sessionId: string;

  constructor(config: ClaudeFlowConfig = {}) {
    super();
    this.config = {
      apiUrl: config.apiUrl || 'http://localhost:3001',
      wsUrl: config.wsUrl || 'http://localhost:3001',
      autoConnect: config.autoConnect !== false,
      memory: config.memory !== false
    };
    this.sessionId = `cf-${Date.now()}`;

    if (this.config.autoConnect) {
      this.connect();
    }
  }

  // Conectar al servidor de WebSocket
  connect() {
    if (this.connected) return;

    this.socket = io(this.config.wsUrl!, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    this.socket.on('connect', () => {
      this.connected = true;
      this.emit('connected');
      console.log('🔌 Claude Flow conectado');
    });

    this.socket.on('disconnect', () => {
      this.connected = false;
      this.emit('disconnected');
    });

    // Escuchar eventos de tareas
    this.socket.on('task:created', (data) => this.emit('task:created', data));
    this.socket.on('task:updated', (data) => this.emit('task:updated', data));
    this.socket.on('task:completed', (data) => this.emit('task:completed', data));
    this.socket.on('task:failed', (data) => this.emit('task:failed', data));

    // Escuchar eventos de agentes
    this.socket.on('agent:status', (data) => this.emit('agent:status', data));
    this.socket.on('agent:message', (data) => this.emit('agent:message', data));
  }

  // Desconectar
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }

  // API: Crear tarea
  async createTask(options: {
    prompt: string;
    targetAgent?: string;
    context?: any;
    priority?: number;
    projectId?: string;
  }): Promise<Task> {
    const response = await axios.post(`${this.config.apiUrl}/api/tasks`, {
      projectId: options.projectId || this.sessionId,
      targetAgent: options.targetAgent || 'asistente',
      prompt: options.prompt,
      context: {
        ...options.context,
        sessionId: this.sessionId,
        memory: this.config.memory
      },
      priority: options.priority || 5
    });

    return response.data;
  }

  // API: Obtener tarea
  async getTask(taskId: string): Promise<Task> {
    const response = await axios.get(`${this.config.apiUrl}/api/tasks/${taskId}`);
    return response.data;
  }

  // API: Listar tareas
  async listTasks(filters?: {
    status?: string;
    projectId?: string;
    targetAgent?: string;
  }): Promise<Task[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }

    const response = await axios.get(`${this.config.apiUrl}/api/tasks?${params}`);
    return response.data;
  }

  // API: Enviar feedback
  async sendFeedback(taskId: string, feedback: {
    approved: boolean;
    comments?: string;
    corrections?: any;
  }) {
    const response = await axios.post(
      `${this.config.apiUrl}/api/tasks/${taskId}/feedback`,
      feedback
    );
    return response.data;
  }

  // API: Obtener métricas
  async getMetrics(agentId?: string): Promise<Record<string, AgentMetrics>> {
    const url = agentId 
      ? `${this.config.apiUrl}/api/agents/${agentId}/metrics`
      : `${this.config.apiUrl}/api/dashboard`;
    
    const response = await axios.get(url);
    return agentId ? { [agentId]: response.data } : response.data.agentMetrics;
  }

  // Utilidad: Ejecutar workflow
  async runWorkflow(workflowName: string, input?: any): Promise<Task> {
    return this.createTask({
      prompt: `Ejecutar workflow: ${workflowName}`,
      targetAgent: 'asistente',
      context: {
        workflow: workflowName,
        input: input,
        mode: 'workflow'
      },
      priority: 8
    });
  }

  // Utilidad: Swarm (enjambre)
  async swarm(task: string, options?: any): Promise<Task> {
    return this.createTask({
      prompt: task,
      targetAgent: 'asistente',
      context: {
        mode: 'swarm',
        autoDistribute: true,
        includeAllAgents: true,
        ...options
      },
      priority: 10
    });
  }

  // Utilidad: Esperar por completación
  async waitForCompletion(taskId: string, timeout: number = 60000): Promise<Task> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Timeout esperando completación'));
      }, timeout);

      const checkStatus = async () => {
        try {
          const task = await this.getTask(taskId);
          if (task.status === 'completed') {
            clearTimeout(timer);
            resolve(task);
          } else if (task.status === 'failed') {
            clearTimeout(timer);
            reject(new Error('Tarea falló'));
          } else {
            setTimeout(checkStatus, 1000);
          }
        } catch (error) {
          clearTimeout(timer);
          reject(error);
        }
      };

      checkStatus();
    });
  }

  // Obtener ID de sesión
  getSessionId(): string {
    return this.sessionId;
  }

  // Estado de conexión
  isConnected(): boolean {
    return this.connected;
  }
}

// Singleton para uso global
let instance: ClaudeFlowClient | null = null;

export function getClaudeFlow(config?: ClaudeFlowConfig): ClaudeFlowClient {
  if (!instance) {
    instance = new ClaudeFlowClient(config);
  }
  return instance;
}

export default ClaudeFlowClient;
export type { Task, AgentMetrics, ClaudeFlowConfig };
