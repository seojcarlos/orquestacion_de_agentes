'use client'

import { useState, useCallback, useRef } from 'react'
import { 
  ClaudeFlowAcademia, 
  type EjercicioGenerado, 
  type EvaluacionCodigo, 
  type FeedbackPersonalizado,
  type AdaptacionDificultad,
  type ClaudeFlowTask
} from '@/lib/academia/ClaudeFlowAcademia'

interface UseClaudeFlowAcademiaReturn {
  // Estado
  loading: boolean
  error: string | null
  tasks: ClaudeFlowTask[]

  // Funciones principales
  generarEjercicio: (tema: string, semana: number, nivel: number, progreso: any[]) => Promise<EjercicioGenerado>
  evaluarCodigo: (codigo: string, ejercicioId: string, solucion: string, tests: any[]) => Promise<EvaluacionCodigo>
  generarFeedback: (userId: string, progreso: any, estadisticas: any, ejercicios: any[]) => Promise<FeedbackPersonalizado>
  adaptarDificultad: (rendimiento: number[], tiempo: number, errores: string[], semana: number) => Promise<AdaptacionDificultad>

  // Utilidades
  limpiarTasks: () => void
  obtenerTask: (taskId: string) => ClaudeFlowTask | undefined
  configurarMock: (enabled: boolean) => void
}

export function useClaudeFlowAcademia(): UseClaudeFlowAcademiaReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tasks, setTasks] = useState<ClaudeFlowTask[]>([])
  
  const claudeFlowRef = useRef<ClaudeFlowAcademia | null>(null)

  // Inicializar Claude Flow
  if (!claudeFlowRef.current) {
    claudeFlowRef.current = new ClaudeFlowAcademia(true) // Mock mode por defecto
  }

  const actualizarTasks = useCallback(() => {
    if (claudeFlowRef.current) {
      setTasks(claudeFlowRef.current.obtenerTasks())
    }
  }, [])

  const manejarError = useCallback((err: unknown, operacion: string) => {
    const mensaje = err instanceof Error ? err.message : `Error en ${operacion}`
    setError(mensaje)
    console.error(`Error en ${operacion}:`, err)
  }, [])

  const generarEjercicio = useCallback(async (
    tema: string,
    semana: number,
    nivel: number,
    progreso: any[]
  ): Promise<EjercicioGenerado> => {
    if (!claudeFlowRef.current) {
      throw new Error('Claude Flow no inicializado')
    }

    setLoading(true)
    setError(null)

    try {
      const ejercicio = await claudeFlowRef.current.generarEjercicio(tema, semana, nivel, progreso)
      actualizarTasks()
      return ejercicio
    } catch (err) {
      manejarError(err, 'generar ejercicio')
      throw err
    } finally {
      setLoading(false)
    }
  }, [actualizarTasks, manejarError])

  const evaluarCodigo = useCallback(async (
    codigo: string,
    ejercicioId: string,
    solucion: string,
    tests: any[]
  ): Promise<EvaluacionCodigo> => {
    if (!claudeFlowRef.current) {
      throw new Error('Claude Flow no inicializado')
    }

    setLoading(true)
    setError(null)

    try {
      const evaluacion = await claudeFlowRef.current.evaluarCodigo(codigo, ejercicioId, solucion, tests)
      actualizarTasks()
      return evaluacion
    } catch (err) {
      manejarError(err, 'evaluar código')
      throw err
    } finally {
      setLoading(false)
    }
  }, [actualizarTasks, manejarError])

  const generarFeedback = useCallback(async (
    userId: string,
    progreso: any,
    estadisticas: any,
    ejercicios: any[]
  ): Promise<FeedbackPersonalizado> => {
    if (!claudeFlowRef.current) {
      throw new Error('Claude Flow no inicializado')
    }

    setLoading(true)
    setError(null)

    try {
      const feedback = await claudeFlowRef.current.generarFeedbackPersonalizado(userId, progreso, estadisticas, ejercicios)
      actualizarTasks()
      return feedback
    } catch (err) {
      manejarError(err, 'generar feedback')
      throw err
    } finally {
      setLoading(false)
    }
  }, [actualizarTasks, manejarError])

  const adaptarDificultad = useCallback(async (
    rendimiento: number[],
    tiempo: number,
    errores: string[],
    semana: number
  ): Promise<AdaptacionDificultad> => {
    if (!claudeFlowRef.current) {
      throw new Error('Claude Flow no inicializado')
    }

    setLoading(true)
    setError(null)

    try {
      const adaptacion = await claudeFlowRef.current.adaptarDificultad(rendimiento, tiempo, errores, semana)
      actualizarTasks()
      return adaptacion
    } catch (err) {
      manejarError(err, 'adaptar dificultad')
      throw err
    } finally {
      setLoading(false)
    }
  }, [actualizarTasks, manejarError])

  const limpiarTasks = useCallback(() => {
    if (claudeFlowRef.current) {
      claudeFlowRef.current.limpiarTasks()
      setTasks([])
    }
  }, [])

  const obtenerTask = useCallback((taskId: string): ClaudeFlowTask | undefined => {
    if (claudeFlowRef.current) {
      return claudeFlowRef.current.obtenerTask(taskId)
    }
    return undefined
  }, [])

  const configurarMock = useCallback((enabled: boolean) => {
    if (claudeFlowRef.current) {
      claudeFlowRef.current.configurarMockMode(enabled)
    }
  }, [])

  return {
    // Estado
    loading,
    error,
    tasks,

    // Funciones principales
    generarEjercicio,
    evaluarCodigo,
    generarFeedback,
    adaptarDificultad,

    // Utilidades
    limpiarTasks,
    obtenerTask,
    configurarMock
  }
}