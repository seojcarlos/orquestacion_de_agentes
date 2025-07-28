// Sistema de evaluación IA para contenido educativo

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'basic' | 'intermediate' | 'advanced'
  topic: string
}

export interface EvaluationResult {
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  suggestions: string[]
  nextSteps: string[]
}

export interface LearningProgress {
  topicMastery: { [topic: string]: number }
  skillLevels: { [skill: string]: 'novice' | 'intermediate' | 'advanced' | 'expert' }
  completedSections: string[]
  weakAreas: string[]
  strengths: string[]
}

// Banco de preguntas para JSON Schema
export const JSONSchemaQuizBank: QuizQuestion[] = [
  {
    id: 'basics-1',
    question: '¿Cuál es la principal ventaja de usar JSON Schema en un sistema de agentes IA que procesa millones de requests?',
    options: [
      'Hace el código más bonito',
      'Previene errores y reduce costos de procesamiento',
      'Es un requisito obligatorio',
      'Aumenta la velocidad de internet'
    ],
    correctAnswer: 1,
    explanation: 'JSON Schema actúa como primera línea de defensa, previniendo errores costosos y validando datos antes del procesamiento por IA.',
    difficulty: 'basic',
    topic: 'fundamentos'
  },
  {
    id: 'conditional-1',
    question: 'En un schema con validación condicional, ¿cuándo deberías usar if/then/else en lugar de oneOf?',
    options: [
      'Siempre, es más moderno',
      'Cuando las condiciones dependen de valores específicos de propiedades',
      'Nunca, oneOf es siempre mejor',
      'Solo los lunes'
    ],
    correctAnswer: 1,
    explanation: 'if/then/else es ideal cuando necesitas validación que depende de valores específicos, mientras oneOf es para alternativas mutuamente excluyentes.',
    difficulty: 'intermediate',
    topic: 'validacion-condicional'
  },
  {
    id: 'performance-1',
    question: 'Para optimizar la performance de validación en un sistema que procesa 1M requests/segundo, ¿qué técnica es más efectiva?',
    options: [
      'Usar más servidores',
      'Precompilar schemas y usar referencias $ref',
      'Validar solo algunos requests',
      'Rezar a los dioses del código'
    ],
    correctAnswer: 1,
    explanation: 'Precompilar schemas elimina el overhead de parsing en runtime, y las referencias $ref permiten reutilización eficiente.',
    difficulty: 'advanced',
    topic: 'performance'
  },
  {
    id: 'production-1',
    question: 'En un sistema de producción que maneja datos sensibles, ¿cuál es la práctica más importante?',
    options: [
      'Usar colores bonitos en la UI',
      'Implementar validación en múltiples capas con audit logging',
      'Hacer todo público para transparencia',
      'Confiar en los usuarios'
    ],
    correctAnswer: 1,
    explanation: 'Los sistemas de producción requieren validación multicapa, logging de auditoría y medidas de seguridad robustas.',
    difficulty: 'advanced',
    topic: 'produccion'
  },
  {
    id: 'security-1',
    question: '¿Por qué es importante usar additionalProperties: false en schemas de producción?',
    options: [
      'Para que se vea más profesional',
      'Para prevenir inyección de propiedades no validadas',
      'Porque lo dice el manual',
      'No es importante'
    ],
    correctAnswer: 1,
    explanation: 'additionalProperties: false previene que datos no validados lleguen al sistema, cerrando vectores de ataque comunes.',
    difficulty: 'intermediate',
    topic: 'seguridad'
  }
]

export class AIEvaluationSystem {
  private progress: LearningProgress = {
    topicMastery: {},
    skillLevels: {},
    completedSections: [],
    weakAreas: [],
    strengths: []
  }

