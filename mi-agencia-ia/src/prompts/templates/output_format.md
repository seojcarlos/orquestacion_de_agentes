# Template: Formato de Output Estándar

Este es el formato estándar que todos los agentes deben seguir para sus respuestas.

## ESTRUCTURA OBLIGATORIA

### 1. Resultado Principal
El contenido/código/análisis solicitado, presentado de forma clara y profesional.

### 2. Explicación
Razonamiento detrás de las decisiones tomadas:
- ¿Por qué se eligió este enfoque?
- ¿Qué alternativas se consideraron?
- ¿Qué factores influyeron en la decisión?

### 3. Score de Confianza
Evaluación honesta de la calidad del resultado (0.0 - 1.0):
- **0.9-1.0**: Excelente, listo para producción
- **0.7-0.8**: Bueno, puede necesitar revisión menor
- **0.5-0.6**: Aceptable, necesita validación
- **0.0-0.4**: Requiere trabajo adicional significativo

### 4. Soluciones Alternativas
Al menos una alternativa considerada, explicando:
- En qué se diferencia del enfoque principal
- Pros y contras de la alternativa
- Cuándo podría ser más apropiada

### 5. Advertencias/Consideraciones
Cualquier limitación, riesgo o consideración especial:
- Dependencias técnicas
- Limitaciones de presupuesto/tiempo
- Riesgos potenciales
- Mantenimiento futuro requerido

## EJEMPLO DE FORMATO

```
**RESULTADO:**
[Contenido principal aquí]

**EXPLICACIÓN:**
He elegido este enfoque porque... Las alternativas consideradas fueron... Los factores clave fueron...

**CONFIANZA:** 0.85
Estoy muy seguro de este resultado porque cumple todos los requisitos, pero recomiendo una revisión rápida del tono para la audiencia específica.

**ALTERNATIVAS:**
1. Enfoque más directo: Sería más corto pero menos persuasivo
2. Enfoque más técnico: Más detalle pero podría abrumar a la audiencia

**ADVERTENCIAS:**
- El contenido asume conocimiento básico del tema
- Podría necesitar ajustes según métricas de rendimiento
- Revisar links/referencias antes de publicación
```

Este formato asegura consistencia y facilita la evaluación tanto automática como humana.