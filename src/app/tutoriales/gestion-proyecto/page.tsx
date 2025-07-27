'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, GitBranch, CheckSquare, AlertCircle, FolderOpen, RefreshCw, BookOpen, Code2 } from 'lucide-react';

export default function GestionProyecto() {
  const [seccionActiva, setSeccionActiva] = useState('documentacion');

  const secciones = [
    {
      id: 'documentacion',
      titulo: 'Sistema de Documentación',
      icono: FileText,
      descripcion: 'Cómo mantener el contexto entre sesiones',
      contenido: {
        explicacion: 'Usamos archivos markdown como "memoria" del proyecto para que cualquier desarrollador (humano o IA) pueda continuar donde se quedó.',
        estructura: `docs/
├── README.md              # Estado general del proyecto
├── como-continuar.md      # Guía para retomar el trabajo
├── plantilla-tutorial.md  # Template para nuevos tutoriales
└── tareas/
    └── YYYY-MM-DD-tareas.md  # Registro diario de cambios`,
        ejemplos: [
          {
            titulo: 'README.md principal',
            codigo: `# 📋 ESTADO DEL PROYECTO

## ✅ Componentes Completados
- [x] Página principal
- [x] Tutorial de Hooks
- [ ] Sistema de autenticación

## 🚧 Tareas Pendientes
### Alta Prioridad
1. Corregir bug en formulario de contacto
2. Implementar modo oscuro

## 🔄 Últimos Cambios (Fecha)
- Agregado tutorial de Hooks
- Corregido error de hidratación`
          },
          {
            titulo: 'Registro de tareas diarias',
            codigo: `# 📋 REGISTRO DE TAREAS - 24 JULIO 2025

## 🟢 COMPLETADAS HOY
### 1. Tutorial de Hooks
**Estado**: ✅ COMPLETADO
**Archivos**: /tutoriales/hooks-react/page.tsx
**Notas**: Incluye demos interactivas

## 🟡 EN PROGRESO
### 1. Sistema de rutas
**Estado**: 🔄 50% completado
**Pendiente**: Agregar ejemplos de middleware`
          }
        ]
      }
    },
    {
      id: 'flujo',
      titulo: 'Flujo de Trabajo',
      icono: GitBranch,
      descripcion: 'Proceso para mantener continuidad',
      contenido: {
        explicacion: 'Seguir este flujo garantiza que nunca se pierda el progreso y cualquiera pueda retomar el trabajo.',
        pasos: [
          {
            numero: 1,
            titulo: 'Inicio de Sesión',
            descripcion: 'Leer la documentación existente',
            acciones: [
              'Abrir /docs/README.md',
              'Revisar tareas pendientes',
              'Verificar últimos cambios'
            ]
          },
          {
            numero: 2,
            titulo: 'Selección de Tarea',
            descripcion: 'Elegir qué trabajar según prioridades',
            acciones: [
              'Consultar tareas por prioridad',
              'Verificar dependencias',
              'Estimar tiempo necesario'
            ]
          },
          {
            numero: 3,
            titulo: 'Implementación',
            descripcion: 'Desarrollar siguiendo las convenciones',
            acciones: [
              'Usar plantillas existentes',
              'Mantener estilo consistente',
              'Probar cambios'
            ]
          },
          {
            numero: 4,
            titulo: 'Documentación',
            descripcion: 'Actualizar registros antes de terminar',
            acciones: [
              'Actualizar README.md',
              'Crear registro del día',
              'Documentar problemas encontrados'
            ]
          }
        ]
      }
    },
    {
      id: 'plantillas',
      titulo: 'Uso de Plantillas',
      icono: BookOpen,
      descripcion: 'Templates para mantener consistencia',
      contenido: {
        explicacion: 'Las plantillas aseguran que todos los componentes sigan la misma estructura y estilo.',
        tipos: [
          {
            nombre: 'Tutorial',
            descripcion: 'Para crear nuevos tutoriales educativos',
            archivo: '/docs/plantilla-tutorial.md',
            caracteristicas: [
              'Header con navegación manual',
              'Grid layout 1/3 - 2/3',
              'Demos interactivas',
              'Sección de tips'
            ]
          },
          {
            nombre: 'Componente',
            descripcion: 'Para componentes reutilizables',
            caracteristicas: [
              'TypeScript interfaces',
              'Props bien documentadas',
              'Ejemplos de uso'
            ]
          },
          {
            nombre: 'API Route',
            descripcion: 'Para endpoints de Next.js',
            caracteristicas: [
              'Manejo de errores',
              'Validación de datos',
              'Respuestas consistentes'
            ]
          }
        ]
      }
    },
    {
      id: 'convenios',
      titulo: 'Convenciones del Proyecto',
      icono: CheckSquare,
      descripcion: 'Reglas para mantener calidad',
      contenido: {
        explicacion: 'Seguir estas convenciones hace el código más mantenible y fácil de entender.',
        reglas: [
          {
            categoria: 'Código',
            items: [
              "Usar TypeScript siempre",
              "'use client' para componentes interactivos",
              "Nombres descriptivos en español",
              "Comentarios para lógica compleja"
            ]
          },
          {
            categoria: 'Estilos',
            items: [
              "Tailwind CSS para todo",
              "Colores consistentes por nivel",
              "Mobile-first responsive",
              "Animaciones sutiles"
            ]
          },
          {
            categoria: 'Git',
            items: [
              "feat: para nuevas características",
              "fix: para correcciones",
              "docs: para documentación",
              "Commits descriptivos en español"
            ]
          },
          {
            categoria: 'Documentación',
            items: [
              "Actualizar README.md siempre",
              "Crear registro diario de tareas",
              "Documentar decisiones importantes",
              "Incluir ejemplos de uso"
            ]
          }
        ]
      }
    }
  ];

  const seccionSeleccionada = secciones.find(s => s.id === seccionActiva);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/tutoriales" className="hover:text-gray-900">
              Tutoriales
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Gestión del Proyecto</span>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <FolderOpen className="w-10 h-10 text-indigo-600" />
            Gestión del Proyecto con IA
          </h1>
          <p className="text-xl text-gray-600">
            Cómo mantener continuidad cuando trabajas con Claude u otras IAs
          </p>
        </div>

        {/* Problema y Solución */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            El Problema de la Memoria en IAs
          </h2>
          <p className="text-sm mb-3">
            Las IAs como Claude no mantienen memoria entre conversaciones. Cada sesión empieza desde cero.
          </p>
          <p className="text-sm font-semibold text-yellow-800">
            Solución: Sistema de documentación estructurada que sirve como "memoria externa" del proyecto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Navegación */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Secciones</h2>
            <div className="space-y-2">
              {secciones.map((seccion) => {
                const Icono = seccion.icono;
                return (
                  <button
                    key={seccion.id}
                    onClick={() => setSeccionActiva(seccion.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      seccionActiva === seccion.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icono className={`w-5 h-5 ${
                        seccionActiva === seccion.id ? 'text-indigo-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <h3 className="font-medium">{seccion.titulo}</h3>
                        <p className="text-xs text-gray-600 mt-1">
                          {seccion.descripcion}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contenido */}
          <div className="lg:col-span-2">
            {seccionSeleccionada && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  {React.createElement(seccionSeleccionada.icono, { className: "w-6 h-6 text-indigo-600" })}
                  {seccionSeleccionada.titulo}
                </h2>

                <p className="text-lg mb-6">{seccionSeleccionada.contenido.explicacion}</p>

                {/* Contenido específico por sección */}
                {seccionActiva === 'documentacion' && (
                  <>
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">📁 Estructura de Archivos</h3>
                      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{seccionSeleccionada.contenido.estructura}</code>
                      </pre>
                    </div>

                    <div className="space-y-6">
                      {seccionSeleccionada.contenido.ejemplos?.map((ejemplo, index) => (
                        <div key={index}>
                          <h4 className="font-medium mb-2">{ejemplo.titulo}</h4>
                          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{ejemplo.codigo}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {seccionActiva === 'flujo' && (
                  <div className="space-y-6">
                    {seccionSeleccionada.contenido.pasos?.map((paso) => (
                      <div key={paso.numero} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                          {paso.numero}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{paso.titulo}</h4>
                          <p className="text-sm text-gray-600 mb-2">{paso.descripcion}</p>
                          <ul className="space-y-1">
                            {paso.acciones.map((accion, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <span className="text-indigo-600">•</span>
                                {accion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {seccionActiva === 'plantillas' && (
                  <div className="space-y-6">
                    {seccionSeleccionada.contenido.tipos?.map((tipo, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">{tipo.nombre}</h4>
                        <p className="text-sm text-gray-600 mb-3">{tipo.descripcion}</p>
                        {tipo.archivo && (
                          <p className="text-sm bg-gray-100 px-2 py-1 rounded inline-block mb-3 font-mono">
                            {tipo.archivo}
                          </p>
                        )}
                        <ul className="space-y-1">
                          {tipo.caracteristicas.map((car, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <span className="text-green-600">✓</span>
                              {car}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {seccionActiva === 'convenios' && (
                  <div className="space-y-6">
                    {seccionSeleccionada.contenido.reglas?.map((regla, index) => (
                      <div key={index}>
                        <h4 className="font-semibold mb-3 text-indigo-600">{regla.categoria}</h4>
                        <ul className="space-y-2">
                          {regla.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckSquare className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Comando de ejemplo */}
        <div className="mt-8 bg-gray-900 text-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Comandos Útiles para IAs
          </h3>
          <pre className="text-sm">
            <code>{`# Al inicio de cada sesión:
filesystem:read_file path="/docs/README.md"
filesystem:read_file path="/docs/tareas/YYYY-MM-DD-tareas.md"

# Para continuar una tarea:
filesystem:list_directory path="/src/app/tutoriales"
filesystem:read_file path="/docs/plantilla-tutorial.md"

# Al finalizar:
filesystem:write_file path="/docs/tareas/YYYY-MM-DD-tareas.md"
# Actualizar con el registro del día`}</code>
          </pre>
        </div>

        {/* Beneficios */}
        <div className="mt-8 bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-green-600" />
            Beneficios de Este Sistema
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>Continuidad perfecta:</strong> Cualquier IA puede retomar exactamente donde quedó</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>Sin pérdida de contexto:</strong> Todo el progreso queda documentado</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>Trabajo en equipo:</strong> Múltiples desarrolladores/IAs pueden colaborar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>Historial completo:</strong> Registro de todas las decisiones y cambios</span>
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