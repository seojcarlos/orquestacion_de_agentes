'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Circle, BookOpen, Terminal, FileCode, Loader2, RefreshCw } from 'lucide-react'

interface WeekContent {
  weekNumber: number;
  month: number;
  title: string;
  description: string;
  objectives: string[];
  resources: Resource[];
  days: DayContent[];
  deliverable: string;
  nextWeekPreview?: string;
}

interface DayContent {
  day: string;
  theme: string;
  tasks: Task[];
  timeEstimate: string;
}

interface Task {
  id: string;
  type: 'theory' | 'practice' | 'project' | 'review';
  title: string;
  description: string;
  code?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
}

interface Resource {
  type: 'book' | 'course' | 'video' | 'documentation' | 'article';
  name: string;
  author?: string;
  url?: string;
  chapters?: string;
  priority: 'essential' | 'recommended' | 'optional';
}

export default function MesPage() {
  const params = useParams()
  const mesNumber = parseInt(params.mes as string)
  
  const [activeWeek, setActiveWeek] = useState(1)
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())
  const [weekContent, setWeekContent] = useState<WeekContent | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cargar contenido de la semana actual
  useEffect(() => {
    loadWeekContent(mesNumber, activeWeek)
  }, [mesNumber, activeWeek])

  const loadWeekContent = async (month: number, week: number) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/mi-agencia-ia/generate?month=${month}&week=${week}`)
      
      if (!response.ok) {
        throw new Error('Error al cargar el contenido')
      }
      
      const content = await response.json()
      setWeekContent(content)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const regenerateContent = async () => {
    await loadWeekContent(mesNumber, activeWeek)
  }

  const toggleTask = (taskId: string) => {
    const newCompleted = new Set(completedTasks)
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId)
    } else {
      newCompleted.add(taskId)
    }
    setCompletedTasks(newCompleted)
  }

  const getMonthTitle = (month: number) => {
    const titles = {
      1: 'El Núcleo del Sistema',
      2: 'Prompts y Optimización',
      3: 'Aprendizaje Continuo',
      4: 'Arquitectura de Eventos',
      5: 'Dashboards Avanzados',
      6: 'Hacia el MVP',
      7: 'Canvas de Agentes',
      8: 'Validación Visual',
      9: 'Analytics y ROI',
      10: 'Multi-tenancy',
      11: 'Pagos y SaaS',
      12: 'Lanzamiento'
    }
    return titles[month] || `Mes ${month}`
  }

  const getPhaseInfo = (month: number) => {
    if (month <= 3) return { name: 'Fundamentos', color: 'blue' }
    if (month <= 6) return { name: 'Orquestación', color: 'purple' }
    if (month <= 9) return { name: 'Visualización', color: 'pink' }
    return { name: 'Productización', color: 'green' }
  }

  const phase = getPhaseInfo(mesNumber)

  if (loading && !weekContent) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Generando contenido con Claude Flow...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/mi-agencia-ia"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-white">
                    Mes {mesNumber}: {getMonthTitle(mesNumber)}
                  </h1>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold bg-${phase.color}-900/50 text-${phase.color}-400 border border-${phase.color}-800`}>
                    {phase.name}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">Contenido generado dinámicamente con Claude Flow</p>
              </div>
            </div>
            <button
              onClick={regenerateContent}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Regenerar
            </button>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progreso del Mes</span>
            <span className="text-sm text-gray-400">
              {completedTasks.size} tareas completadas
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${Math.min((completedTasks.size / (weekContent?.days.reduce((acc, day) => acc + day.tasks.length, 0) || 1)) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Week Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((week) => (
            <button
              key={week}
              onClick={() => setActiveWeek(week)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeWeek === week
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              Semana {week}
            </button>
          ))}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 text-center">
            <p className="text-red-400">Error: {error}</p>
            <button
              onClick={() => loadWeekContent(mesNumber, activeWeek)}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* Week Content */}
      {weekContent && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">{weekContent.title}</h2>
            <p className="text-gray-400 mb-4">{weekContent.description}</p>
            
            {/* Objectives */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 mb-4">
              <h3 className="font-semibold mb-2">Objetivos de la Semana</h3>
              <ul className="space-y-1">
                {weekContent.objectives.map((objective, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-blue-400 mt-1">•</span>
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              Recursos de la Semana
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weekContent.resources.map((resource, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  {resource.type === 'book' ? (
                    <FileCode className="w-5 h-5 text-purple-400 mt-0.5" />
                  ) : (
                    <Terminal className="w-5 h-5 text-green-400 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium">{resource.name}</p>
                    {resource.author && (
                      <p className="text-sm text-gray-400">por {resource.author}</p>
                    )}
                    {resource.chapters && (
                      <p className="text-sm text-gray-400">{resource.chapters}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Tasks */}
          <div className="space-y-6">
            {weekContent.days.map((day) => (
              <div key={day.day} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h4 className="text-xl font-semibold mb-2 text-blue-400">{day.day}</h4>
                <p className="text-gray-400 mb-4">{day.theme}</p>
                <div className="space-y-4">
                  {day.tasks.map((task) => (
                    <div key={task.id} className="border border-gray-800 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="mt-0.5"
                        >
                          {completedTasks.has(task.id) ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-600 hover:text-gray-400" />
                          )}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs px-2 py-1 rounded ${
                              task.type === 'theory' 
                                ? 'bg-purple-900/50 text-purple-400'
                                : task.type === 'practice'
                                ? 'bg-green-900/50 text-green-400'
                                : 'bg-blue-900/50 text-blue-400'
                            }`}>
                              {task.type === 'theory' ? 'Teoría' : task.type === 'practice' ? 'Práctica' : 'Proyecto'}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              task.difficulty === 'beginner'
                                ? 'bg-green-900/30 text-green-400'
                                : task.difficulty === 'intermediate'
                                ? 'bg-yellow-900/30 text-yellow-400'
                                : 'bg-red-900/30 text-red-400'
                            }`}>
                              {task.difficulty}
                            </span>
                            <span className="text-xs text-gray-500">
                              ~{task.estimatedTime}min
                            </span>
                          </div>
                          <h5 className="font-medium mb-2">{task.title}</h5>
                          <p className="text-sm text-gray-400 mb-3">{task.description}</p>
                          {task.code && (
                            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 overflow-x-auto">
                              <pre className="text-sm">
                                <code className="language-javascript">{task.code}</code>
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Deliverable */}
          <div className="mt-8 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-800/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2 text-green-400">📦 Entregable de la Semana</h3>
            <p className="text-gray-300">{weekContent.deliverable}</p>
          </div>

          {/* Next Week Preview */}
          {weekContent.nextWeekPreview && (
            <div className="mt-6 bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <h3 className="font-semibold mb-2">Vista Previa - Próxima Semana</h3>
              <p className="text-sm text-gray-400">{weekContent.nextWeekPreview}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            <Link
              href="/mi-agencia-ia/roadmap"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al Roadmap
            </Link>
            {activeWeek < 4 ? (
              <button
                onClick={() => setActiveWeek(activeWeek + 1)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
              >
                Siguiente Semana <ArrowRight className="w-4 h-4" />
              </button>
            ) : mesNumber < 12 ? (
              <Link
                href={`/mi-agencia-ia/${mesNumber + 1}`}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
              >
                Continuar a Mes {mesNumber + 1} <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-lg font-medium">
                🎉 ¡Formación Completada!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}