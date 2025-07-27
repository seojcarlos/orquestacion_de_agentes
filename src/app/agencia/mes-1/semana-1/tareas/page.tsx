'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, CheckCircle, Circle, Code, FileText, GitBranch } from 'lucide-react'

interface TareaDiaria {
  dia: number
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

export default function TareasF1M1S1Page() {
  const [progreso, setProgreso] = useState(0)
  const [tareasCompletadas, setTareasCompletadas] = useState<Set<number>>(new Set())

  const tareas: TareaDiaria[] = [
    {
      dia: 1,
      titulo: 'Setup inicial + Clean Code',
      objetivo: 'Establecer entorno de desarrollo profesional y comprender principios fundamentales',
      teoria: `
**Principios de Clean Code para Agentes IA:**

1. **Responsabilidad Única**: Cada clase/función tiene una responsabilidad específica
2. **Nombres Descriptivos**: Variables y funciones autodocumentadas
3. **Funciones Pequeñas**: Máximo 20 líneas por función
4. **DRY (Don't Repeat Yourself)**: Evitar duplicación de código
5. **Comentarios Significativos**: Explicar el "por qué", no el "qué"

**Configuración del Entorno:**
- Node.js 18+ LTS
- Editor con ESLint y Prettier
- Terminal configurado
- Estructura de carpetas profesional
      `,
      practica: `
**Ejercicio Práctico:**

1. **Verificar Node.js**: \`node --version && npm --version\`
2. **Crear proyecto**: \`mkdir mi-agencia-ia && cd mi-agencia-ia\`
3. **Inicializar**: \`npm init -y\`
4. **Instalar herramientas**: \`npm install --save-dev eslint prettier\`
5. **Crear estructura**:
   \`\`\`
   src/
   ├── agents/          # Agentes IA
   ├── lib/            # Utilidades
   ├── schemas/        # Validaciones JSON
   └── tests/          # Tests automatizados
   \`\`\`

**Código de ejemplo - Agente con Clean Code:**
\`\`\`javascript
/**
 * Agente básico siguiendo principios Clean Code
 */
class CleanAgent {
  constructor(config) {
    this.validateConfig(config);
    this.memory = new Memory(config.memoryLimit);
    this.processor = new TextProcessor(config.language);
  }
  
  // Responsabilidad única: procesar entrada
  async processInput(userInput) {
    const sanitizedInput = this.sanitizeInput(userInput);
    const response = await this.generateResponse(sanitizedInput);
    this.storeInMemory(userInput, response);
    return response;
  }
  
  // Función pequeña y específica
  sanitizeInput(input) {
    return input.trim().toLowerCase();
  }
}
\`\`\`
      `,
      tecnologias: ['Node.js', 'ESLint', 'Prettier', 'Git'],
      entregables: [
        'Proyecto inicializado con package.json',
        'Estructura de carpetas profesional',
        'Configuración ESLint/Prettier',
        'Primer agente con Clean Code'
      ],
      tiempoTeoria: 30,
      tiempoPractica: 90,
      completado: false
    },
    {
      dia: 2,
      titulo: 'Estructura de directorios + Git',
      objetivo: 'Organizar proyecto profesionalmente y configurar control de versiones',
      teoria: `
**Arquitectura de Proyecto para Agentes IA:**

\`\`\`
mi-agencia-ia/
├── src/
│   ├── agents/           # Lógica de agentes
│   │   ├── base/         # Clases base
│   │   ├── specialized/  # Agentes especializados
│   │   └── index.js      # Exportaciones
│   ├── lib/
│   │   ├── memory/       # Sistema de memoria
│   │   ├── validators/   # Validadores
│   │   └── utils/        # Utilidades
│   ├── schemas/          # JSON Schemas
│   ├── config/          # Configuraciones
│   └── tests/           # Tests unitarios
├── docs/                # Documentación
├── examples/            # Ejemplos de uso
└── scripts/            # Scripts de utilidad
\`\`\`

**Mejores Prácticas Git:**
- Commits atómicos y descriptivos
- Ramas por funcionalidad
- .gitignore completo
- README.md informativo
      `,
      practica: `
**Ejercicio Práctico:**

1. **Crear estructura completa**:
\`\`\`bash
mkdir -p src/{agents/{base,specialized},lib/{memory,validators,utils},schemas,config,tests}
mkdir -p {docs,examples,scripts}
\`\`\`

2. **Configurar Git**:
\`\`\`bash
git init
git config user.name "Tu Nombre"
git config user.email "tu@email.com"
\`\`\`

3. **Crear .gitignore**:
\`\`\`
node_modules/
.env
*.log
dist/
.DS_Store
coverage/
\`\`\`

4. **Crear README.md profesional**:
\`\`\`markdown
# Mi Agencia IA

Sistema de agentes IA desarrollado desde cero.

## Instalación
\\\`\\\`\\\`bash
npm install
\\\`\\\`\\\`

## Uso
\\\`\\\`\\\`javascript
const agent = new CleanAgent();
const response = await agent.processInput("Hola");
\\\`\\\`\\\`
\`\`\`

5. **Primer commit**:
\`\`\`bash
git add .
git commit -m "feat: configuración inicial del proyecto

- Estructura de directorios profesional
- Configuración Git básica
- README.md informativo
- .gitignore completo"
\`\`\`
      `,
      tecnologias: ['Git', 'Markdown', 'File System'],
      entregables: [
        'Estructura de directorios completa',
        'Repositorio Git inicializado',
        'README.md profesional',
        'Primer commit con mensaje semántico'
      ],
      tiempoTeoria: 25,
      tiempoPractica: 75,
      completado: false
    },
    {
      dia: 3,
      titulo: 'task.schema.json + Validación',
      objetivo: 'Crear esquemas de validación y contratos de datos claros',
      teoria: `
**JSON Schema para Agentes IA:**

Los esquemas JSON definen la estructura de datos y validan la entrada/salida de nuestros agentes.

**Beneficios:**
- **Validación automática** de datos
- **Documentación viva** de la API
- **Prevención de errores** en tiempo de ejecución
- **Contratos claros** entre componentes

**Tipos de esquemas necesarios:**
1. **TaskSchema**: Estructura de tareas
2. **ResponseSchema**: Formato de respuestas
3. **ConfigSchema**: Configuración de agentes
4. **MemorySchema**: Formato de memoria
      `,
      practica: `
**Ejercicio Práctico:**

1. **Crear schemas/task.schema.json**:
\`\`\`json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Task Schema",
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9-_]+$",
      "description": "Identificador único de la tarea"
    },
    "type": {
      "type": "string",
      "enum": ["text", "code", "analysis", "creative"],
      "description": "Tipo de tarea a procesar"
    },
    "input": {
      "type": "string",
      "minLength": 1,
      "maxLength": 5000,
      "description": "Entrada del usuario"
    },
    "status": {
      "type": "string",
      "enum": ["pending", "processing", "completed", "failed"],
      "description": "Estado actual de la tarea"
    },
    "priority": {
      "type": "integer",
      "minimum": 1,
      "maximum": 5,
      "description": "Prioridad de la tarea (1=alta, 5=baja)"
    },
    "metadata": {
      "type": "object",
      "properties": {
        "timestamp": {"type": "string", "format": "date-time"},
        "userId": {"type": "string"},
        "agentId": {"type": "string"}
      }
    }
  },
  "required": ["id", "type", "input", "status"],
  "additionalProperties": false
}
\`\`\`

2. **Crear lib/validators/TaskValidator.js**:
\`\`\`javascript
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const taskSchema = require('../../schemas/task.schema.json');

class TaskValidator {
  constructor() {
    this.ajv = new Ajv({ allErrors: true });
    addFormats(this.ajv);
    this.validateTask = this.ajv.compile(taskSchema);
  }
  
  validate(task) {
    const isValid = this.validateTask(task);
    return {
      isValid,
      errors: isValid ? [] : this.validateTask.errors
    };
  }
  
  // Sanitizar entrada antes de validar
  sanitize(task) {
    return {
      ...task,
      input: task.input?.trim(),
      id: task.id?.toLowerCase(),
      metadata: {
        ...task.metadata,
        timestamp: task.metadata?.timestamp || new Date().toISOString()
      }
    };
  }
}

module.exports = TaskValidator;
\`\`\`

3. **Crear test unitario**:
\`\`\`bash
npm install --save-dev jest ajv ajv-formats
\`\`\`

4. **Probar validación**:
\`\`\`javascript
// tests/TaskValidator.test.js
const TaskValidator = require('../src/lib/validators/TaskValidator');

describe('TaskValidator', () => {
  let validator;
  
  beforeEach(() => {
    validator = new TaskValidator();
  });
  
  test('valida tarea correcta', () => {
    const task = {
      id: 'test-123',
      type: 'text',
      input: 'Hola mundo',
      status: 'pending'
    };
    
    const result = validator.validate(task);
    expect(result.isValid).toBe(true);
  });
  
  test('rechaza tarea inválida', () => {
    const task = {
      id: '',  // ID vacío
      type: 'invalid',  // Tipo inválido
      status: 'pending'
      // input faltante
    };
    
    const result = validator.validate(task);
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
\`\`\`
      `,
      tecnologias: ['JSON Schema', 'Ajv', 'Jest', 'Data validation'],
      entregables: [
        'task.schema.json completo',
        'TaskValidator funcional',
        'Tests unitarios pasando',
        'Documentación de esquemas'
      ],
      tiempoTeoria: 35,
      tiempoPractica: 85,
      completado: false
    },
    {
      dia: 4,
      titulo: 'Tests básicos con Jest',
      objetivo: 'Implementar testing automatizado y crear agente mock para desarrollo',
      teoria: `
**Testing en Agentes IA:**

**Tipos de tests necesarios:**
1. **Unitarios**: Funciones individuales
2. **Integración**: Componentes trabajando juntos
3. **End-to-end**: Flujo completo del usuario
4. **Performance**: Tiempos de respuesta

**Estrategia de Testing:**
- **Test-Driven Development (TDD)**: Escribir tests antes que código
- **Mocks**: Simular dependencias externas
- **Coverage**: Mínimo 80% de cobertura
- **CI/CD**: Tests automáticos en cada commit

**Mock Agents:**
Simulan comportamiento de agentes reales para desarrollo rápido.
      `,
      practica: `
**Ejercicio Práctico:**

1. **Configurar Jest** en package.json:
\`\`\`json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "testEnvironment": "node",
    "collectCoverageFrom": [
      "src/**/*.js",
      "!src/tests/**"
    ]
  }
}
\`\`\`

2. **Crear MockAgent.js**:
\`\`\`javascript
/**
 * Agente Mock para desarrollo y testing
 */
class MockAgent {
  constructor(config = {}) {
    this.responses = {
      'hola': '¡Hola! Soy un agente mock para desarrollo.',
      'test': 'Test ejecutado correctamente.',
      'error': () => { throw new Error('Error simulado'); },
      'async': () => new Promise(resolve => 
        setTimeout(() => resolve('Respuesta async'), 100)
      )
    };
    this.callHistory = [];
    this.config = config;
  }
  
  async processInput(input) {
    this.callHistory.push({
      input,
      timestamp: new Date().toISOString()
    });
    
    const key = input.toLowerCase().trim();
    const response = this.responses[key];
    
    if (typeof response === 'function') {
      return await response();
    }
    
    return response || 'Respuesta mock por defecto.';
  }
  
  getCallHistory() {
    return [...this.callHistory];
  }
  
  clearHistory() {
    this.callHistory = [];
  }
  
  // Simular diferentes estados
  simulateDelay(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  simulateError(message = 'Error simulado') {
    throw new Error(message);
  }
}

module.exports = MockAgent;
\`\`\`

3. **Crear tests completos**:
\`\`\`javascript
// tests/MockAgent.test.js
const MockAgent = require('../src/agents/MockAgent');

describe('MockAgent', () => {
  let agent;
  
  beforeEach(() => {
    agent = new MockAgent();
  });
  
  afterEach(() => {
    agent.clearHistory();
  });
  
  describe('Procesamiento básico', () => {
    test('responde a saludo', async () => {
      const response = await agent.processInput('hola');
      expect(response).toContain('Hola');
    });
    
    test('maneja entrada desconocida', async () => {
      const response = await agent.processInput('xyz123');
      expect(response).toBe('Respuesta mock por defecto.');
    });
    
    test('registra historial de llamadas', async () => {
      await agent.processInput('test 1');
      await agent.processInput('test 2');
      
      const history = agent.getCallHistory();
      expect(history).toHaveLength(2);
      expect(history[0].input).toBe('test 1');
    });
  });
  
  describe('Manejo de errores', () => {
    test('simula errores correctamente', async () => {
      await expect(agent.processInput('error'))
        .rejects.toThrow('Error simulado');
    });
  });
  
  describe('Operaciones asíncronas', () => {
    test('maneja respuestas async', async () => {
      const response = await agent.processInput('async');
      expect(response).toBe('Respuesta async');
    });
    
    test('simula delays', async () => {
      const start = Date.now();
      await agent.simulateDelay(100);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(90);
    });
  });
});
\`\`\`

4. **Ejecutar tests**:
\`\`\`bash
npm test
npm run test:coverage
\`\`\`
      `,
      tecnologias: ['Jest', 'Mock objects', 'TDD', 'Code coverage'],
      entregables: [
        'Suite de tests Jest configurada',
        'MockAgent funcional',
        'Tests unitarios completos',
        'Reporte de coverage >80%'
      ],
      tiempoTeoria: 40,
      tiempoPractica: 100,
      completado: false
    },
    {
      dia: 5,
      titulo: 'Integración y JSDoc',
      objetivo: 'Documentar código profesionalmente e integrar todos los componentes',
      teoria: `
**Documentación con JSDoc:**

JSDoc genera documentación automática desde comentarios del código.

**Beneficios:**
- **Autodocumentación**: El código se documenta a sí mismo
- **IntelliSense**: Mejor autocompletado en editores
- **Type checking**: Validación de tipos sin TypeScript
- **Mantenimiento**: Documentación siempre actualizada

**Etiquetas importantes:**
- \`@class\`: Documenta clases
- \`@param\`: Parámetros de función
- \`@returns\`: Valor de retorno
- \`@throws\`: Excepciones que lanza
- \`@example\`: Ejemplos de uso
- \`@since\`: Versión desde la que existe

**Integración de Componentes:**
Conectar todos los elementos desarrollados en una arquitectura cohesiva.
      `,
      practica: `
**Ejercicio Práctico:**

1. **Instalar JSDoc**:
\`\`\`bash
npm install --save-dev jsdoc
\`\`\`

2. **Configurar jsdoc.json**:
\`\`\`json
{
  "source": {
    "include": ["./src/"],
    "includePattern": "\\.(js|jsx)$",
    "exclude": ["node_modules/", "tests/"]
  },
  "opts": {
    "destination": "./docs/",
    "recurse": true
  },
  "plugins": ["plugins/markdown"],
  "templates": {
    "cleverLinks": false,
    "monospaceLinks": false
  }
}
\`\`\`

3. **Documentar AgenteBasico completo**:
\`\`\`javascript
/**
 * @fileoverview Agente básico de IA con capacidades de procesamiento de texto
 * @author Academia Agentes IA
 * @version 1.0.0
 * @since 2024-01-01
 */

const TaskValidator = require('../lib/validators/TaskValidator');
const Memory = require('../lib/memory/Memory');

/**
 * Agente básico de IA que procesa texto y mantiene memoria de conversaciones
 * 
 * @class AgenteBasico
 * @example
 * // Crear y usar un agente básico
 * const agente = new AgenteBasico({
 *   nombre: 'MiAgente',
 *   personalidad: 'amigable',
 *   limiteMensajes: 50
 * });
 * 
 * const respuesta = await agente.procesar('Hola, ¿cómo estás?');
 * console.log(respuesta);
 */
class AgenteBasico {
  /**
   * Construye una nueva instancia del agente básico
   * 
   * @constructor
   * @param {Object} config - Configuración del agente
   * @param {string} [config.nombre='AgenteBasico'] - Nombre del agente
   * @param {string} [config.personalidad='amigable'] - Personalidad del agente
   * @param {number} [config.limiteMensajes=50] - Límite de mensajes en memoria
   * @param {boolean} [config.usarContexto=true] - Si usar contexto en respuestas
   * @throws {Error} Si la configuración es inválida
   * @since 1.0.0
   */
  constructor(config = {}) {
    this.validateConfig(config);
    
    /** @private {Object} Configuración del agente */
    this.config = {
      nombre: config.nombre || 'AgenteBasico',
      personalidad: config.personalidad || 'amigable',
      limiteMensajes: config.limiteMensajes || 50,
      usarContexto: config.usarContexto !== false
    };
    
    /** @private {Memory} Sistema de memoria del agente */
    this.memoria = new Memory(this.config.limiteMensajes);
    
    /** @private {TaskValidator} Validador de tareas */
    this.validator = new TaskValidator();
    
    /** @private {Map<string, string>} Patrones de respuesta */
    this.patrones = new Map([
      ['saludo', ['hola', 'buenos', 'hey', 'saludos']],
      ['pregunta', ['qué', 'cómo', 'cuándo', 'dónde', 'por qué']],
      ['despedida', ['adiós', 'chao', 'hasta', 'nos vemos']]
    ]);
  }
  
  /**
   * Procesa una entrada del usuario y genera una respuesta inteligente
   * 
   * @async
   * @param {string} entrada - Texto de entrada del usuario
   * @returns {Promise<string>} Respuesta generada por el agente
   * @throws {Error} Si la entrada es inválida o el procesamiento falla
   * @example
   * // Procesar una entrada simple
   * const respuesta = await agente.procesar('¿Cómo crear un agente IA?');
   * 
   * @example
   * // Manejar errores
   * try {
   *   const respuesta = await agente.procesar('');
   * } catch (error) {
   *   console.error('Error:', error.message);
   * }
   * @since 1.0.0
   */
  async procesar(entrada) {
    // Validar entrada
    if (!entrada || typeof entrada !== 'string') {
      throw new Error('La entrada debe ser un string no vacío');
    }
    
    // Crear tarea y validar
    const tarea = this.crearTarea(entrada);
    const validacion = this.validator.validate(tarea);
    
    if (!validacion.isValid) {
      throw new Error(\`Tarea inválida: \${validacion.errors.map(e => e.message).join(', ')}\`);
    }
    
    // Procesar y responder
    const respuesta = await this.generarRespuesta(entrada);
    this.guardarEnMemoria(entrada, respuesta);
    
    return respuesta;
  }
  
  /**
   * Obtiene estadísticas del agente
   * 
   * @returns {Object} Estadísticas de uso
   * @returns {number} returns.totalMensajes - Total de mensajes procesados
   * @returns {number} returns.memoriaUsada - Mensajes en memoria
   * @returns {string} returns.ultimoUso - Timestamp del último uso
   * @since 1.0.0
   */
  obtenerEstadisticas() {
    return {
      totalMensajes: this.memoria.getTotalMessages(),
      memoriaUsada: this.memoria.getUsedMemory(),
      ultimoUso: this.memoria.getLastActivity()
    };
  }
  
  /**
   * Valida la configuración del agente
   * @private
   * @param {Object} config - Configuración a validar
   * @throws {Error} Si la configuración es inválida
   */
  validateConfig(config) {
    if (config.limiteMensajes && config.limiteMensajes < 1) {
      throw new Error('limiteMensajes debe ser mayor a 0');
    }
  }
}

module.exports = AgenteBasico;
\`\`\`

4. **Crear integración completa**:
\`\`\`javascript
// src/index.js - Punto de entrada principal
/**
 * @fileoverview Punto de entrada principal de la Agencia IA
 */

const AgenteBasico = require('./agents/base/AgenteBasico');
const MockAgent = require('./agents/MockAgent');
const TaskValidator = require('./lib/validators/TaskValidator');

/**
 * Factory para crear agentes
 * @class AgentFactory
 */
class AgentFactory {
  /**
   * Crea un agente según el tipo especificado
   * @param {string} tipo - Tipo de agente ('basico', 'mock')
   * @param {Object} config - Configuración del agente
   * @returns {Object} Instancia del agente
   */
  static crear(tipo, config = {}) {
    switch (tipo) {
      case 'basico':
        return new AgenteBasico(config);
      case 'mock':
        return new MockAgent(config);
      default:
        throw new Error(\`Tipo de agente desconocido: \${tipo}\`);
    }
  }
}

module.exports = {
  AgenteBasico,
  MockAgent,
  TaskValidator,
  AgentFactory
};
\`\`\`

5. **Generar documentación**:
\`\`\`bash
npx jsdoc -c jsdoc.json
\`\`\`

6. **Agregar script en package.json**:
\`\`\`json
{
  "scripts": {
    "docs": "jsdoc -c jsdoc.json",
    "docs:serve": "cd docs && python -m http.server 8080"
  }
}
\`\`\`
      `,
      tecnologias: ['JSDoc', 'Documentation', 'Code integration', 'Factory pattern'],
      entregables: [
        'Código completamente documentado con JSDoc',
        'Documentación HTML generada automáticamente',
        'Integración completa de todos los componentes',
        'Factory pattern para crear agentes'
      ],
      tiempoTeoria: 35,
      tiempoPractica: 95,
      completado: false
    }
  ];

  // Cargar progreso desde localStorage
  useEffect(() => {
    const progresoGuardado = localStorage.getItem('academia-f1-m1-s1-tareas')
    if (progresoGuardado) {
      const { completadas, progreso: porcentaje } = JSON.parse(progresoGuardado)
      setTareasCompletadas(new Set(completadas))
      setProgreso(porcentaje)
    }
  }, [])

  // Guardar progreso en localStorage
  useEffect(() => {
    const completadas = Array.from(tareasCompletadas)
    const porcentajeProgreso = Math.round((completadas.length / tareas.length) * 100)
    
    localStorage.setItem('academia-f1-m1-s1-tareas', JSON.stringify({
      completadas,
      progreso: porcentajeProgreso
    }))
    
    setProgreso(porcentajeProgreso)
  }, [tareasCompletadas, tareas.length])

  const toggleTarea = (dia: number) => {
    const nuevasCompletadas = new Set(tareasCompletadas)
    if (nuevasCompletadas.has(dia)) {
      nuevasCompletadas.delete(dia)
    } else {
      nuevasCompletadas.add(dia)
    }
    setTareasCompletadas(nuevasCompletadas)
  }

  const getTiempoTotal = (tarea: TareaDiaria) => tarea.tiempoTeoria + tarea.tiempoPractica

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/agencia/mes-1/semana-1"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-purple-600/20 border border-purple-600/30 rounded-full text-sm font-medium text-purple-400">
                F1-M1-S1
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Configuración del Entorno y Fundamentos</h1>
                <p className="text-gray-400">5 días de contenido estructurado</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progreso de Tareas</span>
              <span className="text-sm text-gray-400">{progreso}% completado</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progreso}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
              <span>{tareasCompletadas.size} de {tareas.length} tareas</span>
              <span>~{tareas.reduce((acc, t) => acc + getTiempoTotal(t), 0)} min total</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Objective */}
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-800/30 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3 text-purple-400">🎯 Objetivo de la Tarea</h2>
          <p className="text-gray-300 mb-4">
            Establecer una base sólida de desarrollo y comprender los principios fundamentales para crear agentes IA profesionales.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
              <div className="font-medium text-green-400 mb-1">🔧 Tecnologías</div>
              <div className="text-gray-400">Node.js, Git, Jest, JSON Schema, JSDoc</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
              <div className="font-medium text-blue-400 mb-1">📦 Entregables</div>
              <div className="text-gray-400">Proyecto configurado + Schema + Tests + Docs</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
              <div className="font-medium text-purple-400 mb-1">⏱️ Duración</div>
              <div className="text-gray-400">~{tareas.reduce((acc, t) => acc + getTiempoTotal(t), 0)} minutos</div>
            </div>
          </div>
        </div>

        {/* Daily Tasks */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Tareas Diarias Detalladas</h2>
          
          {tareas.map((tarea) => (
            <div
              key={tarea.dia}
              className={`bg-gray-900 border rounded-xl p-6 transition-all ${
                tareasCompletadas.has(tarea.dia)
                  ? 'border-green-600/30 bg-green-900/10'
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              {/* Task Header */}
              <div className="flex items-start gap-4 mb-6">
                <button
                  onClick={() => toggleTarea(tarea.dia)}
                  className="mt-1"
                >
                  {tareasCompletadas.has(tarea.dia) ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-600 hover:text-gray-400" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <span className="px-2 py-1 bg-purple-900/20 text-purple-400 text-xs rounded">
                      Día {tarea.dia}
                    </span>
                    <h3 className="text-lg font-semibold">{tarea.titulo}</h3>
                  </div>
                  
                  <p className="text-gray-400 mb-3">{tarea.objetivo}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Teoría: {tarea.tiempoTeoria}min
                    </div>
                    <div className="flex items-center gap-1">
                      <Code className="w-3 h-3" />
                      Práctica: {tarea.tiempoPractica}min
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      Total: {getTiempoTotal(tarea)}min
                    </div>
                  </div>
                </div>
              </div>

              {/* Theory Section */}
              <div className="ml-10 space-y-6">
                <div className="bg-blue-950/20 border border-blue-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-blue-400 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Teoría ({tarea.tiempoTeoria} minutos)
                  </h4>
                  <div className="text-gray-300 text-sm whitespace-pre-line">
                    {tarea.teoria}
                  </div>
                </div>

                {/* Practice Section */}
                <div className="bg-green-950/20 border border-green-800/30 rounded-lg p-4">
                  <h4 className="font-medium text-green-400 mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Práctica ({tarea.tiempoPractica} minutos)
                  </h4>
                  <div className="text-gray-300 text-sm whitespace-pre-line">
                    {tarea.practica}
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {tarea.tecnologias.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Deliverables */}
                <div className="bg-yellow-950/20 border border-yellow-800/30 rounded-lg p-3">
                  <h5 className="font-medium text-yellow-400 mb-2 text-sm">📦 Entregables</h5>
                  <ul className="space-y-1 text-sm text-gray-300">
                    {tarea.entregables.map((entregable, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        {entregable}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => toggleTarea(tarea.dia)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      tareasCompletadas.has(tarea.dia)
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    {tareasCompletadas.has(tarea.dia) ? 'Completado' : 'Marcar como completado'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps */}
        {progreso === 100 && (
          <div className="mt-8 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-800/30 rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-4 text-green-400">🎉 ¡Tarea F1-M1-S1 Completada!</h3>
            <p className="text-gray-300 mb-6">
              Has establecido los fundamentos sólidos. Ahora estás listo para construir el TaskManager.
            </p>
            <Link
              href="/agencia/mes-1/semana-1"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
            >
              Volver a Semana 1 <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}