// Para forzar SSR, usa funciones dinámicas o headers/cookies
import { headers } from 'next/headers';
import Breadcrumb from '@/components/Breadcrumb';

// Opción 1: Marcar la página como dinámica
export const dynamic = 'force-dynamic';

// Opción 2: Desactivar el caché
// export const revalidate = 0;

export default async function EjemploSSR() {
  // Esta función se ejecuta en cada petición
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || 'Unknown';
  const fechaActual = new Date().toLocaleString('es-ES');
  
  // Simulación de fetch a API
  const randomNumber = Math.floor(Math.random() * 100);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <Breadcrumb />
        </div>
      </header>

      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">SSR - Server-Side Rendering</h1>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-gray-700">
            Página generada en el servidor a las: <strong>{fechaActual}</strong>
          </p>
          <p className="text-gray-600 mt-2">
            Tu navegador: {userAgent.substring(0, 50)}...
          </p>
          <p className="text-gray-600">
            Número aleatorio del servidor: <strong>{randomNumber}</strong>
          </p>
          <p className="text-sm text-gray-600 mt-4">
            ✅ Datos siempre actualizados<br/>
            ✅ Puede acceder a cookies/headers<br/>
            ✅ Ideal para dashboards/datos en tiempo real<br/>
            ❌ Más lento que SSG (genera HTML en cada petición)
          </p>
        </div>
      </div>
    </div>
  );
}
