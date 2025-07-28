// Schema Validator para sistemas de IA
export interface ValidationResult {
  valid: boolean
  errors?: ValidationError[]
  performance?: PerformanceMetrics
}

export interface ValidationError {
  path: string
  message: string
  code?: string
}

export interface PerformanceMetrics {
  time: number // milliseconds
  memory: number // MB
  operations: number
}

export class SchemaValidator {
  private cache = new Map()
  private stats = {
    validations: 0,
    cacheHits: 0,
    totalTime: 0
  }

  constructor(private cacheSize = 1000) {}

  /**
   * Valida datos contra un schema
   */
  validate(schema: any, data: any): ValidationResult {
    const start = performance.now()
    this.stats.validations++

    try {
      // Verificar cache
      const cacheKey = this.getCacheKey(schema, data)
      if (this.cache.has(cacheKey)) {
        this.stats.cacheHits++
        return this.cache.get(cacheKey)
      }

      // Validación real
      const result = this.performValidation(schema, data)
      
      // Calcular métricas
      const elapsed = performance.now() - start
      this.stats.totalTime += elapsed
      
      result.performance = {
        time: elapsed,
        memory: this.getMemoryUsage(),
        operations: this.countOperations(schema)
      }

      // Guardar en cache
      if (this.cache.size >= this.cacheSize) {
        const firstKey = this.cache.keys().next().value
        this.cache.delete(firstKey)
      }
      this.cache.set(cacheKey, result)

      return result

    } catch (error) {
      return {
        valid: false,
        errors: [{
          path: '/',
          message: error.message || 'Error de validación'
        }]
      }
    }
  }

  private performValidation(schema: any, data: any): ValidationResult {
    // Validación básica de tipos
    if (!this.validateType(schema, data)) {
      return {
        valid: false,
        errors: [{
          path: '/',
          message: `Tipo esperado: ${schema.type}, recibido: ${typeof data}`
        }]
      }
    }

    // Validación de propiedades requeridas
    if (schema.required) {
      const missingProps = schema.required.filter((prop: string) => 
        data[prop] === undefined
      )
      if (missingProps.length > 0) {
        return {
          valid: false,
          errors: missingProps.map((prop: string) => ({
            path: `/${prop}`,
            message: `Propiedad requerida faltante: ${prop}`
          }))
        }
      }
    }

    // Validación de propiedades
    if (schema.properties && typeof data === 'object') {
      const errors: ValidationError[] = []
      
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        if (data[key] !== undefined) {
          const propResult = this.validate(propSchema, data[key])
          if (!propResult.valid) {
            errors.push(...(propResult.errors || []).map(err => ({
              ...err,
              path: `/${key}${err.path === '/' ? '' : err.path}`
            })))
          }
        }
      }

      if (errors.length > 0) {
        return { valid: false, errors }
      }
    }

    // Validación de rangos numéricos
    if (schema.type === 'number' || schema.type === 'integer') {
      if (schema.minimum !== undefined && data < schema.minimum) {
        return {
          valid: false,
          errors: [{
            path: '/',
            message: `Valor debe ser mayor o igual a ${schema.minimum}`
          }]
        }
      }
      if (schema.maximum !== undefined && data > schema.maximum) {
        return {
          valid: false,
          errors: [{
            path: '/',
            message: `Valor debe ser menor o igual a ${schema.maximum}`
          }]
        }
      }
    }

    // Validación de longitud de strings
    if (schema.type === 'string') {
      if (schema.minLength !== undefined && data.length < schema.minLength) {
        return {
          valid: false,
          errors: [{
            path: '/',
            message: `String debe tener al menos ${schema.minLength} caracteres`
          }]
        }
      }
      if (schema.maxLength !== undefined && data.length > schema.maxLength) {
        return {
          valid: false,
          errors: [{
            path: '/',
            message: `String debe tener máximo ${schema.maxLength} caracteres`
          }]
        }
      }
      if (schema.pattern) {
        const regex = new RegExp(schema.pattern)
        if (!regex.test(data)) {
          return {
            valid: false,
            errors: [{
              path: '/',
              message: `String no coincide con el patrón: ${schema.pattern}`
            }]
          }
        }
      }
    }

    // Validación de enum
    if (schema.enum && !schema.enum.includes(data)) {
      return {
        valid: false,
        errors: [{
          path: '/',
          message: `Valor debe ser uno de: ${schema.enum.join(', ')}`
        }]
      }
    }

