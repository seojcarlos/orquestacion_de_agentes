'use client'

import { FileText, Shield, Eye, EyeOff, AlertTriangle, CheckCircle, XCircle, Copy, Terminal, GitBranch, FolderX, Key, Database, Settings } from 'lucide-react'
import { useState } from 'react'

export default function GitignoreCorrectPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  const gitignoreCompleto = `# 🔐 CONFIGURACIÓN DE SEGURIDAD Y ENTORNO
# Variables de entorno (CRÍTICO - nunca compartir)
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env.*.local

# Configuraciones sensibles
config/secrets.json
config/database.config.js
*.config.secret.*

# 🗂️ ARCHIVOS DE SISTEMA Y TEMPORALES
# Logs del sistema
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*

# Archivos de sistema operativo
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
desktop.ini

# Archivos temporales
*.tmp
*.temp
.cache/
.tmp/

# 📦 DEPENDENCIAS Y BUILD
# Node.js
node_modules/
npm-cache/
.npm/
.node_repl_history

# Yarn
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*

# Build outputs
dist/
build/
out/
.next/
.nuxt/
.vuepress/dist

# 🗄️ BASES DE DATOS Y ALMACENAMIENTO
# SQLite
*.db
*.sqlite
*.sqlite3
*.db-journal

# Otros archivos de BD
*.mdb
*.accdb
.database/

# 🔧 HERRAMIENTAS DE DESARROLLO
# IDEs y editores
.vscode/settings.json
.vscode/launch.json
.vscode/extensions.json
.idea/
*.swp
*.swo
*~

# Testing
coverage/
.nyc_output/
test-results/
.jest/

# 📊 DATOS Y BACKUPS
# Datos de usuario local
data/
backups/
uploads/
user-data/

# Archivos de progreso personal
progress.json
user-progress.json
*.backup

# 🚀 DEPLOYMENT Y CI/CD
# Vercel
.vercel/

# Docker
.dockerignore
docker-compose.override.yml

# CI/CD secrets
.github/secrets/
.circleci/secrets/

# 🎯 ESPECÍFICO DEL PROYECTO ORQUESTACIÓN DE AGENTES
# Progreso personal (se guarda en localStorage)
# academia-progress.json
# agency-progress.json

# Datos de agentes (sensibles si conectas APIs reales)
# mi-agencia-ia/data/
# mi-agencia-ia/memory/
# mi-agencia-ia/cache/

# APIs keys si las usas
# openai.key
# claude.key
# anthropic.key`

  const comandosEsenciales = [
    {
      comando: 'git status',
      descripcion: 'Ver qué archivos están siendo rastreados o ignorados',
      ejemplo: 'git status --ignored'
    },
    {
      comando: 'git rm --cached',
      descripcion: 'Quitar archivo del tracking sin eliminarlo',
      ejemplo: 'git rm --cached .env'
    },
    {
      comando: 'git ls-files',
      descripcion: 'Ver todos los archivos que Git está rastreando',
      ejemplo: 'git ls-files | findstr ".env"'
    },
    {
      comando: 'git check-ignore',
      descripcion: 'Verificar si un archivo está siendo ignorado',
      ejemplo: 'git check-ignore .env'
    }
  ]

  const erroresComunes = [
    {
      error: 'Archivo .env sigue apareciendo en git status',
      causa: 'El archivo ya estaba siendo rastreado antes de agregarlo al .gitignore',
      solucion: 'git rm --cached .env && git commit -m "Remove .env from tracking"'
    },
    {
      error: 'Node_modules sigue subiendo a GitHub',
      causa: 'Falta node_modules/ en .gitignore o ya está en el repo',
      solucion: 'Agregar node_modules/ al .gitignore y hacer git rm -r --cached node_modules/'
    },
    {
      error: '.gitignore no funciona',
      causa: 'Archivo .gitignore mal ubicado o con sintaxis incorrecta',
      solucion: 'Ubicar .gitignore en la raíz del proyecto y verificar sintaxis'
    },
    {
      error: 'Archivos sensibles ya están en GitHub',
      causa: 'Se subieron antes de configurar .gitignore',
      solucion: 'git rm --cached archivo && considerar rotar credenciales'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 rounded-lg mb-8">
          <div className="px-6 py-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="h-12 w-12 text-green-500" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent leading-tight">
                .gitignore Correcto
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-center leading-relaxed">
              Tutorial completo para proteger tu código y datos sensibles. 
              <span className="text-red-500 font-semibold"> ¡Evita subir .env y datos personales a GitHub!</span>
            </p>
          </div>
        </header>

        <div className="space-y-8">
        {/* Problema Actual */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <h2 className="text-2xl font-bold text-red-600">🚨 Problema Detectado en tu Proyecto</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-red-700 mb-2">Lo que está pasando:</h3>
              <ul className="space-y-1 text-red-600">
                <li>• Tienes un archivo <code className="bg-red-100 px-2 py-1 rounded">.env</code></li>
                <li>• Puede contener datos sensibles</li>
                <li>• Podría subirse a GitHub accidentalmente</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-700 mb-2">✅ Buenas noticias:</h3>
              <ul className="space-y-1 text-green-600">
                <li>• Tu .env NO está siendo rastreado por Git</li>
                <li>• Tu .gitignore funciona correctamente</li>
                <li>• Solo necesitas mejorarlo</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ¿Qué es .gitignore? */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <EyeOff className="h-6 w-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800">¿Qué es .gitignore?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <FileText className="h-8 w-8 text-blue-500 mb-3" />
              <h3 className="font-semibold mb-2 text-gray-800">Archivo de Configuración</h3>
              <p className="text-gray-600 text-sm">
                Archivo especial que le dice a Git qué archivos NO debe rastrear ni subir al repositorio.
              </p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <Shield className="h-8 w-8 text-yellow-500 mb-3" />
              <h3 className="font-semibold mb-2 text-gray-800">Protección Automática</h3>
              <p className="text-gray-600 text-sm">
                Evita automáticamente que datos sensibles como API keys, passwords y datos personales lleguen a GitHub.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <Settings className="h-8 w-8 text-green-500 mb-3" />
              <h3 className="font-semibold mb-2 text-gray-800">Limpieza del Repo</h3>
              <p className="text-gray-600 text-sm">
                Mantiene el repositorio limpio sin archivos temporales, builds o dependencias.
              </p>
            </div>
          </div>
        </div>

        {/* .gitignore Completo y Mejorado */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl font-bold text-gray-800">.gitignore Completo para tu Proyecto</h2>
            </div>
            <button
              onClick={() => copyToClipboard(gitignoreCompleto, 'gitignore')}
              className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Copy className="h-4 w-4" />
              {copiedSection === 'gitignore' ? '¡Copiado!' : 'Copiar Todo'}
            </button>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-green-400">
              <code>{gitignoreCompleto}</code>
            </pre>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-700 mb-2">📝 Cómo actualizar tu .gitignore:</h3>
            <ol className="text-blue-600 space-y-1">
              <li>1. Copia el contenido completo de arriba</li>
              <li>2. Abre tu archivo <code className="bg-blue-100 px-1 rounded">.gitignore</code></li>
              <li>3. Reemplaza todo el contenido con esta versión mejorada</li>
              <li>4. Guarda el archivo</li>
            </ol>
          </div>
        </div>

        {/* Comandos Esenciales */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="h-6 w-6 text-cyan-500" />
            <h2 className="text-2xl font-bold text-gray-800">Comandos Esenciales de Git</h2>
          </div>
          <div className="grid gap-4">
            {comandosEsenciales.map((cmd, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-cyan-600 font-mono">{cmd.comando}</code>
                  <button
                    onClick={() => copyToClipboard(cmd.ejemplo, `cmd-${index}`)}
                    className="text-xs bg-cyan-100 hover:bg-cyan-200 text-cyan-700 px-2 py-1 rounded transition-colors"
                  >
                    {copiedSection === `cmd-${index}` ? '✓' : 'Copiar'}
                  </button>
                </div>
                <p className="text-gray-600 text-sm mb-2">{cmd.descripcion}</p>
                <div className="bg-gray-900 rounded p-2">
                  <code className="text-green-400 text-sm">{cmd.ejemplo}</code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Errores Comunes */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-800">Errores Comunes y Soluciones</h2>
          </div>
          <div className="space-y-4">
            {erroresComunes.map((error, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-600 mb-1">{error.error}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      <span className="text-orange-600">Causa:</span> {error.causa}
                    </p>
                    <div className="bg-gray-900 rounded p-2">
                      <span className="text-green-400 text-sm font-mono">{error.solucion}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verificación para tu Proyecto */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-800">Verificación para tu Proyecto</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-700 mb-3">✅ Ejecuta estos comandos:</h3>
              <div className="space-y-2">
                <div className="bg-gray-900 rounded p-2">
                  <code className="text-green-400 text-sm">git status</code>
                </div>
                <div className="bg-gray-900 rounded p-2">
                  <code className="text-green-400 text-sm">git check-ignore .env</code>
                </div>
                <div className="bg-gray-900 rounded p-2">
                  <code className="text-green-400 text-sm">git ls-files | findstr ".env"</code>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-blue-700 mb-3">🎯 Resultados esperados:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• .env NO debe aparecer en "Changes to be committed"</li>
                <li>• git check-ignore debe decir que .env está ignorado</li>
                <li>• git ls-files NO debe mostrar .env</li>
                <li>• node_modules/ tampoco debe aparecer</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Datos Específicos del Proyecto */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="h-6 w-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-800">Protección de Datos del Proyecto Orquestación de Agentes</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-700 mb-3">✅ Datos que SÍ se guardan en Git:</h3>
              <ul className="space-y-1 text-green-600 text-sm">
                <li>• Código fuente (.tsx, .ts, .js)</li>
                <li>• Configuraciones públicas</li>
                <li>• Documentación (.md)</li>
                <li>• Estructura del proyecto</li>
                <li>• Scripts de desarrollo</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-700 mb-3">🚫 Datos que NO se guardan (protegidos):</h3>
              <ul className="space-y-1 text-red-600 text-sm">
                <li>• Tu progreso personal (.env con configuraciones)</li>
                <li>• API keys (OpenAI, Claude, etc.)</li>
                <li>• Bases de datos locales (.sqlite)</li>
                <li>• node_modules/ (dependencias)</li>
                <li>• Archivos temporales y logs</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-700 mb-2">💡 Tu progreso se mantiene local:</h3>
            <p className="text-blue-600 text-sm">
              Como explicamos en la documentación, tu progreso real se guarda en localStorage del navegador, 
              no en archivos que Git pueda rastrear. Esto significa que es completamente privado y seguro.
            </p>
          </div>
        </div>

        {/* Pasos Siguientes */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <GitBranch className="h-6 w-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-800">Próximos Pasos</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-700 mb-2">1. Actualizar .gitignore</h3>
              <p className="text-gray-600 text-sm">Copia el .gitignore completo de este tutorial</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-700 mb-2">2. Verificar configuración</h3>
              <p className="text-gray-600 text-sm">Ejecuta los comandos de verificación</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-700 mb-2">3. Continuar desarrollo</h3>
              <p className="text-gray-600 text-sm">Tu proyecto está protegido y listo</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
