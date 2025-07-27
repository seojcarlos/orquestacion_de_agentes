'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb() {
  const pathname = usePathname();
  
  // No mostrar breadcrumb en la página principal
  if (pathname === '/') return null;
  
  // Generar las partes del breadcrumb
  const pathSegments = pathname.split('/').filter(segment => segment);
  
  // Función para generar el nombre legible de cada segmento
  const getSegmentName = (segment: string, index: number) => {
    // Casos especiales para nombres más legibles
    const nameMap: { [key: string]: string } = {
      'tutoriales': 'Tutoriales',
      'ejemplos-renderizado': 'Ejemplos de Renderizado',
      'sintaxis-tsx': 'Sintaxis TSX',
      'hooks-react': 'Hooks de React',
      'estado-props': 'Estado y Props',
      'css-nextjs': 'CSS en Next.js',
      'gestion-proyecto': 'Gestión con IA',
      'sistema-rutas': 'Sistema de Rutas',
      'formularios': 'Formularios Avanzados',
      'asistente-inteligente': 'Asistente Inteligente',
      'claude-flow': 'Claude Flow',
      'ssg': 'SSG',
      'ssr': 'SSR',
      'isr': 'ISR',
      'csr': 'CSR',
      'comparacion': 'Comparación',
      'guia-analisis': 'Guía de Análisis'
    };
    
    // Si es un nombre muy largo (como el tutorial de Claude Flow), acortarlo
    if (segment.length > 50) {
      return 'Claude Flow Tutorial';
    }
    
    return nameMap[segment] || segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Generar la ruta acumulativa para cada segmento
  const generatePath = (index: number) => {
    return '/' + pathSegments.slice(0, index + 1).join('/');
  };
  
  return (
    <nav 
      className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2 text-sm">
        {/* Home */}
        <li>
          <Link 
            href="/" 
            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Ir al inicio"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        
        {/* Separador */}
        <li>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </li>
        
        {/* Segmentos de la ruta */}
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const segmentName = getSegmentName(segment, index);
          const path = generatePath(index);
          
          return (
            <React.Fragment key={path}>
              <li>
                {isLast ? (
                  // Último elemento (página actual) - no es un enlace
                  <span 
                    className="text-gray-900 font-medium"
                    aria-current="page"
                  >
                    {segmentName}
                  </span>
                ) : (
                  // Elementos intermedios - son enlaces
                  <Link 
                    href={path}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {segmentName}
                  </Link>
                )}
              </li>
              
              {/* Separador (excepto para el último elemento) */}
              {!isLast && (
                <li>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
