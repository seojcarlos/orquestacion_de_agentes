'use client'

import Link from 'next/link'
import { ArrowLeft, Zap, Code, Brain, Rocket, Wrench } from 'lucide-react'

export default function PlaygroundPage() {
  const experiments = [
    {
      title: 'Agente Experimental',
      description: 'Prototipo de agente con nuevas capacidades',
      status: 'En desarrollo',
      icon: Brain,
      color: 'purple'
    },
    {
      title: 'Claude Flow Advanced',
      description: 'Experimentos con flujos complejos',
      status: 'Beta',
      icon: Zap,
      color: 'blue'
    },
    {
      title: 'Multi-Modal Agent',
      description: 'Agente que trabaja con texto, imágenes y código',
      status: 'Concepto',
      icon: Code,
      color: 'green'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Playground</h1>
                <p className="text-gray-400">Laboratorio experimental de agentes IA</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Coming Soon Banner */}
        <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-800/30 rounded-2xl p-8 md:p-12 text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Wrench className="w-12 h-12 text-orange-400" />
            <h2 className="text-3xl font-bold">Área en Construcción</h2>
          </div>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            El Playground está en desarrollo activo. Aquí podrás experimentar con prototipos, 
            probar nuevas ideas y acceder a funcionalidades experimentales.
          </p>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold mb-3 text-orange-400">¿Qué estará disponible?</h3>
            <ul className="text-left text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-orange-400">•</span>
                Editor de agentes en tiempo real
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-400">•</span>
                Sandbox para pruebas de código
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-400">•</span>
                Herramientas de debugging avanzadas
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-400">•</span>
                Experimentos con modelos IA
              </li>
            </ul>
          </div>
        </div>

        {/* Upcoming Experiments */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-8">Experimentos Planificados</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experiments.map((experiment, index) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
              >
                <div className={`w-12 h-12 rounded-xl bg-${experiment.color}-600/20 flex items-center justify-center mb-4`}>
                  <experiment.icon className={`w-6 h-6 text-${experiment.color}-400`} />
                </div>
                <h4 className="text-lg font-semibold mb-2">{experiment.title}</h4>
                <p className="text-gray-400 text-sm mb-4">{experiment.description}</p>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  experiment.status === 'En desarrollo' ? 'bg-orange-600/20 text-orange-400 border border-orange-600/30' :
                  experiment.status === 'Beta' ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' :
                  'bg-gray-600/20 text-gray-400 border border-gray-600/30'
                }`}>
                  {experiment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Alternative Actions */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Mientras tanto...</h3>
          <p className="text-gray-400 mb-6">
            Puedes comenzar tu aprendizaje con nuestros contenidos principales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/academia"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
            >
              <Brain className="w-5 h-5" />
              Ir a Academia IA
            </Link>
            <Link
              href="/tutoriales"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg font-medium transition-colors"
            >
              <Code className="w-5 h-5" />
              Ver Tutoriales
            </Link>
            <Link
              href="/agencia"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              <Rocket className="w-5 h-5" />
              Programa Completo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}