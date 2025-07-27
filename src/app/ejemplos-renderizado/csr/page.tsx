'use client'; // Marca el componente como Client Component

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

export default function EjemploCSR() {
  const [datos, setDatos] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [contador, setContador] = useState(0);

  useEffect(() => {
    // Este código se ejecuta SOLO en el navegador
    async function cargarDatos() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const data = await response.json();
        setDatos(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <Breadcrumb />
        </div>
      </header>

      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">CSR - Client-Side Rendering</h1>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-gray-700 mb-4">
            Esta página se renderiza completamente en el navegador
          </p>
          
          {/* Interactividad inmediata */}
          <button
            onClick={() => setContador(contador + 1)}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 mb-4"
          >
            Clicks: {contador}
          </button>

          {/* Datos cargados en el cliente */}
          <div className="mt-4">
            {cargando ? (
              <p>Cargando datos...</p>
            ) : datos ? (
              <div>
                <p>Usuario: <strong>{datos.name}</strong></p>
                <p>Email: {datos.email}</p>
              </div>
            ) : (
              <p>Error al cargar datos</p>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-4">
            ✅ Interactividad completa<br/>
            ✅ Ideal para SPAs y dashboards interactivos<br/>
            ❌ No es SEO-friendly (contenido no visible al cargar)<br/>
            ❌ Tiempo de carga inicial más lento
          </p>
        </div>
      </div>
    </div>
  );
}
