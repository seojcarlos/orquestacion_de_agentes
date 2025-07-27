'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Clock, Star, Trophy, Target, TrendingUp } from 'lucide-react'

interface EjercicioProgreso {
  id: string
  titulo: string
  completado: boolean
  puntuacion?: number
  tiempo?: number
}

interface ProgresoSemanaData {
  semana: number
  ejercicios: EjercicioProgreso[]
  tiempoTotal: number
  puntuacionPromedio: number
  objetivosCompletados: number
  totalObjetivos: number
}

interface Props {
  semana: number
  ejercicios: EjercicioProgreso[]
  objetivos?: string[]
  onProgresoChange?: (progreso: ProgresoSemanaData) => void
}

export default function ProgresoSemana({ semana, ejercicios, objetivos = [], onProgresoChange }: Props) {
  const [progreso, setProgreso] = useState<ProgresoSemanaData>({
    semana,
    ejercicios,
    tiempoTotal: 0,
    puntuacionPromedio: 0,
    objetivosCompletados: 0,
    totalObjetivos: objetivos.length
  })

  // Calcular progreso cada vez que cambien los ejercicios
  useEffect(() => {
    const ejerciciosCompletados = ejercicios.filter(e => e.completado)
    const tiempoTotal = ejercicios.reduce((acc, e) => acc + (e.tiempo || 0), 0)
    const puntuaciones = ejercicios.filter(e => e.puntuacion !== undefined).map(e => e.puntuacion!)
    const puntuacionPromedio = puntuaciones.length > 0 
      ? puntuaciones.reduce((acc, p) => acc + p, 0) / puntuaciones.length 
      : 0

    const nuevoProgreso: ProgresoSemanaData = {
      semana,
      ejercicios,
      tiempoTotal,
      puntuacionPromedio,
      objetivosCompletados: ejerciciosCompletados.length,
      totalObjetivos: ejercicios.length
    }

    setProgreso(nuevoProgreso)
    
    if (onProgresoChange) {
      onProgresoChange(nuevoProgreso)
    }
  }, [ejercicios, semana, onProgresoChange])

  const porcentajeCompletado = progreso.totalObjetivos > 0 
    ? Math.round((progreso.objetivosCompletados / progreso.totalObjetivos) * 100)
    : 0

  const getNivelProgreso = (porcentaje: number) => {
    if (porcentaje === 100) return { nivel: 'Completado', color: 'green', icon: Trophy }
    if (porcentaje >= 75) return { nivel: 'Casi Listo', color: 'blue', icon: Target }
    if (porcentaje >= 50) return { nivel: 'En Progreso', color: 'yellow', icon: TrendingUp }
    if (porcentaje >= 25) return { nivel: 'Iniciado', color: 'purple', icon: Clock }
    return { nivel: 'Pendiente', color: 'gray', icon: Clock }
  }

  const nivelProgreso = getNivelProgreso(porcentajeCompletado)
  const IconoNivel = nivelProgreso.icon

  const formatearTiempo = (minutos: number) => {
    const horas = Math.floor(minutos / 60)
    const mins = minutos % 60
    if (horas > 0) {
      return `${horas}h ${mins}m`
    }
    return `${mins}m`
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green': return 'text-green-400 bg-green-900/20 border-green-800'
      case 'blue': return 'text-blue-400 bg-blue-900/20 border-blue-800'
      case 'yellow': return 'text-yellow-400 bg-yellow-900/20 border-yellow-800'
      case 'purple': return 'text-purple-400 bg-purple-900/20 border-purple-800'
      default: return 'text-gray-400 bg-gray-900/20 border-gray-800'
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <IconoNivel className={`w-6 h-6 text-${nivelProgreso.color}-400`} />
          <div>
            <h3 className="text-lg font-semibold">Progreso Semana {semana}</h3>
            <p className="text-sm text-gray-400">{nivelProgreso.nivel}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getColorClasses(nivelProgreso.color)}`}>
          {porcentajeCompletado}%
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
          <div 
            className={`h-3 rounded-full transition-all duration-500 bg-gradient-to-r ${
              nivelProgreso.color === 'green' ? 'from-green-600 to-green-400' :
              nivelProgreso.color === 'blue' ? 'from-blue-600 to-blue-400' :
              nivelProgreso.color === 'yellow' ? 'from-yellow-600 to-yellow-400' :
              nivelProgreso.color === 'purple' ? 'from-purple-600 to-purple-400' :
              'from-gray-600 to-gray-400'
            }`}
            style={{ width: `${porcentajeCompletado}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{progreso.objetivosCompletados} de {progreso.totalObjetivos} ejercicios</span>
          <span>{porcentajeCompletado}% completado</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <CheckCircle className="w-5 h-5 text-green-400 mx-auto mb-1" />
          <div className="text-sm font-medium">{progreso.objetivosCompletados}</div>
          <div className="text-xs text-gray-400">Completados</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <Clock className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <div className="text-sm font-medium">{formatearTiempo(progreso.tiempoTotal)}</div>
          <div className="text-xs text-gray-400">Tiempo</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
          <div className="text-sm font-medium">{Math.round(progreso.puntuacionPromedio)}%</div>
          <div className="text-xs text-gray-400">Puntuación</div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <Target className="w-5 h-5 text-purple-400 mx-auto mb-1" />
          <div className="text-sm font-medium">{Math.round(porcentajeCompletado)}%</div>
          <div className="text-xs text-gray-400">Progreso</div>
        </div>
      </div>

      {/* Ejercicios List */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Detalle de Ejercicios:</h4>
        {ejercicios.map((ejercicio) => (
          <div
            key={ejercicio.id}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
              ejercicio.completado
                ? 'bg-green-900/20 border border-green-800/30'
                : 'bg-gray-800/30 border border-gray-700/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <CheckCircle 
                className={`w-4 h-4 ${
                  ejercicio.completado ? 'text-green-500' : 'text-gray-600'
                }`} 
              />
              <span className={`text-sm ${
                ejercicio.completado ? 'text-green-100' : 'text-gray-400'
              }`}>
                {ejercicio.titulo}
              </span>
            </div>
            
            <div className="flex items-center gap-3 text-xs">
              {ejercicio.tiempo && (
                <span className="text-gray-500">{formatearTiempo(ejercicio.tiempo)}</span>
              )}
              {ejercicio.puntuacion !== undefined && (
                <span className={`px-2 py-1 rounded ${
                  ejercicio.puntuacion >= 80 ? 'bg-green-900/30 text-green-400' :
                  ejercicio.puntuacion >= 60 ? 'bg-yellow-900/30 text-yellow-400' :
                  'bg-red-900/30 text-red-400'
                }`}>
                  {ejercicio.puntuacion}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Motivational Message */}
      {porcentajeCompletado === 100 && (
        <div className="mt-4 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-800/30 rounded-lg text-center">
          <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <p className="text-green-400 font-semibold">¡Semana Completada!</p>
          <p className="text-sm text-gray-300 mt-1">
            Excelente trabajo. Estás listo para la siguiente semana.
          </p>
        </div>
      )}

      {porcentajeCompletado >= 50 && porcentajeCompletado < 100 && (
        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-800/30 rounded-lg text-center">
          <p className="text-blue-400 text-sm font-medium">¡Vas muy bien!</p>
          <p className="text-xs text-gray-400 mt-1">
            Ya has completado más de la mitad. ¡Sigue así!
          </p>
        </div>
      )}
    </div>
  )
}