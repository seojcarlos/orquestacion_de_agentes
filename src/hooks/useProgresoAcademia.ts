'use client'

import { useState, useEffect, useCallback } from 'react'
import { SistemaProgreso, type ProgresoUsuario, type EstadisticasAcademia, type LogroAcademia, type ProgresoSemana } from '@/lib/academia/SistemaProgreso'

interface UseProgresoAcademiaReturn {
  // Estado
  progreso: ProgresoUsuario | null
  estadisticas: EstadisticasAcademia | null
  semanas: ProgresoSemana[]
  logros: LogroAcademia[]
  loading: boolean
  error: string | null

  // Acciones
  completarEjercicio: (semana: number, ejercicioId: string, puntuacion?: number, tiempo?: number) => Promise<LogroAcademia[]>
  reiniciarProgreso: () => void
  exportarProgreso: () => string
  importarProgreso: (data: string) => boolean
  actualizarConfiguracion: (config: Partial<ProgresoUsuario['configuracion']>) => void
  
  // Utilidades
  obtenerSemana: (numero: number) => ProgresoSemana | undefined
  esSemanaDesbloqueada: (numero: number) => boolean
  obtenerNivelActual: () => number
  obtenerPorcentajeProgreso: () => number
  obtenerLogrosRecientes: (dias?: number) => LogroAcademia[]
}

export function useProgresoAcademia(userId?: string): UseProgresoAcademiaReturn {
  const [sistema, setSistema] = useState<SistemaProgreso | null>(null)
  const [progreso, setProgreso] = useState<ProgresoUsuario | null>(null)
  const [estadisticas, setEstadisticas] = useState<EstadisticasAcademia | null>(null)
  const [semanas, setSemanas] = useState<ProgresoSemana[]>([])
  const [logros, setLogros] = useState<LogroAcademia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Inicializar sistema
  useEffect(() => {
    try {
      const nuevoSistema = new SistemaProgreso(userId)
      setSistema(nuevoSistema)
      actualizarDatos(nuevoSistema)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inicializando sistema')
      setLoading(false)
    }
  }, [userId])

  const actualizarDatos = useCallback((sistemaActual: SistemaProgreso) => {
    try {
      const progresoActual = sistemaActual.obtenerProgreso()
      const estadisticasActuales = sistemaActual.obtenerEstadisticas()
      const logrosActuales = sistemaActual.obtenerLogros()

      setProgreso(progresoActual)
      setEstadisticas(estadisticasActuales)
      setSemanas(progresoActual.semanas)
      setLogros(logrosActuales)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error actualizando datos')
    } finally {
      setLoading(false)
    }
  }, [])

  const completarEjercicio = useCallback(async (
    semana: number, 
    ejercicioId: string, 
    puntuacion: number = 100, 
    tiempo: number = 0
  ): Promise<LogroAcademia[]> => {
    if (!sistema) {
      throw new Error('Sistema no inicializado')
    }

    try {
      const resultado = sistema.completarEjercicio(semana, ejercicioId, puntuacion, tiempo)
      actualizarDatos(sistema)
      
      // Simular notificación de logros desbloqueados
      if (resultado.logrosDesbloqueados.length > 0) {
        console.log('🏆 Logros desbloqueados:', resultado.logrosDesbloqueados)
      }
      
      return resultado.logrosDesbloqueados
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error completando ejercicio'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [sistema, actualizarDatos])

  const reiniciarProgreso = useCallback(() => {
    if (!sistema) return

    try {
      sistema.reiniciarProgreso()
      actualizarDatos(sistema)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error reiniciando progreso')
    }
  }, [sistema, actualizarDatos])

  const exportarProgreso = useCallback((): string => {
    if (!sistema) {
      throw new Error('Sistema no inicializado')
    }

    try {
      return sistema.exportarProgreso()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error exportando progreso'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }, [sistema])

  const importarProgreso = useCallback((data: string): boolean => {
    if (!sistema) {
      setError('Sistema no inicializado')
      return false
    }

    try {
      const resultado = sistema.importarProgreso(data)
      if (resultado) {
        actualizarDatos(sistema)
      } else {
        setError('Formato de datos inválido')
      }
      return resultado
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error importando progreso'
      setError(errorMessage)
      return false
    }
  }, [sistema, actualizarDatos])

  const actualizarConfiguracion = useCallback((config: Partial<ProgresoUsuario['configuracion']>) => {
    if (!sistema) return

    try {
      sistema.actualizarConfiguracion(config)
      actualizarDatos(sistema)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error actualizando configuración')
    }
  }, [sistema, actualizarDatos])

  const obtenerSemana = useCallback((numero: number): ProgresoSemana | undefined => {
    return semanas.find(s => s.numero === numero)
  }, [semanas])

  const esSemanaDesbloqueada = useCallback((numero: number): boolean => {
    const semana = obtenerSemana(numero)
    return semana ? !semana.bloqueada : false
  }, [obtenerSemana])

  const obtenerNivelActual = useCallback((): number => {
    return estadisticas?.nivel || 1
  }, [estadisticas])

  const obtenerPorcentajeProgreso = useCallback((): number => {
    if (!semanas.length) return 0

    const totalEjercicios = semanas.reduce((acc, semana) => acc + semana.ejercicios.length, 0)
    const ejerciciosCompletados = semanas.reduce(
      (acc, semana) => acc + semana.ejercicios.filter(e => e.completado).length, 
      0
    )

    return totalEjercicios > 0 ? (ejerciciosCompletados / totalEjercicios) * 100 : 0
  }, [semanas])

  const obtenerLogrosRecientes = useCallback((dias: number = 7): LogroAcademia[] => {
    const fechaLimite = new Date()
    fechaLimite.setDate(fechaLimite.getDate() - dias)

    return logros.filter(logro => 
      logro.desbloqueado && 
      logro.fechaDesbloqueo && 
      logro.fechaDesbloqueo >= fechaLimite
    ).sort((a, b) => 
      (b.fechaDesbloqueo?.getTime() || 0) - (a.fechaDesbloqueo?.getTime() || 0)
    )
  }, [logros])

  return {
    // Estado
    progreso,
    estadisticas,
    semanas,
    logros,
    loading,
    error,

    // Acciones
    completarEjercicio,
    reiniciarProgreso,
    exportarProgreso,
    importarProgreso,
    actualizarConfiguracion,

    // Utilidades
    obtenerSemana,
    esSemanaDesbloqueada,
    obtenerNivelActual,
    obtenerPorcentajeProgreso,
    obtenerLogrosRecientes
  }
}