'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Code, Brain, Rocket, Target, DollarSign, Users, Calendar, Clock, Star } from 'lucide-react'

export default function AgenciaDigitalIA() {
  const [activePhase, setActivePhase] = useState(1)

  const phases = [
    {
      id: 1,
      name: 'Fundamentos',
      months: '1-3',
      icon: <Code className="w-6 h-6" />,
      description: 'Arquitectura sólida desde cero hasta agentes básicos',
      highlights: ['Agente Básico sin frameworks', 'Sistema de Memoria', 'Multi-agente', 'Claude Flow']
    },
    {
      id: 2,
      name: 'Orquestación',
      months: '4-6',
      icon: <Brain className="w-6 h-6" />,
      description: 'Multi-agente con arquitectura de eventos',
      highlights: ['EventBus', 'TaskManager avanzado', 'Sistema de Costos', 'MVP funcional']
    },
    {
      id: 3,
      name: 'Visualización',
      months: '7-9',
      icon: <Rocket className="w-6 h-6" />,
      description: 'UX avanzada con React Flow',
      highlights: ['Canvas de Agentes', 'Validación Visual', 'Analytics', 'ROI Dashboard']
    },
    {
      id: 4,
      name: 'Productización',
      months: '10-12',
      icon: <DollarSign className="w-6 h-6" />,
      description: 'SaaS multi-tenant con facturación',
      highlights: ['Multi-tenancy', 'Stripe Integration', 'Customer Portal', 'Lanzamiento']
    }
  ]

  const roadmapHighlights = [
    { icon: <Target />, title: '11 Agentes Especializados', desc: 'Sistema completo de agencia digital' },
    { icon: <Brain />, title: 'Aprendizaje Progresivo', desc: 'De cero a experto paso a paso' },
    { icon: <DollarSign />, title: 'SaaS Completo', desc: 'Monetización desde el primer día' },
    { icon: <Users />, title: 'Multi-tenant', desc: 'Arquitectura escalable lista' }
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Agencia Digital IA</h1>
            <p className="text-gray-400 text-lg">Formación completa de 12 meses para crear tu propia agencia digital potenciada por IA</p>
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
              Plan completo de 12 meses para construir uno de los sistemas más avanzados del mundo: 
              una agencia digital completa que aprende y mejora automáticamente.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 justify-center text-blue-400">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold">12 Meses</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">48 semanas estructuradas</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 justify-center text-purple-400">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">2-3h/día</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Ritmo sostenible</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 justify-center text-green-400">
                  <Star className="w-5 h-5" />
                  <span className="font-semibold">960+ Tareas</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Paso a paso guiado</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Link
                href="/agencia/mes-1"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors flex items-center gap-2 text-lg"
              >
                Empezar Mes 1 <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/agencia/laboratorio"
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition-colors text-lg"
              >
                Ver Laboratorio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-2xl font-bold mb-8 text-center">¿Qué vas a construir?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapHighlights.map((highlight, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="text-blue-400 mb-4">{highlight.icon}</div>
              <h4 className="text-lg font-semibold mb-2">{highlight.title}</h4>
              <p className="text-gray-400 text-sm">{highlight.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Phases Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-2xl font-bold mb-8 text-center">Plan de Formación por Fases</h3>
        
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
              
              {/* Highlights */}
              <div className="space-y-2">
                {phase.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">{highlight}</span>
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

      {/* Roadmap Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-2xl font-bold mb-8 text-center">Roadmap Mes a Mes</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((mes) => (
            <Link
              key={mes}
              href={`/agencia/mes-${mes}`}
              className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-lg p-4 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-blue-400">Mes {mes}</span>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
              </div>
              <h4 className="text-sm font-medium mb-1">
                {mes === 1 && "Fundamentos y Agentes Básicos"}
                {mes === 2 && "Prompts y Optimización"}
                {mes === 3 && "Sistema de Corrección"}
                {mes === 4 && "Arquitectura de Eventos"}
                {mes === 5 && "Dashboard y Monitorización"}
                {mes === 6 && "MVP y Agente Crítico"}
                {mes === 7 && "Canvas de Agentes"}
                {mes === 8 && "Sistema de Validación"}
                {mes === 9 && "Analytics y ROI"}
                {mes === 10 && "Multi-tenancy"}
                {mes === 11 && "Pagos y Facturación"}
                {mes === 12 && "Lanzamiento y Operaciones"}
              </h4>
              <p className="text-xs text-gray-400">
                {mes <= 3 && "Fase: Fundamentos"}
                {mes >= 4 && mes <= 6 && "Fase: Orquestación"}
                {mes >= 7 && mes <= 9 && "Fase: Visualización"}
                {mes >= 10 && "Fase: Productización"}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">¿Listo para empezar tu transformación?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            2-3 horas diarias durante 12 meses te convertirán en un arquitecto de sistemas IA 
            que muy pocos en el mundo pueden igualar. Empezamos desde cero, paso a paso.
          </p>
          <Link
            href="/agencia/mes-1"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Comenzar Mes 1: Fundamentos <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}