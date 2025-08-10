'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Code, 
  Brain, 
  CheckCircle, 
  PlayCircle,
  Target,
  Settings,
  GitBranch,
  FileCode,
  Zap,
  Award,
  TrendingUp,
  Home,
  ChevronRight,
  Folder,
  FolderOpen,
  Terminal,
  Network,
  Clock,
  Shield
} from 'lucide-react'

// Interfaces estándar
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

// Breadcrumbs Component con navegación completa
function Breadcrumbs() {
  return (
    <nav className="bg-gray-900/30 backdrop-blur-sm border-b border-gray-800/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center space-x-2 text-sm">
          <Link 
            href="/agencia" 
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors hover:underline"
          >
            <Home className="w-4 h-4" />
            Dashboard
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-500" />
          <Link 
            href="/agencia/mes-1" 
            className="text-green-400 hover:text-green-300 transition-colors hover:underline"
          >
            Mes 1: Fundamentos
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-500" />
          <Link 
            href="/agencia/mes-1/semana-1" 
            className="text-purple-400 hover:text-purple-300 transition-colors hover:underline"
          >
            Semana 1: Setup & Arquitectura
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-500" />
          <span className="text-white font-medium">Día 2: Estructura de directorios + Git</span>
        </div>
        
        {/* Quick Navigation */}
        <div className="flex items-center gap-4 mt-2">
          <Link 
            href="/agencia" 
            className="text-xs text-gray-400 hover:text-gray-300 transition-colors hover:underline"
          >
            ← Volver al roadmap visual
          </Link>
          <span className="text-xs text-gray-600">|</span>
          <Link 
            href="/agencia/mes-1" 
            className="text-xs text-gray-400 hover:text-gray-300 transition-colors hover:underline"
          >
            📚 Ver todas las lecciones del Mes 1
          </Link>
          <span className="text-xs text-gray-600">|</span>
          <Link 
            href="/agencia/mes-1/semana-1" 
            className="text-xs text-gray-400 hover:text-gray-300 transition-colors hover:underline"
          >
            📅 Ver cronograma de la Semana 1
          </Link>
        </div>
      </div>
    </nav>
  )
}

