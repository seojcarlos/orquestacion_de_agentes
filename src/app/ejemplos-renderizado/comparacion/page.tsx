'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Server, FileCode, Monitor, RefreshCw, Activity } from 'lucide-react';
// import Breadcrumb from '@/components/Breadcrumb';

interface PerformanceMetrics {
  ttfb: number; // Time to First Byte
  fcp: number;  // First Contentful Paint
  lcp: number;  // Largest Contentful Paint
  domLoad: number;
  totalLoad: number;
  resourceCount: number;
  totalSize: number;
}

export default function ComparacionRendimiento() {
  const [metricas, setMetricas] = useState<PerformanceMetrics | null>(null);
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    // Medir rendimiento cuando la página carga completamente
    const medirRendimiento = () => {
      try {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paintEntries = performance.getEntriesByType('paint');
        const resources = performance.getEntriesByType('resource');
        
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
        
        // Calcular tamaño total de recursos
        const totalSize = resources.reduce((acc, resource: any) => {
          return acc + (resource.transferSize || 0);
        }, 0);

        const metrics: PerformanceMetrics = {
          ttfb: navigation.responseStart - navigation.fetchStart,
          fcp: fcp,
          lcp: 0, // Lo actualizaremos con el observer
          domLoad: navigation.domContentLoadedEventEnd - navigation.fetchStart,
          totalLoad: navigation.loadEventEnd - navigation.fetchStart,
          resourceCount: resources.length,
          totalSize: totalSize / 1024 // Convertir a KB
        };

        // Observer para LCP
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          metrics.lcp = lastEntry.startTime;
          setMetricas({...metrics});
        });

        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        
        setMetricas(metrics);

        // Limpiar observer después de 3 segundos
        setTimeout(() => observer.disconnect(), 3000);
      } catch (error) {
        console.error('Error midiendo rendimiento:', error);
      }
    };

    if (typeof window !== 'undefined' && window.performance && typeof performance.getEntriesByType === 'function') {
      if (document.readyState === 'complete') {
        setTimeout(medirRendimiento, 100);
      } else {
        window.addEventListener('load', () => setTimeout(medirRendimiento, 100));
      }
    }
  }, []);

  const formatTime = (ms: number) => {
    if (ms < 1) return '< 1ms';
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const getColorForMetric = (value: number, type: 'time' | 'size' | 'count') => {
    if (type === 'time') {
      if (value < 100) return 'text-green-600';
      if (value < 500) return 'text-yellow-600';
      return 'text-red-600';
    } else if (type === 'size') {
      if (value < 500) return 'text-green-600';
      if (value < 1500) return 'text-yellow-600';
      return 'text-red-600';
    } else {
      if (value < 20) return 'text-green-600';
      if (value < 50) return 'text-yellow-600';
      return 'text-red-600';
    }
  };

  const tiposRenderizado = [
    {
      id: 'ssg',
      nombre: 'SSG',
      titulo: 'Static Site Generation',
      icono: FileCode,
      color: 'blue',
      link: '/ejemplos-renderizado/ssg',
      descripcion: 'HTML pre-generado en build time'
    },
    {
      id: 'ssr',
      nombre: 'SSR',
      titulo: 'Server-Side Rendering',
      icono: Server,
      color: 'green',
      link: '/ejemplos-renderizado/ssr',
      descripcion: 'HTML generado en cada request'
    },
    {
      id: 'isr',
      nombre: 'ISR',
      titulo: 'Incremental Static Regeneration',
      icono: RefreshCw,
      color: 'purple',
      link: '/ejemplos-renderizado/isr',
      descripcion: 'Estático con actualizaciones'
    },
    {
      id: 'csr',
      nombre: 'CSR',
      titulo: 'Client-Side Rendering',
      icono: Monitor,
      color: 'orange',
      link: '/ejemplos-renderizado/csr',
      descripcion: 'Renderizado en el navegador'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/ejemplos-renderizado" className="hover:text-gray-900">
              Ejemplos de Renderizado
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Comparación de Rendimiento</span>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        <Link href="/ejemplos-renderizado" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a ejemplos
        </Link>

        <h1 className="text-3xl font-bold mb-2">⚡ Comparación de Rendimiento</h1>
        <p className="text-gray-600 mb-8">
          Métricas en tiempo real de la página actual
        </p>

        {/* Panel de Métricas Actuales */}
        {metricas && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Métricas de Esta Página
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600">TTFB</p>
                <p className={`text-2xl font-bold ${getColorForMetric(metricas.ttfb, 'time')}`}>
                  {formatTime(metricas.ttfb)}
                </p>
                <p className="text-xs text-gray-500">Time to First Byte</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600">FCP</p>
                <p className={`text-2xl font-bold ${getColorForMetric(metricas.fcp, 'time')}`}>
                  {formatTime(metricas.fcp)}
                </p>
                <p className="text-xs text-gray-500">First Contentful Paint</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600">DOM Load</p>
                <p className={`text-2xl font-bold ${getColorForMetric(metricas.domLoad, 'time')}`}>
                  {formatTime(metricas.domLoad)}
                </p>
                <p className="text-xs text-gray-500">DOM Content Loaded</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600">Total Load</p>
                <p className={`text-2xl font-bold ${getColorForMetric(metricas.totalLoad, 'time')}`}>
                  {formatTime(metricas.totalLoad)}
                </p>
                <p className="text-xs text-gray-500">Página Completa</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-blue-50 p-4 rounded">
                <p className="text-sm text-gray-600">Recursos Cargados</p>
                <p className={`text-2xl font-bold ${getColorForMetric(metricas.resourceCount, 'count')}`}>
                  {metricas.resourceCount}
                </p>
                <p className="text-xs text-gray-500">JS, CSS, Fuentes, etc.</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded">
                <p className="text-sm text-gray-600">Tamaño Total</p>
                <p className={`text-2xl font-bold ${getColorForMetric(metricas.totalSize, 'size')}`}>
                  {Math.round(metricas.totalSize)} KB
                </p>
                <p className="text-xs text-gray-500">Transferido por red</p>
              </div>
            </div>
          </div>
        )}

        {/* Contenido Idéntico para Comparación */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">📄 Contenido de Prueba</h2>
          <p className="text-gray-700 mb-4">
            Este es el mismo contenido en todas las páginas para una comparación justa.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua.
          </p>
          
          {/* Simulación de contenido pesado */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded">
                <h3 className="font-semibold">Card {i}</h3>
                <p className="text-sm text-gray-600">Contenido de ejemplo</p>
                <div className="mt-2 h-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Característica</th>
                <th className="border p-2 text-left">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Fecha actual</td>
                <td className="border p-2">{new Date().toLocaleString('es-ES')}</td>
              </tr>
              <tr>
                <td className="border p-2">User Agent</td>
                <td className="border p-2 text-xs">{typeof window !== 'undefined' ? navigator.userAgent.substring(0, 50) + '...' : 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Links a Diferentes Tipos */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🔬 Prueba Cada Tipo</h2>
          <p className="text-gray-600 mb-4">
            Abre cada tipo en una nueva pestaña para comparar métricas:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tiposRenderizado.map(tipo => {
              const Icon = tipo.icono;
              return (
                <a
                  key={tipo.id}
                  href={tipo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <Icon className={`w-8 h-8 text-${tipo.color}-500`} />
                  <div>
                    <h3 className="font-semibold">{tipo.nombre}: {tipo.titulo}</h3>
                    <p className="text-sm text-gray-600">{tipo.descripcion}</p>
                  </div>
                  <span className="ml-auto text-gray-400">↗</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Explicación de Métricas */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">📊 Entendiendo las Métricas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>TTFB (Time to First Byte):</strong>
              <p className="text-gray-700">Tiempo hasta recibir el primer byte del servidor. Menor = servidor más rápido.</p>
            </div>
            <div>
              <strong>FCP (First Contentful Paint):</strong>
              <p className="text-gray-700">Cuando aparece el primer contenido visible. Crítico para UX.</p>
            </div>
            <div>
              <strong>DOM Load:</strong>
              <p className="text-gray-700">Cuando el HTML está completamente parseado y listo.</p>
            </div>
            <div>
              <strong>Total Load:</strong>
              <p className="text-gray-700">Cuando todos los recursos (imágenes, CSS, JS) han cargado.</p>
            </div>
          </div>
        </div>

        {/* Valores Esperados */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">🎯 Valores Esperados en Producción</h3>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left p-2">Tipo</th>
                <th className="text-left p-2">TTFB</th>
                <th className="text-left p-2">FCP</th>
                <th className="text-left p-2">Total Load</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 font-medium">SSG</td>
                <td className="p-2 text-green-600">&lt; 100ms</td>
                <td className="p-2 text-green-600">&lt; 500ms</td>
                <td className="p-2 text-green-600">&lt; 1s</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">SSR</td>
                <td className="p-2 text-yellow-600">100-300ms</td>
                <td className="p-2 text-yellow-600">500-1000ms</td>
                <td className="p-2 text-yellow-600">1-2s</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">ISR</td>
                <td className="p-2 text-green-600">&lt; 100ms</td>
                <td className="p-2 text-green-600">&lt; 500ms</td>
                <td className="p-2 text-green-600">&lt; 1s</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">CSR</td>
                <td className="p-2 text-green-600">&lt; 50ms</td>
                <td className="p-2 text-yellow-600">300-800ms</td>
                <td className="p-2 text-orange-600">1-3s</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-600 mt-3">
            * En desarrollo los tiempos son mayores debido a la falta de optimización
          </p>
        </div>
      </div>
    </div>
  );
}
