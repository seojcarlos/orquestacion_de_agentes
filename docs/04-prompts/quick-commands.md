# 🚀 **COMANDOS RÁPIDOS - CLAUDE CODE**

> **Para ejecutar cuando tengas tokens disponibles**  
> **Copiar y pegar directamente en terminal**

---

## 🔧 **VERIFICAR CONFIGURACIÓN**

```powershell
# Verificar que todo está bien configurado
echo $env:CLAUDE_CODE_MAX_OUTPUT_TOKENS    # Debe mostrar: 30000
echo $env:CLAUDE_CODE_AUTO_CONTINUE        # Debe mostrar: true
echo $env:CLAUDE_CODE_CONTINUE_ON_ERROR    # Debe mostrar: true
```

**Si no aparece 30000**, ejecutar:
```powershell
setx CLAUDE_CODE_MAX_OUTPUT_TOKENS "30000"
setx CLAUDE_CODE_AUTO_CONTINUE "true"  
setx CLAUDE_CODE_CONTINUE_ON_ERROR "true"
```

⚠️ **NOTA IMPORTANTE**: El error que tuviste fue porque intentamos generar >32k tokens de una vez. 
**SOLUCIÓN**: Ahora cada comando genera máximo 15k tokens. ✅

---

## 📋 **COMANDOS PARA CADA DÍA**

### **🎯 F1-M1-S1-D1 - PARTE 1: Estructura Base (4k tokens)**
```bash
claude-code "CREAR ESTRUCTURA BASE F1-M1-S1-D1

TAREA: 'Setup inicial del proyecto + Principios Clean Code'
ARCHIVO: src/app/agencia/mes-1/semana-1/dia-1/page.tsx

CREAR SOLAMENTE:
1. Imports necesarios (React, Next.js, componentes UI)
2. Header dinámico con task info y progreso  
3. Navegación entre secciones
4. Progress tracker
5. Estructura de componentes (sin contenido interno)

COMPONENTES A CREAR (estructura vacía):
- TaskHeader con info F1-M1-S1-D1
- TheorySection (solo estructura)
- ExamplesSection (solo estructura) 
- PracticeSection (solo estructura)
- EvaluationSection (solo estructura)

TECNOLOGÍAS: Next.js 14, React, TypeScript, shadcn/ui
LÍMITE: 4000 tokens máximo

NO INCLUIR: Contenido de teoría, ejemplos, o evaluación (viene en siguientes llamadas)"
```

### **🎯 F1-M1-S1-D1 - PARTE 2: Teoría Expandida (15k tokens)**
```bash
claude-code "COMPLETAR TEORÍA EXPANDIDA F1-M1-S1-D1

ARCHIVO EXISTENTE: src/app/agencia/mes-1/semana-1/dia-1/page.tsx

COMPLETAR SECCIÓN TheorySection CON:
1. Fundamentos profundos de setup de proyectos (400 palabras)
2. Principios Clean Code para IA (400 palabras)  
3. Casos de producción real (OpenAI, Google) (400 palabras)
4. Historia y evolución (200 palabras)

TOTAL: 1400+ palabras nivel universitario
LÍMITE: 15000 tokens máximo

MANTENER: Estructura existente, solo completar contenido de teoría"
```

### **🎯 F1-M1-S1-D1 - PARTE 3: Ejemplos + Práctica (15k tokens)**
```bash
claude-code "COMPLETAR EJEMPLOS Y PRÁCTICA F1-M1-S1-D1

ARCHIVO EXISTENTE: src/app/agencia/mes-1/semana-1/dia-1/page.tsx

COMPLETAR:
1. ExamplesSection con 4 ejemplos progresivos
2. PracticeSection con simuladores interactivos
3. Componentes React funcionales

EJEMPLOS:
- Básico: Setup proyecto simple
- Intermedio: Estructura profesional
- Avanzado: Configuración empresarial
- Producción: Setup como OpenAI/Google

LÍMITE: 15000 tokens máximo"
```

