'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { 
  BookOpen, Code, Brain, CheckCircle, PlayCircle, Target,
  Settings, GitBranch, FileCode, Zap, Award, TrendingUp
} from 'lucide-react'

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
    <div className="space-y-6">
      {/* Contenido vendrá en parte 2/4 */}
    </div>
  )
}

function ExamplesSection({ onComplete, onNext }: SectionProps) {
  return (
    <div className="space-y-6">
      {/* Contenido vendrá en parte 3/4 */}
    </div>
  )
}

function PracticeSection({ onComplete, onNext }: SectionProps) {
  return (
    <div className="space-y-6">
      {/* Contenido vendrá en parte 4/4 */}
    </div>
  )
}

function EvaluationSection({ onComplete, onNext }: SectionProps) {
  return (
    <div className="space-y-6">
      {/* Contenido vendrá en parte 4/4 */}
    </div>
  )
}

function ProjectSection({ onComplete }: Omit<SectionProps, 'onNext'>) {
  return (
    <div className="space-y-6">
      {/* Contenido vendrá en parte 4/4 */}
    </div>
  )
}