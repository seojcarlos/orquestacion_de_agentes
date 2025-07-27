/**
 * Hook de React para Claude Flow
 * Proporciona una interfaz reactiva para interactuar con los agentes
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { getClaudeFlow, Task, AgentMetrics } from '@/lib/claude-flow/client';

interface UseClaudeFlowOptions {
  autoConnect?: boolean;
  onTaskComplete?: (task: Task) => void;
  onTaskFailed?: (task: Task) => void;
  onAgentMessage?: (message: any) => void;
}

interface ClaudeFlowState {
  connected: boolean;
  loading: boolean;
  error: string | null;
  activeTasks: Task[];
  metrics: Record<string, AgentMetrics>;
}

export function useClaudeFlow(options: UseClaudeFlowOptions = {}) {
  const [state, setState] = useState<ClaudeFlowState>({
    connected: false,
    loading: false,
    error: null,
    activeTasks: [],
    metrics: {}
  });

  const clientRef = useRef(getClaudeFlow({ autoConnect: options.autoConnect }));
  const client = clientRef.current;

  // Efectos de conexión
  useEffect(() => {
    const handleConnected = () => {
      setState(prev => ({ ...prev, connected: true, error: null }));
    };

    const handleDisconnected = () => {
      setState(prev => ({ ...prev, connected: false }));
    };

    client.on('connected', handleConnected);
    client.on('disconnected', handleDisconnected);

    // Verificar estado inicial
    if (client.isConnected()) {
      setState(prev => ({ ...prev, connected: true }));
    }

    return () => {
      client.off('connected', handleConnected);
      client.off('disconnected', handleDisconnected);
    };
  }, [client]);

  // Efectos de tareas
  useEffect(() => {
    const handleTaskUpdated = (data: any) => {
      setState(prev => ({
        ...prev,
        activeTasks: prev.activeTasks.map(task =>
          task.taskId === data.taskId ? { ...task, ...data } : task
        )
      }));
    };

    const handleTaskCompleted = (data: any) => {
      setState(prev => ({
        ...prev,
        activeTasks: prev.activeTasks.filter(task => task.taskId !== data.taskId)
      }));
      options.onTaskComplete?.(data);
    };

    const handleTaskFailed = (data: any) => {
      setState(prev => ({
        ...prev,
        activeTasks: prev.activeTasks.filter(task => task.taskId !== data.taskId),
        error: `Tarea ${data.taskId} falló`
      }));
      options.onTaskFailed?.(data);
    };

    const handleAgentMessage = (message: any) => {
      options.onAgentMessage?.(message);
    };

    client.on('task:updated', handleTaskUpdated);
    client.on('task:completed', handleTaskCompleted);
    client.on('task:failed', handleTaskFailed);
    client.on('agent:message', handleAgentMessage);

    return () => {
      client.off('task:updated', handleTaskUpdated);
      client.off('task:completed', handleTaskCompleted);
      client.off('task:failed', handleTaskFailed);
      client.off('agent:message', handleAgentMessage);
    };
  }, [client, options]);

  // Crear tarea
  const createTask = useCallback(async (
    prompt: string,
    options?: {
      targetAgent?: string;
      context?: any;
      priority?: number;
      waitForCompletion?: boolean;
    }
  ): Promise<Task> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const task = await client.createTask({
        prompt,
        ...options
      });

      setState(prev => ({
        ...prev,
        loading: false,
        activeTasks: [...prev.activeTasks, task]
      }));

      if (options?.waitForCompletion) {
        const completed = await client.waitForCompletion(task.taskId);
        return completed;
      }

      return task;
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
      throw error;
    }
  }, [client]);

  // Ejecutar swarm
  const runSwarm = useCallback(async (
    task: string,
    options?: any
  ): Promise<Task> => {
    return createTask(task, {
      targetAgent: 'asistente',
      context: {
        mode: 'swarm',
        autoDistribute: true,
        includeAllAgents: true,
        ...options
      },
      priority: 10,
      waitForCompletion: true
    });
  }, [createTask]);

  // Ejecutar workflow
  const runWorkflow = useCallback(async (
    workflowName: string,
    input?: any
  ): Promise<Task> => {
    return createTask(`Ejecutar workflow: ${workflowName}`, {
      targetAgent: 'asistente',
      context: {
        workflow: workflowName,
        input: input,
        mode: 'workflow'
      },
      priority: 8
    });
  }, [createTask]);

  // Obtener métricas
  const fetchMetrics = useCallback(async () => {
    try {
      const metrics = await client.getMetrics();
      setState(prev => ({ ...prev, metrics }));
      return metrics;
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message }));
      throw error;
    }
  }, [client]);

  // Enviar feedback
  const sendFeedback = useCallback(async (
    taskId: string,
    approved: boolean,
    comments?: string
  ) => {
    try {
      await client.sendFeedback(taskId, { approved, comments });
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message }));
      throw error;
    }
  }, [client]);

  // Conectar/desconectar manualmente
  const connect = useCallback(() => {
    client.connect();
  }, [client]);

  const disconnect = useCallback(() => {
    client.disconnect();
  }, [client]);

  return {
    // Estado
    ...state,
    sessionId: client.getSessionId(),
    
    // Métodos
    createTask,
    runSwarm,
    runWorkflow,
    fetchMetrics,
    sendFeedback,
    connect,
    disconnect,
    
    // Cliente directo (para casos avanzados)
    client
  };
}

// Hook para agente específico
export function useAgent(agentId: 'asistente' | 'ejecutor' | 'profesor') {
  const claudeFlow = useClaudeFlow();

  const sendMessage = useCallback(async (
    message: string,
    context?: any
  ): Promise<Task> => {
    return claudeFlow.createTask(message, {
      targetAgent: agentId,
      context,
      waitForCompletion: true
    });
  }, [claudeFlow, agentId]);

  const getMetrics = useCallback(async () => {
    const allMetrics = await claudeFlow.fetchMetrics();
    return allMetrics[agentId] || null;
  }, [claudeFlow, agentId]);

  return {
    ...claudeFlow,
    sendMessage,
    getMetrics,
    agentId
  };
}

// Hook para conversación con múltiples agentes
export function useAgentConversation() {
  const [messages, setMessages] = useState<Array<{
    id: string;
    agent: string;
    content: string;
    timestamp: Date;
    type: 'user' | 'agent';
  }>>([]);

  const claudeFlow = useClaudeFlow({
    onAgentMessage: (message) => {
      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}`,
        agent: message.agent,
        content: message.content,
        timestamp: new Date(),
        type: 'agent'
      }]);
    }
  });

  const sendMessage = useCallback(async (
    content: string,
    targetAgent?: string
  ) => {
    // Agregar mensaje del usuario
    setMessages(prev => [...prev, {
      id: `msg-${Date.now()}`,
      agent: 'user',
      content,
      timestamp: new Date(),
      type: 'user'
    }]);

    // Enviar a Claude Flow
    const task = await claudeFlow.createTask(content, {
      targetAgent,
      waitForCompletion: true
    });

    // Agregar respuesta
    if (task.output?.result) {
      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}-response`,
        agent: task.targetAgent,
        content: task.output.result,
        timestamp: new Date(),
        type: 'agent'
      }]);
    }

    return task;
  }, [claudeFlow]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    sendMessage,
    clearMessages,
    ...claudeFlow
  };
}

// Hook para visualizar flujos de trabajo
export function useClaudeFlowVisualizer() {
  const [workflows, setWorkflows] = useState<Array<{
    id: string;
    name: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    steps: Array<{
      id: string;
      agent: string;
      action: string;
      status: 'pending' | 'running' | 'completed' | 'failed';
      startTime?: Date;
      endTime?: Date;
    }>;
    startTime?: Date;
    endTime?: Date;
  }>>([]);

  const [agentStates, setAgentStates] = useState<{
    asistente: 'idle' | 'working' | 'complete';
    ejecutor: 'idle' | 'working' | 'complete';
    profesor: 'idle' | 'working' | 'complete';
  }>({
    asistente: 'idle',
    ejecutor: 'idle',
    profesor: 'idle'
  });

  const claudeFlow = useClaudeFlow({
    onTaskComplete: (task) => {
      if (task.context?.workflow) {
        setWorkflows(prev => prev.map(w => 
          w.id === task.context.workflow 
            ? { ...w, status: 'completed', endTime: new Date() }
            : w
        ));
      }
      // Actualizar estado del agente
      if (task.targetAgent) {
        setAgentStates(prev => ({
          ...prev,
          [task.targetAgent]: 'complete'
        }));
      }
    },
    onTaskFailed: (task) => {
      if (task.context?.workflow) {
        setWorkflows(prev => prev.map(w => 
          w.id === task.context.workflow 
            ? { ...w, status: 'failed', endTime: new Date() }
            : w
        ));
      }
    }
  });

  const startWorkflow = useCallback(async (workflowName: string, input?: any) => {
    const workflowId = `workflow-${Date.now()}`;
    
    // Agregar workflow a la visualización
    setWorkflows(prev => [...prev, {
      id: workflowId,
      name: workflowName,
      status: 'running',
      steps: [],
      startTime: new Date()
    }]);

    try {
      const task = await claudeFlow.runWorkflow(workflowName, input);
      return task;
    } catch (error) {
      setWorkflows(prev => prev.map(w => 
        w.id === workflowId 
          ? { ...w, status: 'failed', endTime: new Date() }
          : w
      ));
      throw error;
    }
  }, [claudeFlow]);

  const simulateWorkflow = useCallback((workflowName: string) => {
    // Reiniciar estados
    setAgentStates({
      asistente: 'idle',
      ejecutor: 'idle',
      profesor: 'idle'
    });

    // Simular flujo secuencial
    setTimeout(() => {
      setAgentStates(prev => ({ ...prev, asistente: 'working' }));
    }, 500);

    setTimeout(() => {
      setAgentStates(prev => ({ ...prev, asistente: 'complete', ejecutor: 'working' }));
    }, 2000);

    setTimeout(() => {
      setAgentStates(prev => ({ ...prev, ejecutor: 'complete', profesor: 'working' }));
    }, 4000);

    setTimeout(() => {
      setAgentStates(prev => ({ ...prev, profesor: 'complete' }));
    }, 6000);
  }, []);

  const clearWorkflows = useCallback(() => {
    setWorkflows([]);
  }, []);

  return {
    workflows,
    agentStates,
    startWorkflow,
    simulateWorkflow,
    clearWorkflows,
    ...claudeFlow
  };
}
