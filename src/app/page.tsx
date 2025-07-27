'use client'

import Link from 'next/link'
import { Brain, BookOpen, Building2, Zap, ArrowRight, Star, Users, Clock, Trophy } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      title: 'Academia de Agentes IA',
      description: 'Programa progresivo de 4 semanas para dominar el desarrollo de agentes IA desde cero.',
      href: '/academia',
      icon: Brain,
      color: 'from-purple-600 to-blue-600',
      badge: 'Nuevo',
      stats: '4 semanas • 20-30 hrs'
    },
    {
      title: 'Agencia Digital IA',
      description: 'Formación completa de 12 meses para crear una agencia digital potenciada por IA.',
      href: '/agencia',
      icon: Building2,
      color: 'from-blue-600 to-cyan-600',
      badge: 'Completo',
      stats: '12 meses • 960+ tareas'
    },
    {
      title: 'Tutoriales',
      description: 'Guías paso a paso sobre Next.js, React, TypeScript y desarrollo web moderno.',
      href: '/tutoriales',
      icon: BookOpen,
      color: 'from-green-600 to-emerald-600',
      badge: 'Popular',
      stats: '10+ tutoriales • Interactivos'
    },
    {
      title: 'Playground',
      description: 'Laboratorio experimental para probar nuevas ideas y conceptos avanzados.',
      href: '/playground',
      icon: Zap,
      color: 'from-orange-600 to-red-600',
      badge: 'Beta',
      stats: 'Experimentos • Prototipos'
    }
  ]

  const stats = [
    { label: 'Estudiantes', value: '1,247', icon: Users },
    { label: 'Horas de Contenido', value: '500+', icon: Clock },
    { label: 'Proyectos Completados', value: '89', icon: Trophy },
    { label: 'Rating Promedio', value: '4.8', icon: Star }
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-600/20 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Orquestación de Agentes IA
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Plataforma educativa unificada para dominar el desarrollo de agentes IA, 
              desde conceptos básicos hasta sistemas de producción complejos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/academia"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                <Brain className="w-6 h-6" />
                Comenzar en Academia IA
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/tutoriales"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-xl font-semibold text-lg transition-all"
              >
                <BookOpen className="w-6 h-6" />
                Explorar Tutoriales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Elige tu Camino de Aprendizaje
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Cada sección está diseñada para diferentes niveles y objetivos. 
            Desde principiantes hasta desarrolladores avanzados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.href}
              className="group relative bg-gray-900/50 border border-gray-800 hover:border-gray-700 rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl"
            >
              {/* Badge */}
              <div className="absolute top-6 right-6">
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  feature.badge === 'Nuevo' ? 'bg-green-600/20 text-green-400 border border-green-600/30' :
                  feature.badge === 'Popular' ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' :
                  feature.badge === 'Beta' ? 'bg-orange-600/20 text-orange-400 border border-orange-600/30' :
                  'bg-purple-600/20 text-purple-400 border border-purple-600/30'
                }`}>
                  {feature.badge}
                </span>
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{feature.stats}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Claude Flow Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30 border border-purple-800/30 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">Potenciado por Claude Flow</h3>
            </div>
            <p className="text-gray-300 mb-8 max-w-3xl mx-auto text-lg">
              Toda la plataforma utiliza Claude Flow para generar contenido dinámico, 
              adaptar el aprendizaje a tu ritmo y proporcionar asistencia inteligente en tiempo real.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <Brain className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Contenido Adaptativo</h4>
                <p className="text-sm text-gray-400">Se ajusta a tu nivel y progreso</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <Zap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Asistencia IA</h4>
                <p className="text-sm text-gray-400">Ayuda contextual en cada paso</p>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <Trophy className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Evaluación Inteligente</h4>
                <p className="text-sm text-gray-400">Feedback personalizado continuo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Listo para Comenzar tu Viaje?
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Únete a miles de desarrolladores que ya están construyendo el futuro con agentes IA. 
            El aprendizaje es progresivo, práctico y completamente gratuito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/academia"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-semibold transition-all transform hover:scale-105"
            >
              <Brain className="w-5 h-5" />
              Empezar con la Academia
            </Link>
            <Link
              href="/agencia"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-gray-500 rounded-xl font-semibold transition-all"
            >
              <Building2 className="w-5 h-5" />
              Ver Programa Completo
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}