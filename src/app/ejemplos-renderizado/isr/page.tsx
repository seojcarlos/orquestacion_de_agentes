// ISR: Regenera la página cada X segundos
// Combina lo mejor de SSG y SSR

import Breadcrumb from '@/components/Breadcrumb';

// Revalida (regenera) cada 10 segundos
export const revalidate = 10;

async function obtenerDatos() {
  // Simulación de fetch a API
  const response = await fetch('https://api.github.com/repos/vercel/next.js', {
    // También puedes usar revalidate aquí
    next: { revalidate: 10 }
  });
  
  if (!response.ok) {
    return { stars: 'Error al cargar', lastUpdate: new Date().toLocaleString('es-ES') };
  }
  
  const data = await response.json();
  return {
    stars: data.stargazers_count,
    lastUpdate: new Date().toLocaleString('es-ES')
  };
}

export default async function EjemploISR() {
  const { stars, lastUpdate } = await obtenerDatos();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <Breadcrumb />
        </div>
      </header>

      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">ISR - Incremental Static Regeneration</h1>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-gray-700">
            Next.js tiene <strong>{stars}</strong> ⭐ en GitHub
          </p>
          <p className="text-gray-600 mt-2">
            Última actualización: <strong>{lastUpdate}</strong>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            (Se regenera máximo cada 10 segundos)
          </p>
          <p className="text-sm text-gray-600 mt-4">
            ✅ Combina velocidad de SSG con datos frescos<br/>
            ✅ Regenera en background<br/>
            ✅ Ideal para blogs, e-commerce<br/>
            ✅ Reduce carga del servidor
          </p>
        </div>
      </div>
    </div>
  );
}
