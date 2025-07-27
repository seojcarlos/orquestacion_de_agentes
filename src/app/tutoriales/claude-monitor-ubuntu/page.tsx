'use client';

export default function ClaudeMonitorUbuntu() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        🖥️ Cómo Conectar Claude Monitor en Ubuntu
      </h1>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-8">
        <p className="text-lg text-gray-700">
          Aprende los comandos básicos para lanzar Claude Monitor cada vez que abras tu terminal
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          📋 Comandos Básicos
        </h2>

        <div className="space-y-6">
          {/* Paso 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                1
              </span>
              <h3 className="text-xl font-semibold text-gray-800">
                Ir a tu carpeta del proyecto (opcional si ya estás ahí)
              </h3>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <code className="text-green-400 font-mono">
                cd ~/dev
              </code>
            </div>
            <p className="text-gray-600 mt-2 text-sm">
              Este paso es opcional si ya estás en la carpeta del proyecto
            </p>
          </div>

          {/* Paso 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                2
              </span>
              <h3 className="text-xl font-semibold text-gray-800">
                Activar el entorno virtual
              </h3>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <code className="text-green-400 font-mono">
                source venv/bin/activate
              </code>
            </div>
            <div className="mt-4 bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800">
                <strong>Verás algo así:</strong>
              </p>
              <code className="text-blue-600 font-mono">
                (venv) jcdia@Pc:~/dev$
              </code>
            </div>
          </div>

          {/* Paso 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                3
              </span>
              <h3 className="text-xl font-semibold text-gray-800">
                Ejecutar el monitor con tu plan
              </h3>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <code className="text-green-400 font-mono">
                claude-monitor --plan max5
              </code>
            </div>
            <div className="mt-4 bg-yellow-50 rounded-lg p-4">
              <p className="text-yellow-800">
                <strong>Para salir:</strong> Presiona <kbd className="bg-gray-200 px-2 py-1 rounded">Ctrl + C</kbd>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🚀 Resumen Rápido
        </h2>
        
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 text-white">
          <p className="mb-2 font-mono">$ cd ~/dev</p>
          <p className="mb-2 font-mono">$ source venv/bin/activate</p>
          <p className="mb-4 font-mono">$ claude-monitor --plan max5</p>
          <p className="text-gray-300 text-sm">
            Copia y pega estos comandos en orden cada vez que quieras usar Claude Monitor
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          💡 Tips Adicionales
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-2">
              Verificar el entorno virtual
            </h3>
            <p className="text-purple-700 text-sm">
              Si ves (venv) al inicio de tu línea de comandos, el entorno está activo
            </p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">
              Planes disponibles
            </h3>
            <p className="text-blue-700 text-sm">
              Puedes usar diferentes planes como max5, max10, etc., según tu suscripción
            </p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">
              Desactivar el entorno
            </h3>
            <p className="text-green-700 text-sm">
              Si necesitas desactivar el entorno virtual, simplemente escribe: deactivate
            </p>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4">
            <h3 className="font-semibold text-orange-800 mb-2">
              Primera vez
            </h3>
            <p className="text-orange-700 text-sm">
              Si es la primera vez, asegúrate de tener el entorno virtual creado y claude-monitor instalado
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}