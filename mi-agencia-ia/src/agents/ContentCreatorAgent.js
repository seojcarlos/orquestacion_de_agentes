import BaseAgent from './BaseAgent.js';

/**
 * ContentCreatorAgent - Agente especializado en creación de contenido
 * 
 * Capacidades:
 * - Creación de blogs posts optimizados
 * - Copy para redes sociales
 * - Contenido para emails
 * - Landing pages copy
 * - Artículos SEO
 */
class ContentCreatorAgent extends BaseAgent {
  constructor(taskManager, promptManager, costOptimizer) {
    super('content_creator', taskManager, promptManager, costOptimizer);
    
    // Configuración específica del agente
    this.config = {
      ...this.config,
      defaultModel: 'claude-3-haiku', // Bueno para creatividad y costo eficiente
      maxRetries: 2,
      timeoutMs: 45000, // Más tiempo para tareas creativas
      specializations: [
        'blog_posts',
        'social_media',
        'email_content',
        'landing_pages',
        'seo_articles'
      ]
    };
  }

  /**
   * Procesa una tarea de creación de contenido
   * @param {Object} task - Tarea a procesar
   * @returns {Object} Resultado de la creación de contenido
   */
  async processTask(task) {
    try {
      // 1. Validar que la tarea sea apropiada para este agente
      this.validateTask(task);
      
      // 2. Actualizar estado a "en progreso"
      await this.updateTaskProgress(task, 'in_progress', {
        message: 'Iniciando creación de contenido',
        step: 'validation_complete'
      });

      // 3. Detectar tipo de contenido
      const contentType = this.detectContentType(task.input.prompt);
      
      // 4. Cargar el prompt apropiado
      const promptTemplate = await this.loadPromptForContentType(contentType, task);
      
      // 5. Preparar contexto completo
      const context = this.prepareContentContext(task, contentType);
      
      // 6. Ejecutar la IA con el prompt optimizado
      const result = await this.executeWithAI(promptTemplate, context, {
        contentType,
        requiresCreativity: true
      });

      // 7. Post-procesar el resultado
      const processedResult = this.processContentResult(result, contentType, task);
      
      // 8. Finalizar la tarea
      await this.completeTask(task, processedResult);
      
      return processedResult;
      
    } catch (error) {
      console.error(`Error in ContentCreatorAgent processing task ${task.taskId}:`, error);
      
      // Manejar el error y crear un resultado de error estructurado
      const errorResult = this.handleError(error, task);
      
      // Marcar tarea como fallida
      await this.updateTaskProgress(task, 'failed', {
        error: error.message,
        step: 'processing_failed'
      });
      
      return errorResult;
    }
  }

  /**
   * Detecta el tipo de contenido basándose en el prompt
   * @param {string} prompt - Prompt de la tarea
   * @returns {string} Tipo de contenido detectado
   */
  detectContentType(prompt) {
    const promptLower = prompt.toLowerCase();
    
    // Patrones para detectar diferentes tipos de contenido
    const patterns = {
      'blog_post': ['blog', 'artículo', 'post', 'entrada'],
      'social_media': ['social', 'twitter', 'facebook', 'instagram', 'linkedin', 'post social'],
      'email_content': ['email', 'correo', 'newsletter', 'boletín'],
      'landing_page': ['landing', 'página de aterrizaje', 'conversion'],
      'seo_article': ['seo', 'palabras clave', 'keywords', 'posicionamiento']
    };
    
    for (const [type, keywords] of Object.entries(patterns)) {
      if (keywords.some(keyword => promptLower.includes(keyword))) {
        return type;
      }
    }
    
    // Por defecto, asumir que es un blog post
    return 'blog_post';
  }

  /**
   * Carga el prompt apropiado para el tipo de contenido
   * @param {string} contentType - Tipo de contenido
   * @param {Object} task - Tarea actual
   * @returns {string} Prompt renderizado
   */
  async loadPromptForContentType(contentType, task) {
    if (!this.promptManager) {
      // Fallback si no hay PromptManager disponible
      return this.createFallbackPrompt(contentType, task);
    }
    
    try {
      // Intentar cargar prompt específico
      const promptData = await this.promptManager.renderPrompt(
        'content_creator',
        contentType,
        this.prepareContentContext(task, contentType)
      );
      
      return promptData.content;
      
    } catch (error) {
      console.warn(`Could not load prompt for ${contentType}, using fallback`);
      return this.createFallbackPrompt(contentType, task);
    }
  }

