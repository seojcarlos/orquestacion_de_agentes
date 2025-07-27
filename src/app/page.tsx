'use client';

import { useState, useEffect } from 'react';
import { Bot, BookOpen, Lightbulb, Send, Code, Terminal, FileCode, Server, RefreshCw, Monitor, Zap, Search, Rocket, ChevronRight, Route, CheckCircle, AlertCircle, GitBranch } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: number;
  agent: string;
  content: string;
  timestamp: Date;
}

export default function Home() {
  const [activeAgent, setActiveAgent] = useState<'executor' | 'teacher' | 'assistant'>('assistant');
  const [inputMessage, setInputMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      agent: 'assistant',
      content: '¡Bienvenido al sistema de orquestación de agentes! 🤖\n\n' +
               'Soy el Agente Asistente y puedo ayudarte a aprender programación paso a paso. ' +
               'Además, **puedo detectar automáticamente cuando quieres crear algo nuevo** y registrarlo como tarea en el proyecto.\n\n' +
               'Prueba diciendo cosas como:\n' +
               '• "Quiero crear un tutorial sobre..."\n' +
               '• "Me gustaría implementar..."\n' +
               '• "Necesito un curso de..."\n\n' +
               '¿Qué te gustaría aprender o crear hoy?',
      timestamp: new Date()
    }
  ]);

  // Este efecto asegura que el componente está montado en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  const agents = {
    executor: {
      name: 'Agente Ejecutor',
      icon: Bot,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBg: 'hover:bg-blue-100',
      description: 'Ejecuta código y realiza tareas técnicas'
    },
    teacher: {
      name: 'Agente Profesor',
      icon: BookOpen,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      hoverBg: 'hover:bg-emerald-100',
      description: 'Explica conceptos y responde el "por qué"'
    },
    assistant: {
      name: 'Agente Asistente',
      icon: Lightbulb,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverBg: 'hover:bg-purple-100',
      description: 'Escucha tus necesidades y sugiere próximos pasos'
    }
  };

  const ejemplosPages = [
    {
      titulo: 'Tutoriales Interactivos',
      descripcion: 'Aprende Next.js desde lo básico hasta avanzado',
      link: '/tutoriales',
      icon: BookOpen,
      color: 'indigo'
    },
    {
      titulo: 'Sistema de Rutas',
      descripcion: 'Domina el App Router de Next.js 13+',
      link: '/tutoriales/sistema-rutas',
      icon: FileCode,
      color: 'orange'
    },
    {
      titulo: 'Tipos de Renderizado',
      descripcion: 'Explora SSG, SSR, ISR y CSR con ejemplos',
      link: '/ejemplos-renderizado',
      icon: Server,
      color: 'blue'
    },
    {
      titulo: 'Análisis con DevTools',
      descripcion: 'Usa las herramientas del navegador',
      link: '/ejemplos-renderizado/guia-analisis',
      icon: Search,
      color: 'purple'
    },
    {
      titulo: 'Comparación de Rendimiento',
      descripcion: 'Métricas y optimización en tiempo real',
      link: '/ejemplos-renderizado/comparacion',
      icon: Zap,
      color: 'green'
    },
    {
      titulo: 'Hooks de React',
      descripcion: 'useState, useEffect y más con demos',
      link: '/tutoriales/hooks-react',
      icon: RefreshCw,
      color: 'emerald'
    }
  ];

  // Función para detectar intenciones de crear nuevas funcionalidades
  const detectarIntencionCrear = (mensaje: string): { detectado: boolean; titulo: string; categoria: string; ruta: string } => {
    const mensajeLower = mensaje.toLowerCase();
    
    // Patrones de detección mejorados
    const patronesCrear = [
      /(?:crear|implementar|hacer|agregar|añadir|desarrollar)\s+(?:un|una|el|la)?\s*(.+)/i,
      /(?:necesito|quiero|me gustaría|gustaría)\s+(?:un|una|que)?\s*(?:crearas|crear|hagas|hacer)?\s*(.+)/i,
      /(?:tutorial|componente|página|sección|funcionalidad|curso|guía)\s+(?:de|para|sobre)?\s*(.+)/i
    ];
    
    for (const patron of patronesCrear) {
      const match = mensaje.match(patron);
      if (match) {
        const contenido = match[1].trim();
        
        // Determinar categoría basada en palabras clave
        let categoria = 'Nuevas Funcionalidades';
        if (mensajeLower.includes('tutorial') || mensajeLower.includes('curso') || mensajeLower.includes('guía')) categoria = 'Tutoriales Pendientes';
        if (mensajeLower.includes('componente')) categoria = 'Componentes';
        if (mensajeLower.includes('página') || mensajeLower.includes('pagina')) categoria = 'Páginas';
        if (mensajeLower.includes('api')) categoria = 'APIs';
        if (mensajeLower.includes('docker') || mensajeLower.includes('deploy')) categoria = 'Despliegue';
        
        // Generar ruta sugerida
        const rutaBase = contenido.toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
          .replace(/[^a-z0-9\s-]/g, '') // Solo alfanuméricos y guiones
          .replace(/\s+/g, '-') // Espacios a guiones
          .replace(/-+/g, '-') // Múltiples guiones a uno solo
          .trim();
        
        let ruta = '/';
        if (categoria === 'Tutoriales Pendientes') ruta = `/tutoriales/${rutaBase}`;
        else if (categoria === 'Componentes') ruta = `/components/${rutaBase}`;
        else if (categoria === 'APIs') ruta = `/api/${rutaBase}`;
        else ruta = `/app/${rutaBase}`;
        
        return {
          detectado: true,
          titulo: contenido.charAt(0).toUpperCase() + contenido.slice(1),
          categoria,
          ruta
        };
      }
    }
    
    return { detectado: false, titulo: '', categoria: '', ruta: '' };
  };

  // Función para registrar tarea automáticamente
  const registrarTareaAutomaticamente = async (titulo: string, categoria: string, ruta: string) => {
    setIsRegistering(true);
    try {
      const response = await fetch('/api/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, categoria, ruta })
      });
      
      if (response.ok) {
        const data = await response.json();
        setNotification({
          type: 'success',
          message: `✅ Tarea registrada: "${titulo}" en ${categoria}`
        });
        
        // Agregar mensaje de confirmación al chat
        sendMessage('assistant', 
          `🎯 He registrado automáticamente esta tarea en el README:\n\n` +
          `**Título**: ${titulo}\n` +
          `**Categoría**: ${categoria}\n` +
          `**Ruta sugerida**: \`${ruta}\`\n\n` +
          `La tarea ha sido agregada al sistema de seguimiento del proyecto.`
        );
      } else {
        throw new Error('Error al registrar la tarea');
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: '❌ Error al registrar la tarea automáticamente'
      });
    } finally {
      setIsRegistering(false);
      // Limpiar notificación después de 5 segundos
      setTimeout(() => {
        setNotification({ type: null, message: '' });
      }, 5000);
    }
  };

  const sendMessage = (agentType: string, message: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      agent: agentType,
      content: message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const mensaje = inputMessage.trim();
      sendMessage('user', mensaje);
      
      // Detectar intención de crear nueva funcionalidad
      const intencion = detectarIntencionCrear(mensaje);
      
      if (intencion.detectado && activeAgent === 'assistant') {
        // Si el asistente detecta una intención de crear algo nuevo
        setTimeout(async () => {
          sendMessage('assistant', 
            `🔍 He detectado que quieres crear: **${intencion.titulo}**\n\n` +
            `Lo voy a registrar automáticamente en la categoría "${intencion.categoria}" ` +
            `con la ruta sugerida \`${intencion.ruta}\`.\n\n` +
            `Registrando tarea...`
          );
          
          // Registrar la tarea automáticamente
          await registrarTareaAutomaticamente(intencion.titulo, intencion.categoria, intencion.ruta);
        }, 500);
      } else if (intencion.detectado && activeAgent !== 'assistant') {
        // Si se detecta intención pero no está activo el asistente
        setTimeout(() => {
          sendMessage(activeAgent, 
            `💡 Parece que quieres crear algo nuevo: "${intencion.titulo}".\n\n` +
            `Para registrar automáticamente tareas en el proyecto, activa el **Agente Asistente** (botón púrpura) ` +
            `y repite tu solicitud. Él puede detectar y registrar tareas automáticamente.\n\n` +
            `Por ahora, aquí está mi respuesta como ${agents[activeAgent].name}:`
          );
          
          // Respuesta normal del agente
          const responses = {
            executor: `\n\`\`\`bash\n# Comando relacionado con: ${mensaje}\n# El Agente Ejecutor ejecuta comandos, pero para crear tareas usa el Asistente\n\`\`\``,
            teacher: `\nTe puedo explicar sobre "${intencion.titulo}", pero para registrarlo como tarea del proyecto, usa el Agente Asistente.`,
            assistant: '' // No debería llegar aquí
          };
          sendMessage(activeAgent, responses[activeAgent]);
        }, 1000);
      } else {
        // Respuesta normal del agente sin detección
        setTimeout(() => {
          const responses = {
            executor: `Ejecutando: "${mensaje}"\n\`\`\`bash\n$ ${mensaje}\n\`\`\`\nComando ejecutado exitosamente.`,
            teacher: `Excelente pregunta sobre "${mensaje}". Déjame explicarte paso a paso...`,
            assistant: intencion.detectado 
              ? `Interesante idea sobre "${intencion.titulo}". Te puedo ayudar a planificar cómo implementarlo. \u00bfQuieres que lo registre como tarea pendiente?`
              : `Entiendo que quieres trabajar con "${mensaje}". Te sugiero los siguientes pasos...`
          };
          sendMessage(activeAgent, responses[activeAgent]);
        }, 1000);
      }
      
      setInputMessage('');
    }
  };

  // Función para formatear tiempo de forma segura
  const formatTime = (timestamp: Date) => {
    if (!mounted) {
      // Durante el SSR, devuelve un placeholder o string vacío
      return '...';
    }
    // Solo en el cliente, devuelve el tiempo formateado
    return timestamp.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header con navegación */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Terminal className="w-8 h-8 text-slate-700" />
                Sistema de Orquestación de Agentes
              </h1>
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <span>Inicio</span>
              </nav>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Code className="w-4 h-4" />
              <span>Aprende programación paso a paso</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notificación flotante */}
        {notification.type && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all transform ${
            notification.type === 'success' ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
          }`}>
            <div className="flex items-center gap-3">
              {notification.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <p className={`font-medium ${
                notification.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {notification.message}
              </p>
            </div>
          </div>
        )}
        {/* Sección de Enlaces Rápidos */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Enlaces Rápidos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ejemplosPages.map((page, index) => {
              const Icon = page.icon;
              return (
                <Link
                  key={index}
                  href={page.link}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all hover:scale-105 border border-gray-200"
                >
                  <div className={`w-10 h-10 bg-${page.color}-100 rounded-lg flex items-center justify-center mb-3`}>
                    <Icon className={`w-6 h-6 text-${page.color}-600`} />
                  </div>
                  <h3 className="font-semibold text-gray-900">{page.titulo}</h3>
                  <p className="text-sm text-gray-600 mt-1">{page.descripcion}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Selector de Agentes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {Object.entries(agents).map(([key, agent]) => {
            const Icon = agent.icon;
            const isActive = activeAgent === key;
            return (
              <button
                key={key}
                onClick={() => setActiveAgent(key as any)}
                className={`
                  relative p-6 rounded-xl border-2 transition-all duration-200 
                  ${isActive 
                    ? `${agent.borderColor} ${agent.bgColor} shadow-lg scale-105` 
                    : `border-slate-200 bg-white hover:border-slate-300 ${agent.hoverBg} hover:shadow-md`
                  }
                `}
              >
                {isActive && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}
                <Icon className={`w-10 h-10 ${agent.color} mb-3 mx-auto`} />
                <h3 className="font-semibold text-lg text-slate-900">{agent.name}</h3>
                <p className="text-sm text-slate-600 mt-2">{agent.description}</p>
              </button>
            );
          })}
        </div>

        {/* Área de Chat */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Mensajes */}
          <div className="h-[400px] overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => {
              const isUser = msg.agent === 'user';
              const agent = !isUser ? agents[msg.agent as keyof typeof agents] : null;
              const Icon = agent?.icon;
              
              return (
                <div key={msg.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  {!isUser && Icon && (
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full ${agent.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${agent.color}`} />
                    </div>
                  )}
                  <div className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
                    <span className="text-xs text-slate-500 mb-1">
                      {isUser ? 'Tú' : agent?.name} • {formatTime(msg.timestamp)}
                    </span>
                    <div className={`
                      px-4 py-2 rounded-lg 
                      ${isUser 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-slate-100 text-slate-900'
                      }
                    `}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-slate-200 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Pregúntale al ${agents[activeAgent].name}...`}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Enviar
              </button>
            </div>
          </form>
        </div>

        {/* Acciones Rápidas */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            Acciones Rápidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => sendMessage('executor', '📦 Instalando dependencias...\n```bash\nnpm install react react-dom next\n```\n✅ Instalación completada!')}
              className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Simular Instalación
            </button>
            <button
              onClick={() => sendMessage('teacher', '📚 Las dependencias en Node.js son módulos de código reutilizable que otros desarrolladores han creado. npm (Node Package Manager) las gestiona por ti.')}
              className="p-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
            >
              Explicar Concepto
            </button>
            <button
              onClick={() => sendMessage('assistant', '💡 Siguiente paso recomendado: Crear tu primer componente React. ¿Te gustaría que te guíe en el proceso?')}
              className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
            >
              Sugerir Paso
            </button>
            <button
              onClick={async () => {
                setActiveAgent('assistant');
                const tareaEjemplo = {
                  titulo: 'Sistema de notificaciones en tiempo real',
                  categoria: 'Nuevas Funcionalidades',
                  ruta: '/components/notificaciones'
                };
                sendMessage('assistant', 
                  `🎯 Voy a registrar una tarea de ejemplo:\n\n` +
                  `**${tareaEjemplo.titulo}**\n` +
                  `Categoría: ${tareaEjemplo.categoria}\n` +
                  `Ruta: \`${tareaEjemplo.ruta}\``
                );
                await registrarTareaAutomaticamente(tareaEjemplo.titulo, tareaEjemplo.categoria, tareaEjemplo.ruta);
              }}
              className="p-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              disabled={isRegistering}
            >
              {isRegistering ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Registrando...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Demo: Registrar Tarea
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sección del Asistente Inteligente */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
          <div className="flex items-start gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Bot className="w-8 h-8 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">🤖 Asistente Inteligente Activado</h3>
              <p className="text-gray-700 mb-3">
                El <strong>Agente Asistente</strong> ahora puede detectar automáticamente cuando quieres crear nuevas funcionalidades 
                y las registra en el sistema de tareas del proyecto.
              </p>
              <div className="bg-white/70 rounded-lg p-4 border border-purple-100">
                <p className="text-sm font-semibold mb-2">Prueba diciendo cosas como:</p>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>"Quiero crear un tutorial sobre autenticación"</li>
                  <li>"Necesito implementar un sistema de comentarios"</li>
                  <li>"Me gustaría agregar una página de perfil de usuario"</li>
                  <li>"Crear componente de gráficos interactivos"</li>
                </ul>
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  Sin configuración necesaria
                </span>
                <span className="flex items-center gap-1 text-blue-600">
                  <Zap className="w-4 h-4" />
                  Registro instantáneo
                </span>
                <Link 
                  href="/tutoriales/asistente-inteligente" 
                  className="flex items-center gap-1 text-purple-600 hover:text-purple-800"
                >
                  <BookOpen className="w-4 h-4" />
                  Ver tutorial completo
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recursos de Aprendizaje */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">📚 Recursos de Aprendizaje</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Route className="w-5 h-5 text-orange-600" />
                Sistema de Rutas
              </h3>
              <p className="text-gray-600 mb-4">
                Domina el App Router de Next.js 13+ con rutas dinámicas y layouts.
              </p>
              <Link href="/tutoriales/sistema-rutas" className="text-orange-600 hover:text-orange-800 flex items-center gap-1">
                Ver tutorial <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-600" />
                Renderizado en Next.js
              </h3>
              <p className="text-gray-600 mb-4">
                Aprende las diferencias entre SSG, SSR, ISR y CSR con ejemplos.
              </p>
              <Link href="/ejemplos-renderizado" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                Explorar ejemplos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-600" />
                Server Components
              </h3>
              <p className="text-gray-600 mb-4">
                React Server Components en Next.js 13+. Aprende RSC con demos interactivas.
              </p>
              <Link href="/tutoriales/server-components" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                Ver tutorial <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-cyan-600" />
                Optimización
              </h3>
              <p className="text-gray-600 mb-4">
                Performance en Next.js. Core Web Vitals, images, bundles con análisis IA.
              </p>
              <Link href="/tutoriales/optimizacion" className="text-cyan-600 hover:text-cyan-800 flex items-center gap-1">
                Ver tutorial <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-600" />
                Claude Flow
              </h3>
              <p className="text-gray-600 mb-4">
                Orquestación de IA para desarrollo. Aprende a usar hive-mind intelligence.
              </p>
              <Link href="/tutoriales/un-curso-de-como-se-utiliza-httpsgithubcomruvnetclaude-flow-en-esta-web-que-aporta-y-desafios-con-ejemplos-visuales" className="text-purple-600 hover:text-purple-800 flex items-center gap-1">
                Ver curso <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Tutoriales Completos
              </h3>
              <p className="text-gray-600 mb-4">
                10 tutoriales interactivos desde lo básico hasta herramientas avanzadas.
              </p>
              <Link href="/tutoriales" className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                Ver todos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Nueva sección de Arquitectura */}
        <div className="mt-16 py-12 px-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <GitBranch className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              ¿Confundido con la estructura del proyecto?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              He detectado que hay múltiples proyectos mezclados en la estructura actual. 
              He creado un análisis completo que explica qué está pasando y cómo solucionarlo.
            </p>
            <Link 
              href="/arquitectura" 
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <GitBranch className="w-5 h-5" />
              Ver Análisis de Arquitectura
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
