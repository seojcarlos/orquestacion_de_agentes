'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Bot, Users, Brain, Network, Code, 
  Shield, Database, Zap, GitBranch, CheckCircle, 
  AlertTriangle, Play, Settings, Activity, Crown,
  Cpu, Eye, Target, Workflow, Terminal, BookOpen
} from 'lucide-react';

export default function ClaudeFlowTutorial() {
  const [activeSection, setActiveSection] = useState('introduccion');
  const [agentSimulation, setAgentSimulation] = useState({
    queenActive: false,
    workersActive: [],
    currentTask: '',
    progress: 0
  });
  const [flowExample, setFlowExample] = useState({
    step: 0,
    agents: [
      { id: 'queen', name: 'Queen Agent', status: 'idle', task: '' },
      { id: 'architect', name: 'Architect', status: 'idle', task: '' },
      { id: 'coder', name: 'Coder', status: 'idle', task: '' },
      { id: 'tester', name: 'Tester', status: 'idle', task: '' }
    ]
  });

  const secciones = [
    { id: 'introduccion', titulo: 'Introducción', icon: BookOpen },
    { id: 'arquitectura', titulo: 'Arquitectura', icon: Network },
    { id: 'aplicacion', titulo: 'Aplicación en esta Web', icon: Code },
    { id: 'aportes', titulo: 'Aportes y Beneficios', icon: Target },
    { id: 'desafios', titulo: 'Desafíos', icon: AlertTriangle },
    { id: 'ejemplos', titulo: 'Ejemplos Prácticos', icon: Play },
  ];

  // Simulación de flujo de trabajo de Claude Flow
  const simularFlujo = () => {
    setFlowExample(prev => ({ ...prev, step: 0 }));
    
    const pasos = [
      {
        step: 1,
        agents: [
          { id: 'queen', name: 'Queen Agent', status: 'active', task: 'Analizando solicitud: "Crear formulario de contacto"' },
          { id: 'architect', name: 'Architect', status: 'idle', task: '' },
          { id: 'coder', name: 'Coder', status: 'idle', task: '' },
          { id: 'tester', name: 'Tester', status: 'idle', task: '' }
        ]
      },
      {
        step: 2,
        agents: [
          { id: 'queen', name: 'Queen Agent', status: 'coordinating', task: 'Delegando tareas a especialistas' },
          { id: 'architect', name: 'Architect', status: 'active', task: 'Diseñando estructura del formulario' },
          { id: 'coder', name: 'Coder', status: 'waiting', task: 'Esperando especificaciones...' },
          { id: 'tester', name: 'Tester', status: 'waiting', task: 'Preparando casos de prueba...' }
        ]
      },
      {
        step: 3,
        agents: [
          { id: 'queen', name: 'Queen Agent', status: 'monitoring', task: 'Supervisando progreso' },
          { id: 'architect', name: 'Architect', status: 'completed', task: '✅ Especificaciones completadas' },
          { id: 'coder', name: 'Coder', status: 'active', task: 'Implementando componente React' },
          { id: 'tester', name: 'Tester', status: 'preparing', task: 'Creando tests unitarios' }
        ]
      },
      {
        step: 4,
        agents: [
          { id: 'queen', name: 'Queen Agent', status: 'reviewing', task: 'Revisión final y coordinación' },
          { id: 'architect', name: 'Architect', status: 'completed', task: '✅ Documentación lista' },
          { id: 'coder', name: 'Coder', status: 'completed', task: '✅ Código implementado' },
          { id: 'tester', name: 'Tester', status: 'active', task: 'Ejecutando tests de validación' }
        ]
      },
      {
        step: 5,
        agents: [
          { id: 'queen', name: 'Queen Agent', status: 'completed', task: '✅ Proyecto completado exitosamente' },
          { id: 'architect', name: 'Architect', status: 'completed', task: '✅ Documentación entregada' },
          { id: 'coder', name: 'Coder', status: 'completed', task: '✅ Código en producción' },
          { id: 'tester', name: 'Tester', status: 'completed', task: '✅ Tests pasando 100%' }
        ]
      }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < pasos.length) {
        setFlowExample(pasos[currentStep]);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'coordinating': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'monitoring': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'reviewing': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'waiting': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'preparing': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-50 text-gray-500 border-gray-200';
    }
  };

  const renderContenido = () => {
    switch (activeSection) {
      case 'introduccion':
        return (
          <div className="space-y-6">
            {/* Introducción */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-600" />
                ¿Qué es Claude Flow?
              </h3>
              <p className="text-gray-600 mb-4">
                Claude Flow es una plataforma de orquestación de IA de nivel empresarial que revoluciona 
                los flujos de trabajo de desarrollo mediante coordinación avanzada de inteligencia artificial. 
                Combina inteligencia de enjambre tipo "colmena" con reconocimiento de patrones neurales.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Hive-Mind Intelligence
                  </h4>
                  <p className="text-sm text-blue-700">
                    Coordinación tipo colmena con agente Queen y especialistas trabajando en conjunto.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Memoria Persistente
                  </h4>
                  <p className="text-sm text-green-700">
                    Sistema SQLite que mantiene memoria entre sesiones para continuidad de proyectos.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    87 Herramientas
                  </h4>
                  <p className="text-sm text-purple-700">
                    Suite completa de herramientas especializadas para desarrollo, testing y análisis.
                  </p>
                </div>
              </div>
            </div>

            {/* Comandos básicos */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-green-600" />
                Comandos Básicos de Claude Flow
              </h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium mb-2">Coordinación rápida de IA:</h5>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`npx claude-flow@alpha swarm "build me a REST API" --claude`}
                  </pre>
                  <p className="text-sm text-gray-600 mt-2">
                    Inicia un enjambre de IA para crear una API REST completa con coordinación automática.
                  </p>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Inicialización de proyecto complejo:</h5>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`npx claude-flow@alpha hive-mind spawn "Create microservices architecture" --agents 8 --claude`}
                  </pre>
                  <p className="text-sm text-gray-600 mt-2">
                    Despliega una mente colmena con 8 agentes especializados para arquitectura de microservicios.
                  </p>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Desarrollo de feature específico:</h5>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`npx claude-flow@alpha feature "user authentication system" --memory --hooks`}
                  </pre>
                  <p className="text-sm text-gray-600 mt-2">
                    Crea un sistema de autenticación con memoria persistente y hooks automáticos.
                  </p>
                </div>
              </div>
            </div>

            {/* Estadísticas de rendimiento */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                📊 Rendimiento Comprobado
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">84.8%</div>
                  <div className="text-sm text-gray-600">Tasa de resolución exitosa</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">87</div>
                  <div className="text-sm text-gray-600">Herramientas especializadas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">5x</div>
                  <div className="text-sm text-gray-600">Velocidad vs desarrollo tradicional</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'arquitectura':
        return (
          <div className="space-y-6">
            {/* Arquitectura de agentes */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Network className="w-5 h-5 text-purple-600" />
                Arquitectura Hive-Mind
              </h3>
              <p className="text-gray-600 mb-6">
                Claude Flow utiliza una arquitectura de enjambre donde un agente Queen coordina 
                múltiples agentes especializados que trabajan de manera paralela y colaborativa.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Diagrama de arquitectura */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-4 text-center">Estructura de la Colmena</h4>
                  <div className="relative">
                    {/* Queen Agent en el centro */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-yellow-400 rounded-full p-4 shadow-lg border-4 border-yellow-500">
                        <Crown className="w-6 h-6 text-yellow-900" />
                      </div>
                      <div className="text-center mt-2 font-bold text-sm">Queen Agent</div>
                    </div>

                    {/* Agentes especializados alrededor */}
                    <div className="grid grid-cols-2 gap-16 p-8">
                      <div className="flex flex-col items-center">
                        <div className="bg-blue-400 rounded-full p-3 shadow-md">
                          <Code className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xs mt-1 text-center">Architect</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="bg-green-400 rounded-full p-3 shadow-md">
                          <Cpu className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xs mt-1 text-center">Coder</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="bg-red-400 rounded-full p-3 shadow-md">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xs mt-1 text-center">Security</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="bg-purple-400 rounded-full p-3 shadow-md">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xs mt-1 text-center">Tester</div>
                      </div>
                    </div>

                    {/* Líneas de conexión */}
                    <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
                      <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" />
                      <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" />
                      <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" />
                      <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" />
                    </svg>
                  </div>
                </div>

                {/* Roles de agentes */}
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h5 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      Queen Agent (Coordinador Maestro)
                    </h5>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Analiza solicitudes complejas</li>
                      <li>• Delega tareas a especialistas</li>
                      <li>• Coordina flujos de trabajo</li>
                      <li>• Supervisa calidad y progreso</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Architect Agents
                    </h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Diseño de sistemas y arquitectura</li>
                      <li>• Planificación de estructura de código</li>
                      <li>• Definición de APIs y contratos</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h5 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      Coder Agents
                    </h5>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Implementación de código</li>
                      <li>• Optimización de rendimiento</li>
                      <li>• Refactoring y mejoras</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h5 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Tester & Security Agents
                    </h5>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Testing automatizado</li>
                      <li>• Auditorías de seguridad</li>
                      <li>• Validación de calidad</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sistema de memoria */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Database className="w-4 h-4 text-green-600" />
                Sistema de Memoria Persistente
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-3">Características del sistema:</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>SQLite local:</strong> Base de datos ligera y rápida</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Memoria entre sesiones:</strong> Continúa donde se quedó</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Contexto de proyecto:</strong> Recuerda decisiones pasadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Patrones aprendidos:</strong> Mejora con la experiencia</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-3">Estructura de datos:</h5>
                  <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`{
  "project_id": "webapp-2024",
  "context": {
    "tech_stack": ["Next.js", "React", "TypeScript"],
    "architecture": "microservices",
    "last_session": "2024-07-24T10:30:00Z"
  },
  "decisions": [
    {
      "type": "tech_choice",
      "choice": "Tailwind CSS",
      "reason": "Team preference"
    }
  ],
  "patterns": {
    "component_structure": "atomic_design",
    "testing_strategy": "jest_rtl"
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );

      case 'aplicacion':
        return (
          <div className="space-y-6">
            {/* Cómo se aplicaría a esta web */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-orange-600" />
                Aplicación de Claude Flow en esta Web Educativa
              </h3>
              <p className="text-gray-600 mb-6">
                Veamos cómo Claude Flow podría mejorar el desarrollo y mantenimiento de esta plataforma educativa 
                de Next.js con sus capacidades de orquestación de IA.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Casos de uso específicos */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-orange-800">Casos de Uso Prácticos:</h4>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-medium text-blue-800 mb-2">1. Creación de Tutoriales</h5>
                    <p className="text-sm text-blue-700 mb-2">
                      <strong>Comando:</strong> <code className="bg-white px-1 rounded">npx claude-flow@alpha tutorial "React Hooks avanzados" --interactive --examples</code>
                    </p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• Queen Agent analiza el tema y estructura</li>
                      <li>• Architect Agent diseña secciones y flujo</li>
                      <li>• Coder Agent implementa demos interactivas</li>
                      <li>• Tester Agent valida ejemplos y funcionalidad</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h5 className="font-medium text-green-800 mb-2">2. Optimización de Rendimiento</h5>
                    <p className="text-sm text-green-700 mb-2">
                      <strong>Comando:</strong> <code className="bg-white px-1 rounded">npx claude-flow@alpha optimize "website performance" --analyze --implement</code>
                    </p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Analyst Agent audita rendimiento actual</li>
                      <li>• Architect Agent propone mejoras</li>
                      <li>• Coder Agent implementa lazy loading, etc.</li>
                      <li>• Tester Agent verifica métricas Web Vitals</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h5 className="font-medium text-purple-800 mb-2">3. Nuevas Funcionalidades</h5>
                    <p className="text-sm text-purple-700 mb-2">
                      <strong>Comando:</strong> <code className="bg-white px-1 rounded">npx claude-flow@alpha feature "user progress tracking" --database --ui</code>
                    </p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Architect Agent diseña modelo de datos</li>
                      <li>• Coder Agent crea API y componentes</li>
                      <li>• Security Agent valida autenticación</li>
                      <li>• Tester Agent crea tests end-to-end</li>
                    </ul>
                  </div>
                </div>

                {/* Flujo de trabajo ejemplo */}
                <div>
                  <h4 className="font-semibold text-orange-800 mb-4">Flujo de Trabajo Típico:</h4>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">1</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">Análisis de Solicitud</div>
                          <div className="text-xs text-gray-600">Queen Agent interpreta: "Agregar sistema de comentarios"</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">2</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">Planificación</div>
                          <div className="text-xs text-gray-600">Architect Agent diseña esquema DB y API</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">3</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">Implementación</div>
                          <div className="text-xs text-gray-600">Coder Agent crea componentes y endpoints</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">4</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">Validación</div>
                          <div className="text-xs text-gray-600">Tester Agent ejecuta pruebas automáticas</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">Entrega</div>
                          <div className="text-xs text-gray-600">Sistema completo listo para producción</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparación con desarrollo tradicional */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4">📊 Comparación: Desarrollo Tradicional vs Claude Flow</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h5 className="font-medium text-red-800 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Desarrollo Tradicional
                  </h5>
                  <ul className="text-sm text-red-700 space-y-2">
                    <li>• Planificación manual extensiva</li>
                    <li>• Un desarrollador por vez</li>
                    <li>• Testing al final del ciclo</li>
                    <li>• Sin memoria de decisiones pasadas</li>
                    <li>• Revisiones manuales de código</li>
                    <li>• Documentación como tarea separada</li>
                  </ul>
                  <div className="mt-4 p-3 bg-red-100 rounded">
                    <div className="text-sm font-medium">Tiempo típico para nueva funcionalidad:</div>
                    <div className="text-2xl font-bold text-red-600">3-5 días</div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Con Claude Flow
                  </h5>
                  <ul className="text-sm text-green-700 space-y-2">
                    <li>• Análisis automático de requisitos</li>
                    <li>• Múltiples agentes trabajando en paralelo</li>
                    <li>• Testing integrado desde el inicio</li>
                    <li>• Memoria persistente entre proyectos</li>
                    <li>• Revisión automática de calidad</li>
                    <li>• Documentación generada automáticamente</li>
                  </ul>
                  <div className="mt-4 p-3 bg-green-100 rounded">
                    <div className="text-sm font-medium">Tiempo con Claude Flow:</div>
                    <div className="text-2xl font-bold text-green-600">4-8 horas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'aportes':
        return (
          <div className="space-y-6">
            {/* Aportes principales */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Aportes y Beneficios de Claude Flow
              </h3>
              <p className="text-gray-600 mb-6">
                Claude Flow aporta múltiples beneficios significativos al proceso de desarrollo, 
                especialmente en proyectos educativos complejos como esta plataforma.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Velocidad de Desarrollo
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li>• <strong>5x más rápido</strong> que desarrollo tradicional</li>
                    <li>• Paralelización de tareas</li>
                    <li>• Auto-generación de código boilerplate</li>
                    <li>• Testing automático integrado</li>
                  </ul>
                  <div className="mt-3 p-2 bg-blue-100 rounded">
                    <div className="text-xs font-medium">Ejemplo: Tutorial completo</div>
                    <div className="text-sm">De 2 días → 4 horas</div>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Inteligencia Colectiva
                  </h4>
                  <ul className="text-sm text-purple-700 space-y-2">
                    <li>• Cada agente se especializa</li>
                    <li>• Coordinación automática</li>
                    <li>• Decisiones basadas en contexto</li>
                    <li>• Aprendizaje continuo</li>
                  </ul>
                  <div className="mt-3 p-2 bg-purple-100 rounded">
                    <div className="text-xs font-medium">Resultado:</div>
                    <div className="text-sm">Mayor calidad de código</div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Continuidad de Proyecto
                  </h4>
                  <ul className="text-sm text-green-700 space-y-2">
                    <li>• Memoria entre sesiones</li>
                    <li>• Contexto de decisiones pasadas</li>
                    <li>• Patrones de código consistentes</li>
                    <li>• Evolución incremental</li>
                  </ul>
                  <div className="mt-3 p-2 bg-green-100 rounded">
                    <div className="text-xs font-medium">Ventaja:</div>
                    <div className="text-sm">Sin pérdida de contexto</div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Calidad y Seguridad
                  </h4>
                  <ul className="text-sm text-orange-700 space-y-2">
                    <li>• Revisión automática de código</li>
                    <li>• Auditorías de seguridad integradas</li>
                    <li>• Testing exhaustivo automático</li>
                    <li>• Estándares de código consistentes</li>
                  </ul>
                  <div className="mt-3 p-2 bg-orange-100 rounded">
                    <div className="text-xs font-medium">Impacto:</div>
                    <div className="text-sm">Menos bugs en producción</div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Escalabilidad de Equipo
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-2">
                    <li>• Un desarrollador = equipo completo</li>
                    <li>• Especialistas virtuales disponibles 24/7</li>
                    <li>• Sin coordinación manual entre roles</li>
                    <li>• Expertise en múltiples tecnologías</li>
                  </ul>
                  <div className="mt-3 p-2 bg-yellow-100 rounded">
                    <div className="text-xs font-medium">Beneficio:</div>
                    <div className="text-sm">Equipo experto instantáneo</div>
                  </div>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-800 mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Valor Educativo
                  </h4>
                  <ul className="text-sm text-indigo-700 space-y-2">
                    <li>• Mejores prácticas automáticas</li>
                    <li>• Explicaciones de decisiones</li>
                    <li>• Documentación generada</li>
                    <li>• Ejemplos de arquitectura sólida</li>
                  </ul>
                  <div className="mt-3 p-2 bg-indigo-100 rounded">
                    <div className="text-xs font-medium">Para esta web:</div>
                    <div className="text-sm">Tutoriales más ricos</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Métricas de impacto */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
              <h4 className="text-lg font-bold mb-4 text-center">📈 Métricas de Impacto Medibles</h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-1">84.8%</div>
                  <div className="text-sm text-gray-600">Tasa de éxito</div>
                  <div className="text-xs text-gray-500 mt-1">en resolución de tareas</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-1">5x</div>
                  <div className="text-sm text-gray-600">Más rápido</div>
                  <div className="text-xs text-gray-500 mt-1">que desarrollo tradicional</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-purple-600 mb-1">87</div>
                  <div className="text-sm text-gray-600">Herramientas</div>
                  <div className="text-xs text-gray-500 mt-1">especializadas incluidas</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-orange-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Disponibilidad</div>
                  <div className="text-xs text-gray-500 mt-1">sin descansos ni vacaciones</div>
                </div>
              </div>
            </div>

            {/* ROI y beneficios económicos */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4">💰 Retorno de Inversión (ROI)</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium mb-3">Costos Tradicionales (mensual):</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-red-50 rounded">
                      <span>Desarrollador Senior</span>
                      <span className="font-medium">$8,000</span>
                    </div>
                    <div className="flex justify-between p-2 bg-red-50 rounded">
                      <span>QA Tester</span>
                      <span className="font-medium">$5,000</span>
                    </div>
                    <div className="flex justify-between p-2 bg-red-50 rounded">
                      <span>DevOps Engineer</span>
                      <span className="font-medium">$7,000</span>
                    </div>
                    <div className="flex justify-between p-2 bg-red-100 rounded font-bold">
                      <span>Total mensual</span>
                      <span>$20,000</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-3">Con Claude Flow:</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-green-50 rounded">
                      <span>Desarrollador + Claude Flow</span>
                      <span className="font-medium">$8,100</span>
                    </div>
                    <div className="flex justify-between p-2 bg-green-50 rounded">
                      <span>Productividad 5x mayor</span>
                      <span className="font-medium text-green-600">+400%</span>
                    </div>
                    <div className="flex justify-between p-2 bg-green-50 rounded">
                      <span>Calidad automatizada</span>
                      <span className="font-medium text-green-600">Incluida</span>
                    </div>
                    <div className="flex justify-between p-2 bg-green-100 rounded font-bold">
                      <span>Ahorro mensual</span>
                      <span className="text-green-600">$11,900</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-green-700">ROI anual estimado:</div>
                  <div className="text-3xl font-bold text-green-600">595%</div>
                  <div className="text-xs text-green-600">Se paga solo en 2 meses</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'desafios':
        return (
          <div className="space-y-6">
            {/* Desafíos principales */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Desafíos y Limitaciones de Claude Flow
              </h3>
              <p className="text-gray-600 mb-6">
                Aunque Claude Flow ofrece beneficios significativos, también presenta ciertos desafíos 
                que deben considerarse antes de su implementación en proyectos reales.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Curva de Aprendizaje
                    </h4>
                    <ul className="text-sm text-red-700 space-y-2">
                      <li>• <strong>Sintaxis específica</strong> para comandos y configuración</li>
                      <li>• <strong>Conceptos nuevos</strong> como hive-mind y agentes especializados</li>
                      <li>• <strong>Debugging complejo</strong> cuando los agentes no coordinan bien</li>
                      <li>• <strong>Configuración inicial</strong> puede ser intimidante</li>
                    </ul>
                    <div className="mt-3 p-2 bg-red-100 rounded">
                      <div className="text-xs font-medium">Tiempo de adaptación:</div>
                      <div className="text-sm">2-4 semanas para dominar</div>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Dependencia Tecnológica
                    </h4>
                    <ul className="text-sm text-orange-700 space-y-2">
                      <li>• <strong>Vendor lock-in</strong> con el ecosistema Claude Flow</li>
                      <li>• <strong>Actualizaciones frecuentes</strong> pueden romper flujos existentes</li>
                      <li>• <strong>Requiere conexión</strong> para funcionalidades avanzadas</li>
                      <li>• <strong>Costo por uso</strong> en implementaciones enterprise</li>
                    </ul>
                    <div className="mt-3 p-2 bg-orange-100 rounded">
                      <div className="text-xs font-medium">Riesgo:</div>
                      <div className="text-sm">Dependencia externa crítica</div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Control y Transparencia
                    </h4>
                    <ul className="text-sm text-yellow-700 space-y-2">
                      <li>• <strong>Caja negra</strong> en decisiones de agentes</li>
                      <li>• <strong>Difícil auditoría</strong> de código generado automáticamente</li>
                      <li>• <strong>Consistencia variable</strong> entre ejecuciones</li>
                      <li>• <strong>Debugging complejo</strong> cuando algo falla</li>
                    </ul>
                    <div className="mt-3 p-2 bg-yellow-100 rounded">
                      <div className="text-xs font-medium">Impacto:</div>
                      <div className="text-sm">Menos control granular</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      Recursos y Rendimiento
                    </h4>
                    <ul className="text-sm text-purple-700 space-y-2">
                      <li>• <strong>Consumo intensivo</strong> de CPU y memoria durante orquestación</li>
                      <li>• <strong>Latencia adicional</strong> por coordinación entre agentes</li>
                      <li>• <strong>Almacenamiento creciente</strong> de memoria persistente</li>
                      <li>• <strong>Ancho de banda</strong> para comunicación con servicios externos</li>
                    </ul>
                    <div className="mt-3 p-2 bg-purple-100 rounded">
                      <div className="text-xs font-medium">Requisito mínimo:</div>
                      <div className="text-sm">8GB RAM, CPU moderno</div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Adopción de Equipo
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-2">
                      <li>• <strong>Resistencia al cambio</strong> de desarrolladores experimentados</li>
                      <li>• <strong>Capacitación necesaria</strong> para todo el equipo</li>
                      <li>• <strong>Diferentes niveles</strong> de adopción y confianza</li>
                      <li>• <strong>Pérdida de habilidades</strong> manuales si se depende mucho</li>
                    </ul>
                    <div className="mt-3 p-2 bg-blue-100 rounded">
                      <div className="text-xs font-medium">Solución:</div>
                      <div className="text-sm">Adopción gradual y entrenamiento</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Madurez del Producto
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• <strong>Versión alpha</strong> con posibles bugs y cambios</li>
                      <li>• <strong>Documentación limitada</strong> y casos de uso emergentes</li>
                      <li>• <strong>Comunidad pequeña</strong> para soporte y troubleshooting</li>
                      <li>• <strong>Casos edge</strong> no completamente cubiertos</li>
                    </ul>
                    <div className="mt-3 p-2 bg-gray-100 rounded">
                      <div className="text-xs font-medium">Recomendación:</div>
                      <div className="text-sm">Usar en proyectos no críticos primero</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Matriz de evaluación */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4">⚖️ Matriz de Evaluación: ¿Cuándo Usar Claude Flow?</h4>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Escenario</th>
                      <th className="text-center p-3 text-green-600">✅ Recomendado</th>
                      <th className="text-center p-3 text-yellow-600">⚠️ Con Precaución</th>
                      <th className="text-center p-3 text-red-600">❌ No Recomendado</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    <tr className="border-b bg-green-50">
                      <td className="p-3 font-medium">Prototipado rápido</td>
                      <td className="text-center p-3">✅</td>
                      <td className="text-center p-3">-</td>
                      <td className="text-center p-3">-</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Proyectos educativos</td>
                      <td className="text-center p-3">✅</td>
                      <td className="text-center p-3">-</td>
                      <td className="text-center p-3">-</td>
                    </tr>
                    <tr className="border-b bg-yellow-50">
                      <td className="p-3 font-medium">Aplicaciones de producción</td>
                      <td className="text-center p-3">-</td>
                      <td className="text-center p-3">⚠️</td>
                      <td className="text-center p-3">-</td>
                    </tr>
                    <tr className="border-b bg-red-50">
                      <td className="p-3 font-medium">Sistemas críticos (bancos, salud)</td>
                      <td className="text-center p-3">-</td>
                      <td className="text-center p-3">-</td>
                      <td className="text-center p-3">❌</td>
                    </tr>
                    <tr className="border-b bg-green-50">
                      <td className="p-3 font-medium">Equipos pequeños (1-3 devs)</td>
                      <td className="text-center p-3">✅</td>
                      <td className="text-center p-3">-</td>
                      <td className="text-center p-3">-</td>
                    </tr>
                    <tr className="border-b bg-yellow-50">
                      <td className="p-3 font-medium">Equipos grandes (+10 devs)</td>
                      <td className="text-center p-3">-</td>
                      <td className="text-center p-3">⚠️</td>
                      <td className="text-center p-3">-</td>
                    </tr>
                    <tr className="border-b bg-green-50">
                      <td className="p-3 font-medium">Nuevos proyectos</td>
                      <td className="text-center p-3">✅</td>
                      <td className="text-center p-3">-</td>
                      <td className="text-center p-3">-</td>
                    </tr>
                    <tr className="border-b bg-red-50">
                      <td className="p-3 font-medium">Legacy systems (refactoring)</td>
                      <td className="text-center p-3">-</td>
                      <td className="text-center p-3">-</td>
                      <td className="text-center p-3">❌</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Estrategias de mitigación */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-bold mb-4 text-blue-800">🛡️ Estrategias de Mitigación</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">Para Proyectos de Producción:</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Comenzar con proyectos no críticos</li>
                    <li>• Mantener expertise manual del equipo</li>
                    <li>• Implementar revisiones de código adicionales</li>
                    <li>• Crear tests exhaustivos para código generado</li>
                    <li>• Documentar decisiones de configuración</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">Para Equipos Nuevos:</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Capacitación gradual con proyectos piloto</li>
                    <li>• Establecer mejores prácticas internas</li>
                    <li>• Crear documentación de casos de uso</li>
                    <li>• Designar "expertos internos" en Claude Flow</li>
                    <li>• Plan de contingencia sin la herramienta</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ejemplos':
        return (
          <div className="space-y-6">
            {/* Demo de simulación de agentes */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Play className="w-5 h-5 text-blue-600" />
                🎮 Simulación Interactiva de Claude Flow
              </h3>
              <p className="text-gray-600 mb-6">
                Observa cómo trabajarían los agentes de Claude Flow para crear una nueva funcionalidad en esta web educativa.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Panel de control */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-4">Centro de Control de Agentes</h4>
                  
                  <button
                    onClick={simularFlujo}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mb-4"
                  >
                    <Play className="w-4 h-4" />
                    Iniciar Simulación: "Crear formulario de contacto"
                  </button>

                  <div className="space-y-3">
                    {flowExample.agents.map((agent) => (
                      <div key={agent.id} className={`p-3 rounded-lg border ${getStatusColor(agent.status)}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{agent.name}</span>
                          <span className="text-xs px-2 py-1 rounded-full bg-white">
                            {agent.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-xs">
                          {agent.task || 'Esperando instrucciones...'}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-white rounded border">
                    <div className="text-sm font-medium mb-1">Progreso del Flujo:</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(flowExample.step / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-mono">{flowExample.step}/5</span>
                    </div>
                  </div>
                </div>

                {/* Visualización del flujo */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-4">Flujo de Trabajo Visualizado</h4>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                        flowExample.step >= 1 ? 'bg-yellow-400' : 'bg-gray-300'
                      } transition-colors duration-500`}>
                        <Crown className="w-8 h-8 text-yellow-900" />
                      </div>
                      <div className="text-xs mt-1 font-medium">Queen Agent</div>
                      <div className="text-xs text-gray-500">Coordinador Maestro</div>
                    </div>

                    <div className="flex justify-center">
                      <div className={`w-1 h-8 ${
                        flowExample.step >= 2 ? 'bg-blue-400' : 'bg-gray-300'
                      } transition-colors duration-500`}></div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                          flowExample.step >= 2 ? 'bg-blue-400' : 'bg-gray-300'
                        } transition-colors duration-500`}>
                          <Code className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-xs mt-1">Architect</div>
                      </div>
                      <div className="text-center">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                          flowExample.step >= 3 ? 'bg-green-400' : 'bg-gray-300'
                        } transition-colors duration-500`}>
                          <Cpu className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-xs mt-1">Coder</div>
                      </div>
                      <div className="text-center">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                          flowExample.step >= 4 ? 'bg-purple-400' : 'bg-gray-300'
                        } transition-colors duration-500`}>
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-xs mt-1">Tester</div>
                      </div>
                    </div>

                    {flowExample.step === 5 && (
                      <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded-lg text-center">
                        <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <div className="text-sm font-medium text-green-800">
                          ¡Proyecto Completado Exitosamente!
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          Formulario de contacto listo para producción
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Ejemplos de comandos prácticos */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-green-600" />
                Ejemplos Prácticos para esta Web Educativa
              </h4>
              
              <div className="space-y-6">
                <div>
                  <h5 className="font-medium mb-3">1. Crear Tutorial Completo sobre Testing</h5>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-3">
{`npx claude-flow@alpha tutorial "Testing en React con Jest y RTL" \\
  --interactive \\
  --examples \\
  --path /tutoriales/testing-react \\
  --memory`}
                  </pre>
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    <strong>Resultado esperado:</strong> Tutorial completo con demos interactivas, 
                    ejemplos de código funcional, tests unitarios y de integración, 
                    más sección de mejores prácticas.
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-3">2. Optimizar Rendimiento de la Web</h5>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-3">
{`npx claude-flow@alpha optimize "website performance audit" \\
  --analyze-bundle \\
  --lighthouse \\
  --implement-fixes \\
  --report`}
                  </pre>
                  <div className="bg-green-50 p-3 rounded text-sm">
                    <strong>Resultado esperado:</strong> Análisis completo de rendimiento, 
                    implementación de lazy loading, optimización de imágenes, 
                    code splitting automático y reporte de mejoras.
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-3">3. Agregar Sistema de Progreso de Usuario</h5>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-3">
{`npx claude-flow@alpha feature "user progress tracking system" \\
  --database sqlite \\
  --auth integration \\
  --ui dashboard \\
  --tests e2e`}
                  </pre>
                  <div className="bg-purple-50 p-3 rounded text-sm">
                    <strong>Resultado esperado:</strong> Sistema completo con base de datos, 
                    autenticación, dashboard de usuario, API endpoints, 
                    componentes React y tests end-to-end.
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-3">4. Implementar Modo Oscuro</h5>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mb-3">
{`npx claude-flow@alpha design "dark mode implementation" \\
  --theme-system \\
  --tailwind-dark \\
  --user-preference \\
  --animate-transitions`}
                  </pre>
                  <div className="bg-yellow-50 p-3 rounded text-sm">
                    <strong>Resultado esperado:</strong> Sistema de temas completo, 
                    toggle animado, persistencia de preferencias, 
                    adaptación de todos los componentes existentes.
                  </div>
                </div>
              </div>
            </div>

            {/* Comparación de resultados */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-4">📊 Comparación de Resultados: Manual vs Claude Flow</h4>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-3">Tarea</th>
                      <th className="text-center p-3">Método Manual</th>
                      <th className="text-center p-3">Con Claude Flow</th>
                      <th className="text-center p-3">Mejora</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Tutorial completo</td>
                      <td className="text-center p-3">2-3 días</td>
                      <td className="text-center p-3">4-6 horas</td>
                      <td className="text-center p-3 text-green-600 font-bold">83% menos tiempo</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-3 font-medium">Sistema de progreso</td>
                      <td className="text-center p-3">1-2 semanas</td>
                      <td className="text-center p-3">1-2 días</td>
                      <td className="text-center p-3 text-green-600 font-bold">85% menos tiempo</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Optimización rendimiento</td>
                      <td className="text-center p-3">3-5 días</td>
                      <td className="text-center p-3">6-8 horas</td>
                      <td className="text-center p-3 text-green-600 font-bold">80% menos tiempo</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-3 font-medium">Modo oscuro</td>
                      <td className="text-center p-3">4-6 días</td>
                      <td className="text-center p-3">8-12 horas</td>
                      <td className="text-center p-3 text-green-600 font-bold">75% menos tiempo</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-green-700 mb-1">Ahorro promedio de tiempo:</div>
                  <div className="text-3xl font-bold text-green-600">81%</div>
                  <div className="text-xs text-green-600">Más tiempo para innovar y crear contenido educativo</div>
                </div>
              </div>
            </div>

            {/* Casos de estudio reales */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-bold mb-4 text-blue-800">🎯 Casos de Estudio Potenciales</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Startup Educativa</h5>
                  <p className="text-sm text-gray-600 mb-3">
                    Plataforma similar a esta, necesita crear 50+ tutoriales en 3 meses.
                  </p>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Sin Claude Flow:</span>
                      <span className="font-medium">6 meses, 3 desarrolladores</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Con Claude Flow:</span>
                      <span className="font-medium text-green-600">3 meses, 1 desarrollador</span>
                    </div>
                    <div className="flex justify-between border-t pt-1">
                      <span className="font-bold">Ahorro:</span>
                      <span className="font-bold text-green-600">$120,000</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Agencia de Desarrollo</h5>
                  <p className="text-sm text-gray-600 mb-3">
                    Necesita entregar MVP educativo para cliente en tiempo récord.
                  </p>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Método tradicional:</span>
                      <span className="font-medium">8 semanas</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Con Claude Flow:</span>
                      <span className="font-medium text-green-600">2 semanas</span>
                    </div>
                    <div className="flex justify-between border-t pt-1">
                      <span className="font-bold">Ventaja competitiva:</span>
                      <span className="font-bold text-green-600">4x más rápido</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/tutoriales"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver a Tutoriales</span>
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Claude Flow Tutorial</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Título y descripción */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Claude Flow: Orquestación de IA para Desarrollo
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Descubre cómo Claude Flow revoluciona el desarrollo web mediante coordinación inteligente de agentes IA. 
            Aprende qué aporta a proyectos como esta web educativa y cuáles son sus principales desafíos.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Barra lateral de navegación */}
          <aside className="lg:w-1/4">
            <nav className="sticky top-8 space-y-2">
              {secciones.map((seccion) => (
                <button
                  key={seccion.id}
                  onClick={() => setActiveSection(seccion.id)}
                  className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${
                    activeSection === seccion.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <seccion.icon size={20} />
                  <span className="font-semibold">{seccion.titulo}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Contenido principal */}
          <main className="lg:w-3/4">
            {renderContenido()}
          </main>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>¿Quieres profundizar más en Claude Flow?</p>
          <p className="mt-1">
            Visita el{' '}
            <a 
              href="https://github.com/ruvnet/claude-flow" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              repositorio oficial en GitHub
            </a>
            {' '}para documentación técnica completa.
          </p>
        </footer>
      </div>
    </div>
  );
}