  /**
   * Crea un prompt de fallback cuando no está disponible el PromptManager
   * @param {string} contentType - Tipo de contenido
   * @param {Object} task - Tarea actual
   * @returns {string} Prompt de fallback
   */
  createFallbackPrompt(contentType, task) {
    const basePrompt = `Eres un creador de contenido experto. Tu tarea es: ${task.input.prompt}`;
    
    const typeSpecificInstructions = {
      'blog_post': `
Crea un artículo de blog profesional y atractivo. Incluye:
- Título llamativo (60-70 caracteres)
- Introducción que enganche
- 3-5 secciones principales con subtítulos
- Conclusión con call-to-action
- Longitud: 800-1200 palabras`,
      
      'social_media': `
Crea contenido para redes sociales optimizado. Incluye:
- Texto principal atractivo y conciso
- Hashtags relevantes
- Call-to-action claro
- Tono conversacional y auténtico`,
      
      'email_content': `
Crea contenido para email efectivo. Incluye:
- Asunto llamativo
- Saludo personalizado
- Cuerpo del mensaje claro y directo
- Call-to-action prominente
- Cierre profesional`,
      
      'landing_page': `
Crea copy para landing page de alta conversión. Incluye:
- Headline impactante
- Propuesta de valor clara
- Beneficios específicos
- Prueba social
- Call-to-action irresistible`,
      
      'seo_article': `
Crea un artículo optimizado para SEO. Incluye:
- Título con keyword principal
- Estructura H1, H2, H3 clara
- Densidad de keywords natural
- Meta descripción (150-160 caracteres)
- Enlaces internos sugeridos`
    };
    
    return basePrompt + (typeSpecificInstructions[contentType] || typeSpecificInstructions['blog_post']);
  }

  /**
   * Prepara el contexto específico para creación de contenido
   * @param {Object} task - Tarea actual
   * @param {string} contentType - Tipo de contenido
   * @returns {Object} Contexto preparado
   */
  prepareContentContext(task, contentType) {
    const baseContext = this.prepareContext(task);
    
    return {
      ...baseContext,
      contentType,
      specialization: this.config.specializations,
      brandGuidelines: task.input.context?.brandGuide || {},
      targetAudience: task.input.context?.buyerPersona || {},
      constraints: task.input.context?.constraints || {},
      previousContent: task.input.context?.previousTasksOutput || [],
      seoRequirements: task.input.context?.seoRequirements || {},
      toneOfVoice: task.input.context?.brandGuide?.voice || 'professional',
      contentGoals: this.extractContentGoals(task.input.prompt),
      wordCountTarget: this.extractWordCount(task.input.prompt) || this.getDefaultWordCount(contentType)
    };
  }

  /**
   * Extrae objetivos del contenido del prompt
   * @param {string} prompt - Prompt de la tarea
   * @returns {Array} Lista de objetivos detectados
   */
  extractContentGoals(prompt) {
    const goals = [];
    const promptLower = prompt.toLowerCase();
    
    const goalPatterns = {
      'increase_awareness': ['conciencia', 'awareness', 'conocimiento'],
      'generate_leads': ['leads', 'contactos', 'suscriptores'],
      'drive_sales': ['ventas', 'compras', 'conversiones'],
      'educate': ['educar', 'enseñar', 'explicar'],
      'entertain': ['entretener', 'divertir', 'humor'],
      'build_trust': ['confianza', 'credibilidad', 'autoridad']
    };
    
    for (const [goal, keywords] of Object.entries(goalPatterns)) {
      if (keywords.some(keyword => promptLower.includes(keyword))) {
        goals.push(goal);
      }
    }
    
    return goals.length > 0 ? goals : ['inform']; // Default goal
  }

  /**
   * Extrae cantidad de palabras objetivo del prompt
   * @param {string} prompt - Prompt de la tarea
   * @returns {number|null} Número de palabras o null
   */
  extractWordCount(prompt) {
    const wordCountMatch = prompt.match(/(\d+)\s*palabras?/i);
    return wordCountMatch ? parseInt(wordCountMatch[1]) : null;
  }

  /**
   * Obtiene cantidad de palabras por defecto según tipo de contenido
   * @param {string} contentType - Tipo de contenido
   * @returns {number} Número de palabras por defecto
   */
  getDefaultWordCount(contentType) {
    const defaults = {
      'blog_post': 1000,
      'social_media': 150,
      'email_content': 300,
      'landing_page': 500,
      'seo_article': 1500
    };
    
    return defaults[contentType] || 800;
  }

  /**
   * Post-procesa el resultado del contenido creado
   * @param {Object} result - Resultado de la IA
   * @param {string} contentType - Tipo de contenido
   * @param {Object} task - Tarea original
   * @returns {Object} Resultado procesado
   */
  processContentResult(result, contentType, task) {
    // Agregar metadatos específicos del contenido
    const processedResult = {
      ...result,
      contentMetadata: {
        type: contentType,
        wordCount: this.countWords(result.data),
        estimatedReadTime: this.calculateReadTime(result.data),
        seoScore: this.calculateBasicSEOScore(result.data, task),
        qualityChecks: this.performQualityChecks(result.data, contentType)
      }
    };
    
    // Ajustar confidence score basado en quality checks
    const qualityScore = this.calculateQualityScore(processedResult.contentMetadata.qualityChecks);
    processedResult.confidenceScore = Math.min(result.confidenceScore, qualityScore);
    
    // Agregar sugerencias específicas si la calidad no es óptima
    if (qualityScore < 0.8) {
      processedResult.warnings = [
        ...(result.warnings || []),
        'El contenido generado podría beneficiarse de revisión adicional',
        'Revisar estructura y flujo narrativo',
        'Validar tono con guidelines de marca'
      ];
    }
    
    return processedResult;
  }

