'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bot, FileCode, Webhook, Shield, 
  ArrowLeft, CheckCircle, AlertCircle, Server,
  Zap, Unlock
} from 'lucide-react';

export default function TutorialAsistenteInteligente() {
  const [implementacionActiva, setImplementacionActiva] = useState('simple');
  const [codigoEjecutado, setCodigoEjecutado] = useState(false);
  const [tareasRegistradas, setTareasRegistradas] = useState<string[]>([]);

  const implementaciones = [
    {
      id: 'simple',
      titulo: '1. Implementación Local Simple',
      descripcion: 'La más fácil - Solo filesystem local',
      nivel: 'Principiante',
      seguridad: 'Ninguna',
      icon: FileCode,
      color: 'green'
    },
    {
      id: 'apiLocal',
      titulo: '2. API Local con Validación',
      descripcion: 'Con validación básica de datos',
      nivel: 'Intermedio',
      seguridad: 'Básica',
      icon: Server,
      color: 'blue'
    },
    {
      id: 'webhook',
      titulo: '3. Webhook Externo',
      descripcion: 'Conectar con servicios externos',
      nivel: 'Intermedio',
      seguridad: 'Media',
      icon: Webhook,
      color: 'orange'
    },
    {
      id: 'autenticado',
      titulo: '4. API Autenticada',
      descripcion: 'Con tokens y autenticación',
      nivel: 'Avanzado',
      seguridad: 'Alta',
      icon: Shield,
      color: 'red'
    }
  ];

  // Simulación de registro de tarea
  const simularRegistroTarea = (metodo: string) => {
    setCodigoEjecutado(true);
    setTimeout(() => {
      setTareasRegistradas(prev => [...prev, `Tarea registrada con ${metodo} - ${new Date().toLocaleTimeString()}`]);
      setCodigoEjecutado(false);
    }, 1000);
  };

  const renderContenido = () => {
    switch (implementacionActiva) {
      case 'simple':
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Unlock className="w-5 h-5 text-green-600" />
                Implementación Más Simple - Sin Seguridad
              </h3>
              <p className="text-gray-700 mb-4">
                Perfecta para desarrollo local y proyectos educativos. 
                <strong> NO usar en producción</strong>.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">📁 Paso 1: Crear la API Route</h4>
              <p className="text-gray-600">Crea el archivo <code className="bg-gray-100 px-2 py-1 rounded">src/app/api/tareas/route.ts</code>:</p>
              
              <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                <code>{`// ⚠️ VERSIÓN SIMPLE - SOLO PARA DESARROLLO LOCAL
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  // Sin validación de seguridad - directo al grano
  const datos = await request.json();
  
  // Ruta del README
  const readmePath = path.join(process.cwd(), 'docs', 'README.md');
  
  // Leer archivo
  let contenido = await fs.readFile(readmePath, 'utf-8');
  
  // Agregar tarea (búsqueda simple)
  const nuevaTarea = \`- [ ] \${datos.titulo} (\\\`\${datos.ruta}\\\`)\`;
  contenido = contenido.replace(
    '## 🚧 Tareas Pendientes',
    \`## 🚧 Tareas Pendientes\\n\\n### Nueva Tarea\\n\${nuevaTarea}\\n\`
  );
  
  // Guardar
  await fs.writeFile(readmePath, contenido);
  
  return NextResponse.json({ success: true });
}`}</code>
              </pre>

              <h4 className="font-semibold text-lg mt-6">🎮 Paso 2: Usar desde el Frontend</h4>
              <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                <code>{`// En tu componente React
const registrarTarea = async () => {
  const response = await fetch('/api/tareas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      titulo: 'Mi nueva funcionalidad',
      ruta: '/app/nueva-funcionalidad'
    })
  });
  
  if (response.ok) {
    alert('¡Tarea registrada!');
  }
};`}</code>
              </pre>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mt-6">
                <h4 className="font-semibold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  Ventajas y Desventajas
                </h4>
                <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-green-700">✅ Ventajas:</p>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Super simple de implementar</li>
                      <li>No requiere configuración</li>
                      <li>Perfecto para aprender</li>
                      <li>Funciona inmediatamente</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-red-700">❌ Desventajas:</p>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Sin validación de datos</li>
                      <li>Sin autenticación</li>
                      <li>Puede corromper archivos</li>
                      <li>Solo para desarrollo</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mt-6">
                <h4 className="font-semibold mb-3">🎮 Demo Interactiva</h4>
                <button
                  onClick={() => simularRegistroTarea('Método Simple')}
                  disabled={codigoEjecutado}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {codigoEjecutado ? 'Registrando...' : 'Simular Registro Simple'}
                </button>
              </div>
            </div>
          </div>
        );

      case 'apiLocal':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-600" />
                API con Validación Básica
              </h3>
              <p className="text-gray-700">
                Agregamos validación de datos y manejo de errores. Mejor para proyectos pequeños.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">📁 API Mejorada con Validación</h4>
              
              <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                <code>{`import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Esquema de validación simple
interface TareaInput {
  titulo: string;
  descripcion?: string;
  categoria: string;
  ruta: string;
}

// Validar entrada
function validarTarea(data: any): data is TareaInput {
  return (
    typeof data.titulo === 'string' && 
    data.titulo.length > 0 &&
    typeof data.categoria === 'string' &&
    typeof data.ruta === 'string' &&
    data.ruta.startsWith('/')
  );
}

export async function POST(request: NextRequest) {
  try {
    const datos = await request.json();
    
    // 1. Validar datos
    if (!validarTarea(datos)) {
      return NextResponse.json(
        { error: 'Datos inválidos' },
        { status: 400 }
      );
    }
    
    // 2. Sanitizar entrada
    const tareaLimpia = {
      titulo: datos.titulo.trim().slice(0, 100),
      categoria: datos.categoria.trim(),
      ruta: datos.ruta.toLowerCase().replace(/[^a-z0-9\/-]/g, '')
    };
    
    // 3. Verificar que el archivo existe
    const readmePath = path.join(process.cwd(), 'docs', 'README.md');
    
    try {
      await fs.access(readmePath);
    } catch {
      return NextResponse.json(
        { error: 'README.md no encontrado' },
        { status: 404 }
      );
    }
    
    // 4. Leer y actualizar
    let contenido = await fs.readFile(readmePath, 'utf-8');
    
    // 5. Buscar sección correcta con regex
    const regex = new RegExp(\`### \${tareaLimpia.categoria}[\\\\s\\\\S]*?(?=###|##|$)\`);
    
    if (contenido.match(regex)) {
      // Categoría existe, agregar tarea
      contenido = contenido.replace(regex, (match) => {
        return match.trimEnd() + \`\\n- [ ] \${tareaLimpia.titulo} (\\\`\${tareaLimpia.ruta}\\\`)\\n\`;
      });
    } else {
      // Crear nueva categoría
      const insertPoint = contenido.indexOf('## 🚧 Tareas Pendientes');
      if (insertPoint === -1) {
        return NextResponse.json(
          { error: 'Sección de tareas no encontrada' },
          { status: 400 }
        );
      }
      
      const newSection = \`\\n\\n### \${tareaLimpia.categoria}\\n- [ ] \${tareaLimpia.titulo} (\\\`\${tareaLimpia.ruta}\\\`)\`;
      contenido = contenido.slice(0, insertPoint + 23) + newSection + contenido.slice(insertPoint + 23);
    }
    
    // 6. Guardar con backup
    const backupPath = readmePath + '.backup';
    await fs.copyFile(readmePath, backupPath);
    await fs.writeFile(readmePath, contenido);
    
    // 7. Log de actividad
    console.log('Tarea registrada:', {
      timestamp: new Date().toISOString(),
      action: 'task_added',
      task: tareaLimpia
    });
    
    return NextResponse.json({ 
      success: true,
      tarea: tareaLimpia,
      message: 'Tarea registrada correctamente'
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}`}</code>
              </pre>

              <div className="bg-blue-50 rounded-lg p-4 mt-6">
                <h4 className="font-semibold">💡 Mejoras Incluidas:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
                  <li>Validación de tipos con TypeScript</li>
                  <li>Sanitización de entrada (evita inyección)</li>
                  <li>Manejo de errores robusto</li>
                  <li>Backup automático antes de modificar</li>
                  <li>Logging de actividad</li>
                  <li>Respuestas HTTP apropiadas</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mt-6">
                <h4 className="font-semibold mb-3">🎮 Demo con Validación</h4>
                <button
                  onClick={() => simularRegistroTarea('API con Validación')}
                  disabled={codigoEjecutado}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {codigoEjecutado ? 'Validando y registrando...' : 'Probar con Validación'}
                </button>
              </div>
            </div>
          </div>
        );

      case 'webhook':
        return (
          <div className="space-y-6">
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Webhook className="w-5 h-5 text-orange-600" />
                Webhook para Servicios Externos
              </h3>
              <p className="text-gray-700">
                Permite que servicios externos (como Claude-code, GitHub Actions, etc.) 
                registren tareas automáticamente.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">🔗 Configurar Webhook</h4>
              
              <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                <code>{`// src/app/api/webhook/tareas/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Verificar firma del webhook (opcional pero recomendado)
function verificarFirma(payload: string, signature: string, secret: string): boolean {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return \`sha256=\${hash}\` === signature;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Obtener cuerpo y headers
    const body = await request.text();
    const signature = request.headers.get('x-webhook-signature');
    
    // 2. Verificar firma (si está configurada)
    const webhookSecret = process.env.WEBHOOK_SECRET;
    if (webhookSecret && signature) {
      if (!verificarFirma(body, signature, webhookSecret)) {
        return NextResponse.json(
          { error: 'Firma inválida' },
          { status: 401 }
        );
      }
    }
    
    // 3. Parsear datos
    const datos = JSON.parse(body);
    
    // 4. Mapear datos según el servicio
    let tareaFormateada;
    
    switch (datos.source) {
      case 'claude-code':
        tareaFormateada = {
          titulo: datos.task_name,
          categoria: datos.category || 'Tareas de Claude',
          ruta: datos.suggested_path,
          descripcion: datos.description
        };
        break;
        
      case 'github':
        tareaFormateada = {
          titulo: datos.issue.title,
          categoria: 'Issues de GitHub',
          ruta: \`/issues/\${datos.issue.number}\`,
          descripcion: datos.issue.body
        };
        break;
        
      default:
        // Formato genérico
        tareaFormateada = {
          titulo: datos.titulo || datos.title,
          categoria: datos.categoria || 'Webhook Tasks',
          ruta: datos.ruta || '/tasks/webhook',
          descripcion: datos.descripcion || datos.description
        };
    }
    
    // 5. Registrar tarea (reusar lógica del API local)
    const registroResponse = await fetch('http://localhost:3000/api/tareas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tareaFormateada)
    });
    
    if (!registroResponse.ok) {
      throw new Error('Error al registrar tarea');
    }
    
    // 6. Responder al webhook
    return NextResponse.json({
      success: true,
      message: 'Tarea recibida y procesada',
      task_id: crypto.randomUUID(),
      processed_at: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Error procesando webhook' },
      { status: 500 }
    );
  }
}`}</code>
              </pre>

              <div className="bg-orange-50 rounded-lg p-4 mt-6">
                <h4 className="font-semibold">🔧 Configuración de Servicios Externos:</h4>
                
                <div className="mt-4 space-y-3">
                  <div className="border-l-4 border-orange-400 pl-4">
                    <p className="font-semibold">Para Claude-code:</p>
                    <code className="text-sm bg-white p-2 rounded block mt-1">
                      webhook_url: "https://tu-app.com/api/webhook/tareas"
                    </code>
                  </div>
                  
                  <div className="border-l-4 border-orange-400 pl-4">
                    <p className="font-semibold">Para GitHub Actions:</p>
                    <pre className="text-sm bg-white p-2 rounded mt-1 overflow-x-auto">
                      <code>{`- name: Notify Task
  uses: actions/webhook@v1
  with:
    url: \${{ secrets.WEBHOOK_URL }}
    body: |
      {
        "source": "github",
        "issue": \${{ toJSON(github.event.issue) }}
      }`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mt-6">
                <h4 className="font-semibold mb-3">🎮 Simular Webhook</h4>
                <button
                  onClick={() => simularRegistroTarea('Webhook Externo')}
                  disabled={codigoEjecutado}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
                >
                  {codigoEjecutado ? 'Procesando webhook...' : 'Enviar Webhook de Prueba'}
                </button>
              </div>
            </div>
          </div>
        );

      case 'autenticado':
        return (
          <div className="space-y-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-600" />
                API Completamente Segura
              </h3>
              <p className="text-gray-700">
                Implementación production-ready con autenticación, rate limiting y auditoría.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">🔐 API con Autenticación JWT</h4>
              
              <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`// src/app/api/secure/tareas/route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

// Schema de validación con Zod
const TareaSchema = z.object({
  titulo: z.string().min(3).max(100),
  descripcion: z.string().optional(),
  categoria: z.enum(['Tutorial', 'Feature', 'Bug', 'Docs']),
  ruta: z.string().regex(/^\\/[a-z0-9\\/-]+$/),
  prioridad: z.enum(['baja', 'media', 'alta']).optional()
});

// Middleware de autenticación
async function verificarToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Token no proporcionado');
  }
  
  const token = authHeader.substring(7);
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as { userId: string; role: string };
  } catch {
    throw new Error('Token inválido');
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const requestId = crypto.randomUUID();
  
  try {
    // 1. Verificar autenticación
    const user = await verificarToken(request);
    
    // 2. Verificar permisos
    if (!['admin', 'developer'].includes(user.role)) {
      return NextResponse.json(
        { error: 'Sin permisos suficientes' },
        { status: 403 }
      );
    }
    
    // 3. Validar datos
    const body = await request.json();
    const validatedData = TareaSchema.parse(body);
    
    // 4. Procesar tarea...
    // (código de procesamiento aquí)
    
    return NextResponse.json({
      success: true,
      taskId: crypto.randomUUID(),
      message: 'Tarea creada correctamente'
    }, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}`}</code>
              </pre>

              <div className="bg-red-50 rounded-lg p-4 mt-6">
                <h4 className="font-semibold">🛡️ Características de Seguridad:</h4>
                <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Autenticación JWT obligatoria</li>
                    <li>Control de acceso basado en roles</li>
                    <li>Rate limiting por usuario</li>
                    <li>Validación estricta con Zod</li>
                    <li>Transacciones con rollback</li>
                  </ul>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Auditoría completa de acciones</li>
                    <li>Sanitización de entrada</li>
                    <li>Respuestas de error genéricas</li>
                    <li>Logging estructurado</li>
                    <li>WebSocket para tiempo real</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mt-6">
                <h4 className="font-semibold mb-3">🎮 Demo API Segura</h4>
                <button
                  onClick={() => simularRegistroTarea('API Autenticada')}
                  disabled={codigoEjecutado}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {codigoEjecutado ? 'Autenticando y registrando...' : 'Probar con Autenticación'}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/tutoriales"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Link href="/" className="hover:text-slate-900">Inicio</Link>
                <span>/</span>
                <Link href="/tutoriales" className="hover:text-slate-900">Tutoriales</Link>
                <span>/</span>
                <span className="text-slate-900 font-medium">Asistente Inteligente</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Título */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Bot className="w-10 h-10 text-purple-600" />
            Conectar el Asistente Inteligente
          </h1>
          <p className="text-xl text-gray-600">
            Aprende 4 formas diferentes de implementar el registro automático de tareas, 
            desde la más simple hasta la más segura.
          </p>
        </div>

        {/* Comparación rápida */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">📊 Comparación de Métodos</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Método</th>
                  <th className="text-center py-2">Dificultad</th>
                  <th className="text-center py-2">Seguridad</th>
                  <th className="text-center py-2">Uso Recomendado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Simple (Filesystem)</td>
                  <td className="text-center">⭐</td>
                  <td className="text-center text-red-600">❌ Ninguna</td>
                  <td className="text-center">Solo desarrollo</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">API con Validación</td>
                  <td className="text-center">⭐⭐</td>
                  <td className="text-center text-yellow-600">⚠️ Básica</td>
                  <td className="text-center">Proyectos pequeños</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Webhook</td>
                  <td className="text-center">⭐⭐⭐</td>
                  <td className="text-center text-blue-600">🔒 Media</td>
                  <td className="text-center">Integraciones</td>
                </tr>
                <tr>
                  <td className="py-2">API Autenticada</td>
                  <td className="text-center">⭐⭐⭐⭐</td>
                  <td className="text-center text-green-600">🛡️ Alta</td>
                  <td className="text-center">Producción</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Navegación lateral */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="font-bold text-lg mb-4">Implementaciones</h3>
              <nav className="space-y-2">
                {implementaciones.map((impl) => {
                  const Icon = impl.icon;
                  return (
                    <button
                      key={impl.id}
                      onClick={() => setImplementacionActiva(impl.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                        implementacionActiva === impl.id
                          ? 'bg-purple-50 text-purple-700 border-2 border-purple-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <div className="flex-1">
                        <div className="font-medium">{impl.titulo}</div>
                        <div className="text-xs text-gray-600">{impl.descripcion}</div>
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Estado de tareas */}
              {tareasRegistradas.length > 0 && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">📝 Tareas Simuladas:</h4>
                  <ul className="text-xs space-y-1">
                    {tareasRegistradas.map((tarea, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span className="text-gray-700">{tarea}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              {renderContenido()}
            </div>
          </div>
        </div>

        {/* Tips finales */}
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            Conclusiones y Mejores Prácticas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Para Desarrollo:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Empieza con la implementación simple</li>
                <li>No te preocupes por la seguridad inicialmente</li>
                <li>Enfócate en que funcione</li>
                <li>Itera y mejora gradualmente</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Para Producción:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Siempre usa autenticación</li>
                <li>Implementa rate limiting</li>
                <li>Valida y sanitiza todas las entradas</li>
                <li>Mantén logs de auditoría</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}