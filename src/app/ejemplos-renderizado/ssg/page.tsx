// Este es el comportamiento POR DEFECTO en Next.js 13+
// La página se genera en tiempo de BUILD

import Breadcrumb from '@/components/Breadcrumb';

export default function EjemploSSG() {
  // Esta página se genera una vez al compilar
  const fechaGeneracion = new Date().toLocaleString('es-ES');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <Breadcrumb />
        </div>
      </header>

      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">SSG - Generación Estática</h1>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-gray-700">
            Esta página fue generada en: <strong>{fechaGeneracion}</strong>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            ✅ Súper rápida - HTML pregenerado<br/>
            ✅ Ideal para contenido que no cambia frecuentemente<br/>
            ✅ SEO optimizado<br/>
            ❌ No se actualiza hasta el próximo build
          </p>
        </div>
      </div>
    </div>
  );
}
