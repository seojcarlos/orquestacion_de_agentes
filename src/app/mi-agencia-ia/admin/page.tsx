'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Users, BookOpen, TrendingUp, Award, Brain, RefreshCw, Activity } from 'lucide-react'

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalContent: number;
  generatedContent: number;
  averageCompletion: number;
  topAchievements: string[];
}

interface ContentStatus {
  month: number;
  weeks: {
    week: number;
    status: 'generated' | 'cached' | 'pending';
    lastGenerated: string;
    quality: number;
  }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [contentStatus, setContentStatus] = useState<ContentStatus[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAdminData()
  }, [])

  const loadAdminData = async () => {
    setLoading(true)
    
    try {
      // Simular datos del admin (en producción vendría de la API)
      const mockStats: AdminStats = {
        totalUsers: 1247,
        activeUsers: 423,
        totalContent: 576, // 48 semanas * 12 contenidos promedio
        generatedContent: 89,
        averageCompletion: 34.7,
        topAchievements: ['Primera Semana', 'Constancia', 'Fundamentos Sólidos']
      }

      const mockContentStatus: ContentStatus[] = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        weeks: Array.from({ length: 4 }, (_, j) => ({
          week: j + 1,
          status: Math.random() > 0.7 ? 'generated' : Math.random() > 0.3 ? 'cached' : 'pending',
          lastGenerated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          quality: Math.floor(Math.random() * 40) + 60
        }))
      }))

      setStats(mockStats)
      setContentStatus(mockContentStatus)
    } catch (error) {
      console.error('Error loading admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const regenerateContent = async (month: number, week: number) => {
    try {
      const response = await fetch('/api/mi-agencia-ia/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate_week',
          month,
          week
        })
      })

      if (response.ok) {
        // Actualizar estado local
        setContentStatus(prev => prev.map(monthData => 
          monthData.month === month 
            ? {
                ...monthData,
                weeks: monthData.weeks.map(weekData =>
                  weekData.week === week
                    ? { ...weekData, status: 'generated', lastGenerated: new Date().toISOString() }
                    : weekData
                )
              }
            : monthData
        ))
      }
    } catch (error) {
      console.error('Error regenerating content:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generated': return 'text-green-400 bg-green-900/20'
      case 'cached': return 'text-blue-400 bg-blue-900/20'
      case 'pending': return 'text-yellow-400 bg-yellow-900/20'
      default: return 'text-gray-400 bg-gray-900/20'
    }
  }

  const getQualityColor = (quality: number) => {
    if (quality >= 90) return 'text-green-400'
    if (quality >= 75) return 'text-blue-400'
    if (quality >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
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
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-400 text-sm">Sistema de administración - Mi Agencia IA</p>
              </div>
            </div>
            <button
              onClick={loadAdminData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-blue-400" />
                <h3 className="font-semibold">Usuarios</h3>
              </div>
              <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-gray-400">{stats.activeUsers} activos</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-6 h-6 text-green-400" />
                <h3 className="font-semibold">Contenido</h3>
              </div>
              <p className="text-2xl font-bold">{stats.generatedContent}/{stats.totalContent}</p>
              <p className="text-sm text-gray-400">Semanas generadas</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-purple-400" />
                <h3 className="font-semibold">Progreso Promedio</h3>
              </div>
              <p className="text-2xl font-bold">{stats.averageCompletion}%</p>
              <p className="text-sm text-gray-400">Completación</p>
            </div>
          </div>
        )}

        {/* Claude Flow Status */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold">Estado de Claude Flow</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Generador de Contenido</span>
              </div>
              <p className="text-sm text-gray-400">Operativo - Última generación hace 2 min</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Sistema de Validación</span>
              </div>
              <p className="text-sm text-gray-400">Activo - Validando calidad automáticamente</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Tracking de Progreso</span>
              </div>
              <p className="text-sm text-gray-400">Monitoreando - 423 usuarios activos</p>
            </div>
          </div>
        </div>

        {/* Content Status Matrix */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Estado del Contenido por Mes</h2>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded"></div>
                <span>Generado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded"></div>
                <span>Caché</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                <span>Pendiente</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4">Mes</th>
                  <th className="text-left py-3 px-4">Sem 1</th>
                  <th className="text-left py-3 px-4">Sem 2</th>
                  <th className="text-left py-3 px-4">Sem 3</th>
                  <th className="text-left py-3 px-4">Sem 4</th>
                  <th className="text-left py-3 px-4">Calidad Promedio</th>
                  <th className="text-left py-3 px-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {contentStatus.map((month) => (
                  <tr key={month.month} className="border-b border-gray-800/50">
                    <td className="py-3 px-4 font-medium">Mes {month.month}</td>
                    {month.weeks.map((week) => (
                      <td key={week.week} className="py-3 px-4">
                        <div className="flex flex-col gap-1">
                          <span className={`text-xs px-2 py-1 rounded ${getStatusColor(week.status)}`}>
                            {week.status}
                          </span>
                          <span className={`text-xs ${getQualityColor(week.quality)}`}>
                            {week.quality}%
                          </span>
                        </div>
                      </td>
                    ))}
                    <td className="py-3 px-4">
                      <span className={`font-medium ${getQualityColor(
                        Math.round(month.weeks.reduce((acc, w) => acc + w.quality, 0) / month.weeks.length)
                      )}`}>
                        {Math.round(month.weeks.reduce((acc, w) => acc + w.quality, 0) / month.weeks.length)}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        {month.weeks.map((week) => (
                          <button
                            key={week.week}
                            onClick={() => regenerateContent(month.month, week.week)}
                            className="text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                            title={`Regenerar Semana ${week.week}`}
                          >
                            S{week.week}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold">Actividad Reciente</h3>
            </div>
            <div className="space-y-3">
              {[
                { action: 'Contenido generado', detail: 'Mes 2, Semana 3', time: 'hace 5 min' },
                { action: 'Usuario completó tarea', detail: 'TaskManager implementation', time: 'hace 12 min' },
                { action: 'Logro desbloqueado', detail: 'Primera Semana - Usuario #1247', time: 'hace 23 min' },
                { action: 'Contenido validado', detail: 'Mes 1, Semana 4 - Calidad 95%', time: 'hace 34 min' }
              ].map((activity, idx) => (
                <div key={idx} className="flex items-start justify-between text-sm">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-gray-400">{activity.detail}</p>
                  </div>
                  <span className="text-gray-500 text-xs">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-yellow-400" />
              <h3 className="font-semibold">Logros Populares</h3>
            </div>
            <div className="space-y-3">
              {stats?.topAchievements.map((achievement, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm">{achievement}</span>
                  <span className="text-xs bg-gray-800 px-2 py-1 rounded">
                    {Math.floor(Math.random() * 200) + 50} usuarios
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}