'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Flask, Code, Brain, Settings, Play, Book } from 'lucide-react'
import ChatAgenteBasico from '@/components/academia/ChatAgenteBasico'

export default function LaboratorioPage() {
  const [configuracion, setConfiguracion] = useState({
    nombre: 'AgenteBasico',
    personalidad: 'amigable y servicial',
    limiteMensajes: 50,
    usarContexto: true
  })

  const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false)
  const [agenteKey, setAgenteKey] = useState(0) // Para forzar re-render del agente

  const aplicarConfiguracion = () => {
    setAgenteKey(prev => prev + 1) // Forzar recreación del agente
    setMostrarConfiguracion(false)
  }

  const ejemplosConfiguracion = [
    {
      nombre: 'Asistente Formal',
      config: {
        nombre: 'AsistenteFormal',
        personalidad: 'profesional y detallado',
        limiteMensajes: 30,
        usarContexto: true
      }
    },
    {
      nombre: 'Compañero Casual',
      config: {
        nombre: 'AmigoCasual',
        personalidad: 'relajado y divertido',
        limiteMensajes: 100,
        usarContexto: false
      }
    },
    {
      nombre: 'Tutor Académico',
      config: {
        nombre: 'TutorIA',
        personalidad: 'educativo y paciente',
        limiteMensajes: 75,
        usarContexto: true
      }
    }
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/academia"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <Flask className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">Laboratorio de Agentes</h1>
                <p className="text-gray-400">Experimenta y personaliza tu agente básico</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel de Control */}
          <div className="lg:col-span-1 space-y-6">
            {/* Configuración */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-400" />
                  Configuración
                </h3>
                <button
                  onClick={() => setMostrarConfiguracion(!mostrarConfiguracion)}
                  className="text-sm px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                >
                  {mostrarConfiguracion ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>

              {mostrarConfiguracion && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre del Agente</label>
                    <input
                      type="text"
                      value={configuracion.nombre}
                      onChange={(e) => setConfiguracion(prev => ({ ...prev, nombre: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Personalidad</label>
                    <input
                      type="text"
                      value={configuracion.personalidad}
                      onChange={(e) => setConfiguracion(prev => ({ ...prev, personalidad: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Límite de Mensajes</label>
                    <input
                      type="number"
                      min="10"
                      max="200"
                      value={configuracion.limiteMensajes}
                      onChange={(e) => setConfiguracion(prev => ({ ...prev, limiteMensajes: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="usarContexto"
                      checked={configuracion.usarContexto}
                      onChange={(e) => setConfiguracion(prev => ({ ...prev, usarContexto: e.target.checked }))}
                      className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-700 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="usarContexto" className="text-sm">Usar contexto de conversación</label>
                  </div>

                  <button
                    onClick={aplicarConfiguracion}
                    className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Aplicar Configuración
                  </button>
                </div>
              )}
            </div>

            {/* Ejemplos Predefinidos */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-green-400" />
                Ejemplos Predefinidos
              </h3>
              <div className="space-y-3">
                {ejemplosConfiguracion.map((ejemplo, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setConfiguracion(ejemplo.config)
                      setAgenteKey(prev => prev + 1)
                    }}
                    className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <div className="font-medium text-sm">{ejemplo.nombre}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {ejemplo.config.personalidad} • {ejemplo.config.limiteMensajes} mensajes
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Instrucciones */}
            <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Book className="w-5 h-5 text-blue-400" />
                Cómo Experimentar
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Modifica la configuración y observa cómo cambia el comportamiento
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Prueba diferentes tipos de mensajes: saludos, preguntas, emociones
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Observa las estadísticas para entender cómo funciona internamente
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Usa el botón de exportar para analizar las conversaciones
                </li>
              </ul>
            </div>

            {/* Enlaces Útiles */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                Enlaces Útiles
              </h3>
              <div className="space-y-2">
                <Link
                  href="/academia/semana-1"
                  className="block text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  ← Volver a Semana 1
                </Link>
                <Link
                  href="/academia/semana-2"
                  className="block text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Continuar a Semana 2 →
                </Link>
                <Link
                  href="/tutoriales"
                  className="block text-sm text-green-400 hover:text-green-300 transition-colors"
                >
                  Ver Tutoriales Relacionados
                </Link>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <ChatAgenteBasico 
              key={agenteKey} 
              configuracionInicial={configuracion}
            />
            
            {/* Tips debajo del chat */}
            <div className="mt-6 bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <h4 className="font-semibold mb-3 text-purple-400">💡 Tips para Experimentar:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
                <div>
                  <strong>Prueba decir:</strong>
                  <ul className="mt-1 space-y-1 text-xs">
                    <li>• "Hola, ¿cómo estás?"</li>
                    <li>• "¿Quién eres?"</li>
                    <li>• "Gracias por tu ayuda"</li>
                    <li>• "No entiendo esto"</li>
                  </ul>
                </div>
                <div>
                  <strong>Observa cómo:</strong>
                  <ul className="mt-1 space-y-1 text-xs">
                    <li>• Reconoce diferentes patrones</li>
                    <li>• Mantiene el contexto</li>
                    <li>• Responde según su personalidad</li>
                    <li>• Mejora con más conversación</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}