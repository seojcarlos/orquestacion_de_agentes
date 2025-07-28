'use client';

import { useState } from 'react';
import { Brain, Smartphone, Tablet, Monitor, AlertTriangle, CheckCircle, Code, Eye, Settings, Type } from 'lucide-react';

export default function TextoResponsiveOverflow() {
  const [currentExample, setCurrentExample] = useState<'problema' | 'solucion'>('problema');

  const ejemplos = {
    problema: {
      titulo: "❌ Problema Original",
      descripcion: "Texto que se recorta en móviles y descendentes cortadas",
      codigo: `<div className="flex items-center justify-center gap-3">
  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl">
    <Brain className="w-10 h-10 text-white" />
  </div>
  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
    Orquestación de Agentes IA
  </h1>
</div>`,
      problemas: [
        "Flexbox horizontal fuerza el texto en una línea",
        "Sin padding, el texto toca los bordes",
        "Salto brusco de tamaño text-4xl → text-6xl",
        "leading-tight corta las descendentes (g, j, p, q, y)",
        "Sin padding vertical, las letras se recortan"
      ]
    },
    solucion: {
      titulo: "✅ Solución Implementada",
      descripcion: "Texto responsive que se adapta correctamente con descendentes visibles",
      codigo: `<div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 flex-wrap px-4 py-2">
  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
    <Brain className="w-10 h-10 text-white" />
  </div>
  <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent text-center sm:text-left leading-normal py-2 min-h-fit">
    Orquestación de Agentes IA
  </h1>
</div>`,
      mejoras: [
        "Layout adaptativo: flex-col → flex-row",
        "Progresión gradual: text-3xl → text-4xl → text-6xl",
        "Padding horizontal para respirar",
        "leading-normal preserva las descendentes",
        "py-2 da espacio vertical para letras cortadas",
        "min-h-fit ajusta la altura al contenido"
      ]
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          📱 Texto Responsive y Control de Overflow
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Aprende a diagnosticar y solucionar problemas de texto recortado en diseños responsive. 
          Basado en un caso real de nuestro proyecto.
        </p>
      </div>

      {/* Navegación de ejemplos */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg flex gap-1">
          <button
            onClick={() => setCurrentExample('problema')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              currentExample === 'problema'
                ? 'bg-red-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4 inline mr-2" />
            Problema
          </button>
          <button
            onClick={() => setCurrentExample('solucion')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              currentExample === 'solucion'
                ? 'bg-green-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <CheckCircle className="w-4 h-4 inline mr-2" />
            Solución
          </button>
        </div>
      </div>

      {/* Ejemplo actual */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Vista del código */}
        <div className="bg-gray-900 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">
              {ejemplos[currentExample].titulo}
            </h3>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300">
              <code>{ejemplos[currentExample].codigo}</code>
            </pre>
          </div>
        </div>

        {/* Análisis */}
        <div className="bg-white rounded-xl p-6 shadow-lg border">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-800">
              Análisis Técnico
            </h3>
          </div>
          <p className="text-gray-600 mb-4">{ejemplos[currentExample].descripcion}</p>
          <ul className="space-y-2">
            {(currentExample === 'problema' ? ejemplos[currentExample].problemas : ejemplos[currentExample].mejoras).map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                {currentExample === 'problema' ? (
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                )}
                <span className="text-sm text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Simulación responsive */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📱 Simulación de Dispositivos
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Móvil */}
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-800">Móvil (&lt; 640px)</h3>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-white min-h-32">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent text-center leading-tight">
                  Orquestación de Agentes IA
                </h1>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Layout vertical, texto centrado, tamaño text-3xl
            </p>
          </div>

          {/* Tablet */}
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <Tablet className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">Tablet (640px+)</h3>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-white min-h-32">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent leading-tight">
                  Orquestación de Agentes IA
                </h1>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Layout horizontal, texto izquierda, tamaño text-4xl
            </p>
          </div>

          {/* Desktop */}
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <Monitor className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-800">Desktop (768px+)</h3>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-white min-h-32">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Brain className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent leading-tight">
                  Orquestación de Agentes IA
                </h1>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Layout horizontal optimizado, tamaño text-6xl
            </p>
          </div>
        </div>
      </section>

      {/* Guía paso a paso */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🔧 Metodología de Diagnóstico
        </h2>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-800">⚠️ Problema Específico: Descendentes Cortadas</h3>
          </div>
          <p className="text-yellow-700 mb-3">
            El problema real no era solo responsive, sino que las <strong>descendentes de las letras</strong> (g, j, p, q, y) se cortaban en la parte inferior.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">❌ Problema:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <code>leading-tight</code> → Interlineado muy ajustado</li>
                <li>• Sin padding vertical → Sin espacio para descendentes</li>
                <li>• <code>bg-clip-text</code> sin altura adecuada</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">✅ Solución:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <code>leading-normal</code> → Espacio para descendentes</li>
                <li>• <code>py-2</code> → Padding vertical explícito</li>
                <li>• <code>min-h-fit</code> → Altura mínima adaptativa</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ejemplo interactivo de descendentes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🔤 Problema de las Descendentes
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md border">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              ❌ Con leading-tight (Cortado)
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-hidden" style={{height: '60px'}}>
              <p className="text-2xl font-bold text-white leading-tight">
                Typography: gjpqy
              </p>
            </div>
            <p className="text-sm text-gray-600">
              Las descendentes (g, j, p, q, y) se cortan porque el contenedor no tiene altura suficiente.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              ✅ Con leading-normal y py-2
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <p className="text-2xl font-bold text-white leading-normal py-2">
                Typography: gjpqy
              </p>
            </div>
            <p className="text-sm text-gray-600">
              Con <code>leading-normal</code> y <code>py-2</code>, todas las letras son completamente visibles.
            </p>
          </div>
        </div>
      </section>

      {/* Guía paso a paso */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🔧 Proceso de Diagnóstico Completo
        </h2>
        
        <div className="space-y-6">
          {[
            {
              paso: 1,
              titulo: "Identificar el problema",
              descripcion: "Revisa en diferentes tamaños de pantalla",
              codigo: "// Usar herramientas de desarrollador\n// Probar breakpoints: 320px, 640px, 768px, 1024px",
              tips: ["Usar DevTools responsive mode", "Probar en dispositivos reales", "Verificar texto completo visible"]
            },
            {
              paso: 2,
              titulo: "Analizar el layout actual",
              descripcion: "Identificar por qué el texto se recorta",
              codigo: "// Revisar:\n// - Flexbox direction\n// - Text sizing\n// - Container constraints",
              tips: ["Verificar flex properties", "Comprobar overflow settings", "Revisar padding/margin"]
            },
            {
              paso: 3,
              titulo: "Implementar solución responsive",
              descripcion: "Aplicar clases de Tailwind adaptativas",
              codigo: `// Progresión de clases:\n// flex-col sm:flex-row → Layout adaptativo\n// text-3xl sm:text-4xl md:text-6xl → Tamaños graduales\n// max-w-full → Control de overflow`,
              tips: ["Usar breakpoints graduales", "Añadir flex-wrap si es necesario", "Controlar el overflow"]
            },
            {
              paso: 4,
              titulo: "Probar y validar",
              descripcion: "Verificar en todos los dispositivos",
              codigo: "// Verificar en:\n// - Móvil: 320px-639px\n// - Tablet: 640px-767px\n// - Desktop: 768px+",
              tips: ["Probar rotación de pantalla", "Verificar zoom levels", "Comprobar accesibilidad"]
            }
          ].map((item) => (
            <div key={item.paso} className="bg-white rounded-xl p-6 shadow-md border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  {item.paso}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{item.titulo}</h3>
              </div>
              
              <p className="text-gray-600 mb-4">{item.descripcion}</p>
              
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">{item.codigo}</pre>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {item.tips.map((tip, index) => (
                  <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    💡 {tip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clases útiles de Tailwind */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🎨 Clases de Tailwind para Texto Responsive
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md border">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-600" />
              Layout Classes
            </h3>
            <div className="space-y-3">
              {[
                { clase: "flex-col sm:flex-row", uso: "Layout vertical → horizontal" },
                { clase: "items-center justify-center", uso: "Centrado en ambos ejes" },
                { clase: "flex-wrap", uso: "Permite envolver contenido" },
                { clase: "flex-shrink-0", uso: "Previene compresión de elementos" }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <code className="text-sm font-mono text-purple-600">{item.clase}</code>
                  <p className="text-xs text-gray-600 mt-1">{item.uso}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Type className="w-5 h-5 text-blue-600" />
              Typography Classes ⚠️ Descendentes
            </h3>
            <div className="space-y-3">
              {[
                { clase: "leading-normal py-2", uso: "✅ Evita corte de descendentes (g,j,p,q,y)" },
                { clase: "text-3xl sm:text-4xl md:text-6xl", uso: "Progresión gradual de tamaños" },
                { clase: "min-h-fit", uso: "Altura adaptativa para contenedores" },
                { clase: "leading-tight", uso: "❌ EVITAR: Puede cortar descendentes" }
              ].map((item, index) => (
                <div key={index} className={`p-3 rounded-lg ${
                  item.uso.includes('❌') ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                }`}>
                  <code className={`text-sm font-mono ${
                    item.uso.includes('❌') ? 'text-red-600' : 'text-blue-600'
                  }`}>{item.clase}</code>
                  <p className="text-xs text-gray-600 mt-1">{item.uso}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conclusión */}
      <section className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          🎯 Conclusiones Clave
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div>
            <h3 className="font-semibold text-purple-700 mb-2">🔍 Diagnóstico</h3>
            <p className="text-sm text-gray-600">
              Siempre prueba en múltiples tamaños de pantalla para identificar problemas de overflow.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-700 mb-2">🛠️ Solución</h3>
            <p className="text-sm text-gray-600">
              Usa breakpoints graduales y layouts adaptativos para crear experiencias fluidas.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-green-700 mb-2">✅ Validación</h3>
            <p className="text-sm text-gray-600">
              Verifica la solución en dispositivos reales, no solo en el simulador.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