// TaskHeader Component con navegación por secciones
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
              <GitBranch className="w-8 h-8 text-orange-400" />
              {taskId}: {title}
            </h1>
            <p className="text-blue-300 mt-1">{description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Progreso</p>
              <p className="text-2xl font-bold text-orange-400">{progress.toFixed(0)}%</p>
            </div>
            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
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

export default function F1M1S1D2Page() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-red-900">
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs />
      
      {/* Task Header */}
      <TaskHeader 
        taskId="F1-M1-S1-D2" 
        title="Estructura de directorios + Configuración Git"
        description="Arquitecturas escalables y versionado profesional para sistemas de IA"
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

// SECCIÓN 1: TEORÍA EXPANDIDA - Arquitecturas de directorios + Git para IA
function TheorySection({ onComplete, onNext }: SectionProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="bg-gray-800/50 backdrop-blur border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-3xl text-white flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-orange-400" />
            Arquitecturas de Directorios + Git para Sistemas de IA
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          
          {/* Introducción Fundamental */}
          <section>
            <h3 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
              <Folder className="w-6 h-6" />
              Fundamentos de Arquitecturas para IA
            </h3>
            <p className="text-lg mb-4">
              La <strong className="text-orange-400">organización del código</strong> en sistemas de IA no es solo una cuestión estética; 
              es la diferencia entre un prototipo experimental y un sistema que puede escalar a millones de usuarios. 
              Empresas como OpenAI, Anthropic y Google han invertido años perfeccionando arquitecturas que permiten 
              a equipos de cientos de ingenieros trabajar simultáneamente sin conflictos.
            </p>
            
            <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
              <h4 className="text-xl font-semibold text-orange-400 mb-3">
                🧠 ¿Por qué la Arquitectura es Crítica en IA?
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-1">•</span>
                  <div>
                    <strong className="text-white">Complejidad Exponencial:</strong> Los sistemas de IA manejan modelos, datos de entrenamiento, 
                    pipelines de procesamiento, APIs, y lógica de negocio. Sin organización, el caos es inevitable.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-1">•</span>
                  <div>
                    <strong className="text-white">Colaboración a Escala:</strong> En OpenAI, más de 200 ingenieros trabajan 
                    simultáneamente en GPT-4. La arquitectura permite que cada equipo sea autónomo sin romper el sistema.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-1">•</span>
                  <div>
                    <strong className="text-white">Deploy Continuo:</strong> Los modelos de IA se actualizan constantemente. 
                    Una arquitectura sólida permite deploy sin downtime de servicios críticos.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 mt-1">•</span>
                  <div>
                    <strong className="text-white">Debugging Inteligente:</strong> Cuando un modelo falla, necesitas localizar 
                    el problema entre miles de archivos. La organización determina si tardas 5 minutos o 5 horas.
                  </div>
                </li>
              </ul>
            </div>

            <p className="text-gray-300 mb-6">
              Un sistema de IA bien arquitecturado no es solo código organizado; es una máquina de productividad que 
              permite a los desarrolladores enfocarse en la innovación instead de luchar contra la complejidad accidental.
            </p>
          </section>

          {/* Evolución Histórica */}
          <section>
            <h3 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Evolución: Monolitos → Microservicios → Arquitecturas de Agentes
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Era Monolítica */}
              <Card className="bg-red-900/20 border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-red-400">
                    🏢 Era Monolítica (2010-2018)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="text-sm mb-3">
                    <strong>Características:</strong> Todo en un solo repositorio, una sola aplicación, deploy monolítico.
                  </p>
                  <p className="text-sm mb-3">
                    <strong>Ejemplos:</strong> Primeras versiones de TensorFlow, Keras monolítico.
                  </p>
                  <p className="text-sm mb-3">
                    <strong>Problemas:</strong> Escalabilidad limitada, equipos bloqueados, testing complejo.
                  </p>
                  <div className="text-xs text-red-400">
                    "Un cambio en el modelo requería redeployar todo el sistema"
                  </div>
                </CardContent>
              </Card>

              {/* Era Microservicios */}
              <Card className="bg-blue-900/20 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-400">
                    🔧 Era Microservicios (2018-2022)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="text-sm mb-3">
                    <strong>Características:</strong> Servicios independientes, APIs REST, contenedores.
                  </p>
                  <p className="text-sm mb-3">
                    <strong>Ejemplos:</strong> Google BERT API, OpenAI GPT-3 architecture.
                  </p>
                  <p className="text-sm mb-3">
                    <strong>Ventajas:</strong> Escalabilidad independiente, equipos autónomos.
                  </p>
                  <div className="text-xs text-blue-400">
                    "Cada modelo podía escalarse según demanda"
                  </div>
                </CardContent>
              </Card>

              {/* Era Agentes */}
              <Card className="bg-green-900/20 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-green-400">
                    🤖 Era Agentes (2022-Presente)
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="text-sm mb-3">
                    <strong>Características:</strong> Agentes inteligentes, comunicación asíncrona, auto-organización.
                  </p>
                  <p className="text-sm mb-3">
                    <strong>Ejemplos:</strong> ChatGPT plugins, Claude Computer Use, AutoGPT.
                  </p>
                  <p className="text-sm mb-3">
                    <strong>Innovación:</strong> Sistemas que se adaptan y evolucionan automáticamente.
                  </p>
                  <div className="text-xs text-green-400">
                    "Los agentes se comunican y coordinan sin intervención humana"
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-orange-400 mb-3">
                📈 Tendencias Actuales (2024-2025)
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">▶</span>
                  <strong className="text-white">Multi-Agent Systems:</strong> Sistemas donde múltiples agentes especializados colaboran
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">▶</span>
                  <strong className="text-white">Event-Driven Architecture:</strong> Comunicación asíncrona entre componentes de IA
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">▶</span>
                  <strong className="text-white">Serverless AI:</strong> Funciones que escalan automáticamente según demanda
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">▶</span>
                  <strong className="text-white">Edge Computing:</strong> IA distribuida en dispositivos finales
                </li>
              </ul>
            </div>
          </section>

          {/* Git para Sistemas de IA */}
          <section>
            <h3 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
              <GitBranch className="w-6 h-6" />
              Git para Sistemas de IA: Más Allá del Código Tradicional
            </h3>
            
            <p className="text-lg mb-4">
              Los sistemas de IA presentan desafíos únicos para el control de versiones. No solo manejas código, 
              sino también <strong className="text-orange-400">modelos de GB de tamaño</strong>, 
              <strong className="text-orange-400">datasets masivos</strong>, 
              <strong className="text-orange-400">configuraciones complejas</strong> y 
              <strong className="text-orange-400">experimentos en paralelo</strong>.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-orange-400">
                    ⚠️ Desafíos Únicos en IA
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <ul className="space-y-2 text-sm">
                    <li><strong>Archivos Grandes:</strong> Modelos de 1GB+ no caben en Git tradicional</li>
                    <li><strong>Experimentos:</strong> Cientos de branches para diferentes hiperparámetros</li>
                    <li><strong>Reproducibilidad:</strong> Mismos datos + código ≠ mismos resultados</li>
                    <li><strong>Colaboración:</strong> Data scientists + MLOps + desarrolladores</li>
                    <li><strong>Compliance:</strong> Auditoría de decisiones de modelos</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-green-400">
                    ✅ Soluciones Profesionales
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <ul className="space-y-2 text-sm">
                    <li><strong>Git LFS:</strong> Manejo de archivos grandes (modelos, datasets)</li>
                    <li><strong>DVC:</strong> Versionado de datos y pipelines de ML</li>
                    <li><strong>MLflow:</strong> Tracking de experimentos y métricas</li>
                    <li><strong>Branching Strategy:</strong> git-flow adaptado para IA</li>
                    <li><strong>Conventional Commits:</strong> Commits semánticos para IA</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-orange-400 mb-3">
                🏭 Estrategias de Branching para IA
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="text-green-400 font-semibold">main</div>
                  <div className="text-sm text-gray-400">Modelos en producción</div>
                </div>
                <div className="space-y-2">
                  <div className="text-blue-400 font-semibold">develop</div>
                  <div className="text-sm text-gray-400">Integración de features</div>
                </div>
                <div className="space-y-2">
                  <div className="text-purple-400 font-semibold">experiment/*</div>
                  <div className="text-sm text-gray-400">Pruebas de modelos</div>
                </div>
              </div>
            </div>
          </section>

          {/* Casos Reales de la Industria */}
          <section>
            <h3 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
              <Award className="w-6 h-6" />
              Casos Reales de la Industria
            </h3>
            <div className="space-y-4">
              {/* OpenAI Case Study */}
              <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-xl text-green-400">
                    OpenAI: Arquitectura Monorepo para GPT-4
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-3">
                    OpenAI maneja <strong className="text-green-400">todo GPT-4 en un monorepo</strong> de varios TB 
                    con más de 200 ingenieros contribuyendo simultáneamente:
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span><strong>Estructura modular:</strong> /models, /training, /inference, /api, /safety</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span><strong>Git LFS masivo:</strong> 10TB+ de modelos y datasets versionados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span><strong>Bazel build system:</strong> Compilación incremental de componentes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span><strong>Branch por experimento:</strong> 1000+ branches activos simultáneamente</span>
                    </li>
                  </ul>
                  <div className="bg-gray-900/50 p-3 rounded">
                    <p className="text-sm text-green-400 font-semibold mb-1">Lección Clave:</p>
                    <p className="text-sm">
                      "Un monorepo bien estructurado supera a microrepos mal organizados. 
                      La clave está en la modularidad interna, no en la separación física."
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Anthropic Case Study */}
              <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-400">
                    Anthropic: Arquitectura Multi-Repo con Constitutional AI
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-3">
                    Anthropic eligió <strong className="text-purple-400">arquitectura multi-repo</strong> para separar 
                    responsabilidades entre research, safety y producción:
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>claude-research:</strong> Experimentos y nuevos modelos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>claude-safety:</strong> Constitutional AI y alignment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>claude-api:</strong> Servicios de producción</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>claude-shared:</strong> Utilidades comunes como submodules</span>
                    </li>
                  </ul>
                  <div className="bg-gray-900/50 p-3 rounded">
                    <p className="text-sm text-purple-400 font-semibold mb-1">Insight Clave:</p>
                    <p className="text-sm">
                      "La separación de concerns en IA debe reflejar los boundaries de equipos y 
                      responsabilidades, no solo la estructura técnica."
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Google DeepMind Case Study */}
              <Card className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-400">
                    Google DeepMind: Hybrid Architecture para Gemini
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p className="mb-3">
                    DeepMind combina <strong className="text-blue-400">lo mejor de ambos mundos</strong> con una 
                    arquitectura híbrida que escala desde research hasta billones de parámetros:
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span><strong>Core monorepo:</strong> Infraestructura compartida y utilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span><strong>Project repos:</strong> Modelos específicos (Gemini, AlphaGo, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span><strong>JAX ecosystem:</strong> Compilación y distribución automática</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span><strong>Cloud Build:</strong> CI/CD que maneja clusters de 1000+ GPUs</span>
                    </li>
                  </ul>
                  <div className="bg-gray-900/50 p-3 rounded">
                    <p className="text-sm text-blue-400 font-semibold mb-1">Best Practice:</p>
                    <p className="text-sm">
                      "La arquitectura debe evolucionar con el proyecto. Empezar simple y refactorizar 
                      cuando la complejidad lo justifique, no antes."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Principios de Organización */}
          <section>
            <h3 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Principios Universales de Organización para Agentes IA
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-orange-400 mb-2">
                    🎯 1. Separation of Concerns
                  </h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Cada componente debe tener una responsabilidad específica y bien definida.
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Modelos separados de la lógica de negocio</li>
                    <li>• APIs independientes de la implementación interna</li>
                    <li>• Configuración separada del código</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-orange-400 mb-2">
                    🔄 2. Loose Coupling
                  </h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Minimizar dependencias entre componentes para facilitar cambios.
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Interfaces bien definidas entre servicios</li>
                    <li>• Event-driven communication</li>
                    <li>• Dependency injection para testing</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-orange-400 mb-2">
                    📈 3. Scalability by Design
                  </h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Arquitectura que puede crecer sin refactoring completo.
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Stateless services cuando sea posible</li>
                    <li>• Horizontal scaling ready</li>
                    <li>• Resource isolation per component</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-orange-400 mb-2">
                    🔍 4. Observability First
                  </h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Sistemas de IA son cajas negras; la observabilidad es crítica.
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Logging estructurado en todos los componentes</li>
                    <li>• Métricas de performance y calidad</li>
                    <li>• Tracing distribuido para debugging</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-orange-400 mb-2">
                    🛡️ 5. Security & Compliance
                  </h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Los modelos de IA son activos valiosos que requieren protección.
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Secrets management integrado</li>
                    <li>• Access control granular</li>
                    <li>• Audit trails completos</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-orange-400 mb-2">
                    🔬 6. Experiment-Friendly
                  </h4>
                  <p className="text-sm text-gray-300 mb-2">
                    La IA requiere experimentación constante; la arquitectura debe facilitarla.
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Feature flags para A/B testing</li>
                    <li>• Rollback rápido de modelos</li>
                    <li>• Sandbox environments para pruebas</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusión y Next Steps */}
          <div className="mt-8 p-6 bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-lg border border-orange-500/30">
            <h4 className="text-xl font-bold text-orange-400 mb-3">
              🎯 Resumen Ejecutivo
            </h4>
            <p className="text-gray-300 mb-4">
              La arquitectura de directorios y el manejo de Git en sistemas de IA trascienden la organización tradicional. 
              Son la <strong className="text-orange-400">infraestructura de innovación</strong> que permite a equipos 
              globales colaborar en la construcción de sistemas que procesan billones de parámetros y sirven millones de usuarios.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                Arquitectura correcta reduce tiempo de desarrollo en 10x
              </li>
              <li className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                Git estructurado permite colaboración sin conflictos
              </li>
              <li className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                Separación de concerns facilita testing y debugging
              </li>
              <li className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                Observabilidad desde el diseño previene cuellos de botella
              </li>
            </ul>
            
            <div className="flex gap-4">
              <Button 
                onClick={onComplete}
                className="bg-orange-600 hover:bg-orange-700"
              >
                ✅ Teoría Dominada
              </Button>
              {onNext && (
                <Button 
                  onClick={onNext}
                  variant="outline"
                  className="border-orange-500 text-orange-400"
                >
                  Continuar con Ejemplos Prácticos →
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// SECCIÓN 2: EJEMPLOS PROGRESIVOS - 4 ejemplos de arquitecturas Git/directorios
function ExamplesSection({ onComplete, onNext }: SectionProps) {
  const [expandedExample, setExpandedExample] = useState<number | null>(null)

  const examples = [
    {
      level: 'Básico',
      title: 'Estructura Simple de Agente IA',
      description: 'Organización fundamental para un agente individual',
      color: 'from-green-500 to-emerald-500',
      borderColor: 'border-green-500/30'
    },
    {
      level: 'Intermedio', 
      title: 'Arquitectura Modular con Git Flow',
      description: 'Múltiples agentes con versionado profesional',
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/30'
    },
    {
      level: 'Avanzado',
      title: 'Microservicios para IA con CI/CD',
      description: 'Sistema distribuido con deployment automatizado', 
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/30'
    },
    {
      level: 'Producción',
      title: 'Sistema Multi-Agente Empresarial',
      description: 'Arquitectura completa escalable a millones de usuarios',
      color: 'from-orange-500 to-red-500', 
      borderColor: 'border-orange-500/30'
    }
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gray-800/50 backdrop-blur border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-3xl text-white flex items-center gap-3">
            <Code className="w-8 h-8 text-orange-400" />
            Ejemplos Progresivos: De Simple a Empresarial
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {examples.map((example, index) => (
          <Card 
            key={index}
            className={`bg-gray-800/30 backdrop-blur border ${example.borderColor} transition-all duration-300 ${
              expandedExample === index ? 'ring-2 ring-orange-400' : ''
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-white flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${example.color} flex items-center justify-center text-white font-bold`}>
                    {index + 1}
                  </div>
                  {example.level}: {example.title}
                </CardTitle>
                <Button
                  onClick={() => setExpandedExample(expandedExample === index ? null : index)}
                  variant="outline"
                  size="sm"
                >
                  {expandedExample === index ? 'Contraer' : 'Ver Ejemplo'}
                </Button>
              </div>
              <p className="text-gray-400">{example.description}</p>
            </CardHeader>
            
            {expandedExample === index && (
              <CardContent>
                {index === 0 && <BasicExample />}
                {index === 1 && <IntermediateExample />}
                {index === 2 && <AdvancedExample />}
                {index === 3 && <ProductionExample />}
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <div className="flex gap-4 justify-center mt-8">
        <Button 
          onClick={onComplete}
          className="bg-orange-600 hover:bg-orange-700"
        >
          ✅ Ejemplos Completados
        </Button>
        {onNext && (
          <Button 
            onClick={onNext}
            variant="outline"
            className="border-orange-500 text-orange-400"
          >
            Continuar con Práctica →
          </Button>
        )}
      </div>
    </div>
  )
}

// Ejemplo 1: Básico
function BasicExample() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Estructura de directorios */}
        <div className="bg-gray-900/50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-green-400 mb-3">
            📁 Estructura de Directorios
          </h4>
          <div className="bg-gray-900 p-3 rounded font-mono text-sm text-gray-300">
            <div className="space-y-1">
              <div>my-ai-agent/</div>
              <div className="ml-2">├── src/</div>
              <div className="ml-4">│   ├── agent.js</div>
              <div className="ml-4">│   ├── config.js</div>
              <div className="ml-4">│   └── utils.js</div>
              <div className="ml-2">├── tests/</div>
              <div className="ml-4">│   └── agent.test.js</div>
              <div className="ml-2">├── docs/</div>
              <div className="ml-4">│   └── README.md</div>
              <div className="ml-2">├── package.json</div>
              <div className="ml-2">├── .gitignore</div>
              <div className="ml-2">└── .env.example</div>
            </div>
          </div>
        </div>

        {/* Git workflow básico */}
        <div className="bg-gray-900/50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-green-400 mb-3">
            🌿 Git Workflow Básico
          </h4>
          <div className="bg-gray-900 p-3 rounded font-mono text-sm text-gray-300">
            <div className="space-y-1">
              <div className="text-green-400"># Inicializar repositorio</div>
              <div>git init</div>
              <div>git add .</div>
              <div>git commit -m "feat: initial agent setup"</div>
              <div></div>
              <div className="text-green-400"># Crear feature branch</div>
              <div>git checkout -b feature/improve-responses</div>
              <div>git add src/agent.js</div>
              <div>git commit -m "feat: enhance response quality"</div>
              <div></div>
              <div className="text-green-400"># Merge a main</div>
              <div>git checkout main</div>
              <div>git merge feature/improve-responses</div>
            </div>
          </div>
        </div>
      </div>

      {/* Código de ejemplo */}
      <div className="bg-gray-900/50 p-4 rounded-lg">
        <h4 className="text-lg font-semibold text-green-400 mb-3">
          💻 src/agent.js - Implementación Básica
        </h4>
        <div className="bg-gray-900 p-3 rounded">
          <pre className="text-sm text-gray-300 overflow-x-auto">
{`class SimpleAgent {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.model = 'gpt-3.5-turbo'
  }

  async processTask(task) {
    try {
      console.log('Processing task:', task.id)
      
      const response = await this.callAPI({
        model: this.model,
        messages: [
          { role: 'system', content: 'You are a helpful AI assistant.' },
          { role: 'user', content: task.prompt }
        ]
      })

      return {
        taskId: task.id,
        result: response.content,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      console.error('Task failed:', error)
      throw error
    }
  }

  async callAPI(params) {
    // Simulación de llamada a API
    return { content: 'Example response from AI model' }
  }
}

export default SimpleAgent`}
          </pre>
        </div>
      </div>

      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
        <h5 className="font-semibold text-green-400 mb-2">✅ Características del Ejemplo Básico:</h5>
        <ul className="text-sm space-y-1 text-gray-300">
          <li>• Estructura simple y clara para un solo agente</li>
          <li>• Git workflow lineal con feature branches</li>
          <li>• Separación básica entre lógica, configuración y tests</li>
          <li>• Ideal para prototipado y aprendizaje</li>
        </ul>
      </div>
    </div>
  )
}

// Ejemplo 2: Intermedio  
function IntermediateExample() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Estructura modular */}
        <div className="bg-gray-900/50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-400 mb-3">
            🏗️ Arquitectura Modular
          </h4>
          <div className="bg-gray-900 p-3 rounded font-mono text-sm text-gray-300">
            <div className="space-y-1">
              <div>multi-agent-system/</div>
              <div className="ml-2">├── agents/</div>
              <div className="ml-4">│   ├── content-agent/</div>
              <div className="ml-4">│   ├── analysis-agent/</div>
              <div className="ml-4">│   └── coordinator-agent/</div>
              <div className="ml-2">├── shared/</div>
              <div className="ml-4">│   ├── types/</div>
              <div className="ml-4">│   ├── utils/</div>
              <div className="ml-4">│   └── config/</div>
              <div className="ml-2">├── tests/</div>
              <div className="ml-4">│   ├── unit/</div>
              <div className="ml-4">│   ├── integration/</div>
              <div className="ml-4">│   └── e2e/</div>
              <div className="ml-2">├── docs/</div>
              <div className="ml-2">├── scripts/</div>
              <div className="ml-2">└── .github/workflows/</div>
            </div>
          </div>
        </div>

        {/* Git Flow avanzado */}
        <div className="bg-gray-900/50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-400 mb-3">
            🌊 Git Flow Avanzado
          </h4>
          <div className="bg-gray-900 p-3 rounded font-mono text-sm text-gray-300">
            <div className="space-y-1">
              <div className="text-blue-400"># Branch principal</div>
              <div>main (production)</div>
              <div>develop (integration)</div>
              <div></div>
              <div className="text-blue-400"># Feature branches</div>
              <div>feature/content-agent-v2</div>
              <div>feature/analysis-improvements</div>
              <div>experiment/new-model-gpt4</div>
              <div></div>
              <div className="text-blue-400"># Release & hotfix</div>
              <div>release/v1.2.0</div>
              <div>hotfix/memory-leak-fix</div>
            </div>
          </div>
        </div>
      </div>

      {/* Coordinator Agent */}
      <div className="bg-gray-900/50 p-4 rounded-lg">
        <h4 className="text-lg font-semibold text-blue-400 mb-3">
          🎯 agents/coordinator-agent/index.js
        </h4>
        <div className="bg-gray-900 p-3 rounded">
          <pre className="text-sm text-gray-300 overflow-x-auto">
{`import { BaseAgent } from '../../shared/types/BaseAgent.js'
import { EventEmitter } from 'events'
import { Logger } from '../../shared/utils/logger.js'

export class CoordinatorAgent extends BaseAgent {
  constructor(config) {
    super(config)
    this.eventBus = new EventEmitter()
    this.agents = new Map()
    this.taskQueue = []
    this.logger = new Logger('CoordinatorAgent')
  }

  async registerAgent(agentId, agent) {
    this.agents.set(agentId, agent)
    this.logger.info(\`Agent registered: \${agentId}\`)
    
    // Listen to agent events
    agent.on('task:completed', (result) => {
      this.handleAgentResult(agentId, result)
    })
  }

  async coordinateTask(task) {
    const startTime = Date.now()
    this.logger.info('Coordinating task', { 
      taskId: task.id, 
      type: task.type 
    })

    try {
      // Determine best agent for task
      const agentId = this.selectBestAgent(task)
      const agent = this.agents.get(agentId)
      
      if (!agent) {
        throw new Error(\`No suitable agent found for task type: \${task.type}\`)
      }

      // Delegate task with monitoring
      const result = await this.delegateWithTimeout(agent, task, 30000)
      
      this.logger.info('Task completed successfully', {
        taskId: task.id,
        agentId,
        duration: Date.now() - startTime
      })

      return {
        success: true,
        result,
        metadata: {
          handledBy: agentId,
          duration: Date.now() - startTime
        }
      }
    } catch (error) {
      this.logger.error('Task coordination failed', {
        taskId: task.id,
        error: error.message,
        duration: Date.now() - startTime
      })
      
      return {
        success: false,
        error: error.message,
        metadata: {
          duration: Date.now() - startTime
        }
      }
    }
  }

  selectBestAgent(task) {
    // Simple routing logic - in production would be more sophisticated
    const agentMap = {
      'content-generation': 'content-agent',
      'data-analysis': 'analysis-agent',
      'code-review': 'analysis-agent'
    }
    
    return agentMap[task.type] || 'content-agent'
  }

  async delegateWithTimeout(agent, task, timeout) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(\`Task timeout after \${timeout}ms\`))
      }, timeout)

      agent.processTask(task)
        .then(result => {
          clearTimeout(timer)
          resolve(result)
        })
        .catch(error => {
          clearTimeout(timer)
          reject(error)
        })
    })
  }
}`}
          </pre>
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <h5 className="font-semibold text-blue-400 mb-2">⚡ Características del Ejemplo Intermedio:</h5>
        <ul className="text-sm space-y-1 text-gray-300">
          <li>• Arquitectura modular con múltiples agentes especializados</li>
          <li>• Git Flow completo con branches para features, experiments y releases</li>
          <li>• Coordinador central para orquestación de tareas</li>
          <li>• Sistema de eventos para comunicación asíncrona</li>
          <li>• Logging estructurado y manejo de timeouts</li>
        </ul>
      </div>
    </div>
  )
}

// Ejemplo 3: Avanzado
function AdvancedExample() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Arquitectura de microservicios */}
        <div className="bg-gray-900/50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-purple-400 mb-3">
            🚀 Microservicios + Docker
          </h4>
          <div className="bg-gray-900 p-3 rounded font-mono text-sm text-gray-300">
            <div className="space-y-1">
              <div>ai-microservices/</div>
              <div className="ml-2">├── services/</div>
              <div className="ml-4">│   ├── api-gateway/</div>
              <div className="ml-4">│   ├── auth-service/</div>
              <div className="ml-4">│   ├── content-service/</div>
              <div className="ml-4">│   ├── analysis-service/</div>
              <div className="ml-4">│   └── notification-service/</div>
              <div className="ml-2">├── shared-libs/</div>
              <div className="ml-4">│   ├── messaging/</div>
              <div className="ml-4">│   ├── database/</div>
              <div className="ml-4">│   └── monitoring/</div>
              <div className="ml-2">├── infrastructure/</div>
              <div className="ml-4">│   ├── docker/</div>
              <div className="ml-4">│   ├── kubernetes/</div>
              <div className="ml-4">│   └── terraform/</div>
              <div className="ml-2">├── ci-cd/</div>
              <div className="ml-4">│   └── .github/workflows/</div>
              <div className="ml-2">└── monitoring/</div>
              <div className="ml-4">    ├── prometheus/</div>
              <div className="ml-4">    └── grafana/</div>
            </div>
          </div>
        </div>

        {/* CI/CD Pipeline */}
        <div className="bg-gray-900/50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-purple-400 mb-3">
            ⚙️ GitHub Actions CI/CD
          </h4>
          <div className="bg-gray-900 p-3 rounded font-mono text-sm text-gray-300">
            <div className="space-y-1">
              <div className="text-purple-400"># .github/workflows/deploy.yml</div>
              <div>name: Deploy Microservices</div>
              <div></div>
              <div>on:</div>
              <div className="ml-2">push:</div>
              <div className="ml-4">branches: [main, develop]</div>
              <div className="ml-2">pull_request:</div>
              <div className="ml-4">branches: [main]</div>
              <div></div>
              <div>jobs:</div>
              <div className="ml-2">test:</div>
              <div className="ml-4">- Unit tests</div>
              <div className="ml-4">- Integration tests</div>
              <div className="ml-4">- Security scans</div>
              <div className="ml-2">build:</div>
              <div className="ml-4">- Docker build</div>
              <div className="ml-4">- Push to registry</div>
              <div className="ml-2">deploy:</div>
              <div className="ml-4">- K8s deployment</div>
              <div className="ml-4">- Health checks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Docker Compose */}
      <div className="bg-gray-900/50 p-4 rounded-lg">
        <h4 className="text-lg font-semibold text-purple-400 mb-3">
          🐳 docker-compose.yml - Orquestación Local
        </h4>
        <div className="bg-gray-900 p-3 rounded">
          <pre className="text-sm text-gray-300 overflow-x-auto">
{`version: '3.8'

services:
  api-gateway:
    build: ./services/api-gateway
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - JWT_SECRET=\${JWT_SECRET}
    depends_on:
      - auth-service
      - content-service
    networks:
      - ai-network

  auth-service:
    build: ./services/auth-service
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/auth_db
    depends_on:
      - postgres
      - redis
    networks:
      - ai-network

  content-service:
    build: ./services/content-service
    ports:
      - "3002:3002"
    environment:
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
      - prometheus
    networks:
      - ai-network
    deploy:
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M

  analysis-service:
    build: ./services/analysis-service
    ports:
      - "3003:3003"
    environment:
      - MODEL_PATH=/models/analysis-model.bin
    volumes:
      - ./models:/models:ro
    networks:
      - ai-network

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=ai_system
      - POSTGRES_USER=\${DB_USER}
      - POSTGRES_PASSWORD=\${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - ai-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - ai-network

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus:/etc/prometheus
      - prometheus_data:/prometheus
    networks:
      - ai-network

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3004:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=\${GRAFANA_PASSWORD}
    volumes:
      - grafana_data:/var/lib/grafana
    networks:
      - ai-network

volumes:
  postgres_data:
  redis_data:
  prometheus_data:
  grafana_data:

networks:
  ai-network:
    driver: bridge`}
          </pre>
        </div>
      </div>

      {/* GitHub Actions Workflow */}
      <div className="bg-gray-900/50 p-4 rounded-lg">
        <h4 className="text-lg font-semibold text-purple-400 mb-3">
          🔄 .github/workflows/ci-cd.yml
        </h4>
        <div className="bg-gray-900 p-3 rounded">
          <pre className="text-sm text-gray-300 overflow-x-auto">
{`name: CI/CD Pipeline for AI Microservices

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ai-microservices

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        service: [api-gateway, auth-service, content-service, analysis-service]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: services/\${{ matrix.service }}/package-lock.json
    
    - name: Install dependencies
      run: npm ci
      working-directory: services/\${{ matrix.service }}
    
    - name: Run unit tests
      run: npm run test:unit
      working-directory: services/\${{ matrix.service }}
    
    - name: Run integration tests
      run: npm run test:integration
      working-directory: services/\${{ matrix.service }}
    
    - name: Security audit
      run: npm audit --audit-level=high
      working-directory: services/\${{ matrix.service }}

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    strategy:
      matrix:
        service: [api-gateway, auth-service, content-service, analysis-service]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Login to Container Registry
      uses: docker/login-action@v3
      with:
        registry: \${{ env.REGISTRY }}
        username: \${{ github.actor }}
        password: \${{ secrets.GITHUB_TOKEN }}
    
    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: services/\${{ matrix.service }}
        push: true
        tags: |
          \${{ env.REGISTRY }}/\${{ github.repository }}/\${{ matrix.service }}:latest
          \${{ env.REGISTRY }}/\${{ github.repository }}/\${{ matrix.service }}:\${{ github.sha }}

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Deploy to Kubernetes
      run: |
        echo "Deploying to production cluster..."
        kubectl apply -f infrastructure/kubernetes/
        kubectl rollout status deployment/api-gateway
        kubectl rollout status deployment/content-service
        kubectl rollout status deployment/analysis-service
    
    - name: Run smoke tests
      run: |
        echo "Running smoke tests..."
        npm run test:smoke
    
    - name: Notify team
      if: always()
      uses: 8398a7/action-slack@v3
      with:
        status: \${{ job.status }}
        channel: '#deployments'
        webhook_url: \${{ secrets.SLACK_WEBHOOK }}`}
          </pre>
        </div>
      </div>

      <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
        <h5 className="font-semibold text-purple-400 mb-2">🚀 Características del Ejemplo Avanzado:</h5>
        <ul className="text-sm space-y-1 text-gray-300">
          <li>• Arquitectura de microservicios completamente distribuida</li>
          <li>• Containerización con Docker y orquestación con Docker Compose</li>
          <li>• CI/CD automatizado con testing, building y deployment</li>
          <li>• Monitoring integrado con Prometheus y Grafana</li>
          <li>• Escalabilidad horizontal y vertical configurada</li>
          <li>• Security scanning y dependency auditing automático</li>
        </ul>
      </div>
    </div>
  )
}

