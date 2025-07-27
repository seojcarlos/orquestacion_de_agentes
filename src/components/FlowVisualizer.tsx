'use client';

import React from 'react';
import { Bot, Zap, BookOpen, ArrowRight, Loader2 } from 'lucide-react';
import { useClaudeFlowVisualizer } from '@/hooks/useClaudeFlow';

interface FlowVisualizerProps {
  workflow?: string;
  showDetails?: boolean;
}

export default function FlowVisualizer({ workflow = 'default', showDetails = true }: FlowVisualizerProps) {
  const { agentStates, simulateWorkflow } = useClaudeFlowVisualizer();

  const agents = [
    {
      id: 'asistente',
      name: 'Queen Agent',
      subtitle: 'Coordinador',
      icon: Bot,
      color: 'purple',
      description: 'Analiza y distribuye tareas'
    },
    {
      id: 'ejecutor',
      name: 'Worker Bee',
      subtitle: 'Ejecutor',
      icon: Zap,
      color: 'blue',
      description: 'Implementa código'
    },
    {
      id: 'profesor',
      name: 'Knowledge Bee',
      subtitle: 'Profesor',
      icon: BookOpen,
      color: 'green',
      description: 'Crea documentación'
    }
  ];

  const getAgentStateStyles = (state: string) => {
    switch (state) {
      case 'working':
        return 'ring-4 ring-offset-2 animate-pulse';
      case 'complete':
        return 'ring-2 ring-green-500 ring-offset-2';
      default:
        return 'opacity-60';
    }
  };

  const getAgentStateIcon = (state: string) => {
    if (state === 'working') {
      return <Loader2 className="w-4 h-4 animate-spin absolute -top-1 -right-1 bg-white rounded-full" />;
    }
    if (state === 'complete') {
      return <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">✓</span>;
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Claude Flow en Acción</h3>
        <button
          onClick={() => simulateWorkflow(workflow)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
        >
          Simular Flujo
        </button>
      </div>

      {/* Visualización de Agentes */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {agents.map((agent, index) => {
          const Icon = agent.icon;
          const state = agentStates[agent.id as keyof typeof agentStates] || 'idle';
          
          return (
            <React.Fragment key={agent.id}>
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <div
                    className={`
                      w-20 h-20 rounded-full flex items-center justify-center
                      transition-all duration-300
                      ${getAgentStateStyles(state)}
                      ${agent.color === 'purple' ? 'bg-purple-100' : ''}
                      ${agent.color === 'blue' ? 'bg-blue-100' : ''}
                      ${agent.color === 'green' ? 'bg-green-100' : ''}
                    `}
                  >
                    <Icon 
                      className={`
                        w-10 h-10 transition-all duration-300
                        ${agent.color === 'purple' ? 'text-purple-600' : ''}
                        ${agent.color === 'blue' ? 'text-blue-600' : ''}
                        ${agent.color === 'green' ? 'text-green-600' : ''}
                        ${state === 'working' ? 'scale-110' : ''}
                      `}
                    />
                    {getAgentStateIcon(state)}
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm">{agent.name}</p>
                  <p className="text-xs text-gray-600">{agent.subtitle}</p>
                </div>
              </div>
              
              {index < agents.length - 1 && (
                <ArrowRight 
                  className={`
                    w-6 h-6 text-gray-400 transition-all duration-300
                    ${state === 'working' || agentStates[agents[index + 1]?.id as keyof typeof agentStates] === 'working' 
                      ? 'text-purple-600 animate-pulse' 
                      : ''
                    }
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Detalles del Flujo */}
      {showDetails && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {agents.map((agent) => {
            const state = agentStates[agent.id as keyof typeof agentStates] || 'idle';
            const Icon = agent.icon;
            
            return (
              <div
                key={agent.id}
                className={`
                  bg-white rounded-lg p-4 transition-all duration-300
                  ${state === 'working' ? 'shadow-lg scale-105' : 'shadow'}
                  ${state === 'complete' ? 'border-2 border-green-200' : 'border border-gray-200'}
                `}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon 
                    className={`
                      w-5 h-5
                      ${agent.color === 'purple' ? 'text-purple-600' : ''}
                      ${agent.color === 'blue' ? 'text-blue-600' : ''}
                      ${agent.color === 'green' ? 'text-green-600' : ''}
                    `}
                  />
                  <h4 className="font-semibold">{agent.name}</h4>
                  {state === 'working' && <Loader2 className="w-4 h-4 animate-spin ml-auto" />}
                  {state === 'complete' && <span className="text-green-600 ml-auto text-sm">✓</span>}
                </div>
                <p className="text-sm text-gray-600">{agent.description}</p>
                
                {/* Estado del agente */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Estado: <span className="font-medium">
                      {state === 'idle' && 'En espera'}
                      {state === 'working' && 'Trabajando...'}
                      {state === 'complete' && 'Completado'}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Información del Workflow */}
      <div className="mt-6 p-4 bg-white/50 rounded-lg">
        <h4 className="font-semibold text-sm mb-2">Flujo de Trabajo: {workflow}</h4>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Coordinación Inteligente</span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Ejecución Paralela</span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Documentación Automática</span>
        </div>
      </div>
    </div>
  );
}
