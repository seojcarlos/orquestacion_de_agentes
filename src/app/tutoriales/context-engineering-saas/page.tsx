'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Rocket, Database, CreditCard, Users, Shield, Code, ChevronRight, ChevronDown, ExternalLink } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export default function ContextEngineeringSaaS() {
  const [seccionAbierta, setSeccionAbierta] = useState<string | null>('que-es');

  const secciones = [
    {
      id: 'que-es',
      titulo: '🤔 ¿Qué es un SaaS?',
      contenido: (
        <div className="space-y-4">
          <p>
            <strong>SaaS = Software as a Service</strong> (Software como Servicio)
          </p>
          <p>
            Imagina que en vez de instalar Word en tu computadora, lo usas directamente desde el navegador y pagas una mensualidad. ¡Eso es SaaS!
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Ejemplos cotidianos de SaaS:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Netflix (pagas mensual, ves películas)</li>
              <li>Spotify (pagas mensual, escuchas música)</li>
              <li>Gmail (gratis o de pago, usas email)</li>
              <li>Zoom (videoconferencias)</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">¿Por qué hacer un SaaS?</h4>
            <ul className="space-y-2">
              <li>✅ <strong>Ingresos recurrentes</strong>: Cobras cada mes</li>
              <li>✅ <strong>Escalable</strong>: 1 o 1000 usuarios, mismo código</li>
              <li>✅ <strong>Actualizaciones fáciles</strong>: Cambias una vez, todos lo ven</li>
              <li>✅ <strong>Datos centralizados</strong>: Todo en un solo lugar</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'estructura',
      titulo: '🏗️ Estructura del Proyecto',
      contenido: (
        <div className="space-y-4">
          <p>Este proyecto usa tecnologías modernas. Te explico cada una:</p>
          
          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-600" />
                Next.js 14 (Framework)
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Es como los cimientos de una casa. Te da estructura para construir tu aplicación web.
              </p>
              <p className="text-sm mt-2">
                <strong>¿Por qué Next.js?</strong> Porque hace muchas cosas difíciles por ti (rutas, optimización, etc.)
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Database className="w-5 h-5 text-green-600" />
                Supabase (Base de datos + Autenticación)
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Donde guardas toda la información: usuarios, suscripciones, datos.
              </p>
              <p className="text-sm mt-2">
                <strong>¿Por qué Supabase?</strong> Es gratis para empezar y muy fácil de usar.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-600" />
                Stripe (Pagos)
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Para cobrar con tarjeta de crédito de forma segura.
              </p>
              <p className="text-sm mt-2">
                <strong>¿Por qué Stripe?</strong> Es el más usado y confiable para pagos online.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-600" />
                TypeScript
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                JavaScript pero con "entrenamiento". Te ayuda a evitar errores.
              </p>
              <p className="text-sm mt-2">
                <strong>Ejemplo:</strong> Si dices que edad es un número, no te deja poner "veinte".
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'carpetas',
      titulo: '📁 ¿Qué hay en cada carpeta?',
      contenido: (
        <div className="space-y-4">
          <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm overflow-x-auto">
{`context-engineering-saas/
├── 📁 app/              # Tu aplicación
│   ├── 📁 (auth)/       # Páginas de login/registro
│   ├── 📁 (dashboard)/  # Páginas privadas (usuarios logueados)
│   └── 📁 api/          # Endpoints (puntos de conexión)
│
├── 📁 components/       # Piezas reutilizables
│   ├── Header.tsx       # Barra de navegación
│   ├── Footer.tsx       # Pie de página
│   └── Button.tsx       # Botones personalizados
│
├── 📁 lib/              # Código auxiliar
│   ├── supabase.ts      # Conexión a base de datos
│   └── stripe.ts        # Configuración de pagos
│
└── 📁 public/           # Imágenes, iconos, etc.`}
          </pre>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">💡 Analogía simple:</h4>
            <p className="text-sm">
              Si tu app fuera una casa:
            </p>
            <ul className="text-sm mt-2 space-y-1">
              <li>• <strong>app/</strong> = Las habitaciones</li>
              <li>• <strong>components/</strong> = Los muebles (los usas en varias habitaciones)</li>
              <li>• <strong>lib/</strong> = Las herramientas (martillo, destornillador)</li>
              <li>• <strong>public/</strong> = Las decoraciones</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'flujo',
      titulo: '🔄 ¿Cómo funciona todo junto?',
      contenido: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-4">Flujo de un usuario nuevo:</h4>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <strong>Usuario llega a tu web</strong>
                  <p className="text-sm text-gray-600">Ve la landing page con precios y características</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <strong>Se registra</strong>
                  <p className="text-sm text-gray-600">Supabase guarda su email y contraseña (encriptada)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <strong>Elige un plan de pago</strong>
                  <p className="text-sm text-gray-600">Stripe procesa la tarjeta de forma segura</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
                <div>
                  <strong>Accede al dashboard</strong>
                  <p className="text-sm text-gray-600">Ve contenido exclusivo para suscriptores</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">5</div>
                <div>
                  <strong>Cada mes</strong>
                  <p className="text-sm text-gray-600">Stripe cobra automáticamente la suscripción</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">⚠️ Partes importantes de seguridad:</h4>
            <ul className="text-sm space-y-1">
              <li>• Nunca guardes contraseñas sin encriptar</li>
              <li>• Nunca manejes pagos tú mismo (usa Stripe)</li>
              <li>• Siempre verifica que el usuario esté logueado</li>
              <li>• Protege las rutas privadas</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'codigo',
      titulo: '💻 Código explicado (súper simple)',
      contenido: (
        <div className="space-y-4">
          <p>Vamos a ver algunos ejemplos de código explicados línea por línea:</p>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">1. Verificar si un usuario está logueado:</h4>
              <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm overflow-x-auto">
{`// Este código verifica si alguien inició sesión
const usuario = await supabase.auth.getUser();

if (!usuario) {
  // Si no hay usuario, lo mandamos a login
  return redirect('/login');
}

// Si hay usuario, puede ver la página
return <PaginaPrivada />;`}
              </pre>
              <p className="text-sm text-gray-600 mt-2">
                Es como un portero en un club: "¿Tienes entrada? Pasa. ¿No? Ve a comprarla."
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">2. Crear un nuevo usuario:</h4>
              <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm overflow-x-auto">
{`// Cuando alguien se registra
const { data, error } = await supabase.auth.signUp({
  email: 'juan@email.com',
  password: 'contraseña123'
});

if (error) {
  // Algo salió mal (email ya existe, contraseña débil, etc.)
  console.log("Error:", error.message);
} else {
  // ¡Usuario creado! Ahora puede entrar
  console.log("Bienvenido!");
}`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">3. Procesar un pago:</h4>
              <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm overflow-x-auto">
{`// Cuando alguien quiere suscribirse
const sesion = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],  // Acepta tarjetas
  line_items: [{
    price: 'precio_mensual_id',    // ID del plan en Stripe
    quantity: 1,
  }],
  mode: 'subscription',            // Cobra cada mes
  success_url: '/gracias',         // A dónde va si paga
  cancel_url: '/precios',          // A dónde va si cancela
});`}
              </pre>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'empezar',
      titulo: '🚀 ¿Cómo empiezo mi propio SaaS?',
      contenido: (
        <div className="space-y-4">
          <p>Aquí te doy los pasos exactos para empezar:</p>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Paso 1: Clonar el proyecto</h4>
              <pre className="bg-gray-800 text-white p-2 rounded text-sm">
{`git clone https://github.com/username/context-engineering-saas.git
cd context-engineering-saas
npm install`}
              </pre>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Paso 2: Configurar Supabase</h4>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>Ve a <a href="https://supabase.com" className="text-blue-600 underline">supabase.com</a></li>
                <li>Crea una cuenta gratis</li>
                <li>Crea un nuevo proyecto</li>
                <li>Copia las claves API</li>
                <li>Pégalas en tu archivo <code>.env.local</code></li>
              </ol>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Paso 3: Configurar Stripe</h4>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>Ve a <a href="https://stripe.com" className="text-blue-600 underline">stripe.com</a></li>
                <li>Crea una cuenta</li>
                <li>Usa el modo "Test" para probar</li>
                <li>Copia las claves API</li>
                <li>Agrégalas a <code>.env.local</code></li>
              </ol>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Paso 4: Ejecutar localmente</h4>
              <pre className="bg-gray-800 text-white p-2 rounded text-sm">
{`npm run dev`}
              </pre>
              <p className="text-sm mt-2">¡Abre http://localhost:3000 y ya tienes tu SaaS!</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
            <h4 className="font-semibold mb-2">💡 Ideas para tu SaaS:</h4>
            <ul className="text-sm space-y-1">
              <li>• Gestor de tareas para equipos</li>
              <li>• Plataforma de cursos online</li>
              <li>• Herramienta de facturas</li>
              <li>• Sistema de reservas</li>
              <li>• Newsletter de pago</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <Breadcrumb />
        </div>
      </header>

      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Rocket className="w-10 h-10 text-blue-600" />
            Context Engineering SaaS
          </h1>
          <p className="text-xl text-gray-600">
            Aprende a crear tu propio Software como Servicio desde cero
          </p>
          <a 
            href="https://github.com/seojcarlos/context-engineering-saas" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-800"
          >
            Ver código en GitHub <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Contenido en acordeón */}
        <div className="space-y-4">
          {secciones.map((seccion) => (
            <div key={seccion.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setSeccionAbierta(seccionAbierta === seccion.id ? null : seccion.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-xl font-semibold">{seccion.titulo}</h2>
                {seccionAbierta === seccion.id ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {seccionAbierta === seccion.id && (
                <div className="px-6 pb-6">
                  <div className="border-t pt-4">
                    {seccion.contenido}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">🎯 Resumen: ¿Qué aprendiste?</h3>
          <ul className="space-y-2 text-sm">
            <li>✅ Un SaaS es software que se usa por internet y se paga mensual</li>
            <li>✅ Necesitas: Next.js (estructura), Supabase (datos), Stripe (pagos)</li>
            <li>✅ La seguridad es súper importante (autenticación, pagos seguros)</li>
            <li>✅ Puedes empezar gratis y crecer poco a poco</li>
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
