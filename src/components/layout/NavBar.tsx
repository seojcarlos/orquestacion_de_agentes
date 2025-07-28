'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Brain, Home, BookOpen, Building2, Zap, Menu, X, Activity } from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  description?: string
  featured?: boolean
  subItems?: SubNavItem[]
}

interface SubNavItem {
  href: string
  label: string
  description?: string
}

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  
  const mainNavItems: NavItem[] = [
    {
      href: '/',
      label: 'Inicio',
      icon: <Home className="w-5 h-5" />,
      description: 'Página principal'
    },
    {
      href: '/tutoriales',
      label: 'Tutoriales',
      icon: <BookOpen className="w-5 h-5" />,
      description: 'Guías y tutoriales paso a paso'
    },
    {
      href: '/agencia',
      label: 'Agencia Digital IA',
      icon: <Building2 className="w-5 h-5" />,
      description: 'Formación completa de 12 meses paso a paso',
      featured: true,
      subItems: [
        { href: '/agencia/mes-1', label: 'Mes 1: Fundamentos', description: 'Agentes básicos desde cero' },
        { href: '/agencia/mes-2', label: 'Mes 2: Prompts', description: 'Optimización y costos' },
        { href: '/agencia/mes-3', label: 'Mes 3: Corrección', description: 'Sistema de aprendizaje' },
        { href: '/agencia/mes-4', label: 'Mes 4: Eventos', description: 'Arquitectura escalable' },
        { href: '/agencia/laboratorio', label: 'Laboratorio', description: 'Experimenta con agentes' }
      ]
    },
    {
      href: '/playground',
      label: 'Playground',
      icon: <Zap className="w-5 h-5" />,
      description: 'Experimenta con nuevas ideas'
    }
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const getCurrentSection = () => {
    if (pathname.startsWith('/academia')) return 'academia'
    if (pathname.startsWith('/agencia') || pathname.startsWith('/mi-agencia-ia')) return 'agencia'
    if (pathname.startsWith('/tutoriales')) return 'tutoriales'
    if (pathname.startsWith('/playground')) return 'playground'
    return 'inicio'
  }

  const currentSection = getCurrentSection()
  // Removido el showSubNav que causaba el menú horizontal

  return (
    <>
      {/* Main Navigation */}
      <nav className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Orquestación IA</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? item.featured
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {item.featured && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                  )}
                </Link>
              ))}
            </div>

            {/* Claude Flow Status Indicator */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-900/20 border border-green-800/50 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-400">Claude Flow</span>
                <Activity className="w-3 h-3 text-green-400" />
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-gray-950">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive(item.href)
                      ? item.featured
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {item.icon}
                  <div>
                    <div className="flex items-center gap-2">
                      {item.label}
                      {item.featured && (
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                      )}
                    </div>
                    {item.description && (
                      <div className="text-xs text-gray-500">{item.description}</div>
                    )}
                  </div>
                </Link>
              ))}
              
              {/* Mobile Claude Flow Status */}
              <div className="flex items-center gap-2 px-3 py-2 mt-4 bg-green-900/20 border border-green-800/50 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-400">Claude Flow Activo</span>
                <Activity className="w-3 h-3 text-green-400" />
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}