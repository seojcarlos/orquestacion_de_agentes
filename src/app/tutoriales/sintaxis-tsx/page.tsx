'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Code2, Zap, Database, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function SintaxisTSX() {
  const [mostrarEjemplo, setMostrarEjemplo] = useState('variables');
  const [mostrarResultado, setMostrarResultado] = useState(false);
  
  const ejemplos = [
    {
      id: 'variables',
      titulo: 'Variables y Expresiones',
      descripcion: 'Usa {} para mostrar valores JavaScript',
      codigo: `function Saludo() {
  const nombre = "Ana";
  const edad = 25;
  
  return (
    <div>
      <h1>Hola, {nombre}!</h1>
      <p>Tienes {edad} años</p>
      <p>En 10 años tendrás {edad + 10}</p>
    </div>
  );
}`,
      resultado: (
        <div className="p-4 bg-white rounded">
          <h1 className="text-2xl font-bold">Hola, Ana!</h1>
          <p>Tienes 25 años</p>
          <p>En 10 años tendrás 35</p>
        </div>
      )
    },
    {
      id: 'condicionales',
      titulo: 'Renderizado Condicional',
      descripcion: 'Muestra contenido basado en condiciones',
      codigo: `function Notificacion({ mensaje, tipo }) {
  return (
    <div>
      {/* Operador ternario */}
      {tipo === 'error' ? (
        <div className="bg-red-100 p-4">
          Error: {mensaje}
        </div>
      ) : (
        <div className="bg-green-100 p-4">
          Éxito: {mensaje}
        </div>
      )}
      
      {/* Operador && */}
      {mensaje && (
        <p>Tienes un mensaje</p>
      )}
    </div>
  );
}`,
      resultado: (
        <div className="space-y-4">
          <div className="bg-red-100 p-4 rounded">
            Error: Algo salió mal
          </div>
          <div className="bg-green-100 p-4 rounded">
            Éxito: Todo funcionó
          </div>
          <p>Tienes un mensaje</p>
        </div>
      )
    },
    {
      id: 'listas',
      titulo: 'Listas y Loops',
      descripcion: 'Renderiza arrays con map()',
      codigo: `function ListaTareas() {
  const tareas = [
    { id: 1, texto: 'Aprender React', completada: true },
    { id: 2, texto: 'Crear una app', completada: false },
    { id: 3, texto: 'Desplegar', completada: false }
  ];
  
  return (
    <ul>
      {tareas.map(tarea => (
        <li key={tarea.id}>
          {tarea.completada ? '✅' : '⬜'} {tarea.texto}
        </li>
      ))}
    </ul>
  );
}`,
      resultado: (
        <ul className="space-y-2">
          <li>✅ Aprender React</li>
          <li>⬜ Crear una app</li>
          <li>⬜ Desplegar</li>
        </ul>
      )
    },
    {
      id: 'eventos',
      titulo: 'Manejo de Eventos',
      descripcion: 'Responde a interacciones del usuario',
      codigo: `function Contador() {
  const [cuenta, setCuenta] = useState(0);
  
  const incrementar = () => {
    setCuenta(cuenta + 1);
  };
  
  return (
    <div>
      <p>Contador: {cuenta}</p>
      
      {/* Función externa */}
      <button onClick={incrementar}>
        Incrementar
      </button>
      
      {/* Función inline */}
      <button onClick={() => setCuenta(cuenta - 1)}>
        Decrementar
      </button>
      
      {/* Evento con parámetro */}
      <input 
        onChange={(e) => console.log(e.target.value)}
        placeholder="Escribe algo..."
      />
    </div>
  );
}`,
      resultado: (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <p>Contador: 5</p>
            <button className="px-3 py-1 bg-blue-500 text-white rounded">
              Incrementar
            </button>
            <button className="px-3 py-1 bg-red-500 text-white rounded">
              Decrementar
            </button>
          </div>
          <input 
            className="px-3 py-1 border rounded"
            placeholder="Escribe algo..."
          />
        </div>
      )
    },
    {
      id: 'estilos',
      titulo: 'Estilos y Clases',
      descripcion: 'Aplica estilos CSS a tus componentes',
      codigo: `function Tarjeta({ titulo, destacada }) {
  return (
    <div 
      className={\`tarjeta \${destacada ? 'destacada' : ''}\`}
      style={{ 
        padding: '20px',
        backgroundColor: destacada ? '#fef3c7' : '#f3f4f6'
      }}
    >
      <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>
        {titulo}
      </h3>
      
      {/* Clases condicionales con Tailwind */}
      <button className={\`
        px-4 py-2 rounded
        \${destacada 
          ? 'bg-yellow-500 text-white' 
          : 'bg-gray-300 text-gray-700'}
      \`}>
        Acción
      </button>
    </div>
  );
}`,
      resultado: (
        <div className="space-y-4">
          <div style={{ padding: '20px', backgroundColor: '#fef3c7' }} className="rounded">
            <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>
              Tarjeta Destacada
            </h3>
            <button className="px-4 py-2 rounded bg-yellow-500 text-white mt-2">
              Acción
            </button>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#f3f4f6' }} className="rounded">
            <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>
              Tarjeta Normal
            </h3>
            <button className="px-4 py-2 rounded bg-gray-300 text-gray-700 mt-2">
              Acción
            </button>
          </div>
        </div>
      )
    }
  ];
  
  const ejemploActual = ejemplos.find(e => e.id === mostrarEjemplo);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header simple */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/tutoriales" className="hover:text-gray-900">
              Tutoriales
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Sintaxis TSX</span>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Code2 className="w-10 h-10 text-green-600" />
            Sintaxis TSX/JSX
          </h1>
          <p className="text-xl text-gray-600">
            Aprende la sintaxis básica para escribir componentes en React
          </p>
        </div>

        {/* Conceptos básicos */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" />
            Conceptos Clave
          </h2>
          <ul className="space-y-2 text-sm">
            <li>• TSX/JSX permite escribir HTML dentro de JavaScript</li>
            <li>• Usa <code className="bg-white px-1 rounded">{'{}'}</code> para insertar expresiones JavaScript</li>
            <li>• Los componentes deben retornar un solo elemento raíz</li>
            <li>• Algunos atributos cambian: <code className="bg-white px-1 rounded">class</code> → <code className="bg-white px-1 rounded">className</code></li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de ejemplos */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Ejemplos</h2>
            <div className="space-y-2">
              {ejemplos.map((ejemplo) => (
                <button
                  key={ejemplo.id}
                  onClick={() => {
                    setMostrarEjemplo(ejemplo.id);
                    setMostrarResultado(false);
                  }}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    mostrarEjemplo === ejemplo.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-medium">{ejemplo.titulo}</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {ejemplo.descripcion}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Código y resultado */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Tabs */}
              <div className="border-b flex">
                <button
                  onClick={() => setMostrarResultado(false)}
                  className={`flex-1 px-4 py-3 font-medium transition-colors ${
                    !mostrarResultado 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Code2 className="w-4 h-4 inline mr-2" />
                  Código
                </button>
                <button
                  onClick={() => setMostrarResultado(true)}
                  className={`flex-1 px-4 py-3 font-medium transition-colors ${
                    mostrarResultado 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {mostrarResultado ? (
                    <Eye className="w-4 h-4 inline mr-2" />
                  ) : (
                    <EyeOff className="w-4 h-4 inline mr-2" />
                  )}
                  Resultado
                </button>
              </div>

              {/* Contenido */}
              <div className="p-6">
                {ejemploActual && (
                  <>
                    {!mostrarResultado ? (
                      <div>
                        <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                          <code>{ejemploActual.codigo}</code>
                        </pre>
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-4">
                          Así se vería en el navegador:
                        </p>
                        {ejemploActual.resultado}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Errores comunes */}
        <div className="mt-12 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            Errores Comunes
          </h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-red-600">❌ Mal:</p>
              <code className="block bg-white p-2 rounded mt-1">
                return &lt;h1&gt;Hola&lt;/h1&gt; &lt;p&gt;Mundo&lt;/p&gt;;
              </code>
            </div>
            <div>
              <p className="font-semibold text-green-600">✅ Bien:</p>
              <code className="block bg-white p-2 rounded mt-1">
                return &lt;div&gt;&lt;h1&gt;Hola&lt;/h1&gt; &lt;p&gt;Mundo&lt;/p&gt;&lt;/div&gt;;
              </code>
            </div>
            <p className="text-gray-700 italic">
              Los componentes deben retornar un único elemento raíz o usar Fragments (&lt;&gt;...&lt;/&gt;)
            </p>
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