'use client';

import { useState } from 'react';
import { Terminal, Package, Zap, Server, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';

export default function DevVsProduccion() {
  const [modoSeleccionado, setModoSeleccionado] = useState<'dev' | 'prod'>('dev');

  const comparacion = {
    dev: {
      comando: 'npm run dev',
      titulo: 'Modo Desarrollo',
      color: 'orange',
      descripcion: 'Optimizado para la experiencia del desarrollador',
      caracteristicas: [
        {
          titulo: 'Hot Module Replacement (HMR)',
          descripcion: 'Actualización instantánea sin recargar',
          impacto: 'positive',
          detalles: 'Los cambios se reflejan al instante'
        },
        {
          titulo: 'Source Maps Completos',
          descripcion: 'Debugging línea por línea del código original',
          impacto: 'positive',
          detalles: 'Puedes ver tu código TypeScript/JSX exacto'
        },
        {
          titulo: 'Sin Minificación',
          descripcion: 'Código legible pero más pesado',
          impacto: 'negative',
          detalles: 'Bundle ~10x más grande'
        },
        {
          titulo: 'Sin Optimización de Imágenes',
          descripcion: 'Imágenes se sirven tal cual',
          impacto: 'negative',
          detalles: 'No hay conversión a WebP/AVIF'
        },
        {
          titulo: 'Compilación On-Demand',
          descripcion: 'Solo compila lo que visitas',
          impacto: 'mixed',
          detalles: 'Primera visita más lenta, después rápido'
        },
        {
          titulo: 'React Strict Mode',
          descripcion: 'Doble renderizado para detectar bugs',
          impacto: 'mixed',
          detalles: 'Ayuda a encontrar errores pero usa más recursos'
        }
      ],
      metricas: {
        bundleSize: '~5-10 MB',
        buildTime: 'Instantáneo',
        startupTime: '2-5 segundos',
        pageLoadTime: '500-2000ms',
        ramUsage: '200-500 MB'
      }
    },
    prod: {
      comando: 'npm run build && npm start',
      titulo: 'Modo Producción',
      color: 'green',
      descripcion: 'Optimizado para máximo rendimiento',
      caracteristicas: [
        {
          titulo: 'Minificación Completa',
          descripcion: 'Código comprimido al máximo',
          impacto: 'positive',
          detalles: 'Reduce el tamaño 70-90%'
        },
        {
          titulo: 'Tree Shaking',
          descripcion: 'Elimina código no utilizado',
          impacto: 'positive',
          detalles: 'Solo incluye lo que realmente usas'
        },
        {
          titulo: 'Precompilación Total',
          descripcion: 'Todo está listo de antemano',
          impacto: 'positive',
          detalles: 'No hay compilación en runtime'
        },
        {
          titulo: 'Optimización de Imágenes',
          descripcion: 'Conversión automática a formatos modernos',
          impacto: 'positive',
          detalles: 'WebP/AVIF con lazy loading'
        },
        {
          titulo: 'CSS Optimizado',
          descripcion: 'CSS crítico inline, resto async',
          impacto: 'positive',
          detalles: 'Mejora FCP significativamente'
        },
        {
          titulo: 'Sin HMR',
          descripcion: 'Requiere rebuild para cambios',
          impacto: 'negative',
          detalles: 'Desarrollo más lento'
        }
      ],
      metricas: {
        bundleSize: '~200-500 KB',
        buildTime: '30s - 5min',
        startupTime: '< 1 segundo',
        pageLoadTime: '50-300ms',
        ramUsage: '50-150 MB'
      }
    }
  };

  const modo = comparacion[modoSeleccionado];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <Breadcrumb />
        </div>
      </header>

      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">🚀 Dev vs Producción en Next.js</h1>
        <p className="text-gray-600 mb-8">
          Entendiendo por qué los tiempos son diferentes
        </p>

        {/* Selector de Modo */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setModoSeleccionado('dev')}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              modoSeleccionado === 'dev'
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <Terminal className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <h3 className="font-semibold">Desarrollo</h3>
            <code className="text-sm text-gray-600">npm run dev</code>
          </button>

          <button
            onClick={() => setModoSeleccionado('prod')}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              modoSeleccionado === 'prod'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <Package className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-semibold">Producción</h3>
            <code className="text-sm text-gray-600">npm run build</code>
          </button>
        </div>

        {/* Detalles del Modo Seleccionado */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-lg bg-${modo.color}-100`}>
              {modoSeleccionado === 'dev' ? (
                <Terminal className={`w-6 h-6 text-${modo.color}-600`} />
              ) : (
                <Package className={`w-6 h-6 text-${modo.color}-600`} />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{modo.titulo}</h2>
              <p className="text-gray-600">{modo.descripcion}</p>
            </div>
          </div>

          {/* Características */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {modo.caracteristicas.map((caracteristica, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start gap-2">
                  {caracteristica.impacto === 'positive' && (
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  )}
                  {caracteristica.impacto === 'negative' && (
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  )}
                  {caracteristica.impacto === 'mixed' && (
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold">{caracteristica.titulo}</h4>
                    <p className="text-sm text-gray-600">{caracteristica.descripcion}</p>
                    <p className="text-xs text-gray-500 mt-1">{caracteristica.detalles}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Métricas */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Métricas Típicas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Bundle Size</p>
                <p className="font-semibold">{modo.metricas.bundleSize}</p>
              </div>
              <div>
                <p className="text-gray-600">Build Time</p>
                <p className="font-semibold">{modo.metricas.buildTime}</p>
              </div>
              <div>
                <p className="text-gray-600">Startup</p>
                <p className="font-semibold">{modo.metricas.startupTime}</p>
              </div>
              <div>
                <p className="text-gray-600">Page Load</p>
                <p className="font-semibold">{modo.metricas.pageLoadTime}</p>
              </div>
              <div>
                <p className="text-gray-600">RAM</p>
                <p className="font-semibold">{modo.metricas.ramUsage}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparación de Renderizado */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">📊 Impacto en Tipos de Renderizado</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Tipo</th>
                  <th className="text-center p-3">Dev Time</th>
                  <th className="text-center p-3">Prod Time</th>
                  <th className="text-center p-3">Diferencia</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">
                    <strong>SSG</strong>
                    <span className="text-sm text-gray-600 block">Static Generation</span>
                  </td>
                  <td className="text-center p-3">
                    <span className="text-orange-600 font-mono">500-800ms</span>
                  </td>
                  <td className="text-center p-3">
                    <span className="text-green-600 font-mono">20-100ms</span>
                  </td>
                  <td className="text-center p-3">
                    <span className="text-red-600 font-semibold">-95%</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">
                    <strong>SSR</strong>
                    <span className="text-sm text-gray-600 block">Server Rendering</span>
                  </td>
                  <td className="text-center p-3">
                    <span className="text-orange-600 font-mono">400-700ms</span>
                  </td>
                  <td className="text-center p-3">
                    <span className="text-green-600 font-mono">50-200ms</span>
                  </td>
                  <td className="text-center p-3">
                    <span className="text-red-600 font-semibold">-85%</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">
                    <strong>ISR</strong>
                    <span className="text-sm text-gray-600 block">Incremental Static</span>
                  </td>
                  <td className="text-center p-3">
                    <span className="text-orange-600 font-mono">600-1000ms</span>
                  </td>
                  <td className="text-center p-3">
                    <span className="text-green-600 font-mono">30-150ms</span>
                  </td>
                  <td className="text-center p-3">
                    <span className="text-red-600 font-semibold">-90%</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3">
                    <strong>CSR</strong>
                    <span className="text-sm text-gray-600 block">Client Rendering</span>
                  </td>
                  <td className="text-center p-3">
                    <span className="text-orange-600 font-mono">300-900ms</span>
                  </td>
                  <td className="text-center p-3">
                    <span className="text-green-600 font-mono">100-400ms</span>
                  </td>
                  <td className="text-center p-3">
                    <span className="text-red-600 font-semibold">-70%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Comandos */}
        <div className="bg-gray-900 text-white rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">🛠️ Comandos de Next.js</h3>
          
          <div className="space-y-4 font-mono text-sm">
            <div>
              <p className="text-gray-400 mb-1"># Desarrollo (sin optimizar)</p>
              <p className="text-green-400">npm run dev</p>
            </div>
            
            <div>
              <p className="text-gray-400 mb-1"># Construir para producción</p>
              <p className="text-green-400">npm run build</p>
            </div>
            
            <div>
              <p className="text-gray-400 mb-1"># Servir versión de producción</p>
              <p className="text-green-400">npm start</p>
            </div>
            
            <div>
              <p className="text-gray-400 mb-1"># Ver análisis del bundle</p>
              <p className="text-green-400">ANALYZE=true npm run build</p>
            </div>
          </div>
        </div>

        {/* Por qué la diferencia */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">💡 ¿Por qué SSR puede ser más rápido que SSG en dev?</h3>
          <ul className="space-y-2 text-sm">
            <li>• En dev, SSG no está pre-compilado, se genera on-demand igual que SSR</li>
            <li>• SSG en dev incluye validaciones extras y checks de desarrollo</li>
            <li>• El caché de desarrollo no es tan eficiente como el de producción</li>
            <li>• React DevTools y otros debugging tools añaden overhead</li>
            <li>• HMR mantiene conexiones WebSocket abiertas que consumen recursos</li>
          </ul>
        </div>

        {/* Recomendación */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">✅ Recomendación</h3>
          <p className="text-sm">
            Para medir el rendimiento real de tu aplicación, siempre usa:
          </p>
          <pre className="bg-gray-800 text-white p-3 rounded mt-2 text-sm">
            <code>{`npm run build
npm start
# Luego abre http://localhost:3000`}</code>
          </pre>
          <p className="text-sm mt-3 text-gray-600">
            Las métricas en desarrollo NO son representativas del rendimiento real.
          </p>
        </div>

        <Link
          href="/ejemplos-renderizado"
          className="inline-block mt-6 text-blue-600 hover:text-blue-800"
        >
          ← Volver a ejemplos
        </Link>
      </div>
    </div>
  );
}
