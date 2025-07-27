'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Database, Package, Upload, Download, AlertCircle, Users, Heart, ShoppingCart } from 'lucide-react';
// import Breadcrumb from '@/components/Breadcrumb';

// Componentes de ejemplo para las demos
function TarjetaUsuario({ nombre, edad, ciudad }: { nombre: string, edad: number, ciudad: string }) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="font-bold">{nombre}</h3>
      <p className="text-sm text-gray-600">Edad: {edad}</p>
      <p className="text-sm text-gray-600">Ciudad: {ciudad}</p>
    </div>
  );
}

function Contador({ inicial = 0 }: { inicial?: number }) {
  const [cuenta, setCuenta] = useState(inicial);
  
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setCuenta(cuenta - 1)}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        -
      </button>
      <span className="text-xl font-bold">{cuenta}</span>
      <button
        onClick={() => setCuenta(cuenta + 1)}
        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
      >
        +
      </button>
    </div>
  );
}

function BotonLike({ onLike }: { onLike: (liked: boolean) => void }) {
  const [liked, setLiked] = useState(false);
  
  const handleClick = () => {
    setLiked(!liked);
    if (onLike) onLike(!liked);
  };
  
  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        liked 
          ? 'bg-red-500 text-white' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
      {liked ? 'Te gusta' : 'Me gusta'}
    </button>
  );
}

