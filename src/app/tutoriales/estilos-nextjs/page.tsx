'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Palette, Code, Layers, Sparkles, Zap } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export default function EstilosNextJS() {
  const [metodoActivo, setMetodoActivo] = useState('tailwind');
  
  const metodos = [
    {
      id: 'tailwind',
      nombre: 'Tailwind CSS',
      icono: Zap,
      descripcion: 'Clases de utilidad predefinidas',
      ventajas: [
        'Rápido de escribir',
        'Sin archivos CSS separados',
        'Tamaño optimizado automáticamente',
        'Consistente en todo el proyecto'
      ],
      desventajas: [
        'HTML puede verse "sucio"',
        'Curva de aprendizaje inicial',
        'Necesitas recordar las clases'
      ],
      ejemplo: `// Tailwind CSS - Clases directamente en el JSX
export default function Boton() {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg 
                       hover:bg-blue-600 transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       disabled:opacity-50 disabled:cursor-not-allowed">
      Click me!
    </button>
  );
}`,
      demo: (
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Click me!
        </button>
      )
    },
    {
      id: 'css-modules',
      nombre: 'CSS Modules',
      icono: Layers,
      descripcion: 'CSS con scope local automático',
      ventajas: [
        'CSS tradicional con scope',
        'Sin conflictos de nombres',
        'Bueno para CSS complejo',
        'Fácil de migrar CSS existente'
      ],
      desventajas: [
        'Archivos separados',
        'Más verboso',
        'Sin optimización automática'
      ],
      ejemplo: `// Button.module.css
.button {
  padding: 0.5rem 1rem;
  background-color: #10b981;
  color: white;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #059669;
}

// Button.tsx
import styles from './Button.module.css';

export default function Button() {
  return (
    <button className={styles.button}>
      Click me!
    </button>
  );
}`,
      demo: (
        <button style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#10b981',
          color: 'white',
          borderRadius: '0.5rem',
          border: 'none',
          cursor: 'pointer'
        }}>
          Click me!
        </button>
      )
    },
    {
      id: 'styled-jsx',
      nombre: 'Styled JSX',
      icono: Code,
      descripcion: 'CSS dentro del componente',
      ventajas: [
        'Todo en un archivo',
        'Scope automático',
        'Soporta props dinámicas',
        'CSS completo'
      ],
      desventajas: [
        'Solo en Next.js',
        'Puede ser difícil de leer',
        'Sin IntelliSense para CSS'
      ],
      ejemplo: `export default function Button({ primary }) {
  return (
    <>
      <button className="btn">
        Click me!
      </button>
      
      <style jsx>{\`
        .btn {
          padding: 0.5rem 1rem;
          background-color: \${primary ? '#3b82f6' : '#6b7280'};
          color: white;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      \`}</style>
    </>
  );
}`,
      demo: (
        <button style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          borderRadius: '0.5rem',
          border: 'none',
          cursor: 'pointer'
        }}>
          Click me!
        </button>
      )
    },
    {
      id: 'css-in-js',
      nombre: 'CSS-in-JS',
      icono: Sparkles,
      descripcion: 'Styled Components, Emotion, etc.',
      ventajas: [
        'Componentes totalmente encapsulados',
        'Props dinámicas fáciles',
        'Temas complejos',
        'TypeScript friendly'
      ],
      desventajas: [
        'Bundle más grande',
        'Configuración extra',
        'Puede afectar rendimiento'
      ],
      ejemplo: `// Con styled-components
import styled from 'styled-components';

const StyledButton = styled.button\`
  padding: 0.5rem 1rem;
  background-color: \${props => props.primary ? '#8b5cf6' : '#6b7280'};
  color: white;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
\`;

export default function Button({ primary, children }) {
  return (
    <StyledButton primary={primary}>
      {children}
    </StyledButton>
  );
}`,
      demo: (
        <button style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#8b5cf6',
          color: 'white',
          borderRadius: '0.5rem',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
          Click me!
        </button>
      )
    }
  ];

  const metodoSeleccionado = metodos.find(m => m.id === metodoActivo);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <Breadcrumb />
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Palette className="w-10 h-10 text-pink-600" />
            Estilos en Next.js
          </h1>
          <p className="text-xl text-gray-600">
            Todas las formas de añadir estilos CSS a tu aplicación Next.js
          </p>
        </div>

        {/* Comparación rápida */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">🎯 Comparación Rápida</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Método</th>
                  <th className="text-left py-2 px-4">Mejor para</th>
                  <th className="text-left py-2 px-4">Dificultad</th>
                  <th className="text-left py-2 px-4">Rendimiento</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4 font-medium">Tailwind CSS</td>
                  <td className="py-2 px-4">Desarrollo rápido, consistencia</td>
                  <td className="py-2 px-4">
                    <span className="text-yellow-600">Media</span>
                  </td>
                  <td className="py-2 px-4">
                    <span className="text-green-600">Excelente</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-medium">CSS Modules</td>
                  <td className="py-2 px-4">CSS tradicional, proyectos medianos</td>
                  <td className="py-2 px-4">
                    <span className="text-green-600">Fácil</span>
                  </td>
                  <td className="py-2 px-4">
                    <span className="text-green-600">Muy bueno</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-medium">Styled JSX</td>
                  <td className="py-2 px-4">Componentes aislados</td>
                  <td className="py-2 px-4">
                    <span className="text-green-600">Fácil</span>
                  </td>
                  <td className="py-2 px-4">
                    <span className="text-yellow-600">Bueno</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-medium">CSS-in-JS</td>
                  <td className="py-2 px-4">Apps complejas, temas dinámicos</td>
                  <td className="py-2 px-4">
                    <span className="text-red-600">Difícil</span>
                  </td>
                  <td className="py-2 px-4">
                    <span className="text-yellow-600">Regular</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de métodos */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Métodos disponibles</h2>
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

                {/* Demo visual */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold mb-3">Vista previa:</h3>
                  {metodoSeleccionado.demo}
                </div>

                {/* Ventajas y desventajas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">✅ Ventajas</h4>
                    <ul className="space-y-1 text-sm text-green-700">
                      {metodoSeleccionado.ventajas.map((v, i) => (
                        <li key={i}>• {v}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">❌ Desventajas</h4>
                    <ul className="space-y-1 text-sm text-red-700">
                      {metodoSeleccionado.desventajas.map((d, i) => (
                        <li key={i}>• {d}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Código de ejemplo */}
                <div>
                  <h3 className="font-semibold mb-3">Código de ejemplo:</h3>
                  <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{metodoSeleccionado.ejemplo}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Guía de decisión */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">🤔 ¿Cuál debo usar?</h2>
          
          <div className="space-y-4 text-sm">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold mb-2">Si eres principiante:</h3>
              <p>👉 Empieza con <strong>Tailwind CSS</strong>. Es rápido y no necesitas escribir CSS.</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold mb-2">Si vienes de CSS tradicional:</h3>
              <p>👉 Usa <strong>CSS Modules</strong>. Es CSS normal pero con scope automático.</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold mb-2">Si necesitas estilos dinámicos:</h3>
              <p>👉 Considera <strong>Styled JSX</strong> o <strong>CSS-in-JS</strong> para props dinámicas.</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold mb-2">Para producción y rendimiento:</h3>
              <p>👉 <strong>Tailwind CSS</strong> o <strong>CSS Modules</strong> son las mejores opciones.</p>
            </div>
          </div>
        </div>

        {/* Tips adicionales */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">💡 Tips Pro</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Organización:</h3>
              <ul className="space-y-1">
                <li>• Mantén estilos cerca del componente</li>
                <li>• Usa convenciones de nombres consistentes</li>
                <li>• Agrupa estilos relacionados</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Rendimiento:</h3>
              <ul className="space-y-1">
                <li>• Evita estilos inline para props estáticas</li>
                <li>• Usa clsx para clases condicionales</li>
                <li>• Purga CSS no utilizado en producción</li>
              </ul>
            </div>
          </div>
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
