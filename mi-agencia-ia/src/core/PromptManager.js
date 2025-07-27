import fs from 'fs/promises';
import path from 'path';
import Handlebars from 'handlebars';
import matter from 'gray-matter';

/**
 * PromptManager - Sistema de gestión de prompts centralizado
 * 
 * Responsabilidades:
 * - Cargar y compilar prompts desde archivos
 * - Renderizar prompts con contexto dinámico
 * - Gestionar versionado y experimentación A/B
 * - Cachear prompts compilados para rendimiento
 * - Proporcionar análisis de uso y rendimiento
 */
class PromptManager {
  constructor(promptsDir = './src/prompts') {
    this.promptsDir = promptsDir;
    this.cache = new Map();
    this.templates = new Map();
    this.metrics = new Map();
    
    // Registrar helpers de Handlebars
    this.registerHelpers();
  }

  /**
   * Carga y compila un prompt
   * @param {string} agentType - Tipo de agente
   * @param {string} taskType - Tipo de tarea
   * @param {string} version - Versión del prompt
   * @returns {Object} Prompt compilado con metadata
   */
  async loadPrompt(agentType, taskType, version = 'default') {
    const cacheKey = `${agentType}:${taskType}:${version}`;
    
    // Verificar caché
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Construir path del archivo
    let promptPath;
    if (version === 'default') {
      promptPath = path.join(this.promptsDir, 'tasks', agentType, `${taskType}.md`);
    } else {
      promptPath = path.join(this.promptsDir, 'experiments', version, agentType, `${taskType}.md`);
    }

    try {
      // Leer archivo
      const content = await fs.readFile(promptPath, 'utf-8');
      
      // Parsear frontmatter y contenido
      const { data: metadata, content: promptTemplate } = matter(content);
      
      // Compilar template con Handlebars
      const compiled = Handlebars.compile(promptTemplate);
      
      // Guardar en caché
      const prompt = {
        template: compiled,
        metadata,
        path: promptPath,
        version,
        loadedAt: new Date().toISOString()
      };
      
      this.cache.set(cacheKey, prompt);
      
      return prompt;
    } catch (error) {
      console.warn(`Failed to load prompt ${promptPath}: ${error.message}`);
      
      // Intentar fallback con prompt del sistema
      return await this.loadSystemPrompt(agentType);
    }
  }