  /**
   * Cuenta palabras en el texto
   * @param {string} text - Texto a analizar
   * @returns {number} Número de palabras
   */
  countWords(text) {
    if (!text || typeof text !== 'string') return 0;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  /**
   * Calcula tiempo estimado de lectura
   * @param {string} text - Texto a analizar
   * @returns {number} Tiempo en minutos
   */
  calculateReadTime(text) {
    const wordsPerMinute = 200; // Velocidad promedio de lectura
    const wordCount = this.countWords(text);
    return Math.ceil(wordCount / wordsPerMinute);
  }

  /**
   * Calcula score básico de SEO
   * @param {string} text - Texto a analizar
   * @param {Object} task - Tarea original
   * @returns {number} Score de SEO (0-1)
   */
  calculateBasicSEOScore(text, task) {
    let score = 0.5; // Score base
    
    if (!text) return 0;
    
    const textLower = text.toLowerCase();
    const prompt = task.input.prompt.toLowerCase();
    
    // Verificar si contiene keywords del prompt
    const promptWords = prompt.split(/\s+/).filter(word => word.length > 3);
    const keywordPresence = promptWords.some(word => textLower.includes(word));
    if (keywordPresence) score += 0.2;
    
    // Verificar estructura (títulos, párrafos)
    if (text.includes('#') || text.includes('##')) score += 0.1;
    
    // Verificar longitud apropiada
    const wordCount = this.countWords(text);
    if (wordCount >= 300 && wordCount <= 2000) score += 0.2;
    
    return Math.min(score, 1);
  }

  /**
   * Realiza verificaciones de calidad del contenido
   * @param {string} text - Texto a analizar
   * @param {string} contentType - Tipo de contenido
   * @returns {Object} Resultados de verificaciones de calidad
   */
  performQualityChecks(text, contentType) {
    const checks = {
      hasTitle: false,
      hasIntroduction: false,
      hasConclusion: false,
      hasCallToAction: false,
      properLength: false,
      goodStructure: false
    };
    
    if (!text) return checks;
    
    const textLower = text.toLowerCase();
    const wordCount = this.countWords(text);
    const minWords = this.getDefaultWordCount(contentType) * 0.8;
    const maxWords = this.getDefaultWordCount(contentType) * 1.5;
    
    // Verificar título (primera línea o headers)
    checks.hasTitle = text.startsWith('#') || text.split('\n')[0].length < 100;
    
    // Verificar introducción (primeros párrafos)
    checks.hasIntroduction = text.split('\n').length > 2;
    
    // Verificar conclusión
    checks.hasConclusion = textLower.includes('conclusión') || 
                          textLower.includes('resumen') ||
                          textLower.includes('en resumen');
    
    // Verificar call-to-action
    checks.hasCallToAction = textLower.includes('contacta') ||
                            textLower.includes('suscríbete') ||
                            textLower.includes('descarga') ||
                            textLower.includes('compra');
    
    // Verificar longitud apropiada
    checks.properLength = wordCount >= minWords && wordCount <= maxWords;
    
    // Verificar estructura (párrafos, secciones)
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);
    checks.goodStructure = paragraphs.length >= 3;
    
    return checks;
  }

  /**
   * Calcula score de calidad basado en las verificaciones
   * @param {Object} qualityChecks - Resultados de verificaciones
   * @returns {number} Score de calidad (0-1)
   */
  calculateQualityScore(qualityChecks) {
    const totalChecks = Object.keys(qualityChecks).length;
    const passedChecks = Object.values(qualityChecks).filter(check => check).length;
    
    return passedChecks / totalChecks;
  }

  /**
   * Obtiene la configuración específica del agente
   * @returns {Object} Configuración del ContentCreatorAgent
   */
  getAgentConfig() {
    return {
      agentId: this.agentId,
      type: 'content_creator',
      capabilities: [
        'blog_writing',
        'social_media_content',
        'email_copywriting',
        'landing_page_copy',
        'seo_optimization',
        'brand_voice_adaptation'
      ],
      supportedTaskTypes: this.config.specializations,
      requiredContext: [
        'prompt',
        'target_audience',
        'brand_guidelines'
      ],
      optionalContext: [
        'seo_requirements',
        'word_count_target',
        'content_goals',
        'previous_content'
      ],
      outputFormat: {
        contentType: 'string',
        structure: 'formatted_text',
        includesMetadata: true,
        qualityMetrics: true
      }
    };
  }
}

export default ContentCreatorAgent;