'use client'

import Link from 'next/link'
import { ArrowLeft, CheckCircle, Circle, Lock } from 'lucide-react'
import { useState } from 'react'

export default function RoadmapCompleto() {
  const [expandedMonth, setExpandedMonth] = useState<number | null>(1)

  const roadmap = [
    {
      month: 1,
      title: 'El Núcleo del Sistema',
      subtitle: 'Task Management',
      status: 'available',
      weeks: [
        {
          week: 1,
          title: 'Configuración del Entorno y Fundamentos',
          topics: [
            'Setup del proyecto con estructura profesional',
            'Principios de Clean Code',
            'Diseño del Task Schema',
            'Configuración de Git y primeros tests'
          ],
          deliverable: 'Estructura base con task.schema.json'
        },
        {
          week: 2,
          title: 'Implementación del TaskManager v0.1',
          topics: [
            'Métodos createTask y updateTaskStatus',
            'Sistema de historial de cambios',
            'Gestión del ciclo de vida de tareas',
            'Tests unitarios completos'
          ],
          deliverable: 'TaskManager funcional y probado'
        },
        {
          week: 3,
          title: 'Primer Agente y Sistema de Prompts',
          topics: [
            'BaseAgent y ContentCreatorAgent',
            'PromptManager básico',
            'Integración con IA (mock inicial)',
            'Flujo completo de procesamiento'
          ],
          deliverable: 'Primer agente procesando tareas'
        },
        {
          week: 4,
          title: 'UI Simple y Feedback Humano',
          topics: [
            'Server Express + React básico',
            'Socket.io para tiempo real',
            'Sistema de aprobación/rechazo',
            'EventBus para desacoplamiento'
          ],
          deliverable: 'UI funcional con feedback en tiempo real'
        }
      ]
    },
    {
      month: 2,
      title: 'Prompts como Código',
      subtitle: 'Optimización de Costes',
      status: 'available',
      weeks: [
        {
          week: 5,
          title: 'PromptManager Completo',
          topics: [
            'Handlebars para templates',
            'Sistema de versionado',
            'A/B testing de prompts',
            'Hot reload en desarrollo'
          ],
          deliverable: 'Sistema profesional de prompts'
        },
        {
          week: 6,
          title: 'Sistema de Caché con Redis',
          topics: [
            'Caché exacto vs semántico',
            'Integración con Redis',
            'Embeddings para similitud',
            'TTL y estrategias de invalidación'
          ],
          deliverable: 'Reducción 50% en llamadas a API'
        },
        {
          week: 7,
          title: 'Router Inteligente de Modelos',
          topics: [
            'Análisis de complejidad de tareas',
            'Selección dinámica de modelos',
            'Tracking de costos en tiempo real',
            'ROI por modelo'
          ],
          deliverable: 'CostOptimizer completo'
        },
        {
          week: 8,
          title: 'Bucle de Corrección Básico',
          topics: [
            'CorrectionLoop fundamentos',
            'Clasificación de errores',
            'Prompts mejorados con feedback',
            'Integración con UI'
          ],
          deliverable: 'Sistema básico de correcciones'
        }
      ]
    },
    {
      month: 3,
      title: 'Aprendizaje Continuo',
      subtitle: 'Métricas y Dashboard',
      status: 'available',
      weeks: [
        {
          week: 9,
          title: 'Memoria de Correcciones',
          topics: [
            'Base de datos vectorial',
            'Búsqueda de correcciones similares',
            'Estrategia de reintentos inteligente',
            'Generación de mejoras automáticas'
          ],
          deliverable: 'Sistema con memoria'
        },
        {
          week: 10,
          title: 'Métricas y Dashboard',
          topics: [
            'Métricas por agente',
            'Análisis de ROI',
            'Dashboard con React y Recharts',
            'Reportes automatizados'
          ],
          deliverable: 'Dashboard de métricas completo'
        },
        {
          week: 11,
          title: 'Refactorización y Pruebas',
          topics: [
            'Code review exhaustivo',
            'Tests de integración',
            'Documentación técnica',
            'Demo end-to-end'
          ],
          deliverable: 'MVP estable y documentado'
        },
        {
          week: 12,
          title: 'Descanso y Planificación',
          topics: [
            'Revisión de logros',
            'Estudio de arquitectura de microservicios',
            'Preparación para multi-agente',
            'Descanso activo'
          ],
          deliverable: 'Plan para Fase 2'
        }
      ]
    },
    {
      month: 4,
      title: 'Arquitectura de Eventos',
      subtitle: 'Colaboración Multi-Agente',
      status: 'locked',
      weeks: [
        {
          week: 13,
          title: 'EventBus Central',
          topics: [
            'Patrón Publisher/Subscriber',
            'Eventos del sistema',
            'Orchestrator como cerebro',
            'Desacoplamiento total'
          ],
          deliverable: 'Arquitectura event-driven'
        },
        {
          week: 14,
          title: 'Agentes Colaboradores',
          topics: [
            'WebDevAgent',
            'AnalyticsAgent',
            'Workflows en YAML',
            'Cadenas de procesamiento'
          ],
          deliverable: '3 agentes trabajando juntos'
        },
        {
          week: 15,
          title: 'Agente Crítico',
          topics: [
            'CriticalAgent evaluador',
            'Rúbricas de evaluación',
            'Integración con CorrectionLoop',
            'Flujos de validación'
          ],
          deliverable: 'QA automático funcionando'
        },
        {
          week: 16,
          title: 'Estabilización',
          topics: [
            'Tests de integración',
            'Pruebas de carga',
            'Documentación de arquitectura',
            'Demo multi-agente'
          ],
          deliverable: 'Sistema multi-agente estable'
        }
      ]
    },
    {
      month: 5,
      title: 'Dashboards Avanzados',
      subtitle: 'Monitorización Profesional',
      status: 'locked',
      weeks: [
        {
          week: 17,
          title: 'Dashboard de Costos',
          topics: [
            'Métricas en tiempo real',
            'Filtros avanzados',
            'Alertas de presupuesto',
            'Gráficos interactivos'
          ],
          deliverable: 'Control total de costos'
        },
        {
          week: 18,
          title: 'Métricas de Calidad',
          topics: [
            'KPIs por agente',
            'Correlación de métricas',
            'Reportes automáticos',
            'Insights accionables'
          ],
          deliverable: 'Dashboard de calidad'
        },
        {
          week: 19,
          title: 'Integración Langfuse',
          topics: [
            'Observabilidad LLM',
            'Traces detallados',
            'Scores y evaluaciones',
            'Debug avanzado'
          ],
          deliverable: 'Langfuse integrado'
        },
        {
          week: 20,
          title: 'Finalización Langfuse',
          topics: [
            'Métricas custom',
            'Dashboards Langfuse',
            'Optimización de prompts',
            'Análisis de rendimiento'
          ],
          deliverable: 'Observabilidad completa'
        }
      ]
    },
    {
      month: 6,
      title: 'Hacia el MVP',
      subtitle: 'Preparación para Beta',
      status: 'locked',
      weeks: [
        {
          week: 21,
          title: 'Robustez del Sistema',
          topics: [
            'Manejo de errores exhaustivo',
            'Reintentos y resilencia',
            'Validación de entradas',
            'Logging profesional'
          ],
          deliverable: 'Sistema robusto'
        },
        {
          week: 22,
          title: 'UI para Clientes',
          topics: [
            'Simplificación de UI',
            'Flujos intuitivos',
            'Documentación de usuario',
            'Onboarding'
          ],
          deliverable: 'UI lista para beta'
        },
        {
          week: 23,
          title: 'Despliegue en Staging',
          topics: [
            'Vercel + Railway',
            'CI/CD con GitHub Actions',
            'Variables de entorno',
            'Testing en staging'
          ],
          deliverable: 'MVP en staging'
        },
        {
          week: 24,
          title: 'Preparación Fase 3',
          topics: [
            'Feedback inicial',
            'Plan de UX avanzada',
            'Estudio React Flow',
            'Descanso'
          ],
          deliverable: 'Plan para visualización'
        }
      ]
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <Circle className="w-5 h-5 text-blue-500" />
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Lock className="w-5 h-5 text-gray-600" />
    }
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
                <h1 className="text-2xl font-bold text-white">Roadmap Completo</h1>
                <p className="text-gray-400 text-sm">48 semanas de formación intensiva</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Progreso General</h2>
            <span className="text-sm text-gray-400">0% completado</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full" style={{ width: '0%' }} />
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">12</p>
              <p className="text-sm text-gray-400">Meses totales</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">48</p>
              <p className="text-sm text-gray-400">Semanas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-400">11</p>
              <p className="text-sm text-gray-400">Agentes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">0</p>
              <p className="text-sm text-gray-400">Completadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {roadmap.map((month) => (
            <div
              key={month.month}
              className={`bg-gray-900 border rounded-xl overflow-hidden transition-all ${
                month.status === 'locked' ? 'border-gray-800 opacity-60' : 'border-gray-700'
              }`}
            >
              {/* Month Header */}
              <div
                className={`p-6 cursor-pointer ${
                  month.status !== 'locked' ? 'hover:bg-gray-800/50' : ''
                }`}
                onClick={() => month.status !== 'locked' && setExpandedMonth(
                  expandedMonth === month.month ? null : month.month
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(month.status)}
                    <div>
                      <h3 className="text-xl font-semibold">
                        Mes {month.month}: {month.title}
                      </h3>
                      <p className="text-gray-400">{month.subtitle}</p>
                    </div>
                  </div>
                  {month.status === 'available' && (
                    <Link
                      href={`/mi-agencia-ia/mes-${month.month}`}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Empezar
                    </Link>
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              {expandedMonth === month.month && month.status !== 'locked' && (
                <div className="border-t border-gray-800 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {month.weeks.map((week) => (
                      <div key={week.week} className="bg-gray-800/50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 text-blue-400">
                          Semana {week.week}: {week.title}
                        </h4>
                        <ul className="space-y-1 mb-3">
                          {week.topics.map((topic, idx) => (
                            <li key={idx} className="text-sm text-gray-300 flex items-start">
                              <span className="text-gray-600 mr-2">•</span>
                              {topic}
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm text-green-400 font-medium">
                          📦 {week.deliverable}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Comienza tu viaje</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            El primer mes está disponible para empezar. Cada semana construye sobre la anterior,
            creando una base sólida para tu agencia IA.
          </p>
          <Link
            href="/mi-agencia-ia/mes-1"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Comenzar Semana 1
          </Link>
        </div>
      </section>
    </div>
  )
}