  /**
   * Carga prompt del sistema como fallback
   * @param {string} agentType - Tipo de agente
   * @returns {Object} Prompt del sistema
   */
  async loadSystemPrompt(agentType) {
    const cacheKey = `system:${agentType}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const systemPath = path.join(this.promptsDir, 'system', `${agentType}.md`);
      const content = await fs.readFile(systemPath, 'utf-8');
      
      const { data: metadata, content: promptTemplate } = matter(content);
      const compiled = Handlebars.compile(promptTemplate);
      
      const prompt = {
        template: compiled,
        metadata,
        path: systemPath,
        version: 'system',
        loadedAt: new Date().toISOString()
      };
      
      this.cache.set(cacheKey, prompt);
      return prompt;
      
    } catch (error) {
      // Último recurso: prompt básico
      return this.createBasicPrompt(agentType);
    }
  }

  /**
   * Crea un prompt básico como último recurso
   * @param {string} agentType - Tipo de agente
   * @returns {Object} Prompt básico
   */
  createBasicPrompt(agentType) {
    const basicPrompts = {
      'content_creator': 'Eres un creador de contenido experto. Crea contenido de alta calidad basado en: {{prompt}}',
      'web_dev': 'Eres un desarrollador web experto. Desarrolla soluciones técnicas para: {{prompt}}',
      'analytics': 'Eres un analista de datos experto. Analiza y proporciona insights sobre: {{prompt}}',
      'critical': 'Eres un evaluador crítico. Evalúa la calidad y seguridad de: {{prompt}}'
    };
    
    const template = basicPrompts[agentType] || 'Eres un asistente IA especializado. Ayuda con: {{prompt}}';
    
    return {
      template: Handlebars.compile(template),
      metadata: { name: `Basic ${agentType} prompt`, version: 'basic' },
      path: 'built-in',
      version: 'basic',
      loadedAt: new Date().toISOString()
    };
  }

  /**
   * Renderiza un prompt con contexto
   * @param {string} agentType - Tipo de agente
   * @param {string} taskType - Tipo de tarea
   * @param {Object} context - Contexto para el template
   * @param {Object} options - Opciones de renderizado
   * @returns {Object} Prompt renderizado
   */
  async renderPrompt(agentType, taskType, context, options = {}) {
    const { version = 'default', experiment = null } = options;
    
    // Seleccionar versión basada en experimento A/B
    const selectedVersion = experiment ? this.selectExperimentVersion(experiment) : version;
    
    // Cargar prompt
    const prompt = await this.loadPrompt(agentType, taskType, selectedVersion);
    
    // Preparar contexto completo
    const fullContext = {
      ...this.getDefaultContext(),
      ...context,
      metadata: prompt.metadata,
      timestamp: new Date().toISOString()
    };
    
    // Renderizar
    const rendered = prompt.template(fullContext);
    
    // Registrar métricas
    this.trackUsage(agentType, taskType, selectedVersion);
    
    return {
      content: rendered,
      metadata: prompt.metadata,
      version: selectedVersion,
      estimatedTokens: this.estimateTokens(rendered)
    };
  }

  /**
   * Sistema de A/B testing para prompts
   * @param {Object} experiment - Configuración del experimento
   * @returns {string} Versión seleccionada
   */
  selectExperimentVersion(experiment) {
    const { name, variants, weights } = experiment;
    
    // Selección ponderada
    const random = Math.random();
    let cumulative = 0;
    
    for (let i = 0; i < variants.length; i++) {
      cumulative += weights[i];
      if (random < cumulative) {
        return variants[i];
      }
    }
    
    return variants[variants.length - 1];
  }

  /**
   * Registra helpers personalizados para Handlebars
   */
  registerHelpers() {
    // Helper para formatear listas
    Handlebars.registerHelper('list', function(items) {
      if (!Array.isArray(items)) return '';
      return items.map(item => `- ${item}`).join('\n');
    });
    
    // Helper para JSON pretty
    Handlebars.registerHelper('json', function(obj) {
      return JSON.stringify(obj, null, 2);
    });
    
    // Helper condicional mejorado
    Handlebars.registerHelper('when', function(value, operator, compare, options) {
      let result = false;
      
      switch (operator) {
        case '>': result = value > compare; break;
        case '<': result = value < compare; break;
        case '>=': result = value >= compare; break;
        case '<=': result = value <= compare; break;
        case '==': result = value == compare; break;
        case '!=': result = value != compare; break;
        case 'includes': result = value && value.includes && value.includes(compare); break;
        case 'empty': result = !value || value.length === 0; break;
      }
      
      return result ? options.fn(this) : options.inverse(this);
    });

    // Helper para truncar texto
    Handlebars.registerHelper('truncate', function(text, length) {
      if (!text || typeof text !== 'string') return '';
      return text.length > length ? text.substring(0, length) + '...' : text;
    });

    // Helper para capitalizar
    Handlebars.registerHelper('capitalize', function(text) {
      if (!text || typeof text !== 'string') return '';
      return text.charAt(0).toUpperCase() + text.slice(1);
    });
  }

  /**
   * Contexto por defecto para todos los prompts
   * @returns {Object} Contexto por defecto
   */
  getDefaultContext() {
    return {
      currentDate: new Date().toISOString().split('T')[0],
      agencyName: process.env.AGENCY_NAME || 'AI Digital Agency',
      environment: process.env.NODE_ENV || 'development',
      helpers: {
        formatCurrency: (amount) => `${amount.toFixed(2)}`,
        formatDate: (date) => new Date(date).toLocaleDateString(),
        truncate: (text, length) => text.length > length ? 
          text.substring(0, length) + '...' : text
      }
    };
  }

  /**
   * Estima el número de tokens de un texto
   * @param {string} text - Texto a analizar
   * @returns {number} Estimación de tokens
   */
  estimateTokens(text) {
    if (!text || typeof text !== 'string') return 0;
    
    // Estimación aproximada: 1 token ≈ 4 caracteres para español
    // 1 token ≈ 3.5 caracteres para inglés
    const avgCharsPerToken = 3.8;
    return Math.ceil(text.length / avgCharsPerToken);
  }

  /**
   * Rastrea el uso de prompts para métricas
   * @param {string} agentType - Tipo de agente
   * @param {string} taskType - Tipo de tarea
   * @param {string} version - Versión usada
   */
  trackUsage(agentType, taskType, version) {
    const key = `${agentType}:${taskType}:${version}`;
    
    if (!this.metrics.has(key)) {
      this.metrics.set(key, {
        uses: 0,
        totalConfidence: 0,
        totalTokens: 0,
        successes: 0,
        reviews: 0,
        approvals: 0,
        firstUsed: new Date().toISOString(),
        lastUsed: null
      });
    }
    
    const metrics = this.metrics.get(key);
    metrics.uses++;
    metrics.lastUsed = new Date().toISOString();
  }

  /**
   * Actualiza métricas después de la ejecución
   * @param {string} agentType - Tipo de agente
   * @param {string} taskType - Tipo de tarea
   * @param {string} version - Versión usada
   * @param {Object} result - Resultado de la ejecución
   */
  updateMetrics(agentType, taskType, version, result) {
    const key = `${agentType}:${taskType}:${version}`;
    const metrics = this.metrics.get(key);
    
    if (metrics) {
      metrics.totalConfidence += result.confidenceScore || 0;
      metrics.totalTokens += result.tokensUsed || 0;
      
      if (result.status === 'completed') {
        metrics.successes++;
      }
      
      if (result.humanFeedback) {
        metrics.reviews++;
        if (result.humanFeedback.wasApproved) {
          metrics.approvals++;
        }
      }
    }
  }

  /**
   * Obtiene métricas de rendimiento de prompts
   * @param {string} agentType - Tipo de agente
   * @param {string} taskType - Tipo de tarea
   * @returns {Object} Métricas de rendimiento
   */
  getPromptMetrics(agentType, taskType) {
    const pattern = `${agentType}:${taskType}:`;
    const relevantMetrics = new Map();
    
    for (const [key, metrics] of this.metrics) {
      if (key.startsWith(pattern)) {
        const version = key.split(':')[2];
        relevantMetrics.set(version, {
          ...metrics,
          avgConfidence: metrics.uses > 0 ? metrics.totalConfidence / metrics.uses : 0,
          avgTokens: metrics.uses > 0 ? metrics.totalTokens / metrics.uses : 0,
          successRate: metrics.uses > 0 ? metrics.successes / metrics.uses : 0,
          approvalRate: metrics.reviews > 0 ? metrics.approvals / metrics.reviews : 0
        });
      }
    }
    
    return Object.fromEntries(relevantMetrics);
  }

  /**
   * Limpia la caché de prompts
   * @param {string} pattern - Patrón opcional para limpieza selectiva
   */
  clearCache(pattern = null) {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }

  /**
   * Obtiene estadísticas de la caché
   * @returns {Object} Estadísticas de caché
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      totalMetrics: this.metrics.size,
      avgUsesPerPrompt: Array.from(this.metrics.values())
        .reduce((sum, m) => sum + m.uses, 0) / this.metrics.size || 0
    };
  }
}

export default PromptManager;