  /**
   * Evalúa un quiz adaptativo
   */
  evaluateQuiz(
    answers: { [questionId: string]: number },
    questions: QuizQuestion[],
    timeSpent: number
  ): EvaluationResult {
    let correctAnswers = 0
    const topicScores: { [topic: string]: { correct: number, total: number } } = {}

    // Calcular respuestas correctas y scores por tema
    questions.forEach(question => {
      const isCorrect = answers[question.id] === question.correctAnswer
      if (isCorrect) correctAnswers++

      if (!topicScores[question.topic]) {
        topicScores[question.topic] = { correct: 0, total: 0 }
      }
      topicScores[question.topic].total++
      if (isCorrect) topicScores[question.topic].correct++
    })

    const score = (correctAnswers / questions.length) * 100

    // Actualizar progreso por tema
    Object.entries(topicScores).forEach(([topic, scores]) => {
      this.progress.topicMastery[topic] = (scores.correct / scores.total) * 100
    })

    // Identificar áreas débiles y fortalezas
    this.progress.weakAreas = Object.entries(this.progress.topicMastery)
      .filter(([_, score]) => score < 70)
      .map(([topic, _]) => topic)

    this.progress.strengths = Object.entries(this.progress.topicMastery)
      .filter(([_, score]) => score >= 85)
      .map(([topic, _]) => topic)

    return {
      score,
      totalQuestions: questions.length,
      correctAnswers,
      timeSpent,
      suggestions: this.generateSuggestions(score, this.progress.weakAreas),
      nextSteps: this.generateNextSteps(score, this.progress.weakAreas)
    }
  }

  /**
   * Evalúa código enviado por el usuario
   */
  evaluateCode(code: string, criteria: string[]): {
    overallScore: number
    criteriaScores: { [criteria: string]: { score: number, feedback: string } }
    suggestions: string[]
  } {
    const criteriaScores: { [criteria: string]: { score: number, feedback: string } } = {}
    
    // Simulated code evaluation - en una implementación real usarías AST analysis
    criteria.forEach(criterion => {
      criteriaScores[criterion] = this.evaluateCodeCriterion(code, criterion)
    })

    const scores = Object.values(criteriaScores).map(c => c.score)
    const overallScore = scores.reduce((a, b) => a + b, 0) / scores.length

    return {
      overallScore,
      criteriaScores,
      suggestions: this.generateCodeSuggestions(code, criteriaScores)
    }
  }

  private evaluateCodeCriterion(code: string, criterion: string): { score: number, feedback: string } {
    switch (criterion) {
      case 'correctness':
        const hasValidation = code.includes('validate') && code.includes('schema')
        const hasErrorHandling = code.includes('try') || code.includes('catch')
        const score = (hasValidation ? 50 : 0) + (hasErrorHandling ? 40 : 0) + 10
        return {
          score,
          feedback: hasValidation ? 
            'La lógica de validación está presente' : 
            'Falta implementar la lógica de validación principal'
        }

      case 'performance':
        const hasCache = code.includes('cache') || code.includes('Map')
        const hasOptimization = code.includes('compile') || code.includes('precompile')
        const score2 = (hasCache ? 40 : 0) + (hasOptimization ? 40 : 0) + 20
        return {
          score: score2,
          feedback: hasCache ? 
            'Implementa caching, excelente para performance' : 
            'Considera agregar cache para mejorar performance'
        }

      case 'security':
        const hasSanitization = code.includes('sanitize') || code.includes('escape')
        const hasValidation = code.includes('validate')
        const score3 = (hasSanitization ? 50 : 0) + (hasValidation ? 40 : 0) + 10
        return {
          score: score3,
          feedback: hasSanitization ? 
            'Buenas prácticas de seguridad implementadas' : 
            'Agrega sanitización de inputs para mayor seguridad'
        }

      case 'maintainability':
        const hasComments = code.includes('//') || code.includes('/*')
        const hasModularStructure = code.includes('class') || code.includes('function')
        const score4 = (hasComments ? 30 : 0) + (hasModularStructure ? 50 : 0) + 20
        return {
          score: score4,
          feedback: hasComments ? 
            'Código bien documentado' : 
            'Agrega comentarios para mejor mantenibilidad'
        }

      default:
        return { score: 75, feedback: 'Criterio evaluado satisfactoriamente' }
    }
  }

