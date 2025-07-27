'use client';

import { useState } from 'react';
import { ArrowUpDown, AlertCircle, GitBranch, Folder, Server, Monitor, Database, FileCode } from 'lucide-react';

export default function ArquitecturaPage() {
  const [activeTab, setActiveTab] = useState<'actual' | 'ideal'>('actual');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Arquitectura del Proyecto: Análisis de la Estructura
        </h1>

        <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                ⚠️ Situación Actual: Proyectos Anidados
              </h2>
              <p className="text-gray-300">
                Actualmente tienes dos proyectos diferentes mezclados en una misma estructura de carpetas,
                lo que está causando confusión con múltiples READMEs y configuraciones duplicadas.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('actual')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'actual'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            🔴 Estructura Actual (Problemática)
          </button>
          <button
            onClick={() => setActiveTab('ideal')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'ideal'
                ? 'bg-green-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            ✅ Estructura Ideal (Recomendada)
          </button>
        </div>

        {activeTab === 'actual' ? (
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-red-400">
                Estructura Actual - Proyectos Mezclados
              </h2>
              
              <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Folder className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400">orquestacion_de_agentes/</span>
                  <span className="text-gray-500 ml-4">← Proyecto Principal (Next.js)</span>
                </div>
                
                <div className="ml-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-green-400" />
                    <span>package.json</span>
                    <span className="text-gray-500 ml-4">← Next.js dependencies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-yellow-400" />
                    <span>README.md</span>
                    <span className="text-gray-500 ml-4">← Habla de Claude Flow y educación</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-blue-400" />
                    <span>src/</span>
                    <span className="text-gray-500 ml-4">← Aplicación Next.js educativa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-purple-400" />
                    <span>.claude-flow/</span>
                    <span className="text-gray-500 ml-4">← Configuración de Claude Flow</span>
                  </div>
                  
                  <div className="mt-4 border-t border-red-600 pt-4">
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4 text-red-400" />
                      <span className="text-red-400">mi-agencia-ia/</span>
                      <span className="text-gray-500 ml-4">← ⚠️ PROYECTO DIFERENTE (Express)</span>
                    </div>
                    <div className="ml-6 mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-green-400" />
                        <span>package.json</span>
                        <span className="text-gray-500 ml-4">← Express dependencies</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-yellow-400" />
                        <span>README.md</span>
                        <span className="text-gray-500 ml-4">← Habla de sistema multi-agente</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Folder className="w-4 h-4 text-blue-400" />
                        <span>src/</span>
                        <span className="text-gray-500 ml-4">← Servidor Express con agentes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold text-red-400">Problemas Identificados:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span><strong>Confusión de propósitos:</strong> El proyecto principal es educativo (Next.js) pero contiene un sistema de agentes (Express)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span><strong>READMEs contradictorios:</strong> Cada uno describe un proyecto diferente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span><strong>Dependencias mezcladas:</strong> Dos package.json con diferentes propósitos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span><strong>Puerto 3001:</strong> El servidor Express de mi-agencia-ia está configurado para el mismo puerto que espera el proyecto principal</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Cómo se conectan actualmente:</h3>
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-center">
                    <Monitor className="w-16 h-16 mx-auto mb-2 text-blue-400" />
                    <p className="font-semibold">Next.js App</p>
                    <p className="text-sm text-gray-400">Puerto 3000</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-yellow-400"></div>
                    <ArrowUpDown className="w-6 h-6 text-yellow-400" />
                  </div>
                  
                  <div className="text-center">
                    <Server className="w-16 h-16 mx-auto mb-2 text-green-400" />
                    <p className="font-semibold">Express Server</p>
                    <p className="text-sm text-gray-400">Puerto 3001</p>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded p-4">
                  <p className="text-sm">
                    <strong>Archivo:</strong> src/simple-server.js (en mi-agencia-ia)
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Script:</strong> npm run agent-server
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Funciones:</strong> Health check, lista de agentes básica, WebSocket
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-green-400">
                Estructura Ideal - Proyectos Separados
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">
                    Opción 1: Proyecto Unificado
                  </h3>
                  <div className="font-mono text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <Folder className="w-5 h-5 text-blue-400" />
                      <span>orquestacion-agentes-educativo/</span>
                    </div>
                    <div className="ml-6 space-y-2">
                      <div className="flex items-center gap-2">
                        <Folder className="w-4 h-4" />
                        <span>src/</span>
                      </div>
                      <div className="ml-6 space-y-1">
                        <div className="flex items-center gap-2">
                          <Folder className="w-4 h-4" />
                          <span>app/</span>
                          <span className="text-gray-500 text-xs">← Next.js pages</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Folder className="w-4 h-4" />
                          <span>api/</span>
                          <span className="text-gray-500 text-xs">← API routes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Folder className="w-4 h-4" />
                          <span>agents/</span>
                          <span className="text-gray-500 text-xs">← Agentes IA</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Folder className="w-4 h-4" />
                        <span>.claude-flow/</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4" />
                        <span>package.json</span>
                        <span className="text-gray-500 text-xs">← Todo unificado</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-green-900/20 rounded">
                    <p className="text-sm text-green-300">
                      ✅ Usa API Routes de Next.js para los agentes
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-purple-400">
                    Opción 2: Microservicios
                  </h3>
                  <div className="font-mono text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <Folder className="w-5 h-5 text-purple-400" />
                      <span>proyectos/</span>
                    </div>
                    <div className="ml-6 space-y-2">
                      <div className="flex items-center gap-2">
                        <Folder className="w-4 h-4 text-blue-400" />
                        <span>web-educativa/</span>
                        <span className="text-gray-500 text-xs">← Next.js</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Folder className="w-4 h-4 text-green-400" />
                        <span>agentes-api/</span>
                        <span className="text-gray-500 text-xs">← Express</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4" />
                        <span>docker-compose.yml</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-purple-900/20 rounded">
                    <p className="text-sm text-purple-300">
                      ✅ Proyectos independientes comunicados por API
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Pasos para Migrar:</h3>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</span>
                  <div>
                    <p className="font-semibold">Decidir la arquitectura</p>
                    <p className="text-sm text-gray-400">Unificado con API Routes o Microservicios separados</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</span>
                  <div>
                    <p className="font-semibold">Mover mi-agencia-ia fuera</p>
                    <p className="text-sm text-gray-400">Crear repositorio separado o integrarlo correctamente</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</span>
                  <div>
                    <p className="font-semibold">Unificar configuración</p>
                    <p className="text-sm text-gray-400">Un solo package.json, un solo README principal</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</span>
                  <div>
                    <p className="font-semibold">Actualizar scripts</p>
                    <p className="text-sm text-gray-400">Simplificar start-system.bat para la nueva estructura</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">
                Recomendación para tu caso:
              </h3>
              <p className="mb-4">
                Dado que estás aprendiendo y el proyecto educativo es el principal, te recomiendo:
              </p>
              <ol className="space-y-2">
                <li>1. <strong>Mover mi-agencia-ia</strong> a una carpeta separada fuera del proyecto</li>
                <li>2. <strong>Crear API Routes en Next.js</strong> para simular los agentes (<code>/app/api/agents/</code>)</li>
                <li>3. <strong>Integrar Claude Flow</strong> directamente en el proyecto Next.js</li>
                <li>4. <strong>Un solo README</strong> que explique todo el proyecto educativo</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}