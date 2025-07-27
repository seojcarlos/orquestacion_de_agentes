// agents.config.js - Configuración de Agentes para Claude Flow
module.exports = {
  // Configuración de la Mente Colmena
  hiveMode: {
    enabled: true,
    queen: 'asistente', // Agente coordinador principal
    workers: ['ejecutor', 'profesor'],
    memory: {
      type: 'sqlite',
      path: './.claude-flow/memory.sqlite',
      retention: '30d' // Retención de memoria por 30 días
    }
  },

  // Definición de Agentes
  agents: {
    asistente: {
      name: 'Agente Asistente',
      role: 'queen',
      color: 'purple',
      emoji: '👑',
      description: 'Coordina tareas y mantiene contexto del proyecto',
      capabilities: [
        'task_coordination',
        'context_management',
        'user_interaction',
        'workflow_orchestration'
      ],
      personality: {
        tone: 'helpful',
        style: 'conversational',
        traits: ['organized', 'proactive', 'empathetic']
      },
      specializations: [
        'project_planning',
        'requirement_analysis',
        'task_distribution'
      ]
    },

    ejecutor: {
      name: 'Agente Ejecutor',
      role: 'worker',
      color: 'blue',
      emoji: '⚡',
      description: 'Implementa código y funcionalidades técnicas',
      capabilities: [
        'code_generation',
        'refactoring',
        'testing',
        'optimization'
      ],
      personality: {
        tone: 'technical',
        style: 'precise',
        traits: ['efficient', 'detail-oriented', 'innovative']
      },
      specializations: [
        'react_development',
        'nextjs_optimization',
        'typescript_patterns',
        'performance_tuning'
      ],
      tools: [
        'code_analysis',
        'test_generation',
        'documentation',
        'linting'
      ]
    },

    profesor: {
      name: 'Agente Profesor',
      role: 'worker',
      color: 'green',
      emoji: '📚',
      description: 'Explica conceptos y crea material educativo',
      capabilities: [
        'concept_explanation',
        'tutorial_creation',
        'example_generation',
        'learning_adaptation'
      ],
      personality: {
        tone: 'educational',
        style: 'clear',
        traits: ['patient', 'thorough', 'encouraging']
      },
      specializations: [
        'web_development',
        'react_patterns',
        'best_practices',
        'learning_paths'
      ],
      pedagogicalApproach: {
        method: 'progressive',
        adaptToLevel: true,
        includeExamples: true,
        practicalFocus: true
      }
    }
  },

  // Flujos de Trabajo Predefinidos
  workflows: {
    createTutorial: {
      name: 'Crear Tutorial Completo',
      agents: ['asistente', 'profesor', 'ejecutor'],
      steps: [
        {
          agent: 'asistente',
          action: 'analyze_requirements',
          output: 'tutorial_structure'
        },
        {
          agent: 'profesor',
          action: 'create_content',
          input: 'tutorial_structure',
          output: 'educational_content'
        },
        {
          agent: 'ejecutor',
          action: 'implement_examples',
          input: 'educational_content',
          output: 'interactive_demos'
        },
        {
          agent: 'profesor',
          action: 'review_and_enhance',
          input: 'interactive_demos',
          output: 'final_tutorial'
        }
      ]
    },

    implementFeature: {
      name: 'Implementar Nueva Funcionalidad',
      agents: ['asistente', 'ejecutor', 'profesor'],
      steps: [
        {
          agent: 'asistente',
          action: 'break_down_requirements',
          output: 'task_list'
        },
        {
          agent: 'ejecutor',
          action: 'implement_code',
          parallel: true,
          tasks: ['backend', 'frontend', 'tests']
        },
        {
          agent: 'profesor',
          action: 'document_feature',
          input: 'implementation',
          output: 'documentation'
        }
      ]
    },

    codeReview: {
      name: 'Revisión de Código Inteligente',
      agents: ['ejecutor', 'profesor'],
      steps: [
        {
          agent: 'ejecutor',
          action: 'analyze_code_quality',
          checks: ['performance', 'security', 'best_practices']
        },
        {
          agent: 'profesor',
          action: 'explain_improvements',
          format: 'educational'
        }
      ]
    }
  },

  // Herramientas Disponibles
  tools: {
    enabled: [
      'code_generation',
      'test_creation',
      'documentation',
      'refactoring',
      'performance_analysis',
      'accessibility_check',
      'security_scan',
      'dependency_analysis',
      'tutorial_generator',
      'example_builder',
      'interactive_demo_creator',
      'learning_path_designer'
    ],
    
    customTools: {
      nextjsOptimizer: {
        description: 'Optimiza específicamente para Next.js',
        agent: 'ejecutor'
      },
      reactPatternAnalyzer: {
        description: 'Analiza y sugiere patrones de React',
        agent: 'profesor'
      },
      projectContextManager: {
        description: 'Mantiene contexto del proyecto educativo',
        agent: 'asistente'
      }
    }
  },

  // Configuración de Comunicación
  communication: {
    mode: 'collaborative',
    language: 'es',
    formatting: {
      code: 'typescript',
      docs: 'markdown',
      comments: 'jsdoc'
    },
    realTimeUpdates: true,
    notifications: {
      taskComplete: true,
      errorAlert: true,
      suggestionAvailable: true
    }
  },

  // Configuración de Memoria y Aprendizaje
  learning: {
    enabled: true,
    adaptToUser: true,
    trackProgress: true,
    personalizeExplanations: true,
    difficultyAdjustment: 'automatic'
  },

  // Límites y Performance
  performance: {
    maxConcurrentAgents: 3,
    taskTimeout: '5m',
    cacheResults: true,
    offlineMode: 'partial',
    resourceLimits: {
      memory: '2GB',
      cpu: '80%'
    }
  }
};
