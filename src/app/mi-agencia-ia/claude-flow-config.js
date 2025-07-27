/**
 * Configuración de Claude Flow para Mi Agencia IA
 * Define el flujo de trabajo y los agentes para la formación
 */

export const miAgenciaIAFlow = {
  name: 'Mi Agencia IA - Formación Completa',
  description: 'Sistema de formación para crear una agencia digital con IA',
  version: '1.0.0',
  
  agents: {
    // Agente Instructor - Guía la formación
    instructor: {
      name: 'Instructor Agent',
      role: 'Guiar al estudiante a través del programa de formación',
      capabilities: [
        'Explicar conceptos complejos de forma simple',
        'Proporcionar ejemplos prácticos',
        'Evaluar el progreso del estudiante',
        'Sugerir recursos adicionales'
      ],
      prompts: {
        system: `Eres un instructor experto en desarrollo de sistemas IA multi-agente. 
        Tu objetivo es guiar al estudiante paso a paso a través del programa de 12 meses.
        Debes ser claro, motivador y práctico.`,
        
        explainConcept: `Explica el concepto de {{concept}} de forma clara y con ejemplos prácticos.
        Relaciona el concepto con el proyecto de Mi Agencia IA.`,
        
        reviewCode: `Revisa el siguiente código del estudiante:
        {{code}}
        
        Proporciona feedback constructivo sobre:
        1. Buenas prácticas aplicadas
        2. Áreas de mejora
        3. Sugerencias específicas`,
        
        suggestNext: `Basándote en el progreso actual del estudiante en {{currentWeek}},
        sugiere los próximos pasos y recursos adicionales.`
      }
    },
    
    // Agente Técnico - Ayuda con implementación
    technical: {
      name: 'Technical Assistant',
      role: 'Asistir con la implementación técnica y resolver dudas de código',
      capabilities: [
        'Generar código ejemplo',
        'Debuggear errores',
        'Optimizar implementaciones',
        'Sugerir mejores prácticas'
      ],
      prompts: {
        system: `Eres un experto técnico en Node.js, React, TypeScript y sistemas de IA.
        Ayudas a implementar el sistema Mi Agencia IA siguiendo las mejores prácticas.`,
        
        generateCode: `Genera código para {{feature}} siguiendo estos requisitos:
        - Tecnologías: {{technologies}}
        - Patrón: {{pattern}}
        - Debe ser escalable y mantenible`,
        
        debugError: `Analiza el siguiente error:
        {{error}}
        
        Contexto: {{context}}
        
        Proporciona:
        1. Causa del error
        2. Solución paso a paso
        3. Cómo prevenirlo en el futuro`
      }
    },
    
    // Agente de Progreso - Trackea avance
    progress: {
      name: 'Progress Tracker',
      role: 'Monitorear y reportar el progreso del estudiante',
      capabilities: [
        'Trackear tareas completadas',
        'Calcular métricas de progreso',
        'Identificar áreas de dificultad',
        'Generar reportes de avance'
      ],
      prompts: {
        system: `Eres un sistema de tracking de progreso para el programa Mi Agencia IA.
        Monitorizas el avance del estudiante y generas insights útiles.`,
        
        weeklyReport: `Genera un reporte semanal para la semana {{week}} del mes {{month}}.
        Incluye:
        - Tareas completadas
        - Tiempo dedicado
        - Conceptos dominados
        - Áreas de mejora
        - Recomendaciones`
      }
    }
  },
  
  workflows: {
    // Flujo de inicio de semana
    weekStart: {
      description: 'Iniciar una nueva semana de formación',
      steps: [
        {
          agent: 'instructor',
          action: 'explainWeeklyGoals',
          input: 'weekNumber, monthNumber'
        },
        {
          agent: 'technical',
          action: 'setupWeekEnvironment',
          input: 'weekRequirements'
        },
        {
          agent: 'progress',
          action: 'createWeeklyTasks',
          input: 'weekPlan'
        }
      ]
    },
    
    // Flujo de práctica diaria
    dailyPractice: {
      description: 'Sesión de práctica diaria',
      steps: [
        {
          agent: 'progress',
          action: 'getTodaysTasks',
          input: 'currentDate'
        },
        {
          agent: 'instructor',
          action: 'explainConcepts',
          input: 'todaysTheory'
        },
        {
          agent: 'technical',
          action: 'guidePractice',
          input: 'todaysPractice'
        }
      ]
    },
    
    // Flujo de revisión de código
    codeReview: {
      description: 'Revisar código implementado',
      steps: [
        {
          agent: 'technical',
          action: 'analyzeCode',
          input: 'submittedCode'
        },
        {
          agent: 'instructor',
          action: 'provideFeeback',
          input: 'codeAnalysis'
        },
        {
          agent: 'progress',
          action: 'updateProgress',
          input: 'reviewResults'
        }
      ]
    },
    
    // Flujo de fin de mes
    monthEnd: {
      description: 'Cerrar un mes y preparar el siguiente',
      steps: [
        {
          agent: 'progress',
          action: 'generateMonthlyReport',
          input: 'monthNumber'
        },
        {
          agent: 'instructor',
          action: 'evaluateProgress',
          input: 'monthlyMetrics'
        },
        {
          agent: 'instructor',
          action: 'prepareNextMonth',
          input: 'nextMonthPlan'
        }
      ]
    }
  },
  
  // Métricas a trackear
  metrics: {
    completion: {
      tasks: 'Porcentaje de tareas completadas',
      weeks: 'Semanas completadas vs planificadas',
      concepts: 'Conceptos dominados'
    },
    quality: {
      codeReviews: 'Puntuación promedio en revisiones',
      bestPractices: 'Adherencia a mejores prácticas',
      tests: 'Cobertura de tests'
    },
    engagement: {
      dailyTime: 'Tiempo diario dedicado',
      consistency: 'Días consecutivos de práctica',
      questions: 'Preguntas realizadas'
    }
  },
  
  // Integración con el sistema actual
  integration: {
    database: {
      collections: [
        'formacion_progress',
        'formacion_tasks',
        'formacion_feedback',
        'formacion_metrics'
      ]
    },
    
    events: [
      'formacion:taskCompleted',
      'formacion:weekStarted',
      'formacion:conceptMastered',
      'formacion:milestoneReached'
    ],
    
    notifications: {
      daily: 'Recordatorio de práctica diaria',
      weekly: 'Resumen semanal de progreso',
      milestone: 'Celebración de hitos alcanzados'
    }
  }
};

// Exportar configuración para Claude Flow
export default miAgenciaIAFlow;