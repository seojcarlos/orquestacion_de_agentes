# 🤖 PROMPT PARA CLAUDE CODE - CONTENIDO EDUCATIVO AVANZADO

## 🎯 OBJETIVO PRINCIPAL
Crear contenido educativo **extremadamente detallado y dinámico** para cada tarea del plan de 48 semanas, donde cada tarea sea una **página completa tipo curso universitario** con:

- **Teoría profunda** (explicaciones extensas con fundamentos)
- **Ejemplos prácticos múltiples** (casos de uso reales)
- **Ejercicios progresivos** (de básico a avanzado)
- **Componentes interactivos** (simuladores, demostraciones)
- **Evaluación automática** (con IA y feedback)

---

## 📋 ESTRUCTURA PROPUESTA PARA CADA TAREA

### **Formato de Página por Tarea (Ejemplo: F1-M1-S1-D3)**

```tsx
// src/app/agencia/mes-1/semana-1/dia-3/page.tsx
export default function F1M1S1D3Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      
      {/* 1. HEADER DINÁMICO */}
      <TaskHeader 
        taskId="F1-M1-S1-D3"
        title="task.schema.json + Validación de Datos"
        duration="120 minutos"
        difficulty="intermedio"
        progress={userProgress}
      />

      {/* 2. TEORÍA EXPANDIDA (30-40% del contenido) */}
      <TheorySection>
        <ConceptExplainer 
          concept="JSON Schema"
          depth="universitario"
          examples={multipleExamples}
        />
        <InteractiveDemo 
          title="Schema Validator Live"
          component={<SchemaValidatorSimulator />}
        />
        <DeepDive topics={["Validation patterns", "Error handling", "Performance"]} />
      </TheorySection>

      {/* 3. EJEMPLOS MÚLTIPLES (20% del contenido) */}
      <ExamplesSection>
        <ExampleCard type="basic" />
        <ExampleCard type="intermediate" />
        <ExampleCard type="advanced" />
        <ExampleCard type="real-world" />
      </ExamplesSection>

      {/* 4. PRÁCTICA GUIADA (30% del contenido) */}
      <PracticeSection>
        <GuidedExercise steps={detailedSteps} />
        <CodeEditor withHints={true} />
        <InstantFeedback />
      </PracticeSection>

      {/* 5. EVALUACIÓN IA (10% del contenido) */}
      <EvaluationSection>
        <AIAssessment />
        <ProgressTracker />
        <NextSteps />
      </EvaluationSection>

    </div>
  )
}
```

---

## 🎓 ESPECIFICACIONES DETALLADAS

### **1. TEORÍA EXPANDIDA (Mucho más profunda que Semana 1)**

**Características:**
- **Explicaciones de 1000-1500 palabras** por concepto
- **Fundamentos teóricos** desde cero
- **Conexiones con conceptos avanzados**
- **Historia y evolución** de la tecnología
- **Casos de uso en la industria**

**Ejemplo de expansión:**

```markdown
#### ❌ ACTUAL (Semana 1 - Básico):
"JSON Schema define la estructura de datos"

#### ✅ PROPUESTO (Detallado):
## 📚 Fundamentos de JSON Schema en Sistemas de IA

### 🧠 ¿Por qué JSON Schema es Crítico para Agentes IA?

Los sistemas de IA procesan miles de datos por minuto. Sin validación adecuada, 
un solo dato corrupto puede:
- Corromper el entrenamiento del modelo
- Generar respuestas incorrectas
- Provocar fallos en cascada
- Comprometer la seguridad del sistema

### 🔬 Anatomía de un Schema para IA

Un schema para agentes IA debe considerar:

1. **Validación Semántica**: No solo formato, sino significado
2. **Tolerancia a Errores**: Degradación gradual vs fallo total  
3. **Evolución de Datos**: Schemas que crecen con el modelo
4. **Performance**: Validación en tiempo real sin latencia

### 📈 Evolución Histórica

- **2010**: JSON Schema draft-01 - Validación básica
- **2015**: draft-04 - Introducción de $ref y composición
- **2020**: draft-07 - Validación condicional avanzada
- **2024**: draft-2020-12 - Optimización para IA/ML

### 🏭 Casos de Uso en Producción

**OpenAI GPT-4**: Usa schemas para validar 50M+ requests/día
**Google Bard**: Schemas multi-nivel para diferentes tipos de consulta
**Claude**: Validación de contexto en tiempo real

### 💡 Principios de Diseño para IA

1. **Principio de Robustez**: "Ser liberal en lo que aceptas, conservador en lo que envías"
2. **Principio de Evolución**: Los schemas deben permitir crecimiento
3. **Principio de Performance**: Validación O(1) cuando sea posible
```