  private generateSuggestions(score: number, weakAreas: string[]): string[] {
    const suggestions = []

    if (score < 60) {
      suggestions.push('Repasa los conceptos fundamentales antes de continuar')
      suggestions.push('Practica más con los ejemplos interactivos')
    } else if (score < 80) {
      suggestions.push('Muy buen progreso, enfócate en los temas más débiles')
      suggestions.push('Prueba implementar un proyecto pequeño para consolidar')
    } else {
      suggestions.push('¡Excelente dominio! Estás listo para temas avanzados')
      suggestions.push('Considera mentorear a otros estudiantes')
    }

    weakAreas.forEach(area => {
      switch (area) {
        case 'performance':
          suggestions.push('Practica más con optimización de schemas y caching')
          break
        case 'seguridad':
          suggestions.push('Revisa las mejores prácticas de seguridad en validación')
          break
        case 'validacion-condicional':
          suggestions.push('Experimenta más con if/then/else y oneOf')
          break
      }
    })

    return suggestions
  }

  private generateNextSteps(score: number, weakAreas: string[]): string[] {
    const nextSteps = []

    if (score >= 80) {
      nextSteps.push('Avanzar al día 4: Arquitectura de Agentes')
      nextSteps.push('Implementar el proyecto TaskValidator completo')
    } else if (score >= 60) {
      nextSteps.push('Completar los ejercicios prácticos adicionales')
      nextSteps.push('Revisar los temas con menor puntuación')
    } else {
      nextSteps.push('Repasar la teoría fundamental')
      nextSteps.push('Completar todos los ejemplos paso a paso')
    }

    return nextSteps
  }

  private generateCodeSuggestions(code: string, criteriaScores: any): string[] {
    const suggestions = []

    Object.entries(criteriaScores).forEach(([criterion, data]: [string, any]) => {
      if (data.score < 70) {
        switch (criterion) {
          case 'performance':
            suggestions.push('Implementa cache LRU para schemas compilados')
            suggestions.push('Considera usar referencias $ref para reutilización')
            break
          case 'security':
            suggestions.push('Agrega sanitización de inputs')
            suggestions.push('Implementa rate limiting por cliente')
            break
          case 'maintainability':
            suggestions.push('Agrega JSDoc comments para mejor documentación')
            suggestions.push('Extrae validadores a módulos separados')
            break
        }
      }
    })

    return suggestions
  }

  /**
   * Genera el siguiente conjunto de preguntas basado en el rendimiento
   */
  generateAdaptiveQuestions(currentScore: number, weakAreas: string[]): QuizQuestion[] {
    const questions = []

    // Agregar preguntas de áreas débiles
    weakAreas.forEach(area => {
      const areaQuestions = JSONSchemaQuizBank.filter(q => q.topic === area)
      if (areaQuestions.length > 0) {
        questions.push(areaQuestions[Math.floor(Math.random() * areaQuestions.length)])
      }
    })

    // Agregar preguntas de nivel apropiado
    const difficulty = currentScore >= 80 ? 'advanced' : 
                      currentScore >= 60 ? 'intermediate' : 'basic'
    
    const levelQuestions = JSONSchemaQuizBank.filter(q => q.difficulty === difficulty)
    while (questions.length < 5 && levelQuestions.length > 0) {
      const randomQuestion = levelQuestions[Math.floor(Math.random() * levelQuestions.length)]
      if (!questions.find(q => q.id === randomQuestion.id)) {
        questions.push(randomQuestion)
      }
    }

    return questions
  }

  /**
   * Obtiene el progreso actual del usuario
   */
  getProgress(): LearningProgress {
    return { ...this.progress }
  }

  /**
   * Actualiza el progreso cuando se completa una sección
   */
  markSectionComplete(sectionId: string) {
    if (!this.progress.completedSections.includes(sectionId)) {
      this.progress.completedSections.push(sectionId)
    }
  }

  /**
   * Calcula el nivel de habilidad basado en el progreso
   */
  calculateSkillLevel(topic: string): 'novice' | 'intermediate' | 'advanced' | 'expert' {
    const mastery = this.progress.topicMastery[topic] || 0
    
    if (mastery >= 90) return 'expert'
    if (mastery >= 75) return 'advanced'
    if (mastery >= 50) return 'intermediate'
    return 'novice'
  }
}

// Instancia global del sistema de evaluación
export const globalEvaluationSystem = new AIEvaluationSystem()