'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Rocket, Zap, Image as ImageIcon, Package, Bot, Sparkles, 
  Code2, Play, AlertCircle, CheckCircle, Clock, FileCode, Activity, 
  Database, Globe, Loader2, ChevronRight, Eye, Settings, BarChart3, 
  Users, Monitor, Gauge, TrendingUp, Download, Wifi, Camera, Type,
  HardDrive, Timer, Target, Award
} from 'lucide-react';

// Hook Claude Flow simulado para análisis de performance
const useClaudeFlow = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [performanceScore, setPerformanceScore] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const analyzePerformance = async (type: string) => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const scores = {
      'images': 92,
      'bundle': 87,
      'lazy': 95,
      'fonts': 89,
      'caching': 94
    };
    
    const tipsByType = {
      'images': [
        "Usa next/image para optimización automática",
        "Configura placeholder='blur' para mejor UX",
        "Considera WebP/AVIF para menor tamaño",
        "Lazy loading automático con intersection observer"
      ],
      'bundle': [
        "Elimina dependencias no utilizadas",
        "Usa dynamic imports para code splitting",
        "Configura webpack bundle analyzer",
        "Optimiza tree shaking en producción"
      ],
      'lazy': [
        "React.lazy() para componentes pesados",
        "Suspense boundaries estratégicos",
        "Intersection Observer para scroll loading",
        "Prefetch crítico, lazy todo lo demás"
      ],
      'fonts': [
        "font-display: swap para evitar FOIT",
        "Preload fuentes críticas",
        "Usa Google Fonts con next/font",
        "Limita variantes de fuente"
      ],
      'caching': [
        "ISR para contenido dinámico",
        "SWR para datos del cliente",
        "Cache headers apropiados",
        "Service worker para assets estáticos"
      ]
    };
    
    setPerformanceScore(scores[type as keyof typeof scores] || 85);
    setSuggestions(tipsByType[type as keyof typeof tipsByType] || []);
    setIsAnalyzing(false);
  };
  
  const generateOptimizedCode = async (type: string) => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const examples = {
      'images': `// ✅ Optimizado con next/image
import Image from 'next/image';

function OptimizedGallery() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map(img => (
        <Image
          key={img.id}
          src={img.src}
          alt={img.alt}
          width={300}
          height={200}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,..."
          className="rounded-lg"
          priority={img.isAboveFold}
        />
      ))}
    </div>
  );
}`,
      'bundle': `// ✅ Code splitting con dynamic imports
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));
const Chart = lazy(() => import('./Chart'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Cargando...</div>}>
        <HeavyComponent />
      </Suspense>
      
      <Suspense fallback={<ChartSkeleton />}>
        <Chart data={data} />
      </Suspense>
    </div>
  );
}`,
      'lazy': `// ✅ Lazy loading con Intersection Observer
import { useEffect, useRef, useState } from 'react';

function LazySection({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={ref}>
      {isVisible ? children : <div className="h-64 bg-gray-200" />}
    </div>
  );
}`
    };
    
    setIsAnalyzing(false);
    return examples[type as keyof typeof examples] || examples.images;
  };
  
  return {
    analyzePerformance,
    generateOptimizedCode,
    isAnalyzing,
    performanceScore,
    suggestions
  };
};

// Hook para métricas de performance simuladas
const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState({
    lcp: 1.2,
    fid: 45,
    cls: 0.05,
    fcp: 0.9,
    ttfb: 180
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const measurePerformance = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simular mejoras después de optimización
    setMetrics({
      lcp: Math.random() * 1.5 + 0.8,
      fid: Math.random() * 60 + 20,
      cls: Math.random() * 0.08 + 0.02,
      fcp: Math.random() * 1.2 + 0.6,
      ttfb: Math.random() * 200 + 100
    });
    
    setIsLoading(false);
  };
  
  return { metrics, measurePerformance, isLoading };
};

