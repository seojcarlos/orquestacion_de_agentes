'use client'

import { useState, useEffect } from 'react'
import { Trophy, Star, Zap, Target, Brain, Code, Users, Clock, Award, Lock } from 'lucide-react'

interface Logro {
  id: string
  titulo: string
  descripcion: string
  icono: string
  categoria: 'progreso' | 'habilidad' | 'tiempo' | 'social' | 'especial'
  puntos: number
  desbloqueado: boolean
  fechaDesbloqueo?: Date
  progreso?: number
  maxProgreso?: number
  requisitos?: string[]
  rareza: 'comun' | 'poco_comun' | 'raro' | 'epico' | 'legendario'
}

interface EstadisticasUsuario {
  puntosTotal: number
  nivel: number
  experiencia: number
  experienciaSiguienteNivel: number
  semanasCompletadas: number
  ejerciciosCompletados: number
  tiempoTotal: number
  rachaActual: number
  mejorRacha: number
}

interface Props {
  estadisticas: EstadisticasUsuario
  logros: Logro[]
  onLogroDesbloqueado?: (logro: Logro) => void
}

export default function PanelLogros({ estadisticas, logros, onLogroDesbloqueado }: Props) {
  const [logrosFiltrados, setLogrosFiltradas] = useState<Logro[]>(logros)
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos')
  const [mostrarSoloDesbloqueados, setMostrarSoloDesbloqueados] = useState(false)
  const [logroReciente, setLogroReciente] = useState<Logro | null>(null)

  const categorias = [
    { id: 'todos', nombre: 'Todos', icono: Award },
    { id: 'progreso', nombre: 'Progreso', icono: Target },
    { id: 'habilidad', nombre: 'Habilidades', icono: Brain },
    { id: 'tiempo', nombre: 'Tiempo', icono: Clock },
    { id: 'social', nombre: 'Social', icono: Users },
    { id: 'especial', nombre: 'Especiales', icono: Star }
  ]

  // Filtrar logros
  useEffect(() => {
    let filtrados = logros

    if (filtroCategoria !== 'todos') {
      filtrados = filtrados.filter(logro => logro.categoria === filtroCategoria)
    }

    if (mostrarSoloDesbloqueados) {
      filtrados = filtrados.filter(logro => logro.desbloqueado)
    }

    setLogrosFiltradas(filtrados)
  }, [logros, filtroCategoria, mostrarSoloDesbloqueados])

  // Detectar nuevos logros desbloqueados
  useEffect(() => {
    const logrosRecientementeDesbloqueados = logros.filter(logro => 
      logro.desbloqueado && 
      logro.fechaDesbloqueo && 
      Date.now() - logro.fechaDesbloqueo.getTime() < 5000 // Últimos 5 segundos
    )

    if (logrosRecientementeDesbloqueados.length > 0) {
      const logro = logrosRecientementeDesbloqueados[0]
      setLogroReciente(logro)
      
      if (onLogroDesbloqueado) {
        onLogroDesbloqueado(logro)
      }

      // Ocultar después de 3 segundos
      setTimeout(() => setLogroReciente(null), 3000)
    }
  }, [logros, onLogroDesbloqueado])

  const getRarezaColor = (rareza: string) => {
    switch (rareza) {
      case 'comun': return 'text-gray-400 border-gray-600'
      case 'poco_comun': return 'text-green-400 border-green-600'
      case 'raro': return 'text-blue-400 border-blue-600'
      case 'epico': return 'text-purple-400 border-purple-600'
      case 'legendario': return 'text-yellow-400 border-yellow-600'
      default: return 'text-gray-400 border-gray-600'
    }
  }

  const getLogroIcon = (icono: string, desbloqueado: boolean) => {
    const iconClass = `w-6 h-6 ${desbloqueado ? 'text-yellow-400' : 'text-gray-600'}`
    
    switch (icono) {
      case 'trophy': return <Trophy className={iconClass} />
      case 'star': return <Star className={iconClass} />
      case 'zap': return <Zap className={iconClass} />
      case 'target': return <Target className={iconClass} />
      case 'brain': return <Brain className={iconClass} />
      case 'code': return <Code className={iconClass} />
      case 'users': return <Users className={iconClass} />
      case 'clock': return <Clock className={iconClass} />
      default: return <Award className={iconClass} />
    }
  }

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
      {/* Notificación de Logro Reciente */}
      {logroReciente && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-600 to-orange-600 border-2 border-yellow-400 rounded-xl p-4 shadow-2xl animate-bounce">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-100" />
            <div>
              <h4 className="font-bold text-yellow-100">¡Logro Desbloqueado!</h4>
              <p className="text-yellow-200 text-sm">{logroReciente.titulo}</p>
              <p className="text-yellow-300 text-xs">+{logroReciente.puntos} puntos</p>
            </div>
          </div>
        </div>
      )}

      {/* Panel de Estadísticas */}
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-800/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Nivel {estadisticas.nivel}</h3>
            <p className="text-gray-400">{estadisticas.puntosTotal} puntos totales</p>
          </div>
        </div>

        {/* Barra de Experiencia */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Experiencia</span>
            <span className="text-gray-400">
              {estadisticas.experiencia} / {estadisticas.experienciaSiguienteNivel}
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${calcularPorcentajeNivel()}%` }}
            />
          </div>
        </div>

        {/* Grid de Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900/50 rounded-lg p-3 text-center">
            <Target className="w-5 h-5 text-green-400 mx-auto mb-1" />
            <div className="text-lg font-bold">{estadisticas.semanasCompletadas}</div>
            <div className="text-xs text-gray-400">Semanas</div>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-3 text-center">
            <Code className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <div className="text-lg font-bold">{estadisticas.ejerciciosCompletados}</div>
            <div className="text-xs text-gray-400">Ejercicios</div>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-3 text-center">
            <Clock className="w-5 h-5 text-purple-400 mx-auto mb-1" />
            <div className="text-lg font-bold">{formatearTiempo(estadisticas.tiempoTotal)}</div>
            <div className="text-xs text-gray-400">Tiempo</div>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-3 text-center">
            <Zap className="w-5 h-5 text-orange-400 mx-auto mb-1" />
            <div className="text-lg font-bold">{estadisticas.rachaActual}</div>
            <div className="text-xs text-gray-400">Racha Actual</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Categoría:</span>
            <div className="flex gap-1">
              {categorias.map((categoria) => {
                const Icon = categoria.icono
                return (
                  <button
                    key={categoria.id}
                    onClick={() => setFiltroCategoria(categoria.id)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors flex items-center gap-1 ${
                      filtroCategoria === categoria.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {categoria.nombre}
                  </button>
                )
              })}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="soloDesbloqueados"
              checked={mostrarSoloDesbloqueados}
              onChange={(e) => setMostrarSoloDesbloqueados(e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-700 rounded focus:ring-purple-500"
            />
            <label htmlFor="soloDesbloqueados" className="text-sm">Solo desbloqueados</label>
          </div>
        </div>
      </div>

      {/* Grid de Logros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {logrosFiltradas.map((logro) => (
          <div
            key={logro.id}
            className={`relative bg-gray-900 border rounded-xl p-4 transition-all ${
              logro.desbloqueado
                ? `${getRarezaColor(logro.rareza)} shadow-lg`
                : 'border-gray-800 opacity-60'
            }`}
          >
            {/* Icono de Bloqueo */}
            {!logro.desbloqueado && (
              <div className="absolute top-2 right-2">
                <Lock className="w-4 h-4 text-gray-600" />
              </div>
            )}

            {/* Rareza Badge */}
            <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${getRarezaColor(logro.rareza)}`}>
              {logro.rareza.replace('_', ' ')}
            </div>

            {/* Contenido del Logro */}
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-3">
                {getLogroIcon(logro.icono, logro.desbloqueado)}
                <div>
                  <h4 className={`font-semibold ${logro.desbloqueado ? 'text-white' : 'text-gray-500'}`}>
                    {logro.titulo}
                  </h4>
                  <p className={`text-xs ${logro.desbloqueado ? 'text-gray-300' : 'text-gray-600'}`}>
                    {logro.puntos} puntos
                  </p>
                </div>
              </div>

              <p className={`text-sm mb-3 ${logro.desbloqueado ? 'text-gray-400' : 'text-gray-600'}`}>
                {logro.descripcion}
              </p>

              {/* Progreso */}
              {logro.progreso !== undefined && logro.maxProgreso !== undefined && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Progreso</span>
                    <span className="text-gray-500">{logro.progreso} / {logro.maxProgreso}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        logro.desbloqueado 
                          ? 'bg-gradient-to-r from-green-600 to-green-400' 
                          : 'bg-gradient-to-r from-gray-600 to-gray-500'
                      }`}
                      style={{ width: `${(logro.progreso / logro.maxProgreso) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Requisitos */}
              {logro.requisitos && !logro.desbloqueado && (
                <div className="text-xs text-gray-600">
                  <p className="font-medium mb-1">Requisitos:</p>
                  <ul className="space-y-1">
                    {logro.requisitos.map((requisito, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span>•</span>
                        <span>{requisito}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Fecha de Desbloqueo */}
              {logro.desbloqueado && logro.fechaDesbloqueo && (
                <div className="text-xs text-green-400 mt-2">
                  Desbloqueado: {logro.fechaDesbloqueo.toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Estadísticas de Logros */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
        <h4 className="font-semibold mb-3">Resumen de Logros</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Total:</span>
            <span className="ml-2 font-medium">{logros.length}</span>
          </div>
          <div>
            <span className="text-gray-400">Desbloqueados:</span>
            <span className="ml-2 font-medium text-green-400">
              {logros.filter(l => l.desbloqueado).length}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Progreso:</span>
            <span className="ml-2 font-medium">
              {Math.round((logros.filter(l => l.desbloqueado).length / logros.length) * 100)}%
            </span>
          </div>
          <div>
            <span className="text-gray-400">Puntos:</span>
            <span className="ml-2 font-medium text-yellow-400">
              {logros.filter(l => l.desbloqueado).reduce((acc, l) => acc + l.puntos, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}