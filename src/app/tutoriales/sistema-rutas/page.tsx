'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Route, FolderTree, Layers, AlertCircle, Play, Code2, FileText, Navigation, Settings } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export default function SistemaRutas() {
  const [rutaActiva, setRutaActiva] = useState('/');
  const [tipoRuta, setTipoRuta] = useState('estatica');
  const [layoutDemo, setLayoutDemo] = useState('simple');

  // Estructura de rutas para la demo
  const estructuraRutas = {
    app: {
      'page.tsx': 'Página principal',
      'layout.tsx': 'Layout raíz',
      'loading.tsx': 'Loading UI',
      'error.tsx': 'Error UI',
      about: {
        'page.tsx': 'Página About'
      },
      blog: {
        'page.tsx': 'Lista de blogs',
        'layout.tsx': 'Layout del blog',
        '[slug]': {
          'page.tsx': 'Artículo individual'
        },
        categoria: {
          '[categoria]': {
            'page.tsx': 'Posts por categoría'
          }
        }
      },
      dashboard: {
        'layout.tsx': 'Layout dashboard',
        'page.tsx': 'Dashboard home',
        settings: {
          'page.tsx': 'Configuraciones'
        },
        profile: {
          'page.tsx': 'Perfil de usuario'
        }
      }
    }
  };

  const secciones = [
    {
      id: 'app-router',
      titulo: 'App Router vs Pages Router',
      descripcion: 'Entendiendo la nueva arquitectura',
      icon: <Route className="w-5 h-5" />,
      color: 'blue'
    },
    {
      id: 'rutas-dinamicas',
      titulo: 'Rutas Dinámicas',
      descripcion: 'Usando [slug] y [...params]',
      icon: <FolderTree className="w-5 h-5" />,
      color: 'green'
    },
    {
      id: 'layouts',
      titulo: 'Layouts Anidados',
      descripcion: 'Compartiendo UI entre rutas',
      icon: <Layers className="w-5 h-5" />,
      color: 'purple'
    },
    {
      id: 'loading-error',
      titulo: 'Loading y Error States',
      descripcion: 'Manejando estados especiales',
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'yellow'
    },
    {
      id: 'middleware',
      titulo: 'Middleware Básico',
      descripcion: 'Interceptando requests',
      icon: <Settings className="w-5 h-5" />,
      color: 'red'
    }
  ];

  const ejemplosRutas = {
    estatica: {
      ruta: '/about',
      archivo: 'app/about/page.tsx',
      descripcion: 'Ruta estática simple'
    },
    dinamica: {
      ruta: '/blog/mi-primer-post',
      archivo: 'app/blog/[slug]/page.tsx',
      descripcion: 'Ruta dinámica con parámetro'
    },
    multiple: {
      ruta: '/blog/categoria/tecnologia',
      archivo: 'app/blog/categoria/[categoria]/page.tsx',
      descripcion: 'Rutas anidadas dinámicas'
    },
    catch: {
      ruta: '/docs/api/usuarios/crear',
      archivo: 'app/docs/[...slug]/page.tsx',
      descripcion: 'Catch-all routes'
    }
  };

  const codigoEjemplos = {
    layoutBasico: `// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <header>Mi App</header>
        <main>{children}</main>
        <footer>© 2025</footer>
      </body>
    </html>
  )
}`,
    rutaDinamica: `// app/blog/[slug]/page.tsx
export default function BlogPost({ 
  params 
}: { 
  params: { slug: string } 
}) {
  return (
    <div>
      <h1>Post: {params.slug}</h1>
      <p>Contenido del artículo...</p>
    </div>
  )
}`,
    loading: `// app/blog/loading.tsx
export default function Loading() {
  return (
    <div className="flex justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
    </div>
  )
}`,
    middleware: `// middleware.ts (en la raíz del proyecto)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Redirigir /old-blog a /blog
  if (request.nextUrl.pathname.startsWith('/old-blog')) {
    return NextResponse.redirect(new URL('/blog', request.url))
  }
  
  // Verificar autenticación para rutas privadas
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('token')
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}

export const config = {
  matcher: ['/old-blog/:path*', '/dashboard/:path*']
}`
  };

  const renderizarEstructura = (estructura: any, nivel = 0, ruta = '') => {
    return Object.entries(estructura).map(([nombre, contenido]) => {
      const rutaCompleta = ruta + '/' + nombre;
      const esArchivo = typeof contenido === 'string';
      const margen = `ml-${nivel * 4}`;
      
      return (
        <div key={nombre} className={margen}>
          <div className={`flex items-center gap-2 py-1 ${rutaCompleta === rutaActiva ? 'bg-blue-100 rounded px-2' : ''}`}>
            {esArchivo ? (
              <FileText className="w-4 h-4 text-blue-500" />
            ) : (
              <FolderTree className="w-4 h-4 text-yellow-600" />
            )}
            <span className={`text-sm ${esArchivo ? 'text-blue-700' : 'font-medium'}`}>
              {nombre}
            </span>
            {esArchivo && (
              <span className="text-xs text-gray-500 ml-auto">{contenido}</span>
            )}
          </div>
          {!esArchivo && renderizarEstructura(contenido, nivel + 1, rutaCompleta)}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="p-4 max-w-7xl mx-auto">
          <Breadcrumb />
          <div className="flex items-center gap-4 mt-3">
            <Link 
              href="/tutoriales" 
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver a Tutoriales
            </Link>
            <div className="flex items-center gap-2">
              <Route className="w-6 h-6 text-orange-500" />
              <h1 className="text-xl font-bold text-gray-900">Sistema de Rutas en Next.js</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Introducción */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-2">Domina el Sistema de Rutas</h2>
            <p className="text-orange-100">
              Aprende el App Router de Next.js 13+, rutas dinámicas, layouts anidados y middleware.
              Con demos interactivas paso a paso.
            </p>
          </div>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Navegación lateral */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-orange-500" />
                Contenido
              </h3>
              <nav className="space-y-2">
                {secciones.map((seccion) => (
                  <a
                    key={seccion.id}
                    href={`#${seccion.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className={`text-${seccion.color}-500`}>
                      {seccion.icon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-orange-600">
                        {seccion.titulo}
                      </div>
                      <div className="text-sm text-gray-500">
                        {seccion.descripcion}
                      </div>
                    </div>
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Sección: App Router vs Pages Router */}
            <section id="app-router" className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Route className="w-6 h-6 text-blue-500" />
                App Router vs Pages Router
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Next.js 13 introdujo el <strong>App Router</strong>, una nueva forma más poderosa y flexible 
                  de manejar rutas comparado con el Pages Router tradicional.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">✅ App Router (Recomendado)</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Layouts anidados automáticos</li>
                      <li>• Server Components por defecto</li>
                      <li>• Loading y Error UI integrados</li>
                      <li>• Streaming y Suspense</li>
                      <li>• Mejor SEO y rendimiento</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Pages Router (Legacy)</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Un archivo = una ruta</li>
                      <li>• Client Components por defecto</li>
                      <li>• getServerSideProps/getStaticProps</li>
                      <li>• Menos flexible</li>
                      <li>• Aún soportado pero no recomendado</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">🎮 Demo: Estructura de Archivos</h3>
                  <div className="bg-white border rounded-lg p-4 max-h-96 overflow-y-auto">
                    {renderizarEstructura(estructuraRutas)}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    💡 En App Router, cada carpeta es una ruta y page.tsx es el contenido
                  </p>
                </div>
              </div>
            </section>

            {/* Sección: Rutas Dinámicas */}
            <section id="rutas-dinamicas" className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FolderTree className="w-6 h-6 text-green-500" />
                Rutas Dinámicas
              </h2>

              <div className="space-y-4">
                <p className="text-gray-700">
                  Las rutas dinámicas te permiten crear páginas que responden a diferentes parámetros,
                  como IDs de usuario, slugs de artículos, etc.
                </p>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">🎮 Demo: Tipos de Rutas</h3>
                  <div className="space-y-3">
                    {Object.entries(ejemplosRutas).map(([tipo, ejemplo]) => (
                      <button
                        key={tipo}
                        onClick={() => setTipoRuta(tipo)}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                          tipoRuta === tipo 
                            ? 'border-green-400 bg-green-50' 
                            : 'border-gray-200 hover:border-green-200'
                        }`}
                      >
                        <div className="font-medium">{ejemplo.ruta}</div>
                        <div className="text-sm text-gray-600">{ejemplo.archivo}</div>
                        <div className="text-xs text-gray-500">{ejemplo.descripcion}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900 text-white p-4 rounded-lg">
                  <h4 className="text-green-400 font-medium mb-2">
                    Ejemplo: {ejemplosRutas[tipoRuta as keyof typeof ejemplosRutas].archivo}
                  </h4>
                  <pre className="text-sm overflow-x-auto">
                    <code>{tipoRuta === 'dinamica' ? codigoEjemplos.rutaDinamica : 
                          `// ${ejemplosRutas[tipoRuta as keyof typeof ejemplosRutas].archivo}
export default function Page({ params }: { params: any }) {
  return <h1>Ruta: ${ejemplosRutas[tipoRuta as keyof typeof ejemplosRutas].ruta}</h1>
}`}</code>
                  </pre>
                </div>
              </div>
            </section>

            {/* Sección: Layouts Anidados */}
            <section id="layouts" className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Layers className="w-6 h-6 text-purple-500" />
                Layouts Anidados
              </h2>

              <div className="space-y-4">
                <p className="text-gray-700">
                  Los layouts te permiten compartir UI común entre múltiples páginas y crear
                  estructuras anidadas automáticamente.
                </p>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">🎮 Demo: Estructura de Layouts</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setLayoutDemo('simple')}
                      className={`px-4 py-2 rounded-lg ${layoutDemo === 'simple' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
                    >
                      Layout Simple
                    </button>
                    <button
                      onClick={() => setLayoutDemo('anidado')}
                      className={`px-4 py-2 rounded-lg ml-2 ${layoutDemo === 'anidado' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
                    >
                      Layout Anidado
                    </button>
                  </div>
                  
                  <div className="mt-4 border-2 border-purple-200 rounded-lg p-4">
                    {layoutDemo === 'simple' ? (
                      <div className="text-center">
                        <div className="bg-purple-100 p-2 rounded mb-2">Header Global</div>
                        <div className="bg-white border-2 border-dashed border-purple-300 p-4">
                          Contenido de la Página
                        </div>
                        <div className="bg-purple-100 p-2 rounded mt-2">Footer Global</div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="bg-purple-100 p-2 rounded mb-2">Header Global</div>
                        <div className="bg-purple-50 p-2 rounded mb-2">Navegación del Blog</div>
                        <div className="bg-white border-2 border-dashed border-purple-300 p-4">
                          Artículo del Blog
                        </div>
                        <div className="bg-purple-50 p-2 rounded mt-2">Sidebar del Blog</div>
                        <div className="bg-purple-100 p-2 rounded mt-2">Footer Global</div>  
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-900 text-white p-4 rounded-lg">
                  <h4 className="text-purple-400 font-medium mb-2">Layout Básico</h4>
                  <pre className="text-sm overflow-x-auto">
                    <code>{codigoEjemplos.layoutBasico}</code>
                  </pre>
                </div>
              </div>
            </section>

            {/* Sección: Loading y Error States */}
            <section id="loading-error" className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-yellow-500" />
                Loading y Error States
              </h2>

              <div className="space-y-4">
                <p className="text-gray-700">
                  Next.js App Router incluye archivos especiales para manejar estados de carga
                  y errores de forma automática y elegante.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">loading.tsx</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Se muestra automáticamente mientras se carga la página
                    </p>
                    <div className="bg-white p-3 rounded border">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">error.tsx</h4>
                    <p className="text-sm text-red-700 mb-3">
                      Se muestra cuando ocurre un error en la página
                    </p>
                    <div className="bg-white p-3 rounded border text-center">
                      <AlertCircle className="w-6 h-6 text-red-500 mx-auto mb-1" />
                      <div className="text-sm text-red-600">Error cargando</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 text-white p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-medium mb-2">Ejemplo: loading.tsx</h4>
                  <pre className="text-sm overflow-x-auto">
                    <code>{codigoEjemplos.loading}</code>
                  </pre>
                </div>
              </div>
            </section>

            {/* Sección: Middleware */}
            <section id="middleware" className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Settings className="w-6 h-6 text-red-500" />
                Middleware Básico
              </h2>

              <div className="space-y-4">
                <p className="text-gray-700">
                  El middleware te permite ejecutar código antes de que una request sea completada,
                  útil para autenticación, redirects, y logging.
                </p>

                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Casos de Uso Comunes
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Verificar autenticación antes de acceder a rutas privadas</li>
                    <li>• Redirects automáticos (www a no-www, http a https)</li>
                    <li>• A/B testing y feature flags</li>
                    <li>• Logging y analytics</li>
                    <li>• Rate limiting y protección anti-spam</li>
                  </ul>
                </div>

                <div className="bg-gray-900 text-white p-4 rounded-lg">
                  <h4 className="text-red-400 font-medium mb-2">middleware.ts</h4>
                  <pre className="text-sm overflow-x-auto">
                    <code>{codigoEjemplos.middleware}</code>
                  </pre>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Tips finales */}
        <div className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Play className="w-6 h-6" />
            ¡Practica lo Aprendido!
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">🎯 Ejercicios Sugeridos:</h3>
              <ul className="text-sm text-orange-100 space-y-1">
                <li>• Crea un blog con rutas dinámicas [slug]</li>
                <li>• Implementa un dashboard con layouts anidados</li>
                <li>• Agrega middleware para proteger rutas admin</li>
                <li>• Experimenta con loading.tsx y error.tsx</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🚀 Próximo Paso:</h3>
              <p className="text-sm text-orange-100 mb-2">
                Ahora que dominas las rutas, es momento de aprender sobre formularios avanzados
                y Server Actions.
              </p>
              <Link 
                href="/tutoriales" 
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors"
              >
                <Code2 className="w-4 h-4" />
                Ver Más Tutoriales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}