### **2. EJEMPLOS MÚLTIPLES Y PROGRESIVOS**

**Estructura propuesta:**

```tsx
<ExamplesSection>
  
  {/* Ejemplo 1: Básico - Comprensión */}
  <ExampleCard level="basic">
    <h3>🎯 Ejemplo Básico: Schema de Tarea Simple</h3>
    <CodeBlock language="json">
      {basicTaskSchema}
    </CodeBlock>
    <Explanation>
      Este ejemplo muestra los campos mínimos necesarios...
    </Explanation>
    <TryItButton />
  </ExampleCard>

  {/* Ejemplo 2: Intermedio - Aplicación */}
  <ExampleCard level="intermediate">
    <h3>⚡ Ejemplo Intermedio: Validación Condicional</h3>
    <CodeBlock language="json">
      {conditionalValidationSchema}
    </CodeBlock>
    <Explanation>
      Aquí vemos cómo usar if/then/else para validación contextual...
    </Explanation>
    <InteractiveDemo component={<ConditionalValidator />} />
  </ExampleCard>

  {/* Ejemplo 3: Avanzado - Optimización */}
  <ExampleCard level="advanced">
    <h3>🚀 Ejemplo Avanzado: Schema para Alto Rendimiento</h3>
    <CodeBlock language="json">
      {highPerformanceSchema}
    </CodeBlock>
    <PerformanceMetrics />
    <BenchmarkComparison />
  </ExampleCard>

  {/* Ejemplo 4: Real World - Producción */}
  <ExampleCard level="production">
    <h3>🏭 Caso Real: Schema de OpenAI GPT-4</h3>
    <CodeBlock language="json">
      {openAIStyleSchema}
    </CodeBlock>
    <ProductionInsights />
    <ScalabilityAnalysis />
  </ExampleCard>

</ExamplesSection>
```

### **3. COMPONENTES INTERACTIVOS AVANZADOS**

**Simuladores y Demos:**

```tsx
// Componente: Schema Validator Simulator
<SchemaValidatorSimulator>
  <div className="grid grid-cols-2 gap-6">
    
    {/* Input Panel */}
    <div>
      <h4>📝 Edita el Schema</h4>
      <CodeEditor 
        value={schema}
        onChange={setSchema}
        language="json"
        withIntelliSense={true}
      />
      
      <h4>🧪 Datos de Prueba</h4>
      <CodeEditor 
        value={testData}
        onChange={setTestData}
        language="json"
      />
    </div>

    {/* Results Panel */}
    <div>
      <h4>✅ Resultado de Validación</h4>
      <ValidationResult 
        isValid={validation.isValid}
        errors={validation.errors}
        performance={validation.timing}
      />
      
      <h4>📊 Métricas en Tiempo Real</h4>
      <PerformanceChart data={validationMetrics} />
      
      <h4>💡 Sugerencias de Mejora</h4>
      <AISuggestions suggestions={optimizations} />
    </div>

  </div>
</SchemaValidatorSimulator>
```

### **4. EVALUACIÓN INTELIGENTE CON IA**

```tsx
<AIEvaluationSystem>
  
  {/* Evaluación de Código */}
  <CodeAssessment>
    <h4>🤖 Evaluación IA de tu Implementación</h4>
    <AIFeedback 
      code={userCode}
      criteria={[
        "Correctness", 
        "Performance", 
        "Best Practices", 
        "Readability",
        "Security"
      ]}
    />
  </CodeAssessment>

  {/* Evaluación Conceptual */}
  <ConceptualQuiz>
    <AIGeneratedQuestions 
      topic="JSON Schema"
      difficulty={userLevel}
      adaptToProgress={true}
    />
  </ConceptualQuiz>

  {/* Proyecto Mini */}
  <MiniProject>
    <h4>🎯 Proyecto: Validador para Agente de Contenido</h4>
    <ProjectRequirements />
    <AICodeReview />
    <PeerComparison />
  </MiniProject>

</AIEvaluationSystem>
```

---

## 🚀 PROMPT ESPECÍFICO PARA CLAUDE CODE

### **INSTRUCCIONES PARA CLAUDE CODE:**

