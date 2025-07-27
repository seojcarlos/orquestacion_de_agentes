'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Palette, FileCode, Sparkles, Globe, Package, Zap, AlertCircle } from 'lucide-react';
// import Breadcrumb from '@/components/Breadcrumb';

// Ejemplos de componentes con diferentes estilos
const BotonTailwind = () => (
  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md">
    Botón con Tailwind
  </button>
);

const BotonCSSModule = () => (
  <button className="boton-module">
    Botón con CSS Module
    <style jsx>{`
      .boton-module {
        padding: 8px 16px;
        background: linear-gradient(45deg, #ff6b6b, #ee5a6f);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: transform 0.2s;
      }
      .boton-module:hover {
        transform: translateY(-2px);
      }
    `}</style>
  </button>
);

const BotonStyled = () => (
  <button
    style={{
      padding: '8px 16px',
      background: '#10b981',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}
  >
    Botón con style inline
  </button>
);

export default function CSSNextJS() {
  const [metodoActivo, setMetodoActivo] = useState('tailwind');

  const metodos = [
    {
      id: 'tailwind',
      nombre: 'Tailwind CSS',
      icono: Sparkles,
      descripcion: 'Framework de utilidades CSS',
      ventajas: [
        'Desarrollo rápido',
        'Sin CSS personalizado',
        'Consistencia de diseño',
        'Tree-shaking automático'
      ],
      desventajas: [
        'Clases largas en HTML',
        'Curva de aprendizaje',
        'Dependencia del framework'
      ],
      cuando: 'Proyectos nuevos que necesitan desarrollo rápido y consistente',
      ejemplo: `// Componente con Tailwind
function Card() {
  return (
    <div className="max-w-sm rounded-lg shadow-lg overflow-hidden">
      <img 
        src="/imagen.jpg" 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Título de la Card
        </h2>
        <p className="text-gray-600 mb-4">
          Descripción de la card con Tailwind CSS
        </p>
        <button className="px-4 py-2 bg-blue-500 text-white 
                         rounded hover:bg-blue-600 transition-colors">
          Acción
        </button>
      </div>
    </div>
  );
}`,
      configuracion: `// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#ff6b6b',
      }
    },
  },
  plugins: [],
}`
    },
    {
      id: 'modules',
      nombre: 'CSS Modules',
      icono: FileCode,
      descripcion: 'CSS con scope local automático',
      ventajas: [
        'CSS tradicional',
        'Sin conflictos de nombres',
        'Fácil de mantener',
        'TypeScript support'
      ],
      desventajas: [
        'Archivos separados',
        'No hay utilidades predefinidas',
        'Más código para escribir'
      ],
      cuando: 'Proyectos que requieren CSS personalizado y control total',
      ejemplo: `// Card.module.css
.card {
  max-width: 384px;
  border-radius: 8px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.image {
  width: 100%;
  height: 192px;
  object-fit: cover;
}

.content {
  padding: 24px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #1f2937;
}

.button {
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #2563eb;
}

// Card.tsx
import styles from './Card.module.css';

function Card() {
  return (
    <div className={styles.card}>
      <img src="/imagen.jpg" className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.title}>Título de la Card</h2>
        <p>Descripción de la card</p>
        <button className={styles.button}>Acción</button>
      </div>
    </div>
  );
}`
    },
    {
      id: 'css-in-js',
      nombre: 'CSS-in-JS',
      icono: Package,
      descripcion: 'Estilos dentro de JavaScript',
      ventajas: [
        'Estilos dinámicos',
        'Props en CSS',
        'Todo en un archivo',
        'Theming fácil'
      ],
      desventajas: [
        'Runtime overhead',
        'Curva de aprendizaje',
        'Dependencias extra'
      ],
      cuando: 'Aplicaciones con temas dinámicos o componentes muy interactivos',
      ejemplo: `// Con styled-components
import styled from 'styled-components';

const Card = styled.div\`
  max-width: 384px;
  border-radius: 8px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
\`;

const Button = styled.button\`
  padding: 8px 16px;
  background-color: \${props => props.primary ? '#3b82f6' : '#gray'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: \${props => props.primary ? '#2563eb' : '#666'};
  }
\`;

// Con style jsx (integrado en Next.js)
function Card() {
  return (
    <div className="card">
      <h2>Título</h2>
      <button>Acción</button>
      
      <style jsx>{\`
        .card {
          max-width: 384px;
          border-radius: 8px;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }
        
        button {
          background: #3b82f6;
          color: white;
          padding: 8px 16px;
        }
      \`}</style>
    </div>
  );
}`
    },
    {
      id: 'global',
      nombre: 'CSS Global',
      icono: Globe,
      descripcion: 'Estilos tradicionales globales',
      ventajas: [
        'Familiar para todos',
        'Sin configuración',
        'Control total',
        'Fácil migración'
      ],
      desventajas: [
        'Conflictos de nombres',
        'Difícil de mantener',
        'Sin tree-shaking',
        'Problemas de especificidad'
      ],
      cuando: 'Estilos base, reset CSS, o migración de proyectos existentes',
      ejemplo: `// styles/globals.css
/* Reset básico */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Variables CSS */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --text-color: #1f2937;
  --background: #f3f4f6;
}

/* Estilos globales */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  color: var(--text-color);
  background-color: var(--background);
}

/* Componentes reutilizables */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: #2563eb;
}

// app/layout.tsx
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}`
    }
  ];

  const metodoSeleccionado = metodos.find(m => m.id === metodoActivo);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/tutoriales" className="hover:text-gray-900">
              Tutoriales
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">CSS en Next.js</span>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Palette className="w-10 h-10 text-pink-600" />
            CSS en Next.js
          </h1>
          <p className="text-xl text-gray-600">
            Aprende las diferentes formas de estilizar tu aplicación Next.js
          </p>
        </div>

        {/* Comparación rápida */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">🎨 Ejemplos Visuales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">Tailwind CSS</p>
              <BotonTailwind />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">CSS Module</p>
              <BotonCSSModule />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">Style Inline</p>
              <BotonStyled />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Mismo componente, diferentes métodos de estilizado
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de métodos */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Métodos de estilizado</h2>
            <div className="space-y-2">
              {metodos.map((metodo) => {
                const Icono = metodo.icono;
                return (
                  <button
                    key={metodo.id}
                    onClick={() => setMetodoActivo(metodo.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      metodoActivo === metodo.id
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icono className={`w-5 h-5 ${
                        metodoActivo === metodo.id ? 'text-pink-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <h3 className="font-medium">{metodo.nombre}</h3>
                        <p className="text-xs text-gray-600 mt-1">
                          {metodo.descripcion}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detalle del método */}
          <div className="lg:col-span-2">
            {metodoSeleccionado && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  {React.createElement(metodoSeleccionado.icono, { className: "w-6 h-6 text-pink-600" })}
                  {metodoSeleccionado.nombre}
                </h2>

                <p className="text-lg mb-6">{metodoSeleccionado.descripcion}</p>

                {/* Ventajas y Desventajas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-green-800">✅ Ventajas</h3>
                    <ul className="space-y-1">
                      {metodoSeleccionado.ventajas.map((ventaja, index) => (
                        <li key={index} className="text-sm text-green-700">
                          • {ventaja}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2 text-red-800">❌ Desventajas</h3>
                    <ul className="space-y-1">
                      {metodoSeleccionado.desventajas.map((desventaja, index) => (
                        <li key={index} className="text-sm text-red-700">
                          • {desventaja}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Cuándo usar */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold mb-1 text-blue-800">🎯 Cuándo usar</h3>
                  <p className="text-sm text-blue-700">{metodoSeleccionado.cuando}</p>
                </div>

                {/* Código de ejemplo */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">📝 Ejemplo de código</h3>
                  <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{metodoSeleccionado.ejemplo}</code>
                  </pre>
                </div>

                {/* Configuración adicional si existe */}
                {metodoSeleccionado.configuracion && (
                  <div>
                    <h3 className="font-semibold mb-3">⚙️ Configuración</h3>
                    <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{metodoSeleccionado.configuracion}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Guía de decisión */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">🤔 ¿Qué método elegir?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
              <Zap className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Para desarrollo rápido y consistente</h3>
                <p className="text-sm text-gray-600">
                  Usa <strong>Tailwind CSS</strong>. Perfecto para prototipos y proyectos que necesitan 
                  velocidad de desarrollo con diseño consistente.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
              <FileCode className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Para proyectos medianos/grandes con CSS personalizado</h3>
                <p className="text-sm text-gray-600">
                  Usa <strong>CSS Modules</strong>. Ideal cuando necesitas escribir CSS tradicional 
                  pero con scope automático para evitar conflictos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
              <Package className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Para componentes dinámicos y temas</h3>
                <p className="text-sm text-gray-600">
                  Usa <strong>CSS-in-JS</strong>. Perfecto cuando necesitas estilos que cambian 
                  según props o estado, o sistemas de temas complejos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <Globe className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Para estilos base y migraciones</h3>
                <p className="text-sm text-gray-600">
                  Usa <strong>CSS Global</strong>. Útil para reset CSS, fuentes, variables CSS 
                  globales o cuando migras un proyecto existente.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Combinación de métodos */}
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            Pro Tip: Combina métodos
          </h2>
          <p className="text-sm mb-3">
            No tienes que elegir solo uno. Una estrategia común es:
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>CSS Global:</strong> Para reset, fuentes y variables CSS
            </li>
            <li>
              <strong>Tailwind CSS:</strong> Para el 90% de los estilos de utilidad
            </li>
            <li>
              <strong>CSS Modules:</strong> Para componentes complejos que necesitan CSS personalizado
            </li>
            <li>
              <strong>Style inline:</strong> Para estilos dinámicos calculados en JavaScript
            </li>
          </ul>
        </div>

        <Link
          href="/tutoriales"
          className="inline-block mt-6 text-blue-600 hover:text-blue-800"
        >
          ← Volver a tutoriales
        </Link>
      </div>
    </div>
  );
}