# 🗺️ PLANTILLA PARA NUEVOS TUTORIALES CON CLAUDE FLOW

## 🤖 Desarrollo Asistido con Claude Flow

### Comandos Rápidos para Crear Tutoriales
```bash
# Generar estructura completa del tutorial
npx claude-flow@alpha tutorial create "[Nombre del Tutorial]" --interactive --examples

# Generar ejemplos de código automáticamente
npx claude-flow@alpha examples generate "[Tema]" --visual --react

# Crear demos interactivas
npx claude-flow@alpha demo build "[Concepto]" --typescript

# Analizar y mejorar tutorial existente
npx claude-flow@alpha review tutorial "[ruta]" --suggestions

# Generar tests para los ejemplos
npx claude-flow@alpha test generate "[tutorial-path]" --interactive
```

## Información del Tutorial
- **Nombre**: [Nombre del Tutorial]
- **Ruta**: `/tutoriales/[nombre-tutorial]`
- **Nivel**: [Principiante/Intermedio/Avanzado]
- **Tiempo estimado**: [XX min]
- **Icono**: [Nombre del icono de lucide-react]
- **Claude Flow Compatible**: ✅

## Estructura Requerida

### 1. Encabezado con Claude Flow Hook
```typescript
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { [Iconos necesarios], Bot, Sparkles, Code2 } from 'lucide-react';
import { useClaudeFlow } from '@/hooks/useClaudeFlow'; // Hook para Claude Flow

export default function TutorialNombre() {
  // Hook de Claude Flow para asistencia IA
  const { 
    generateExample, 
    analyzeCode, 
    getAISuggestions,
    runInteractiveDemo 
  } = useClaudeFlow();
```

### 2. Estado y Datos Mejorados
```typescript
const [estadoDemo, setEstadoDemo] = useState();
const [aiSuggestions, setAiSuggestions] = useState([]);
const [isGenerating, setIsGenerating] = useState(false);

const secciones = [
  {
    id: 'introduccion',
    titulo: 'Introducción',
    descripcion: 'Conceptos básicos',
    icono: BookOpen
  },
  {
    id: 'claude-flow',
    titulo: 'Con Claude Flow',
    descripcion: 'Desarrollo asistido por IA',
    icono: Bot
  },
  // ... más secciones
];
```

### 3. Controles Claude Flow
```jsx
{/* Barra de herramientas Claude Flow */}
<div className="mb-6 flex flex-wrap gap-3">
  <button
    onClick={async () => {
      setIsGenerating(true);
      const ejemplo = await generateExample(seccionActiva);
      setEstadoDemo(ejemplo);
      setIsGenerating(false);
    }}
    disabled={isGenerating}
    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
  >
    <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
    Generar Ejemplo con IA
  </button>
  
  <button
    onClick={() => analyzeCode()}
    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
  >
    <Code2 className="w-4 h-4" />
    Analizar Código
  </button>
  
  <button
    onClick={async () => {
      const sugerencias = await getAISuggestions(seccionActiva);
      setAiSuggestions(sugerencias);
    }}
    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
  >
    <Bot className="w-4 h-4" />
    Obtener Sugerencias
  </button>
</div>
```

### 4. Sección Claude Flow Dedicada
```jsx
{seccionActiva === 'claude-flow' && (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold mb-4">Desarrollo con Claude Flow</h2>
    
    {/* Explicación de beneficios */}
    <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
      <h3 className="font-semibold text-purple-900 mb-2">
        Cómo Claude Flow potencia este tutorial
      </h3>
      <ul className="list-disc list-inside space-y-2 text-purple-800">
        <li>Generación automática de ejemplos contextualizados</li>
        <li>Análisis de código con sugerencias de mejora</li>
        <li>Demos interactivas generadas por IA</li>
        <li>Tests automáticos para validar aprendizaje</li>
      </ul>
    </div>
    
    {/* Comandos específicos */}
    <div className="bg-gray-900 text-white p-4 rounded-lg">
      <p className="text-sm text-gray-400 mb-2">Comando para practicar:</p>
      <code className="text-green-400 block">
        npx claude-flow@alpha practice "[tema]" --interactive --hints
      </code>
    </div>
    
    {/* Demo de coordinación de agentes */}
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Agentes en Acción</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Bot className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-sm font-medium">Queen</p>
          <p className="text-xs text-gray-600">Coordinando</p>
        </div>
        {/* Más agentes... */}
      </div>
    </div>
  </div>
)}
```

## Componentes Mejorados con IA

### Box de Tips Inteligente
```jsx
<div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
  <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
    <AlertCircle className="w-5 h-5 text-yellow-600" />
    Tips Inteligentes
  </h2>
  {aiSuggestions.length > 0 && (
    <div className="mt-3 space-y-2">
      {aiSuggestions.map((tip, i) => (
        <div key={i} className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-yellow-600 mt-0.5" />
          <p className="text-sm">{tip}</p>
        </div>
      ))}
    </div>
  )}
</div>
```