### **🎯 F1-M1-S1-D1 - PARTE 4: Evaluación + Cierre (8k tokens)**
```bash
claude-code "COMPLETAR EVALUACIÓN Y CIERRE F1-M1-S1-D1

ARCHIVO EXISTENTE: src/app/agencia/mes-1/semana-1/dia-1/page.tsx

COMPLETAR:
1. EvaluationSection con quiz adaptativo
2. AICodeReview component
3. MiniProject específico
4. Progress tracking final
5. Cierre y métricas

LÍMITE: 8000 tokens máximo
RESULTADO: Archivo completo funcional"
```

### **🎯 F1-M1-S1-D2 - PARTE 1: Estructura Base**
```bash
claude-code "CREAR ESTRUCTURA BASE F1-M1-S1-D2

TAREA: 'Estructura de directorios + Configuración Git'
ARCHIVO: src/app/agencia/mes-1/semana-1/dia-2/page.tsx

CREAR SOLAMENTE estructura de componentes básica con navegación.
LÍMITE: 4000 tokens máximo"
```

### **🎯 F1-M1-S1-D2 - PARTE 2: Teoría**
```bash
claude-code "COMPLETAR TEORÍA F1-M1-S1-D2

ARCHIVO EXISTENTE: src/app/agencia/mes-1/semana-1/dia-2/page.tsx

COMPLETAR TheorySection con:
- Arquitecturas de directorios para proyectos IA
- Mejores prácticas Git para equipos IA
- Casos reales OpenAI/Hugging Face
- Convenciones industria

LÍMITE: 15000 tokens máximo"
```

### **🎯 F1-M1-S1-D2 - PARTE 3: Ejemplos + Práctica**
```bash
claude-code "COMPLETAR EJEMPLOS Y PRÁCTICA F1-M1-S1-D2

ARCHIVO EXISTENTE: src/app/agencia/mes-1/semana-1/dia-2/page.tsx

4 ejemplos progresivos + simuladores interactivos.
LÍMITE: 15000 tokens máximo"
```

### **🎯 F1-M1-S1-D2 - PARTE 4: Evaluación**
```bash
claude-code "COMPLETAR EVALUACIÓN F1-M1-S1-D2

ARCHIVO EXISTENTE: src/app/agencia/mes-1/semana-1/dia-2/page.tsx

Quiz + evaluación IA + cierre completo.
LÍMITE: 8000 tokens máximo"
```

### **🎯 F1-M1-S1-D4 - PARTE 1: Estructura Base**
```bash
claude-code "CREAR ESTRUCTURA BASE F1-M1-S1-D4

TAREA: 'Tests básicos con Jest + Primer agente mock'
ARCHIVO: src/app/agencia/mes-1/semana-1/dia-4/page.tsx

CREAR SOLAMENTE estructura de componentes básica con navegación.
LÍMITE: 4000 tokens máximo"
```

### **🎯 F1-M1-S1-D4 - PARTE 2: Teoría**
```bash
claude-code "COMPLETAR TEORÍA F1-M1-S1-D4

ARCHIVO EXISTENTE: src/app/agencia/mes-1/semana-1/dia-4/page.tsx

COMPLETAR TheorySection con:
- Fundamentos testing sistemas IA
- Estrategias mocking APIs IA
- Testing producción OpenAI/Anthropic
- Metodologías TDD para IA

LÍMITE: 15000 tokens máximo"
```

### **🎯 F1-M1-S1-D4 - PARTE 3: Ejemplos + Práctica**
```bash
claude-code "COMPLETAR EJEMPLOS Y PRÁCTICA F1-M1-S1-D4

ARCHIVO EXISTENTE: src/app/agencia/mes-1/semana-1/dia-4/page.tsx

4 ejemplos progresivos testing + simulador agente mock.
LÍMITE: 15000 tokens máximo"
```

### **🎯 F1-M1-S1-D4 - PARTE 4: Evaluación**
```bash
claude-code "COMPLETAR EVALUACIÓN F1-M1-S1-D4

ARCHIVO EXISTENTE: src/app/agencia/mes-1/semana-1/dia-4/page.tsx

Quiz testing + evaluación IA + mini-proyecto agente mock.
LÍMITE: 8000 tokens máximo"
```

