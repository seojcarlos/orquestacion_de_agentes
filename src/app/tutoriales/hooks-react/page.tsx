'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Wrench, Database, Clock, Zap, Settings, AlertCircle } from 'lucide-react';

export default function HooksReact() {
  const [hookActivo, setHookActivo] = useState('useState');
  const [contador, setContador] = useState(0);
  const [texto, setTexto] = useState('');

  const hooks = [
    {
      id: 'useState',
      nombre: 'useState',
      icono: Database,
      descripcion: 'Guarda información en tu componente',
      analogia: '📦 Como una caja donde guardas cosas',
      ejemplo: `// Sintaxis básica
const [valor, setValor] = useState(valorInicial);

// Ejemplo real
const [contador, setContador] = useState(0);
const [nombre, setNombre] = useState('');
const [activo, setActivo] = useState(false);
const [lista, setLista] = useState([]);`,
      demo: true,
      uso: [
        'Guardar datos del formulario',
        'Controlar si algo está visible o no',
        'Mantener contadores',
        'Guardar respuestas de APIs'
      ]
    },
    {
      id: 'useEffect',
      nombre: 'useEffect',
      icono: Zap,
      descripcion: 'Ejecuta código cuando algo cambia',
      analogia: '⏰ Como una alarma que suena cuando pasa algo',
      ejemplo: `// Se ejecuta después de cada render
useEffect(() => {
  console.log('El componente se renderizó');
});

// Se ejecuta solo una vez (al montar)
useEffect(() => {
  console.log('Hola, acabo de aparecer!');
}, []); // <- Array vacío

// Se ejecuta cuando 'contador' cambia
useEffect(() => {
  console.log('El contador cambió a:', contador);
}, [contador]);

// Con limpieza (cleanup)
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tic tac');
  }, 1000);
  
  // Esta función se ejecuta al desmontar
  return () => clearInterval(timer);
}, []);`,
      uso: [
        'Llamar APIs al cargar',
        'Actualizar el título de la página',
        'Suscribirse a eventos',
        'Timers y animaciones'
      ]
    },
    {
      id: 'useContext',
      nombre: 'useContext',
      icono: Settings,
      descripcion: 'Comparte datos entre componentes',
      analogia: '📡 Como WiFi que todos pueden usar',
      ejemplo: `// 1. Crear el contexto
const TemaContext = createContext();

// 2. Proveer el contexto
function App() {
  return (
    <TemaContext.Provider value="oscuro">
      <Navbar />
      <Main />
    </TemaContext.Provider>
  );
}

// 3. Usar el contexto
function Navbar() {
  const tema = useContext(TemaContext);
  return <nav className={tema}>...</nav>;
}`,
      uso: [
        'Tema claro/oscuro',
        'Idioma de la app',
        'Usuario autenticado',
        'Configuración global'
      ]
    },
    {
      id: 'useReducer',
      nombre: 'useReducer',
      icono: Database,
      descripcion: 'Como useState pero para lógica compleja',
      analogia: '🎮 Como un control remoto con muchos botones',
      ejemplo: `// Definir el reducer
function reducer(state, action) {
  switch (action.type) {
    case 'incrementar':
      return { count: state.count + 1 };
    case 'decrementar':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

// Usar el reducer
function Contador() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <>
      <p>Contador: {state.count}</p>
      <button onClick={() => dispatch({ type: 'incrementar' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'decrementar' })}>
        -
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
    </>
  );
}`,
      uso: [
        'Formularios complejos',
        'Carritos de compra',
        'Estados con múltiples valores relacionados',
        'Lógica de negocio compleja'
      ]
    },
    {
      id: 'useRef',
      nombre: 'useRef',
      icono: Wrench,
      descripcion: 'Referencia a elementos del DOM o valores persistentes',
      analogia: '📌 Como un post-it que no se pierde',
      ejemplo: `// Para elementos del DOM
function InputConFoco() {
  const inputRef = useRef(null);
  
  const enfocarInput = () => {
    inputRef.current.focus();
  };
  
  return (
    <>
      <input ref={inputRef} />
      <button onClick={enfocarInput}>
        Enfocar
      </button>
    </>
  );
}

// Para valores persistentes
function Timer() {
  const [segundos, setSegundos] = useState(0);
  const intervalRef = useRef(null);
  
  const iniciar = () => {
    intervalRef.current = setInterval(() => {
      setSegundos(s => s + 1);
    }, 1000);
  };
  
  const detener = () => {
    clearInterval(intervalRef.current);
  };
  
  return (
    <>
      <p>Segundos: {segundos}</p>
      <button onClick={iniciar}>Iniciar</button>
      <button onClick={detener}>Detener</button>
    </>
  );
}`,
      uso: [
        'Enfocar inputs',
        'Scroll a elementos',
        'Guardar valores entre renders',
        'Integración con librerías externas'
      ]
    },
    {
      id: 'useMemo',
      nombre: 'useMemo',
      icono: Clock,
      descripcion: 'Memoriza cálculos costosos',
      analogia: '💾 Como guardar el resultado de una cuenta difícil',
      ejemplo: `// Sin useMemo - se calcula en cada render
function ListaFiltrada({ items, filtro }) {
  const itemsFiltrados = items.filter(item => 
    item.nombre.includes(filtro)
  ); // Se ejecuta SIEMPRE
  
  return (
    <ul>
      {itemsFiltrados.map(item => (
        <li key={item.id}>{item.nombre}</li>
      ))}
    </ul>
  );
}

// Con useMemo - solo se calcula cuando cambian las dependencias
function ListaFiltrada({ items, filtro }) {
  const itemsFiltrados = useMemo(() => 
    items.filter(item => item.nombre.includes(filtro)),
    [items, filtro] // Solo recalcula si estos cambian
  );
  
  return (
    <ul>
      {itemsFiltrados.map(item => (
        <li key={item.id}>{item.nombre}</li>
      ))}
    </ul>
  );
}`,
      uso: [
        'Filtrar listas grandes',
        'Cálculos matemáticos complejos',
        'Transformar datos pesados',
        'Optimizar rendimiento'
      ]
    }
  ];

  const hookSeleccionado = hooks.find(h => h.id === hookActivo);

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
            <span className="text-gray-900 font-medium">Hooks de React</span>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Wrench className="w-10 h-10 text-purple-600" />
            Hooks de React Explicados
          </h1>
          <p className="text-xl text-gray-600">
            Los Hooks son funciones especiales que te permiten usar características de React
          </p>
        </div>

        {/* Reglas de los Hooks */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            Las 2 Reglas de Oro de los Hooks
          </h2>
          <ol className="space-y-2 text-sm">
            <li>
              <strong>1. Solo en el nivel superior:</strong> No uses Hooks dentro de loops, condiciones o funciones anidadas
            </li>
            <li>
              <strong>2. Solo en componentes de React:</strong> No uses Hooks en funciones JavaScript normales
            </li>
          </ol>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de hooks */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Hooks disponibles</h2>
            <div className="space-y-2">
              {hooks.map((hook) => {
                const Icono = hook.icono;
                return (
                  <button
                    key={hook.id}
                    onClick={() => setHookActivo(hook.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      hookActivo === hook.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icono className={`w-5 h-5 ${
                        hookActivo === hook.id ? 'text-purple-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <h3 className="font-medium">{hook.nombre}</h3>
                        <p className="text-xs text-gray-600 mt-1">
                          {hook.descripcion}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detalle del hook */}
          <div className="lg:col-span-2">
            {hookSeleccionado && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  {React.createElement(hookSeleccionado.icono, { className: "w-6 h-6 text-purple-600" })}
                  {hookSeleccionado.nombre}
                </h2>

                <p className="text-lg mb-4">{hookSeleccionado.descripcion}</p>
                
                <div className="bg-purple-50 rounded-lg p-4 mb-6">
                  <p className="text-sm">
                    <strong>Analogía:</strong> {hookSeleccionado.analogia}
                  </p>
                </div>

                {/* Demo interactiva para useState */}
                {hookSeleccionado.id === 'useState' && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold mb-3">🎮 Demo Interactiva</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm mb-2">Contador: {contador}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setContador(contador + 1)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Incrementar
                          </button>
                          <button
                            onClick={() => setContador(contador - 1)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Decrementar
                          </button>
                          <button
                            onClick={() => setContador(0)}
                            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm mb-2">Texto: "{texto}"</p>
                        <input
                          type="text"
                          value={texto}
                          onChange={(e) => setTexto(e.target.value)}
                          placeholder="Escribe algo..."
                          className="px-3 py-1 border rounded w-full max-w-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-semibold mb-3">📝 Código de ejemplo</h3>
                  <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                    <code>{hookSeleccionado.ejemplo}</code>
                  </pre>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">🎯 Cuándo usarlo</h3>
                  <ul className="space-y-1">
                    {hookSeleccionado.uso.map((caso, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-600">•</span>
                        {caso}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comparación visual */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">🤔 ¿Cuándo usar cada Hook?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Necesitas...</th>
                  <th className="text-left py-2 px-4">Usa este Hook</th>
                  <th className="text-left py-2 px-4">Ejemplo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4">Guardar un valor simple</td>
                  <td className="py-2 px-4 font-mono text-purple-600">useState</td>
                  <td className="py-2 px-4 text-gray-600">Contador, texto, boolean</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Hacer algo cuando algo cambie</td>
                  <td className="py-2 px-4 font-mono text-purple-600">useEffect</td>
                  <td className="py-2 px-4 text-gray-600">Llamar API, actualizar título</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Compartir datos entre componentes</td>
                  <td className="py-2 px-4 font-mono text-purple-600">useContext</td>
                  <td className="py-2 px-4 text-gray-600">Tema, idioma, usuario</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Estado complejo con muchas acciones</td>
                  <td className="py-2 px-4 font-mono text-purple-600">useReducer</td>
                  <td className="py-2 px-4 text-gray-600">Carrito de compras</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Acceder a un elemento del DOM</td>
                  <td className="py-2 px-4 font-mono text-purple-600">useRef</td>
                  <td className="py-2 px-4 text-gray-600">Enfocar input, scroll</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Optimizar cálculos pesados</td>
                  <td className="py-2 px-4 font-mono text-purple-600">useMemo</td>
                  <td className="py-2 px-4 text-gray-600">Filtrar lista grande</td>
                </tr>
              </tbody>
            </table>
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