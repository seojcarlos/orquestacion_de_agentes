'use client'

import { useState } from 'react'
import { Trophy, Star, TrendingUp, Clock, Target, Users, Download, Upload, Settings, RefreshCw } from 'lucide-react'
import { useProgresoAcademia } from '@/hooks/useProgresoAcademia'
import PanelLogros from './PanelLogros'

interface Props {
  userId?: string
  mostrarLogros?: boolean
  mostrarExportacion?: boolean
}

export default function DashboardProgreso({ userId, mostrarLogros = true, mostrarExportacion = false }: Props) {
  const {
    progreso,
    estadisticas,
    semanas,
    logros,
    loading,
    error,
    exportarProgreso,
    importarProgreso,
    reiniciarProgreso,
    obtenerPorcentajeProgreso,
    obtenerLogrosRecientes,
    obtenerNivelActual
  } = useProgresoAcademia(userId)

  const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false)
  const [archivoImportar, setArchivoImportar] = useState<File | null>(null)

  if (loading) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
        <p className="text-gray-400">Cargando progreso...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 text-center">
        <p className="text-red-400 mb-4">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
        >
          Reintentar
        </button>
      </div>
    )
  }

  if (!progreso || !estadisticas) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
        <p className="text-gray-400">No se pudo cargar el progreso</p>
      </div>
    )
  }

  const handleExportar = () => {
    try {
      const datos = exportarProgreso()
      const blob = new Blob([datos], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `progreso-academia-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Error exportando:', err)
    }
  }

  const handleImportar = async () => {
    if (!archivoImportar) return

    try {
      const texto = await archivoImportar.text()
      const resultado = importarProgreso(texto)
      
      if (resultado) {
        alert('Progreso importado correctamente')
        setArchivoImportar(null)
      } else {
        alert('Error: formato de archivo inválido')
      }
    } catch (err) {
      alert('Error leyendo el archivo')
      console.error('Error importando:', err)
    }
  }

  const porcentajeGeneral = obtenerPorcentajeProgreso()
  const nivel = obtenerNivelActual()
  const logrosRecientes = obtenerLogrosRecientes(7)

  const formatearTiempo = (minutos: number) => {
    const horas = Math.floor(minutos / 60)
    const mins = minutos % 60
    if (horas > 0) {
      return `${horas}h ${mins}m`
    }
    return `${mins}m`
  }

  const calcularPorcentajeNivel = () => {
    return (estadisticas.experiencia / estadisticas.experienciaSiguienteNivel) * 100
  }

  return (
    <div className="space-y-6">
      {/* Header con Resumen General */}
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-800/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Tu Progreso en la Academia</h2>
              <p className="text-gray-400">Nivel {nivel} • {Math.round(porcentajeGeneral)}% Completado</p>
            </div>
          </div>
          
          {mostrarExportacion && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMostrarConfiguracion(!mostrarConfiguracion)}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                title="Configuración"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={reiniciarProgreso}
                className="p-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
                title="Reiniciar Progreso"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Barra de Progreso General */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Progreso General</span>
            <span className="text-gray-400">{Math.round(porcentajeGeneral)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${porcentajeGeneral}%` }}
            />
          </div>
        </div>

        {/* Nivel y Experiencia */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Nivel {nivel} - Experiencia</span>
            <span className="text-gray-400">
              {estadisticas.experiencia} / {estadisticas.experienciaSiguienteNivel} XP
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-yellow-600 to-orange-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${calcularPorcentajeNivel()}%` }}
            />
          </div>
        </div>

        {/* Estadísticas Principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900/50 rounded-lg p-4 text-center">
            <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold">{estadisticas.semanasCompletadas}/4</div>
            <div className="text-sm text-gray-400">Semanas</div>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-4 text-center">
            <Star className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-xl font-bold">{estadisticas.ejerciciosCompletados}</div>
            <div className="text-sm text-gray-400">Ejercicios</div>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-4 text-center">
            <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-xl font-bold">{formatearTiempo(estadisticas.tiempoTotal)}</div>
            <div className="text-sm text-gray-400">Tiempo Total</div>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-4 text-center">
            <TrendingUp className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <div className="text-xl font-bold">{Math.round(estadisticas.promedioCalificaciones)}%</div>
            <div className="text-sm text-gray-400">Promedio</div>
          </div>
        </div>
      </div>

      {/* Logros Recientes */}
      {logrosRecientes.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-800/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Logros Recientes (últimos 7 días)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {logrosRecientes.slice(0, 6).map((logro) => (
              <div key={logro.id} className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span className="font-medium text-sm">{logro.titulo}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{logro.descripcion}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-yellow-400">+{logro.puntos} pts</span>
                  <span className="text-xs text-gray-500">
                    {logro.fechaDesbloqueo?.toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progreso por Semanas */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Progreso por Semanas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {semanas.map((semana) => (
            <div
              key={semana.numero}
              className={`border rounded-lg p-4 transition-all ${
                semana.completada
                  ? 'border-green-600/30 bg-green-900/10'
                  : semana.bloqueada
                  ? 'border-gray-700 bg-gray-800/30 opacity-60'
                  : 'border-gray-700 bg-gray-800/50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Semana {semana.numero}: {semana.titulo}</h4>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  semana.completada
                    ? 'bg-green-600/20 text-green-400'
                    : semana.bloqueada
                    ? 'bg-gray-600/20 text-gray-400'
                    : 'bg-blue-600/20 text-blue-400'
                }`}>
                  {semana.completada ? 'Completada' : semana.bloqueada ? 'Bloqueada' : 'Disponible'}
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progreso</span>
                  <span className="text-gray-400">{Math.round(semana.porcentajeProgreso)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      semana.completada
                        ? 'bg-gradient-to-r from-green-600 to-green-400'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600'
                    }`}
                    style={{ width: `${semana.porcentajeProgreso}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-400">Ejercicios:</span>
                  <span className="ml-1">
                    {semana.ejercicios.filter(e => e.completado).length}/{semana.ejercicios.length}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Tiempo:</span>
                  <span className="ml-1">{formatearTiempo(semana.tiempoTotal)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Panel de Logros Completo */}
      {mostrarLogros && (
        <PanelLogros
          estadisticas={{
            nivel: estadisticas.nivel,
            experiencia: estadisticas.experiencia,
            experienciaSiguienteNivel: estadisticas.experienciaSiguienteNivel,
            puntosTotal: estadisticas.puntosTotal,
            semanasCompletadas: estadisticas.semanasCompletadas,
            ejerciciosCompletados: estadisticas.ejerciciosCompletados,
            tiempoTotal: estadisticas.tiempoTotal,
            rachaActual: estadisticas.rachaActual,
            mejorRacha: estadisticas.mejorRacha
          }}
          logros={logros}
        />
      )}

      {/* Panel de Configuración y Exportación */}
      {mostrarConfiguracion && mostrarExportacion && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Configuración y Datos</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Exportar */}
            <div>
              <h4 className="font-medium mb-3">Exportar Progreso</h4>
              <p className="text-sm text-gray-400 mb-3">
                Descarga tu progreso completo en formato JSON
              </p>
              <button
                onClick={handleExportar}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Exportar Datos
              </button>
            </div>

            {/* Importar */}
            <div>
              <h4 className="font-medium mb-3">Importar Progreso</h4>
              <p className="text-sm text-gray-400 mb-3">
                Restaura tu progreso desde un archivo JSON
              </p>
              <div className="space-y-2">
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => setArchivoImportar(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-800 file:text-gray-300 hover:file:bg-gray-700"
                />
                <button
                  onClick={handleImportar}
                  disabled={!archivoImportar}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 rounded-lg transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Importar Datos
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-800">
            <div className="text-sm text-gray-400">
              <p><strong>Fecha de registro:</strong> {progreso.fechaRegistro.toLocaleDateString()}</p>
              <p><strong>Última actividad:</strong> {progreso.ultimaActividad.toLocaleDateString()}</p>
              <p><strong>ID de usuario:</strong> {progreso.userId}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}