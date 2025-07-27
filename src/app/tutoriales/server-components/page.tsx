'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Server, Laptop, Bot, Sparkles, Code2, Play, 
  Zap, AlertCircle, CheckCircle, Clock, FileCode,
  Activity, Database, Globe, Loader2, ChevronRight,
  Eye, Settings, BarChart3, Users
} from 'lucide-react';

// Simulación del hook useClaudeFlow
const useClaudeFlow = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  
  const generateExample = async (tipo: string) => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    
    const ejemplos = {
      'server': `// ✅ Server Component (por defecto)
async function ProductList() {
  // Fetch directo en el servidor
  const products = await fetch('https://api.store.com/products')
    .then(res => res.json());
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}`,
      'client': `'use client'; // ⚠️ Client Component requerido

import { useState, useEffect } from 'react';

function InteractiveCounter() {
  const [count, setCount] = useState(0);
  
  // Solo funciona en Client Components
  useEffect(() => {
    console.log('Contador actualizado:', count);
  }, [count]);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicks: {count}
    </button>
  );
}`,
      'mixed': `// 🏗️ Server Component que usa Client Components
import InteractiveButton from './InteractiveButton'; // Client Component

async function ProductPage({ id }: { id: string }) {
  // Fetch en el servidor
  const product = await getProduct(id);
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      
      {/* Client Component anidado */}
      <InteractiveButton productId={product.id} />
    </div>
  );
}`
    };
    
    return ejemplos[tipo as keyof typeof ejemplos] || ejemplos.server;
  };
  
  const analyzeCode = async (code: string) => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const analysis = [
      "Este es un Server Component - renderiza en el servidor",
      "Perfecto para data fetching y SEO",
      "No puede usar hooks del lado cliente",
      "Excelente performance inicial"
    ];
    
    setAiSuggestions(analysis);
    setIsGenerating(false);
  };
  
  const getAISuggestions = async () => {
    const tips = [
      "Usa Server Components para data fetching pesado",
      "Client Components solo cuando necesites interactividad",
      "Combina ambos para arquitectura óptima",
      "Considera el bundle size en cada decisión"
    ];
    setAiSuggestions(tips);
  };
  
  return {
    generateExample,
    analyzeCode,
    getAISuggestions,
    isGenerating,
    aiSuggestions
  };
};

