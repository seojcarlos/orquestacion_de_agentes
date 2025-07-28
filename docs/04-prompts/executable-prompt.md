🤖 **PROMPT EJECUTABLE PARA CLAUDE CODE**

---

**CONTEXTO:** Tienes un proyecto de Academia de IA con Next.js + React donde necesitas crear contenido educativo **extremadamente detallado** para cada tarea del plan de 48 semanas. El contenido actual de Semana 1 es básico y necesita ser **3x más extenso y dinámico**.

**OBJETIVO:** Crear páginas educativas completas estilo "curso universitario" con teoría profunda, ejemplos múltiples, componentes interactivos y evaluación IA.

---

## 📋 ESPECIFICACIONES TÉCNICAS

**NIVEL DE DETALLE:** UNIVERSITARIO/PROFESIONAL o incluso de Tesis
- **Mínimo 3000 palabras** por tarea/día
- **Teoría expandida** con fundamentos desde cero  
- **4+ ejemplos progresivos** (básico → intermedio → avanzado → producción)
- **Componentes interactivos** funcionales con React/TypeScript
- **Evaluación IA** integrada con feedback personalizado

**ESTRUCTURA OBLIGATORIA POR PÁGINA:**

```tsx
// Ejemplo: src/app/agencia/mes-1/semana-1/dia-3/page.tsx
export default function F1M1S1D3Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      
      {/* 1. HEADER DINÁMICO (5%) */}
      <TaskHeader taskId="F1-M1-S1-D3" title="JSON Schema + Validación" />

      {/* 2. TEORÍA EXPANDIDA (40% - 1200-1500 palabras) */}
      <TheorySection>
        - Fundamentos teóricos desde cero
        - Historia y evolución de la tecnología
        - Casos de uso en producción (OpenAI, Google, etc.)
        - Principios de diseño para IA
        - Comparaciones con alternativas
      </TheorySection>

      {/* 3. EJEMPLOS MÚLTIPLES (25% - 4 ejemplos) */}
      <ExamplesSection>
        - Básico: Comprensión conceptual
        - Intermedio: Aplicación práctica
        - Avanzado: Optimización y performance  
        - Producción: Casos reales industria
      </ExamplesSection>

      {/* 4. PRÁCTICA INTERACTIVA (25%) */}
      <PracticeSection>
        - Simulador principal del concepto
        - Editor de código con validación en tiempo real
        - Pasos guiados con checkpoints
        - Debugging asistido
      </PracticeSection>

      {/* 5. EVALUACIÓN IA (5%) */}
      <EvaluationSection>
        - Quiz adaptativo
        - Revisión automática de código
        - Proyecto mini con AI feedback
      </EvaluationSection>

    </div>
  )
}
```

---

## 🎯 TAREAS ESPECÍFICAS PARA CLAUDE CODE

### **TAREA PRIORITARIA: F1-M1-S1-D3 (JSON Schema + Validación)**

**CREAR:**
1. **Página completa:** `src/app/agencia/mes-1/semana-1/dia-3/page.tsx`
2. **Componentes:** `src/components/education/` (TheorySection, InteractiveDemo, etc.)
3. **Utils:** `src/lib/education/` (validation helpers, AI evaluation)

**CONTENIDO DETALLADO:**

### **1. TEORÍA EXPANDIDA (1200-1500 palabras)**

```markdown
## 📚 Fundamentos Profundos de JSON Schema para Sistemas IA

### 🧠 ¿Por qué JSON Schema es Crítico para Agentes IA?

[Explicación de 300 palabras sobre importancia en sistemas de IA]
- Validación en tiempo real de 50M+ requests/día (caso OpenAI)
- Prevención de corrupción de datos en entrenamiento
- Seguridad y confiabilidad en producción

### 🔬 Anatomía Técnica de un Schema para IA

[Explicación de 400 palabras sobre estructura técnica]
- Validación semántica vs sintáctica
- Performance O(1) vs O(n)
- Tolerancia a errores y degradación gradual

### 📈 Evolución Histórica y Tendencias

[Explicación de 300 palabras sobre evolución]
- JSON Schema draft-01 (2010) → draft-2020-12 (2024)
- Adaptaciones específicas para ML/IA
- Futuro: Schema Learning automático

### 🏭 Casos de Uso en Producción Real

[Explicación de 400 palabras sobre casos reales]
- OpenAI GPT-4: Schema validation architecture
- Google Bard: Multi-level schema system
- Claude: Real-time context validation
- Mejores prácticas de la industria
```

