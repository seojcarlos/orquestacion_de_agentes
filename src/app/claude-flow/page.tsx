'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Bot, Zap, BookOpen, Activity, Database, Globe, Brain } from 'lucide-react';
import AgentChat from '@/components/AgentChat';
import { useClaudeFlow } from '@/hooks/useClaudeFlow';
import { motion } from 'framer-motion';

export default function ClaudeFlowPage() {
  const [activeTab, setActiveTab] = useState('chat');
  const { 
    connected, 
    metrics, 
    fetchMetrics, 
    activeTasks,
    runSwarm,
    loading
  } = useClaudeFlow({ autoConnect: true });

  useEffect(() => {
    // Cargar métricas al montar
    fetchMetrics();
    
    // Actualizar métricas cada 30 segundos
    const interval = setInterval(() => {
      fetchMetrics();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [fetchMetrics]);

  const handleQuickAction = async (action: string) => {
    switch (action) {
      case 'tutorial':
        await runSwarm('Crear un tutorial interactivo sobre React Hooks con ejemplos prácticos');
        break;
      case 'debug':
        await runSwarm('Ayúdame a debuggear mi aplicación Next.js que tiene problemas de rendimiento');
        break;
      case 'refactor':
        await runSwarm('Refactorizar código para mejorar la calidad y seguir mejores prácticas');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Brain className="w-8 h-8 text-purple-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Claude Flow Control Center</h1>
                  <p className="text-sm text-gray-600">Sistema de orquestación de agentes IA</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                  <span className="text-sm text-gray-600">
                    {connected ? 'Conectado' : 'Desconectado'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'chat', label: 'Chat con Agentes', icon: Bot },
              { id: 'metrics', label: 'Métricas', icon: Activity },
              { id: 'memory', label: 'Memoria', icon: Database },
              { id: 'workflows', label: 'Workflows', icon: Globe }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon className={`mr-2 w-5 h-5 ${
                  activeTab === tab.id ? 'text-purple-500' : 'text-gray-400 group-hover:text-gray-500'
                }`} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Principal */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px]">
                <AgentChat placeholder="Pregunta cualquier cosa a los agentes..." />
              </div>
            </div>

            {/* Panel lateral */}
            <div className="space-y-6">
              {/* Acciones rápidas */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                  Acciones Rápidas
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleQuickAction('tutorial')}
                    disabled={loading}
                    className="w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <div className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-3 text-purple-600" />
                      <div>
                        <p className="font-medium text-purple-900">Crear Tutorial</p>
                        <p className="text-sm text-purple-700">Tutorial interactivo con ejemplos</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuickAction('debug')}
                    disabled={loading}
                    className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <div className="flex items-center">
                      <Zap className="w-5 h-5 mr-3 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-900">Debug Asistido</p>
                        <p className="text-sm text-blue-700">Análisis y soluciones</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleQuickAction('refactor')}
                    disabled={loading}
                    className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <div className="flex items-center">
                      <Bot className="w-5 h-5 mr-3 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Refactorizar Código</p>
                        <p className="text-sm text-green-700">Mejores prácticas y optimización</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Tareas activas */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-lg font-semibold mb-3">Tareas Activas</h3>
                {activeTasks.length > 0 ? (
                  <div className="space-y-2">
                    {activeTasks.map((task) => (
                      <div key={task.taskId} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {task.prompt}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {task.targetAgent} • {task.status}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No hay tareas activas</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(metrics).map(([agentId, agentMetrics]) => (
              <motion.div
                key={agentId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold capitalize">{agentId}</h3>
                  <Bot className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Tareas Procesadas</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {agentMetrics.tasksProcessed || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tasa de Éxito</p>
                    <p className="text-2xl font-bold text-green-600">
                      {agentMetrics.successRate || 0}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tiempo Promedio</p>
                    <p className="text-lg font-medium text-gray-900">
                      {Math.round(agentMetrics.averageDuration || 0)}ms
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'memory' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center py-12">
              <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Sistema de Memoria Persistente
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                La memoria de Claude Flow mantiene el contexto entre sesiones,
                permitiendo continuidad en los proyectos y aprendizaje continuo.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'workflows' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Crear Tutorial</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Workflow completo para crear tutoriales interactivos
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-medium mr-2">1</span>
                    <span>Analizar requisitos</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-medium mr-2">2</span>
                    <span>Crear contenido educativo</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-medium mr-2">3</span>
                    <span>Implementar ejemplos</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-medium mr-2">4</span>
                    <span>Revisar y mejorar</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Implementar Feature</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Desarrollo completo de nuevas funcionalidades
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-2">1</span>
                    <span>Desglosar requisitos</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-2">2</span>
                    <span>Implementar código</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-2">3</span>
                    <span>Crear tests</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-2">4</span>
                    <span>Documentar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
