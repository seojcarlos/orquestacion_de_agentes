# 🚀 COMANDOS CLAUDE CODE - DIVIDIDOS POR PARTES

> **Para evitar el error de 32k tokens al crear contenido universitario**

---

## ⚠️ **PROBLEMA IDENTIFICADO**

Claude Code tiene límite de **32,000 tokens de salida**. Cuando se le pide crear contenido universitario completo (3000+ palabras), excede el límite y da error:

```
API Error: Claude's response exceeded the 32000 output token maximum
```

## ✅ **SOLUCIÓN: DIVISIÓN EN 4 PARTES**

Cada día educativo se crea en **4 comandos separados**:

- **PARTE 1**: Estructura base (≤4000 tokens)
- **PARTE 2**: Teoría completa (≤8000 tokens)  
- **PARTE 3**: Ejemplos interactivos (≤8000 tokens)
- **PARTE 4**: Práctica + Evaluación (≤8000 tokens)

---

## 📋 **COMANDOS PARA F1-M1-S1-D2**

### **🏗️ PARTE 1/4 - ESTRUCTURA BASE**

```bash
claude-code "CREAR ESTRUCTURA BASE F1-M1-S1-D2 PARTE 1/4

TAREA: 'Estructura de directorios + Configuración Git'
ARCHIVO: src/app/agencia/mes-1/semana-1/dia-2/page.tsx

⚠️ LÍMITE CRÍTICO: Máximo 4000 tokens - SOLO ESTRUCTURA

CREAR SOLAMENTE:
1. Imports necesarios (React, Next.js, componentes UI)
2. TaskHeader dinámico con info F1-M1-S1-D2
3. Breadcrumbs navegación según docs/03-templates/content-template.md
4. Estructura de componentes principales (SIN contenido interno)
5. Layout responsivo con Tailwind CSS moderno

COMPONENTES A CREAR (estructura vacía):
- TaskHeader con título 'Estructura de directorios + Configuración Git'
- TheorySection (solo wrapper div, sin contenido)
- ExamplesSection (solo wrapper div, sin contenido)
- PracticeSection (solo wrapper div, sin contenido)
- EvaluationSection (solo wrapper div, sin contenido)

TECNOLOGÍAS: Next.js 14, React, TypeScript, Tailwind CSS
BACKEND: Usar APIs de docs/06-reference/backend-api-endpoints.md

NO INCLUIR: Contenido de teoría, ejemplos, evaluación (viene en siguientes partes)"
```

### **📚 PARTE 2/4 - TEORÍA UNIVERSITARIA**

```bash
claude-code "COMPLETAR TEORÍA F1-M1-S1-D2 PARTE 2/4

ARCHIVO: src/app/agencia/mes-1/semana-1/dia-2/page.tsx

⚠️ LÍMITE CRÍTICO: Máximo 8000 tokens - SOLO TEORÍA

COMPLETAR TheorySection CON CONTENIDO UNIVERSITARIO:

1. 🏗️ Fundamentos de Arquitecturas para IA (450 palabras):
   - Monolitos vs Microservicios vs Arquitectura de Agentes
   - Principios de organización de código para IA
   - Patrones de diseño específicos para agentes

2. 📈 Evolución Histórica (350 palabras):
   - 2010-2015: Monolitos tradicionales
   - 2016-2020: Microservicios y APIs
   - 2021-2025: Arquitecturas para IA y agentes

3. 🔀 Git para Sistemas de IA (450 palabras):
   - Branching strategies para equipos de IA
   - Gestión de modelos y datasets
   - CI/CD para agentes inteligentes

4. 🏭 Casos Reales de Producción (450 palabras):
   - OpenAI: Organización de GPT-4
   - Anthropic: Estructura de Claude
   - Google: Arquitectura de Bard

TOTAL: ~1700 palabras de teoría profunda
INCLUIR: ConceptExplainer, diagramas, comparaciones
NO TOCAR: ExamplesSection, PracticeSection, EvaluationSection"
```

### **🔬 PARTE 3/4 - EJEMPLOS INTERACTIVOS**