### **2. EJEMPLOS PROGRESIVOS (4 ejemplos completos)**

```tsx
{/* Ejemplo 1: BÁSICO */}
<ExampleCard level="basic" expandable>
  <h3>🎯 Schema Básico para Tarea de Agente</h3>
  <CodeEditor 
    code={basicTaskSchema}
    language="json"
    editable={true}
    withExplanation={true}
  />
  <LiveValidator data={exampleData} />
  <ConceptExplanation>
    Este schema define los campos mínimos para una tarea...
    [200 palabras de explicación detallada]
  </ConceptExplanation>
</ExampleCard>

{/* Ejemplo 2: INTERMEDIO */}
<ExampleCard level="intermediate" expandable>
  <h3>⚡ Validación Condicional Avanzada</h3>
  <CodeEditor 
    code={conditionalSchema}
    language="json"
    withHighlights={conditionalParts}
  />
  <InteractiveDemo>
    <ConditionalValidator />
  </InteractiveDemo>
  <ConceptExplanation>
    La validación condicional permite schemas que se adaptan...
    [200 palabras de explicación detallada]
  </ConceptExplanation>
</ExampleCard>

{/* Ejemplo 3: AVANZADO */}
<ExampleCard level="advanced" expandable>
  <h3>🚀 Schema Optimizado para Alto Rendimiento</h3>
  <CodeEditor 
    code={performanceSchema}
    language="json"
  />
  <PerformanceBenchmark>
    <MetricsChart data={benchmarkData} />
    <OptimizationTips />
  </PerformanceBenchmark>
  <ConceptExplanation>
    En sistemas de producción, cada microsegundo cuenta...
    [200 palabras de explicación detallada]
  </ConceptExplanation>
</ExampleCard>

{/* Ejemplo 4: PRODUCCIÓN */}
<ExampleCard level="production" expandable>
  <h3>🏭 Schema Real de Sistema de Producción</h3>
  <CodeEditor 
    code={productionSchema}
    language="json"
    readOnly={true}
  />
  <ProductionInsights>
    <ScalabilityAnalysis />
    <SecurityConsiderations />
    <MonitoringSetup />
  </ProductionInsights>
  <ConceptExplanation>
    Este es el schema real usado por [empresa]...
    [200 palabras de explicación detallada]
  </ConceptExplanation>
</ExampleCard>
```

### **3. COMPONENTES INTERACTIVOS**

```tsx
{/* Simulador Principal */}
<SchemaValidatorSimulator>
  <div className="grid grid-cols-2 gap-6">
    
    <div>
      <h4>📝 Diseña tu Schema</h4>
      <CodeEditor 
        value={userSchema}
        onChange={setUserSchema}
        language="json"
        withIntelliSense={true}
        liveValidation={true}
      />
      
      <h4>🧪 Datos de Prueba</h4>
      <TestDataGenerator />
      <CodeEditor 
        value={testData}
        onChange={setTestData}
        language="json"
      />
    </div>

    <div>
      <h4>✅ Validación en Tiempo Real</h4>
      <ValidationResult 
        schema={userSchema}
        data={testData}
        showPerformance={true}
      />
      
      <h4>📊 Métricas</h4>
      <PerformanceChart />
      
      <h4>💡 Sugerencias IA</h4>
      <AISuggestions schema={userSchema} />
    </div>

  </div>
</SchemaValidatorSimulator>

{/* Editor de Código Avanzado */}
<AdvancedCodeEditor>
  <h4>👨‍💻 Implementa el TaskValidator</h4>
  <CodeEditor 
    initialCode={taskValidatorTemplate}
    language="javascript"
    withTests={true}
    withHints={true}
    realTimeValidation={true}
  />
  <TestRunner />
  <AICodeReview />
</AdvancedCodeEditor>
```

