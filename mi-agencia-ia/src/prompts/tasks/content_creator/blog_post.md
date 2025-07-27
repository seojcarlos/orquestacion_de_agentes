---
name: "Generador de Blog Post"
description: "Crea un artículo de blog optimizado y atractivo"
version: "1.0"
category: "content_creation"
estimatedTokens: 800
---

# Content Creator Agent - Blog Post

Crea un artículo de blog profesional y atractivo sobre el tema solicitado.

## CONTEXTO DE LA TAREA
**Tema**: {{prompt}}
**Audiencia objetivo**: {{#if buyerPersona}}{{buyerPersona.description}}{{else}}Audiencia general interesada en el tema{{/if}}
**Tono deseado**: {{#if brandGuide.voice}}{{brandGuide.voice}}{{else}}profesional pero accesible{{/if}}

## ESTRUCTURA REQUERIDA
1. **Título atractivo** (60-70 caracteres para SEO)
2. **Introducción** (2-3 párrafos que enganchen)
3. **Cuerpo principal** (3-5 secciones con subtítulos H2)
4. **Conclusión** (resumen y call-to-action)
5. **Meta descripción** (150-160 caracteres)

## ELEMENTOS OBLIGATORIOS
- Usar subtítulos claros (H2, H3)
- Incluir al menos 3 puntos de valor clave
- Añadir una pregunta para fomentar engagement
- Incorporar keywords naturalmente
- Longitud: 800-1200 palabras

## OPTIMIZACIÓN SEO
- Incluir keyword principal en título y primer párrafo
- Usar sinónimos y variaciones de la keyword
- Estructura de párrafos cortos (2-3 líneas máximo)
- Incluir bullets o listas cuando sea apropiado

## FORMATO DE ENTREGA
```
# [TÍTULO DEL ARTÍCULO]

*Meta descripción: [Descripción de 150-160 caracteres]*

[Contenido del artículo con estructura clara]

---
**Métricas recomendadas:**
- Tiempo de permanencia en página
- Tasa de rebote
- Shares en redes sociales
- Conversiones desde el CTA
```

**Importante**: Asegúrate de que el contenido sea original, valioso y mantenga al lector interesado desde la primera línea hasta la última.