### Demo Interactiva con Claude Flow
```jsx
<div className="bg-gray-50 rounded-lg p-4">
  <div className="flex items-center justify-between mb-3">
    <h3 className="font-semibold">🎮 Demo Interactiva</h3>
    <button
      onClick={() => runInteractiveDemo()}
      className="text-sm text-purple-600 hover:text-purple-700"
    >
      <Bot className="w-4 h-4 inline mr-1" />
      Asistente IA
    </button>
  </div>
  {/* Componente interactivo con asistencia IA */}
</div>
```

## Plantilla de Código con Análisis
```jsx
<div className="relative">
  <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
    <code>{ejemplo.codigo}</code>
  </pre>
  <button
    onClick={() => analyzeCode(ejemplo.codigo)}
    className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded"
  >
    <Code2 className="w-4 h-4" />
  </button>
</div>
```

## Checklist de Calidad Mejorado
- [ ] Header con navegación manual (sin Breadcrumb)
- [ ] Al menos una demo interactiva
- [ ] Ejemplos de código claros
- [ ] Sección de tips o errores comunes
- [ ] Navegación entre secciones funcionando
- [ ] Responsive en móvil
- [ ] Link de regreso a /tutoriales
- [ ] Colores consistentes con el tema
- [ ] **Hook useClaudeFlow implementado**
- [ ] **Sección Claude Flow incluida**
- [ ] **Botones de asistencia IA funcionales**
- [ ] **Al menos una demo generada por IA**

## ⚠️ PASO CRÍTICO: Actualización de Menús y Navegación
**Una vez completado el tutorial, OBLIGATORIAMENTE actualizar:**

### 1. Índice de Tutoriales (`/src/app/tutoriales/page.tsx`)
- [ ] Agregar entrada en el array `tutoriales`
- [ ] Especificar nivel, tiempo, icono y temas
- [ ] Verificar que el link funcione correctamente
- [ ] Agregar badge "IA" si usa Claude Flow

### 2. Menú Lateral (`/src/components/MenuLateral.tsx`)
- [ ] Agregar entrada en la sección correspondiente
- [ ] Usar el mismo título que el índice
- [ ] Verificar que la ruta sea exacta
- [ ] Agregar icono Bot si usa Claude Flow

### 3. Página Principal (`/src/app/page.tsx`)
- [ ] Si es tutorial destacado, agregar a "Recursos de Aprendizaje"
- [ ] Actualizar contador de tutoriales
- [ ] Verificar que la descripción sea atractiva
- [ ] Mencionar capacidades IA si aplica

### 4. Documentación del Proyecto
- [ ] Actualizar `/docs/README.md` con el nuevo tutorial
- [ ] Marcar como completado en la sección correspondiente
- [ ] Actualizar estructura de archivos
- [ ] Registrar en "Últimos Cambios"
- [ ] Documentar uso de Claude Flow

## Colores por Tipo
- **Principiante**: verde (`green`)
- **Intermedio**: naranja (`orange`) 
- **Avanzado**: rojo (`red`)
- **Con IA**: púrpura (`purple`)

## Ejemplo de Página en el Índice con Claude Flow
```typescript
{
  titulo: '[Título]',
  subtitulo: '[Subtítulo descriptivo]',
  descripcion: '[Descripción de una línea]',
  nivel: '[Principiante/Intermedio/Avanzado]',
  tiempo: '[XX min]',
  icon: [IconComponent],
  color: '[color]',
  link: '/tutoriales/[ruta]',
  temas: ['Tema 1', 'Tema 2', 'Tema 3', 'Claude Flow'],
  hasAI: true, // Indica que usa Claude Flow
  aiFeatures: ['Ejemplos generados', 'Análisis de código', 'Demos interactivas']
}
```

## 🚀 Comandos Claude Flow para Validación

```bash
# Validar que el tutorial cumple con los estándares
npx claude-flow@alpha validate tutorial "[ruta]" --comprehensive

# Generar documentación automática
npx claude-flow@alpha docs generate "[tutorial]" --format markdown

# Crear tests de integración
npx claude-flow@alpha test integration "[tutorial]" --e2e
```

## 📝 Notas Finales

- **Siempre** usar Claude Flow para generar ejemplos relevantes
- **Preferir** demos interactivas generadas por IA
- **Incluir** análisis de código en tiempo real cuando sea posible
- **Documentar** qué partes fueron asistidas por IA
- **Mantener** balance entre contenido manual y generado

---

**Tip Pro**: Usa `npx claude-flow@alpha tutorial review --suggestions` después de crear el tutorial para obtener ideas de mejora automáticas.
