'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertCircle, Bug, CheckCircle, XCircle, Code, Terminal, ChevronRight, ChevronDown, Search } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export default function ErroresComunes() {
  const [errorSeleccionado, setErrorSeleccionado] = useState<string | null>('syntax-error');
  const [filtro, setFiltro] = useState('');

  const errores = [
    {
      id: 'syntax-error',
      titulo: 'Syntax Error - Unexpected token',
      categoria: 'sintaxis',
      frecuencia: 'Muy común',
      ejemplo: {
        error: `× Unexpected token 'div'. Expected jsx identifier
  ╭─[page.tsx:137:1]
  137 │     <div className="min-h-screen">
      ·      ───
  138 │       {/* Header */}`,
        causa: 'Falta cerrar algo antes (paréntesis, llave, corchete)',
        codigo_malo: `export default function Page() {
  const data = [1, 2, 3  // <- Falta cerrar el array
  
  return (
    <div>Hola</div>  // <- Error aquí pero el problema está arriba
  );
}`,
        codigo_bueno: `export default function Page() {
  const data = [1, 2, 3]; // <- Array cerrado correctamente
  
  return (
    <div>Hola</div>
  );
}`
      },
      solucion: [
        'Revisa líneas ANTERIORES al error',
        'Busca paréntesis, llaves o corchetes sin cerrar',
        'Verifica que todos los ; estén donde deben',
        'Usa la extensión de VS Code para ver pares de paréntesis'
      ]
    },
    {
      id: 'module-not-found',
      titulo: 'Module not found',
      categoria: 'importacion',
      frecuencia: 'Muy común',
      ejemplo: {
        error: `Module not found: Can't resolve '@/components/Button'
  
  > 1 | import Button from '@/components/Button'
      | ^`,
        causa: 'El archivo no existe o la ruta está mal',
        codigo_malo: `// Intentas importar esto:
import Button from '@/components/Button'

// Pero el archivo está en:
// src/components/ui/Button.tsx`,
        codigo_bueno: `// Ruta correcta:
import Button from '@/components/ui/Button'

// O si no usas alias:
import Button from '../components/ui/Button'`
      },
      solucion: [
        'Verifica que el archivo existe',
        'Revisa mayúsculas/minúsculas (Button vs button)',
        'Confirma la ruta correcta',
        'Si usas @/, verifica tsconfig.json'
      ]
    },
    {
      id: 'type-error',
      titulo: 'Type Error (TypeScript)',
      categoria: 'tipos',
      frecuencia: 'Común',
      ejemplo: {
        error: `Type 'string' is not assignable to type 'number'
  
  > 5 |   const edad: number = "25";
      |                        ^^^^`,
        causa: 'Estás asignando un tipo de dato incorrecto',
        codigo_malo: `interface Usuario {
  nombre: string;
  edad: number;
}

const usuario: Usuario = {
  nombre: "Juan",
  edad: "25"  // <- Error: "25" es string, no number
};`,
        codigo_bueno: `interface Usuario {
  nombre: string;
  edad: number;
}

const usuario: Usuario = {
  nombre: "Juan",
  edad: 25  // <- Correcto: 25 es number
};`
      },
      solucion: [
        'Lee el error: te dice qué tipo esperaba y qué recibió',
        'Convierte el dato al tipo correcto',
        'Si es intencional, cambia el tipo en la interface',
        'Usa "any" solo como último recurso'
      ]
    },
    {
      id: 'hook-rules',
      titulo: 'React Hook Rules',
      categoria: 'react',
      frecuencia: 'Común',
      ejemplo: {
        error: `React Hook "useState" is called conditionally. 
React Hooks must be called in the exact same order in every component render.`,
        causa: 'Los hooks deben llamarse siempre en el mismo orden',
        codigo_malo: `function Component({ isLoggedIn }) {
  if (isLoggedIn) {
    const [user, setUser] = useState(null); // ❌ Hook dentro de if
  }
  
  const [data, setData] = useState([]); // Este a veces sería el 1º, a veces el 2º
  
  return <div>...</div>;
}`,
        codigo_bueno: `function Component({ isLoggedIn }) {
  const [user, setUser] = useState(null); // ✅ Siempre se ejecuta
  const [data, setData] = useState([]);    // ✅ Siempre en el mismo orden
  
  // La lógica condicional va después
  if (!isLoggedIn) {
    return <div>Please login</div>;
  }
  
  return <div>...</div>;
}`
      },
      solucion: [
        'Nunca uses hooks dentro de if, for, o funciones anidadas',
        'Ponlos siempre al principio del componente',
        'Si necesitas condicional, úsala después del hook',
        'Instala eslint-plugin-react-hooks'
      ]
    },
    {
      id: 'missing-key',
      titulo: 'Missing "key" prop',
      categoria: 'react',
      frecuencia: 'Muy común',
      ejemplo: {
        error: `Warning: Each child in a list should have a unique "key" prop.`,
        causa: 'React necesita identificar cada elemento en una lista',
        codigo_malo: `function Lista() {
  const items = ['Manzana', 'Pera', 'Uva'];
  
  return (
    <ul>
      {items.map(item => (
        <li>{item}</li>  // ❌ Falta key
      ))}
    </ul>
  );
}`,
        codigo_bueno: `function Lista() {
  const items = ['Manzana', 'Pera', 'Uva'];
  
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>  // ✅ Con key
      ))}
    </ul>
  );
}

// Mejor aún con IDs únicos:
const items = [
  { id: 1, nombre: 'Manzana' },
  { id: 2, nombre: 'Pera' }
];

{items.map(item => (
  <li key={item.id}>{item.nombre}</li>  // ✅ Mejor con ID único
))}`
      },
      solucion: [
        'Agrega key={} a cada elemento del map',
        'Usa un ID único si lo tienes',
        'El index es OK para listas estáticas',
        'Nunca uses Math.random() como key'
      ]
    },
    {
      id: 'async-component',
      titulo: 'Async Component Error',
      categoria: 'react',
      frecuencia: 'Común',
      ejemplo: {
        error: `Error: Objects are not valid as a React child (found: [object Promise])`,
        causa: 'Intentas renderizar una Promise directamente',
        codigo_malo: `// ❌ Componente async sin manejar
async function Component() {
  const data = await fetch('/api/data');
  return <div>{data}</div>;
}

// O esto:
function Component() {
  const data = fetch('/api/data'); // ❌ data es una Promise
  return <div>{data}</div>;
}`,
        codigo_bueno: `// ✅ Usar useEffect y useState
function Component() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Cargando...</div>;
  return <div>{data}</div>;
}`
      },
      solucion: [
        'Usa useEffect para llamadas async',
        'Guarda el resultado en useState',
        'Muestra un loading mientras cargas',
        'En Next.js 13+, usa async solo en Server Components'
      ]
    },
    {
      id: 'hydration-mismatch',
      titulo: 'Hydration Mismatch',
      categoria: 'nextjs',
      frecuencia: 'Común',
      ejemplo: {
        error: `Error: Hydration failed because the initial UI does not match what was rendered on the server.`,
        causa: 'El HTML del servidor no coincide con el del cliente',
        codigo_malo: `function Component() {
  return (
    <div>
      {/* ❌ Math.random() da valores diferentes */}
      Número aleatorio: {Math.random()}
      
      {/* ❌ Date() cambia entre servidor y cliente */}
      Hora actual: {new Date().toLocaleTimeString()}
    </div>
  );
}`,
        codigo_bueno: `function Component() {
  const [randomNum, setRandomNum] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    // ✅ Ejecutar solo en el cliente
    setRandomNum(Math.random());
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);
  
  return (
    <div>
      Número aleatorio: {randomNum || 'Cargando...'}
      Hora actual: {currentTime || 'Cargando...'}
    </div>
  );
}`
      },
      solucion: [
        'Usa useEffect para código que debe ejecutarse solo en cliente',
        'Evita Math.random() y Date() en el render inicial',
        'Usa el mismo contenido en servidor y cliente',
        'Considera usar dynamic import con ssr: false'
      ]
    },
    {
      id: 'cannot-read-undefined',
      titulo: 'Cannot read property of undefined',
      categoria: 'javascript',
      frecuencia: 'Muy común',
      ejemplo: {
        error: `TypeError: Cannot read property 'name' of undefined`,
        causa: 'Intentas acceder a una propiedad de algo que no existe',
        codigo_malo: `function Profile({ user }) {
  return (
    <div>
      {/* ❌ Si user es undefined, esto explota */}
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}`,
        codigo_bueno: `function Profile({ user }) {
  // ✅ Opción 1: Verificar si existe
  if (!user) {
    return <div>No hay usuario</div>;
  }
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// ✅ Opción 2: Optional chaining
function Profile({ user }) {
  return (
    <div>
      <h1>{user?.name || 'Sin nombre'}</h1>
      <p>{user?.email || 'Sin email'}</p>
    </div>
  );
}`
      },
      solucion: [
        'Usa optional chaining: objeto?.propiedad',
        'Verifica si existe antes de usar',
        'Proporciona valores por defecto',
        'Usa TypeScript para prevenir estos errores'
      ]
    }
  ];

  const erroresFiltrados = errores.filter(error => 
    error.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
    error.categoria.toLowerCase().includes(filtro.toLowerCase())
  );

  const getCategoriaColor = (categoria: string) => {
    switch(categoria) {
      case 'sintaxis': return 'bg-red-100 text-red-800';
      case 'importacion': return 'bg-blue-100 text-blue-800';
      case 'tipos': return 'bg-purple-100 text-purple-800';
      case 'react': return 'bg-green-100 text-green-800';
      case 'nextjs': return 'bg-gray-100 text-gray-800';
      case 'javascript': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
            <Bug className="w-10 h-10 text-red-600" />
            Errores Comunes de Compilación
          </h1>
          <p className="text-xl text-gray-600">
            Aprende a identificar y resolver los errores más frecuentes en React y Next.js
          </p>
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar error..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de errores */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Tipos de errores</h2>
            <div className="space-y-2">
              {erroresFiltrados.map((error) => (
                <button
                  key={error.id}
                  onClick={() => setErrorSeleccionado(error.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    errorSeleccionado === error.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{error.titulo}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoriaColor(error.categoria)}`}>
                          {error.categoria}
                        </span>
                        <span className="text-xs text-gray-500">{error.frecuencia}</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${
                      errorSeleccionado === error.id ? 'rotate-90' : ''
                    }`} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detalle del error */}
          <div className="lg:col-span-2">
            {errorSeleccionado && (() => {
              const error = errores.find(e => e.id === errorSeleccionado);
              if (!error) return null;
              
              return (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                    {error.titulo}
                  </h2>

                  {/* Mensaje de error */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Mensaje de error:</h3>
                    <pre className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800 overflow-x-auto">
                      {error.ejemplo.error}
                    </pre>
                  </div>

                  {/* Causa */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">¿Por qué ocurre?</h3>
                    <p className="text-gray-700">{error.ejemplo.causa}</p>
                  </div>

                  {/* Código malo vs bueno */}
                  <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-500" />
                        Código con error
                      </h4>
                      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm overflow-x-auto">
                        <code>{error.ejemplo.codigo_malo}</code>
                      </pre>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Código corregido
                      </h4>
                      <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm overflow-x-auto">
                        <code>{error.ejemplo.codigo_bueno}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Soluciones */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">🔧 Cómo solucionarlo:</h3>
                    <ul className="space-y-1">
                      {error.solucion.map((paso, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">{index + 1}.</span>
                          <span className="text-sm">{paso}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Tips generales */}
        <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">💡 Tips Generales para Debuggear</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Antes de buscar en Google:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Lee el error completo, no solo la primera línea</li>
                <li>• El número de línea a veces es aproximado</li>
                <li>• Revisa el código ANTES del error</li>
                <li>• Busca typos (errores de escritura)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Herramientas útiles:</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• <strong>ESLint:</strong> Detecta errores antes de compilar</li>
                <li>• <strong>Prettier:</strong> Formatea y encuentra errores de sintaxis</li>
                <li>• <strong>TypeScript:</strong> Previene errores de tipos</li>
                <li>• <strong>React DevTools:</strong> Debuggea componentes</li>
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
