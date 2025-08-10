'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { 
  BookOpen, Code, Brain, CheckCircle, PlayCircle, Target,
  Settings, GitBranch, FileCode, Zap, Award, TrendingUp,
  ChevronRight, Terminal, Folder, Package, AlertCircle,
  CheckCircle2, XCircle, ArrowRight, Lightbulb, Send,
  Copy, Download, Upload, Save, Eye, EyeOff
} from 'lucide-react'
import {
  ProjectSetupComponent,
  ProjectImplementationComponent, 
  ProjectTestingComponent,
  ProjectDeliveryComponent
} from './page-components'

// Interfaces
interface SectionProps {
  onComplete: () => void
  onNext?: () => void
}

interface TaskHeaderProps {
  taskId: string
  title: string
  description: string
  progress: number
  completedSections: string[]
  onSectionChange: (section: string) => void
  activeSection: string
}

// TaskHeader Component
function TaskHeader({ 
  taskId, title, description, progress, 
  completedSections, onSectionChange, activeSection 
}: TaskHeaderProps) {
  const sections = [
    { id: 'teoria', label: 'Teoría Expandida', icon: BookOpen },
    { id: 'ejemplos', label: 'Ejemplos Progresivos', icon: Code },
    { id: 'practica', label: 'Práctica Interactiva', icon: PlayCircle },
    { id: 'evaluacion', label: 'Evaluación IA', icon: Brain },
    { id: 'proyecto', label: 'Proyecto Final', icon: Target }
  ]

  return (
    <div className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-lg border-b border-blue-500/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Settings className="w-8 h-8 text-green-400" />
              {taskId}: {title}
            </h1>
            <p className="text-blue-300 mt-1">{description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Progreso</p>
              <p className="text-2xl font-bold text-green-400">{progress.toFixed(0)}%</p>
            </div>
            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Navegación por secciones */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {sections.map(section => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? 'default' : 'outline'}
              onClick={() => onSectionChange(section.id)}
              className={`flex items-center gap-2 ${
                completedSections.includes(section.id) 
                  ? 'border-green-500 text-green-400' 
                  : ''
              }`}
            >
              <section.icon className="w-4 h-4" />
              {section.label}
              {completedSections.includes(section.id) && (
                <CheckCircle className="w-4 h-4 text-green-400" />
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Main Page Component
export default function F1M1S1D1_Page() {
  const [activeSection, setActiveSection] = useState('teoria')
  const [completedSections, setCompletedSections] = useState<string[]>([])
  const [progress, setProgress] = useState(0)

  // Marcar sección como completada
  const completeSection = (section: string) => {
    if (!completedSections.includes(section)) {
      const newCompleted = [...completedSections, section]
      setCompletedSections(newCompleted)
      setProgress((newCompleted.length / 5) * 100)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs 
        items={[
          { label: 'Dashboard', href: '/agencia' },
          { label: 'Mes 1: Fundamentos', href: '/agencia/mes-1' },
          { label: 'Semana 1: Configuración del Entorno', href: '/agencia/mes-1/semana-1' },
          { label: 'Día 1: Setup inicial', isActive: true }
        ]}
        quickLinks={[
          { label: '← Volver al roadmap visual', href: '/agencia' },
          { label: '📚 Ver todas las lecciones del Mes 1', href: '/agencia/mes-1' },
          { label: '📅 Ver cronograma de la Semana 1', href: '/agencia/mes-1/semana-1' }
        ]}
      />
      
      {/* Task Header */}
      <TaskHeader 
        taskId="F1-M1-S1-D1" 
        title="Setup inicial del proyecto + Principios Clean Code"
        description="Establecer las bases sólidas para el desarrollo de tu agencia de IA"
        progress={progress}
        completedSections={completedSections}
        onSectionChange={setActiveSection}
        activeSection={activeSection}
      />

      <div className="container mx-auto px-4 py-8">
        {/* SECCIÓN 1: TEORÍA EXPANDIDA */}
        {activeSection === 'teoria' && (
          <TheorySection 
            onComplete={() => completeSection('teoria')}
            onNext={() => setActiveSection('ejemplos')}
          />
        )}

        {/* SECCIÓN 2: EJEMPLOS PROGRESIVOS */}
        {activeSection === 'ejemplos' && (
          <ExamplesSection 
            onComplete={() => completeSection('ejemplos')}
            onNext={() => setActiveSection('practica')}
          />
        )}

        {/* SECCIÓN 3: PRÁCTICA INTERACTIVA */}
        {activeSection === 'practica' && (
          <PracticeSection 
            onComplete={() => completeSection('practica')}
            onNext={() => setActiveSection('evaluacion')}
          />
        )}

        {/* SECCIÓN 4: EVALUACIÓN IA */}
        {activeSection === 'evaluacion' && (
          <EvaluationSection 
            onComplete={() => completeSection('evaluacion')}
            onNext={() => setActiveSection('proyecto')}
          />
        )}

        {/* SECCIÓN 5: PROYECTO FINAL */}
        {activeSection === 'proyecto' && (
          <ProjectSection 
            onComplete={() => completeSection('proyecto')}
          />
        )}
      </div>
    </div>
  )
}

// Component Wrappers (estructura vacía)
function TheorySection({ onComplete, onNext }: SectionProps) {
  return (
    <div className="space-y-8">
      {/* Header de la sección */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          <BookOpen className="inline mr-3 w-10 h-10 text-blue-400" />
          Teoría Expandida: Fundamentos Profesionales
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Domina los principios fundamentales para construir sistemas de IA escalables, 
          mantenibles y profesionales desde el primer día.
        </p>
      </div>

      {/* 1. Fundamentos de Setup de Proyectos IA */}
      <Card className="bg-gray-800/50 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-400 flex items-center gap-3">
            <Settings className="w-6 h-6" />
            1. Fundamentos de Setup de Proyectos IA
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p className="text-lg leading-relaxed">
            El setup inicial de un proyecto de IA es fundamentalmente diferente al de aplicaciones 
            tradicionales. Mientras que en desarrollo web convencional nos enfocamos en arquitecturas 
            MVC y patrones de diseño clásicos, los proyectos de IA requieren una infraestructura 
            especializada que soporte experimentación, versionado de modelos y pipelines de datos.
          </p>
          
          <div className="bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-300 mb-2">Arquitectura de Tres Capas para IA:</h4>
            <ul className="space-y-2 ml-4">
              <li>• <strong>Capa de Datos:</strong> Gestión de datasets, ETL pipelines y data warehousing</li>
              <li>• <strong>Capa de Modelos:</strong> Entrenamiento, validación y serving de modelos ML/DL</li>
              <li>• <strong>Capa de Aplicación:</strong> APIs, interfaces y orquestación de agentes</li>
            </ul>
          </div>

          <p className="text-lg leading-relaxed">
            La estructura de directorios debe reflejar esta arquitectura. A diferencia del típico 
            src/, los proyectos de IA profesionales organizan su código en módulos especializados:
            data/ para pipelines de procesamiento, models/ para arquitecturas y checkpoints, 
            agents/ para lógica de negocio inteligente, y api/ para endpoints de serving.
          </p>

          <p className="text-lg leading-relaxed">
            Un aspecto crítico es la configuración del entorno. Los proyectos de IA requieren 
            gestión precisa de dependencias debido a la complejidad del ecosistema. PyTorch, 
            TensorFlow, scikit-learn y otras librerías tienen versiones específicas que deben 
            mantenerse consistentes. Docker se vuelve esencial, no opcional, para garantizar 
            reproducibilidad entre desarrollo y producción.
          </p>

          <div className="bg-green-900/20 p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-green-300 mb-2">Principio Fundamental:</h4>
            <p className="italic">
              "Un proyecto de IA bien estructurado debe permitir que cualquier miembro del equipo 
              pueda reproducir exactamente los mismos resultados con un solo comando."
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 2. Clean Code para Sistemas de IA */}
      <Card className="bg-gray-800/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-2xl text-purple-400 flex items-center gap-3">
            <FileCode className="w-6 h-6" />
            2. Clean Code para Sistemas de IA
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p className="text-lg leading-relaxed">
            Clean Code en el contexto de IA va más allá de nombres descriptivos y funciones pequeñas. 
            Implica crear abstracciones que encapsulen la complejidad matemática mientras mantienen 
            la flexibilidad necesaria para experimentación. Robert Martin's principles se adaptan 
            al mundo del ML con consideraciones adicionales sobre reproducibilidad y trazabilidad.
          </p>

          <div className="bg-purple-900/20 p-4 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-semibold text-purple-300 mb-2">Principios SOLID adaptados a IA:</h4>
            <ul className="space-y-2 ml-4">
              <li>• <strong>S</strong>ingle Responsibility: Cada módulo maneja un aspecto del pipeline</li>
              <li>• <strong>O</strong>pen/Closed: Arquitecturas extensibles para nuevos modelos</li>
              <li>• <strong>L</strong>iskov Substitution: Interfaces consistentes entre modelos</li>
              <li>• <strong>I</strong>nterface Segregation: APIs específicas para cada caso de uso</li>
              <li>• <strong>D</strong>ependency Inversion: Abstracciones sobre implementaciones concretas</li>
            </ul>
          </div>

          <p className="text-lg leading-relaxed">
            La documentación en proyectos de IA requiere especial atención. No solo documentamos 
            el "qué" y el "cómo", sino también el "por qué" de decisiones arquitecturales, 
            hiperparámetros elegidos y trade-offs entre precisión y performance. Cada experimento 
            debe ser trazable a través de commits, configuraciones y métricas.
          </p>

          <p className="text-lg leading-relaxed">
            El versionado de código en IA incluye versionado de datos y modelos. Git para código, 
            DVC para datasets, MLflow para experimentos. Esta trinidad forma la base de un 
            desarrollo profesional. Clean Code significa mantener estos tres elementos sincronizados 
            y documentados, permitiendo rollbacks completos del sistema, no solo del código.
          </p>

          <div className="bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
            <h4 className="font-semibold text-yellow-300 mb-2">Antipatrón común:</h4>
            <p>
              Notebooks Jupyter en producción. Aunque excelentes para prototipado, el código de 
              producción debe estar en módulos Python testables, versionables y desplegables.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 3. Herramientas y Configuración */}
      <Card className="bg-gray-800/50 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-2xl text-green-400 flex items-center gap-3">
            <GitBranch className="w-6 h-6" />
            3. Herramientas y Configuración
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p className="text-lg leading-relaxed">
            El ecosistema de herramientas para desarrollo de IA ha evolucionado significativamente. 
            Ya no es suficiente con un IDE y Git. Los equipos profesionales utilizan stacks 
            completos que cubren desde desarrollo hasta monitoreo en producción. La elección 
            correcta de herramientas puede acelerar el desarrollo 10x o convertirse en un cuello 
            de botella costoso.
          </p>

          <div className="bg-green-900/20 p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-green-300 mb-2">Stack Esencial 2025:</h4>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <strong className="text-green-200">Desarrollo:</strong>
                <ul className="mt-1 ml-4 text-sm">
                  <li>• VS Code + Python/AI extensions</li>
                  <li>• Poetry/PDM para dependencias</li>
                  <li>• Pre-commit hooks + Black/Ruff</li>
                </ul>
              </div>
              <div>
                <strong className="text-green-200">Experimentación:</strong>
                <ul className="mt-1 ml-4 text-sm">
                  <li>• MLflow/Weights & Biases</li>
                  <li>• DVC para versionado de datos</li>
                  <li>• Tensorboard/Neptune</li>
                </ul>
              </div>
              <div>
                <strong className="text-green-200">Deployment:</strong>
                <ul className="mt-1 ml-4 text-sm">
                  <li>• Docker + Kubernetes</li>
                  <li>• TorchServe/TF Serving</li>
                  <li>• FastAPI/gRPC para APIs</li>
                </ul>
              </div>
              <div>
                <strong className="text-green-200">Monitoreo:</strong>
                <ul className="mt-1 ml-4 text-sm">
                  <li>• Prometheus + Grafana</li>
                  <li>• Custom metrics dashboards</li>
                  <li>• A/B testing frameworks</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed">
            La configuración debe ser declarativa y versionada. YAML/TOML para configuraciones, 
            Hydra para gestión de experimentos, environment variables para secretos. Cada 
            componente del sistema debe ser configurable sin cambiar código, permitiendo 
            despliegues en múltiples entornos con cambios mínimos.
          </p>

          <p className="text-lg leading-relaxed">
            La automatización es clave. GitHub Actions o GitLab CI/CD deben ejecutar tests, 
            validar modelos y desplegar automáticamente. Los pipelines de CI/CD para IA incluyen 
            pasos adicionales: validación de datasets, tests de regresión de modelos, y checks 
            de performance. Un commit no solo debe pasar tests unitarios, sino mantener métricas 
            de calidad del modelo.
          </p>
        </CardContent>
      </Card>

      {/* 4. Best Practices de la Industria */}
      <Card className="bg-gray-800/50 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-2xl text-orange-400 flex items-center gap-3">
            <Award className="w-6 h-6" />
            4. Best Practices de la Industria
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p className="text-lg leading-relaxed">
            Las mejores prácticas en IA provienen de empresas como Google, OpenAI y Meta, que 
            han aprendido costosas lecciones desplegando sistemas a escala. Sus papers no solo 
            describen arquitecturas, sino metodologías de trabajo que garantizan calidad y 
            escalabilidad. Adoptar estas prácticas desde el inicio ahorra meses de refactoring.
          </p>

          <div className="bg-orange-900/20 p-4 rounded-lg border-l-4 border-orange-500">
            <h4 className="font-semibold text-orange-300 mb-2">Prácticas de Elite Teams:</h4>
            <ul className="space-y-3 ml-4">
              <li>
                <strong>1. Test-Driven ML:</strong> Escribir tests para comportamiento esperado 
                antes de entrenar modelos. Assert en métricas, no solo en código.
              </li>
              <li>
                <strong>2. Shadow Mode:</strong> Nuevos modelos corren en paralelo con producción 
                sin afectar usuarios, comparando predicciones para validación.
              </li>
              <li>
                <strong>3. Canary Deployments:</strong> Rollout gradual con monitoreo de métricas 
                de negocio, no solo técnicas.
              </li>
              <li>
                <strong>4. Model Cards:</strong> Documentación estandarizada de cada modelo: 
                propósito, limitaciones, sesgos conocidos, casos de uso apropiados.
              </li>
            </ul>
          </div>

          <p className="text-lg leading-relaxed">
            La cultura de postmortems sin culpa es especialmente crítica en IA. Cuando un modelo 
            falla en producción, el análisis debe cubrir todo el pipeline: desde la calidad de 
            datos hasta decisiones de arquitectura. OpenAI publica postmortems de sus incidentes, 
            estableciendo un estándar de transparencia que mejora toda la industria.
          </p>

          <p className="text-lg leading-relaxed">
            El concepto de "ML Debt" es tan importante como technical debt. Cada shortcut en el 
            pipeline de datos, cada modelo sin documentar, cada experimento sin versionar, 
            acumula deuda que eventualmente debe pagarse. Las empresas líderes dedican 20-30% 
            del tiempo a reducir esta deuda, manteniendo sistemas saludables a largo plazo.
          </p>

          <div className="bg-red-900/20 p-4 rounded-lg border-l-4 border-red-500">
            <h4 className="font-semibold text-red-300 mb-2">Lección crítica de la industria:</h4>
            <p>
              "El costo de arreglar un problema en producción es 100x mayor que detectarlo en 
              desarrollo. En IA, este factor puede ser 1000x debido a reentrenamiento y 
              reprocesamiento de datos."
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Botones de navegación */}
      <div className="flex justify-between items-center mt-8">
        <div className="text-gray-400">
          <p className="text-sm">Tiempo estimado: 45 minutos</p>
          <p className="text-xs">Lectura profunda recomendada</p>
        </div>
        <Button 
          onClick={() => {
            onComplete()
            onNext?.()
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Continuar a Ejemplos
          <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

function ExamplesSection({ onComplete, onNext }: SectionProps) {
  const [activeExample, setActiveExample] = React.useState(0)
  const [copiedCode, setCopiedCode] = React.useState<number | null>(null)

  const copyToClipboard = (code: string, index: number) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(index)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const examples = [
    {
      level: "Básico",
      title: "Setup Simple de Agente",
      description: "Estructura mínima para comenzar",
      color: "blue",
      code: `// agent.js - Estructura básica
class SimpleAgent {
  constructor(config) {
    this.name = config.name || 'DefaultAgent';
    this.apiKey = config.apiKey;
    this.model = config.model || 'gpt-3.5-turbo';
  }

  async process(input) {
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.model,
          messages: [{ role: 'user', content: input }]
        })
      });
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { error: 'Failed to process' };
    }
  }
}

// Uso básico
const agent = new SimpleAgent({
  name: 'ContentAgent',
  apiKey: process.env.OPENAI_API_KEY
});

const result = await agent.process('Generate a title');`
    },
    {
      level: "Intermedio",
      title: "Configuración Modular",
      description: "Separación de responsabilidades y configuración externa",
      color: "green",
      code: `// config/agent.config.js
export const AGENT_CONFIG = {
  models: {
    fast: 'gpt-3.5-turbo',
    smart: 'gpt-4',
    creative: 'gpt-4-turbo'
  },
  timeout: 30000,
  retries: 3,
  rateLimits: {
    perMinute: 50,
    perHour: 1000
  }
};

// services/ApiService.js
export class ApiService {
  constructor(config) {
    this.config = config;
    this.rateLimiter = new RateLimiter(config.rateLimits);
  }

  async makeRequest(payload) {
    await this.rateLimiter.wait();
    
    for (let attempt = 1; attempt <= this.config.retries; attempt++) {
      try {
        const response = await fetch('/api/ai', {
          method: 'POST',
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(this.config.timeout)
        });
        
        if (response.ok) return await response.json();
        throw new Error(\`HTTP \${response.status}\`);
        
      } catch (error) {
        if (attempt === this.config.retries) throw error;
        await this.sleep(1000 * attempt); // Exponential backoff
      }
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// agents/ModularAgent.js
import { ApiService } from '../services/ApiService.js';
import { AGENT_CONFIG } from '../config/agent.config.js';

export class ModularAgent {
  constructor(name, modelType = 'smart') {
    this.name = name;
    this.model = AGENT_CONFIG.models[modelType];
    this.apiService = new ApiService(AGENT_CONFIG);
    this.middleware = [];
  }

  use(middleware) {
    this.middleware.push(middleware);
    return this;
  }

  async process(input, context = {}) {
    let processedInput = input;
    
    // Apply middleware
    for (const middleware of this.middleware) {
      processedInput = await middleware(processedInput, context);
    }

    return await this.apiService.makeRequest({
      model: this.model,
      messages: this.buildMessages(processedInput, context)
    });
  }

  buildMessages(input, context) {
    const messages = [];
    
    if (context.systemPrompt) {
      messages.push({ role: 'system', content: context.systemPrompt });
    }
    
    messages.push({ role: 'user', content: input });
    return messages;
  }
}`
    },
    {
      level: "Avanzado",
      title: "Clean Code Patterns",
      description: "SOLID principles, interfaces y testing",
      color: "purple",
      code: `// interfaces/IAgent.ts
export interface IAgent {
  process(input: string, context?: AgentContext): Promise<AgentResponse>;
  getName(): string;
  getCapabilities(): string[];
}

export interface AgentContext {
  sessionId?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface AgentResponse {
  content: string;
  confidence: number;
  metadata: ResponseMetadata;
}

// abstracts/BaseAgent.ts
export abstract class BaseAgent implements IAgent {
  protected readonly name: string;
  protected readonly logger: ILogger;
  protected readonly metrics: IMetrics;

  constructor(
    name: string, 
    logger: ILogger, 
    metrics: IMetrics
  ) {
    this.name = name;
    this.logger = logger;
    this.metrics = metrics;
  }

  async process(input: string, context?: AgentContext): Promise<AgentResponse> {
    const startTime = Date.now();
    
    try {
      this.logger.info(\`Processing request\`, { agent: this.name, input });
      
      const result = await this.executeCore(input, context);
      
      this.metrics.incrementCounter('agent.requests.success', {
        agent: this.name
      });
      
      return result;
      
    } catch (error) {
      this.logger.error(\`Processing failed\`, { 
        agent: this.name, 
        error: error.message 
      });
      
      this.metrics.incrementCounter('agent.requests.error', {
        agent: this.name,
        error: error.constructor.name
      });
      
      throw error;
    } finally {
      const duration = Date.now() - startTime;
      this.metrics.recordHistogram('agent.request.duration', duration, {
        agent: this.name
      });
    }
  }

  protected abstract executeCore(
    input: string, 
    context?: AgentContext
  ): Promise<AgentResponse>;

  getName(): string {
    return this.name;
  }

  abstract getCapabilities(): string[];
}

// implementations/ContentAgent.ts
export class ContentAgent extends BaseAgent {
  constructor(
    private readonly apiClient: IApiClient,
    logger: ILogger,
    metrics: IMetrics
  ) {
    super('ContentAgent', logger, metrics);
  }

  protected async executeCore(
    input: string, 
    context?: AgentContext
  ): Promise<AgentResponse> {
    const prompt = this.buildPrompt(input, context);
    const response = await this.apiClient.generateContent(prompt);
    
    return {
      content: response.text,
      confidence: response.confidence,
      metadata: {
        model: response.model,
        tokensUsed: response.tokens,
        latency: response.latency
      }
    };
  }

  private buildPrompt(input: string, context?: AgentContext): string {
    // Template method pattern
    const systemContext = this.getSystemContext();
    const userContext = this.getUserContext(context);
    const finalPrompt = this.assemblePrompt(systemContext, userContext, input);
    
    return finalPrompt;
  }

  getCapabilities(): string[] {
    return ['content-generation', 'text-summarization', 'creative-writing'];
  }
}

// __tests__/ContentAgent.test.ts
describe('ContentAgent', () => {
  let agent: ContentAgent;
  let mockApiClient: jest.Mocked<IApiClient>;
  let mockLogger: jest.Mocked<ILogger>;
  let mockMetrics: jest.Mocked<IMetrics>;

  beforeEach(() => {
    mockApiClient = createMockApiClient();
    mockLogger = createMockLogger();
    mockMetrics = createMockMetrics();
    
    agent = new ContentAgent(mockApiClient, mockLogger, mockMetrics);
  });

  it('should process input successfully', async () => {
    mockApiClient.generateContent.mockResolvedValue({
      text: 'Generated content',
      confidence: 0.95,
      model: 'gpt-4',
      tokens: 150,
      latency: 500
    });

    const result = await agent.process('Generate a blog post');

    expect(result.content).toBe('Generated content');
    expect(result.confidence).toBe(0.95);
    expect(mockMetrics.incrementCounter).toHaveBeenCalledWith(
      'agent.requests.success',
      { agent: 'ContentAgent' }
    );
  });
});`
    },
    {
      level: "Producción",
      title: "Setup Empresarial",
      description: "Arquitectura escalable con monitoreo y observabilidad",
      color: "orange",
      code: `// infrastructure/AgentFactory.ts
export class AgentFactory {
  constructor(
    private readonly container: DIContainer,
    private readonly config: AppConfig
  ) {}

  createAgent(type: AgentType, options: AgentOptions): IAgent {
    const builder = new AgentBuilder(this.container);
    
    return builder
      .withType(type)
      .withLogging(this.createLogger(type))
      .withMetrics(this.createMetrics(type))
      .withCircuitBreaker(this.createCircuitBreaker(type))
      .withRetryPolicy(this.createRetryPolicy(type))
      .withRateLimiting(this.createRateLimiter(type))
      .withCaching(this.createCache(type))
      .withOptions(options)
      .build();
  }

  private createLogger(type: AgentType): ILogger {
    return new StructuredLogger({
      service: \`agent-\${type}\`,
      level: this.config.logging.level,
      transports: [
        new ConsoleTransport(),
        new ElasticsearchTransport(this.config.elasticsearch)
      ]
    });
  }

  private createMetrics(type: AgentType): IMetrics {
    return new PrometheusMetrics({
      prefix: \`ai_agent_\${type}\`,
      registry: this.container.get('MetricsRegistry')
    });
  }
}

// orchestration/AgentOrchestrator.ts
export class AgentOrchestrator {
  private readonly agents: Map<string, IAgent> = new Map();
  private readonly loadBalancer: LoadBalancer;
  private readonly healthChecker: HealthChecker;

  constructor(
    private readonly factory: AgentFactory,
    private readonly config: OrchestrationConfig
  ) {
    this.loadBalancer = new LoadBalancer(config.loadBalancing);
    this.healthChecker = new HealthChecker(config.health);
  }

  async initialize(): Promise<void> {
    // Create agent pools
    for (const agentConfig of this.config.agents) {
      const pool = await this.createAgentPool(agentConfig);
      this.agents.set(agentConfig.type, pool);
    }

    // Start health monitoring
    await this.healthChecker.start();
    
    // Setup graceful shutdown
    process.on('SIGTERM', () => this.shutdown());
  }

  async processRequest(
    request: AgentRequest
  ): Promise<AgentResponse> {
    const agent = await this.selectAgent(request.type, request.priority);
    
    const span = this.tracer.startSpan('agent.process', {
      tags: {
        'agent.type': request.type,
        'request.id': request.id
      }
    });

    try {
      const result = await agent.process(request.input, request.context);
      
      span.setTag('success', true);
      return result;
      
    } catch (error) {
      span.setTag('error', true);
      span.setTag('error.message', error.message);
      
      // Circuit breaker logic
      await this.handleError(agent, error);
      throw error;
      
    } finally {
      span.finish();
    }
  }

  private async selectAgent(type: string, priority: Priority): Promise<IAgent> {
    const pool = this.agents.get(type);
    if (!pool) throw new Error(\`No agents available for type: \${type}\`);

    return await this.loadBalancer.select(pool, {
      priority,
      healthStatus: await this.healthChecker.getStatus(type)
    });
  }
}

// monitoring/PerformanceMonitor.ts
export class PerformanceMonitor {
  private readonly metrics: IMetrics;
  private readonly alertManager: AlertManager;

  constructor(metrics: IMetrics, alertManager: AlertManager) {
    this.metrics = metrics;
    this.alertManager = alertManager;
  }

  async trackPerformance(agentId: string, operation: () => Promise<any>) {
    const startTime = Date.now();
    let success = false;

    try {
      const result = await operation();
      success = true;
      return result;
      
    } finally {
      const duration = Date.now() - startTime;
      
      this.metrics.recordHistogram('agent.operation.duration', duration, {
        agent: agentId,
        success: success.toString()
      });

      // Alert on high latency
      if (duration > 10000) {
        await this.alertManager.send({
          severity: 'warning',
          message: \`High latency detected for agent \${agentId}: \${duration}ms\`,
          tags: { agent: agentId, latency: duration.toString() }
        });
      }
    }
  }
}

// docker-compose.yml for production
/*
version: '3.8'
services:
  ai-agents:
    build: .
    environment:
      - NODE_ENV=production
      - REDIS_URL=redis://redis:6379
      - POSTGRES_URL=postgres://user:pass@postgres:5432/agents
    depends_on:
      - redis
      - postgres
      - prometheus
    deploy:
      replicas: 3
      resources:
        limits:
          memory: 2G
          cpus: '1'

  redis:
    image: redis:alpine
    
  postgres:
    image: postgres:14
    
  prometheus:
    image: prom/prometheus
    
  grafana:
    image: grafana/grafana
*/`
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          <Code className="inline mr-3 w-10 h-10 text-green-400" />
          Ejemplos Progresivos: Del Concepto a Producción
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Cuatro niveles de implementación que te llevan desde un script básico 
          hasta una arquitectura empresarial completa.
        </p>
      </div>

      {/* Example Navigation */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {examples.map((example, index) => (
          <Button
            key={index}
            variant={activeExample === index ? 'default' : 'outline'}
            onClick={() => setActiveExample(index)}
            className={`flex items-center gap-2 ${
              activeExample === index 
                ? `bg-${example.color}-600 border-${example.color}-500` 
                : `border-${example.color}-500/50 hover:border-${example.color}-500`
            }`}
          >
            <span className={`w-6 h-6 rounded-full bg-${example.color}-500 text-white text-xs flex items-center justify-center font-bold`}>
              {index + 1}
            </span>
            {example.level}: {example.title}
          </Button>
        ))}
      </div>

      {/* Active Example */}
      <Card className={`bg-gray-800/50 border-${examples[activeExample].color}-500/30`}>
        <CardHeader>
          <CardTitle className={`text-2xl text-${examples[activeExample].color}-400 flex items-center gap-3`}>
            <span className={`w-8 h-8 rounded-full bg-${examples[activeExample].color}-500 text-white text-sm flex items-center justify-center font-bold`}>
              {activeExample + 1}
            </span>
            {examples[activeExample].level}: {examples[activeExample].title}
          </CardTitle>
          <p className="text-gray-300">{examples[activeExample].description}</p>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">
                  Ejemplo {activeExample + 1} - {examples[activeExample].level}
                </span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(examples[activeExample].code, activeExample)}
                className="text-gray-400 hover:text-white"
              >
                {copiedCode === activeExample ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Copiado
                  </>
                ) : (
                  <>
                    <FileCode className="w-4 h-4 mr-1" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
              <code>{examples[activeExample].code}</code>
            </pre>
          </div>

          {/* Key Points for each example */}
          <div className={`mt-6 p-4 bg-${examples[activeExample].color}-900/20 rounded-lg border-l-4 border-${examples[activeExample].color}-500`}>
            <h4 className={`font-semibold text-${examples[activeExample].color}-300 mb-3`}>
              Puntos Clave del Ejemplo {activeExample + 1}:
            </h4>
            {activeExample === 0 && (
              <ul className="space-y-2 text-gray-300 ml-4">
                <li>• <strong>Simplicidad:</strong> Clase básica con constructor y método process</li>
                <li>• <strong>Error Handling:</strong> Try-catch simple para casos básicos</li>
                <li>• <strong>Configuración:</strong> Parámetros directos en el constructor</li>
                <li>• <strong>Uso Inmediato:</strong> Perfecto para prototipos y MVPs</li>
              </ul>
            )}
            {activeExample === 1 && (
              <ul className="space-y-2 text-gray-300 ml-4">
                <li>• <strong>Separación de Responsabilidades:</strong> Config, Service y Agent separados</li>
                <li>• <strong>Rate Limiting:</strong> Control de llamadas a la API</li>
                <li>• <strong>Retry Logic:</strong> Reintentos con backoff exponencial</li>
                <li>• <strong>Middleware Pattern:</strong> Extensibilidad para procesamiento de input</li>
              </ul>
            )}
            {activeExample === 2 && (
              <ul className="space-y-2 text-gray-300 ml-4">
                <li>• <strong>SOLID Principles:</strong> Interfaces, abstracciones y dependency injection</li>
                <li>• <strong>Observabilidad:</strong> Logging estructurado y métricas</li>
                <li>• <strong>Testing:</strong> Mocks y tests unitarios completos</li>
                <li>• <strong>Template Method:</strong> Algoritmos extensibles con pasos definidos</li>
              </ul>
            )}
            {activeExample === 3 && (
              <ul className="space-y-2 text-gray-300 ml-4">
                <li>• <strong>Factory Pattern:</strong> Creación consistente de agentes complejos</li>
                <li>• <strong>Circuit Breaker:</strong> Resiliencia ante fallos de servicios externos</li>
                <li>• <strong>Load Balancing:</strong> Distribución de carga entre múltiples instancias</li>
                <li>• <strong>Observabilidad Completa:</strong> Tracing, métricas y alertas</li>
              </ul>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Complexity Progression Visualization */}
      <Card className="bg-gray-800/50 border-gray-600/30">
        <CardHeader>
          <CardTitle className="text-xl text-gray-200 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            Progresión de Complejidad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {examples.map((example, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  activeExample === index
                    ? `border-${example.color}-500 bg-${example.color}-900/20`
                    : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                }`}
                onClick={() => setActiveExample(index)}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-${example.color}-500 flex items-center justify-center text-white font-bold text-lg`}>
                    {index + 1}
                  </div>
                  <h4 className="font-semibold text-white mb-1">{example.level}</h4>
                  <p className="text-sm text-gray-400 mb-3">{example.title}</p>
                  <div className="space-y-1">
                    <div className={`h-2 bg-${example.color}-500 rounded`} style={{ width: `${25 * (index + 1)}%` }}></div>
                    <span className="text-xs text-gray-500">Complejidad: {25 * (index + 1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <div className="text-gray-400">
          <p className="text-sm">Tiempo estimado: 30 minutos</p>
          <p className="text-xs">Experimenta con cada ejemplo</p>
        </div>
        <Button 
          onClick={() => {
            onComplete()
            onNext?.()
          }}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
        >
          Continuar a Práctica
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

function PracticeSection({ onComplete, onNext }: SectionProps) {
  const [activeExercise, setActiveExercise] = useState(0)
  const [exerciseState, setExerciseState] = useState<Record<number, any>>({})
  const [completedExercises, setCompletedExercises] = useState<number[]>([])
  const [showHints, setShowHints] = useState<Record<number, boolean>>({})

  const completeExercise = (index: number) => {
    if (!completedExercises.includes(index)) {
      const newCompleted = [...completedExercises, index]
      setCompletedExercises(newCompleted)
      
      // Auto-avanzar al siguiente ejercicio
      if (index < exercises.length - 1) {
        setTimeout(() => setActiveExercise(index + 1), 1000)
      }
    }
  }

  const updateExerciseState = (index: number, state: any) => {
    setExerciseState(prev => ({ ...prev, [index]: state }))
  }

  const toggleHint = (index: number) => {
    setShowHints(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const exercises = [
    {
      id: 1,
      title: "Configuración de Proyecto Básico",
      description: "Configura la estructura inicial de tu agencia de IA",
      type: "interactive-form",
      difficulty: "Fácil",
      time: "10 min",
      points: 25,
      hints: [
        "Piensa en la estructura de carpetas como módulos independientes",
        "Cada directorio debe tener un propósito claro y específico",
        "La separación de responsabilidades es clave para la escalabilidad"
      ]
    },
    {
      id: 2, 
      title: "Implementación de Agente Simple",
      description: "Crea tu primer agente con funcionalidad básica",
      type: "code-editor",
      difficulty: "Medio",
      time: "20 min",
      points: 50,
      hints: [
        "Comienza con la clase más simple posible",
        "El manejo de errores debe ser robusto desde el inicio",
        "Usa async/await para llamadas a APIs externas"
      ]
    },
    {
      id: 3,
      title: "Testing y Validación",
      description: "Implementa tests para validar tu agente",
      type: "test-runner",
      difficulty: "Medio",
      time: "15 min",
      points: 35,
      hints: [
        "Los tests deben cubrir casos normales y casos extremos",
        "Mockea las llamadas a APIs externas",
        "Verifica tanto la estructura de respuesta como el contenido"
      ]
    },
    {
      id: 4,
      title: "Clean Code Refactoring",
      description: "Refactoriza aplicando principios de Clean Code",
      type: "refactoring",
      difficulty: "Difícil",
      time: "25 min",
      points: 75,
      hints: [
        "Identifica responsabilidades múltiples en una sola función",
        "Extrae constantes mágicas a configuración",
        "Aplica el principio DRY (Don't Repeat Yourself)"
      ]
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          <PlayCircle className="inline mr-3 w-10 h-10 text-green-400" />
          Práctica Interactiva: Construye tu Primer Agente
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Ejercicios guiados paso a paso para dominar los fundamentos del desarrollo de IA.
          Cada ejercicio incluye feedback inmediato y validación automática.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gray-800/50 border-green-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-green-400">Progreso de Ejercicios</h3>
            <div className="text-right">
              <p className="text-sm text-gray-400">Completados</p>
              <p className="text-2xl font-bold text-green-400">
                {completedExercises.length}/{exercises.length}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {exercises.map((exercise, index) => {
              const isCompleted = completedExercises.includes(index)
              const isActive = activeExercise === index
              const isAvailable = index === 0 || completedExercises.includes(index - 1)
              
              return (
                <div
                  key={exercise.id}
                  className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    isActive
                      ? 'border-green-500 bg-green-900/20'
                      : isCompleted
                      ? 'border-green-600 bg-green-800/20'
                      : isAvailable
                      ? 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                      : 'border-gray-700 bg-gray-800/20 opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => isAvailable && setActiveExercise(index)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isActive
                        ? 'bg-green-600 text-white'
                        : isAvailable
                        ? 'bg-gray-600 text-white'
                        : 'bg-gray-700 text-gray-400'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : exercise.id}
                    </div>
                    <span className={`text-sm font-medium ${
                      isActive ? 'text-green-400' : isCompleted ? 'text-green-300' : 'text-gray-300'
                    }`}>
                      {exercise.difficulty}
                    </span>
                  </div>
                  
                  <h4 className={`font-semibold mb-1 ${
                    isActive ? 'text-white' : isCompleted ? 'text-gray-200' : 'text-gray-400'
                  }`}>
                    {exercise.title}
                  </h4>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{exercise.time}</span>
                    <span className="text-yellow-400">{exercise.points}pts</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Active Exercise */}
      <Card className="bg-gray-800/50 border-blue-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-blue-400 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-bold">
                {exercises[activeExercise].id}
              </span>
              {exercises[activeExercise].title}
            </CardTitle>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                exercises[activeExercise].difficulty === 'Fácil'
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : exercises[activeExercise].difficulty === 'Medio'
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}>
                {exercises[activeExercise].difficulty}
              </span>
              <span className="text-gray-400">{exercises[activeExercise].time}</span>
              <span className="text-yellow-400 font-medium">{exercises[activeExercise].points} puntos</span>
            </div>
          </div>
          <p className="text-gray-300 mt-2">{exercises[activeExercise].description}</p>
        </CardHeader>
        
        <CardContent>
          {/* Exercise Content Based on Type */}
          {exercises[activeExercise].type === 'interactive-form' && (
            <ProjectStructureExercise
              onComplete={() => completeExercise(activeExercise)}
              state={exerciseState[activeExercise]}
              onStateChange={(state) => updateExerciseState(activeExercise, state)}
            />
          )}
          
          {exercises[activeExercise].type === 'code-editor' && (
            <AgentImplementationExercise
              onComplete={() => completeExercise(activeExercise)}
              state={exerciseState[activeExercise]}
              onStateChange={(state) => updateExerciseState(activeExercise, state)}
            />
          )}
          
          {exercises[activeExercise].type === 'test-runner' && (
            <TestingExercise
              onComplete={() => completeExercise(activeExercise)}
              state={exerciseState[activeExercise]}
              onStateChange={(state) => updateExerciseState(activeExercise, state)}
            />
          )}
          
          {exercises[activeExercise].type === 'refactoring' && (
            <RefactoringExercise
              onComplete={() => completeExercise(activeExercise)}
              state={exerciseState[activeExercise]}
              onStateChange={(state) => updateExerciseState(activeExercise, state)}
            />
          )}
          
          {/* Hints Section */}
          <div className="mt-6 p-4 bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-yellow-300 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Pistas del Ejercicio
              </h4>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => toggleHint(activeExercise)}
                className="text-yellow-400 hover:text-yellow-300"
              >
                {showHints[activeExercise] ? 'Ocultar' : 'Mostrar'} Pistas
              </Button>
            </div>
            
            {showHints[activeExercise] && (
              <ul className="space-y-2 text-gray-300">
                {exercises[activeExercise].hints.map((hint, hintIndex) => (
                  <li key={hintIndex} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-yellow-500 text-yellow-900 text-xs flex items-center justify-center font-bold mt-0.5">
                      {hintIndex + 1}
                    </span>
                    {hint}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="text-gray-400">
          <p className="text-sm">Ejercicio {activeExercise + 1} de {exercises.length}</p>
          <p className="text-xs">Progreso: {Math.round((completedExercises.length / exercises.length) * 100)}%</p>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setActiveExercise(Math.max(0, activeExercise - 1))}
            disabled={activeExercise === 0}
          >
            <ChevronRight className="mr-2 w-4 h-4 rotate-180" />
            Anterior
          </Button>
          
          {completedExercises.length === exercises.length ? (
            <Button 
              onClick={() => {
                onComplete()
                onNext?.()
              }}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Continuar a Evaluación
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => setActiveExercise(Math.min(exercises.length - 1, activeExercise + 1))}
              disabled={activeExercise === exercises.length - 1}
            >
              Siguiente
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function EvaluationSection({ onComplete, onNext }: SectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [evaluationResult, setEvaluationResult] = useState<any>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [aiInsights, setAiInsights] = useState<string | null>(null)

  const questions = [
    {
      id: 1,
      type: 'multiple-choice',
      question: '¿Cuál es el principio más importante del Clean Code en sistemas de IA?',
      options: [
        'Usar nombres de variables cortos para ahorrar memoria',
        'Separar la lógica de negocio de la implementación de modelos',
        'Escribir todo en un solo archivo para simplicidad',
        'Evitar comentarios para mantener el código limpio'
      ],
      correct: 1,
      explanation: 'La separación de responsabilidades permite que los modelos de IA evolucionen independientemente de la lógica de negocio, facilitando el mantenimiento y testing.',
      weight: 25
    },
    {
      id: 2,
      type: 'code-analysis',
      question: 'Identifica 3 problemas de Clean Code en este fragmento:',
      code: `function processData(d) {
  var result = [];
  for (var i = 0; i < d.length; i++) {
    if (d[i].score > 0.8) {
      result.push({
        id: d[i].id,
        conf: d[i].score,
        txt: d[i].text.substring(0, 100),
        timestamp: new Date().getTime()
      });
    }
  }
  return result;
}`,
      expectedIssues: [
        'Nombres de variables poco descriptivos (d, conf, txt)',
        'Números mágicos (0.8, 100) sin contexto',
        'Función con múltiples responsabilidades'
      ],
      weight: 35
    },
    {
      id: 3,
      type: 'open-ended',
      question: 'Describe tu estrategia para implementar testing en un agente de IA que procesa texto. Incluye al menos 3 tipos de tests diferentes.',
      criteria: [
        'Tests unitarios para funciones puras',
        'Tests de integración para APIs',
        'Tests de comportamiento para casos extremos',
        'Mocking de servicios externos',
        'Validación de métricas de calidad'
      ],
      weight: 40
    }
  ]

  const submitAnswer = (questionIndex: number, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }))
  }

  const runAIEvaluation = async () => {
    setIsEvaluating(true)
    
    try {
      // Simular evaluación IA (en producción sería una llamada real)
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const score = calculateScore()
      const feedback = generatePersonalizedFeedback(score)
      
      setEvaluationResult({
        score,
        breakdown: calculateBreakdown(),
        strengths: identifyStrengths(),
        improvements: identifyImprovements(),
        nextSteps: generateNextSteps(score)
      })
      
      setAiInsights(feedback)
      setShowFeedback(true)
      
    } catch (error) {
      console.error('Error en evaluación:', error)
    } finally {
      setIsEvaluating(false)
    }
  }

  const calculateScore = () => {
    let totalScore = 0
    let totalWeight = 0
    
    questions.forEach((q, index) => {
      const answer = answers[index]
      if (answer !== undefined) {
        let questionScore = 0
        
        if (q.type === 'multiple-choice') {
          questionScore = answer === q.correct ? 100 : 0
        } else if (q.type === 'code-analysis') {
          const identifiedIssues = answer || []
          questionScore = (identifiedIssues.length / q.expectedIssues.length) * 100
        } else if (q.type === 'open-ended') {
          // Evaluación simple basada en longitud y palabras clave
          const answerText = answer || ''
          const criteriaMatched = q.criteria.filter(criterion => 
            answerText.toLowerCase().includes(criterion.toLowerCase().split(' ')[0])
          ).length
          questionScore = (criteriaMatched / q.criteria.length) * 100
        }
        
        totalScore += questionScore * (q.weight / 100)
        totalWeight += q.weight
      }
    })
    
    return totalWeight > 0 ? Math.round(totalScore) : 0
  }

  const calculateBreakdown = () => {
    return questions.map((q, index) => {
      const answer = answers[index]
      let score = 0
      
      if (answer !== undefined) {
        if (q.type === 'multiple-choice') {
          score = answer === q.correct ? 100 : 0
        } else if (q.type === 'code-analysis') {
          const identifiedIssues = answer || []
          score = Math.round((identifiedIssues.length / q.expectedIssues.length) * 100)
        } else if (q.type === 'open-ended') {
          const answerText = answer || ''
          const criteriaMatched = q.criteria.filter(criterion => 
            answerText.toLowerCase().includes(criterion.toLowerCase().split(' ')[0])
          ).length
          score = Math.round((criteriaMatched / q.criteria.length) * 100)
        }
      }
      
      return { question: index + 1, score, weight: q.weight }
    })
  }

  const identifyStrengths = () => {
    const breakdown = calculateBreakdown()
    return breakdown
      .filter(item => item.score >= 80)
      .map(item => `Excelente comprensión en la pregunta ${item.question}`)
  }

  const identifyImprovements = () => {
    const breakdown = calculateBreakdown()
    return breakdown
      .filter(item => item.score < 60)
      .map(item => `Revisar conceptos de la pregunta ${item.question}`)
  }

  const generateNextSteps = (score: number) => {
    if (score >= 85) {
      return [
        'Continúa con el proyecto final',
        'Profundiza en patrones arquitecturales avanzados',
        'Explora frameworks de testing especializados en IA'
      ]
    } else if (score >= 70) {
      return [
        'Repasa los principios SOLID aplicados a IA',
        'Practica más con refactoring de código',
        'Estudia casos de uso reales de testing en ML'
      ]
    } else {
      return [
        'Revisa la teoría de Clean Code fundamentals',
        'Completa ejercicios adicionales de práctica',
        'Consulta recursos adicionales sobre arquitectura de software'
      ]
    }
  }

  const generatePersonalizedFeedback = (score: number) => {
    const level = score >= 85 ? 'avanzado' : score >= 70 ? 'intermedio' : 'principiante'
    
    return `Basado en tu puntuación de ${score}%, demuestras un nivel ${level} de comprensión. 
    
Tus respuestas muestran ${score >= 80 ? 'sólido dominio' : score >= 60 ? 'comprensión parcial' : 'necesidad de refuerzo'} de los conceptos fundamentales.
    
Recomendación personalizada: ${score >= 85 ? 'Estás listo para desafíos más complejos' : score >= 70 ? 'Practica con ejemplos más variados' : 'Dedica tiempo adicional a los fundamentos'}.`
  }

  const isComplete = Object.keys(answers).length === questions.length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          <Brain className="inline mr-3 w-10 h-10 text-purple-400" />
          Evaluación IA Adaptativa
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Sistema de evaluación inteligente que adapta las preguntas según tu nivel 
          y proporciona feedback personalizado con recomendaciones específicas.
        </p>
      </div>

      {!showFeedback ? (
        <>
          {/* Progress */}
          <Card className="bg-gray-800/50 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-purple-400">Progreso de Evaluación</h3>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Respondidas</p>
                  <p className="text-2xl font-bold text-purple-400">
                    {Object.keys(answers).length}/{questions.length}
                  </p>
                </div>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          {questions.map((question, index) => (
            <Card key={question.id} className={`bg-gray-800/50 border-gray-600/30 ${
              currentQuestion === index ? 'border-purple-500/50 shadow-lg shadow-purple-500/20' : ''
            }`}>
              <CardHeader>
                <CardTitle className="text-xl text-purple-400 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-purple-500 text-white text-sm flex items-center justify-center font-bold">
                    {question.id}
                  </span>
                  Pregunta {question.id} 
                  <span className="text-sm text-gray-400">({question.weight}% del total)</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <p className="text-lg text-gray-200 font-medium">{question.question}</p>
                  
                  {question.type === 'multiple-choice' && (
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <Button
                          key={optionIndex}
                          variant={answers[index] === optionIndex ? 'default' : 'outline'}
                          onClick={() => submitAnswer(index, optionIndex)}
                          className="w-full text-left justify-start h-auto p-4"
                        >
                          <span className="w-6 h-6 rounded-full bg-purple-500 text-white text-sm flex items-center justify-center mr-3 font-bold">
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  {question.type === 'code-analysis' && (
                    <div className="space-y-4">
                      <div className="bg-gray-900 rounded-lg p-4">
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          <code>{question.code}</code>
                        </pre>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-gray-300 font-medium">Selecciona los problemas que identificas:</p>
                        {['Nombres poco descriptivos', 'Números mágicos', 'Múltiples responsabilidades', 'Falta de validación', 'Código duplicado'].map((issue, issueIndex) => (
                          <Button
                            key={issueIndex}
                            variant={answers[index]?.includes(issue) ? 'default' : 'outline'}
                            onClick={() => {
                              const currentAnswers = answers[index] || []
                              const newAnswers = currentAnswers.includes(issue)
                                ? currentAnswers.filter((a: string) => a !== issue)
                                : [...currentAnswers, issue]
                              submitAnswer(index, newAnswers)
                            }}
                            className="w-full text-left justify-start"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            {issue}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {question.type === 'open-ended' && (
                    <div className="space-y-2">
                      <textarea
                        className="w-full h-32 p-4 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                        placeholder="Escribe tu respuesta detallada aquí..."
                        value={answers[index] || ''}
                        onChange={(e) => submitAnswer(index, e.target.value)}
                      />
                      <div className="text-sm text-gray-400">
                        Criterios de evaluación:
                        <ul className="mt-1 ml-4 space-y-1">
                          {question.criteria.map((criterion, cIndex) => (
                            <li key={cIndex}>• {criterion}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Submit Evaluation */}
          {isComplete && (
            <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30">
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  ¿Listo para la Evaluación IA?
                </h3>
                <p className="text-gray-300 mb-6">
                  Has completado todas las preguntas. La IA analizará tus respuestas y 
                  proporcionará feedback personalizado con recomendaciones específicas.
                </p>
                <Button
                  onClick={runAIEvaluation}
                  disabled={isEvaluating}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3"
                >
                  {isEvaluating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Evaluando con IA...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 w-5 h-5" />
                      Iniciar Evaluación IA
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        // Results View
        <div className="space-y-6">
          {/* Score Overview */}
          <Card className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border-green-500/30">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-white">{evaluationResult.score}%</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Evaluación Completada</h3>
                <p className="text-xl text-gray-300">
                  {evaluationResult.score >= 85 ? 'Excelente dominio' : 
                   evaluationResult.score >= 70 ? 'Buen entendimiento' : 'Necesitas más práctica'}
                </p>
              </div>
              
              {/* Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                {evaluationResult.breakdown.map((item: any, index: number) => (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Pregunta {item.question}</span>
                      <span className={`font-bold ${item.score >= 80 ? 'text-green-400' : item.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {item.score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.score >= 80 ? 'bg-green-500' : item.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          {aiInsights && (
            <Card className="bg-gray-800/50 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-xl text-blue-400 flex items-center gap-3">
                  <Brain className="w-6 h-6" />
                  Análisis IA Personalizado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-200 whitespace-pre-line">{aiInsights}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Detailed Feedback */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            {evaluationResult.strengths.length > 0 && (
              <Card className="bg-gray-800/50 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-green-400 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Fortalezas Identificadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-300">
                    {evaluationResult.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Areas to Improve */}
            {evaluationResult.improvements.length > 0 && (
              <Card className="bg-gray-800/50 border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-orange-400 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Áreas de Mejora
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-300">
                    {evaluationResult.improvements.map((improvement: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-400" />
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Next Steps */}
          <Card className="bg-gray-800/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-lg text-purple-400 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Próximos Pasos Recomendados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300">
                {evaluationResult.nextSteps.map((step: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-purple-500 text-white text-sm flex items-center justify-center font-bold mt-0.5">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center">
            <Button 
              onClick={() => {
                onComplete()
                onNext?.()
              }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3"
            >
              Continuar al Proyecto Final
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Interactive Exercise Components
function ProjectStructureExercise({ onComplete, state, onStateChange }: {
  onComplete: () => void
  state?: any
  onStateChange: (state: any) => void
}) {
  const [selectedStructure, setSelectedStructure] = useState(state?.structure || '')
  const [customFolders, setCustomFolders] = useState(state?.folders || [])
  const [showPreview, setShowPreview] = useState(false)

  const structures = [
    {
      id: 'basic',
      name: 'Estructura Básica',
      description: 'Setup mínimo para comenzar',
      folders: ['src/', 'src/agents/', 'src/config/', 'src/utils/', 'tests/', 'docs/']
    },
    {
      id: 'modular',
      name: 'Arquitectura Modular',
      description: 'Separación clara de responsabilidades',
      folders: [
        'src/', 'src/agents/', 'src/services/', 'src/interfaces/', 
        'src/config/', 'src/middleware/', 'tests/', 'tests/unit/', 
        'tests/integration/', 'docs/', 'scripts/'
      ]
    },
    {
      id: 'enterprise',
      name: 'Nivel Empresarial',
      description: 'Estructura completa para producción',
      folders: [
        'src/', 'src/core/', 'src/agents/', 'src/services/', 
        'src/interfaces/', 'src/config/', 'src/middleware/', 
        'src/utils/', 'tests/', 'tests/unit/', 'tests/integration/', 
        'tests/e2e/', 'docs/', 'scripts/', 'deploy/', 'monitoring/'
      ]
    }
  ]

  React.useEffect(() => {
    onStateChange({ structure: selectedStructure, folders: customFolders })
  }, [selectedStructure, customFolders, onStateChange])

  const handleStructureSelect = (structureId: string) => {
    setSelectedStructure(structureId)
    const structure = structures.find(s => s.id === structureId)
    if (structure) {
      setCustomFolders(structure.folders)
    }
  }

  const isComplete = selectedStructure && customFolders.length > 0

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-200">Selecciona la estructura de tu proyecto:</h4>
        
        {structures.map(structure => (
          <Card 
            key={structure.id}
            className={`cursor-pointer transition-all ${selectedStructure === structure.id 
              ? 'border-green-500 bg-green-900/20' 
              : 'border-gray-600 hover:border-gray-500'}`}
            onClick={() => handleStructureSelect(structure.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="font-semibold text-gray-200 mb-1">{structure.name}</h5>
                  <p className="text-gray-400 text-sm mb-3">{structure.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {structure.folders.slice(0, 6).map(folder => (
                      <span key={folder} className="text-xs bg-gray-700 px-2 py-1 rounded">
                        <Folder className="inline w-3 h-3 mr-1" />
                        {folder}
                      </span>
                    ))}
                    {structure.folders.length > 6 && (
                      <span className="text-xs text-gray-500">
                        +{structure.folders.length - 6} más
                      </span>
                    )}
                  </div>
                </div>
                <CheckCircle className={`w-6 h-6 ${selectedStructure === structure.id ? 'text-green-400' : 'text-gray-600'}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedStructure && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-200">Vista previa de la estructura:</h4>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowPreview(!showPreview)}
              className="text-gray-400"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? 'Ocultar' : 'Mostrar'}
            </Button>
          </div>
          
          {showPreview && (
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-4">
                <pre className="text-sm text-green-400 font-mono">
                  <code>
{`mi-agencia-ia/
└── ${customFolders.map(folder => 
  folder.includes('/') && !folder.endsWith('/') 
    ? `${folder.split('/').slice(0, -1).join('/')}/\n    └── ${folder.split('/').slice(-1)[0]}/`
    : folder
).join('\n└── ')}
└── package.json
└── README.md
└── .gitignore`}
                  </code>
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {isComplete && (
        <div className="flex justify-center">
          <Button 
            onClick={onComplete}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="mr-2 w-4 h-4" />
            Completar Ejercicio
          </Button>
        </div>
      )}
    </div>
  )
}

function AgentImplementationExercise({ onComplete, state, onStateChange }: {
  onComplete: () => void
  state?: any
  onStateChange: (state: any) => void
}) {
  const [code, setCode] = useState(state?.code || `class SimpleAgent {
  constructor(config) {
    // Implementa el constructor aquí
  }

  async process(input) {
    // Implementa la lógica de procesamiento
  }
}`)
  
  const [testResults, setTestResults] = useState<any[]>([])
  const [isRunning, setIsRunning] = useState(false)

  React.useEffect(() => {
    onStateChange({ code })
  }, [code, onStateChange])

  const runTests = () => {
    setIsRunning(true)
    
    setTimeout(() => {
      const results = [
        {
          name: 'Constructor inicializa correctamente',
          passed: code.includes('this.') && code.includes('config'),
          message: code.includes('this.') ? 'OK' : 'Falta asignación de propiedades'
        },
        {
          name: 'Método process es async',
          passed: code.includes('async process'),
          message: code.includes('async process') ? 'OK' : 'El método debe ser async'
        },
        {
          name: 'Manejo de errores implementado',
          passed: code.includes('try') && code.includes('catch'),
          message: code.includes('try') && code.includes('catch') ? 'OK' : 'Agrega try-catch'
        }
      ]
      
      setTestResults(results)
      setIsRunning(false)
    }, 2000)
  }

  const allTestsPassed = testResults.length > 0 && testResults.every(t => t.passed)

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-200">Implementa tu agente:</h4>
        
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">agent.js</span>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={runTests} disabled={isRunning}>
                  {isRunning ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <PlayCircle className="w-4 h-4" />
                  )}
                  {isRunning ? 'Ejecutando...' : 'Probar'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 bg-gray-800 border border-gray-600 rounded p-4 font-mono text-sm text-gray-200 focus:border-blue-500 focus:outline-none"
              placeholder="Escribe tu código aquí..."
            />
          </CardContent>
        </Card>
      </div>

      {testResults.length > 0 && (
        <Card className="bg-gray-800/50 border-gray-600">
          <CardHeader>
            <CardTitle className="text-lg text-gray-200 flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Resultados de Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded">
                  <div className="flex items-center gap-3">
                    {result.passed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className="text-gray-200">{result.name}</span>
                  </div>
                  <span className={`text-sm ${
                    result.passed ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {result.message}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {allTestsPassed && (
        <div className="flex justify-center">
          <Button 
            onClick={onComplete}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="mr-2 w-4 h-4" />
            Completar Ejercicio
          </Button>
        </div>
      )}
    </div>
  )
}

function TestingExercise({ onComplete, state, onStateChange }: {
  onComplete: () => void
  state?: any
  onStateChange: (state: any) => void
}) {
  const [selectedTests, setSelectedTests] = useState<string[]>(state?.tests || [])
  const [testCode, setTestCode] = useState(state?.testCode || '')
  const [runningTests, setRunningTests] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)

  const testTypes = [
    {
      id: 'unit',
      name: 'Tests Unitarios',
      description: 'Probar funciones individuales',
      template: `describe('SimpleAgent', () => {
  test('constructor inicializa propiedades', () => {
    const agent = new SimpleAgent({ name: 'Test' })
    expect(agent.name).toBe('Test')
  })
})`
    },
    {
      id: 'integration',
      name: 'Tests de Integración', 
      description: 'Probar interacción entre componentes',
      template: `describe('Agent Integration', () => {
  test('process method calls API', async () => {
    const mockFetch = jest.fn()
    global.fetch = mockFetch
    
    const agent = new SimpleAgent(config)
    await agent.process('test input')
    
    expect(mockFetch).toHaveBeenCalled()
  })
})`
    },
    {
      id: 'error',
      name: 'Tests de Error',
      description: 'Validar manejo de casos extremos',
      template: `describe('Error Handling', () => {
  test('handles API failure gracefully', async () => {
    const agent = new SimpleAgent(config)
    global.fetch = jest.fn().mockRejectedValue(new Error('API Error'))
    
    const result = await agent.process('test')
    expect(result.error).toBeDefined()
  })
})`
    }
  ]

  React.useEffect(() => {
    onStateChange({ tests: selectedTests, testCode })
  }, [selectedTests, testCode, onStateChange])

  const handleTestSelect = (testId: string) => {
    const newSelected = selectedTests.includes(testId)
      ? selectedTests.filter(id => id !== testId)
      : [...selectedTests, testId]
    
    setSelectedTests(newSelected)
    
    const selectedTemplates = testTypes
      .filter(t => newSelected.includes(t.id))
      .map(t => t.template)
    
    setTestCode(selectedTemplates.join('\n\n'))
  }

  const runTestSuite = () => {
    setRunningTests(true)
    
    setTimeout(() => {
      const results = {
        total: selectedTests.length * 2,
        passed: Math.floor(selectedTests.length * 1.5),
        failed: Math.floor(selectedTests.length * 0.5),
        coverage: Math.min(95, selectedTests.length * 30)
      }
      
      setTestResults(results)
      setRunningTests(false)
    }, 3000)
  }

  const isComplete = selectedTests.length >= 2 && testResults && testResults.passed > testResults.failed

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-200">Selecciona los tipos de tests a implementar:</h4>
        
        <div className="space-y-3">
          {testTypes.map(testType => (
            <Card 
              key={testType.id}
              className={`cursor-pointer transition-all ${selectedTests.includes(testType.id)
                ? 'border-blue-500 bg-blue-900/20'
                : 'border-gray-600 hover:border-gray-500'}`}
              onClick={() => handleTestSelect(testType.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-gray-200 mb-1">{testType.name}</h5>
                    <p className="text-gray-400 text-sm">{testType.description}</p>
                  </div>
                  <CheckCircle className={`w-6 h-6 ${selectedTests.includes(testType.id) ? 'text-blue-400' : 'text-gray-600'}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {testCode && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">agent.test.js</span>
              <Button size="sm" variant="ghost" onClick={runTestSuite} disabled={runningTests}>
                {runningTests ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <PlayCircle className="w-4 h-4" />
                )}
                {runningTests ? 'Ejecutando...' : 'Ejecutar Tests'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm text-gray-300 bg-gray-800 p-4 rounded overflow-x-auto">
              <code>{testCode}</code>
            </pre>
          </CardContent>
        </Card>
      )}

      {testResults && (
        <Card className="bg-gray-800/50 border-green-500/30">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">{testResults.passed}</div>
                <div className="text-sm text-gray-400">Pasaron</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">{testResults.failed}</div>
                <div className="text-sm text-gray-400">Fallaron</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">{testResults.total}</div>
                <div className="text-sm text-gray-400">Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">{testResults.coverage}%</div>
                <div className="text-sm text-gray-400">Cobertura</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isComplete && (
        <div className="flex justify-center">
          <Button 
            onClick={onComplete}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="mr-2 w-4 h-4" />
            Completar Ejercicio
          </Button>
        </div>
      )}
    </div>
  )
}

function RefactoringExercise({ onComplete, state, onStateChange }: {
  onComplete: () => void
  state?: any
  onStateChange: (state: any) => void
}) {
  const [originalCode] = useState(`function processUserData(data) {
  var results = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].age > 18 && data[i].status === 'active') {
      var user = {
        id: data[i].id,
        name: data[i].firstName + ' ' + data[i].lastName,
        email: data[i].email,
        isAdult: data[i].age >= 21 ? true : false,
        category: data[i].score > 80 ? 'premium' : data[i].score > 50 ? 'standard' : 'basic'
      };
      results.push(user);
    }
  }
  return results;
}`)

  const [refactoredCode, setRefactoredCode] = useState(state?.code || originalCode)
  const [issues, setIssues] = useState<string[]>(state?.issues || [])
  const [score, setScore] = useState(0)

  React.useEffect(() => {
    onStateChange({ code: refactoredCode, issues })
    calculateScore()
  }, [refactoredCode, issues, onStateChange])

  const identifiedIssues = [
    'Uso de var en lugar de const/let',
    'Nombres de variables poco descriptivos', 
    'Funciones con múltiples responsabilidades',
    'Números mágicos sin contexto',
    'Lógica condicional compleja',
    'Falta de validación de entrada',
    'Concatenación de strings inefficiente'
  ]

  const calculateScore = () => {
    let points = 0
    
    if (refactoredCode.includes('const') || refactoredCode.includes('let')) points += 15
    if (!refactoredCode.includes(' i ') && refactoredCode.includes('user')) points += 10
    if (refactoredCode.includes('ADULT_AGE') || refactoredCode.includes('MIN_AGE')) points += 15
    if (refactoredCode.includes('function') && refactoredCode.split('function').length > 2) points += 20
    if (refactoredCode.includes('filter') || refactoredCode.includes('map')) points += 20
    if (refactoredCode.includes('`')) points += 10
    if (refactoredCode.includes('Array.isArray') || refactoredCode.includes('throw')) points += 10
    
    setScore(points)
  }

  const toggleIssue = (issue: string) => {
    const newIssues = issues.includes(issue)
      ? issues.filter(i => i !== issue)
      : [...issues, issue]
    setIssues(newIssues)
  }

  const isComplete = score >= 70 && issues.length >= 4

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-200">Primero, identifica los problemas en el código:</h4>
        
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <span className="text-sm text-gray-400">Código original</span>
          </CardHeader>
          <CardContent>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{originalCode}</code>
            </pre>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <p className="text-gray-300 font-medium">Selecciona los problemas que identificas:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {identifiedIssues.map(issue => (
              <Button
                key={issue}
                variant={issues.includes(issue) ? 'default' : 'outline'}
                onClick={() => toggleIssue(issue)}
                className="text-left justify-start h-auto p-3"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                <span className="text-sm">{issue}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-200">Ahora refactoriza el código:</h4>
        
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Código refactorizado</span>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${
                  score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  Puntuación: {score}/100
                </span>
                <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <textarea
              value={refactoredCode}
              onChange={(e) => setRefactoredCode(e.target.value)}
              className="w-full h-64 bg-gray-800 border border-gray-600 rounded p-4 font-mono text-sm text-gray-200 focus:border-blue-500 focus:outline-none"
            />
          </CardContent>
        </Card>
      </div>

      {score > 0 && (
        <Card className="bg-gray-800/50 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-lg text-blue-400">Feedback de Refactoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {score >= 80 && <p className="text-green-400">✓ Excelente refactoring aplicando múltiples principios</p>}
              {score >= 60 && score < 80 && <p className="text-yellow-400">✓ Buen progreso, considera aplicar más principios</p>}
              {score < 60 && <p className="text-red-400">• Necesita más trabajo en los principios de Clean Code</p>}
              
              <div className="mt-3 p-3 bg-blue-900/20 rounded border-l-4 border-blue-500">
                <p className="text-blue-300 font-medium">Sugerencias:</p>
                <ul className="mt-2 space-y-1 text-gray-300 text-sm">
                  {!refactoredCode.includes('const') && <li>• Usa const/let en lugar de var</li>}
                  {!refactoredCode.includes('filter') && <li>• Considera usar métodos de array como filter() y map()</li>}
                  {!refactoredCode.includes('ADULT_AGE') && <li>• Extrae números mágicos como constantes</li>}
                  {refactoredCode.split('function').length <= 2 && <li>• Separa responsabilidades en funciones más pequeñas</li>}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isComplete && (
        <div className="flex justify-center">
          <Button 
            onClick={onComplete}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="mr-2 w-4 h-4" />
            Completar Ejercicio
          </Button>
        </div>
      )}
    </div>
  )
}

function ProjectSection({ onComplete }: Omit<SectionProps, 'onNext'>) {
  const [currentStep, setCurrentStep] = useState(0)
  const [projectState, setProjectState] = useState<any>({})
  const [isDelivering, setIsDelivering] = useState(false)
  const [deliveryResult, setDeliveryResult] = useState<any>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const projectSteps = [
    {
      id: 1,
      title: "Setup del Proyecto",
      description: "Configura la estructura básica de tu agente",
      component: "setup",
      validation: ["structure", "config"]
    },
    {
      id: 2,
      title: "Implementación del Agente",
      description: "Desarrolla la lógica core de tu agente de IA",
      component: "implementation",
      validation: ["constructor", "process", "error-handling"]
    },
    {
      id: 3,
      title: "Testing y Validación",
      description: "Asegura la calidad con tests automatizados",
      component: "testing",
      validation: ["unit-tests", "integration-tests"]
    },
    {
      id: 4,
      title: "Entrega Final",
      description: "Revisa y entrega tu proyecto completo",
      component: "delivery",
      validation: ["code-quality", "documentation"]
    }
  ]

  const validateStep = (stepIndex: number) => {
    const step = projectSteps[stepIndex]
    const errors: string[] = []
    
    step.validation.forEach(requirement => {
      if (!projectState[requirement]) {
        errors.push(`Falta: ${requirement.replace('-', ' ')}`)
      }
    })
    
    setValidationErrors(errors)
    return errors.length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, projectSteps.length - 1))
      setValidationErrors([])
    }
  }

  const updateProjectState = (key: string, value: any) => {
    setProjectState(prev => ({ ...prev, [key]: value }))
  }

  const deliverProject = async () => {
    setIsDelivering(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const score = calculateFinalScore()
      const feedback = generateProjectFeedback(score)
      
      setDeliveryResult({
        score,
        feedback,
        certificate: score >= 70,
        nextRecommendations: getNextStepRecommendations(score)
      })
      
      if (score >= 70) {
        onComplete()
      }
    } catch (error) {
      console.error('Error en entrega:', error)
    } finally {
      setIsDelivering(false)
    }
  }

  const calculateFinalScore = () => {
    const weights = { structure: 20, config: 15, constructor: 20, process: 25, 'error-handling': 10, 'unit-tests': 5, 'integration-tests': 5 }
    let totalScore = 0
    let totalWeight = 0
    
    Object.entries(weights).forEach(([key, weight]) => {
      if (projectState[key]) {
        totalScore += weight
      }
      totalWeight += weight
    })
    
    return Math.round((totalScore / totalWeight) * 100)
  }

  const generateProjectFeedback = (score: number) => {
    if (score >= 85) return "¡Excelente trabajo! Has demostrado dominio completo de los conceptos fundamentales."
    if (score >= 70) return "Buen trabajo. Tu agente funciona correctamente con algunas oportunidades de mejora."
    return "El proyecto necesita más trabajo. Revisa los requisitos pendientes."
  }

  const getNextStepRecommendations = (score: number) => {
    if (score >= 85) return ["Explorar patrones avanzados", "Implementar múltiples agentes", "Estudiar arquitecturas enterprise"]
    if (score >= 70) return ["Profundizar en testing", "Mejorar manejo de errores", "Optimizar performance"]
    return ["Repasar fundamentos", "Completar ejercicios adicionales", "Solicitar mentoría"]
  }

  const isStepComplete = (stepIndex: number) => {
    return projectSteps[stepIndex].validation.every(req => projectState[req])
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          <Target className="inline mr-3 w-10 h-10 text-orange-400" />
          Proyecto Final: Tu Primer Agente de IA
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Consolida todo el aprendizaje creando un agente funcional desde cero.
          Proyecto guiado con validación automática y feedback personalizado.
        </p>
      </div>

      {!deliveryResult ? (
        <>
          {/* Progress Steps */}
          <Card className="bg-gray-800/50 border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-orange-400">Progreso del Proyecto</h3>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Paso Actual</p>
                  <p className="text-2xl font-bold text-orange-400">{currentStep + 1}/{projectSteps.length}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {projectSteps.map((step, index) => {
                  const isActive = currentStep === index
                  const isCompleted = isStepComplete(index)
                  const isAccessible = index <= currentStep
                  
                  return (
                    <div
                      key={step.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isActive
                          ? 'border-orange-500 bg-orange-900/20'
                          : isCompleted
                          ? 'border-green-600 bg-green-800/20'
                          : isAccessible
                          ? 'border-gray-600 bg-gray-700/30'
                          : 'border-gray-700 bg-gray-800/20 opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : isActive
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-600 text-gray-300'
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                        </div>
                        <span className="text-xs text-gray-400">Paso {step.id}</span>
                      </div>
                      
                      <h4 className={`font-semibold mb-1 text-sm ${
                        isActive ? 'text-white' : isCompleted ? 'text-gray-200' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </h4>
                      
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Current Step Content */}
          <Card className="bg-gray-800/50 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-400 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-bold">
                  {projectSteps[currentStep].id}
                </span>
                {projectSteps[currentStep].title}
              </CardTitle>
              <p className="text-gray-300">{projectSteps[currentStep].description}</p>
            </CardHeader>
            
            <CardContent>
              {projectSteps[currentStep].component === 'setup' && (
                <ProjectSetupComponent 
                  onUpdate={updateProjectState}
                  state={projectState}
                />
              )}
              
              {projectSteps[currentStep].component === 'implementation' && (
                <ProjectImplementationComponent 
                  onUpdate={updateProjectState}
                  state={projectState}
                />
              )}
              
              {projectSteps[currentStep].component === 'testing' && (
                <ProjectTestingComponent 
                  onUpdate={updateProjectState}
                  state={projectState}
                />
              )}
              
              {projectSteps[currentStep].component === 'delivery' && (
                <ProjectDeliveryComponent 
                  onUpdate={updateProjectState}
                  state={projectState}
                  onDeliver={deliverProject}
                  isDelivering={isDelivering}
                />
              )}

              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <Card className="mt-6 bg-red-900/20 border-red-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <h4 className="font-semibold text-red-300">Requisitos Pendientes</h4>
                    </div>
                    <ul className="space-y-1 text-red-200 text-sm">
                      {validationErrors.map((error, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <XCircle className="w-4 h-4" />
                          {error}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              <ChevronRight className="mr-2 w-4 h-4 rotate-180" />
              Paso Anterior
            </Button>
            
            {currentStep < projectSteps.length - 1 ? (
              <Button 
                onClick={nextStep}
                disabled={validationErrors.length > 0}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Siguiente Paso
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            ) : (
              <Button 
                onClick={deliverProject}
                disabled={validationErrors.length > 0 || isDelivering}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                {isDelivering ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Entregando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 w-5 h-5" />
                    Entregar Proyecto
                  </>
                )}
              </Button>
            )}
          </div>
        </>
      ) : (
        // Results View
        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border-green-500/30">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mb-4">
                  {deliveryResult.certificate ? (
                    <Award className="w-16 h-16 text-white" />
                  ) : (
                    <span className="text-4xl font-bold text-white">{deliveryResult.score}%</span>
                  )}
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {deliveryResult.certificate ? '¡Proyecto Completado!' : 'Proyecto Entregado'}
                </h3>
                <p className="text-xl text-gray-300">
                  Puntuación Final: {deliveryResult.score}%
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-300 mb-3">Feedback del Proyecto:</h4>
                <p className="text-gray-200">{deliveryResult.feedback}</p>
              </div>

              {deliveryResult.certificate && (
                <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 p-4 rounded-lg border border-yellow-500/30 mb-6">
                  <div className="flex items-center justify-center gap-2 text-yellow-400">
                    <Award className="w-6 h-6" />
                    <span className="font-semibold">¡Certificado de Finalización Obtenido!</span>
                  </div>
                </div>
              )}

              <div className="text-left">
                <h4 className="font-semibold text-purple-300 mb-3">Próximos Pasos Recomendados:</h4>
                <ul className="space-y-2 text-gray-300">
                  {deliveryResult.nextRecommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-purple-400" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button 
              onClick={onComplete}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Finalizar Día 1
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}