### **4. EVALUACIÓN IA INTEGRADA**

```tsx
<AIEvaluationSystem>
  
  {/* Quiz Adaptativo */}
  <AdaptiveQuiz>
    <h4>🧠 Evaluación Conceptual</h4>
    <AIGeneratedQuestions 
      topic="JSON Schema"
      userLevel={detectedLevel}
      adaptivePoints={conceptualGaps}
    />
  </AdaptiveQuiz>

  {/* Revisión de Código */}
  <CodeReviewAI>
    <h4>🤖 AI Code Review</h4>
    <CodeSubmission />
    <AIFeedback criteria={[
      "Correctness", 
      "Performance", 
      "Best Practices", 
      "Security",
      "Maintainability"
    ]} />
    <ImprovementSuggestions />
  </CodeReviewAI>

  {/* Proyecto Mini */}
  <MiniProject>
    <h4>🎯 Proyecto: Validador para Agente de Contenido</h4>
    <ProjectBrief />
    <RequirementsCheckList />
    <SubmissionPortal />
    <PeerComparison />
  </MiniProject>

</AIEvaluationSystem>
```

---

## 🚀 INSTRUCCIONES DE IMPLEMENTACIÓN

**ARCHIVOS A CREAR:**

1. **Página principal:** `src/app/agencia/mes-1/semana-1/dia-3/page.tsx`
2. **Componentes educativos:**
   - `src/components/education/TheorySection.tsx`
   - `src/components/education/ExampleCard.tsx`
   - `src/components/education/InteractiveDemo.tsx`
   - `src/components/education/AIEvaluation.tsx`
3. **Utilidades:**
   - `src/lib/education/schemaValidator.ts`
   - `src/lib/education/aiEvaluation.ts`
   - `src/lib/education/progressTracker.ts`

**TECNOLOGÍAS A USAR:**
- **React + TypeScript** para componentes
- **CodeMirror 6** para editores de código
- **Recharts** para gráficos y métricas
- **Framer Motion** para animaciones educativas
- **Tailwind CSS** para styling responsivo
- **JSON Schema validator** (Ajv)

**CRITERIOS DE CALIDAD:**
- **3000+ palabras** de contenido educativo
- **100% funcional** - todos los componentes deben funcionar
- **Responsive** - perfecto en móvil y desktop
- **Performance** - carga rápida y fluida
- **Accesibilidad** - ARIA labels y navegación por teclado

**FORMATO DE PROGRESO:**
- Sistema de checkpoints por sección
- Tracking de tiempo por actividad
- Métricas de comprensión
- Recomendaciones personalizadas para siguiente día

---

## 💡 CASOS DE USO ESPECÍFICOS A INCLUIR

**JSON Schema para Agentes IA:**
1. **Validación de prompts** antes de enviar a LLM
2. **Estructuración de respuestas** de IA para consistencia
3. **Validación de memoria** persistente de agentes
4. **Schemas evolutivos** que crecen con el aprendizaje
5. **Validación en tiempo real** para 50M+ requests/día

**Ejemplos de Producción:**
- OpenAI API request/response schemas
- Claude conversation validation
- Google Bard multi-modal schemas
- Anthropic safety validation schemas

---

**🎯 RESULTADO ESPERADO:** Una página educativa completa que sea 10x más detallada que el contenido actual, con teoría universitaria, ejemplos de producción real, componentes 100% funcionales, y evaluación IA que prepare al usuario para implementar TaskValidator en sistemas reales de producción, pero que sea explicado en un tono muy sencillo y comprensible para cualquier persona.

**¿CREAR ESTA IMPLEMENTACIÓN AHORA?** 🚀
