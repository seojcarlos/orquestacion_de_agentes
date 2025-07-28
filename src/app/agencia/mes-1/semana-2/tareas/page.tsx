'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, CheckCircle, Circle, Code, Terminal, Clock, Layers, Database, Settings, Network } from 'lucide-react'

interface Tarea {
  id: string
  titulo: string
  objetivo: string
  teoria: string
  practica: string
  tecnologias: string[]
  entregables: string[]
  tiempoTeoria: number
  tiempoPractica: number
  completado: boolean
}

export default function TareasSemana2Page() {
  const [tareaActiva, setTareaActiva] = useState<string | null>(null)
  const [completadas, setCompletadas] = useState<Set<string>>(new Set())

  const tareas: Tarea[] = [
    {
      id: 'f1-m1-s2-tarea1',
      titulo: 'createTask + Validación Schema',
      objetivo: 'Implementar función createTask() con validación automática usando JSON Schema',
      teoria: `**Validación de Datos con JSON Schema**

La validación es fundamental para la robustez de nuestro sistema de agentes. JSON Schema nos permite definir contratos claros sobre qué datos son válidos.

**Conceptos clave:**
1. **Task Storage**: Map() para almacenamiento en memoria
2. **Validator**: Validación usando los schemas JSON
3. **ID Generator**: Generación de IDs únicos y seguros
4. **State Manager**: Gestión de estados de las tareas

**Patrón de diseño - Repository:**
El patrón Repository separa la lógica de acceso a datos de la lógica de negocio.`,
      practica: `**Implementación práctica:**

1. **Crear TaskRepository**: Clase que maneja el almacenamiento
2. **Implementar createTask()**: Función con validación automática
3. **Testing**: Pruebas unitarias para validación
4. **Error handling**: Manejo de errores descriptivos

**Archivo principal**: src/core/taskValidator.js
**Tests**: tests/taskValidator.test.js
**Tiempo estimado**: 85 minutos`,
      tecnologias: ['JavaScript ES6+', 'Map', 'JSON Schema', 'Jest', 'Error handling'],
      entregables: [
        'Función createTask() funcional',
        'TaskRepository implementado',
        'Validación automática con schemas',
        'Suite de tests completa',
        'Documentación de API'
      ],
      tiempoTeoria: 35,
      tiempoPractica: 85,
      completado: false
    },
    {
      id: 'f1-m1-s2-tarea2',
      titulo: 'updateTaskStatus + Estados',
      objetivo: 'Implementar gestión de estados de tareas con transiciones válidas y logging',
      teoria: `**Gestión de Estados de Tareas**

Los estados permiten trackear el ciclo de vida de cada tarea en el sistema.

**Estados disponibles:**
- **pending**: Esperando ser procesada
- **processing**: Siendo procesada por un agente
- **completed**: Completada exitosamente
- **failed**: Falló durante el procesamiento

**State Machine:**
Implementaremos una máquina de estados que controle las transiciones válidas entre estados.`,
      practica: `**Implementación práctica:**

1. **State Machine**: Definir transiciones válidas
2. **updateTaskStatus()**: Función de cambio de estado
3. **Event logging**: Registro de cambios de estado
4. **Validation**: Verificar transiciones permitidas

**Archivos a crear:**
- src/core/stateManager.js
- src/core/eventLogger.js
- tests/stateManager.test.js`,
      tecnologias: ['State Machines', 'Event handling', 'Concurrency', 'Optimistic locking', 'History tracking'],
      entregables: [
        'updateTaskStatus() funcional',
        'State machine implementada',
        'Event logging system',
        'Validación de transiciones',
        'Tests de concurrencia'
      ],
      tiempoTeoria: 30,
      tiempoPractica: 75,
      completado: false
    },
    {
      id: 'f1-m1-s2-tarea3',
      titulo: 'setTaskOutput + Manejo de Resultados',
      objetivo: 'Implementar almacenamiento y gestión de outputs de tareas con validación y metadatos',
      teoria: `**Gestión de Outputs de Tareas**

Los outputs son los resultados que produce un agente al completar una tarea. Pueden ser datos, archivos, o cualquier tipo de información.

**Tipos de output:**
- **Data**: Objetos JSON con resultados
- **Files**: Referencias a archivos generados
- **Logs**: Información de proceso
- **Errors**: Detalles de errores si falló

**Metadata:**
Cada output incluye metadata como timestamp, tamaño, checksum, etc.`,
      practica: `**Implementación práctica:**

1. **setTaskOutput()**: Función para almacenar outputs
2. **Output validation**: Validar tipos y formatos
3. **Metadata extraction**: Extraer información automática
4. **Storage optimization**: Compresión y checksums
5. **Retrieval system**: Sistema de consulta de outputs

**Archivos principales:**
- src/core/outputManager.js
- src/utils/compression.js
- tests/outputManager.test.js`,
      tecnologias: ['Data storage', 'Compression', 'Checksums', 'File handling', 'Memory management'],
      entregables: [
        'setTaskOutput() implementado',
        'Output validation system',
        'Metadata extraction automática',
        'Storage optimization',
        'Retrieval API completa'
      ],
      tiempoTeoria: 40,
      tiempoPractica: 95,
      completado: false
    },
    {
      id: 'f1-m1-s2-tarea4',
      titulo: 'Sistema de Historial + Persistencia',
      objetivo: 'Implementar historial de cambios completo y persistencia con localStorage/IndexedDB',
      teoria: `**Sistema de Historial**

El historial mantiene un registro completo de todos los cambios que ocurren en las tareas, permitiendo auditoría y debugging.

**Características:**
- **Change tracking**: Registro de todos los cambios
- **Snapshots**: Estados completos en momentos clave
- **Query interface**: Búsqueda en el historial
- **Persistence**: Almacenamiento local persistente

**Persistencia híbrida:**
Utilizamos localStorage para datos pequeños e IndexedDB para datos grandes.`,
      practica: `**Implementación práctica:**

1. **History tracking**: Sistema de seguimiento de cambios
2. **Snapshot system**: Capturas de estado completo
3. **Persistence layer**: localStorage + IndexedDB
4. **Query interface**: API de consulta al historial
5. **Data migration**: Sistema de migración de datos

**Estructura de archivos:**
- src/core/historyManager.js
- src/persistence/localStore.js
- src/persistence/indexedStore.js
- tests/persistence.test.js`,
      tecnologias: ['localStorage', 'IndexedDB', 'Data migration', 'Compression', 'Backup/restore'],
      entregables: [
        'History tracking completo',
        'Persistence layer híbrida',
        'Query interface funcional',
        'Data migration system',
        'Backup/restore functionality'
      ],
      tiempoTeoria: 45,
      tiempoPractica: 105,
      completado: false
    },
    {
      id: 'f1-m1-s2-tarea5',
      titulo: 'Queries y Paginación + API Endpoints',
      objetivo: 'Crear sistema de consultas avanzadas, paginación eficiente y endpoints REST completos',
      teoria: `**Sistema de Queries Avanzadas**

Implementaremos un sistema de consultas que permita filtrar, ordenar y paginar las tareas de manera eficiente.

**Endpoints REST:**
- GET /tasks - Listar con filtros
- GET /tasks/:id - Obtener específica
- POST /tasks - Crear nueva
- PUT /tasks/:id - Actualizar completa
- PATCH /tasks/:id - Actualizar parcial
- DELETE /tasks/:id - Eliminar
- GET /tasks/:id/history - Historial
- GET /tasks/:id/output - Output

**Respuesta con paginación:**
Todas las respuestas incluyen metadata de paginación y filtros aplicados.`,
      practica: `**Implementación práctica:**

1. **Query builder**: Constructor de consultas flexible
2. **Pagination system**: Paginación eficiente con cursors
3. **REST endpoints**: API REST completa
4. **Indexing system**: Índices para búsquedas rápidas
5. **Caching layer**: Cache inteligente de consultas

**Archivos del sistema:**
- src/api/queryBuilder.js
- src/api/paginationManager.js
- src/api/endpoints.js
- src/indexing/taskIndexer.js
- tests/api.test.js`,
      tecnologias: ['Indexing', 'Pagination', 'REST APIs', 'Caching', 'Query optimization', 'Express.js'],
      entregables: [
        'Query builder funcional',
        'Pagination system completo',
        'REST API endpoints',
        'Indexing system optimizado',
        'Caching layer inteligente'
      ],
      tiempoTeoria: 50,
      tiempoPractica: 120,
      completado: false
    }
  ]

  const marcarCompletada = (tareaId: string) => {
    setCompletadas(prev => {
      const nueva = new Set(prev)
      if (nueva.has(tareaId)) {
        nueva.delete(tareaId)
      } else {
        nueva.add(tareaId)
      }
      return nueva
    })
  }

  const tiempoTotal = tareas.reduce((acc, tarea) => acc + tarea.tiempoTeoria + tarea.tiempoPractica, 0)
  const tiempoCompletado = tareas
    .filter(tarea => completadas.has(tarea.id))
    .reduce((acc, tarea) => acc + tarea.tiempoTeoria + tarea.tiempoPractica, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/agencia/mes-1/semana-2" className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Volver a Semana 2
          </Link>
          <div className="text-right text-blue-300">
            <div className="text-sm">Progreso Total</div>
            <div className="text-2xl font-bold">{Math.round((tiempoCompletado / tiempoTotal) * 100)}%</div>
          </div>
        </div>

        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Tareas de Semana 2
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Implementación completa del sistema de gestión de tareas. 
            <span className="text-blue-400 font-semibold"> Tiempo total estimado: {Math.round(tiempoTotal / 60)} horas</span>
          </p>
        </header>

        {/* Tareas */}
        <div className="space-y-6">
          {tareas.map((tarea, index) => (
            <div key={tarea.id} className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => marcarCompletada(tarea.id)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                        completadas.has(tarea.id)
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-400 hover:border-green-400'
                      }`}
                    >
                      {completadas.has(tarea.id) && <CheckCircle className="w-5 h-5" />}
                    </button>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">{tarea.titulo}</h2>
                      <p className="text-gray-300">{tarea.objetivo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Tiempo estimado</div>
                    <div className="text-lg font-semibold text-blue-400">
                      {Math.round((tarea.tiempoTeoria + tarea.tiempoPractica) / 60)}h {((tarea.tiempoTeoria + tarea.tiempoPractica) % 60)}min
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tarea.tecnologias.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-600/30 text-purple-200 text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setTareaActiva(tareaActiva === tarea.id ? null : tarea.id)}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  {tareaActiva === tarea.id ? 'Ocultar detalles' : 'Ver detalles'}
                </button>

                {tareaActiva === tarea.id && (
                  <div className="mt-6 grid md:grid-cols-2 gap-6">
                    {/* Teoría */}
                    <div className="bg-gray-900/50 rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Code className="w-5 h-5 text-blue-400" />
                        <h3 className="text-xl font-semibold text-white">Teoría</h3>
                        <span className="text-sm text-gray-400">({tarea.tiempoTeoria} min)</span>
                      </div>
                      <div className="text-gray-300 whitespace-pre-line">
                        {tarea.teoria}
                      </div>
                    </div>

                    {/* Práctica */}
                    <div className="bg-gray-900/50 rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Terminal className="w-5 h-5 text-green-400" />
                        <h3 className="text-xl font-semibold text-white">Práctica</h3>
                        <span className="text-sm text-gray-400">({tarea.tiempoPractica} min)</span>
                      </div>
                      <div className="text-gray-300 whitespace-pre-line">
                        {tarea.practica}
                      </div>
                    </div>

                    {/* Entregables */}
                    <div className="md:col-span-2 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        Entregables
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {tarea.entregables.map((entregable, i) => (
                          <div key={i} className="flex items-center gap-2 text-gray-300">
                            <Circle className="w-4 h-4 text-gray-500" />
                            {entregable}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Resumen final */}
        <div className="mt-12 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            🎯 Al completar estas tareas tendrás
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Database className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">Sistema Completo</h3>
              <p className="text-gray-300 text-sm">
                TaskValidator funcional con todas las operaciones CRUD y validación automática
              </p>
            </div>
            <div className="text-center">
              <Network className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">API REST</h3>
              <p className="text-gray-300 text-sm">
                Endpoints completos con paginación, filtros y sistema de consultas avanzadas
              </p>
            </div>
            <div className="text-center">
              <Settings className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">Persistencia</h3>
              <p className="text-gray-300 text-sm">
                Sistema híbrido localStorage + IndexedDB con historial completo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
