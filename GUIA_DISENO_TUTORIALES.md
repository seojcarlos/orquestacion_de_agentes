# 🎨 GUÍA DE DISEÑO PARA TUTORIALES

## 📋 Reglas de Consistencia Visual

### 🎯 **ESTRUCTURA OBLIGATORIA PARA TODOS LOS TUTORIALES**

#### **1. Fondo Principal**
```tsx
// ✅ CORRECTO - Fondo blanco/gris claro para tutoriales
<div className="min-h-screen bg-slate-50">
  <div className="max-w-6xl mx-auto p-6">
    {/* Contenido */}
  </div>
</div>

// ❌ INCORRECTO - Fondos oscuros o con gradientes llamativos
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
```

#### **2. Header del Tutorial**
```tsx
// ✅ ESTRUCTURA OBLIGATORIA
<header className="bg-white shadow-sm border-b border-slate-200 rounded-lg mb-8">
  <div className="px-6 py-8">
    <div className="flex items-center justify-center gap-3 mb-6">
      <IconComponent className="h-12 w-12 text-[color-tema]" />
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[color1] to-[color2] bg-clip-text text-transparent leading-tight">
        Título del Tutorial
      </h1>
    </div>
    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-center leading-relaxed">
      Descripción del tutorial
    </p>
  </div>
</header>
```

**⚠️ IMPORTANTE**: 
- Usar `py-8` en lugar de `py-4` para evitar que se corten las letras
- Agregar `leading-tight` al título para mejor espaciado
- Usar `mb-6` en lugar de `mb-4` para más separación
- Agregar `leading-relaxed` al párrafo descriptivo

#### **3. Secciones de Contenido**
```tsx
// ✅ SECCIONES PRINCIPALES - Fondo blanco
<div className="bg-white rounded-xl shadow-md p-6">
  <div className="flex items-center gap-3 mb-4">
    <Icon className="h-6 w-6 text-[color-tema]" />
    <h2 className="text-2xl font-bold text-gray-800">Título de Sección</h2>
  </div>
  {/* Contenido */}
</div>

// ✅ SECCIONES DE ALERTA - Colores específicos
<div className="bg-red-50 border border-red-200 rounded-xl p-6">
  {/* Contenido de alerta/problema */}
</div>

<div className="bg-green-50 border border-green-200 rounded-xl p-6">
  {/* Contenido de éxito/buenas prácticas */}
</div>

<div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
  {/* Contenido informativo */}
</div>
```

### 🎨 **PALETA DE COLORES ESTÁNDAR**

#### **Colores de Tema por Categoría:**
- **Básicos**: Verde (`text-green-500`, `border-green-200`)
- **Intermedios**: Azul (`text-blue-500`, `border-blue-200`)  
- **Avanzados**: Púrpura (`text-purple-500`, `border-purple-200`)
- **Especiales**: Naranja (`text-orange-500`, `border-orange-200`)

#### **Estados y Alertas:**
- **Error/Problema**: Rojo (`bg-red-50`, `border-red-200`, `text-red-600`)
- **Éxito/Correcto**: Verde (`bg-green-50`, `border-green-200`, `text-green-600`)
- **Información**: Azul (`bg-blue-50`, `border-blue-200`, `text-blue-600`)
- **Advertencia**: Amarillo (`bg-yellow-50`, `border-yellow-200`, `text-yellow-600`)

#### **Código y Terminal:**
- **Fondo de código**: `bg-gray-900`
- **Texto de código**: `text-green-400` para comandos exitosos
- **Texto de error**: `text-red-400` para errores
- **Texto neutral**: `text-gray-300` para comentarios

### 📦 **COMPONENTES REUTILIZABLES**

#### **Botón de Copiar**
```tsx
<button
  onClick={() => copyToClipboard(content, id)}
  className="flex items-center gap-2 bg-[tema]-500 hover:bg-[tema]-600 text-white px-4 py-2 rounded-lg transition-colors"
>
  <Copy className="h-4 w-4" />
  {copied ? '¡Copiado!' : 'Copiar'}
</button>
```

#### **Bloque de Código**
```tsx
<div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
  <pre className="text-sm text-green-400">
    <code>{codigo}</code>
  </pre>
</div>
```

#### **Grid de Características**
```tsx
<div className="grid md:grid-cols-3 gap-6">
  <div className="bg-[color]-50 border border-[color]-200 rounded-lg p-4">
    <Icon className="h-8 w-8 text-[color]-500 mb-3" />
    <h3 className="font-semibold mb-2 text-gray-800">Título</h3>
    <p className="text-gray-600 text-sm">Descripción</p>
  </div>
  {/* Más elementos */}
</div>
```

---

## 🚨 **DIFERENCIAS PERMITIDAS POR SECCIÓN**

### **📚 Tutoriales** - Fondo BLANCO
- Diseño limpio y profesional
- Foco en la legibilidad y aprendizaje
- Colores suaves y contrastados

### **🏢 Agencia Digital IA** - Fondo PÚRPURA/OSCURO (PERMITIDO)
- Puede usar fondos oscuros para diferenciarse
- Representa un entorno más profesional/empresarial
- Gradientes y efectos visuales están permitidos

### **🧪 Playground** - FLEXIBLE
- Puede experimentar con diferentes estilos
- Representar entorno de desarrollo/experimental

---

## ✅ **CHECKLIST ANTES DE CREAR UN TUTORIAL**

- [ ] ¿Usa `bg-slate-50` como fondo principal?
- [ ] ¿Tiene header blanco con `bg-white shadow-sm`?
- [ ] ¿Las secciones usan `bg-white rounded-xl shadow-md`?
- [ ] ¿Los colores siguen la paleta estándar?
- [ ] ¿Los bloques de código usan `bg-gray-900`?
- [ ] ¿Los iconos tienen el color del tema?
- [ ] ¿Es consistente con otros tutoriales?

---

## 🔧 **CÓMO CORREGIR UN TUTORIAL EXISTENTE**

### **1. Cambiar Fondo Principal**
```tsx
// Buscar y reemplazar:
// De: bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white
// A: bg-slate-50

// De: <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
// A: <div className="min-h-screen bg-slate-50">
//    <div className="max-w-6xl mx-auto p-6">
```

### **2. Agregar Header Estándar**
```tsx
<header className="bg-white shadow-sm border-b border-slate-200 rounded-lg mb-8">
  <div className="px-6 py-4">
    {/* Contenido del header */}
  </div>
</header>
```

### **3. Convertir Secciones**
```tsx
// De: bg-slate-800/50
// A: bg-white rounded-xl shadow-md

// De: text-white
// A: text-gray-800 (para títulos) o text-gray-600 (para texto)
```

---

## 📝 **PLANTILLA BASE PARA NUEVOS TUTORIALES**

```tsx
'use client'

import { Icon1, Icon2, Copy } from 'lucide-react'
import { useState } from 'react'

export default function MiTutorialPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 rounded-lg mb-8">
          <div className="px-6 py-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Icon1 className="h-12 w-12 text-purple-500" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight">
                Mi Tutorial
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-center leading-relaxed">
              Descripción del tutorial
            </p>
          </div>
        </header>

        <div className="space-y-8">
        {/* Secciones del tutorial */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Icon2 className="h-6 w-6 text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-800">Sección</h2>
          </div>
          {/* Contenido */}
        </div>
        </div>
      </div>
    </div>
  )
}
```

---

**💡 RECUERDA**: La consistencia visual es clave para una buena experiencia de usuario. Los tutoriales deben verse profesionales y ser fáciles de leer.
