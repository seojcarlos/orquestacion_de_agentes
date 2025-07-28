import React, { ReactNode, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  AlertCircle, 
  CheckCircle, 
  Code, 
  Database, 
  Lightbulb, 
  PlayCircle,
  RefreshCw,
  Zap
} from 'lucide-react'

interface InteractiveDemoProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function InteractiveDemo({ 
  title, 
  description, 
  children, 
  className = '' 
}: InteractiveDemoProps) {
  return (
    <Card className={`bg-gray-800/50 backdrop-blur border-blue-500/30 ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center gap-3">
          <PlayCircle className="w-6 h-6 text-green-400" />
          {title}
        </CardTitle>
        {description && (
          <p className="text-gray-300 mt-2">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

interface SchemaValidatorProps {
  initialSchema?: string
  initialData?: string
  onValidate?: (schema: string, data: string) => any
}

export function SchemaValidatorSimulator({ 
  initialSchema = '{}',
  initialData = '{}',
  onValidate
}: SchemaValidatorProps) {
  const [userSchema, setUserSchema] = useState(initialSchema)
  const [testData, setTestData] = useState(initialData)
  const [validationResult, setValidationResult] = useState<any>(null)
  const [isValidating, setIsValidating] = useState(false)

  const handleValidate = async () => {
    setIsValidating(true)
    try {
      const result = onValidate ? 
        await onValidate(userSchema, testData) :
        simulateValidation(userSchema, testData)
      setValidationResult(result)
    } catch (error) {
      setValidationResult({
        valid: false,
        errors: [{
          path: '/',
          message: error.message || 'Error de validación'
        }]
      })
    } finally {
      setIsValidating(false)
    }
  }

  const simulateValidation = (schema: string, data: string) => {
    try {
      JSON.parse(schema)
      JSON.parse(data)
      
      const isValid = Math.random() > 0.3
      return {
        valid: isValid,
        errors: isValid ? null : [
          {
            path: '/property',
            message: 'El valor no cumple con el schema'
          }
        ],
        performance: {
          time: (Math.random() * 2).toFixed(2),
          memory: (Math.random() * 5 + 1).toFixed(1)
        }
      }
    } catch (e) {
      return {
        valid: false,
        errors: [{
          path: '/',
          message: `JSON inválido: ${e.message}`
        }]
      }
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
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

      <div className="space-y-4">
        <ValidationResult 
          result={validationResult}
          isValidating={isValidating}
          onValidate={handleValidate}
        />
        
        <AISuggestions schema={userSchema} />
      </div>
    </div>
  )
}

interface ValidationResultProps {
  result: any
  isValidating: boolean
  onValidate: () => void
}

function ValidationResult({ result, isValidating, onValidate }: ValidationResultProps) {
  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg text-green-400 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Resultado de Validación
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={onValidate}
          disabled={isValidating}
          className="w-full mb-4 bg-green-600 hover:bg-green-700"
        >
          {isValidating ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Validando...
            </>
          ) : (
            'Validar Ahora'
          )}
        </Button>

        {result && (
          <div className="space-y-3">
            <div className={`p-3 rounded flex items-center gap-2 ${
              result.valid 
                ? 'bg-green-900/30 text-green-400' 
                : 'bg-red-900/30 text-red-400'
            }`}>
              {result.valid ? (
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

            {result.errors && (
              <div className="bg-red-900/20 p-3 rounded">
                <h5 className="text-sm font-semibold text-red-400 mb-2">
                  Errores encontrados:
                </h5>
                {result.errors.map((error: any, i: number) => (
                  <div key={i} className="text-sm text-gray-300">
                    • <code className="text-red-400">{error.path}</code>: {error.message}
                  </div>
                ))}
              </div>
            )}

            {result.performance && (
              <div className="bg-blue-900/20 p-3 rounded">
                <h5 className="text-sm font-semibold text-blue-400 mb-2">
                  Métricas de Performance:
                </h5>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-400">Tiempo:</span>
                    <span className="text-blue-400 ml-2">
                      {result.performance.time}ms
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Memoria:</span>
                    <span className="text-blue-400 ml-2">
                      {result.performance.memory}MB
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface AISuggestionsProps {
  schema: string
}

function AISuggestions({ schema }: AISuggestionsProps) {
  const getSuggestions = () => {
    const suggestions = []
    
    try {
      const parsedSchema = JSON.parse(schema)
      
      if (!parsedSchema.additionalProperties === undefined) {
        suggestions.push({
          type: 'security',
          icon: '🔒',
          title: 'Mejora de seguridad',
          description: 'Agrega additionalProperties: false para prevenir campos no esperados.'
        })
      }
      
      if (!parsedSchema.$ref && Object.keys(parsedSchema).length > 10) {
        suggestions.push({
          type: 'optimization',
          icon: '💡',
          title: 'Optimización detectada',
          description: 'Considera usar $ref para reutilizar definiciones comunes y reducir el tamaño del schema.'
        })
      }
      
      if (JSON.stringify(parsedSchema).includes('pattern') && !parsedSchema.definitions) {
        suggestions.push({
          type: 'performance',
          icon: '🚀',
          title: 'Performance tip',
          description: 'Los patterns regex deben moverse a definitions para precompilación.'
        })
      }
    } catch (e) {
      suggestions.push({
        type: 'error',
        icon: '⚠️',
        title: 'Schema inválido',
        description: 'Corrige el JSON antes de continuar.'
      })
    }
    
    return suggestions
  }

  const suggestions = getSuggestions()

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg text-yellow-400 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Sugerencias IA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.length > 0 ? (
          suggestions.map((suggestion, i) => (
            <div 
              key={i} 
              className={`p-3 rounded text-sm ${
                suggestion.type === 'security' ? 'bg-yellow-900/20' :
                suggestion.type === 'optimization' ? 'bg-blue-900/20' :
                suggestion.type === 'performance' ? 'bg-purple-900/20' :
                'bg-red-900/20'
              }`}
            >
              <p className={`font-semibold mb-1 ${
                suggestion.type === 'security' ? 'text-yellow-400' :
                suggestion.type === 'optimization' ? 'text-blue-400' :
                suggestion.type === 'performance' ? 'text-purple-400' :
                'text-red-400'
              }`}>
                {suggestion.icon} {suggestion.title}
              </p>
              <p className="text-gray-300">{suggestion.description}</p>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-sm">
            <Zap className="w-5 h-5 mb-2" />
            <p>¡Tu schema se ve bien! Continúa experimentando.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}