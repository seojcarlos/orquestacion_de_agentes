import Link from 'next/link';
import { BookOpen, Rocket, Brain, ArrowRight, Code2, Zap, Package, Palette, AlertCircle, Database, Wrench, Component, FileCode, FolderOpen, Bot, Server, Monitor, Layers, Bug, GitBranch } from 'lucide-react';

export default function Tutoriales() {
  const tutoriales = [
    // Tutoriales para principiantes
    {
      titulo: 'Sintaxis TSX',
      subtitulo: 'La base de React',
      descripcion: 'Aprende la sintaxis básica de TSX/JSX para escribir componentes en React',
      nivel: 'Principiante',
      tiempo: '15 min',
      icon: Code2,
      color: 'green',
      link: '/tutoriales/sintaxis-tsx',
      temas: ['Variables', 'Condicionales', 'Loops', 'Eventos']
    },
    
    // Tutorial especial
    {
      titulo: 'Gestión con IA',
      subtitulo: 'Cómo trabajar con Claude',
      descripcion: 'Sistema de documentación para mantener continuidad entre sesiones',
      nivel: 'Especial',
      tiempo: '15 min',
      icon: FolderOpen,
      color: 'indigo',
      link: '/tutoriales/gestion-proyecto',
      temas: ['Documentación', 'Flujo de trabajo', 'Plantillas', 'Convenciones']
    },
    {
      titulo: 'Hooks de React',
      subtitulo: 'useState, useEffect y más',
      descripcion: 'Domina los hooks esenciales para manejar estado y efectos secundarios',
      nivel: 'Principiante',
      tiempo: '25 min',
      icon: Wrench,
      color: 'purple',
      link: '/tutoriales/hooks-react',
      temas: ['useState', 'useEffect', 'useContext', 'useRef']
    },
    {
      titulo: 'Estado y Props',
      subtitulo: 'Flujo de datos en React',
      descripcion: 'Entiende cómo pasar datos entre componentes y manejar el estado',
      nivel: 'Principiante',
      tiempo: '20 min',
      icon: Database,
      color: 'blue',
      link: '/tutoriales/estado-props',
      temas: ['Props', 'Estado local', 'Lifting state', 'Props drilling']
    },
    {
      titulo: 'CSS en Next.js',
      subtitulo: 'Estilos para tu app',
      descripcion: 'Aprende las diferentes formas de añadir estilos a tu aplicación Next.js',
      nivel: 'Principiante',
      tiempo: '20 min',
      icon: Palette,
      color: 'pink',
      link: '/tutoriales/css-nextjs',
      temas: ['CSS Modules', 'Tailwind', 'CSS-in-JS', 'Global CSS']
    },
    {
      titulo: 'Gitignore Correcto',
      subtitulo: 'Protege tu código y datos',
      descripcion: 'Tutorial completo para configurar .gitignore correctamente y proteger datos sensibles',
      nivel: 'Principiante',
      tiempo: '15 min',
      icon: GitBranch,
      color: 'green',
      link: '/tutoriales/gitignore-correcto',
      temas: ['.env protection', 'API keys', 'Personal data', 'Git security']
    },
    
    // Tutoriales intermedios
    {
      titulo: 'Sistema de Rutas',
      subtitulo: 'App Router de Next.js',
      descripcion: 'Domina el enrutamiento moderno con App Router',
      nivel: 'Intermedio',
      tiempo: '30 min',
      icon: Zap,
      color: 'orange',
      link: '/tutoriales/sistema-rutas',
      temas: ['Rutas dinámicas', 'Layouts', 'Loading', 'Error handling']
    },
    {
      titulo: 'Formularios Avanzados',
      subtitulo: 'Validación y manejo',
      descripcion: 'Crea formularios robustos con validación y manejo de errores',
      nivel: 'Intermedio',
      tiempo: '35 min',
      icon: FileCode,
      color: 'indigo',
      link: '/tutoriales/formularios',
      temas: ['Validación', 'Estados de carga', 'Errores', 'Envío de datos']
    },
    {
      titulo: 'Asistente Inteligente',
      subtitulo: 'Automatiza tareas con IA',
      descripcion: 'Conecta un asistente para registrar automáticamente tareas en tu proyecto',
      nivel: 'Intermedio',
      tiempo: '45 min',
      icon: Bot,
      color: 'purple',
      link: '/tutoriales/asistente-inteligente',
      temas: ['API Routes', 'Webhooks', 'Validación', 'Seguridad']
    },
    {
      titulo: 'Claude Monitor Ubuntu',
      subtitulo: 'Conexión en Linux',
      descripcion: 'Comandos básicos para lanzar Claude Monitor cada vez que abras tu terminal',
      nivel: 'Especial',
      tiempo: '10 min',
      icon: Server,
      color: 'green',
      link: '/tutoriales/claude-monitor-ubuntu',
      temas: ['Terminal', 'Entorno virtual', 'Claude Monitor', 'Ubuntu']
    },
    {
      titulo: 'Claude Flow',
      subtitulo: 'Orquestación de IA para Desarrollo',
      descripcion: 'Aprende cómo usar Claude Flow para revolucionar tu flujo de desarrollo con IA',
      nivel: 'Especial',
      tiempo: '40 min',
      icon: Bot,
      color: 'indigo',
      link: '/tutoriales/un-curso-de-como-se-utiliza-httpsgithubcomruvnetclaude-flow-en-esta-web-que-aporta-y-desafios-con-ejemplos-visuales',
      temas: ['Hive-Mind Intelligence', 'Agentes especializados', 'Memoria persistente', 'Casos de uso']
    },
    
    // Tutoriales avanzados
    {
      titulo: 'Server Components',
      subtitulo: 'RSC en Next.js 13+',
      descripcion: 'Domina los React Server Components con demos interactivas y Claude Flow',
      nivel: 'Avanzado',
      tiempo: '35 min',
      icon: Server,
      color: 'blue',
      link: '/tutoriales/server-components',
      temas: ['RSC', 'Client Components', 'Data Fetching', 'Claude Flow']
    },
    {
      titulo: 'Optimización',
      subtitulo: 'Performance en Next.js',
      descripcion: 'Técnicas avanzadas para optimizar el rendimiento',
      nivel: 'Avanzado',
      tiempo: '45 min',
      icon: Rocket,
      color: 'cyan',
      link: '/tutoriales/optimizacion',
      temas: ['Lazy loading', 'Image optimization', 'Bundle size', 'Caching']
    },
    
    // Tutoriales adicionales
    {
      titulo: 'Art Tool',
      subtitulo: 'Herramientas creativas',
      descripcion: 'Crea herramientas artísticas interactivas con React y Canvas',
      nivel: 'Intermedio',
      tiempo: '40 min',
      icon: Palette,
      color: 'pink',
      link: '/tutoriales/art-tool',
      temas: ['Canvas', 'Interactividad', 'Creative coding', 'Animaciones']
    },
    {
      titulo: 'Context Engineering SaaS',
      subtitulo: 'Arquitectura para SaaS',
      descripcion: 'Diseña sistemas SaaS robustos con Context Engineering',
      nivel: 'Avanzado',
      tiempo: '50 min',
      icon: Layers,
      color: 'purple',
      link: '/tutoriales/context-engineering-saas',
      temas: ['Arquitectura', 'Escalabilidad', 'Multi-tenant', 'Performance']
    },
    {
      titulo: 'Errores Comunes',
      subtitulo: 'Debug y soluciones',
      descripcion: 'Identifica y resuelve los errores más frecuentes en Next.js',
      nivel: 'Intermedio',
      tiempo: '30 min',
      icon: Bug,
      color: 'red',
      link: '/tutoriales/errores-comunes',
      temas: ['Debugging', 'Error handling', 'Best practices', 'Troubleshooting']
    },
    {
      titulo: 'Estilos en Next.js',
      subtitulo: 'CSS moderno',
      descripcion: 'Manejo avanzado de estilos y temas en aplicaciones Next.js',
      nivel: 'Intermedio',
      tiempo: '35 min',
      icon: Palette,
      color: 'orange',
      link: '/tutoriales/estilos-nextjs',
      temas: ['CSS-in-JS', 'Styled Components', 'Theme switching', 'Responsive design']
    },
    {
      titulo: 'Texto Responsive',
      subtitulo: 'Control de overflow',
      descripcion: 'Soluciona problemas de texto recortado en diseños responsive',
      nivel: 'Intermedio',
      tiempo: '25 min',
      icon: Monitor,
      color: 'blue',
      link: '/tutoriales/texto-responsive-overflow',
      temas: ['Responsive text', 'Overflow control', 'Flexbox layout', 'Breakpoints']
    }
  ];

  const niveles = {
    'Principiante': { color: 'bg-green-100 text-green-800', icon: BookOpen },
    'Intermedio': { color: 'bg-orange-100 text-orange-800', icon: Zap },
    'Avanzado': { color: 'bg-red-100 text-red-800', icon: Brain },
    'Especial': { color: 'bg-indigo-100 text-indigo-800', icon: FolderOpen }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header simple */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="text-sm text-gray-600">
            <span className="text-gray-900 font-medium">Tutoriales</span>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            📚 Tutoriales de Next.js y React
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprende paso a paso con ejemplos prácticos y explicaciones claras
          </p>
        </div>

        {/* Ruta de aprendizaje */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-12">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            Ruta de Aprendizaje Recomendada
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="px-3 py-1 bg-white rounded-full">1. Sintaxis TSX</span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <span className="px-3 py-1 bg-white rounded-full">2. Hooks</span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <span className="px-3 py-1 bg-white rounded-full">3. Estado y Props</span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <span className="px-3 py-1 bg-white rounded-full">4. CSS</span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <span className="px-3 py-1 bg-white rounded-full">5. Rutas</span>
          </div>
        </div>

        {/* Grid de tutoriales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutoriales.map((tutorial) => {
            const Icon = tutorial.icon;
            const nivelInfo = niveles[tutorial.nivel as keyof typeof niveles];
            const NivelIcon = nivelInfo.icon;
            
            return (
              <Link
                key={tutorial.link}
                href={tutorial.link}
                className="block group"
              >
                <div className="h-full bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  {/* Header colorido */}
                  <div className={`h-2 bg-${tutorial.color}-500`} />
                  
                  <div className="p-6">
                    {/* Icono y nivel */}
                    <div className="flex items-start justify-between mb-4">
                      <Icon className={`w-12 h-12 text-${tutorial.color}-600`} />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${nivelInfo.color} flex items-center gap-1`}>
                        <NivelIcon className="w-3 h-3" />
                        {tutorial.nivel}
                      </span>
                    </div>
                    
                    {/* Contenido */}
                    <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                      {tutorial.titulo}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{tutorial.subtitulo}</p>
                    <p className="text-gray-600 mb-4">{tutorial.descripcion}</p>
                    
                    {/* Temas */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tutorial.temas.map((tema, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                          {tema}
                        </span>
                      ))}
                    </div>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-gray-500">⏱ {tutorial.tiempo}</span>
                      <span className="text-sm text-blue-600 group-hover:text-blue-800 flex items-center gap-1">
                        Empezar
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Sección de ayuda */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Necesitas ayuda?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Si tienes dudas o quieres profundizar más, únete a nuestra comunidad
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Discord
            </button>
            <button className="px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
              Documentación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}