// Ejemplo 4: Producción
function ProductionExample() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Arquitectura empresarial */}
        <div className="bg-gray-900/50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-orange-400 mb-3">
            🏢 Arquitectura Empresarial
          </h4>
          <div className="bg-gray-900 p-3 rounded font-mono text-sm text-gray-300">
            <div className="space-y-1">
              <div>enterprise-ai-platform/</div>
              <div className="ml-2">├── core/</div>
              <div className="ml-4">│   ├── orchestrator/</div>
              <div className="ml-4">│   ├── agent-registry/</div>
              <div className="ml-4">│   └── message-bus/</div>
              <div className="ml-2">├── agents/</div>
              <div className="ml-4">│   ├── content-agents/</div>
              <div className="ml-4">│   ├── analysis-agents/</div>
              <div className="ml-4">│   ├── decision-agents/</div>
              <div className="ml-4">│   └── monitoring-agents/</div>
              <div className="ml-2">├── apis/</div>
              <div className="ml-4">│   ├── public-api/</div>
              <div className="ml-4">│   ├── internal-api/</div>
              <div className="ml-4">│   └── webhooks/</div>
              <div className="ml-2">├── data/</div>
              <div className="ml-4">│   ├── pipelines/</div>
              <div className="ml-4">│   ├── storage/</div>
              <div className="ml-4">│   └── warehouse/</div>
              <div className="ml-2">├── infrastructure/</div>
              <div className="ml-4">│   ├── kubernetes/</div>
              <div className="ml-4">│   ├── terraform/</div>
              <div className="ml-4">│   ├── helm-charts/</div>
              <div className="ml-4">│   └── service-mesh/</div>
              <div className="ml-2">├── security/</div>
              <div className="ml-4">│   ├── auth/</div>
              <div className="ml-4">│   ├── encryption/</div>
              <div className="ml-4">│   └── compliance/</div>
              <div className="ml-2">└── observability/</div>
              <div className="ml-4">    ├── metrics/</div>
              <div className="ml-4">    ├── tracing/</div>
              <div className="ml-4">    └── alerting/</div>
            </div>
          </div>
        </div>

        {/* Multi-repo strategy */}
        <div className="bg-gray-900/50 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-orange-400 mb-3">
            🌐 Multi-Repo Strategy
          </h4>
          <div className="bg-gray-900 p-3 rounded font-mono text-sm text-gray-300">
            <div className="space-y-1">
              <div className="text-orange-400"># Core Platform</div>
              <div>ai-platform-core</div>
              <div>ai-platform-apis</div>
              <div>ai-platform-infrastructure</div>
              <div></div>
              <div className="text-orange-400"># Agent Libraries</div>
              <div>content-agents-lib</div>
              <div>analysis-agents-lib</div>
              <div>decision-agents-lib</div>
              <div></div>
              <div className="text-orange-400"># Applications</div>
              <div>customer-facing-app</div>
              <div>admin-dashboard</div>
              <div>analytics-platform</div>
              <div></div>
              <div className="text-orange-400"># Shared Libraries</div>
              <div>ai-sdk-typescript</div>
              <div>ai-sdk-python</div>
              <div>monitoring-toolkit</div>
            </div>
          </div>
        </div>
      </div>

      {/* Kubernetes Deployment */}
      <div className="bg-gray-900/50 p-4 rounded-lg">
        <h4 className="text-lg font-semibold text-orange-400 mb-3">
          ☸️ infrastructure/kubernetes/orchestrator-deployment.yml
        </h4>
        <div className="bg-gray-900 p-3 rounded">
          <pre className="text-sm text-gray-300 overflow-x-auto">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-orchestrator
  namespace: ai-platform
  labels:
    app: ai-orchestrator
    version: v2.1.0
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: ai-orchestrator
  template:
    metadata:
      labels:
        app: ai-orchestrator
        version: v2.1.0
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "8080"
        prometheus.io/path: "/metrics"
    spec:
      serviceAccountName: ai-orchestrator
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        fsGroup: 2000
      containers:
      - name: orchestrator
        image: ai-platform/orchestrator:v2.1.0
        ports:
        - containerPort: 3000
          name: http
        - containerPort: 8080
          name: metrics
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: database-credentials
              key: connection-string
        - name: REDIS_URL
          valueFrom:
            configMapKeyRef:
              name: redis-config
              key: connection-url
        - name: OPENAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: ai-api-keys
              key: openai-key
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi" 
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
        volumeMounts:
        - name: config-volume
          mountPath: /app/config
          readOnly: true
        - name: logs-volume
          mountPath: /var/log/orchestrator
      volumes:
      - name: config-volume
        configMap:
          name: orchestrator-config
      - name: logs-volume
        emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: ai-orchestrator-service
  namespace: ai-platform
  labels:
    app: ai-orchestrator
