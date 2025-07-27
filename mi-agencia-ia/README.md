# 🚀 Mi Agencia IA - Sistema Multi-Agente EMPRESARIAL (Express)

**⚠️ NOTA IMPORTANTE**: Este es un proyecto SEPARADO del frontend educativo. Es un backend Express que implementa agentes empresariales para automatización de tareas.

**📢 RELACIÓN CON EL PROYECTO PRINCIPAL**: 
- Este proyecto está en la subcarpeta `mi-agencia-ia/` dentro del proyecto educativo
- Es un sistema INDEPENDIENTE que corre en el puerto 3001
- También usa Claude Flow pero para propósitos diferentes (automatización empresarial vs educación)

Sistema de agencia digital automatizada con múltiples agentes de IA especializados, implementando una arquitectura escalable y orientada a eventos.

## 🌟 Características

- **Arquitectura Multi-Agente**: Agentes especializados para diferentes tipos de tareas
- **Task Management Robusto**: Sistema completo de gestión de tareas con versionado
- **Prompts como Código**: Sistema de prompts centralizado y versionado
- **Bucle de Corrección**: Aprendizaje automático basado en feedback humano
- **API REST Completa**: Endpoints para todas las operaciones
- **WebSocket en Tiempo Real**: Actualizaciones instantáneas de estado
- **Sistema de Métricas**: Análisis detallado de rendimiento y costos

## 🤝 Integración con Claude Flow

Este proyecto TAMBIÉN usa Claude Flow pero con un enfoque diferente:

**Proyecto Principal (Next.js - Puerto 3000)**:
- Claude Flow para agentes EDUCATIVOS (Profesor, Ejecutor, Asistente)
- Enfocado en enseñar y crear tutoriales
- Memoria para el progreso de aprendizaje

**Este Proyecto (Express - Puerto 3001)**:
- Claude Flow para agentes EMPRESARIALES (ContentCreator, etc.)
- Enfocado en automatización de tareas comerciales
- Memoria para historial de tareas y optimización

## 🏗️ Arquitectura

```
mi-agencia-ia/                  # SUBCARPETA dentro del proyecto principal
  /src
    /core
      - TaskManager.js          # Gestión del ciclo de vida de tareas
      - PromptManager.js        # Sistema de prompts centralizado
      - task.schema.json        # Schema JSON de tareas
      - taskValidator.js        # Validación de tareas
    /agents
      - BaseAgent.js            # Clase padre para todos los agentes
      - ContentCreatorAgent.js  # Agente de creación de contenido
    /prompts
      /system                   # Prompts base por agente
      /tasks                    # Prompts específicos por tarea
      /templates                # Componentes reutilizables
    server.js                   # Servidor Express principal (Puerto 3001)
    simple-server.js            # Servidor simplificado para integración
```

## 🚀 Inicio Rápido

### Instalación

```bash
# Desde la raíz del proyecto principal
cd orquestacion_de_agentes/mi-agencia-ia

# Instalar dependencias de este subproyecto
npm install

# Iniciar el servidor de agentes (Puerto 3001)
npm run dev

# O usar el script del proyecto principal:
# cd .. && npm run agent-server
```

### Ejecutar Ambos Proyectos

```bash
# Desde la raíz del proyecto principal
# Opción 1: Usar el script combinado
npm run dev:all

# Opción 2: En Windows
start-system.bat

# Opción 3: Manualmente en terminales separadas
# Terminal 1: npm run dev (Frontend Next.js - Puerto 3000)
# Terminal 2: npm run agent-server (Backend Express - Puerto 3001)
```

### Uso Básico

1. **Crear una Tarea**:
```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "project-123",
    "targetAgent": "content_creator",
    "prompt": "Crear un blog post sobre IA",
    "context": {
      "audience": "developers",
      "tone": "professional"
    },
    "priority": 8
  }'
```

2. **Ver Estado de Tareas**:
```bash
curl http://localhost:3001/api/tasks
```

3. **Dashboard General**:
```bash
curl http://localhost:3001/api/dashboard
```

## 🤖 Agentes Disponibles

### ContentCreatorAgent (`content_creator`)
Especializado en creación de contenido:
- Blog posts optimizados para SEO
- Copy para redes sociales
- Contenido para emails
- Landing pages copy
- Artículos técnicos

**Ejemplo de uso**:
```json
{
  "targetAgent": "content_creator",
  "prompt": "Crear un artículo sobre las mejores prácticas de React",
  "context": {
    "wordCount": 1200,
    "audience": "desarrolladores",
    "seoKeywords": ["React", "best practices", "hooks"]
  }
}
```

## 📊 API Endpoints

### Tareas
- `POST /api/tasks` - Crear nueva tarea
- `GET /api/tasks` - Listar tareas (con filtros)
- `GET /api/tasks/:taskId` - Obtener tarea específica
- `POST /api/tasks/:taskId/feedback` - Aplicar feedback humano
- `POST /api/tasks/:taskId/process` - Procesar tarea manualmente