export default function OptimizacionTutorial() {
  const [seccionActiva, setSeccionActiva] = useState('introduccion');
  const [demoActiva, setDemoActiva] = useState('before');
  
  const { 
    analyzePerformance, 
    generateOptimizedCode,
    isAnalyzing,
    performanceScore,
    suggestions 
  } = useClaudeFlow();
  
  const { metrics, measurePerformance, isLoading } = usePerformanceMetrics();

  const secciones = [
    { id: 'introduccion', titulo: 'Core Web Vitals', icono: Target },
    { id: 'images', titulo: 'Image Optimization', icono: ImageIcon },
    { id: 'bundle', titulo: 'Bundle Analysis', icono: Package },
    { id: 'lazy-loading', titulo: 'Lazy Loading', icono: Timer },
    { id: 'fonts', titulo: 'Font Optimization', icono: Type },
    { id: 'caching', titulo: 'Caching Strategies', icono: HardDrive },
    { id: 'claude-flow', titulo: 'Claude Flow Analysis', icono: Bot },
    { id: 'best-practices', titulo: 'Best Practices', icono: Award }
  ];

  const getMetricColor = (value: number, metric: string) => {
    const thresholds = {
      lcp: { good: 2.5, poor: 4.0 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      fcp: { good: 1.8, poor: 3.0 },
      ttfb: { good: 200, poor: 500 }
    };
    
    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'text-gray-600';
    
    if (value <= threshold.good) return 'text-green-600';
    if (value <= threshold.poor) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMetricScore = (value: number, metric: string) => {
    const thresholds = {
      lcp: { good: 2.5, poor: 4.0 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      fcp: { good: 1.8, poor: 3.0 },
      ttfb: { good: 200, poor: 500 }
    };
    
    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 50;
    
    if (value <= threshold.good) return 90;
    if (value <= threshold.poor) return 60;
    return 30;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Link 
                  href="/tutoriales"
                  className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Tutoriales</span>
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Optimización</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mt-2 flex items-center gap-3">
                <Rocket className="w-8 h-8 text-cyan-600" />
                Optimización en Next.js
                <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded-full">IA</span>
              </h1>
              <p className="text-gray-600 mt-2">
                Técnicas avanzadas para optimizar performance con análisis Claude Flow
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock className="w-4 h-4" />
              <span>45 min</span>
              <span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full text-xs font-medium">
                Avanzado
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Barra de herramientas Claude Flow */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => analyzePerformance(seccionActiva)}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
            {isAnalyzing ? 'Analizando...' : 'Análisis IA Performance'}
          </button>
          
          <button
            onClick={measurePerformance}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <Gauge className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Midiendo...' : 'Medir Performance'}
          </button>
          
          <button
            onClick={() => generateOptimizedCode(seccionActiva)}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            <Code2 className="w-4 h-4" />
            Generar Código Optimizado
          </button>
        </div>

        {/* Performance Score Display */}
        {performanceScore > 0 && (
          <div className="mb-6 bg-gradient-to-r from-purple-50 to-cyan-50 border border-purple-200 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-600" />
                Análisis Claude Flow Performance
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-green-600">{performanceScore}</span>
                <span className="text-sm text-gray-600">/100</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${performanceScore}%` }}
              />
            </div>
          </div>
        )}

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Navegación lateral */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Contenido del Tutorial</h2>
              <nav className="space-y-2">
                {secciones.map((seccion) => {
                  const Icon = seccion.icono;
                  return (
                    <button
                      key={seccion.id}
                      onClick={() => setSeccionActiva(seccion.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                        seccionActiva === seccion.id
                          ? 'bg-cyan-50 text-cyan-700 border-2 border-cyan-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{seccion.titulo}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Core Web Vitals Dashboard */}
              <div className="mt-6 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-600" />
                  Core Web Vitals
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">LCP:</span>
                    <span className={`text-xs font-bold ${getMetricColor(metrics.lcp, 'lcp')}`}>
                      {metrics.lcp.toFixed(1)}s
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">FID:</span>
                    <span className={`text-xs font-bold ${getMetricColor(metrics.fid, 'fid')}`}>
                      {Math.round(metrics.fid)}ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">CLS:</span>
                    <span className={`text-xs font-bold ${getMetricColor(metrics.cls, 'cls')}`}>
                      {metrics.cls.toFixed(3)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">FCP:</span>
                    <span className={`text-xs font-bold ${getMetricColor(metrics.fcp, 'fcp')}`}>
                      {metrics.fcp.toFixed(1)}s
                    </span>
                  </div>
                  
                  {/* Score general */}
                  <div className="pt-2 border-t border-cyan-200">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold">Score:</span>
                      <span className="text-sm font-bold text-cyan-600">
                        {Math.round((getMetricScore(metrics.lcp, 'lcp') + getMetricScore(metrics.fid, 'fid') + getMetricScore(metrics.cls, 'cls')) / 3)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sección: Introducción */}
            {seccionActiva === 'introduccion' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Target className="w-8 h-8 text-green-600" />
                    Core Web Vitals
                  </h2>
                  
                  <div className="prose max-w-none">
                    <p className="text-lg text-gray-700 mb-6">
                      Los <strong>Core Web Vitals</strong> son métricas de Google que miden la experiencia real 
                      del usuario y afectan directamente el SEO y conversiones.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                        <div className="flex items-center gap-3 mb-4">
                          <Timer className="w-8 h-8 text-blue-600" />
                          <h3 className="text-xl font-semibold text-blue-900">LCP</h3>
                        </div>
                        <p className="text-sm text-blue-800 mb-2">Largest Contentful Paint</p>
                        <p className="text-xs text-blue-700">
                          Tiempo hasta que el elemento más grande es visible
                        </p>
                        <div className="mt-3 text-xs">
                          <span className="text-green-600">✓ Bueno: &lt; 2.5s</span><br/>
                          <span className="text-yellow-600">⚠ Mejorar: 2.5-4s</span><br/>
                          <span className="text-red-600">✗ Malo: &gt; 4s</span>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                        <div className="flex items-center gap-3 mb-4">
                          <Zap className="w-8 h-8 text-green-600" />
                          <h3 className="text-xl font-semibold text-green-900">FID</h3>
                        </div>
                        <p className="text-sm text-green-800 mb-2">First Input Delay</p>
                        <p className="text-xs text-green-700">
                          Tiempo hasta que la página responde a la primera interacción
                        </p>
                        <div className="mt-3 text-xs">
                          <span className="text-green-600">✓ Bueno: &lt; 100ms</span><br/>
                          <span className="text-yellow-600">⚠ Mejorar: 100-300ms</span><br/>
                          <span className="text-red-600">✗ Malo: &gt; 300ms</span>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
                        <div className="flex items-center gap-3 mb-4">
                          <Activity className="w-8 h-8 text-purple-600" />
                          <h3 className="text-xl font-semibold text-purple-900">CLS</h3>
                        </div>
                        <p className="text-sm text-purple-800 mb-2">Cumulative Layout Shift</p>
                        <p className="text-xs text-purple-700">
                          Estabilidad visual - elementos que se mueven inesperadamente
                        </p>
                        <div className="mt-3 text-xs">
                          <span className="text-green-600">✓ Bueno: &lt; 0.1</span><br/>
                          <span className="text-yellow-600">⚠ Mejorar: 0.1-0.25</span><br/>
                          <span className="text-red-600">✗ Malo: &gt; 0.25</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg border border-cyan-200">
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-cyan-600" />
                        ¿Por qué importa la Performance?
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-semibold text-cyan-900 mb-2">Impacto en Negocio:</h4>
                          <ul className="space-y-1 text-cyan-800">
                            <li>• 1s más lento = 7% menos conversiones</li>
                            <li>• 53% usuarios abandonan si tarda &gt;3s</li>
                            <li>• 0.1s mejora = 1% más ingresos</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-cyan-900 mb-2">Impacto en SEO:</h4>
                          <ul className="space-y-1 text-cyan-800">
                            <li>• Core Web Vitals son factor de ranking</li>
                            <li>• Mejor UX = mayor tiempo en sitio</li>
                            <li>• Menos rebote = mejor posicionamiento</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sección: Image Optimization */}
            {seccionActiva === 'images' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <ImageIcon className="w-8 h-8 text-blue-600" />
                    Image Optimization
                  </h2>
                  
                  {/* Comparación Before/After */}
                  <div className="mb-8">
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => setDemoActiva('before')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          demoActiva === 'before' 
                            ? 'bg-red-600 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        ❌ Antes (img tag)
                      </button>
                      <button
                        onClick={() => setDemoActiva('after')}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          demoActiva === 'after' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        ✅ Después (next/image)
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          <Camera className="w-5 h-5" />
                          {demoActiva === 'before' ? 'Implementación Tradicional' : 'Next.js Optimizado'}
                        </h3>
                        
                        {demoActiva === 'before' ? (
                          <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-4">
                            <code>{`// ❌ HTML img tradicional
<img 
  src="/hero-image.jpg" 
  alt="Hero"
  style={{width: '100%', height: 'auto'}}
/>

// Problemas:
// - No lazy loading
// - No optimización de formato
// - No responsive images
// - Causa Layout Shift`}</code>
                          </pre>
                        ) : (
                          <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto mb-4">
                            <code>{`// ✅ Next.js Image optimizado
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={800}
  height={400}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  priority={true}
  className="rounded-lg"
/>

// Beneficios automáticos:
// - Lazy loading
// - WebP/AVIF automático
// - Responsive images
// - No Layout Shift`}</code>
                          </pre>
                        )}
                      </div>
                      
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-semibold mb-4">Métricas de Performance</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Tamaño archivo:</span>
                            <span className={`text-sm font-bold ${demoActiva === 'before' ? 'text-red-600' : 'text-green-600'}`}>
                              {demoActiva === 'before' ? '2.1 MB' : '342 KB'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Tiempo de carga:</span>
                            <span className={`text-sm font-bold ${demoActiva === 'before' ? 'text-red-600' : 'text-green-600'}`}>
                              {demoActiva === 'before' ? '3.8s' : '0.9s'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Layout Shift:</span>
                            <span className={`text-sm font-bold ${demoActiva === 'before' ? 'text-red-600' : 'text-green-600'}`}>
                              {demoActiva === 'before' ? '0.25' : '0.00'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Formato:</span>
                            <span className={`text-sm font-bold ${demoActiva === 'before' ? 'text-orange-600' : 'text-green-600'}`}>
                              {demoActiva === 'before' ? 'JPEG' : 'WebP'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                          <p className="text-xs text-blue-800">
                            <strong>Ahorro:</strong> {demoActiva === 'after' ? '84% menos peso, 76% más rápido' : 'Sin optimización'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Best practices */}
                  <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-blue-900">
                      Best Practices para Imágenes
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">Configuración:</h4>
                        <ul className="space-y-1 text-blue-700">
                          <li>• Usa <code>priority</code> para imágenes above-the-fold</li>
                          <li>• <code>placeholder="blur"</code> para mejor UX</li>
                          <li>• Tamaños apropiados con <code>sizes</code></li>
                          <li>• <code>quality={85}</code> para balance tamaño/calidad</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">Formatos:</h4>
                        <ul className="space-y-1 text-blue-700">
                          <li>• WebP: 30% más pequeño que JPEG</li>
                          <li>• AVIF: 50% más pequeño (soporte limitado)</li>
                          <li>• PNG solo para transparencias</li>
                          <li>• SVG para iconos y ilustraciones</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sección: Claude Flow */}
            {seccionActiva === 'claude-flow' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Bot className="w-8 h-8 text-purple-600" />
                    Claude Flow Performance Analysis
                  </h2>
                  
                  {/* Sugerencias de IA */}
                  {suggestions.length > 0 && (
                    <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg mb-6">
                      <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        Análisis Inteligente Completado
                      </h3>
                      <div className="space-y-2">
                        {suggestions.map((tip, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5" />
                            <p className="text-sm text-purple-800">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Demo de coordinación de agentes */}
                  <div className="bg-white p-6 rounded-lg shadow-md border">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Users className="w-6 h-6 text-purple-600" />
                      Agentes Claude Flow Trabajando
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Bot className="w-8 h-8 text-purple-600" />
                        </div>
                        <p className="text-sm font-medium">Queen Agent</p>
                        <p className="text-xs text-gray-600">Auditando performance</p>
                        <div className="mt-2 h-1 bg-purple-200 rounded">
                          <div className="h-full bg-purple-600 rounded w-4/5 animate-pulse"></div>
                        </div>
                      </div>
                      <div className="text-center p-4 bg-cyan-50 rounded-lg">
                        <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Code2 className="w-8 h-8 text-cyan-600" />
                        </div>
                        <p className="text-sm font-medium">Worker Agent</p>
                        <p className="text-xs text-gray-600">Optimizando código</p>
                        <div className="mt-2 h-1 bg-cyan-200 rounded">
                          <div className="h-full bg-cyan-600 rounded w-3/4 animate-pulse"></div>
                        </div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Eye className="w-8 h-8 text-green-600" />
                        </div>
                        <p className="text-sm font-medium">Knowledge Agent</p>
                        <p className="text-xs text-gray-600">Evaluando métricas</p>
                        <div className="mt-2 h-1 bg-green-200 rounded">
                          <div className="h-full bg-green-600 rounded w-5/6 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Comandos Claude Flow para performance */}
                  <div className="bg-gray-900 text-white p-4 rounded-lg mt-6">
                    <p className="text-sm text-gray-400 mb-2">Comandos para optimización automática:</p>
                    <div className="space-y-2">
                      <code className="text-green-400 block text-sm">
                        npx claude-flow@alpha analyze "src/app" --performance --images
                      </code>
                      <code className="text-cyan-400 block text-sm">
                        npx claude-flow@alpha optimize bundle --reduce-size --tree-shake
                      </code>
                      <code className="text-purple-400 block text-sm">
                        npx claude-flow@alpha audit lighthouse --mobile --comprehensive
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mensaje de estado de análisis */}
            {isAnalyzing && (
              <div className="fixed bottom-4 right-4 bg-purple-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Claude Flow analizando performance...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}