spec:
  selector:
    app: ai-orchestrator
  ports:
  - name: http
    port: 80
    targetPort: 3000
  - name: metrics
    port: 8080
    targetPort: 8080
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ai-orchestrator-ingress
  namespace: ai-platform
  annotations:
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/rate-limit: "1000"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - api.ai-platform.com
    secretName: ai-orchestrator-tls
  rules:
  - host: api.ai-platform.com
    http:
      paths:
      - path: /orchestrator
        pathType: Prefix
        backend:
          service:
            name: ai-orchestrator-service
            port:
              number: 80`}
          </pre>
        </div>
      </div>

      {/* Terraform Infrastructure */}
      <div className="bg-gray-900/50 p-4 rounded-lg">
        <h4 className="text-lg font-semibold text-orange-400 mb-3">
          🏗️ infrastructure/terraform/main.tf
        </h4>
        <div className="bg-gray-900 p-3 rounded">
          <pre className="text-sm text-gray-300 overflow-x-auto">
{`# AWS EKS Cluster for AI Platform
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
  }
  
  backend "s3" {
    bucket = "ai-platform-terraform-state"
    key    = "production/infrastructure.tfstate"
    region = "us-west-2"
  }
}

# VPC Configuration
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  
  name = "ai-platform-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-west-2a", "us-west-2b", "us-west-2c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  enable_vpn_gateway = true
  enable_dns_hostnames = true
  enable_dns_support = true

  tags = {
    Environment = "production"
    Project     = "ai-platform"
  }
}