```markdown
TAREA: Crear contenido educativo avanzado para [TASK_ID]

NIVEL DE DETALLE: UNIVERSITARIO/PROFESIONAL
- Mínimo 3000 palabras por tarea
- Teoría profunda con fundamentos
- 4+ ejemplos progresivos (básico → producción)
- Componentes interactivos funcionales
- Evaluación IA integrada

ESTRUCTURA OBLIGATORIA:

1. TEORÍA EXPANDIDA (1200-1500 palabras):
   - Fundamentos teóricos desde cero
   - Historia y evolución
   - Casos de uso en producción
   - Principios de diseño
   - Comparaciones con alternativas

2. EJEMPLOS MÚLTIPLES (800-1000 palabras):
   - Básico: Comprensión conceptual
   - Intermedio: Aplicación práctica  
   - Avanzado: Optimización y performance
   - Producción: Casos reales de la industria

3. COMPONENTES INTERACTIVOS:
   - Simulador principal del concepto
   - Editor de código con validación
   - Demos visuales interactivos
   - Métricas en tiempo real

4. PRÁCTICA GUIADA (600-800 palabras):
   - Pasos detallados con explicación
   - Checkpoints de validación
   - Hints inteligentes
   - Debugging asistido

5. EVALUACIÓN IA:
   - Quiz adaptativo
   - Revisión de código automática
   - Proyecto mini evaluado
   - Feedback personalizado

TECNOLOGÍAS A USAR:
- React + TypeScript para componentes
- CodeMirror para editores
- Chart.js para métricas
- Framer Motion para animaciones
- Tailwind para styling avanzado

FORMATO DE ARCHIVO:
- Crear página completa en src/app/agencia/mes-1/semana-1/dia-[X]/page.tsx
- Componentes en src/components/education/
- Utils en src/lib/education/
- Tests en tests/education/

CRITERIOS DE CALIDAD:
- Contenido 3x más detallado que Semana 1 actual
- Interactividad en cada sección
- Ejemplos funcionando al 100%
- Performance optimizada
- Accesibilidad completa
```

---

## 🎯 MEJORAS PROPUESTAS AL SISTEMA ACTUAL

### **1. Arquitectura de Contenido Educativo**

```
src/
├── app/agencia/mes-1/semana-1/
│   ├── page.tsx (overview - mantener actual)
│   ├── dia-1/page.tsx (contenido expandido)
│   ├── dia-2/page.tsx (contenido expandido)  
│   ├── dia-3/page.tsx (contenido expandido)
│   ├── dia-4/page.tsx (contenido expandido)
│   └── dia-5/page.tsx (contenido expandido)
├── components/education/
│   ├── TheorySection.tsx
│   ├── InteractiveDemo.tsx
│   ├── CodeEditor.tsx
│   ├── AIEvaluation.tsx
│   └── ProgressTracker.tsx
└── lib/education/
    ├── aiEvaluation.ts
    ├── codeValidation.ts
    └── progressSystem.ts
```

### **2. Sistema de Progreso Inteligente**

```tsx
// Tracking detallado por día
interface DayProgress {
  taskId: string
  timeSpent: number
  theoryCompleted: boolean
  examplesCompleted: boolean
  practiceCompleted: boolean
  evaluationScore: number
  aiRecommendations: string[]
  nextSuggestedDay: string
}
```

### **3. Personalización Adaptativa**

```tsx
// El contenido se adapta al nivel del usuario
<AdaptiveContent>
  <TheorySection 
    depth={userLevel} // 'beginner' | 'intermediate' | 'advanced'
    showAdvanced={userProgress.showAdvancedConcepts}
    personalizeFor={userProfile.learningStyle}
  />
</AdaptiveContent>
```

---

## 💡 RECOMENDACIONES ADICIONALES

### **1. Gamificación Avanzada**
- **XP por sección completada** (teoría: 100xp, práctica: 300xp, evaluación: 200xp)
- **Badges por logros** ("Schema Master", "Performance Optimizer", etc.)
- **Leaderboard entre días** de la misma semana
- **Challenges diarios** con recompensas

### **2. Colaboración Social**
- **Code sharing** entre usuarios
- **Peer review** de proyectos mini
- **Mentoring IA** personalizado
- **Community challenges**

### **3. Métricas Avanzadas**
- **Tiempo de comprensión** por concepto
- **Puntos de dificultad** identificados automáticamente  
- **Patrones de aprendizaje** personalizados
- **Predicción de éxito** en próximas tareas

---

## 🎉 RESULTADO ESPERADO

Con este enfoque, cada día será una **experiencia educativa completa** donde el usuario:

1. **Aprende teoría profunda** con fundamentos sólidos
2. **Ve ejemplos reales** de la industria  
3. **Practica interactivamente** con feedback inmediato
4. **Es evaluado por IA** con sugerencias personalizadas
5. **Progresa de forma medible** hacia expertise real

**¿Te parece bien este enfoque? ¿Qué aspectos quieres que Claude Code priorice al crear el contenido?** 🚀
