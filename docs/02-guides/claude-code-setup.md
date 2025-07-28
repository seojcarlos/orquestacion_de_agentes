# 🎯 **ESTRATEGIA CLAUDE CODE: Creación por Secciones**

## 📊 **CONFIGURACIÓN OPTIMIZADA**

### **Variables de Entorno Configuradas:**
```bash
CLAUDE_CODE_MAX_OUTPUT_TOKENS = 30000      # Máximo 30k tokens por respuesta
CLAUDE_CODE_CONTINUE_ON_ERROR = true       # Continuar en errores menores
CLAUDE_CODE_AUTO_CONTINUE = true          # Continuar automáticamente
```

### **Verificación:**
```powershell
echo $env:CLAUDE_CODE_MAX_OUTPUT_TOKENS    # Debe mostrar: 30000
echo $env:CLAUDE_CODE_CONTINUE_ON_ERROR    # Debe mostrar: true
echo $env:CLAUDE_CODE_AUTO_CONTINUE        # Debe mostrar: true
```

---

## 🏗️ **ESTRATEGIA: 4 LLAMADAS SEPARADAS**

### **LLAMADA 1: Estructura Base + Header (8k tokens)**
```bash
claude-code "Crear estructura base y header para F1-M1-S1-D1 'Setup inicial del proyecto + Clean Code'. 
Incluir: imports, header dinámico, navegación, progress tracker y estructura de componentes. 
Archivo: src/app/agencia/mes-1/semana-1/dia-1/page.tsx"
```

### **LLAMADA 2: Teoría Expandida (15k tokens)**
```bash
claude-code "Completar sección de teoría expandida para F1-M1-S1-D1. 
Incluir: fundamentos profundos, historia, casos de producción real, principios Clean Code. 
1500+ palabras con nivel universitario. Continuar en archivo existente."
```

### **LLAMADA 3: Ejemplos + Práctica (15k tokens)**
```bash
claude-code "Completar ejemplos progresivos y práctica interactiva para F1-M1-S1-D1. 
Incluir: 4 ejemplos (básico→producción), simuladores React, editores de código. 
Continuar en archivo existente."
```

### **LLAMADA 4: Evaluación + Cierre (8k tokens)**
```bash
claude-code "Completar evaluación IA y cierre para F1-M1-S1-D1. 
Incluir: quiz adaptativo, revisión código IA, proyecto mini, progress tracker. 
Finalizar archivo completo."
```

---

## 📝 **PLANTILLA DE PROMPTS OPTIMIZADOS**

### **PROMPT SECCIÓN 1: Base + Header**
```
CREAR ESTRUCTURA BASE F1-M1-S1-D1

TAREA: "Setup inicial del proyecto + Principios Clean Code"
ARCHIVO: src/app/agencia/mes-1/semana-1/dia-1/page.tsx

CREAR SOLAMENTE:
1. Imports necesarios (React, Next.js, componentes UI)
2. Header dinámico con task info y progreso
3. Navegación entre secciones
4. Progress tracker
5. Estructura de componentes (sin contenido interno)

TECNOLOGÍAS: Next.js 14, React, TypeScript, shadcn/ui
LÍMITE: 8000 tokens máximo

NO INCLUIR: Contenido de teoría, ejemplos, o evaluación (viene en siguientes llamadas)
```

### **PROMPT SECCIÓN 2: Teoría**
```
COMPLETAR TEORÍA EXPANDIDA F1-M1-S1-D1

ARCHIVO EXISTENTE: src/app/agencia/mes-1/semana-1/dia-1/page.tsx

COMPLETAR SECCIÓN TheorySection CON:
1. Fundamentos profundos de setup de proyectos (400 palabras)
2. Principios Clean Code para IA (400 palabras)  
3. Casos de producción real (OpenAI, Google) (400 palabras)
4. Historia y evolución (200 palabras)

TOTAL: 1500+ palabras nivel universitario
LÍMITE: 15000 tokens máximo

MANTENER: Estructura existente, solo completar contenido de teoría
```

### **PROMPT SECCIÓN 3: Ejemplos + Práctica**
```
COMPLETAR EJEMPLOS Y PRÁCTICA F1-M1-S1-D1

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

LÍMITE: 15000 tokens máximo
```

### **PROMPT SECCIÓN 4: Evaluación**
```
COMPLETAR EVALUACIÓN Y CIERRE F1-M1-S1-D1

ARCHIVO EXISTENTE: src/app/agencia/mes-1/semana-1/dia-1/page.tsx

COMPLETAR:
1. EvaluationSection con quiz adaptativo
2. AICodeReview component
3. MiniProject específico
4. Progress tracking final
5. Cierre y métricas

LÍMITE: 8000 tokens máximo
RESULTADO: Archivo completo funcional
```

---

## 🚀 **EJECUCIÓN PASO A PASO**

### **VERIFICAR CONFIGURACIÓN:**
```powershell
# Verificar variables
echo $env:CLAUDE_CODE_MAX_OUTPUT_TOKENS    # Debe ser 30000
echo $env:CLAUDE_CODE_AUTO_CONTINUE        # Debe ser true

# Si no están configuradas:
setx CLAUDE_CODE_MAX_OUTPUT_TOKENS "30000"
setx CLAUDE_CODE_AUTO_CONTINUE "true"
```

### **EJECUTAR EN ORDEN:**
1. **Ejecutar Prompt Sección 1** → Crear estructura base
2. **Ejecutar Prompt Sección 2** → Completar teoría
3. **Ejecutar Prompt Sección 3** → Completar ejemplos/práctica  
4. **Ejecutar Prompt Sección 4** → Completar evaluación

### **RESULTADO FINAL:**
- ✅ Página universitaria completa
- ✅ 3000+ palabras de contenido
- ✅ 4 ejemplos progresivos funcionales
- ✅ Componentes React interactivos
- ✅ Evaluación IA integrada
- ✅ Sin errores de límite de tokens

---

## 💡 **VENTAJAS DE ESTA ESTRATEGIA**

1. **Sin errores de límite** - Cada sección < 30k tokens
2. **Mejor calidad** - Claude se enfoca en una sección a la vez
3. **Debugging fácil** - Si una sección falla, solo rehacer esa parte
4. **Contenido más profundo** - Más espacio para desarrollar cada tema
5. **Flexibilidad** - Puedes modificar secciones individuales

**¿Procedemos con la Sección 1 para F1-M1-S1-D1?**
