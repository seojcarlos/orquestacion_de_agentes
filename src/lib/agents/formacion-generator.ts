/**
 * Generador Automático de Contenido de Formación
 * Usa Claude Flow para generar dinámicamente todo el contenido de Mi Agencia IA
 */

interface WeekContent {
  weekNumber: number;
  month: number;
  title: string;
  description: string;
  objectives: string[];
  resources: Resource[];
  days: DayContent[];
  deliverable: string;
  nextWeekPreview?: string;
}

interface DayContent {
  day: string;
  theme: string;
  tasks: Task[];
  timeEstimate: string;
}

interface Task {
  id: string;
  type: 'theory' | 'practice' | 'project' | 'review';
  title: string;
  description: string;
  code?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // en minutos
}

interface Resource {
  type: 'book' | 'course' | 'video' | 'documentation' | 'article';
  name: string;
  author?: string;
  url?: string;
  chapters?: string;
  priority: 'essential' | 'recommended' | 'optional';
}

export class FormacionGenerator {
  private claudeFlow: any;
  
  constructor(claudeFlow: any) {
    this.claudeFlow = claudeFlow;
  }

  /**
   * Genera el contenido completo de una semana
   */
  async generateWeekContent(month: number, week: number): Promise<WeekContent> {
    const prompt = this.buildWeekPrompt(month, week);
    
    const response = await this.claudeFlow.executeFlow('generate_week_content', {
      month,
      week,
      prompt,
      previousWeeks: await this.getPreviousWeeksContext(month, week)
    });

    return this.parseWeekResponse(response);
  }

  /**
   * Genera contenido de un día específico
   */
  async generateDayContent(month: number, week: number, day: string): Promise<DayContent> {
    const weekContext = await this.getWeekContext(month, week);
    
    const prompt = `
Genera el contenido detallado para ${day} de la Semana ${week} del Mes ${month} de Mi Agencia IA.

CONTEXTO DE LA SEMANA:
${JSON.stringify(weekContext, null, 2)}

REQUERIMIENTOS:
- Debe seguir la progresión lógica del programa
- Incluir tanto teoría como práctica
- Código funcional y explicado
- Conectar con semanas anteriores
- Preparar para próximos conceptos

FORMATO DE RESPUESTA:
{
  "day": "${day}",
  "theme": "Tema principal del día",
  "tasks": [
    {
      "type": "theory|practice|project|review",
      "title": "Título de la tarea",
      "description": "Descripción detallada",
      "code": "Código ejemplo si aplica",
      "difficulty": "beginner|intermediate|advanced",
      "estimatedTime": 120
    }
  ],
  "timeEstimate": "2-3 horas"
}`;

    const response = await this.claudeFlow.executeFlow('generate_day_content', {
      prompt,
      context: { month, week, day, weekContext }
    });

    return JSON.parse(response.content);
  }

  /**
   * Construye el prompt para generar una semana completa
   */
  private buildWeekPrompt(month: number, week: number): string {
    const roadmap = this.getRoadmapContext(month);
    
    return `
Eres el arquitecto principal del programa "Mi Agencia IA". Genera el contenido completo para:

SEMANA ${week} del MES ${month}

CONTEXTO DEL PROGRAMA:
${roadmap}

PRINCIPIOS DE DISEÑO:
1. Progresión incremental - cada concepto se basa en el anterior
2. Práctica inmediata - teoría seguida de implementación
3. Proyectos reales - código que funciona y se puede usar
4. Arquitectura sólida - patrones que escalan
5. Aprendizaje activo - el estudiante debe "hacer" no solo "leer"

ESTRUCTURA REQUERIDA:
- Título descriptivo y motivador
- Objetivos claros y medibles
- 5 días de contenido detallado
- Recursos específicos (libros, cursos, docs)
- Proyecto/entregable de la semana
- Conexión con semana anterior y siguiente

FORMATO DE RESPUESTA JSON:
{
  "title": "Título de la semana",
  "description": "Descripción motivadora",
  "objectives": ["Objetivo 1", "Objetivo 2", ...],
  "resources": [
    {
      "type": "book|course|video|documentation",
      "name": "Nombre del recurso",
      "author": "Autor si aplica",
      "chapters": "Capítulos específicos",
      "priority": "essential|recommended|optional"
    }
  ],
  "days": [
    {
      "day": "Lunes",
      "theme": "Tema del día",
      "tasks": [
        {
          "type": "theory|practice|project|review",
          "title": "Título de la tarea",
          "description": "Descripción detallada con contexto",
          "code": "Código funcional si aplica",
          "difficulty": "beginner|intermediate|advanced",
          "estimatedTime": 90
        }
      ]
    }
  ],
  "deliverable": "Entregable principal de la semana",
  "nextWeekPreview": "Vista previa de la próxima semana"
}

IMPORTANTE: El código debe ser funcional, bien comentado y seguir las mejores prácticas.
`;
  }

