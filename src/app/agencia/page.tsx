'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  BookOpen, Code, Brain, Target, Clock, Trophy, 
  CheckCircle, Lock, Play, ChevronRight, Calendar,
  Zap, Users, Award, TrendingUp 
} from 'lucide-react'

interface LessonStatus {
  id: string
  title: string
  description: string
  url: string
  status: 'completed' | 'current' | 'locked'
  progress: number
  estimatedTime: number
  difficulty: 'basic' | 'intermediate' | 'advanced'
  tags: string[]
}

interface WeekData {
  id: string
  title: string
  description: string
  lessons: LessonStatus[]
  progress: number
}

interface MonthData {
  id: string
  title: string
  description: string
  color: string
  weeks: WeekData[]
  totalProgress: number
  estimatedHours: number
}

export default function AgenciaDashboard() {
  const [userStats, setUserStats] = useState({
    totalTimeSpent: 210, // 3.5 horas en minutos
    conceptsMastered: 5,
    currentStreak: 3,
    totalLessons: 48,
    completedLessons: 1,
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced'
  })

  // Datos del curriculum - mapeo de URLs técnicas a contenido amigable
  const curriculumData: MonthData[] = [
    {
      id: 'mes-1',
      title: '🏗️ Fundamentos de Agentes IA',
      description: 'Base sólida para desarrollo de sistemas IA',
      color: 'from-blue-500 to-cyan-500',
      estimatedHours: 40,
      totalProgress: 20,
      weeks: [
        {
          id: 'semana-1',
          title: 'Setup & Arquitectura Base',
          description: 'Configuración profesional y principios fundamentales',
          progress: 25,
          lessons: [
            {
              id: 'dia-1',
              title: 'Setup inicial del proyecto + Principios Clean Code',
              description: 'Configuración profesional y buenas prácticas desde el inicio',
              url: '/agencia/mes-1/semana-1/dia-1',
              status: 'current',
              progress: 0,
              estimatedTime: 120,
              difficulty: 'basic',
              tags: ['setup', 'clean-code', 'fundamentos']
            },
            {
              id: 'dia-2', 
              title: 'Estructura de directorios + Configuración Git',
              description: 'Organización profesional de código y control de versiones',
              url: '/agencia/mes-1/semana-1/dia-2',
              status: 'locked',
              progress: 0,
              estimatedTime: 90,
              difficulty: 'basic',
              tags: ['git', 'estructura', 'organización']
            },
            {
              id: 'dia-3',
              title: 'JSON Schema + Validación de Datos',
              description: 'Validación robusta para sistemas IA en producción',
              url: '/agencia/mes-1/semana-1/dia-3',
              status: 'completed',
              progress: 100,
              estimatedTime: 150,
              difficulty: 'intermediate',
              tags: ['json-schema', 'validación', 'apis']
            },
            {
              id: 'dia-4',
              title: 'Tests básicos con Jest + Primer agente mock',
              description: 'Testing y desarrollo de agentes con mocks',
              url: '/agencia/mes-1/semana-1/dia-4',
              status: 'locked',
              progress: 0,
              estimatedTime: 180,
              difficulty: 'intermediate',
              tags: ['testing', 'jest', 'mocks', 'agentes']
            },
            {
              id: 'dia-5',
              title: 'Integración y documentación JSDoc',
              description: 'Documentación profesional y consolidación',
              url: '/agencia/mes-1/semana-1/dia-5',
              status: 'locked',
              progress: 0,
              estimatedTime: 120,
              difficulty: 'basic',
              tags: ['jsdoc', 'documentación', 'integración']
            }
          ]
        }
      ]
    },
    {
      id: 'mes-2',
      title: '🔗 APIs e Integraciones',
      description: 'Conexión con servicios IA externos',
      color: 'from-purple-500 to-pink-500',
      estimatedHours: 45,
      totalProgress: 0,
      weeks: [
        {
          id: 'semana-1',
          title: 'Integración con APIs IA',
          description: 'OpenAI, Claude, y otros servicios',
          progress: 0,
          lessons: [
            {
              id: 'dia-1',
              title: 'Integración OpenAI API',
              description: 'Conectar con GPT-4 y modelos OpenAI',
              url: '/agencia/mes-2/semana-1/dia-1',
              status: 'locked',
              progress: 0,
              estimatedTime: 180,
              difficulty: 'intermediate',
              tags: ['openai', 'api', 'integración']
            }
          ]
        }
      ]
    },
    {
      id: 'mes-3',
      title: '🏗️ Arquitectura Avanzada',
      description: 'Patrones enterprise y escalabilidad',
      color: 'from-green-500 to-teal-500',
      estimatedHours: 50,
      totalProgress: 0,
      weeks: []
    },
    {
      id: 'mes-4',
      title: '🚀 Producción y Deploy',
      description: 'Docker, Kubernetes y monitoring',
      color: 'from-orange-500 to-red-500',
      estimatedHours: 35,
      totalProgress: 0,
      weeks: []
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'text-green-400 bg-green-400/10'
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/10'
      case 'advanced': return 'text-red-400 bg-red-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'current': return <Play className="w-5 h-5 text-blue-400" />
      case 'locked': return <Lock className="w-5 h-5 text-gray-500" />
      default: return <BookOpen className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      
      {/* Header Principal */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Mi Academia de Agentes IA</h1>
                <p className="text-gray-400">Programa completo de 48 semanas - De principiante a experto</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{userStats.currentStreak}</div>
                <div className="text-sm text-gray-400">días seguidos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{userStats.completedLessons}</div>
                <div className="text-sm text-gray-400">lecciones completas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 capitalize">{userStats.level}</div>
                <div className="text-sm text-gray-400">nivel actual</div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Stats Dashboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          
          <div className="bg-gradient-to-r from-blue-900/20 to-blue-800/20 border border-blue-800/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-blue-400" />
              <span className="text-blue-400 font-medium">Tiempo Total</span>
            </div>
            <div className="text-2xl font-bold text-white">{Math.round(userStats.totalTimeSpent / 60)}h</div>
            <div className="text-sm text-gray-400">Esta semana: 3.5h</div>
          </div>

          <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 border border-green-800/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-6 h-6 text-green-400" />
              <span className="text-green-400 font-medium">Conceptos</span>
            </div>
            <div className="text-2xl font-bold text-white">{userStats.conceptsMastered}/50</div>
            <div className="text-sm text-gray-400">Dominados completamente</div>
          </div>

          <div className="bg-gradient-to-r from-purple-900/20 to-purple-800/20 border border-purple-800/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-6 h-6 text-purple-400" />
              <span className="text-purple-400 font-medium">Proyectos</span>
            </div>
            <div className="text-2xl font-bold text-white">1/12</div>
            <div className="text-sm text-gray-400">Completados</div>
          </div>

          <div className="bg-gradient-to-r from-orange-900/20 to-orange-800/20 border border-orange-800/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-orange-400" />
              <span className="text-orange-400 font-medium">Progreso</span>
            </div>
            <div className="text-2xl font-bold text-white">8%</div>
            <div className="text-sm text-gray-400">Del programa total</div>
          </div>

        </div>

      </section>

      {/* Curriculum Overview */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">📚 Roadmap del Programa</h2>
          <p className="text-gray-400">Haz click en cualquier lección para acceder directamente</p>
        </div>

        <div className="space-y-8">
          
          {curriculumData.map((month, monthIndex) => (
            <motion.div
              key={month.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: monthIndex * 0.1 }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
            >
              
              {/* Month Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${month.color} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                    M{monthIndex + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{month.title}</h3>
                    <p className="text-gray-400">{month.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{month.totalProgress}%</div>
                  <div className="text-sm text-gray-400">{month.estimatedHours}h estimadas</div>
                </div>
              </div>

              {/* Month Progress Bar */}
              <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
                <motion.div 
                  className={`bg-gradient-to-r ${month.color} h-2 rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${month.totalProgress}%` }}
                  transition={{ duration: 1, delay: monthIndex * 0.2 }}
                />
              </div>

              {/* Weeks */}
              <div className="space-y-4">
                {month.weeks.map((week, weekIndex) => (
                  <div key={week.id} className="border border-gray-700 rounded-lg p-4">
                    
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-white">📅 {week.title}</h4>
                      <span className="text-sm text-gray-400">{week.progress}% completado</span>
                    </div>

                    {/* Lessons Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {week.lessons.map((lesson, lessonIndex) => (
                        <Link
                          key={lesson.id}
                          href={lesson.url}
                          className={`block p-4 rounded-lg border transition-all ${
                            lesson.status === 'locked' 
                              ? 'border-gray-700 bg-gray-800/50 cursor-not-allowed opacity-60' 
                              : 'border-gray-600 bg-gray-800/30 hover:bg-gray-700/50 hover:border-blue-500/50 hover:scale-105'
                          }`}
                        >
                          
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(lesson.status)}
                              <span className="text-sm font-medium text-gray-300">
                                D{lessonIndex + 1}
                              </span>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs ${getDifficultyColor(lesson.difficulty)}`}>
                              {lesson.difficulty}
                            </div>
                          </div>

                          <h5 className="font-medium text-white text-sm mb-2 line-clamp-2">
                            {lesson.title}
                          </h5>
                          
                          <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                            {lesson.description}
                          </p>

                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">
                              ⏱️ {lesson.estimatedTime}min
                            </span>
                            {lesson.status === 'completed' && (
                              <span className="text-green-400">✅ Completado</span>
                            )}
                            {lesson.status === 'current' && (
                              <span className="text-blue-400">▶️ Siguiente</span>
                            )}
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {lesson.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span 
                                key={tagIndex}
                                className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                        </Link>
                      ))}
                    </div>

                  </div>
                ))}
              </div>

            </motion.div>
          ))}

        </div>

      </main>

    </div>
  )
}