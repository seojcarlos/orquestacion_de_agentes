'use client'

import { useState, useEffect } from 'react'
import { Play, CheckCircle, Circle, Code, Eye, EyeOff, Lightbulb, Target, Clock, Star, Brain } from 'lucide-react'
import { useClaudeFlowAcademia } from '@/hooks/useClaudeFlowAcademia'

interface EjercicioData {
  id: string
  titulo: string
  descripcion: string
  tipo: 'codigo' | 'concepto' | 'practica'
  dificultad: 'facil' | 'medio' | 'dificil'
  tiempoEstimado: number
  puntos: number
  codigoBase?: string
  solucionEsperada?: string
  tests?: Array<{
    input: string
    expectedOutput: string
    descripcion: string
  }>
  pistas?: string[]
  recursos?: Array<{
    titulo: string
    url: string
    tipo: 'documentacion' | 'ejemplo' | 'video'
  }>
}

interface Props {
  ejercicio: EjercicioData
  onCompletado?: (puntuacion: number, tiempo: number) => void
  onProgreso?: (porcentaje: number) => void
  usarClaudeFlow?: boolean
}

export default function EjercicioInteractivo({ ejercicio, onCompletado, onProgreso, usarClaudeFlow = false }: Props) {
  const [codigo, setCodigo] = useState(ejercicio.codigoBase || '')
  const [mostrarSolucion, setMostrarSolucion] = useState(false)
  const [mostrarPistas, setMostrarPistas] = useState(false)
  const [completado, setCompletado] = useState(false)
  const [puntuacion, setPuntuacion] = useState(0)
  const [testResults, setTestResults] = useState<Array<{ passed: boolean, output: string }>>([])
  const [tiempoInicio] = useState(Date.now())
  const [intentos, setIntentos] = useState(0)
  const [progreso, setProgreso] = useState(0)
  const [evaluacionClaudeFlow, setEvaluacionClaudeFlow] = useState<any>(null)

  const { evaluarCodigo: evaluarConClaudeFlow, loading: claudeFlowLoading } = useClaudeFlowAcademia()

  // Evaluación de código con Claude Flow o simulación
  const evaluarCodigo = async () => {
    setIntentos(prev => prev + 1)

    if (usarClaudeFlow && ejercicio.solucionEsperada && ejercicio.tests) {
      try {
        const evaluacion = await evaluarConClaudeFlow(
          codigo,
          ejercicio.id,
          ejercicio.solucionEsperada,
          ejercicio.tests
        )
        
        setEvaluacionClaudeFlow(evaluacion)
        setPuntuacion(evaluacion.puntuacion)
        setProgreso(evaluacion.puntuacion)
        
        if (evaluacion.puntuacion >= 70) {
          setCompletado(true)
          const tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000 / 60)
          if (onCompletado) {
            onCompletado(evaluacion.puntuacion, tiempoTranscurrido)
          }
        }

        if (onProgreso) {
          onProgreso(evaluacion.puntuacion)
        }

        return
      } catch (error) {
        console.error('Error evaluando con Claude Flow:', error)
        // Continuar con evaluación mock si falla Claude Flow
      }
    }

    // Evaluación mock (código original)
    
    if (!ejercicio.tests) {
      // Para ejercicios conceptuales, marcar como completado
      const puntuacionFinal = 100
      const tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000 / 60)
      
      setCompletado(true)
      setPuntuacion(puntuacionFinal)
      
      if (onCompletado) {
        onCompletado(puntuacionFinal, tiempoTranscurrido)
      }
      return
    }

    // Simular ejecución de tests
    const resultados = ejercicio.tests.map((test, index) => {
      // Simulación simple: verificar si el código contiene palabras clave esperadas
      const codigoLower = codigo.toLowerCase()
      const outputEsperado = test.expectedOutput.toLowerCase()
      
      // Lógica de evaluación simple (en producción sería más sofisticada)
      let passed = false
      if (ejercicio.tipo === 'codigo') {
        // Verificar elementos básicos del código
        if (test.input.includes('función') || test.input.includes('function')) {
          passed = codigoLower.includes('function') || codigoLower.includes('=>')
        } else if (test.input.includes('clase') || test.input.includes('class')) {
          passed = codigoLower.includes('class')
        } else if (test.input.includes('variable')) {
          passed = codigoLower.includes('let') || codigoLower.includes('const') || codigoLower.includes('var')
        } else {
          // Test genérico: verificar si contiene palabras clave
          const palabrasEsperadas = outputEsperado.split(' ').filter(p => p.length > 2)
          passed = palabrasEsperadas.some(palabra => codigoLower.includes(palabra))
        }
      }

      return {
        passed,
        output: passed ? test.expectedOutput : `Error: no se encontró la implementación esperada`
      }
    })

    setTestResults(resultados)

    // Calcular puntuación
    const testsPasados = resultados.filter(r => r.passed).length
    const porcentajePasados = (testsPasados / resultados.length) * 100
    
    // Penalizar por intentos múltiples
    const penalizacionIntentos = Math.max(0, (intentos - 1) * 10)
    const puntuacionFinal = Math.max(0, porcentajePasados - penalizacionIntentos)
    
    setPuntuacion(puntuacionFinal)
    setProgreso(porcentajePasados)

    if (onProgreso) {
      onProgreso(porcentajePasados)
    }

    // Marcar como completado si pasa todos los tests
    if (testsPasados === resultados.length) {
      setCompletado(true)
      const tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000 / 60)
      
      if (onCompletado) {
        onCompletado(puntuacionFinal, tiempoTranscurrido)
      }
    }
  }

  const getDificultadColor = (dificultad: string) => {
    switch (dificultad) {
      case 'facil': return 'text-green-400 bg-green-900/20 border-green-800'
      case 'medio': return 'text-yellow-400 bg-yellow-900/20 border-yellow-800'
      case 'dificil': return 'text-red-400 bg-red-900/20 border-red-800'
      default: return 'text-gray-400 bg-gray-900/20 border-gray-800'
    }
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'codigo': return <Code className="w-5 h-5 text-blue-400" />
      case 'concepto': return <Lightbulb className="w-5 h-5 text-purple-400" />
      case 'practica': return <Target className="w-5 h-5 text-green-400" />
      default: return <Circle className="w-5 h-5" />
    }
  }

  const formatearTiempo = (minutos: number) => {
    return `${minutos} min`
  }

  return (
    <div className={`bg-gray-900 border rounded-xl p-6 transition-all ${
      completado 
        ? 'border-green-600/30 bg-green-900/10' 
        : 'border-gray-800 hover:border-gray-700'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getTipoIcon(ejercicio.tipo)}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {ejercicio.titulo}
              {completado && <CheckCircle className="w-5 h-5 text-green-500" />}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <span className={`text-xs px-2 py-1 rounded border ${getDificultadColor(ejercicio.dificultad)}`}>
                {ejercicio.dificultad}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                {formatearTiempo(ejercicio.tiempoEstimado)}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Star className="w-3 h-3" />
                {ejercicio.puntos} pts
              </div>
            </div>
          </div>
        </div>
        
        {completado && (
          <div className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium border border-green-600/30">
            {Math.round(puntuacion)}% - {Math.round(puntuacion * ejercicio.puntos / 100)} pts
          </div>
        )}
      </div>

      {/* Descripción */}
      <p className="text-gray-400 mb-4">{ejercicio.descripcion}</p>

      {/* Progreso */}
      {progreso > 0 && !completado && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Progreso</span>
            <span className="text-gray-400">{Math.round(progreso)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>
      )}

      {/* Editor de Código */}
      {ejercicio.tipo === 'codigo' && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Tu Código:</label>
          <textarea
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="w-full h-40 px-3 py-2 bg-gray-950 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm text-gray-100"
            placeholder="Escribe tu código aquí..."
          />
        </div>
      )}

      {/* Claude Flow Evaluation Results */}
      {evaluacionClaudeFlow && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-400" />
            Evaluación de Claude Flow:
          </h4>
          <div className="bg-purple-900/20 border border-purple-800/30 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <span className="text-sm text-gray-400">Puntuación:</span>
                <span className="ml-2 font-bold text-purple-400">{evaluacionClaudeFlow.puntuacion}%</span>
              </div>
              <div>
                <span className="text-sm text-gray-400">Tests:</span>
                <span className="ml-2 font-bold text-blue-400">
                  {evaluacionClaudeFlow.tests_pasados}/{evaluacionClaudeFlow.tests_totales}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-purple-100 mb-3">{evaluacionClaudeFlow.explicacion}</p>
            
            {evaluacionClaudeFlow.errores.length > 0 && (
              <div className="mb-3">
                <h5 className="text-xs font-medium text-red-400 mb-1">Errores encontrados:</h5>
                <ul className="text-xs text-red-300 space-y-1">
                  {evaluacionClaudeFlow.errores.map((error: string, index: number) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {evaluacionClaudeFlow.sugerencias.length > 0 && (
              <div>
                <h5 className="text-xs font-medium text-yellow-400 mb-1">Sugerencias:</h5>
                <ul className="text-xs text-yellow-300 space-y-1">
                  {evaluacionClaudeFlow.sugerencias.map((sugerencia: string, index: number) => (
                    <li key={index}>• {sugerencia}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tests Results (Mock) */}
      {testResults.length > 0 && !evaluacionClaudeFlow && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Resultados de Tests:</h4>
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  result.passed
                    ? 'bg-green-900/20 border-green-800/30 text-green-100'
                    : 'bg-red-900/20 border-red-800/30 text-red-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  {result.passed ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Circle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-sm">Test {index + 1}</span>
                </div>
                <p className="text-xs mt-1 text-gray-300">{result.output}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pistas */}
      {ejercicio.pistas && ejercicio.pistas.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => setMostrarPistas(!mostrarPistas)}
            className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            {mostrarPistas ? 'Ocultar' : 'Mostrar'} Pistas ({ejercicio.pistas.length})
          </button>
          
          {mostrarPistas && (
            <div className="mt-2 space-y-2">
              {ejercicio.pistas.map((pista, index) => (
                <div key={index} className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-3">
                  <p className="text-sm text-yellow-100">💡 {pista}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Solución */}
      {ejercicio.solucionEsperada && (
        <div className="mb-4">
          <button
            onClick={() => setMostrarSolucion(!mostrarSolucion)}
            className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            {mostrarSolucion ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {mostrarSolucion ? 'Ocultar' : 'Ver'} Solución
          </button>
          
          {mostrarSolucion && (
            <div className="mt-2 bg-purple-900/20 border border-purple-800/30 rounded-lg p-4">
              <h5 className="text-sm font-medium text-purple-400 mb-2">Solución:</h5>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{ejercicio.solucionEsperada}</code>
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Recursos */}
      {ejercicio.recursos && ejercicio.recursos.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Recursos Útiles:</h4>
          <div className="space-y-1">
            {ejercicio.recursos.map((recurso, index) => (
              <a
                key={index}
                href={recurso.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                📎 {recurso.titulo} ({recurso.tipo})
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {intentos > 0 && `Intentos: ${intentos}`}
        </div>
        
        <button
          onClick={evaluarCodigo}
          disabled={completado || claudeFlowLoading || (ejercicio.tipo === 'codigo' && !codigo.trim())}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
            completado
              ? 'bg-green-600 text-white cursor-default'
              : claudeFlowLoading
              ? 'bg-purple-400 text-white cursor-wait'
              : 'bg-purple-600 hover:bg-purple-700 text-white disabled:bg-gray-700 disabled:text-gray-400'
          }`}
        >
          {completado ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Completado
            </>
          ) : claudeFlowLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              {usarClaudeFlow ? 'Evaluando con IA...' : 'Evaluando...'}
            </>
          ) : (
            <>
              {usarClaudeFlow && <Brain className="w-4 h-4" />}
              {!usarClaudeFlow && <Play className="w-4 h-4" />}
              {intentos === 0 ? (usarClaudeFlow ? 'Evaluar con IA' : 'Evaluar') : 'Reintentar'}
            </>
          )}
        </button>
      </div>
    </div>
  )
}