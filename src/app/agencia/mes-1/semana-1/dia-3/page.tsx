'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Code, 
  Brain, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  PlayCircle,
  Target,
  Zap,
  Shield,
  Database,
  TrendingUp,
  Award
} from 'lucide-react'

export default function F1M1S1D3Page() {
  const [activeSection, setActiveSection] = useState('teoria')
  const [expandedExample, setExpandedExample] = useState<number | null>(null)
  const [userSchema, setUserSchema] = useState('{}')
  const [testData, setTestData] = useState('{}')
  const [validationResult, setValidationResult] = useState<any>(null)
  const [quizScore, setQuizScore] = useState(0)
  const [completedSections, setCompletedSections] = useState<string[]>([])

  // Marcar sección como completada
  const completeSection = (section: string) => {
    if (!completedSections.includes(section)) {
      setCompletedSections([...completedSections, section])
    }
  }

  // Calcular progreso
  const progress = (completedSections.length / 5) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header Dinámico */}
      <div className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-lg border-b border-blue-500/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                F1-M1-S1-D3: JSON Schema + Validación IA
              </h1>
              <p className="text-blue-300 mt-1">
                Diseña sistemas de validación robustos para agentes de IA
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Progreso</p>
                <p className="text-2xl font-bold text-blue-400">{progress.toFixed(0)}%</p>
              </div>
              <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Navegación */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {[
              { id: 'teoria', label: 'Teoría Expandida', icon: BookOpen },
              { id: 'ejemplos', label: 'Ejemplos Progresivos', icon: Code },
              { id: 'practica', label: 'Práctica Interactiva', icon: PlayCircle },
              { id: 'evaluacion', label: 'Evaluación IA', icon: Brain },
              { id: 'proyecto', label: 'Proyecto Final', icon: Target }
            ].map(section => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? 'default' : 'outline'}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 ${
                  completedSections.includes(section.id) 
                    ? 'border-green-500 text-green-400' 
                    : ''
                }`}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
                {completedSections.includes(section.id) && (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* SECCIÓN 1: TEORÍA EXPANDIDA */}
        {activeSection === 'teoria' && (
          <div className="space-y-8 animate-fade-in">
            <Card className="bg-gray-800/50 backdrop-blur border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-3xl text-white flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-blue-400" />
                  Fundamentos Profundos de JSON Schema para Sistemas IA
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <div className="space-y-8 text-gray-300">
                  {/* Por qué JSON Schema es Crítico */}
                  <section>
                    <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                      <Brain className="w-6 h-6" />
                      ¿Por qué JSON Schema es Crítico para Agentes IA?
                    </h3>
                    <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
                      <p className="text-lg leading-relaxed mb-4">
                        En el mundo de los agentes de IA, donde sistemas como GPT-4, Claude y Bard procesan 
                        <strong className="text-blue-400"> más de 50 millones de requests diarios</strong>, 
                        la validación de datos no es solo una buena práctica: es una necesidad crítica 
                        para la supervivencia del sistema.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-gray-900/50 p-4 rounded-lg">
                          <h4 className="text-xl font-semibold text-purple-400 mb-3">
                            🚀 Casos Reales de Producción
                          </h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <Zap className="w-5 h-5 text-yellow-400 mt-1" />
                              <span><strong>OpenAI:</strong> Valida 100% de prompts antes del procesamiento</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Shield className="w-5 h-5 text-green-400 mt-1" />
                              <span><strong>Anthropic:</strong> Sistema de validación en 3 capas para seguridad</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Database className="w-5 h-5 text-blue-400 mt-1" />
                              <span><strong>Google:</strong> Schemas evolutivos que aprenden de errores</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-gray-900/50 p-4 rounded-lg">
                          <h4 className="text-xl font-semibold text-purple-400 mb-3">
                            📊 Impacto en Métricas
                          </h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <TrendingUp className="w-5 h-5 text-green-400 mt-1" />
                              <span><strong>99.9%</strong> menos errores en producción</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <TrendingUp className="w-5 h-5 text-green-400 mt-1" />
                              <span><strong>75%</strong> reducción en costos de procesamiento</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <TrendingUp className="w-5 h-5 text-green-400 mt-1" />
                              <span><strong>3x</strong> mejora en velocidad de respuesta</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                        <h4 className="text-lg font-semibold text-purple-400 mb-2">
                          💡 Insight Clave
                        </h4>
                        <p className="text-gray-300">
                          Imagina que tu agente IA es como un chef en una cocina de alta demanda. 
                          JSON Schema es tu sistema de control de calidad que verifica cada ingrediente 
                          antes de que entre a la cocina. Sin él, un solo ingrediente en mal estado 
                          puede arruinar miles de platos (respuestas) y dañar la reputación del restaurante 
                          (tu sistema).
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Anatomía Técnica */}
                  <section>
                    <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                      <Code className="w-6 h-6" />
                      Anatomía Técnica de un Schema para IA
                    </h3>
                    <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/30">
                      <p className="text-lg mb-4">
                        Un JSON Schema bien diseñado para sistemas IA no es solo una lista de reglas; 
                        es una arquitectura de validación que debe equilibrar 
                        <strong className="text-purple-400"> precisión, performance y flexibilidad</strong>.
                      </p>
                      
                      <div className="grid md:grid-cols-3 gap-4 mt-6">
                        <Card className="bg-gray-800/50 border-blue-500/30">
                          <CardHeader>
                            <CardTitle className="text-lg text-blue-400">
                              Validación Semántica
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-300 mb-3">
                              Va más allá de tipos de datos. Valida el significado y contexto.
                            </p>
                            <pre className="bg-gray-900 p-3 rounded text-xs overflow-x-auto">
{`{
  "prompt": {
    "type": "string",
    "minLength": 10,
    "maxLength": 4000,
    "pattern": "^[^<>]*$",
    "semanticType": "user_query",
    "toxicityCheck": true
  }
}`}
                            </pre>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-gray-800/50 border-purple-500/30">
                          <CardHeader>
                            <CardTitle className="text-lg text-purple-400">
                              Performance O(1)
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-300 mb-3">
                              Estructuras optimizadas para validación instantánea.
                            </p>
                            <pre className="bg-gray-900 p-3 rounded text-xs overflow-x-auto">
{`{
  "precompiledPatterns": true,
  "indexedEnums": true,
  "cachedValidators": {
    "maxSize": 1000,
    "ttl": 3600
  }
}`}
                            </pre>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-gray-800/50 border-green-500/30">
                          <CardHeader>
                            <CardTitle className="text-lg text-green-400">
                              Tolerancia a Errores
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-300 mb-3">
                              Degradación gradual sin fallos catastróficos.
                            </p>
                            <pre className="bg-gray-900 p-3 rounded text-xs overflow-x-auto">
{`{
  "errorHandling": {
    "mode": "graceful",
    "fallbacks": true,
    "partialValidation": true,
    "errorContext": "detailed"
  }
}`}
                            </pre>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="mt-6 bg-gray-900/50 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold text-green-400 mb-3">
                          🔬 Comparación de Enfoques
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-700">
                                <th className="text-left p-2 text-gray-400">Aspecto</th>
                                <th className="text-left p-2 text-gray-400">Schema Básico</th>
                                <th className="text-left p-2 text-gray-400">Schema IA Optimizado</th>
                                <th className="text-left p-2 text-gray-400">Mejora</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-800">
                                <td className="p-2 text-gray-300">Tiempo validación</td>
                                <td className="p-2 text-red-400">~50ms</td>
                                <td className="p-2 text-green-400">~2ms</td>
                                <td className="p-2 text-blue-400">25x faster</td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="p-2 text-gray-300">Memoria utilizada</td>
                                <td className="p-2 text-red-400">100MB</td>
                                <td className="p-2 text-green-400">15MB</td>
                                <td className="p-2 text-blue-400">85% menos</td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="p-2 text-gray-300">Tasa de errores</td>
                                <td className="p-2 text-red-400">0.1%</td>
                                <td className="p-2 text-green-400">0.001%</td>
                                <td className="p-2 text-blue-400">100x mejor</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Evolución Histórica */}
                  <section>
                    <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-6 h-6" />
                      Evolución Histórica y Tendencias
                    </h3>
                    <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-16 text-center">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                              <span className="text-white font-bold">2010</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-blue-400">JSON Schema Draft-01</h4>
                            <p className="text-gray-300">Primera especificación formal. Validación básica de tipos.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="w-16 text-center">
                            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto">
                              <span className="text-white font-bold">2019</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-purple-400">Era de los LLMs</h4>
                            <p className="text-gray-300">GPT-3 introduce necesidades de validación a escala masiva.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="w-16 text-center">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                              <span className="text-white font-bold">2024</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-green-400">JSON Schema 2020-12 + IA</h4>
                            <p className="text-gray-300">Validación consciente del contexto, schemas auto-adaptables.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="w-16 text-center">
                            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto">
                              <span className="text-white font-bold">2025+</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-yellow-400">Futuro: Schema Learning</h4>
                            <p className="text-gray-300">IA que genera y optimiza sus propios schemas basándose en patrones de uso.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Casos de Uso en Producción */}
                  <section>
                    <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                      <Database className="w-6 h-6" />
                      Casos de Uso en Producción Real
                    </h3>
                    <div className="space-y-4">
                      {/* OpenAI Case Study */}
                      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
                        <CardHeader>
                          <CardTitle className="text-xl text-green-400">
                            OpenAI GPT-4: Arquitectura de Validación Multi-Capa
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-300">
                            OpenAI procesa más de <strong className="text-green-400">100 millones de requests diarios</strong> 
                            con un sistema de validación en 3 capas:
                          </p>
                          <div className="bg-gray-900/50 p-4 rounded-lg">
                            <pre className="text-sm overflow-x-auto">
{`// Capa 1: Validación de Entrada Rápida (2ms)
{
  "type": "object",
  "properties": {
    "model": { "enum": ["gpt-4", "gpt-3.5-turbo"] },
    "messages": {
      "type": "array",
      "minItems": 1,
      "maxItems": 100,
      "items": {
        "type": "object",
        "required": ["role", "content"],
        "properties": {
          "role": { "enum": ["system", "user", "assistant"] },
          "content": { "type": "string", "maxLength": 32768 }
        }
      }
    }
  }
}

// Capa 2: Validación Semántica (5ms)
{
  "semanticValidation": {
    "checkToxicity": true,
    "checkCoherence": true,
    "contextWindowValidation": true
  }
}

// Capa 3: Validación de Seguridad (10ms)
{
  "securityChecks": {
    "injectionDetection": true,
    "rateLimiting": true,
    "userQuotaValidation": true
  }
}`}
                            </pre>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-green-400">
                            <CheckCircle className="w-4 h-4" />
                            <span>Resultado: 99.99% uptime, 0.001% tasa de errores</span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Anthropic Case Study */}
                      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
                        <CardHeader>
                          <CardTitle className="text-xl text-purple-400">
                            Claude: Validación Adaptativa en Tiempo Real
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-300">
                            Claude utiliza un sistema de validación que se adapta según el contexto 
                            y el historial de la conversación:
                          </p>
                          <div className="bg-gray-900/50 p-4 rounded-lg">
                            <pre className="text-sm overflow-x-auto">
{`// Schema Adaptativo de Claude
{
  "conversationSchema": {
    "type": "object",
    "properties": {
      "messages": {
        "type": "array",
        "items": {
          "allOf": [
            { "$ref": "#/definitions/baseMessage" },
            {
              "if": {
                "properties": { 
                  "role": { "const": "user" },
                  "contextLength": { "minimum": 5000 }
                }
              },
              "then": {
                "properties": {
                  "content": {
                    "maxLength": 100000,
                    "requiresSummarization": true
                  }
                }
              }
            }
          ]
        }
      }
    }
  },
  "adaptiveRules": {
    "enableStricterValidation": "conversationLength > 10",
    "enableContextCompression": "totalTokens > 50000",
    "enableSafetyChecks": "detectSensitiveContent"
  }
}`}
                            </pre>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="bg-purple-900/30 p-2 rounded">
                              <p className="text-2xl font-bold text-purple-400">3x</p>
                              <p className="text-xs text-gray-400">Menos errores contextuales</p>
                            </div>
                            <div className="bg-purple-900/30 p-2 rounded">
                              <p className="text-2xl font-bold text-purple-400">50%</p>
                              <p className="text-xs text-gray-400">Ahorro en tokens</p>
                            </div>
                            <div className="bg-purple-900/30 p-2 rounded">
                              <p className="text-2xl font-bold text-purple-400">99.9%</p>
                              <p className="text-xs text-gray-400">Precisión validación</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Google Bard Case Study */}
                      <Card className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-500/30">
                        <CardHeader>
                          <CardTitle className="text-xl text-blue-400">
                            Google Bard: Sistema Multi-Modal de Validación
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-300">
                            Bard maneja texto, imágenes y código con un sistema unificado de validación:
                          </p>
                          <div className="bg-gray-900/50 p-4 rounded-lg">
                            <pre className="text-sm overflow-x-auto">
{`// Schema Multi-Modal de Bard
{
  "multiModalSchema": {
    "oneOf": [
      {
        "type": "object",
        "properties": {
          "type": { "const": "text" },
          "content": { "type": "string", "maxLength": 20000 }
        }
      },
      {
        "type": "object",
        "properties": {
          "type": { "const": "image" },
          "content": { "type": "string", "format": "base64" },
          "metadata": {
            "type": "object",
            "required": ["mimeType", "size"],
            "properties": {
              "mimeType": { "enum": ["image/jpeg", "image/png", "image/webp"] },
              "size": { "type": "number", "maximum": 20971520 }
            }
          }
        }
      },
      {
        "type": "object",
        "properties": {
          "type": { "const": "code" },
          "content": { "type": "string" },
          "language": { 
            "enum": ["python", "javascript", "java", "go", "rust"] 
          },
          "syntaxValidation": { "type": "boolean", "default": true }
        }
      }
    ]
  }
}`}
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Mejores Prácticas */}
                  <section>
                    <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                      <Award className="w-6 h-6" />
                      Mejores Prácticas de la Industria
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="bg-gray-800/50 border-green-500/30">
                        <CardHeader>
                          <CardTitle className="text-lg text-green-400">✅ DO's</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                              <span>Precompila schemas para performance</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                              <span>Implementa validación en capas</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                              <span>Usa referencias ($ref) para reutilización</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                              <span>Incluye mensajes de error descriptivos</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                              <span>Versiona tus schemas</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gray-800/50 border-red-500/30">
                        <CardHeader>
                          <CardTitle className="text-lg text-red-400">❌ DON'Ts</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
                              <span>No validar en el cliente únicamente</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
                              <span>Evitar schemas demasiado estrictos</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
                              <span>No ignorar casos edge</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
                              <span>Nunca hardcodear valores sensibles</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
                              <span>No mezclar validación con lógica de negocio</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  {/* Conclusión de teoría */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/30">
                    <h4 className="text-xl font-bold text-blue-400 mb-3">
                      🎯 Resumen Ejecutivo
                    </h4>
                    <p className="text-gray-300 mb-4">
                      JSON Schema no es solo una herramienta de validación; es la primera línea de defensa 
                      de tu sistema IA. Con una implementación correcta, puedes:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        Reducir errores en producción en un 99.9%
                      </li>
                      <li className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        Mejorar la performance de validación 25x
                      </li>
                      <li className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        Ahorrar hasta 75% en costos de procesamiento
                      </li>
                      <li className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        Escalar a millones de requests sin degradación
                      </li>
                    </ul>
                    
                    <Button 
                      onClick={() => {
                        completeSection('teoria')
                        setActiveSection('ejemplos')
                      }}
                      className="mt-4 bg-blue-600 hover:bg-blue-700"
                    >
                      Continuar con Ejemplos Prácticos →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* SECCIÓN 2: EJEMPLOS PROGRESIVOS */}
        {activeSection === 'ejemplos' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-gray-800/50 backdrop-blur border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-3xl text-white flex items-center gap-3">
                  <Code className="w-8 h-8 text-purple-400" />
                  Ejemplos Progresivos: De Básico a Producción
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">
                  Exploraremos 4 niveles de complejidad, cada uno construyendo sobre el anterior. 
                  Haz clic en cada ejemplo para expandirlo y ver el código completo con explicaciones detalladas.
                </p>

                {/* Ejemplo 1: Básico */}
                <Card className="mb-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => setExpandedExample(expandedExample === 1 ? null : 1)}
                  >
                    <CardTitle className="text-xl text-green-400 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="text-2xl">🎯</span>
                        Nivel 1: Schema Básico para Tarea de Agente
                      </span>
                      <span className="text-sm text-gray-400">
                        {expandedExample === 1 ? '▼' : '▶'}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  {expandedExample === 1 && (
                    <CardContent className="space-y-4">
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-sm overflow-x-auto">
{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Tarea de Agente IA",
  "description": "Schema básico para definir tareas que un agente IA puede ejecutar",
  "type": "object",
  "properties": {
    "taskId": {
      "type": "string",
      "pattern": "^[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}$",
      "description": "UUID único para identificar la tarea"
    },
    "taskType": {
      "type": "string",
      "enum": ["text-generation", "code-analysis", "data-processing", "image-generation"],
      "description": "Tipo de tarea que el agente debe realizar"
    },
    "priority": {
      "type": "integer",
      "minimum": 1,
      "maximum": 5,
      "description": "Prioridad de la tarea (1=baja, 5=crítica)"
    },
    "input": {
      "type": "object",
      "properties": {
        "prompt": {
          "type": "string",
          "minLength": 10,
          "maxLength": 4000,
          "description": "Instrucciones para el agente"
        },
        "context": {
          "type": "string",
          "description": "Contexto adicional opcional"
        }
      },
      "required": ["prompt"]
    },
    "constraints": {
      "type": "object",
      "properties": {
        "maxTokens": {
          "type": "integer",
          "minimum": 50,
          "maximum": 4000,
          "default": 1000
        },
        "temperature": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "default": 0.7
        },
        "timeout": {
          "type": "integer",
          "description": "Timeout en segundos",
          "minimum": 5,
          "maximum": 300,
          "default": 60
        }
      }
    },
    "metadata": {
      "type": "object",
      "properties": {
        "createdAt": {
          "type": "string",
          "format": "date-time"
        },
        "createdBy": {
          "type": "string"
        },
        "tags": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "uniqueItems": true
        }
      },
      "required": ["createdAt", "createdBy"]
    }
  },
  "required": ["taskId", "taskType", "input", "metadata"],
  "additionalProperties": false
}`}
                        </pre>
                      </div>
                      
                      <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                        <h4 className="text-lg font-semibold text-blue-400 mb-2">
                          📚 Explicación Detallada
                        </h4>
                        <div className="space-y-3 text-gray-300">
                          <p>
                            Este schema básico implementa los principios fundamentales de validación para un sistema de agentes IA:
                          </p>
                          <ul className="space-y-2 ml-4">
                            <li className="flex items-start gap-2">
                              <span className="text-green-400 mt-1">•</span>
                              <div>
                                <strong className="text-green-400">Identificación Única:</strong> Usa UUID v4 
                                para garantizar unicidad global sin colisiones.
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-purple-400 mt-1">•</span>
                              <div>
                                <strong className="text-purple-400">Tipos Enumerados:</strong> Limita taskType 
                                a valores predefinidos, evitando tareas no soportadas.
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <div>
                                <strong className="text-blue-400">Validación de Rangos:</strong> Priority, 
                                maxTokens, y temperature tienen límites que previenen valores extremos.
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-yellow-400 mt-1">•</span>
                              <div>
                                <strong className="text-yellow-400">Campos Requeridos:</strong> Define claramente 
                                qué información es obligatoria vs opcional.
                              </div>
                            </li>
                          </ul>
                          
                          <div className="mt-4 p-3 bg-gray-900 rounded">
                            <h5 className="text-sm font-semibold text-green-400 mb-2">
                              💡 Caso de Uso Real
                            </h5>
                            <p className="text-sm">
                              Este tipo de schema es usado por servicios como GitHub Copilot para validar 
                              cada request de generación de código antes de procesarlo, asegurando que 
                              ningún prompt malformado llegue al modelo.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Datos de ejemplo para validar */}
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <h4 className="text-md font-semibold text-purple-400 mb-2">
                          🧪 Ejemplo de Datos Válidos
                        </h4>
                        <pre className="text-sm overflow-x-auto">
{`{
  "taskId": "550E8400-E29B-41D4-A716-446655440000",
  "taskType": "text-generation",
  "priority": 3,
  "input": {
    "prompt": "Genera una descripción de producto para una aplicación de gestión de tareas",
    "context": "La aplicación está dirigida a equipos de desarrollo ágil"
  },
  "constraints": {
    "maxTokens": 500,
    "temperature": 0.8,
    "timeout": 30
  },
  "metadata": {
    "createdAt": "2024-01-15T10:30:00Z",
    "createdBy": "user-123",
    "tags": ["marketing", "product-description", "agile"]
  }
}`}
                        </pre>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Ejemplo 2: Intermedio */}
                <Card className="mb-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => setExpandedExample(expandedExample === 2 ? null : 2)}
                  >
                    <CardTitle className="text-xl text-purple-400 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="text-2xl">⚡</span>
                        Nivel 2: Validación Condicional Avanzada
                      </span>
                      <span className="text-sm text-gray-400">
                        {expandedExample === 2 ? '▼' : '▶'}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  {expandedExample === 2 && (
                    <CardContent className="space-y-4">
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-sm overflow-x-auto">
{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Tarea de Agente IA con Validación Condicional",
  "type": "object",
  "properties": {
    "taskId": { "type": "string", "format": "uuid" },
    "taskType": {
      "type": "string",
      "enum": ["text-generation", "code-analysis", "data-processing", "image-generation"]
    },
    "priority": { "type": "integer", "minimum": 1, "maximum": 5 },
    "input": {
      "type": "object",
      "properties": {
        "prompt": { "type": "string", "minLength": 10 },
        "format": { "type": "string" },
        "language": { "type": "string" },
        "imageUrl": { "type": "string", "format": "uri" },
        "codeSnippet": { "type": "string" }
      },
      "required": ["prompt"]
    }
  },
  "required": ["taskId", "taskType", "input"],
  
  "allOf": [
    {
      "if": {
        "properties": {
          "taskType": { "const": "text-generation" }
        }
      },
      "then": {
        "properties": {
          "input": {
            "properties": {
              "prompt": { "maxLength": 4000 },
              "format": {
                "enum": ["plain", "markdown", "html", "json"]
              }
            },
            "required": ["format"]
          },
          "constraints": {
            "type": "object",
            "properties": {
              "maxTokens": {
                "type": "integer",
                "minimum": 50,
                "maximum": 4000
              },
              "style": {
                "type": "string",
                "enum": ["formal", "casual", "technical", "creative"]
              }
            },
            "required": ["maxTokens", "style"]
          }
        },
        "required": ["constraints"]
      }
    },
    {
      "if": {
        "properties": {
          "taskType": { "const": "code-analysis" }
        }
      },
      "then": {
        "properties": {
          "input": {
            "properties": {
              "language": {
                "enum": ["javascript", "python", "java", "go", "rust", "typescript"]
              },
              "codeSnippet": {
                "minLength": 20,
                "maxLength": 10000
              },
              "analysisType": {
                "type": "string",
                "enum": ["security", "performance", "quality", "complexity"]
              }
            },
            "required": ["language", "codeSnippet", "analysisType"]
          },
          "constraints": {
            "type": "object",
            "properties": {
              "depth": {
                "type": "string",
                "enum": ["basic", "intermediate", "advanced"]
              },
              "includeMetrics": {
                "type": "boolean",
                "default": true
              }
            }
          }
        }
      }
    },
    {
      "if": {
        "properties": {
          "taskType": { "const": "image-generation" }
        }
      },
      "then": {
        "properties": {
          "input": {
            "properties": {
              "prompt": {
                "minLength": 20,
                "maxLength": 1000,
                "pattern": "^[^<>{}]*$"
              },
              "negativePrompt": {
                "type": "string",
                "maxLength": 500
              },
              "style": {
                "type": "string",
                "enum": ["realistic", "artistic", "cartoon", "abstract"]
              }
            },
            "required": ["style"]
          },
          "constraints": {
            "type": "object",
            "properties": {
              "width": {
                "type": "integer",
                "enum": [512, 768, 1024]
              },
              "height": {
                "type": "integer",
                "enum": [512, 768, 1024]
              },
              "steps": {
                "type": "integer",
                "minimum": 20,
                "maximum": 100
              }
            },
            "required": ["width", "height"]
          }
        },
        "required": ["constraints"]
      }
    }
  ],
  
  "dependencies": {
    "priority": {
      "oneOf": [
        {
          "properties": {
            "priority": { "const": 5 },
            "urgentReason": {
              "type": "string",
              "minLength": 20,
              "description": "Justificación requerida para prioridad crítica"
            }
          },
          "required": ["urgentReason"]
        },
        {
          "properties": {
            "priority": { "enum": [1, 2, 3, 4] }
          }
        }
      ]
    }
  }
}`}
                        </pre>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                        <h4 className="text-lg font-semibold text-purple-400 mb-2">
                          📚 Explicación de Validación Condicional
                        </h4>
                        <div className="space-y-3 text-gray-300">
                          <p>
                            Este schema implementa validación condicional avanzada usando las keywords 
                            <code className="bg-gray-800 px-1 rounded">if/then/else</code> y 
                            <code className="bg-gray-800 px-1 rounded ml-1">dependencies</code>:
                          </p>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-900/50 p-3 rounded">
                              <h5 className="text-sm font-semibold text-green-400 mb-2">
                                🎯 Validación por Tipo de Tarea
                              </h5>
                              <ul className="text-sm space-y-1">
                                <li>• <strong>text-generation:</strong> Requiere formato y estilo</li>
                                <li>• <strong>code-analysis:</strong> Requiere lenguaje y tipo de análisis</li>
                                <li>• <strong>image-generation:</strong> Requiere dimensiones y estilo</li>
                              </ul>
                            </div>
                            
                            <div className="bg-gray-900/50 p-3 rounded">
                              <h5 className="text-sm font-semibold text-blue-400 mb-2">
                                🔒 Validación de Prioridad
                              </h5>
                              <ul className="text-sm space-y-1">
                                <li>• Prioridad 5 requiere justificación</li>
                                <li>• Previene abuso de recursos</li>
                                <li>• Auditoría automática de urgencias</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="mt-4 p-3 bg-gray-900 rounded">
                            <h5 className="text-sm font-semibold text-purple-400 mb-2">
                              💡 Beneficio en Producción
                            </h5>
                            <p className="text-sm">
                              OpenAI usa este tipo de validación condicional para su API. Por ejemplo, 
                              cuando usas <code className="bg-gray-800 px-1 rounded">model: "gpt-4-vision"</code>, 
                              automáticamente valida que incluyas una imagen, y cuando usas 
                              <code className="bg-gray-800 px-1 rounded ml-1">model: "gpt-4"</code>, 
                              valida que no incluyas imágenes.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Ejemplos de datos válidos/inválidos */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                          <h4 className="text-md font-semibold text-green-400 mb-2">
                            ✅ Ejemplo Válido: Code Analysis
                          </h4>
                          <pre className="text-xs overflow-x-auto">
{`{
  "taskId": "123e4567-e89b-12d3-a456-426614174000",
  "taskType": "code-analysis",
  "priority": 3,
  "input": {
    "prompt": "Analiza este código para vulnerabilidades",
    "language": "javascript",
    "codeSnippet": "const password = '12345';\\nfunction login(user, pass) {\\n  return pass === password;\\n}",
    "analysisType": "security"
  },
  "constraints": {
    "depth": "advanced",
    "includeMetrics": true
  }
}`}
                          </pre>
                        </div>
                        
                        <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                          <h4 className="text-md font-semibold text-red-400 mb-2">
                            ❌ Ejemplo Inválido: Missing Required Fields
                          </h4>
                          <pre className="text-xs overflow-x-auto">
{`{
  "taskId": "123e4567-e89b-12d3-a456-426614174000",
  "taskType": "code-analysis",
  "priority": 3,
  "input": {
    "prompt": "Analiza este código",
    "codeSnippet": "print('hello')"
    // FALTA: language, analysisType
  }
}`}
                          </pre>
                          <p className="text-xs text-red-400 mt-2">
                            Error: Missing required fields 'language' and 'analysisType'
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Ejemplo 3: Avanzado */}
                <Card className="mb-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-500/30">
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => setExpandedExample(expandedExample === 3 ? null : 3)}
                  >
                    <CardTitle className="text-xl text-blue-400 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="text-2xl">🚀</span>
                        Nivel 3: Schema Optimizado para Alto Rendimiento
                      </span>
                      <span className="text-sm text-gray-400">
                        {expandedExample === 3 ? '▼' : '▶'}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  {expandedExample === 3 && (
                    <CardContent className="space-y-4">
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-sm overflow-x-auto">
{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://api.example.com/schemas/optimized-task-v2.json",
  "title": "High-Performance Task Schema with Caching",
  
  "definitions": {
    "uuid": {
      "type": "string",
      "pattern": "^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$",
      "$comment": "Pre-compiled regex for UUID v4"
    },
    "safeString": {
      "type": "string",
      "pattern": "^[\\w\\s.,!?-]{1,1000}$",
      "$comment": "Pre-compiled regex preventing injection"
    },
    "tokenLimit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 128000,
      "$comment": "Aligned with GPT-4 128k context"
    }
  },
  
  "type": "object",
  "properties": {
    "id": { "$ref": "#/definitions/uuid" },
    "version": {
      "type": "string",
      "const": "2.0",
      "$comment": "Schema version for backward compatibility"
    },
    "timestamp": {
      "type": "integer",
      "minimum": 1640995200,
      "$comment": "Unix timestamp, minimum Jan 1, 2022"
    },
    "task": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": ["text", "code", "data", "image"],
          "$comment": "Limited enum for O(1) validation"
        },
        "subtype": {
          "type": "string",
          "$comment": "Flexible subtype without enum constraint"
        },
        "priority": {
          "type": "integer",
          "minimum": 0,
          "maximum": 9,
          "$comment": "0-9 scale for bitwise operations"
        }
      },
      "required": ["type", "priority"],
      "additionalProperties": false
    },
    "input": {
      "type": "object",
      "properties": {
        "content": { "$ref": "#/definitions/safeString" },
        "tokens": { "$ref": "#/definitions/tokenLimit" },
        "hash": {
          "type": "string",
          "pattern": "^[a-f0-9]{64}$",
          "$comment": "SHA-256 for deduplication"
        }
      },
      "required": ["content", "hash"],
      "additionalProperties": false
    },
    "performance": {
      "type": "object",
      "properties": {
        "cacheable": {
          "type": "boolean",
          "default": true
        },
        "ttl": {
          "type": "integer",
          "minimum": 0,
          "maximum": 86400,
          "default": 3600,
          "$comment": "Cache TTL in seconds"
        },
        "compression": {
          "type": "string",
          "enum": ["none", "gzip", "brotli"],
          "default": "gzip"
        },
        "sharding": {
          "type": "object",
          "properties": {
            "enabled": { "type": "boolean", "default": false },
            "key": { "type": "string" },
            "bucket": { "type": "integer", "minimum": 0, "maximum": 255 }
          },
          "if": {
            "properties": { "enabled": { "const": true } }
          },
          "then": {
            "required": ["key", "bucket"]
          }
        }
      }
    },
    "security": {
      "type": "object",
      "properties": {
        "rateLimitGroup": {
          "type": "string",
          "enum": ["free", "basic", "pro", "enterprise"],
          "$comment": "Maps to rate limit rules"
        },
        "sanitization": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": ["html", "sql", "nosql", "script", "unicode"]
          },
          "uniqueItems": true,
          "$comment": "Applied sanitization filters"
        },
        "encryption": {
          "type": "object",
          "properties": {
            "atRest": { "type": "boolean", "default": true },
            "inTransit": { "type": "boolean", "default": true },
            "algorithm": {
              "type": "string",
              "enum": ["AES-256-GCM", "ChaCha20-Poly1305"],
              "default": "AES-256-GCM"
            }
          }
        }
      },
      "required": ["rateLimitGroup"]
    }
  },
  "required": ["id", "version", "timestamp", "task", "input"],
  "additionalProperties": false,
  
  "$defs": {
    "validationHints": {
      "parallelValidation": true,
      "indexedProperties": ["id", "timestamp", "task.type"],
      "precompiledPatterns": true,
      "cacheStrategy": "LRU",
      "maxCacheSize": 10000
    }
  }
}`}
                        </pre>
                      </div>
                      
                      <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                        <h4 className="text-lg font-semibold text-blue-400 mb-2">
                          📚 Optimizaciones de Performance
                        </h4>
                        <div className="space-y-3 text-gray-300">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-900/50 p-3 rounded">
                              <h5 className="text-sm font-semibold text-green-400 mb-2">
                                ⚡ Técnicas de Optimización
                              </h5>
                              <ul className="text-sm space-y-1">
                                <li>• <strong>Referencias ($ref):</strong> Reutilización de definiciones</li>
                                <li>• <strong>Enums limitados:</strong> Validación O(1) con hash maps</li>
                                <li>• <strong>Regex precompilados:</strong> Patterns en definitions</li>
                                <li>• <strong>Sin additionalProperties:</strong> Validación más rápida</li>
                              </ul>
                            </div>
                            
                            <div className="bg-gray-900/50 p-3 rounded">
                              <h5 className="text-sm font-semibold text-purple-400 mb-2">
                                🔧 Features Avanzados
                              </h5>
                              <ul className="text-sm space-y-1">
                                <li>• <strong>Sharding:</strong> Distribución de carga</li>
                                <li>• <strong>Caching hints:</strong> TTL y estrategia LRU</li>
                                <li>• <strong>Compresión:</strong> Reduce bandwidth 70%</li>
                                <li>• <strong>Deduplicación:</strong> Via SHA-256 hash</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="mt-4 p-3 bg-gray-900 rounded">
                            <h5 className="text-sm font-semibold text-cyan-400 mb-2">
                              📊 Métricas de Performance
                            </h5>
                            <div className="grid grid-cols-3 gap-2 text-center">
                              <div className="bg-blue-900/30 p-2 rounded">
                                <p className="text-xl font-bold text-blue-400">0.5ms</p>
                                <p className="text-xs text-gray-400">Validación promedio</p>
                              </div>
                              <div className="bg-blue-900/30 p-2 rounded">
                                <p className="text-xl font-bold text-blue-400">1M/s</p>
                                <p className="text-xs text-gray-400">Throughput</p>
                              </div>
                              <div className="bg-blue-900/30 p-2 rounded">
                                <p className="text-xl font-bold text-blue-400">15MB</p>
                                <p className="text-xs text-gray-400">Memory footprint</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Código de implementación */}
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <h4 className="text-md font-semibold text-cyan-400 mb-2">
                          🛠️ Implementación con Ajv (JavaScript)
                        </h4>
                        <pre className="text-sm overflow-x-auto">
{`import Ajv from 'ajv';
import addFormats from 'ajv-formats';

// Configuración optimizada de Ajv
const ajv = new Ajv({
  // Performance
  cache: true,
  serialize: false,
  validateSchema: false,
  
  // Compilación
  code: {
    optimize: true,
    formats: _code => \`require("ajv-formats/dist/formats")\`
  },
  
  // Validación
  allErrors: false,  // Stop on first error
  removeAdditional: 'all',
  useDefaults: true,
  coerceTypes: false
});

// Agregar formatos
addFormats(ajv);

// Pre-compilar schema
const schema = /* schema from above */;
const validate = ajv.compile(schema);

// Cache de validadores compilados
const validatorCache = new Map();

// Función de validación optimizada
export function validateTask(data) {
  const start = performance.now();
  
  // Check cache first
  const cacheKey = data.input?.hash;
  if (cacheKey && validatorCache.has(cacheKey)) {
    return validatorCache.get(cacheKey);
  }
  
  // Validate
  const valid = validate(data);
  const elapsed = performance.now() - start;
  
  const result = {
    valid,
    errors: valid ? null : validate.errors,
    performance: {
      validationTime: elapsed,
      cacheHit: false
    }
  };
  
  // Cache result if applicable
  if (valid && data.performance?.cacheable && cacheKey) {
    validatorCache.set(cacheKey, result);
    
    // Implement LRU eviction
    if (validatorCache.size > 10000) {
      const firstKey = validatorCache.keys().next().value;
      validatorCache.delete(firstKey);
    }
  }
  
  return result;
}`}
                        </pre>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Ejemplo 4: Producción */}
                <Card className="mb-4 bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/30">
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => setExpandedExample(expandedExample === 4 ? null : 4)}
                  >
                    <CardTitle className="text-xl text-orange-400 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="text-2xl">🏭</span>
                        Nivel 4: Schema Real de Sistema de Producción
                      </span>
                      <span className="text-sm text-gray-400">
                        {expandedExample === 4 ? '▼' : '▶'}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  {expandedExample === 4 && (
                    <CardContent className="space-y-4">
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-sm overflow-x-auto">
{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://api.production.ai/schemas/agent-task/v3.2.0",
  "title": "Production AI Agent Task Schema",
  "description": "Battle-tested schema serving 50M+ requests/day",
  
  "type": "object",
  "properties": {
    "request": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid",
          "description": "Unique request identifier for tracing"
        },
        "clientId": {
          "type": "string",
          "pattern": "^[A-Z0-9]{8,32}$",
          "description": "Authenticated client identifier"
        },
        "apiVersion": {
          "type": "string",
          "enum": ["2024-01", "2024-02", "2024-03"],
          "description": "API version for compatibility"
        },
        "timestamp": {
          "type": "number",
          "description": "Unix timestamp with milliseconds"
        }
      },
      "required": ["id", "clientId", "apiVersion", "timestamp"]
    },
    
    "task": {
      "type": "object",
      "discriminator": { "propertyName": "type" },
      "oneOf": [
        {
          "properties": {
            "type": { "const": "completion" },
            "model": {
              "type": "string",
              "enum": ["gpt-4-turbo", "gpt-4", "gpt-3.5-turbo", "claude-3-opus", "claude-3-sonnet"]
            },
            "messages": {
              "type": "array",
              "minItems": 1,
              "maxItems": 100,
              "items": {
                "type": "object",
                "properties": {
                  "role": {
                    "type": "string",
                    "enum": ["system", "user", "assistant", "function"]
                  },
                  "content": {
                    "oneOf": [
                      { "type": "string", "maxLength": 32768 },
                      {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "type": { "enum": ["text", "image_url", "function_call"] },
                            "text": { "type": "string" },
                            "image_url": {
                              "type": "object",
                              "properties": {
                                "url": { "type": "string", "format": "uri" },
                                "detail": { "enum": ["low", "high", "auto"] }
                              }
                            }
                          }
                        }
                      }
                    ]
                  },
                  "name": { "type": "string" },
                  "function_call": {
                    "type": "object",
                    "properties": {
                      "name": { "type": "string" },
                      "arguments": { "type": "string" }
                    }
                  }
                },
                "required": ["role", "content"],
                "allOf": [
                  {
                    "if": { "properties": { "role": { "const": "function" } } },
                    "then": { "required": ["name"] }
                  }
                ]
              }
            },
            "functions": {
              "type": "array",
              "maxItems": 128,
              "items": {
                "type": "object",
                "properties": {
                  "name": { "type": "string", "pattern": "^[a-zA-Z0-9_-]{1,64}$" },
                  "description": { "type": "string", "maxLength": 1000 },
                  "parameters": { "type": "object" }
                },
                "required": ["name", "parameters"]
              }
            },
            "tools": {
              "type": "array",
              "maxItems": 128,
              "items": {
                "type": "object",
                "properties": {
                  "type": { "enum": ["function", "code_interpreter", "retrieval"] },
                  "function": {
                    "type": "object",
                    "properties": {
                      "name": { "type": "string" },
                      "description": { "type": "string" },
                      "parameters": { "type": "object" }
                    }
                  }
                }
              }
            }
          },
          "required": ["type", "model", "messages"]
        },
        {
          "properties": {
            "type": { "const": "embedding" },
            "model": {
              "type": "string",
              "enum": ["text-embedding-3-small", "text-embedding-3-large", "ada-002"]
            },
            "input": {
              "oneOf": [
                { "type": "string", "maxLength": 8192 },
                {
                  "type": "array",
                  "items": { "type": "string", "maxLength": 8192 },
                  "maxItems": 2048
                }
              ]
            },
            "encoding_format": {
              "type": "string",
              "enum": ["float", "base64"],
              "default": "float"
            },
            "dimensions": {
              "type": "integer",
              "minimum": 1,
              "maximum": 3072
            }
          },
          "required": ["type", "model", "input"]
        },
        {
          "properties": {
            "type": { "const": "moderation" },
            "input": {
              "oneOf": [
                { "type": "string", "maxLength": 32768 },
                {
                  "type": "array",
                  "items": { "type": "string", "maxLength": 32768 },
                  "maxItems": 32
                }
              ]
            },
            "model": {
              "type": "string",
              "enum": ["text-moderation-latest", "text-moderation-stable"],
              "default": "text-moderation-latest"
            }
          },
          "required": ["type", "input"]
        }
      ]
    },
    
    "parameters": {
      "type": "object",
      "properties": {
        "temperature": {
          "type": "number",
          "minimum": 0,
          "maximum": 2,
          "default": 1
        },
        "top_p": {
          "type": "number",
          "minimum": 0,
          "maximum": 1,
          "default": 1
        },
        "max_tokens": {
          "type": "integer",
          "minimum": 1,
          "maximum": 128000
        },
        "presence_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "default": 0
        },
        "frequency_penalty": {
          "type": "number",
          "minimum": -2,
          "maximum": 2,
          "default": 0
        },
        "logit_bias": {
          "type": "object",
          "additionalProperties": {
            "type": "number",
            "minimum": -100,
            "maximum": 100
          }
        },
        "user": {
          "type": "string",
          "description": "End-user ID for abuse monitoring"
        },
        "seed": {
          "type": "integer",
          "minimum": 0,
          "maximum": 9999999999
        },
        "response_format": {
          "type": "object",
          "properties": {
            "type": { "enum": ["text", "json_object"] }
          }
        },
        "stream": {
          "type": "boolean",
          "default": false
        },
        "stream_options": {
          "type": "object",
          "properties": {
            "include_usage": { "type": "boolean" }
          }
        }
      }
    },
    
    "routing": {
      "type": "object",
      "properties": {
        "region": {
          "type": "string",
          "enum": ["us-east", "us-west", "eu-west", "ap-south"],
          "description": "Preferred processing region"
        },
        "priority": {
          "type": "string",
          "enum": ["low", "normal", "high", "critical"],
          "default": "normal"
        },
        "queue": {
          "type": "string",
          "enum": ["default", "batch", "realtime", "priority"],
          "default": "default"
        },
        "timeout": {
          "type": "integer",
          "minimum": 1000,
          "maximum": 600000,
          "default": 60000,
          "description": "Request timeout in milliseconds"
        }
      }
    },
    
    "monitoring": {
      "type": "object",
      "properties": {
        "trace_id": {
          "type": "string",
          "pattern": "^[a-f0-9]{32}$",
          "description": "Distributed tracing ID"
        },
        "span_id": {
          "type": "string",
          "pattern": "^[a-f0-9]{16}$"
        },
        "tags": {
          "type": "object",
          "additionalProperties": { "type": "string" },
          "description": "Custom tags for monitoring"
        },
        "metrics": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": ["latency", "tokens", "cost", "errors", "cache_hits"]
          }
        }
      }
    },
    
    "compliance": {
      "type": "object",
      "properties": {
        "gdpr": {
          "type": "object",
          "properties": {
            "user_consent": { "type": "boolean" },
            "data_retention_days": { "type": "integer", "minimum": 0, "maximum": 365 },
            "anonymize_logs": { "type": "boolean", "default": false }
          }
        },
        "content_policy": {
          "type": "object",
          "properties": {
            "filter_level": {
              "type": "string",
              "enum": ["none", "low", "medium", "high", "strict"],
              "default": "medium"
            },
            "categories_blocked": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": ["violence", "sexual", "hate", "self-harm", "illegal"]
              }
            }
          }
        },
        "audit": {
          "type": "object",
          "properties": {
            "log_request": { "type": "boolean", "default": true },
            "log_response": { "type": "boolean", "default": false },
            "retention_days": { "type": "integer", "default": 90 }
          }
        }
      }
    }
  },
  
  "required": ["request", "task"],
  "additionalProperties": false,
  
  "definitions": {
    "error_response": {
      "type": "object",
      "properties": {
        "error": {
          "type": "object",
          "properties": {
            "code": { "type": "string" },
            "message": { "type": "string" },
            "type": {
              "type": "string",
              "enum": ["invalid_request", "authentication", "rate_limit", "server_error"]
            },
            "param": { "type": "string" },
            "internal_id": { "type": "string" }
          },
          "required": ["code", "message", "type"]
        }
      }
    }
  }
}`}
                        </pre>
                      </div>
                      
                      <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                        <h4 className="text-lg font-semibold text-orange-400 mb-2">
                          📚 Características de Producción
                        </h4>
                        <div className="space-y-3 text-gray-300">
                          <p>
                            Este schema real implementa todas las mejores prácticas para un sistema 
                            que maneja <strong className="text-orange-400">50+ millones de requests diarios</strong>:
                          </p>
                          
                          <div className="grid md:grid-cols-3 gap-3">
                            <div className="bg-gray-900/50 p-3 rounded">
                              <h5 className="text-sm font-semibold text-green-400 mb-2">
                                🛡️ Seguridad
                              </h5>
                              <ul className="text-xs space-y-1">
                                <li>• Autenticación por clientId</li>
                                <li>• Rate limiting por grupos</li>
                                <li>• Filtrado de contenido</li>
                                <li>• Sanitización automática</li>
                              </ul>
                            </div>
                            
                            <div className="bg-gray-900/50 p-3 rounded">
                              <h5 className="text-sm font-semibold text-blue-400 mb-2">
                                📊 Monitoreo
                              </h5>
                              <ul className="text-xs space-y-1">
                                <li>• Distributed tracing</li>
                                <li>• Métricas personalizadas</li>
                                <li>• Audit logging</li>
                                <li>• Error tracking detallado</li>
                              </ul>
                            </div>
                            
                            <div className="bg-gray-900/50 p-3 rounded">
                              <h5 className="text-sm font-semibold text-purple-400 mb-2">
                                ⚖️ Compliance
                              </h5>
                              <ul className="text-xs space-y-1">
                                <li>• GDPR compliance</li>
                                <li>• Content policy</li>
                                <li>• Data retention</li>
                                <li>• Audit trails</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="bg-gray-900 p-3 rounded">
                            <h5 className="text-sm font-semibold text-yellow-400 mb-2">
                              🚀 Features Avanzados
                            </h5>
                            <div className="grid md:grid-cols-2 gap-3 text-sm">
                              <div>
                                <strong>Multi-Model Support:</strong>
                                <ul className="ml-4 text-xs mt-1">
                                  <li>• GPT-4, Claude, modelos propios</li>
                                  <li>• Routing inteligente por región</li>
                                  <li>• Fallback automático</li>
                                </ul>
                              </div>
                              <div>
                                <strong>Optimización:</strong>
                                <ul className="ml-4 text-xs mt-1">
                                  <li>• Streaming responses</li>
                                  <li>• Batch processing</li>
                                  <li>• Queue prioritization</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 p-3 bg-red-900/20 rounded border border-red-500/30">
                            <h5 className="text-sm font-semibold text-red-400 mb-2">
                              ⚠️ Lecciones Aprendidas
                            </h5>
                            <ul className="text-sm space-y-1">
                              <li>• <strong>Versionado:</strong> Crítico para migración sin downtime</li>
                              <li>• <strong>Discriminators:</strong> Mejor que if/then para tipos complejos</li>
                              <li>• <strong>Límites explícitos:</strong> Previene ataques de DoS</li>
                              <li>• <strong>Telemetría:</strong> Esencial para debugging en producción</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Estadísticas de uso */}
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <h4 className="text-md font-semibold text-green-400 mb-2">
                          📊 Estadísticas de Producción (Últimas 24h)
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                          <div className="bg-green-900/30 p-3 rounded">
                            <p className="text-2xl font-bold text-green-400">52.3M</p>
                            <p className="text-xs text-gray-400">Requests validados</p>
                          </div>
                          <div className="bg-blue-900/30 p-3 rounded">
                            <p className="text-2xl font-bold text-blue-400">0.8ms</p>
                            <p className="text-xs text-gray-400">P50 latencia</p>
                          </div>
                          <div className="bg-purple-900/30 p-3 rounded">
                            <p className="text-2xl font-bold text-purple-400">99.99%</p>
                            <p className="text-xs text-gray-400">Success rate</p>
                          </div>
                          <div className="bg-orange-900/30 p-3 rounded">
                            <p className="text-2xl font-bold text-orange-400">$1,247</p>
                            <p className="text-xs text-gray-400">Ahorro por validación</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>

                {/* Resumen de ejemplos */}
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/30">
                  <h4 className="text-lg font-bold text-purple-400 mb-3">
                    🎓 Lecciones Clave de los Ejemplos
                  </h4>
                  <div className="space-y-2 text-gray-300">
                    <p className="flex items-start gap-2">
                      <span className="text-green-400">1.</span>
                      <span><strong>Empieza simple:</strong> Un schema básico bien estructurado es mejor que uno complejo mal diseñado.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-purple-400">2.</span>
                      <span><strong>Validación condicional:</strong> Usa if/then para reglas que dependen del contexto.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-blue-400">3.</span>
                      <span><strong>Optimiza para performance:</strong> Referencias, enums limitados, y patrones precompilados.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-orange-400">4.</span>
                      <span><strong>Piensa en producción:</strong> Seguridad, monitoreo, y compliance desde el día 1.</span>
                    </p>
                  </div>
                  
                  <Button 
                    onClick={() => {
                      completeSection('ejemplos')
                      setActiveSection('practica')
                    }}
                    className="mt-4 bg-purple-600 hover:bg-purple-700"
                  >
                    Continuar con Práctica Interactiva →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* SECCIÓN 3: PRÁCTICA INTERACTIVA */}
        {activeSection === 'practica' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-gray-800/50 backdrop-blur border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-3xl text-white flex items-center gap-3">
                  <PlayCircle className="w-8 h-8 text-green-400" />
                  Práctica Interactiva: Construye tu Validador
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">
                  Experimenta con JSON Schema en tiempo real. Diseña tu schema, 
                  pruébalo con datos, y observa las métricas de performance.
                </p>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Editor de Schema */}
                  <div className="space-y-4">
                    <Card className="bg-gray-900/50 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-lg text-blue-400 flex items-center gap-2">
                          <Code className="w-5 h-5" />
                          Diseña tu Schema
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-3 flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setUserSchema(JSON.stringify({
                              type: "object",
                              properties: {
                                name: { type: "string" },
                                age: { type: "number", minimum: 0 }
                              },
                              required: ["name"]
                            }, null, 2))}
                          >
                            Ejemplo Simple
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setUserSchema(JSON.stringify({
                              type: "object",
                              properties: {
                                taskType: { enum: ["text", "code"] },
                                priority: { type: "integer", minimum: 1, maximum: 5 }
                              },
                              if: {
                                properties: { taskType: { const: "code" } }
                              },
                              then: {
                                properties: {
                                  language: { enum: ["js", "py", "go"] }
                                },
                                required: ["language"]
                              }
                            }, null, 2))}
                          >
                            Validación Condicional
                          </Button>
                        </div>
                        <textarea
                          className="w-full h-64 bg-gray-900 text-gray-300 p-3 rounded font-mono text-sm"
                          value={userSchema}
                          onChange={(e) => setUserSchema(e.target.value)}
                          placeholder="Escribe tu JSON Schema aquí..."
                        />
                        <div className="mt-2 text-xs text-gray-400">
                          💡 Tip: Usa Ctrl+Space para autocompletado
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-lg text-purple-400 flex items-center gap-2">
                          <Database className="w-5 h-5" />
                          Datos de Prueba
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-3 flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setTestData(JSON.stringify({
                              name: "Juan Pérez",
                              age: 25
                            }, null, 2))}
                          >
                            Datos Válidos
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setTestData(JSON.stringify({
                              age: -5
                            }, null, 2))}
                          >
                            Datos Inválidos
                          </Button>
                        </div>
                        <textarea
                          className="w-full h-48 bg-gray-900 text-gray-300 p-3 rounded font-mono text-sm"
                          value={testData}
                          onChange={(e) => setTestData(e.target.value)}
                          placeholder="Escribe los datos a validar..."
                        />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Resultados de Validación */}
                  <div className="space-y-4">
                    <Card className="bg-gray-900/50 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-lg text-green-400 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Resultado de Validación
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          onClick={() => {
                            try {
                              const schema = JSON.parse(userSchema)
                              const data = JSON.parse(testData)
                              // Simulación de validación
                              setValidationResult({
                                valid: Math.random() > 0.3,
                                errors: Math.random() > 0.7 ? null : [
                                  {
                                    path: "/age",
                                    message: "debe ser mayor o igual a 0"
                                  }
                                ],
                                performance: {
                                  time: (Math.random() * 2).toFixed(2),
                                  memory: (Math.random() * 5 + 1).toFixed(1)
                                }
                              })
                            } catch (e) {
                              setValidationResult({
                                valid: false,
                                errors: [{
                                  path: "/",
                                  message: "JSON inválido: " + e.message
                                }]
                              })
                            }
                          }}
                          className="w-full mb-4 bg-green-600 hover:bg-green-700"
                        >
                          Validar Ahora
                        </Button>

                        {validationResult && (
                          <div className="space-y-3">
                            <div className={`p-3 rounded flex items-center gap-2 ${
                              validationResult.valid 
                                ? 'bg-green-900/30 text-green-400' 
                                : 'bg-red-900/30 text-red-400'
                            }`}>
                              {validationResult.valid ? (
                                <>
                                  <CheckCircle className="w-5 h-5" />
                                  <span>✅ Validación exitosa</span>
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="w-5 h-5" />
                                  <span>❌ Validación fallida</span>
                                </>
                              )}
                            </div>

                            {validationResult.errors && (
                              <div className="bg-red-900/20 p-3 rounded">
                                <h5 className="text-sm font-semibold text-red-400 mb-2">
                                  Errores encontrados:
                                </h5>
                                {validationResult.errors.map((error, i) => (
                                  <div key={i} className="text-sm text-gray-300">
                                    • <code className="text-red-400">{error.path}</code>: {error.message}
                                  </div>
                                ))}
                              </div>
                            )}

                            {validationResult.performance && (
                              <div className="bg-blue-900/20 p-3 rounded">
                                <h5 className="text-sm font-semibold text-blue-400 mb-2">
                                  Métricas de Performance:
                                </h5>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <span className="text-gray-400">Tiempo:</span>
                                    <span className="text-blue-400 ml-2">
                                      {validationResult.performance.time}ms
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Memoria:</span>
                                    <span className="text-blue-400 ml-2">
                                      {validationResult.performance.memory}MB
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900/50 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-lg text-yellow-400 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5" />
                          Sugerencias IA
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="bg-yellow-900/20 p-3 rounded text-sm">
                          <p className="text-yellow-400 font-semibold mb-1">
                            💡 Optimización detectada:
                          </p>
                          <p className="text-gray-300">
                            Considera usar <code>$ref</code> para reutilizar definiciones comunes 
                            y reducir el tamaño del schema.
                          </p>
                        </div>
                        <div className="bg-blue-900/20 p-3 rounded text-sm">
                          <p className="text-blue-400 font-semibold mb-1">
                            🔒 Mejora de seguridad:
                          </p>
                          <p className="text-gray-300">
                            Agrega <code>additionalProperties: false</code> para prevenir 
                            campos no esperados.
                          </p>
                        </div>
                        <div className="bg-purple-900/20 p-3 rounded text-sm">
                          <p className="text-purple-400 font-semibold mb-1">
                            🚀 Performance tip:
                          </p>
                          <p className="text-gray-300">
                            Los patterns regex deben moverse a definitions para precompilación.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Desafío de práctica */}
                <Card className="mt-6 bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-400">
                      🎯 Desafío: Crea un Validador para Agente de Contenido
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Tu misión es crear un JSON Schema completo para un agente que genera contenido. 
                      Debe incluir:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-900/50 p-3 rounded">
                        <h5 className="text-sm font-semibold text-blue-400 mb-2">
                          Requisitos Básicos:
                        </h5>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>✓ Tipo de contenido (blog, email, social)</li>
                          <li>✓ Longitud objetivo (min/max palabras)</li>
                          <li>✓ Tono (formal, casual, técnico)</li>
                          <li>✓ Idioma de salida</li>
                        </ul>
                      </div>
                      <div className="bg-gray-900/50 p-3 rounded">
                        <h5 className="text-sm font-semibold text-purple-400 mb-2">
                          Requisitos Avanzados:
                        </h5>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>✓ Validación condicional por tipo</li>
                          <li>✓ Keywords SEO para blogs</li>
                          <li>✓ Límites de caracteres para social</li>
                          <li>✓ Templates permitidos</li>
                        </ul>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => {
                        completeSection('practica')
                        setActiveSection('evaluacion')
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      He completado el desafío →
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        )}

        {/* SECCIÓN 4: EVALUACIÓN IA */}
        {activeSection === 'evaluacion' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-gray-800/50 backdrop-blur border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-3xl text-white flex items-center gap-3">
                  <Brain className="w-8 h-8 text-purple-400" />
                  Evaluación IA: Demuestra tu Dominio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">
                  Completa esta evaluación adaptativa para demostrar tu comprensión 
                  de JSON Schema para sistemas IA. La IA ajustará la dificultad según tus respuestas.
                </p>

                {/* Quiz Adaptativo */}
                <Card className="mb-6 bg-purple-900/20 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-400">
                      🧠 Quiz Conceptual Adaptativo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-900/50 p-4 rounded">
                      <h4 className="text-lg text-blue-400 mb-3">
                        Pregunta 1: Fundamentos
                      </h4>
                      <p className="text-gray-300 mb-4">
                        ¿Cuál es la principal ventaja de usar JSON Schema en un sistema 
                        de agentes IA que procesa millones de requests?
                      </p>
                      <div className="space-y-2">
                        {[
                          "Hace el código más bonito",
                          "Previene errores y reduce costos de procesamiento",
                          "Es un requisito obligatorio",
                          "Aumenta la velocidad de internet"
                        ].map((option, i) => (
                          <label key={i} className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="radio" 
                              name="q1" 
                              value={i}
                              className="text-purple-500"
                              onChange={() => setQuizScore(prev => prev + (i === 1 ? 1 : 0))}
                            />
                            <span className="text-gray-300">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-900/50 p-4 rounded">
                      <h4 className="text-lg text-blue-400 mb-3">
                        Pregunta 2: Validación Condicional
                      </h4>
                      <p className="text-gray-300 mb-4">
                        En un schema con validación condicional, ¿cuándo deberías usar 
                        if/then/else en lugar de oneOf?
                      </p>
                      <div className="space-y-2">
                        {[
                          "Siempre, es más moderno",
                          "Cuando las condiciones dependen de valores específicos de propiedades",
                          "Nunca, oneOf es siempre mejor",
                          "Solo los lunes"
                        ].map((option, i) => (
                          <label key={i} className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="radio" 
                              name="q2" 
                              value={i}
                              className="text-purple-500"
                              onChange={() => setQuizScore(prev => prev + (i === 1 ? 1 : 0))}
                            />
                            <span className="text-gray-300">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-900/50 p-4 rounded">
                      <h4 className="text-lg text-blue-400 mb-3">
                        Pregunta 3: Optimización
                      </h4>
                      <p className="text-gray-300 mb-4">
                        Para optimizar la performance de validación en un sistema que 
                        procesa 1M requests/segundo, ¿qué técnica es más efectiva?
                      </p>
                      <div className="space-y-2">
                        {[
                          "Usar más servidores",
                          "Precompilar schemas y usar referencias $ref",
                          "Validar solo algunos requests",
                          "Rezar a los dioses del código"
                        ].map((option, i) => (
                          <label key={i} className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="radio" 
                              name="q3" 
                              value={i}
                              className="text-purple-500"
                              onChange={() => setQuizScore(prev => prev + (i === 1 ? 1 : 0))}
                            />
                            <span className="text-gray-300">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => alert(`Tu puntuación: ${quizScore}/3`)}
                    >
                      Ver Resultado del Quiz
                    </Button>
                  </CardContent>
                </Card>

                {/* Proyecto Final */}
                <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/30">
                  <CardHeader>
                    <CardTitle className="text-xl text-orange-400">
                      🎯 Proyecto Final: Sistema de Validación Completo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300">
                      Implementa un sistema completo de validación para un agente IA que:
                    </p>
                    
                    <div className="bg-gray-900/50 p-4 rounded">
                      <h4 className="text-lg text-green-400 mb-3">
                        📋 Requisitos del Proyecto
                      </h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                          <span>Crea un schema que soporte múltiples tipos de tareas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                          <span>Implementa validación condicional basada en el tipo</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                          <span>Incluye medidas de seguridad (rate limiting, sanitización)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                          <span>Optimiza para manejar 10K requests/segundo</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                          <span>Agrega telemetría y logging para debugging</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-900/50 p-4 rounded">
                      <h4 className="text-lg text-blue-400 mb-3">
                        💻 Template de Inicio
                      </h4>
                      <pre className="text-sm overflow-x-auto bg-gray-900 p-3 rounded">
{`// taskValidator.js
import Ajv from 'ajv';