```bash
claude-code "COMPLETAR EJEMPLOS F1-M1-S1-D2 PARTE 3/4

ARCHIVO: src/app/agencia/mes-1/semana-1/dia-2/page.tsx

⚠️ LÍMITE CRÍTICO: Máximo 8000 tokens - SOLO EJEMPLOS

COMPLETAR ExamplesSection CON 4 EJEMPLOS PROGRESIVOS:

1. 🎯 Ejemplo Básico: Estructura Simple de Agente
   - Árbol de directorios básico
   - Comandos Git fundamentales
   - Explicación paso a paso

2. ⚡ Ejemplo Intermedio: Arquitectura Modular
   - Separación de responsabilidades
   - Git flow para desarrollo
   - Configuración de repositorio

3. 🚀 Ejemplo Avanzado: Microservicios para IA
   - Multi-repo strategy
   - Docker + Git para despliegue
   - Métricas de performance

4. 🏭 Ejemplo Producción: Sistema Multi-Agente Real
   - Arquitectura empresarial
   - Git workflows complejos
   - Casos de éxito reales

INCLUIR COMPONENTES INTERACTIVOS:
- DirectoryTreeVisualizer (árbol navegable)
- GitFlowSimulator (branches interactivos)
- ArchitectureComparator (comparación visual)
- CodeStructureDemo (preview en vivo)

NO TOCAR: TheorySection, PracticeSection, EvaluationSection"
```

### **🎯 PARTE 4/4 - PRÁCTICA Y EVALUACIÓN**

```bash
claude-code "COMPLETAR PRÁCTICA F1-M1-S1-D2 PARTE 4/4

ARCHIVO: src/app/agencia/mes-1/semana-1/dia-2/page.tsx

⚠️ LÍMITE CRÍTICO: Máximo 8000 tokens - PRÁCTICA + EVALUACIÓN

COMPLETAR PracticeSection + EvaluationSection:

🛠️ PRÁCTICA GUIADA:
- Ejercicio paso a paso: Crear estructura de agente desde cero
- Terminal interactivo con comandos Git
- Validación en tiempo real de estructura creada
- Hints contextuales y debugging asistido
- Checkpoints de progreso

🤖 EVALUACIÓN IA:
- Quiz adaptativo sobre arquitecturas (10 preguntas)
- Evaluación automática de estructura creada
- Proyecto mini: Reorganizar agente existente
- Feedback personalizado con sugerencias
- Recomendaciones para siguiente día

COMPONENTES INTERACTIVOS:
- GuidedTerminal (comandos paso a paso)
- StructureValidator (validación en tiempo real)
- AIQuizGenerator (preguntas adaptativas)
- ProgressTracker (métricas de aprendizaje)

BACKEND: Usar APIs de evaluación de docs/06-reference/

NO TOCAR: TheorySection, ExamplesSection"
```

---

## 🔄 **FLUJO DE EJECUCIÓN RECOMENDADO**

### **Paso 1: Ejecutar Parte 1**
```bash
# Copia y pega el comando PARTE 1/4 arriba
```
**Verificar**: Que se crea `dia-2/page.tsx` con estructura sin error

### **Paso 2: Ejecutar Parte 2**  
```bash
# Copia y pega el comando PARTE 2/4 arriba
```
**Verificar**: Que TheorySection se completa con ~1700 palabras

### **Paso 3: Ejecutar Parte 3**
```bash
# Copia y pega el comando PARTE 3/4 arriba  
```
**Verificar**: Que ExamplesSection tiene 4 ejemplos interactivos

### **Paso 4: Ejecutar Parte 4**
```bash
# Copia y pega el comando PARTE 4/4 arriba
```
**Verificar**: Que práctica y evaluación están completas

---

## 📊 **MÉTRICAS ESPERADAS POR PARTE**

| Parte | Tokens | Palabras | Componentes | Tiempo |
|-------|--------|----------|-------------|---------|
| 1     | ~4000  | ~600     | 5 estructura| 2-3 min |
| 2     | ~8000  | ~1700    | 3 teoría   | 4-5 min |
| 3     | ~8000  | ~1200    | 4 ejemplos | 4-5 min |
| 4     | ~8000  | ~1000    | 4 práctica | 4-5 min |
| **Total** | **~28000** | **~4500** | **16 componentes** | **~15 min** |

---

## 🎯 **APLICAR MISMO PATRÓN A OTROS DÍAS**

Esta estrategia se puede usar para cualquier día:

- **D1**: Setup inicial + Clean Code  
- **D3**: task.schema.json + Validación
- **D4**: Tests + Primer agente mock
- **D5**: Integración + JSDoc

**¡Cada día dividido en 4 partes = Sin errores de tokens!** ✅
