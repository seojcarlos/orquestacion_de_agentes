'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, CheckCircle, Circle, Code, FileCode, Terminal, Clock, Brain, Star, Beaker, Calendar } from 'lucide-react'
import ChatAgenteBasico from '@/components/academia/ChatAgenteBasico'

interface Ejercicio {
  id: string
  titulo: string
  descripcion: string
  codigo?: string
  solucion?: string
  tipo: 'concepto' | 'practica' | 'proyecto'
  dificultad: 'facil' | 'medio' | 'dificil'
  tiempo: number
  completado: boolean
}

export default function Semana1Page() {
  const [progreso, setProgreso] = useState(0)
  const [ejerciciosCompletados, setEjerciciosCompletados] = useState<Set<string>>(new Set())

  const ejercicios: Ejercicio[] = [
    // TAREA F1-M1-S1: Configuración del Entorno y Fundamentos
    {
      id: 'f1-m1-s1-d1',
      titulo: 'Día 1: Setup inicial + Clean Code',
      descripcion: 'Establecer el entorno de desarrollo y comprender los principios fundamentales de Clean Code para agentes IA.',
      tipo: 'concepto',
      dificultad: 'facil',
      tiempo: 25,
      completado: false
    },
    {
      id: 'f1-m1-s1-d2',
      titulo: 'Día 2: Estructura de directorios + Git',
      descripcion: 'Organizar el proyecto con una estructura profesional y configurar Git para control de versiones.',
      tipo: 'practica',
      dificultad: 'facil',
      tiempo: 30,
      completado: false
    },
    {
      id: 'f1-m1-s1-d3',
      titulo: 'Día 3: task.schema.json + Validación',
      descripcion: 'Crear esquemas JSON para validar datos y establecer contratos claros entre componentes.',
      codigo: `// task.schema.json - Esquema base para tareas
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9-]+$"
    },
    "type": {
      "type": "string",
      "enum": ["text", "code", "analysis", "creative"]
    },
    "input": {
      "type": "string",
      "minLength": 1
    },
    "status": {
      "type": "string",
      "enum": ["pending", "processing", "completed", "failed"]
    },
    "priority": {
      "type": "integer",
      "minimum": 1,
      "maximum": 5
    },
    "timestamp": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": ["id", "type", "input", "status"]
}

// Validador JavaScript
class TaskValidator {
  static validate(task) {
    // Implementa la validación del schema
    const errors = [];
    
    if (!task.id || typeof task.id !== 'string') {
      errors.push('ID es requerido y debe ser string');
    }
    
    if (!['text', 'code', 'analysis', 'creative'].includes(task.type)) {
      errors.push('Tipo de tarea inválido');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}`,
      tipo: 'practica',
      dificultad: 'medio',
      tiempo: 40,
      completado: false
    },
    {
      id: 'f1-m1-s1-d4',
      titulo: 'Día 4: Tests básicos con Jest',
      descripcion: 'Implementar testing automatizado y crear el primer agente mock para desarrollo.',
      codigo: `// tests/agente-basico.test.js
const AgenteBasico = require('../src/lib/agents/AgenteBasico');

describe('AgenteBasico', () => {
  let agente;
  
  beforeEach(() => {
    agente = new AgenteBasico();
  });
  
  test('debe procesar entrada básica', () => {
    const resultado = agente.procesar('Hola');
    expect(resultado).toBeDefined();
    expect(typeof resultado).toBe('string');
  });
  
  test('debe recordar conversaciones', () => {
    agente.procesar('Mi nombre es Juan');
    const memoria = agente.obtenerMemoria();
    expect(memoria.length).toBe(1);
  });
  
  test('debe validar entrada', () => {
    expect(() => agente.procesar('')).toThrow('Entrada vacía');
  });
});

// Agente Mock para desarrollo rápido
class MockAgent {
  constructor() {
    this.responses = {
      'hola': '¡Hola! Soy un agente mock.',
      'test': 'Test ejecutado correctamente.',
      'default': 'Respuesta mock por defecto.'
    };
  }
  
  procesar(input) {
    const key = input.toLowerCase();
    return this.responses[key] || this.responses['default'];
  }
}`,
      tipo: 'practica',
      dificultad: 'medio',
      tiempo: 50,
      completado: false
    },
    {
      id: 'f1-m1-s1-d5',
      titulo: 'Día 5: Integración y JSDoc',
      descripcion: 'Documentar el código con JSDoc y crear la integración inicial de todos los componentes.',
      codigo: `/**
 * Agente básico de IA con capacidades de procesamiento de texto
 * @class AgenteBasico
 * @version 1.0.0
 * @author Academia Agentes IA
 */
class AgenteBasico {
  /**
   * Construye una nueva instancia del agente
   * @constructor
   * @param {Object} config - Configuración del agente
   * @param {string} config.nombre - Nombre del agente
   * @param {string} config.personalidad - Personalidad del agente
   */
  constructor(config = {}) {
    /** @private {Array<Object>} Almacena el historial de conversación */
    this.memoria = [];
    
    /** @private {Object} Configuración del agente */
    this.config = {
      nombre: config.nombre || 'AgenteBasico',
      personalidad: config.personalidad || 'amigable',
      limiteMensajes: config.limiteMensajes || 50
    };
  }
  
  /**
   * Procesa una entrada del usuario y genera una respuesta
   * @param {string} entrada - Texto de entrada del usuario
   * @returns {Promise<string>} Respuesta del agente
   * @throws {Error} Si la entrada es inválida
   */
  async procesar(entrada) {
    if (!entrada || typeof entrada !== 'string') {
      throw new Error('Entrada debe ser un string no vacío');
    }
    
    // Validar con schema
    const task = {
      id: this.generarId(),
      type: 'text',
      input: entrada,
      status: 'processing',
      timestamp: new Date().toISOString()
    };
    
    const validacion = TaskValidator.validate(task);
    if (!validacion.isValid) {
      throw new Error('Tarea inválida: ' + validacion.errors.join(', '));
    }
    
    return this.generarRespuesta(entrada);
  }
}`,
      tipo: 'proyecto',
      dificultad: 'medio',
      tiempo: 45,
      completado: false
    },
    // EJERCICIOS ORIGINALES (mantenidos para compatibilidad)
    {
      id: 'concepto-1',
      titulo: 'Qué es un Agente IA',
      descripcion: 'Comprende los conceptos fundamentales de un agente de inteligencia artificial, sus componentes básicos y cómo interactúa con el entorno.',
      tipo: 'concepto',
      dificultad: 'facil',
      tiempo: 15,
      completado: false
    },
    {
      id: 'concepto-2',
      titulo: 'Arquitectura Básica',
      descripcion: 'Estudia la estructura fundamental de un agente: input, procesamiento, memoria y output.',
      tipo: 'concepto',
      dificultad: 'facil',
      tiempo: 20,
      completado: false
    },
    {
      id: 'practica-1',
      titulo: 'Primer Agente Simple',
      descripcion: 'Crea tu primer agente que responda a preguntas básicas usando solo JavaScript.',
      codigo: `class AgenteBasico {
  constructor() {
    this.memoria = [];
  }

  procesar(entrada) {
    // Tu implementación aquí
    this.memoria.push(entrada);
    return this.generarRespuesta(entrada);
  }

  generarRespuesta(entrada) {
    // Implementa la lógica de respuesta
    if (entrada.toLowerCase().includes('hola')) {
      return '¡Hola! Soy tu agente IA básico.';
    }
    return 'Interesante. Cuéntame más.';
  }
}

// Prueba tu agente
const agente = new AgenteBasico();
console.log(agente.procesar('Hola, ¿cómo estás?'));`,
      solucion: `class AgenteBasico {
  constructor() {
    this.memoria = [];
    this.patrones = {
      saludo: ['hola', 'buenos', 'hey'],
      pregunta: ['qué', 'cómo', 'cuándo', 'dónde', 'por qué'],
      despedida: ['adiós', 'chao', 'hasta']
    };
  }

  procesar(entrada) {
    this.memoria.push({
      entrada: entrada,
      timestamp: new Date().toISOString()
    });
    
    return this.generarRespuesta(entrada);
  }

  generarRespuesta(entrada) {
    const entradaLower = entrada.toLowerCase();
    
    if (this.contiene(entradaLower, this.patrones.saludo)) {
      return '¡Hola! Soy tu agente IA básico. ¿En qué puedo ayudarte?';
    }
    
    if (this.contiene(entradaLower, this.patrones.pregunta)) {
      return 'Esa es una excelente pregunta. Basándome en mi experiencia, te puedo decir que...';
    }
    
    if (this.contiene(entradaLower, this.patrones.despedida)) {
      return '¡Hasta luego! Ha sido un placer ayudarte.';
    }
    
    return 'Interesante. Cuéntame más sobre eso.';
  }

  contiene(texto, patrones) {
    return patrones.some(patron => texto.includes(patron));
  }

  obtenerMemoria() {
    return this.memoria;
  }
}`,
      tipo: 'practica',
      dificultad: 'medio',
      tiempo: 45,
      completado: false
    },
    {
      id: 'practica-2',
      titulo: 'Sistema de Memoria',
      descripcion: 'Mejora tu agente añadiendo un sistema de memoria que recuerde conversaciones anteriores.',
      codigo: `// Mejora el agente anterior añadiendo:
// 1. Memoria de conversación
// 2. Contexto de la charla
// 3. Respuestas más inteligentes basadas en el historial

class AgenteConMemoria extends AgenteBasico {
  constructor() {
    super();
    this.contextoActual = null;
    this.temas = new Map();
  }

  // Tu implementación aquí
}`,
      tipo: 'practica',
      dificultad: 'medio',
      tiempo: 60,
      completado: false
    },
    {
      id: 'proyecto-1',
      titulo: 'Chatbot Personal',
      descripcion: 'Construye un chatbot completo que pueda mantener conversaciones coherentes y recordar información del usuario.',
      tipo: 'proyecto',
      dificultad: 'dificil',
      tiempo: 120,
      completado: false
    }
  ]

  // Cargar progreso desde localStorage
  useEffect(() => {
    const progresoGuardado = localStorage.getItem('academia-semana-1-progreso')
    if (progresoGuardado) {
      const { completados, progreso: porcentaje } = JSON.parse(progresoGuardado)
      setEjerciciosCompletados(new Set(completados))
      setProgreso(porcentaje)
    }
  }, [])

  // Guardar progreso en localStorage
  useEffect(() => {
    const completados = Array.from(ejerciciosCompletados)
    const porcentajeProgreso = Math.round((completados.length / ejercicios.length) * 100)
    
    localStorage.setItem('academia-semana-1-progreso', JSON.stringify({
      completados,
      progreso: porcentajeProgreso
    }))
    
    setProgreso(porcentajeProgreso)
  }, [ejerciciosCompletados, ejercicios.length])

  const toggleEjercicio = (ejercicioId: string) => {
    const nuevosCompletados = new Set(ejerciciosCompletados)
    if (nuevosCompletados.has(ejercicioId)) {
      nuevosCompletados.delete(ejercicioId)
    } else {
      nuevosCompletados.add(ejercicioId)
    }
    setEjerciciosCompletados(nuevosCompletados)
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'concepto': return <FileCode className="w-5 h-5 text-blue-400" />
      case 'practica': return <Code className="w-5 h-5 text-green-400" />
      case 'proyecto': return <Star className="w-5 h-5 text-purple-400" />
      default: return <Circle className="w-5 h-5" />
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

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'concepto': return 'Concepto'
      case 'practica': return 'Práctica'
      case 'proyecto': return 'Proyecto'
      default: return tipo
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/agencia/mes-1"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-purple-400" />
              <div>
                <h1 className="text-2xl font-bold text-white">Semana 1: Agente Básico</h1>
                <p className="text-gray-400">Construye tu primer agente IA desde cero</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progreso de la Semana</span>
              <span className="text-sm text-gray-400">{progreso}% completado</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progreso}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
              <span>{ejerciciosCompletados.size} de {ejercicios.length} ejercicios</span>
              <span>~{ejercicios.reduce((acc, ej) => acc + ej.tiempo, 0)} min total</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tarea F1-M1-S1 Introduction */}
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-800/30 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-purple-600/20 border border-purple-600/30 rounded-full text-sm font-medium text-purple-400">
              F1-M1-S1
            </div>
            <h2 className="text-xl font-semibold text-purple-400">Configuración del Entorno y Fundamentos</h2>
          </div>
          <p className="text-gray-300 mb-4">
            <strong>🎯 Objetivo:</strong> Establecer base sólida de desarrollo y principios fundamentales
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3 text-purple-300">Contenido Expandido (5 días)</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <strong>Día 1:</strong> Setup inicial + Principios Clean Code
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <strong>Día 2:</strong> Estructura de directorios + Git
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <strong>Día 3:</strong> Schema JSON + Validación de datos
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <strong>Día 4:</strong> Tests con Jest + Agente mock
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <strong>Día 5:</strong> JSDoc + Integración completa
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3 text-blue-300">Fundamentos Originales</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Arquitectura básica de agentes IA
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Procesamiento de lenguaje natural
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Sistemas de memoria y contexto
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  Patrones de respuesta inteligentes
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-800/30 rounded-lg">
            <p className="text-yellow-300 text-sm">
              <strong>📋 Entregables:</strong> Proyecto configurado + Schema + Tests básicos + Documentación JSDoc
            </p>
          </div>
        </div>

        {/* Access to Detailed Tasks */}
        <div className="mb-8 text-center">
          <Link
            href="/agencia/mes-1/semana-1/tareas"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-medium transition-all transform hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            Ver Tareas Detalladas por Días (F1-M1-S1)
          </Link>
          <p className="text-gray-400 text-sm mt-2">
            Accede al contenido expandido de 5 días con teoría + práctica estructurada
          </p>
        </div>

        {/* Exercises */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Ejercicios Prácticos Originales</h2>
          
          {ejercicios.map((ejercicio) => (
            <div
              key={ejercicio.id}
              className={`bg-gray-900 border rounded-xl p-6 transition-all ${
                ejerciciosCompletados.has(ejercicio.id)
                  ? 'border-green-600/30 bg-green-900/10'
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              {/* Exercise Header */}
              <div className="flex items-start gap-4 mb-4">
                <button
                  onClick={() => toggleEjercicio(ejercicio.id)}
                  className="mt-1"
                >
                  {ejerciciosCompletados.has(ejercicio.id) ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-600 hover:text-gray-400" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getTipoIcon(ejercicio.tipo)}
                    <h3 className="text-lg font-semibold">{ejercicio.titulo}</h3>
                    <span className={`text-xs px-2 py-1 rounded border ${getDificultadColor(ejercicio.dificultad)}`}>
                      {ejercicio.dificultad}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {ejercicio.tiempo} min
                    </div>
                  </div>
                  
                  <span className={`text-xs px-2 py-1 rounded ${
                    ejercicio.tipo === 'concepto' 
                      ? 'bg-blue-900/20 text-blue-400'
                      : ejercicio.tipo === 'practica'
                      ? 'bg-green-900/20 text-green-400'
                      : 'bg-purple-900/20 text-purple-400'
                  }`}>
                    {getTipoLabel(ejercicio.tipo)}
                  </span>
                </div>
              </div>

              {/* Exercise Description */}
              <p className="text-gray-400 mb-4 ml-10">{ejercicio.descripcion}</p>

              {/* Code Block */}
              {ejercicio.codigo && (
                <div className="ml-10">
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Terminal className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-400">Código base</span>
                    </div>
                    <pre className="text-sm overflow-x-auto">
                      <code className="language-javascript text-gray-300">
                        {ejercicio.codigo}
                      </code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Solution (only show if completed) */}
              {ejercicio.solucion && ejerciciosCompletados.has(ejercicio.id) && (
                <div className="ml-10">
                  <div className="bg-green-950/20 border border-green-800/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400">Solución</span>
                    </div>
                    <pre className="text-sm overflow-x-auto">
                      <code className="language-javascript text-gray-300">
                        {ejercicio.solucion}
                      </code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="flex justify-end mt-4 ml-10">
                <button
                  onClick={() => toggleEjercicio(ejercicio.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    ejerciciosCompletados.has(ejercicio.id)
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {ejerciciosCompletados.has(ejercicio.id) ? 'Completado' : 'Marcar como completado'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Demo */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Beaker className="w-6 h-6 text-blue-400" />
            Prueba tu Agente Básico
          </h2>
          <ChatAgenteBasico 
            configuracionInicial={{
              nombre: 'MiPrimerAgente',
              personalidad: 'amigable y educativo',
              limiteMensajes: 30,
              usarContexto: true
            }}
          />
          <div className="mt-4 text-center">
            <Link
              href="/agencia/laboratorio"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              <Beaker className="w-5 h-5" />
              Ir al Laboratorio Completo
            </Link>
          </div>
        </div>

        {/* Next Steps */}
        {progreso === 100 && (
          <div className="mt-8 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-800/30 rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-4 text-green-400">🎉 ¡Semana 1 Completada!</h3>
            <p className="text-gray-300 mb-6">
              Has construido tu primer agente IA desde cero. Ahora estás listo para añadir memoria persistente.
            </p>
            <Link
              href="/agencia/mes-1/semana-2"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
            >
              Continuar a Semana 2 <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}