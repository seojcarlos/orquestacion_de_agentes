import Link from 'next/link';
import { FileCode, Server, RefreshCw, Monitor } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export default function EjemplosRenderizado() {
  const ejemplos = [
    {
      tipo: 'SSG',
      titulo: 'Static Site Generation',
      descripcion: 'Páginas pre-generadas en tiempo de build',
      icono: FileCode,
      color: 'bg-blue-500',
      link: '/ejemplos-renderizado/ssg'
    },
    {
      tipo: 'SSR',
      titulo: 'Server-Side Rendering',
      descripcion: 'Páginas generadas en cada petición',
      icono: Server,
      color: 'bg-green-500',
      link: '/ejemplos-renderizado/ssr'
    },
    {
      tipo: 'ISR',
      titulo: 'Incremental Static Regeneration',
      descripcion: 'Páginas estáticas que se actualizan',
      icono: RefreshCw,
      color: 'bg-purple-500',
      link: '/ejemplos-renderizado/isr'
    },
    {
      tipo: 'CSR',
      titulo: 'Client-Side Rendering',
      descripcion: 'Renderizado completo en el navegador',
      icono: Monitor,
      color: 'bg-orange-500',
      link: '/ejemplos-renderizado/csr'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <Breadcrumb />
        </div>
      </header>

      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Tipos de Renderizado en Next.js</h1>
        <p className="text-gray-600 mb-8">
          Explora las diferentes formas de renderizar páginas en Next.js 13+
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ejemplos.map((ejemplo) => {
            const Icon = ejemplo.icono;
            return (
              <Link
                key={ejemplo.tipo}
                href={ejemplo.link}
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${ejemplo.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-1">{ejemplo.tipo}</h2>
                    <h3 className="text-gray-700 font-medium mb-2">{ejemplo.titulo}</h3>
                    <p className="text-gray-600 text-sm">{ejemplo.descripcion}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">📍 ¿Dónde se configura?</h2>
          <div className="space-y-3 text-sm">
            <div>
              <strong>1. A nivel de página:</strong>
              <pre className="bg-gray-800 text-white p-2 rounded mt-1">
{`// En cualquier page.tsx
export const dynamic = 'force-dynamic' // SSR
export const revalidate = 60 // ISR (60 segundos)
export const revalidate = false // SSG`}
              </pre>
            </div>
            <div>
              <strong>2. Client Components:</strong>
              <pre className="bg-gray-800 text-white p-2 rounded mt-1">
{`'use client' // Al inicio del archivo para CSR`}
              </pre>
            </div>
            <div>
              <strong>3. En fetch():</strong>
              <pre className="bg-gray-800 text-white p-2 rounded mt-1">
{`fetch(url, { 
  next: { revalidate: 3600 } // ISR
  cache: 'no-store' // SSR
})`}
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4 flex-wrap">
          <Link
            href="/"
            className="inline-block text-blue-600 hover:text-blue-800"
          >
            ← Volver al inicio
          </Link>
          <Link
            href="/ejemplos-renderizado/guia-analisis"
            className="inline-block text-purple-600 hover:text-purple-800"
          >
            🔍 Guía de Análisis con DevTools →
          </Link>
          <Link
            href="/ejemplos-renderizado/comparacion"
            className="inline-block text-green-600 hover:text-green-800"
          >
            ⚡ Comparación de Rendimiento →
          </Link>
          <Link
            href="/ejemplos-renderizado/dev-vs-produccion"
            className="inline-block text-orange-600 hover:text-orange-800"
          >
            🚀 Dev vs Producción →
          </Link>
        </div>
      </div>
    </div>
  );
}
