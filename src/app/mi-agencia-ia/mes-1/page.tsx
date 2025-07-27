'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Code, CheckCircle, Circle, BookOpen, Terminal, FileCode } from 'lucide-react'

export default function Mes1Page() {
  const [activeWeek, setActiveWeek] = useState(1)
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())

  const toggleTask = (taskId: string) => {
    const newCompleted = new Set(completedTasks)
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId)
    } else {
      newCompleted.add(taskId)
    }
    setCompletedTasks(newCompleted)
  }

  const weeks = [
    {
      id: 1,
      title: 'Configuración del Entorno y Fundamentos',
      description: 'Montar un esqueleto de proyecto profesional y asimilar los principios de código limpio',
      resources: [
        { type: 'book', name: 'Clean Code - Robert Martin', chapters: 'Cap 1-4' },
        { type: 'course', name: 'Node.js Design Patterns', link: '#' }
      ],
      days: [
        {
          day: 'Lunes',
          tasks: [
            {
              id: 'w1-d1-t1',
              type: 'theory',
              title: 'Leer Introducción y Capítulos 1-2 de Clean Code',
              description: 'Reflexionar sobre cómo un buen nombre elimina comentarios'
            },
            {
              id: 'w1-d1-t2',
              type: 'practice',
              title: 'Crear estructura del proyecto',
              description: 'Ejecutar comandos de setup inicial y crear estructura de directorios',
              code: `mkdir mi-agencia-ia && cd mi-agencia-ia
npm init -y
npm install express dotenv
mkdir -p src/{core,agents,prompts,ui}
echo '{"$schema": "http://json-schema.org/draft-07/schema#"}' > src/core/task.schema.json

git init
git add .
git commit -m "🚀 feat: Initial project structure and core configuration"`
            }
          ]
        },
        {
          day: 'Martes',
          tasks: [
            {
              id: 'w1-d2-t1',
              type: 'theory',
              title: 'Estudiar el Átomo de Trabajo',
              description: 'Analizar cada campo del task.schema.json y su propósito de negocio'
            },
            {
              id: 'w1-d2-t2',
              type: 'practice',
              title: 'Implementar task.schema.json',
              description: 'Escribir el esquema completo a mano con documentación',
              code: `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Task Schema v1.0",
  "type": "object",
  "required": ["taskId", "projectId", "status", "requesterAgent", "targetAgent", "input", "createdAt"],
  "properties": {
    "taskId": {
      "type": "string",
      "format": "uuid",
      "description": "UUID único para la tarea"
    },
    "status": {
      "type": "string",
      "enum": ["pending", "queued", "in_progress", "needs_validation", "completed", "failed", "cancelled"],
      "description": "Estado actual de la tarea"
    }
    // ... más propiedades
  }
}`
            }
          ]
        },
        {
          day: 'Miércoles',
          tasks: [
            {
              id: 'w1-d3-t1',
              type: 'theory',
              title: 'Funciones y Comentarios (Cap 3-4)',
              description: 'Funciones cortas, una sola responsabilidad, pocos argumentos'
            },
            {
              id: 'w1-d3-t2',
              type: 'practice',
              title: 'Crear BaseAgent.js',
              description: 'Clase padre con interfaz para todos los agentes',
              code: `/**
 * BaseAgent - Contrato base para todos los agentes del sistema
 * Define la interfaz que deben implementar todos los agentes
 */
class BaseAgent {
  constructor(taskManager, promptManager) {
    this.taskManager = taskManager;
    this.promptManager = promptManager;
  }

  async processTask(task) {
    throw new Error('processTask must be implemented by subclass');
  }

  validateTask(task) {
    // Validación contra schema
  }
}`
            }
          ]
        },
        {
          day: 'Jueves',
          tasks: [
            {
              id: 'w1-d4-t1',
              type: 'theory',
              title: 'Patrón Inyección de Dependencias',
              description: 'TaskManager recibe dependencias, no las crea'
            },
            {
              id: 'w1-d4-t2',
              type: 'practice',
              title: 'Esqueleto de TaskManager',
              description: 'Constructor y métodos públicos documentados',
              code: `class TaskManager {
  /**
   * @param {Database} db - Instancia de base de datos
   * @param {EventBus} eventBus - Bus de eventos para comunicación
   */
  constructor(db, eventBus) {
    this.db = db;
    this.eventBus = eventBus;
  }

  /**
   * Crea una nueva tarea siguiendo el schema
   * @returns {Promise<Task>} La tarea creada
   */
  async createTask({ projectId, requesterAgent, targetAgent, input, priority = 5 }) {
    // TODO: Implement
  }
}`
            }
          ]
        },
        {
          day: 'Viernes',
          tasks: [
            {
              id: 'w1-d5-t1',
              type: 'theory',
              title: 'Tests F.I.R.S.T',
              description: 'Fast, Independent, Repeatable, Self-Validating, Timely'
            },
            {
              id: 'w1-d5-t2',
              type: 'practice',
              title: 'Primer test del schema',
              description: 'Validar objetos válidos e inválidos',
              code: `// tests/task.schema.test.js
const { validateTask } = require('../src/core/taskValidator');

describe('Task Schema Validation', () => {
  test('should validate a valid task', () => {
    const validTask = {
      taskId: '123e4567-e89b-12d3-a456-426614174000',
      projectId: '123e4567-e89b-12d3-a456-426614174001',
      status: 'pending',
      // ... resto de campos requeridos
    };
    
    const result = validateTask(validTask);
    expect(result.valid).toBe(true);
  });
});`
            }
          ]
        }
      ]
    }
  ]

  const currentWeek = weeks.find(w => w.id === activeWeek) || weeks[0]

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/mi-agencia-ia"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Mes 1: El Núcleo del Sistema</h1>
                <p className="text-gray-400 text-sm">Task Management - Fundamentos sólidos</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progreso del Mes</span>
            <span className="text-sm text-gray-400">
              {completedTasks.size} de 20 tareas completadas
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${(completedTasks.size / 20) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Week Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((week) => (
            <button
              key={week}
              onClick={() => setActiveWeek(week)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeWeek === week
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              Semana {week}
            </button>
          ))}
        </div>
      </div>

      {/* Week Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{currentWeek.title}</h2>
          <p className="text-gray-400">{currentWeek.description}</p>
        </div>

        {/* Resources */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            Recursos de la Semana
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentWeek.resources.map((resource, idx) => (
              <div key={idx} className="flex items-start gap-3">
                {resource.type === 'book' ? (
                  <FileCode className="w-5 h-5 text-purple-400 mt-0.5" />
                ) : (
                  <Terminal className="w-5 h-5 text-green-400 mt-0.5" />
                )}
                <div>
                  <p className="font-medium">{resource.name}</p>
                  {resource.chapters && (
                    <p className="text-sm text-gray-400">{resource.chapters}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Tasks */}
        <div className="space-y-6">
          {currentWeek.days.map((day) => (
            <div key={day.day} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h4 className="text-xl font-semibold mb-4 text-blue-400">{day.day}</h4>
              <div className="space-y-4">
                {day.tasks.map((task) => (
                  <div key={task.id} className="border border-gray-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="mt-0.5"
                      >
                        {completedTasks.has(task.id) ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-600 hover:text-gray-400" />
                        )}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {task.type === 'theory' ? (
                            <span className="text-xs bg-purple-900/50 text-purple-400 px-2 py-1 rounded">
                              Teoría
                            </span>
                          ) : (
                            <span className="text-xs bg-green-900/50 text-green-400 px-2 py-1 rounded">
                              Práctica
                            </span>
                          )}
                          <h5 className="font-medium">{task.title}</h5>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">{task.description}</p>
                        {task.code && (
                          <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-sm">
                              <code className="language-javascript">{task.code}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12">
          <Link
            href="/mi-agencia-ia/roadmap"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Roadmap
          </Link>
          {activeWeek < 4 ? (
            <button
              onClick={() => setActiveWeek(activeWeek + 1)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              Siguiente Semana <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              href="/mi-agencia-ia/mes-2"
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
            >
              Continuar a Mes 2 <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}