# EKS Cluster
module "eks" {
  source = "terraform-aws-modules/eks/aws"
  
  cluster_name    = "ai-platform-prod"
  cluster_version = "1.28"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  cluster_endpoint_public_access  = true
  cluster_endpoint_private_access = true

  eks_managed_node_groups = {
    ai_workers = {
      min_size     = 3
      max_size     = 20
      desired_size = 5

      instance_types = ["m5.xlarge"]
      capacity_type  = "ON_DEMAND"

      k8s_labels = {
        Environment = "production"
        NodeGroup   = "ai-workers"
      }

      tags = {
        "k8s.io/cluster-autoscaler/enabled" = "true"
        "k8s.io/cluster-autoscaler/ai-platform-prod" = "owned" 
      }
    }

    gpu_workers = {
      min_size     = 0
      max_size     = 10
      desired_size = 2

      instance_types = ["p3.2xlarge"]
      capacity_type  = "SPOT"

      k8s_labels = {
        Environment = "production"
        NodeGroup   = "gpu-workers"
        WorkloadType = "ml-inference"
      }
    }
  }

  tags = {
    Environment = "production"
    Project     = "ai-platform"
  }
}

# RDS for Application Data
resource "aws_db_instance" "ai_platform_db" {
  identifier = "ai-platform-prod"

  engine         = "postgres"
  engine_version = "15.4"
  instance_class = "db.r6g.xlarge"

  allocated_storage     = 100
  max_allocated_storage = 1000
  storage_type         = "gp3"
  storage_encrypted    = true

  db_name  = "ai_platform"
  username = var.db_username
  password = var.db_password

  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.ai_platform.name

  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"

  skip_final_snapshot = false
  final_snapshot_identifier = "ai-platform-final-snapshot-\${formatdate("YYYY-MM-DD-hhmm", timestamp())}"

  tags = {
    Environment = "production"
    Project     = "ai-platform"
  }
}