### Métricas
- `GET /api/agents/:agentId/metrics` - Métricas de agente
- `GET /api/dashboard` - Dashboard general del sistema

### Sistema
- `GET /health` - Estado de salud del sistema

## 🔧 Scripts Disponibles

```bash
npm run dev          # Iniciar en modo desarrollo
npm run start        # Iniciar en modo producción
npm test             # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run test:coverage # Tests con cobertura
```

## 📝 Schema de Tareas

Cada tarea sigue el Task Schema v1.0 que incluye:

- **Identificación**: `taskId`, `projectId`, `parentTaskId`
- **Estado**: `status`, `priority`, `createdAt`, `updatedAt`
- **Agentes**: `requesterAgent`, `targetAgent`
- **Contenido**: `input` (prompt, context, data), `output`
- **Ejecución**: `execution` (modelo, tokens, costo, duración)
- **Historial**: Array completo de cambios y eventos
- **Feedback**: `humanFeedback` para el bucle de corrección
- **Metadatos**: Versión, entorno, tenant, tags

## 🎯 Estados de Tareas

- `pending` - Tarea creada, esperando procesamiento
- `queued` - En cola de procesamiento
- `in_progress` - Siendo procesada por el agente
- `needs_validation` - Requiere validación humana
- `completed` - Completada satisfactoriamente
- `failed` - Falló durante el procesamiento
- `cancelled` - Cancelada (ej. por corrección)

## 🔄 Bucle de Corrección

El sistema implementa un bucle de corrección automático:

1. **Evaluación**: Cada output tiene un `confidenceScore`
2. **Decisión**: Scores bajos van a validación humana
3. **Feedback**: Humanos pueden aprobar o solicitar corrección
4. **Aprendizaje**: El sistema aprende de las correcciones
5. **Mejora**: Los prompts se mejoran automáticamente

## 📈 Métricas y Monitoreo

El sistema rastrea métricas detalladas:

- **Por Agente**: Tareas procesadas, tasa de éxito, tiempo promedio
- **Por Modelo**: Costo, rendimiento, calidad
- **Por Prompt**: Uso, efectividad, mejoras
- **Sistema**: Throughput, costos totales, ROI

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Tests con cobertura
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

Los tests cubren:
- ✅ TaskManager (CRUD, validaciones, métricas)
- ✅ PromptManager (carga, renderizado, caché)
- ✅ BaseAgent (funcionalidad común)
- ✅ ContentCreatorAgent (especialización)

## 🔮 Roadmap Futuro

### Mes 2-3
- [ ] Implementar CostOptimizer
- [ ] Añadir CorrectionLoop completo
- [ ] Integrar Redis para caché
- [ ] Más agentes especializados

### Mes 4-6
- [ ] Arquitectura de eventos completa
- [ ] Sistema de workflows
- [ ] Agente crítico para QA
- [ ] Dashboard visual interactivo

### Mes 7-12
- [ ] React Flow para visualización
- [ ] Sistema multi-tenant
- [ ] Integración con Stripe
- [ ] Productización completa

## 🤝 Contribuir

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/amazing-feature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Abrir Pull Request

## 📄 Licencia

MIT License - ver archivo [LICENSE](LICENSE) para detalles.

---

**Estado Actual**: 🟢 Fundamentos sólidos implementados
**Versión**: v1.0.0 - Arquitectura base funcional
**Próximo Hito**: Sistema de costos y caché (Mes 2)

---

## 🔄 Clarificación de la Arquitectura Completa

### Dos Proyectos, Un Ecosistema Claude Flow

```
orquestacion_de_agentes/              # Proyecto Principal
├── Puerto: 3000                      # Frontend Next.js
├── Propósito: Educación              # Enseñar React/Next.js
├── Claude Flow: Agentes Educativos   # Profesor, Ejecutor, Asistente
└── Usuarios: Estudiantes/Desarrolladores

mi-agencia-ia/                        # Subproyecto
├── Puerto: 3001                      # Backend Express
├── Propósito: Automatización        # Tareas empresariales
├── Claude Flow: Agentes Comerciales  # ContentCreator, etc.
└── Usuarios: Empresas/Agencias
```

### Cómo Trabajan Juntos

1. **Desarrollo Independiente**: Cada proyecto puede funcionar solo
2. **Integración Opcional**: El frontend puede consumir APIs del backend
3. **Claude Flow Compartido**: Ambos usan la misma tecnología pero con configuraciones diferentes
4. **Memoria Separada**: Cada uno tiene su propia base de datos SQLite

### Para Desarrolladores

- **Solo quiero aprender React/Next.js**: Usa solo el proyecto principal
- **Solo quiero automatización de tareas**: Usa solo mi-agencia-ia
- **Quiero ver cómo integrar ambos**: Ejecuta los dos proyectos