'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Bot, User, BarChart3, Brain, Code, RefreshCw, Download } from 'lucide-react'
import { AgenteBasico, type MensajeConversacion } from '@/lib/agents/AgenteBasico'

interface Props {
  configuracionInicial?: {
    nombre?: string
    personalidad?: string
    limiteMensajes?: number
    usarContexto?: boolean
  }
}

export default function ChatAgenteBasico({ configuracionInicial }: Props) {
  const [agente, setAgente] = useState<AgenteBasico | null>(null)
  const [mensajes, setMensajes] = useState<MensajeConversacion[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [mostrarEstadisticas, setMostrarEstadisticas] = useState(false)
  const [mostrarCodigo, setMostrarCodigo] = useState(false)
  const [estadisticas, setEstadisticas] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Inicializar agente
  useEffect(() => {
    const nuevoAgente = new AgenteBasico(configuracionInicial)
    setAgente(nuevoAgente)
    
    // Mensaje inicial del agente
    const mensajeInicial: MensajeConversacion = {
      id: 'inicial',
      contenido: `¡Hola! Soy ${configuracionInicial?.nombre || 'AgenteBasico'}. ` +
                'Soy un agente de IA básico construido desde cero. ¡Empecemos a conversar!',
      tipo: 'agente',
      timestamp: new Date()
    }
    setMensajes([mensajeInicial])
  }, [configuracionInicial])

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  // Actualizar estadísticas
  useEffect(() => {
    if (agente) {
      setEstadisticas(agente.obtenerEstadisticas())
    }
  }, [mensajes, agente])

  const enviarMensaje = async () => {
    if (!inputMessage.trim() || !agente || loading) return

    setLoading(true)
    const mensajeUsuario = inputMessage.trim()
    setInputMessage('')

    try {
      // Añadir mensaje del usuario
      const mensajeUser: MensajeConversacion = {
        id: Date.now().toString(),
        contenido: mensajeUsuario,
        tipo: 'usuario',
        timestamp: new Date()
      }
      setMensajes(prev => [...prev, mensajeUser])

      // Procesar con el agente
      const respuesta = await agente.procesar(mensajeUsuario)

      // Añadir respuesta del agente
      const mensajeAgente: MensajeConversacion = {
        id: (Date.now() + 1).toString(),
        contenido: respuesta,
        tipo: 'agente',
        timestamp: new Date()
      }
      setMensajes(prev => [...prev, mensajeAgente])

    } catch (error) {
      console.error('Error procesando mensaje:', error)
      const mensajeError: MensajeConversacion = {
        id: (Date.now() + 2).toString(),
        contenido: 'Lo siento, he tenido un error. ¿Podrías intentar de nuevo?',
        tipo: 'agente',
        timestamp: new Date()
      }
      setMensajes(prev => [...prev, mensajeError])
    } finally {
      setLoading(false)
    }
  }

  const reiniciarChat = () => {
    if (agente) {
      agente.limpiarMemoria()
      setMensajes([{
        id: 'reinicio',
        contenido: `¡Hola de nuevo! Soy ${agente.obtenerEstadisticas().configuracion.nombre}. ` +
                  'He reiniciado mi memoria. ¡Empecemos una nueva conversación!',
        tipo: 'agente',
        timestamp: new Date()
      }])
    }
  }

  const exportarConversacion = () => {
    if (!agente) return

    const estado = agente.exportarEstado()
    const evaluacion = agente.evaluarConversacion()
    
    const datos = {
      conversacion: mensajes,
      estadisticas: estado,
      evaluacion,
      timestamp: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `conversacion-agente-basico-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const ejemplosCodigo = `// Ejemplo: Crear tu propio patrón
const miPatron = {
  patron: [/programación|código|programming/i],
  respuestas: [
    'Me encanta hablar de programación!',
    'El código es poesía en acción.'
  ],
  prioridad: 8
}

agente.agregarPatronPersonalizado(miPatron)

// Ejemplo: Obtener estadísticas
const stats = agente.obtenerEstadisticas()
console.log('Mensajes procesados:', stats.mensajesProcesados)

// Ejemplo: Evaluar conversación
const evaluacion = agente.evaluarConversacion()
console.log('Puntuación:', evaluacion.puntuacion)`

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">
                {configuracionInicial?.nombre || 'Agente Básico'} - Chat Interactivo
              </h3>
              <p className="text-sm text-gray-400">
                Experimenta con tu primer agente IA
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMostrarEstadisticas(!mostrarEstadisticas)}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              title="Estadísticas"
            >
              <BarChart3 className="w-4 h-4 text-gray-300" />
            </button>
            <button
              onClick={() => setMostrarCodigo(!mostrarCodigo)}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              title="Ver código"
            >
              <Code className="w-4 h-4 text-gray-300" />
            </button>
            <button
              onClick={exportarConversacion}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              title="Exportar conversación"
            >
              <Download className="w-4 h-4 text-gray-300" />
            </button>
            <button
              onClick={reiniciarChat}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              title="Reiniciar chat"
            >
              <RefreshCw className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      {mostrarEstadisticas && estadisticas && (
        <div className="bg-gray-800/30 border-b border-gray-700 p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Mensajes:</span>
              <span className="ml-2 font-medium">{estadisticas.mensajesProcesados}</span>
            </div>
            <div>
              <span className="text-gray-400">Patrones:</span>
              <span className="ml-2 font-medium">{estadisticas.patronesCoincididos}</span>
            </div>
            <div>
              <span className="text-gray-400">Memoria:</span>
              <span className="ml-2 font-medium">{estadisticas.mensajesEnMemoria}</span>
            </div>
            <div>
              <span className="text-gray-400">Contexto:</span>
              <span className="ml-2 font-medium">{estadisticas.contextoActual || 'Ninguno'}</span>
            </div>
          </div>
          {agente && (
            <div className="mt-3 p-3 bg-gray-700/50 rounded-lg">
              <div className="text-sm">
                {(() => {
                  const evaluacion = agente.evaluarConversacion()
                  return (
                    <div>
                      <span className="text-purple-400 font-medium">
                        Evaluación: {evaluacion.puntuacion}/100
                      </span>
                      <p className="text-gray-300 mt-1">{evaluacion.feedback}</p>
                    </div>
                  )
                })()}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Código de ejemplo */}
      {mostrarCodigo && (
        <div className="bg-gray-950 border-b border-gray-700 p-4">
          <h4 className="font-medium mb-2 text-purple-400">Ejemplos de código:</h4>
          <pre className="text-sm text-gray-300 overflow-x-auto">
            <code>{ejemplosCodigo}</code>
          </pre>
        </div>
      )}

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {mensajes.map((mensaje) => (
          <div
            key={mensaje.id}
            className={`flex gap-3 ${mensaje.tipo === 'usuario' ? 'justify-end' : 'justify-start'}`}
          >
            {mensaje.tipo === 'agente' && (
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={`max-w-[80%] ${mensaje.tipo === 'usuario' ? 'order-1' : ''}`}>
              <div className={`px-4 py-2 rounded-lg ${
                mensaje.tipo === 'usuario'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-100'
              }`}>
                <p className="whitespace-pre-wrap">{mensaje.contenido}</p>
              </div>
              <div className={`text-xs text-gray-500 mt-1 ${
                mensaje.tipo === 'usuario' ? 'text-right' : 'text-left'
              }`}>
                {mensaje.timestamp.toLocaleTimeString()}
              </div>
            </div>
            {mensaje.tipo === 'usuario' && (
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
        
        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-800 text-gray-100 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-700 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            enviarMensaje()
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Escribe un mensaje para el agente..."
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100 placeholder-gray-400"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            {loading ? 'Procesando...' : 'Enviar'}
          </button>
        </form>
        
        <div className="mt-3 text-xs text-gray-500 flex items-center gap-2">
          <Brain className="w-3 h-3" />
          Prueba saludar, hacer preguntas, o decir "ayuda" para ver diferentes respuestas
        </div>
      </div>
    </div>
  )
}