### **🎯 F1-M1-S1-D5 - PARTE 1: Estructura Base**
```bash
claude-code "CREAR ESTRUCTURA BASE F1-M1-S1-D5

TAREA: 'Integración y documentación JSDoc'
ARCHIVO: src/app/agencia/mes-1/semana-1/dia-5/page.tsx

CREAR SOLAMENTE estructura de componentes básica con navegación.
LÍMITE: 4000 tokens máximo"
```

### **🎯 F1-M1-S1-D5 - PARTE 2: Teoría**
```bash
claude-code "COMPLETAR TEORÍA F1-M1-S1-D5

ARCHIVO EXISTENTE: src/app/agencia/mes-1/semana-1/dia-5/page.tsx

COMPLETAR TheorySection con:
- Importancia documentación sistemas IA
- JSDoc avanzado APIs agentes
- Documentación OpenAI/Anthropic/Google
- Automatización docs

LÍMITE: 15000 tokens máximo"
```

### **🎯 F1-M1-S1-D5 - PARTE 3: Ejemplos + Práctica**
```bash
claude-code "COMPLETAR EJEMPLOS Y PRÁCTICA F1-M1-S1-D5

ARCHIVO EXISTENTE: src/app/agencia/mes-1/semana-1/dia-5/page.tsx

4 ejemplos JSDoc + editor tiempo real + generador automático.
LÍMITE: 15000 tokens máximo"
```

### **🎯 F1-M1-S1-D5 - PARTE 4: Evaluación**
```bash
claude-code "COMPLETAR EVALUACIÓN F1-M1-S1-D5

ARCHIVO EXISTENTE: src/app/agencia/mes-1/semana-1/dia-5/page.tsx

Quiz documentación + evaluación IA + integración final.
LÍMITE: 8000 tokens máximo"
```

---

## ✅ **DESPUÉS DE EJECUTAR CADA COMANDO**

### **1. Verificar que se creó/actualizó el archivo:**
```bash
ls src/app/agencia/mes-1/semana-1/dia-X/
```

### **2. Comprobar en navegador (después de completar todas las partes):**
```bash
npm run dev
```
Ir a: `http://localhost:3001/agencia/mes-1/semana-1/dia-X`

### **3. Si hay errores, verificar en consola:**
```bash
npm run dev
```
Revisar errores en terminal y navegador.

---

## 🔄 **ORDEN RECOMENDADO DE EJECUCIÓN - ESTRATEGIA 4 PARTES**

### **Para F1-M1-S1-D1:**
1. **D1-Parte1** (Estructura) → Verificar que se creó archivo →
2. **D1-Parte2** (Teoría) → Verificar contenido →
3. **D1-Parte3** (Ejemplos) → Verificar componentes →
4. **D1-Parte4** (Evaluación) → **Probar en navegador completo**

### **Para F1-M1-S1-D2:**
1. **D2-Parte1** → **D2-Parte2** → **D2-Parte3** → **D2-Parte4** → **Probar**

### **Para F1-M1-S1-D4:**
1. **D4-Parte1** → **D4-Parte2** → **D4-Parte3** → **D4-Parte4** → **Probar**

### **Para F1-M1-S1-D5:**
1. **D5-Parte1** → **D5-Parte2** → **D5-Parte3** → **D5-Parte4** → **Probar**

**¡Cada comando es más pequeño y no excederá los límites de tokens!** 🚀

---

## ⚠️ **IMPORTANTE - LÍMITES DE TOKENS RESUELTOS**

- **Parte 1**: 4k tokens (estructura base)
- **Parte 2**: 15k tokens (teoría expandida) 
- **Parte 3**: 15k tokens (ejemplos + práctica)
- **Parte 4**: 8k tokens (evaluación + cierre)

**Total por día**: ~42k tokens **dividido en 4 comandos** = Sin errores ✅

---

## 📁 **RUTAS DE ARCHIVOS RESULTANTES**

- `src/app/agencia/mes-1/semana-1/dia-1/page.tsx` ✅
- `src/app/agencia/mes-1/semana-1/dia-2/page.tsx` ✅  
- `src/app/agencia/mes-1/semana-1/dia-4/page.tsx` ✅
- `src/app/agencia/mes-1/semana-1/dia-5/page.tsx` ✅

**Todas las páginas seguirán el mismo formato que F1-M1-S1-D3 (ya completado)** ✅
