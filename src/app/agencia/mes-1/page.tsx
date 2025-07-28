'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Play, CheckCircle, Circle, Code, Brain, Users, Zap, Clock, Star, Calendar, Home, ChevronRight } from 'lucide-react'

interface Semana {
  numero: number
  titulo: string
  descripcion: string
  duracion: string
  objetivos: string[]
  completada: boolean
  progreso: number
  disponible: boolean
}

export default function Mes1Page() {
  const [progreso, setProgreso] = useState(0)
  const [semanasCompletadas, setSemanasCompletadas] = useState<Set<number>>(new Set())

  const semanas: Semana[] = [
    {
      numero: 1,
      titulo: 'Agente Básico',
      descripcion: 'Construye tu primer agente IA desde cero sin frameworks externos',
      duracion: '3-4 horas',
      objetivos: [
        'Arquitectura básica de agentes',
        'Procesamiento de lenguaje natural',
        'Patrones de respuesta',
        'Manejo de contexto simple'
      ],
      completada: false,
      progreso: 0,
      disponible: true
    },
    {
      numero: 2,
      titulo: 'TaskManager v0.1',
      descripcion: 'Construye el núcleo de gestión de tareas con validación, estados y persistencia',
      duracion: '5-6 horas',
      objetivos: [
        'Sistema de creación y validación de tareas',
        'Gestión de estados con transiciones válidas',
        'Almacenamiento de outputs con compresión',
        'Historial de cambios y persistencia',
        'API REST con queries y paginación'
      ],
      completada: false,
      progreso: 0,
      disponible: true // Habilitada para mostrar el nuevo contenido
    },
    {
      numero: 3,
      titulo: 'Primer Agente y Sistema de Prompts',
      descripcion: 'Evoluciona de agente básico a sistema profesional con prompts optimizados',
      duracion: '4-5 horas',
      objetivos: [
        'Refactorizar AgenteBasico → BaseAgent',
        'ContentCreatorAgent especializado',
        'Sistema básico de prompts + Templates',
        'PromptManager inicial + Cache',
        'Integración agente-task + Mock APIs'
      ],
      completada: false,
      progreso: 0,
      disponible: false
    },
    {
      numero: 4,
      titulo: 'UI Simple y Feedback Humano',
      descripcion: 'Interface funcional para interacción humana con tiempo real',
      duracion: '4-5 horas',
      objetivos: [
        'Server Express básico + Configuración',
        'Componente TaskList en React',
        'Integración Socket.io + Tiempo real',
        'Sistema de feedback (aprobar/rechazar)',
        'Actualización en tiempo real + Endpoints'
      ],
      completada: false,
      progreso: 0,
      disponible: false
    }
  ]

  // Cargar progreso desde localStorage
  useEffect(() => {
    const progresoGuardado = localStorage.getItem('agencia-mes-1-progreso')
    if (progresoGuardado) {
      const { completadas, progreso: porcentaje } = JSON.parse(progresoGuardado)
      setSemanasCompletadas(new Set(completadas))
      setProgreso(porcentaje)
    }
  }, [])

  // Actualizar disponibilidad de semanas
  const semanasDisplay = semanas.map((semana, index) => ({
    ...semana,
    completada: semanasCompletadas.has(semana.numero),
    disponible: index === 0 || semanasCompletadas.has(index), // Primera semana siempre disponible, resto si la anterior está completa
    progreso: semanasCompletadas.has(semana.numero) ? 100 : 0
  }))

  const getSemanaIcon = (semana: Semana) => {
    switch (semana.numero) {
      case 1: return <Code className="w-6 h-6 text-blue-400" />
      case 2: return <Brain className="w-6 h-6 text-purple-400" />
      case 3: return <Users className="w-6 h-6 text-green-400" />
      case 4: return <Zap className="w-6 h-6 text-yellow-400" />
      default: return <Circle className="w-6 h-6" />
    }
  }

  const progresoTotal = Math.round((semanasCompletadas.size / semanas.length) * 100)

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Breadcrumbs */}
      <nav className="bg-gray-900/30 backdrop-blur-sm border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link 
              href="/agencia" 
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors hover:underline"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <span className="text-white font-medium">Mes 1: Fundamentos de Agentes IA</span>
          </div>
          
          <div className="flex items-center gap-4 mt-2">
            <Link 
              href="/agencia" 
              className="text-xs text-gray-400 hover:text-gray-300 transition-colors hover:underline"
            >
              ← Volver al roadmap visual
            </Link>
            <span className="text-xs text-gray-600">|</span>
            <span className="text-xs text-gray-400">
              📍 Vista detallada del primer mes de formación
            </span>
          </div>
        </div>
      </nav>
      
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/agencia"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">Mes 1: Fundamentos</h1>
                <p className="text-gray-400">De cero a agente IA funcional en 4 semanas</p>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">Progreso Total</span>
                </div>
                <p className="text-2xl font-bold text-yellow-400">{progresoTotal}%</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="font-semibold">Semanas</span>
                </div>
                <p className="text-2xl font-bold text-green-400">{semanasCompletadas.size}/4</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold">Tiempo Total</span>
                </div>
                <p className="text-2xl font-bold text-blue-400">16-22h</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold">Nivel</span>
                </div>
                <p className="text-2xl font-bold text-purple-400">Principiante</p>
              </div>
            </div>
            
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progresoTotal}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3 text-blue-400">🎯 Objetivo del Mes 1</h2>
          <p className="text-gray-300 mb-4">
            Al final de este mes, habrás construido un sistema completo desde los fundamentos: agente básico, 
            TaskManager profesional, prompts optimizados y una UI funcional con feedback humano.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-blue-300 mb-2">Aprenderás:</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• Arquitectura de agentes IA desde cero</li>
                <li>• TaskManager con validación y persistencia</li>
                <li>• Sistemas de prompts profesionales</li>
                <li>• Interfaces funcionales con tiempo real</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-300 mb-2">Construirás:</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• Tu primer agente IA funcional</li>
                <li>• TaskManager completo con API REST</li>
                <li>• Sistema de prompts y templates</li>
                <li>• UI con feedback humano en tiempo real</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Semanas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-8">Plan Semanal</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {semanasDisplay.map((semana) => (
            <div
              key={semana.numero}
              className={`relative bg-gray-900 border rounded-xl p-6 transition-all ${
                semana.disponible 
                  ? 'border-gray-700 hover:border-gray-600' 
                  : 'border-gray-800 opacity-60'
              } ${semana.completada ? 'border-green-600/30 bg-green-900/10' : ''}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    semana.completada 
                      ? 'bg-green-600 text-white' 
                      : semana.disponible 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {semana.completada ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : semana.disponible ? (
                      getSemanaIcon(semana)
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      Semana {semana.numero}: {semana.titulo}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{semana.duracion}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 mb-4">{semana.descripcion}</p>

              {/* Objectives */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Objetivos:</h4>
                <ul className="space-y-1">
                  {semana.objetivos.map((objetivo, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      {objetivo}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Progress */}
              {semana.disponible && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Progreso</span>
                    <span className="text-xs text-gray-400">{semana.progreso}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${semana.progreso}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action */}
              <div className="flex justify-end">
                {semana.disponible ? (
                  <Link
                    href={`/agencia/mes-1/semana-${semana.numero}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    {semana.completada ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Revisar
                      </>
                    ) : semana.progreso > 0 ? (
                      <>
                        <Play className="w-4 h-4" />
                        Continuar
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Comenzar
                      </>
                    )}
                  </Link>
                ) : (
                  <div className="px-4 py-2 bg-gray-700 text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed">
                    Bloqueado
                  </div>
                )}
              </div>

              {/* Badge */}
              {semana.completada && (
                <div className="absolute top-4 right-4">
                  <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    Completada
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      {progresoTotal === 100 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-800/30 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4 text-green-400">🎉 ¡Mes 1 Completado!</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Has construido los fundamentos sólidos: agente básico, TaskManager profesional y UI funcional. 
              Ahora estás listo para avanzar hacia la optimización de prompts y el manejo inteligente de costos.
            </p>
            <Link
              href="/agencia/mes-2"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
            >
              Continuar a Mes 2: Prompts y Optimización <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      )}

      {/* Laboratorio CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">¿Quieres experimentar más?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Accede al laboratorio para probar configuraciones avanzadas, experimentar con nuevas ideas 
            y ver ejemplos prácticos de todo lo que estás aprendiendo.
          </p>
          <Link
            href="/agencia/laboratorio"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <Brain className="w-5 h-5" />
            Ir al Laboratorio
          </Link>
        </div>
      </section>
    </div>
  )
}