export default function EstadoProps() {
  const [mostrarEjemplo, setMostrarEjemplo] = useState('props');
  const [contadorPadre, setContadorPadre] = useState(0);
  const [likes, setLikes] = useState(0);

  const conceptos = [
    {
      id: 'props',
      titulo: 'Props',
      icono: Download,
      descripcion: 'Datos que se pasan de padre a hijo',
      analogia: '📦 Como un paquete que envías a alguien',
      caracteristicas: [
        'Son de solo lectura (inmutables)',
        'Fluyen de arriba hacia abajo',
        'Pueden ser cualquier tipo de dato',
        'Se pasan como atributos HTML'
      ],
      ejemplo: `// Componente Padre
function App() {
  return (
    <TarjetaUsuario 
      nombre="Ana García"
      edad={25}
      ciudad="Madrid"
    />
  );
}

// Componente Hijo
function TarjetaUsuario({ nombre, edad, ciudad }: { nombre: string, edad: number, ciudad: string }) {
  return (
    <div>
      <h3>{nombre}</h3>
      <p>Edad: {edad}</p>
      <p>Ciudad: {ciudad}</p>
    </div>
  );
}`
    },
    {
      id: 'estado',
      titulo: 'Estado (State)',
      icono: Database,
      descripcion: 'Datos internos que pueden cambiar',
      analogia: '🧠 Como la memoria de tu componente',
      caracteristicas: [
        'Es privado del componente',
        'Puede cambiar con el tiempo',
        'Provoca re-renderizado al cambiar',
        'Se declara con useState'
      ],
      ejemplo: `// Componente con estado
function Contador() {
  // Declarar estado
  const [cuenta, setCuenta] = useState(0);
  
  return (
    <div>
      <p>Has hecho clic {cuenta} veces</p>
      <button onClick={() => setCuenta(cuenta + 1)}>
        Incrementar
      </button>
    </div>
  );
}`
    },
    {
      id: 'flujo',
      titulo: 'Flujo de Datos',
      icono: Upload,
      descripcion: 'Cómo se comunican los componentes',
      analogia: '🏢 Como una empresa donde la info baja por jerarquía',
      caracteristicas: [
        'Props bajan datos',
        'Callbacks suben eventos',
        'Estado compartido en el padre',
        'Unidireccional (one-way data flow)'
      ],
      ejemplo: `// Padre maneja el estado
function Padre() {
  const [mensaje, setMensaje] = useState('');
  
  return (
    <Hijo 
      mensaje={mensaje}
      onCambio={(nuevoMensaje) => setMensaje(nuevoMensaje)}
    />
  );
}

// Hijo recibe props y callback
function Hijo({ mensaje, onCambio }) {
  return (
    <input 
      value={mensaje}
      onChange={(e) => onCambio(e.target.value)}
    />
  );
}`
    }
  ];

  const conceptoActual = conceptos.find(c => c.id === mostrarEjemplo);

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
            <span className="text-gray-900 font-medium">Estado y Props</span>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Database className="w-10 h-10 text-blue-600" />
            Estado y Props en React
          </h1>
          <p className="text-xl text-gray-600">
            Entiende cómo fluyen los datos en una aplicación React
          </p>
        </div>

        {/* Diagrama visual */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">🔄 Flujo de Datos Unidireccional</h2>
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <Package className="w-16 h-16 text-blue-600" />
              </div>
              <h3 className="font-semibold">Componente Padre</h3>
              <p className="text-sm text-gray-600">Tiene el estado</p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <ArrowRight className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium text-green-600">Props (datos)</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-6 h-6 text-purple-600 rotate-180" />
                <span className="text-sm font-medium text-purple-600">Callbacks (eventos)</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                <Package className="w-16 h-16 text-green-600" />
              </div>
              <h3 className="font-semibold">Componente Hijo</h3>
              <p className="text-sm text-gray-600">Recibe props</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Selector de conceptos */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Conceptos</h2>
            <div className="space-y-2">
              {conceptos.map((concepto) => {
                const Icono = concepto.icono;
                return (
                  <button
                    key={concepto.id}
                    onClick={() => setMostrarEjemplo(concepto.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      mostrarEjemplo === concepto.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icono className={`w-5 h-5 ${
                        mostrarEjemplo === concepto.id ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <h3 className="font-medium">{concepto.titulo}</h3>
                        <p className="text-xs text-gray-600 mt-1">
                          {concepto.descripcion}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detalle del concepto */}
          <div className="lg:col-span-2">
            {conceptoActual && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  {React.createElement(conceptoActual.icono, { className: "w-6 h-6 text-blue-600" })}
                  {conceptoActual.titulo}
                </h2>

                <p className="text-lg mb-4">{conceptoActual.descripcion}</p>
                
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <p className="text-sm">
                    <strong>Analogía:</strong> {conceptoActual.analogia}
                  </p>
                </div>

                {/* Características */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">📋 Características</h3>
                  <ul className="space-y-1">
                    {conceptoActual.caracteristicas.map((caracteristica, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-600">•</span>
                        {caracteristica}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Código de ejemplo */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">📝 Código de ejemplo</h3>
                  <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                    <code>{conceptoActual.ejemplo}</code>
                  </pre>
                </div>

                {/* Demo interactiva según el concepto */}
                {mostrarEjemplo === 'props' && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">🎮 Demo: Props</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <TarjetaUsuario nombre="Ana García" edad={25} ciudad="Madrid" />
                      <TarjetaUsuario nombre="Carlos López" edad={32} ciudad="Barcelona" />
                      <TarjetaUsuario nombre="María Silva" edad={28} ciudad="Valencia" />
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      Cada tarjeta recibe diferentes props pero usa el mismo componente
                    </p>
                  </div>
                )}

                {mostrarEjemplo === 'estado' && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">🎮 Demo: Estado</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm mb-2">Cada contador mantiene su propio estado:</p>
                        <div className="flex gap-8">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Contador 1</p>
                            <Contador inicial={0} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Contador 2</p>
                            <Contador inicial={10} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Contador 3</p>
                            <Contador inicial={100} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {mostrarEjemplo === 'flujo' && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">🎮 Demo: Comunicación Padre-Hijo</h3>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded border">
                        <p className="text-sm font-medium mb-2">Componente Padre</p>
                        <p className="text-lg">Total de likes: {likes}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded border">
                          <p className="text-xs text-gray-600 mb-2">Hijo 1</p>
                          <BotonLike onLike={(liked) => setLikes(likes + (liked ? 1 : -1))} />
                        </div>
                        <div className="bg-white p-4 rounded border">
                          <p className="text-xs text-gray-600 mb-2">Hijo 2</p>
                          <BotonLike onLike={(liked) => setLikes(likes + (liked ? 1 : -1))} />
                        </div>
                        <div className="bg-white p-4 rounded border">
                          <p className="text-xs text-gray-600 mb-2">Hijo 3</p>
                          <BotonLike onLike={(liked) => setLikes(likes + (liked ? 1 : -1))} />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Los hijos notifican al padre cuando cambian, y el padre actualiza el total
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Patrones comunes */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">🎯 Patrones Comunes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Upload className="w-5 h-5 text-green-600" />
                Lifting State Up
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Cuando dos componentes necesitan compartir estado, lo subes al padre común
              </p>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
{`// ❌ Mal: Estado duplicado
function Hermano1() {
  const [dato, setDato] = useState('');
}
function Hermano2() {
  const [dato, setDato] = useState(''); // Duplicado!
}

// ✅ Bien: Estado en el padre
function Padre() {
  const [dato, setDato] = useState('');
  return (
    <>
      <Hermano1 dato={dato} onChange={setDato} />
      <Hermano2 dato={dato} />
    </>
  );
}`}
              </pre>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Props Drilling
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Cuando pasas props a través de muchos niveles (problemático)
              </p>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
{`// ⚠️ Props drilling
function App() {
  const [user, setUser] = useState();
  return <Nivel1 user={user} />;
}
function Nivel1({ user }) {
  return <Nivel2 user={user} />;
}
function Nivel2({ user }) {
  return <Nivel3 user={user} />;
}
// ... y así sucesivamente

// 💡 Solución: Context API o estado global`}
              </pre>
            </div>
          </div>
        </div>

        {/* Tips finales */}
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            Tips Importantes
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Props son inmutables:</strong> Nunca modifiques las props directamente
            </li>
            <li>
              <strong>Estado es asíncrono:</strong> Los cambios no son inmediatos, usa callbacks si necesitas el valor actualizado
            </li>
            <li>
              <strong>Componentes puros:</strong> Con las mismas props, siempre deben renderizar lo mismo
            </li>
            <li>
              <strong>Un solo dueño del estado:</strong> Solo un componente debe ser responsable de modificar cada pieza de estado
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