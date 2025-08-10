// Project Step Components for F1-M1-S1-D1
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  CheckCircle, CheckCircle2, XCircle, PlayCircle, 
  Send, Folder
} from 'lucide-react'

function ProjectSetupComponent({ onUpdate, state }: { onUpdate: (key: string, value: any) => void, state: any }) {
  const [selectedStructure, setSelectedStructure] = useState(state.structure || '')
  const [projectName, setProjectName] = useState(state.projectName || '')
  const [apiKey, setApiKey] = useState(state.apiKey || '')

  React.useEffect(() => {
    onUpdate('structure', selectedStructure)
    onUpdate('config', projectName && apiKey)
  }, [selectedStructure, projectName, apiKey, onUpdate])

  const structures = [
    { id: 'basic', name: 'Estructura Básica', folders: ['src/', 'src/agents/', 'config/', 'tests/'] },
    { id: 'modular', name: 'Arquitectura Modular', folders: ['src/', 'src/core/', 'src/agents/', 'src/services/', 'tests/', 'docs/'] }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-200 mb-3">1. Configuración del Proyecto</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Nombre del Proyecto</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="mi-agente-ia"
              className="w-full p-3 bg-gray-900 border border-gray-600 rounded text-gray-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">API Key (simulada)</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full p-3 bg-gray-900 border border-gray-600 rounded text-gray-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-200 mb-3">2. Selecciona la Estructura</h4>
        <div className="space-y-3">
          {structures.map(structure => (
            <Card 
              key={structure.id}
              className={`cursor-pointer transition-all ${selectedStructure === structure.id
                ? 'border-blue-500 bg-blue-900/20'
                : 'border-gray-600 hover:border-gray-500'}`}
              onClick={() => setSelectedStructure(structure.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-gray-200">{structure.name}</h5>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {structure.folders.map(folder => (
                        <span key={folder} className="text-xs bg-gray-700 px-2 py-1 rounded">
                          <Folder className="inline w-3 h-3 mr-1" />{folder}
                        </span>
                      ))}
                    </div>
                  </div>
                  <CheckCircle className={`w-6 h-6 ${selectedStructure === structure.id ? 'text-blue-400' : 'text-gray-600'}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectImplementationComponent({ onUpdate, state }: { onUpdate: (key: string, value: any) => void, state: any }) {
  const [agentCode, setAgentCode] = useState(state.agentCode || `class MiAgente {
  constructor(config) {
    // Implementa tu constructor aquí
  }

  async process(input) {
    // Implementa la lógica del agente
  }
}`)
  const [validationResults, setValidationResults] = useState<any[]>([])

  React.useEffect(() => {
    const results = validateCode(agentCode)
    setValidationResults(results)
    
    onUpdate('constructor', results.some(r => r.type === 'constructor' && r.valid))
    onUpdate('process', results.some(r => r.type === 'process' && r.valid))
    onUpdate('error-handling', results.some(r => r.type === 'error-handling' && r.valid))
  }, [agentCode, onUpdate])

  const validateCode = (code: string) => [
    {
      type: 'constructor',
      valid: code.includes('constructor') && code.includes('this.'),
      message: code.includes('constructor') && code.includes('this.') ? 'Constructor implementado' : 'Agrega constructor con propiedades'
    },
    {
      type: 'process',
      valid: code.includes('async process') && code.includes('input'),
      message: code.includes('async process') && code.includes('input') ? 'Método process implementado' : 'Agrega método async process(input)'
    },
    {
      type: 'error-handling',
      valid: code.includes('try') && code.includes('catch'),
      message: code.includes('try') && code.includes('catch') ? 'Manejo de errores implementado' : 'Agrega try-catch para errores'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-200 mb-3">Implementa tu Agente</h4>
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">MiAgente.js</span>
              <div className="flex items-center gap-2">
                {validationResults.filter(r => r.valid).length > 0 && (
                  <span className="text-xs text-green-400">
                    {validationResults.filter(r => r.valid).length}/3 ✓
                  </span>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <textarea
              value={agentCode}
              onChange={(e) => setAgentCode(e.target.value)}
              className="w-full h-80 bg-gray-800 border border-gray-600 rounded p-4 font-mono text-sm text-gray-200 focus:border-blue-500 focus:outline-none"
            />
          </CardContent>
        </Card>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-200 mb-3">Validación en Tiempo Real</h4>
        <div className="space-y-2">
          {validationResults.map((result, index) => (
            <div key={index} className={`flex items-center gap-3 p-3 rounded ${
              result.valid ? 'bg-green-900/20 border border-green-600' : 'bg-red-900/20 border border-red-600'
            }`}>
              {result.valid ? (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
              <span className={`text-sm ${result.valid ? 'text-green-300' : 'text-red-300'}`}>
                {result.message}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectTestingComponent({ onUpdate, state }: { onUpdate: (key: string, value: any) => void, state: any }) {
  const [testCode, setTestCode] = useState(state.testCode || '')
  const [testResults, setTestResults] = useState<any>(null)
  const [runningTests, setRunningTests] = useState(false)

  React.useEffect(() => {
    onUpdate('unit-tests', testCode.includes('describe') && testCode.includes('test'))
    onUpdate('integration-tests', testCode.includes('mock') || testCode.includes('fetch'))
  }, [testCode, onUpdate])

  const runTests = async () => {
    setRunningTests(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const results = {
      total: 4,
      passed: testCode.includes('test') ? 3 : 1,
      failed: testCode.includes('test') ? 1 : 3,
      coverage: testCode.includes('test') ? 85 : 25
    }
    
    setTestResults(results)
    setRunningTests(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-200 mb-3">Implementa Tests para tu Agente</h4>
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">MiAgente.test.js</span>
              <Button size="sm" variant="ghost" onClick={runTests} disabled={runningTests}>
                {runningTests ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <PlayCircle className="w-4 h-4" />
                )}
                {runningTests ? 'Ejecutando...' : 'Ejecutar Tests'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <textarea
              value={testCode}
              onChange={(e) => setTestCode(e.target.value)}
              placeholder={`describe('MiAgente', () => {
  test('constructor inicializa propiedades', () => {
    const agent = new MiAgente({ name: 'Test' })
    expect(agent.name).toBe('Test')
  })

  test('process devuelve respuesta', async () => {
    const agent = new MiAgente({ name: 'Test' })
    const result = await agent.process('Hola')
    expect(result).toBeDefined()
  })
})`}
              className="w-full h-64 bg-gray-800 border border-gray-600 rounded p-4 font-mono text-sm text-gray-200 focus:border-blue-500 focus:outline-none"
            />
          </CardContent>
        </Card>
      </div>

      {testResults && (
        <Card className="bg-gray-800/50 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-lg text-green-400">Resultados de Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">{testResults.passed}</div>
                <div className="text-sm text-gray-400">Pasaron</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">{testResults.failed}</div>
                <div className="text-sm text-gray-400">Fallaron</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">{testResults.total}</div>
                <div className="text-sm text-gray-400">Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">{testResults.coverage}%</div>
                <div className="text-sm text-gray-400">Cobertura</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function ProjectDeliveryComponent({ onUpdate, state, onDeliver, isDelivering }: {
  onUpdate: (key: string, value: any) => void
  state: any
  onDeliver: () => void
  isDelivering: boolean
}) {
  const [documentation, setDocumentation] = useState(state.documentation || '')
  const [checkedItems, setCheckedItems] = useState<string[]>(state.checkedItems || [])

  React.useEffect(() => {
    onUpdate('documentation', documentation.length > 100)
    onUpdate('code-quality', checkedItems.length >= 3)
  }, [documentation, checkedItems, onUpdate])

  const deliveryChecklist = [
    'El código está bien comentado',
    'Todos los tests pasan',
    'Manejo de errores implementado',
    'Documentación completa',
    'Código sigue buenas prácticas'
  ]

  const toggleCheck = (item: string) => {
    const newChecked = checkedItems.includes(item)
      ? checkedItems.filter(i => i !== item)
      : [...checkedItems, item]
    setCheckedItems(newChecked)
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-200 mb-3">Documentación del Proyecto</h4>
        <textarea
          value={documentation}
          onChange={(e) => setDocumentation(e.target.value)}
          placeholder="Describe tu agente: qué hace, cómo funciona, cómo usarlo..."
          className="w-full h-32 bg-gray-900 border border-gray-600 rounded p-4 text-gray-200 focus:border-blue-500 focus:outline-none"
        />
        <p className="text-xs text-gray-400 mt-2">Mínimo 100 caracteres ({documentation.length}/100)</p>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-200 mb-3">Lista de Verificación</h4>
        <div className="space-y-2">
          {deliveryChecklist.map(item => (
            <div
              key={item}
              className={`flex items-center gap-3 p-3 rounded cursor-pointer transition-all ${
                checkedItems.includes(item)
                  ? 'bg-green-900/20 border border-green-600'
                  : 'bg-gray-800 border border-gray-600 hover:border-gray-500'
              }`}
              onClick={() => toggleCheck(item)}
            >
              <CheckCircle className={`w-5 h-5 ${
                checkedItems.includes(item) ? 'text-green-400' : 'text-gray-600'
              }`} />
              <span className={`text-sm ${checkedItems.includes(item) ? 'text-green-300' : 'text-gray-300'}`}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button
          onClick={onDeliver}
          disabled={isDelivering || documentation.length < 100 || checkedItems.length < 3}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
        >
          {isDelivering ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Procesando Entrega...
            </>
          ) : (
            <>
              <Send className="mr-2 w-5 h-5" />
              Entregar Proyecto Final
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export {
  ProjectSetupComponent,
  ProjectImplementationComponent,
  ProjectTestingComponent,
  ProjectDeliveryComponent
}