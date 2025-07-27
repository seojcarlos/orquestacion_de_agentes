'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Server, FileCode, Monitor } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export default function GuiaAnalisisRed() {
  const [pestanaActiva, setPestanaActiva] = useState<'ssg' | 'ssr' | 'csr'>('ssg');

  const analisis = {
    ssg: {
      titulo: 'SSG - Static Site Generation',
      color: 'blue',
      pasos: [
        '1. Abre DevTools (F12) → Pestaña "Network"',
        '2. Recarga la página (F5)',
        '3. Busca el archivo HTML principal',
        '4. Observa que el HTML ya contiene TODO el contenido',
        '5. No hay llamadas adicionales para obtener datos'
      ],
      queVeras: [
        '✅ HTML completo en la primera carga (~5-10kb)',
        '✅ Archivos JS para interactividad',
        '✅ CSS compilado',
        '❌ NO verás llamadas a APIs para contenido'
      ],
      ejemplo: `
<!-- Esto es lo que verás en el HTML -->
<h1>SSG - Generación Estática</h1>
<p>Esta página fue generada en: 24/11/2024 10:30:45</p>
<!-- TODO el contenido ya está aquí -->`
    },
    ssr: {
      titulo: 'SSR - Server-Side Rendering',
      color: 'green',
      pasos: [
        '1. Abre DevTools → Network',
        '2. Activa "Disable cache" en Network',
        '3. Recarga la página varias veces',
        '4. Observa que el HTML viene completo pero con datos diferentes',
        '5. El tiempo de respuesta es mayor que SSG'
      ],
      queVeras: [
        '✅ HTML diferente en cada recarga',
        '✅ Tiempo de respuesta más alto (50-200ms)',
        '✅ Headers del servidor en la respuesta',
        '✅ La fecha/hora cambia en cada recarga'
      ],
      ejemplo: `
<!-- Primera carga -->
<p>Página generada: 24/11/2024 10:31:15</p>

<!-- Segunda carga (segundos después) -->
<p>Página generada: 24/11/2024 10:31:18</p>`
    },
    csr: {
      titulo: 'CSR - Client-Side Rendering',
      color: 'orange',
      pasos: [
        '1. Abre DevTools → Network',
        '2. Filtra por "Fetch/XHR" o "JS"',
        '3. Recarga la página',
        '4. Observa el HTML inicial (casi vacío)',
        '5. Mira las llamadas AJAX después de cargar'
      ],
      queVeras: [
        '⚡ HTML inicial mínimo (~2kb)',
        '✅ Archivos JS grandes (React, componentes)',
        '✅ Llamadas fetch() a APIs DESPUÉS de cargar',
        '✅ Contenido aparece progresivamente'
      ],
      ejemplo: `
<!-- HTML inicial (vacío) -->
<div id="root"></div>

<!-- Luego JS hace fetch() -->
GET https://api.ejemplo.com/datos
<!-- Y React renderiza el contenido -->`
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <Breadcrumb />
        </div>
      </header>

      <div className="p-8 max-w-6xl mx-auto">
        <Link href="/ejemplos-renderizado" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a ejemplos
        </Link>

        <h1 className="text-3xl font-bold mb-2">🔍 Guía: Análisis de Red en DevTools</h1>
        <p className="text-gray-600 mb-8">
          Aprende a identificar qué tipo de renderizado usa una página
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {Object.entries(analisis).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setPestanaActiva(key as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                pestanaActiva === key
                  ? `bg-${value.color}-500 text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {value.titulo}
            </button>
          ))}
        </div>

        {/* Contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Panel Izquierdo - Instrucciones */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Pasos para Analizar
            </h2>
            <ol className="space-y-2">
              {analisis[pestanaActiva].pasos.map((paso, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-gray-500">{paso}</span>
                </li>
              ))}
            </ol>

            <h3 className="text-lg font-semibold mt-6 mb-3">¿Qué verás en Network?</h3>
            <ul className="space-y-2">
              {analisis[pestanaActiva].queVeras.map((item, index) => (
                <li key={index} className="text-sm text-gray-700">{item}</li>
              ))}
            </ul>
          </div>

          {/* Panel Derecho - Ejemplo Visual */}
          <div className="bg-gray-900 rounded-lg shadow-md p-6 text-white">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Ejemplo de Respuesta
            </h2>
            <pre className="text-sm text-green-400 overflow-x-auto">
              <code>{analisis[pestanaActiva].ejemplo}</code>
            </pre>
          </div>
        </div>

        {/* Tips Adicionales */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">💡 Tips Pro para DevTools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Filtros útiles:</strong>
              <ul className="mt-1 space-y-1 text-gray-700">
                <li>• "Doc" → Ver solo HTMLs</li>
                <li>• "JS" → Ver archivos JavaScript</li>
                <li>• "Fetch/XHR" → Ver llamadas AJAX</li>
                <li>• "Img" → Ver imágenes cargadas</li>
              </ul>
            </div>
            <div>
              <strong>Métricas importantes:</strong>
              <ul className="mt-1 space-y-1 text-gray-700">
                <li>• <strong>Time:</strong> Tiempo de respuesta</li>
                <li>• <strong>Size:</strong> Tamaño del archivo</li>
                <li>• <strong>Waterfall:</strong> Orden de carga</li>
                <li>• <strong>Status:</strong> 200 = OK, 304 = Cache</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Ejercicio Práctico */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">🎯 Ejercicio Práctico</h3>
          <ol className="space-y-2 text-sm">
            <li>1. Abre cada página de ejemplo en una pestaña nueva</li>
            <li>2. Abre DevTools antes de cargar la página</li>
            <li>3. Activa "Preserve log" para no perder datos</li>
            <li>4. Compara el tamaño del HTML inicial</li>
            <li>5. Identifica qué tipo de renderizado usa cada una</li>
          </ol>
        </div>

        {/* Comparación Visual */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">📊 Comparación de Tiempos de Carga</h3>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-20 text-sm font-medium">SSG:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div className="bg-blue-500 h-6 rounded-full" style={{width: '20%'}}>
                    <span className="absolute right-2 top-0 text-xs leading-6 text-white">~50ms</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-20 text-sm font-medium">SSR:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div className="bg-green-500 h-6 rounded-full" style={{width: '60%'}}>
                    <span className="absolute right-2 top-0 text-xs leading-6 text-white">~150ms</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-20 text-sm font-medium">CSR:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div className="bg-orange-500 h-6 rounded-full" style={{width: '40%'}}>
                    <span className="absolute right-2 top-0 text-xs leading-6 text-white">~100ms + API</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              * Tiempos aproximados. CSR puede ser más rápido inicialmente pero requiere tiempo adicional para cargar datos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