    return { valid: true }
  }

  private validateType(schema: any, data: any): boolean {
    if (!schema.type) return true

    switch (schema.type) {
      case 'string':
        return typeof data === 'string'
      case 'number':
        return typeof data === 'number' && !isNaN(data)
      case 'integer':
        return typeof data === 'number' && Number.isInteger(data)
      case 'boolean':
        return typeof data === 'boolean'
      case 'array':
        return Array.isArray(data)
      case 'object':
        return typeof data === 'object' && data !== null && !Array.isArray(data)
      case 'null':
        return data === null
      default:
        return true
    }
  }

  private getCacheKey(schema: any, data: any): string {
    return JSON.stringify({ schema, data })
  }

  private getMemoryUsage(): number {
    // Estimación simple del uso de memoria
    return this.cache.size * 0.001 // KB aproximado
  }

  private countOperations(schema: any): number {
    // Cuenta operaciones aproximadas necesarias
    let ops = 1
    if (schema.properties) {
      ops += Object.keys(schema.properties).length
    }
    if (schema.required) {
      ops += schema.required.length
    }
    return ops
  }

  /**
   * Obtiene estadísticas del validador
   */
  getStats() {
    return {
      ...this.stats,
      cacheHitRate: this.stats.cacheHits / this.stats.validations * 100,
      averageTime: this.stats.totalTime / this.stats.validations,
      cacheSize: this.cache.size
    }
  }

  /**
   * Limpia el cache
   */
  clearCache() {
    this.cache.clear()
  }
}

// Schemas predefinidos para ejemplos
export const ExampleSchemas = {
  basicTask: {
    type: "object",
    properties: {
      taskId: { type: "string", format: "uuid" },
      taskType: { enum: ["text-generation", "code-analysis", "data-processing"] },
      priority: { type: "integer", minimum: 1, maximum: 5 },
      input: {
        type: "object",
        properties: {
          prompt: { type: "string", minLength: 10, maxLength: 4000 },
          context: { type: "string" }
        },
        required: ["prompt"]
      }
    },
    required: ["taskId", "taskType", "input"]
  },

  conditionalSchema: {
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
        language: { enum: ["javascript", "python", "go"] }
      },
      required: ["language"]
    }
  },

  performanceOptimized: {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    definitions: {
      uuid: {
        type: "string",
        pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"
      },
      safeString: {
        type: "string",
        pattern: "^[\\w\\s.,!?-]{1,1000}$"
      }
    },
    type: "object",
    properties: {
      id: { $ref: "#/definitions/uuid" },
      content: { $ref: "#/definitions/safeString" },
      priority: { type: "integer", minimum: 0, maximum: 9 }
    },
    required: ["id", "content"],
    additionalProperties: false
  }
}

// Utilidades para desarrollo
export const SchemaUtils = {
  /**
   * Genera datos de ejemplo válidos para un schema
   */
  generateExample(schema: any): any {
    if (schema.type === 'object') {
      const result: any = {}
      if (schema.properties) {
        for (const [key, propSchema] of Object.entries(schema.properties)) {
          result[key] = this.generateExample(propSchema)
        }
      }
      return result
    }

    if (schema.type === 'string') {
      if (schema.enum) return schema.enum[0]
      return schema.format === 'uuid' 
        ? '550e8400-e29b-41d4-a716-446655440000'
        : 'example string'
    }

    if (schema.type === 'number' || schema.type === 'integer') {
      return schema.minimum || 0
    }

    if (schema.type === 'boolean') {
      return true
    }

    if (schema.type === 'array') {
      return []
    }

    return null
  },

  /**
   * Analiza la complejidad de un schema
   */
  analyzeComplexity(schema: any): {
    depth: number
    properties: number
    constraints: number
  } {
    let depth = 0
    let properties = 0
    let constraints = 0

    const analyze = (obj: any, currentDepth = 0) => {
      depth = Math.max(depth, currentDepth)
      
      if (obj.properties) {
        properties += Object.keys(obj.properties).length
        Object.values(obj.properties).forEach(prop => 
          analyze(prop, currentDepth + 1)
        )
      }

      if (obj.required) constraints++
      if (obj.minimum !== undefined) constraints++
      if (obj.maximum !== undefined) constraints++
      if (obj.minLength !== undefined) constraints++
      if (obj.maxLength !== undefined) constraints++
      if (obj.pattern) constraints++
      if (obj.enum) constraints++
    }

    analyze(schema)
    return { depth, properties, constraints }
  }
}