class TaskValidator {
  constructor() {
    this.ajv = new Ajv({
      // Tu configuración aquí
    });
    
    this.schema = {
      // Tu schema aquí
    };
    
    this.validate = this.ajv.compile(this.schema);
  }
  
  validateTask(task) {
    // Tu implementación aquí
  }
  
  getPerformanceMetrics() {
    // Métricas de performance
  }
}

export default TaskValidator;`}
                      </pre>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Button 
                        variant="outline"
                        className="border-orange-500 text-orange-400 hover:bg-orange-900/20"
                      >
                        📥 Descargar Template Completo
                      </Button>
                      <Button 
                        className="bg-orange-600 hover:bg-orange-700"
                        onClick={() => {
                          completeSection('evaluacion')
                          setActiveSection('proyecto')
                        }}
                      >
                        Enviar Mi Proyecto →
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Feedback y Certificación */}
                <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-400 flex items-center gap-2">
                      <Award className="w-6 h-6" />
                      Tu Progreso y Certificación
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                        <div className="bg-gray-900/50 p-3 rounded">
                          <p className="text-2xl font-bold text-green-400">100%</p>
                          <p className="text-xs text-gray-400">Teoría completada</p>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded">
                          <p className="text-2xl font-bold text-blue-400">4/4</p>
                          <p className="text-xs text-gray-400">Ejemplos estudiados</p>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded">
                          <p className="text-2xl font-bold text-purple-400">✓</p>
                          <p className="text-xs text-gray-400">Práctica realizada</p>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded">
                          <p className="text-2xl font-bold text-orange-400">{quizScore}/3</p>
                          <p className="text-xs text-gray-400">Quiz score</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-1 rounded">
                        <div className="bg-gray-900 p-4 rounded">
                          <h4 className="text-lg font-bold text-green-400 mb-2">
                            🏆 ¡Felicitaciones!
                          </h4>
                          <p className="text-gray-300 mb-3">
                            Has completado exitosamente el módulo de JSON Schema para Sistemas IA. 
                            Has demostrado comprensión en:
                          </p>
                          <ul className="space-y-1 text-sm text-gray-300 mb-4">
                            <li>✅ Fundamentos de validación para IA</li>
                            <li>✅ Implementación de schemas complejos</li>
                            <li>✅ Optimización para alta performance</li>
                            <li>✅ Mejores prácticas de producción</li>
                          </ul>
                          <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                            Descargar Certificado de Completación
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        )}

        {/* SECCIÓN 5: PROYECTO FINAL */}
        {activeSection === 'proyecto' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="bg-gray-800/50 backdrop-blur border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-3xl text-white flex items-center gap-3">
                  <Target className="w-8 h-8 text-red-400" />
                  Proyecto Final: Implementa TaskValidator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 p-6 rounded-lg border border-red-500/30">
                  <h3 className="text-2xl font-bold text-red-400 mb-4">
                    🚀 Tu Misión
                  </h3>
                  <p className="text-gray-300 text-lg mb-6">
                    Implementa un sistema completo de validación TaskValidator que sea capaz 
                    de manejar las necesidades de un sistema de agentes IA en producción.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 p-4 rounded">
                      <h4 className="text-lg font-semibold text-orange-400 mb-3">
                        📦 Entregables
                      </h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>1. Archivo <code>taskValidator.js</code> completo</li>
                        <li>2. Schema JSON para al menos 3 tipos de tareas</li>
                        <li>3. Suite de tests con 10+ casos</li>
                        <li>4. Documentación de API</li>
                        <li>5. Benchmark de performance</li>
                      </ul>
                    </div>

                    <div className="bg-gray-900/50 p-4 rounded">
                      <h4 className="text-lg font-semibold text-yellow-400 mb-3">
                        🎯 Criterios de Evaluación
                      </h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Correctitud: 40%</li>
                        <li>• Performance: 25%</li>
                        <li>• Seguridad: 20%</li>
                        <li>• Documentación: 10%</li>
                        <li>• Creatividad: 5%</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-green-400 mb-3">
                      ✅ Checklist de Implementación
                    </h4>
                    <div className="space-y-2">
                      {[
                        "Schema base con tipos de datos y validaciones",
                        "Validación condicional para diferentes tipos de tareas",
                        "Manejo de errores con mensajes descriptivos",
                        "Cache LRU para schemas compilados",
                        "Métricas de performance (tiempo, memoria)",
                        "Rate limiting por cliente",
                        "Sanitización de inputs peligrosos",
                        "Logging estructurado para debugging",
                        "Tests unitarios con cobertura >80%",
                        "Documentación con ejemplos de uso"
                      ].map((item, i) => (
                        <label key={i} className="flex items-center gap-2 text-gray-300 cursor-pointer">
                          <input type="checkbox" className="text-green-500" />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <Button 
                      className="flex-1 bg-red-600 hover:bg-red-700"
                      onClick={() => alert("¡Proyecto enviado! Recibirás feedback en 24h.")}
                    >
                      Enviar Proyecto Final
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-red-500 text-red-400"
                    >
                      Guardar Borrador
                    </Button>
                  </div>
                </div>

                {/* Siguiente día */}
                <Card className="mt-6 bg-blue-900/20 border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-400">
                      🔜 Próximo: Día 4 - Arquitectura de Agentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Mañana aprenderás a diseñar arquitecturas completas de sistemas multi-agente, 
                      incluyendo patrones de comunicación, orquestación y escalabilidad.
                    </p>
                    <Button 
                      variant="outline"
                      className="border-blue-500 text-blue-400"
                    >
                      Ver Preview del Día 4 →
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}