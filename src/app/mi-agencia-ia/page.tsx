'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Code, Brain, Rocket, Target, DollarSign, Users } from 'lucide-react'

export default function MiAgenciaIA() {
  const [activePhase, setActivePhase] = useState(1)

  const phases = [
    {
      id: 1,
      name: 'Fundamentos',
      months: '1-3',
      icon: <Code className="w-6 h-6" />,
      description: 'Arquitectura sólida con Task Management',
      modules: [
        { week: '1-2', title: 'Setup y TaskManager', status: 'pending' },
        { week: '3-4', title: 'Primer Agente', status: 'pending' },
        { week: '5-8', title: 'Prompts y Caché', status: 'pending' },
        { week: '9-12', title: 'Bucle de Corrección', status: 'pending' }
      ]
    },
    {
      id: 2,
      name: 'Orquestación',
      months: '4-6',
      icon: <Brain className="w-6 h-6" />,
      description: 'Multi-agente con arquitectura de eventos',
      modules: [
        { week: '13-16', title: 'EventBus y Colaboración', status: 'pending' },
        { week: '17-20', title: 'Sistema de Costos', status: 'pending' },
        { week: '21-24', title: 'Agente Crítico y MVP', status: 'pending' }
      ]
    },
    {
      id: 3,
      name: 'Visualización',
      months: '7-9',
      icon: <Rocket className="w-6 h-6" />,
      description: 'UX avanzada con React Flow',
      modules: [
        { week: '25-28', title: 'Canvas de Agentes', status: 'pending' },
        { week: '29-32', title: 'Sistema de Validación', status: 'pending' },
        { week: '33-36', title: 'Analytics y ROI', status: 'pending' }
      ]
    },
    {
      id: 4,
      name: 'Productización',
      months: '10-12',
      icon: <DollarSign className="w-6 h-6" />,
      description: 'SaaS multi-tenant con facturación',
      modules: [
        { week: '37-40', title: 'Multi-tenancy', status: 'pending' },
        { week: '41-44', title: 'Pagos con Stripe', status: 'pending' },
        { week: '45-48', title: 'Lanzamiento', status: 'pending' }
      ]
    }
  ]

  const roadmapHighlights = [
    { icon: <Target />, title: '11 Agentes Especializados', desc: 'Sistema completo de agencia digital' },
    { icon: <Brain />, title: 'Aprendizaje Autónomo', desc: 'Sistema que mejora con el uso' },
    { icon: <DollarSign />, title: 'Optimización de Costos', desc: 'Router inteligente de modelos' },
    { icon: <Users />, title: 'SaaS Listo', desc: 'Multi-tenant con facturación' }
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Mi Agencia IA</h1>
              <p className="text-gray-400 text-sm">Formación completa para crear una agencia digital con IA</p>
            </div>
            <Link
              href="/tutoriales"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Volver a tutoriales
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              De Cero a Agencia IA Multi-Agente
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Plan de 12 meses para construir uno de los sistemas más avanzados del mundo: 
              una agencia digital completa potenciada por IA que aprende y mejora automáticamente.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/mi-agencia-ia/mes-1"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                Empezar Ahora <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/mi-agencia-ia/roadmap"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
              >
                Ver Roadmap Completo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapHighlights.map((highlight, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="text-blue-400 mb-4">{highlight.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
              <p className="text-gray-400 text-sm">{highlight.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Phases Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-2xl font-bold mb-8">Plan de Formación por Fases</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {phases.map((phase) => (
            <div
              key={phase.id}
              className={`relative bg-gray-900 border rounded-xl p-6 cursor-pointer transition-all ${
                activePhase === phase.id
                  ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                  : 'border-gray-800 hover:border-gray-700'
              }`}
              onClick={() => setActivePhase(phase.id)}
            >
              {/* Phase Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-blue-400">{phase.icon}</div>
                <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">
                  Meses {phase.months}
                </span>
              </div>
              
              <h4 className="text-lg font-semibold mb-2">{phase.name}</h4>
              <p className="text-sm text-gray-400 mb-4">{phase.description}</p>
              
              {/* Modules */}
              <div className="space-y-2">
                {phase.modules.map((module, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Sem {module.week}</span>
                    <span className="text-gray-300">{module.title}</span>
                  </div>
                ))}
              </div>
              
              {/* Phase Number */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                {phase.id}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stack Technology */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-2xl font-bold mb-8">Stack Tecnológico</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h4 className="font-semibold text-blue-400 mb-4">Core</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Node.js 20+ con TypeScript</li>
              <li>• Express + Socket.io</li>
              <li>• PostgreSQL + Prisma ORM</li>
              <li>• Redis + BullMQ</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h4 className="font-semibold text-purple-400 mb-4">Frontend</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Next.js 14</li>
              <li>• Tailwind + Shadcn/ui</li>
              <li>• React Flow + D3.js</li>
              <li>• Zustand + React Query</li>
            </ul>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h4 className="font-semibold text-pink-400 mb-4">IA & Servicios</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• LangChain.js</li>
              <li>• OpenAI + Anthropic + Groq</li>
              <li>• Pinecone + Langfuse</li>
              <li>• Stripe + Clerk</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">¿Listo para empezar tu viaje?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            2-3 horas diarias durante 12 meses te convertirán en un arquitecto de sistemas IA 
            que muy pocos en el mundo pueden igualar.
          </p>
          <Link
            href="/mi-agencia-ia/mes-1"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Comenzar Mes 1: Fundamentos <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
} 