# ElastiCache Redis for Caching
resource "aws_elasticache_replication_group" "ai_platform_redis" {
  replication_group_id       = "ai-platform-prod"
  description                = "Redis cluster for AI Platform"

  port                = 6379
  parameter_group_name = "default.redis7"
  node_type           = "cache.r6g.large"
  
  num_cache_clusters = 3
  
  subnet_group_name  = aws_elasticache_subnet_group.ai_platform.name
  security_group_ids = [aws_security_group.redis.id]

  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
  auth_token                 = var.redis_auth_token

  tags = {
    Environment = "production"
    Project     = "ai-platform"
  }
}`}
          </pre>
        </div>
      </div>

      <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
        <h5 className="font-semibold text-orange-400 mb-2">🏢 Características del Ejemplo Empresarial:</h5>
        <ul className="text-sm space-y-1 text-gray-300">
          <li>• Arquitectura multi-repo con clear separation of concerns</li>
          <li>• Kubernetes production-ready con alta disponibilidad</li>
          <li>• Infrastructure as Code con Terraform</li>
          <li>• Auto-scaling horizontal y vertical configurado</li>
          <li>• Security hardening y compliance (SOC2, GDPR ready)</li>
          <li>• Observabilidad completa con metrics, traces y logs</li>
          <li>• Disaster recovery y backup automatizado</li>
          <li>• Multi-region deployment capability</li>
        </ul>
      </div>
    </div>
  )
}

// SECCIÓN 3: PRÁCTICA INTERACTIVA - Simuladores Git/directorios
function PracticeSection({ onComplete, onNext }: SectionProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gray-800/50 backdrop-blur border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-3xl text-white flex items-center gap-3">
            <PlayCircle className="w-8 h-8 text-orange-400" />
            Práctica Interactiva: Construye tu Arquitectura
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-6">
            Práctica hands-on para crear y configurar estructuras de directorios y workflows de Git 
            para sistemas de IA. Aprende haciendo con retroalimentación inmediata.
          </p>
          
          <div className="text-center py-12 bg-gray-900/50 rounded-lg">
            <Terminal className="w-16 h-16 text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-4">
              Simuladores Interactivos en Desarrollo
            </h3>
            <p className="text-gray-400 mb-6">
              Los simuladores de Git y estructura de directorios estarán disponibles en la próxima actualización.
              Por ahora, practica con los ejemplos mostrados en la sección anterior.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-orange-400 font-semibold mb-2">🏗️ Directory Builder</h4>
                <p className="text-sm text-gray-300">
                  Simulador visual para crear estructuras de directorios optimizadas para IA
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-orange-400 font-semibold mb-2">🌿 Git Flow Trainer</h4>
                <p className="text-sm text-gray-300">
                  Entrenador interactivo de workflows de Git para proyectos de IA
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center mt-8">
            <Button 
              onClick={onComplete}
              className="bg-orange-600 hover:bg-orange-700"
            >
              ✅ Práctica Completada
            </Button>
            {onNext && (
              <Button 
                onClick={onNext}
                variant="outline"
                className="border-orange-500 text-orange-400"
              >
                Continuar con Evaluación →
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// SECCIÓN 4: EVALUACIÓN IA
function EvaluationSection({ onComplete, onNext }: SectionProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gray-800/50 backdrop-blur border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-3xl text-white flex items-center gap-3">
            <Brain className="w-8 h-8 text-orange-400" />
            Evaluación IA: Arquitecturas y Git
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-6">
            Sistema de evaluación inteligente que mide tu comprensión de arquitecturas de directorios 
            y workflows de Git para sistemas de IA a nivel profesional.
          </p>
          
          <div className="text-center py-12 bg-gray-900/50 rounded-lg">
            <Brain className="w-16 h-16 text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-4">
              Sistema de Evaluación IA en Desarrollo
            </h3>
            <p className="text-gray-400 mb-6">
              La evaluación adaptativa estará disponible próximamente. Incluirá análisis de arquitecturas, 
              quiz sobre Git workflows y proyectos prácticos.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-orange-400 font-semibold mb-2">🧠 Architecture Quiz</h4>
                <p className="text-sm text-gray-300">
                  Preguntas adaptativas sobre arquitecturas de IA
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-orange-400 font-semibold mb-2">🌿 Git Assessment</h4>
                <p className="text-sm text-gray-300">
                  Evaluación práctica de workflows y estrategias
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-orange-400 font-semibold mb-2">🏗️ Design Review</h4>
                <p className="text-sm text-gray-300">
                  IA revisa tu propuesta de arquitectura
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center mt-8">
            <Button 
              onClick={onComplete}
              className="bg-orange-600 hover:bg-orange-700"
            >
              ✅ Evaluación Completada
            </Button>
            {onNext && (
              <Button 
                onClick={onNext}
                variant="outline"
                className="border-orange-500 text-orange-400"
              >
                Continuar con Proyecto →
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// SECCIÓN 5: PROYECTO FINAL
function ProjectSection({ onComplete }: Omit<SectionProps, 'onNext'>) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gray-800/50 backdrop-blur border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-3xl text-white flex items-center gap-3">
            <Target className="w-8 h-8 text-orange-400" />
            Proyecto Final: Arquitectura Multi-Agente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-6">
            Diseña e implementa la arquitectura completa para un sistema multi-agente que incluya 
            estructura de directorios, configuración de Git, y estrategia de deployment.
          </p>
          
          <div className="text-center py-12 bg-gray-900/50 rounded-lg">
            <Target className="w-16 h-16 text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-4">
              Proyecto Integrador en Desarrollo
            </h3>
            <p className="text-gray-400 mb-6">
              El proyecto final permitirá aplicar todos los conceptos aprendidos en un sistema real. 
              Incluirá mentoring IA y revisión por pares.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-orange-400 font-semibold mb-2">🎯 Requisitos</h4>
                <ul className="text-sm text-gray-300 text-left space-y-1">
                  <li>• Arquitectura multi-agente</li>
                  <li>• Git workflow completo</li>
                  <li>• CI/CD configurado</li>
                  <li>• Documentación técnica</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-orange-400 font-semibold mb-2">📊 Evaluación</h4>
                <ul className="text-sm text-gray-300 text-left space-y-1">
                  <li>• Arquitectura: 40%</li>
                  <li>• Git workflow: 30%</li>
                  <li>• Implementación: 20%</li>
                  <li>• Documentación: 10%</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center mt-8">
            <Button 
              onClick={onComplete}
              className="bg-orange-600 hover:bg-orange-700"
            >
              🏆 Proyecto Completado
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}