  /**
   * Obtiene el contexto del roadmap para un mes específico
   */
  private getRoadmapContext(month: number): string {
    const roadmapPhases = {
      1: {
        phase: "Fundamentos",
        focus: "Task Management y arquitectura base",
        technologies: ["Node.js", "Express", "JSON Schema", "Git"],
        concepts: ["Clean Code", "Task Schema", "BaseAgent", "Pruebas unitarias"]
      },
      2: {
        phase: "Fundamentos",
        focus: "Prompts y optimización de costes",
        technologies: ["Handlebars", "Redis", "LangChain", "APIs IA"],
        concepts: ["PromptManager", "A/B testing", "Caché inteligente", "Router de modelos"]
      },
      3: {
        phase: "Fundamentos", 
        focus: "Bucle de corrección y aprendizaje",
        technologies: ["EventEmitter", "Jest", "Machine Learning básico"],
        concepts: ["CorrectionLoop", "Memoria de correcciones", "Métricas", "Dashboard"]
      },
      4: {
        phase: "Orquestación",
        focus: "Arquitectura de eventos y colaboración",
        technologies: ["EventBus", "YAML", "Microservicios"],
        concepts: ["Publisher/Subscriber", "Orchestrator", "Workflows", "Multi-agente"]
      },
      5: {
        phase: "Orquestación",
        focus: "Dashboards y monitorización",
        technologies: ["Socket.io", "Recharts", "Langfuse"],
        concepts: ["Real-time metrics", "Observabilidad", "ROI analysis"]
      },
      6: {
        phase: "Orquestación",
        focus: "MVP y agente crítico",
        technologies: ["Vercel", "Railway", "GitHub Actions"],
        concepts: ["QA automático", "Deployment", "CI/CD", "MVP"]
      },
      7: {
        phase: "Visualización",
        focus: "React Flow y canvas de agentes",
        technologies: ["React Flow", "D3.js", "WebSockets"],
        concepts: ["Nodos custom", "Animaciones", "Canvas interactivo"]
      },
      8: {
        phase: "Visualización", 
        focus: "Sistema de validación visual",
        technologies: ["React Query", "Zustand", "UI/UX avanzado"],
        concepts: ["Cola de validación", "Corrección inline", "Historial visual"]
      },
      9: {
        phase: "Visualización",
        focus: "Analytics y reportes",
        technologies: ["PDF generation", "CSV export", "Dashboards custom"],
        concepts: ["ROI metrics", "Business intelligence", "Data visualization"]
      },
      10: {
        phase: "Productización",
        focus: "Multi-tenancy",
        technologies: ["PostgreSQL", "Prisma", "Tenant isolation"],
        concepts: ["Arquitectura multi-tenant", "Seguridad", "Escalabilidad"]
      },
      11: {
        phase: "Productización",
        focus: "Pagos y SaaS",
        technologies: ["Stripe", "Clerk", "Webhooks"],
        concepts: ["Suscripciones", "Billing", "Customer portal"]
      },
      12: {
        phase: "Productización",
        focus: "Lanzamiento y operaciones",
        technologies: ["Monitoring", "Alertas", "Producción"],
        concepts: ["Go-to-market", "Customer success", "Operaciones"]
      }
    };

    return JSON.stringify(roadmapPhases[month] || {}, null, 2);
  }

  /**
   * Obtiene el contexto de semanas anteriores
   */
  private async getPreviousWeeksContext(month: number, week: number): Promise<string> {
    // Implementar lógica para obtener contexto de semanas anteriores
    // Por ahora retornamos un contexto básico
    return `Contexto de semanas anteriores para Mes ${month}, Semana ${week}`;
  }

  /**
   * Obtiene el contexto de una semana específica
   */
  private async getWeekContext(month: number, week: number): Promise<any> {
    // Implementar lógica para obtener contexto de la semana
    return {
      month,
      week,
      phase: month <= 3 ? "Fundamentos" : month <= 6 ? "Orquestación" : month <= 9 ? "Visualización" : "Productización"
    };
  }

  /**
   * Parsea la respuesta de Claude Flow para extraer contenido estructurado
   */
  private parseWeekResponse(response: any): WeekContent {
    try {
      return JSON.parse(response.content);
    } catch (error) {
      throw new Error(`Error parsing week content: ${error.message}`);
    }
  }

  /**
   * Valida que el contenido generado cumple con los estándares
   */
  async validateContent(content: WeekContent): Promise<boolean> {
    const validationPrompt = `
Valida el siguiente contenido de formación:

${JSON.stringify(content, null, 2)}

CRITERIOS DE VALIDACIÓN:
1. ¿Los objetivos son claros y medibles?
2. ¿La progresión de lunes a viernes es lógica?
3. ¿El código es funcional y bien documentado?
4. ¿Los recursos son relevantes y actuales?
5. ¿El nivel de dificultad es apropiado?
6. ¿Conecta bien con el programa general?

Responde con JSON:
{
  "isValid": true/false,
  "score": 0-100,
  "issues": ["Lista de problemas encontrados"],
  "suggestions": ["Sugerencias de mejora"]
}`;

    const validation = await this.claudeFlow.executeFlow('validate_content', {
      prompt: validationPrompt,
      content
    });

    const result = JSON.parse(validation.content);
    return result.isValid && result.score >= 80;
  }

  /**
   * Mejora el contenido basándose en feedback
   */
  async improveContent(content: WeekContent, feedback: string): Promise<WeekContent> {
    const improvementPrompt = `
Mejora el siguiente contenido de formación basándote en este feedback:

FEEDBACK: ${feedback}

CONTENIDO ACTUAL:
${JSON.stringify(content, null, 2)}

Genera una versión mejorada que resuelva los problemas mencionados.
Mantén la estructura JSON y asegúrate de que sea válida.`;

    const improved = await this.claudeFlow.executeFlow('improve_content', {
      prompt: improvementPrompt,
      content,
      feedback
    });

    return JSON.parse(improved.content);
  }
}

export default FormacionGenerator;