export default function ServerComponentsTutorial() {
  const [seccionActiva, setSeccionActiva] = useState('introduccion');
  const [demoActiva, setDemoActiva] = useState('server');
  const [codigoGenerado, setCodigoGenerado] = useState('');
  const [metrics, setMetrics] = useState({
    serverBundle: '2.3 KB',
    clientBundle: '45.2 KB',
    renderTime: '120ms',
    hydrationTime: '340ms'
  });
  
  const { 
    generateExample, 
    analyzeCode, 
    getAISuggestions,
    isGenerating,
    aiSuggestions 
  } = useClaudeFlow();

  const secciones = [
    { id: 'introduccion', titulo: 'Introducción', icono: FileCode },
    { id: 'server-components', titulo: 'Server Components', icono: Server },
    { id: 'client-components', titulo: 'Client Components', icono: Laptop },
    { id: 'comparacion', titulo: 'Comparación', icono: BarChart3 },
    { id: 'data-fetching', titulo: 'Data Fetching', icono: Database },
    { id: 'claude-flow', titulo: 'Claude Flow', icono: Bot },
    { id: 'best-practices', titulo: 'Best Practices', icono: CheckCircle },
    { id: 'ejercicios', titulo: 'Ejercicios', icono: Play }
  ];

  const handleGenerarEjemplo = async (tipo: string) => {
    const codigo = await generateExample(tipo);
    setCodigoGenerado(codigo);
  };

  const ejemplosComparacion = {
    server: {
      titulo: 'Server Component',
      descripcion: 'Renderiza en el servidor, ideal para contenido estático y data fetching',
      pros: ['SEO excelente', 'Bundle pequeño', 'Acceso directo a base de datos', 'Renderizado rápido'],
      contras: ['Sin interactividad', 'No usa hooks cliente', 'No accede a APIs del navegador'],
      codigo: `// ✅ Server Component (por defecto)
async function UserProfile({ userId }) {
  // Fetch directo en servidor
  const user = await db.user.findUnique({
    where: { id: userId }
  });
  
  return (
    <div className="profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <img src={user.avatar} alt="Avatar" />
    </div>
  );
}`
    },
    client: {
      titulo: 'Client Component',
      descripcion: 'Renderiza en el cliente, necesario para interactividad y hooks',
      pros: ['Totalmente interactivo', 'Todos los hooks React', 'APIs del navegador', 'Estado dinámico'],
      contras: ['Bundle más grande', 'Hidratación requerida', 'SEO limitado', 'Fetch del cliente'],
      codigo: `'use client'; // ⚠️ Directiva requerida

import { useState, useEffect } from 'react';

function UserInteractions({ userId }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  // Hooks solo funcionan aquí
  useEffect(() => {
    fetchUserLikes();
  }, []);
  
  const handleLike = () => {
    setLikes(likes + (isLiked ? -1 : 1));
    setIsLiked(!isLiked);
  };
  
  return (
    <button onClick={handleLike}>
      {isLiked ? '❤️' : '🤍'} {likes} likes
    </button>
  );
}`
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Link 
                  href="/tutoriales"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Tutoriales</span>
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Server Components</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mt-2 flex items-center gap-3">
                <Server className="w-8 h-8 text-blue-600" />
                React Server Components
                <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full">IA</span>
              </h1>
              <p className="text-gray-600 mt-2">
                Domina los Server Components de React y Next.js 13+ con demos interactivas
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock className="w-4 h-4" />
              <span>35 min</span>
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                Avanzado
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Barra de herramientas Claude Flow */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => handleGenerarEjemplo(demoActiva)}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generando...' : 'Generar Ejemplo con IA'}
          </button>
          
          <button
            onClick={() => analyzeCode(codigoGenerado)}
            disabled={!codigoGenerado || isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Code2 className="w-4 h-4" />
            Analizar Código
          </button>
          
          <button
            onClick={getAISuggestions}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Bot className="w-4 h-4" />
            Obtener Sugerencias
          </button>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Navegación lateral */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Contenido del Tutorial</h2>
              <nav className="space-y-2">
                {secciones.map((seccion) => {
                  const Icon = seccion.icono;
                  return (
                    <button
                      key={seccion.id}
                      onClick={() => setSeccionActiva(seccion.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                        seccionActiva === seccion.id
                          ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{seccion.titulo}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Métricas en tiempo real */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Métricas de Performance
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Server Bundle:</span>
                    <span className="text-green-600 font-medium">{metrics.serverBundle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Client Bundle:</span>
                    <span className="text-orange-600 font-medium">{metrics.clientBundle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Render Time:</span>
                    <span className="text-blue-600 font-medium">{metrics.renderTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hydration:</span>
                    <span className="text-purple-600 font-medium">{metrics.hydrationTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sección: Introducción */}
            {seccionActiva === 'introduccion' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-3xl font-bold mb-6">¿Qué son los React Server Components?</h2>
                  
                  <div className="prose max-w-none">
                    <p className="text-lg text-gray-700 mb-6">
                      Los <strong>React Server Components (RSC)</strong> son una nueva funcionalidad que permite 
                      renderizar componentes directamente en el servidor, enviando solo el HTML final al cliente.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                        <div className="flex items-center gap-3 mb-4">
                          <Server className="w-8 h-8 text-blue-600" />
                          <h3 className="text-xl font-semibold text-blue-900">Server Components</h3>
                        </div>
                        <ul className="space-y-2 text-blue-800">
                          <li>• Renderizados en el servidor</li>
                          <li>• No se envían al cliente</li>
                          <li>• Acceso directo a base de datos</li>
                          <li>• SEO optimizado</li>
                          <li>• Bundle más pequeño</li>
                        </ul>
                      </div>
                      
                      <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                        <div className="flex items-center gap-3 mb-4">
                          <Laptop className="w-8 h-8 text-orange-600" />
                          <h3 className="text-xl font-semibold text-orange-900">Client Components</h3>
                        </div>
                        <ul className="space-y-2 text-orange-800">
                          <li>• Renderizados en el cliente</li>
                          <li>• Interactividad completa</li>
                          <li>• Hooks de React disponibles</li>
                          <li>• APIs del navegador</li>
                          <li>• Estado dinámico</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Zap className="w-6 h-6 text-purple-600" />
                        Revolución en Next.js 13+
                      </h3>
                      <p className="text-gray-700">
                        Con Next.js 13, todos los componentes son <strong>Server Components por defecto</strong>. 
                        Solo necesitas agregar <code>'use client'</code> cuando requieras interactividad del lado cliente.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sección: Server Components */}
            {seccionActiva === 'server-components' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Server className="w-8 h-8 text-blue-600" />
                    Server Components
                  </h2>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Características Principales</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                          <div>
                            <h4 className="font-medium">Renderizado en Servidor</h4>
                            <p className="text-sm text-gray-600">Se ejecutan durante el build o en cada request</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                          <div>
                            <h4 className="font-medium">Acceso Directo a Datos</h4>
                            <p className="text-sm text-gray-600">Consultas a base de datos sin APIs intermedias</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                          <div>
                            <h4 className="font-medium">Bundle Optimizado</h4>
                            <p className="text-sm text-gray-600">No añaden peso al JavaScript del cliente</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                          <div>
                            <h4 className="font-medium">SEO Perfecto</h4>
                            <p className="text-sm text-gray-600">HTML completo disponible inmediatamente</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                          <div>
                            <h4 className="font-medium">Streaming</h4>
                            <p className="text-sm text-gray-600">Renderizado progresivo con Suspense</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                          <div>
                            <h4 className="font-medium">Seguridad</h4>
                            <p className="text-sm text-gray-600">Lógica sensible nunca llega al cliente</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ejemplo de código */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">🎮 Ejemplo Interactivo</h3>
                    <div className="relative">
                      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{ejemplosComparacion.server.codigo}</code>
                      </pre>
                      <button
                        onClick={() => analyzeCode(ejemplosComparacion.server.codigo)}
                        className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                        title="Analizar código con IA"
                      >
                        <Code2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sección: Client Components */}
            {seccionActiva === 'client-components' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Laptop className="w-8 h-8 text-orange-600" />
                    Client Components
                  </h2>
                  
                  <div className="mb-8">
                    <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg mb-6">
                      <h3 className="text-lg font-semibold mb-3 text-orange-900">
                        Directiva 'use client' Requerida
                      </h3>
                      <p className="text-orange-800">
                        Para crear un Client Component, debes agregar <code className="bg-orange-200 px-2 py-1 rounded">'use client'</code> 
                        al inicio del archivo. Esto indica a Next.js que el componente necesita ejecutarse en el cliente.
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4">Cuándo Usar Client Components</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-medium text-green-700">✅ Necesitas Client Component cuando:</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Usas hooks como useState, useEffect</li>
                          <li>• Manejas eventos del usuario (onClick, onChange)</li>
                          <li>• Accedes a APIs del navegador (localStorage, geolocation)</li>
                          <li>• Necesitas interactividad en tiempo real</li>
                          <li>• Usas librerías que requieren el DOM</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium text-red-700">❌ No uses Client Component para:</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Mostrar contenido estático</li>
                          <li>• Data fetching inicial</li>
                          <li>• SEO-critical content</li>
                          <li>• Layouts y headers simples</li>
                          <li>• Componentes que no cambian</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Ejemplo de código */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">🎮 Ejemplo Interactivo</h3>
                    <div className="relative">
                      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{ejemplosComparacion.client.codigo}</code>
                      </pre>
                      <button
                        onClick={() => analyzeCode(ejemplosComparacion.client.codigo)}
                        className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                        title="Analizar código con IA"
                      >
                        <Code2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sección: Comparación */}
            {seccionActiva === 'comparacion' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                    Comparación Lado a Lado
                  </h2>
                  
                  {/* Selector de demo */}
                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => setDemoActiva('server')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        demoActiva === 'server' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Server Component
                    </button>
                    <button
                      onClick={() => setDemoActiva('client')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        demoActiva === 'client' 
                          ? 'bg-orange-600 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Client Component
                    </button>
                  </div>

                  {/* Comparación visual */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(ejemplosComparacion).map(([tipo, datos]) => (
                      <div 
                        key={tipo}
                        className={`p-6 rounded-lg border-2 transition-all ${
                          demoActiva === tipo
                            ? tipo === 'server' 
                              ? 'border-blue-300 bg-blue-50' 
                              : 'border-orange-300 bg-orange-50'
                            : 'border-gray-200 bg-gray-50 opacity-75'
                        }`}
                      >
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                          {tipo === 'server' ? (
                            <Server className="w-6 h-6 text-blue-600" />
                          ) : (
                            <Laptop className="w-6 h-6 text-orange-600" />
                          )}
                          {datos.titulo}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">{datos.descripcion}</p>
                        
                        <div className="mb-4">
                          <h4 className="font-medium text-green-700 text-sm mb-2">✅ Ventajas:</h4>
                          <ul className="text-xs space-y-1">
                            {datos.pros.map((pro, i) => (
                              <li key={i}>• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="font-medium text-red-700 text-sm mb-2">❌ Limitaciones:</h4>
                          <ul className="text-xs space-y-1">
                            {datos.contras.map((contra, i) => (
                              <li key={i}>• {contra}</li>
                            ))}
                          </ul>
                        </div>
                        
                        {demoActiva === tipo && (
                          <div className="mt-4">
                            <pre className="bg-gray-900 text-white p-3 rounded text-xs overflow-x-auto">
                              <code>{datos.codigo}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Sección: Claude Flow */}
            {seccionActiva === 'claude-flow' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Bot className="w-8 h-8 text-purple-600" />
                    Desarrollo con Claude Flow
                  </h2>
                  
                  {/* Explicación de beneficios */}
                  <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg mb-6">
                    <h3 className="font-semibold text-purple-900 mb-3">
                      Cómo Claude Flow potencia este tutorial
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-purple-800">
                      <li>Generación automática de ejemplos contextualizados</li>
                      <li>Análisis de código con sugerencias de mejora</li>
                      <li>Comparación inteligente entre patrones</li>
                      <li>Detección de anti-patterns y mejores prácticas</li>
                    </ul>
                  </div>
                  
                  {/* Demo de generación */}
                  {codigoGenerado && (
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        Código Generado por IA
                      </h3>
                      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{codigoGenerado}</code>
                      </pre>
                    </div>
                  )}
                  
                  {/* Sugerencias de IA */}
                  {aiSuggestions.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-6">
                      <h3 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                        <Bot className="w-5 h-5 text-yellow-600" />
                        Sugerencias Inteligentes
                      </h3>
                      <div className="space-y-2">
                        {aiSuggestions.map((tip, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Sparkles className="w-4 h-4 text-yellow-600 mt-0.5" />
                            <p className="text-sm text-yellow-800">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Demo de coordinación de agentes */}
                  <div className="bg-white p-6 rounded-lg shadow-md border">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Users className="w-6 h-6 text-purple-600" />
                      Agentes en Acción
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Bot className="w-8 h-8 text-purple-600" />
                        </div>
                        <p className="text-sm font-medium">Queen Agent</p>
                        <p className="text-xs text-gray-600">Coordinando estructura</p>
                        <div className="mt-2 h-1 bg-purple-200 rounded">
                          <div className="h-full bg-purple-600 rounded w-3/4"></div>
                        </div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Code2 className="w-8 h-8 text-blue-600" />
                        </div>
                        <p className="text-sm font-medium">Worker Agent</p>
                        <p className="text-xs text-gray-600">Generando código</p>
                        <div className="mt-2 h-1 bg-blue-200 rounded">
                          <div className="h-full bg-blue-600 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Eye className="w-8 h-8 text-green-600" />
                        </div>
                        <p className="text-sm font-medium">Knowledge Agent</p>
                        <p className="text-xs text-gray-600">Revisando patrones</p>
                        <div className="mt-2 h-1 bg-green-200 rounded">
                          <div className="h-full bg-green-600 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mensaje de estado de generación */}
            {isGenerating && (
              <div className="fixed bottom-4 right-4 bg-purple-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Claude Flow está generando contenido...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}