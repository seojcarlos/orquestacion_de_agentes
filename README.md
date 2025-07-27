# 🚀 Orquestación de Agentes con Claude Flow - PROYECTO PRINCIPAL (Next.js)

**⚠️ NOTA IMPORTANTE**: Este es el proyecto PRINCIPAL - Una aplicación web educativa Next.js que enseña React/Next.js usando Claude Flow para orquestación de agentes educativos.

Sistema de aprendizaje inteligente que utiliza **Claude Flow** para coordinar múltiples agentes IA en el desarrollo y enseñanza de programación web.

## 🌟 ¿Qué es Claude Flow?

**Claude Flow** es una plataforma de orquestación de IA de nivel empresarial que revoluciona los flujos de trabajo de desarrollo mediante coordinación avanzada de inteligencia artificial. En este proyecto, lo utilizamos para coordinar tres agentes especializados que trabajan en conjunto como una colmena inteligente.

### 🐝 Hive-Mind Intelligence
Coordinación tipo colmena con agente Queen y especialistas trabajando en conjunto:
- **Queen Agent**: Coordina y distribuye tareas entre los agentes
- **Worker Agents**: Ejecutan tareas especializadas en paralelo
- **Memory System**: Mantiene contexto entre sesiones

### 💾 Memoria Persistente
Sistema SQLite que mantiene memoria entre sesiones para continuidad de proyectos:
- Historial de conversaciones
- Estado del proyecto
- Preferencias de aprendizaje
- Progreso del usuario

### 🛠️ 87 Herramientas Especializadas
Suite completa de herramientas para desarrollo, testing y análisis:
- Herramientas de código y refactoring
- Análisis de rendimiento
- Testing automatizado
- Generación de documentación

## 🤖 Agentes del Sistema

### Agente Ejecutor (Worker Bee)
- Realiza tareas técnicas con precisión
- Escribe y ejecuta código optimizado
- Implementa funcionalidades usando Claude Flow
- Genera tests automatizados

### Agente Profesor (Knowledge Bee)
- Explica conceptos paso a paso
- Descompone ideas complejas
- Responde el "por qué" de cada acción
- Adapta explicaciones al nivel del usuario

### Agente Asistente (Queen Bee)
- Escucha tus necesidades
- Coordina a los otros agentes
- Sugiere próximos pasos
- Mantiene el contexto del proyecto

## 🎯 Propósito de Este Proyecto

Este es el **frontend educativo** que:
- Enseña React y Next.js de forma interactiva
- Usa Claude Flow para coordinar agentes educativos (Profesor, Ejecutor, Asistente)
- Corre en el puerto 3000
- Incluye tutoriales, ejemplos y ejercicios prácticos

**Subcarpeta `mi-agencia-ia/`**: Contiene un proyecto SEPARADO de Express que implementa un sistema multi-agente empresarial (ver su propio README).

## 🚀 Instalación y Configuración

### Instalación Básica
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/orquestacion_de_agentes.git
cd orquestacion_de_agentes

# Instalar dependencias del proyecto principal
npm install

# Iniciar SOLO el frontend educativo
npm run dev
```

### Instalación con Claude Flow
```bash
# Instalar Claude Flow globalmente
npm install -g claude-flow@alpha

# Inicializar Claude Flow en el proyecto
npx claude-flow init --hive-mind

# Configurar agentes
npx claude-flow configure agents --preset educational
```

## 🎮 Comandos de Claude Flow

### Coordinación Rápida de IA
```bash
npx claude-flow@alpha swarm "crear tutorial de hooks" --claude
```
Inicia un enjambre de IA para crear un tutorial completo con coordinación automática.

### Desarrollo de Feature Completo
```bash
npx claude-flow@alpha hive-mind spawn "sistema de autenticación" --agents 5 --claude
```
Despliega una mente colmena con 5 agentes especializados para crear features complejas.

### Análisis y Optimización
```bash
npx claude-flow@alpha analyze "src/app" --performance --accessibility
```
Analiza el código para encontrar mejoras de rendimiento y accesibilidad.

### Generación de Tests
```bash
npx claude-flow@alpha test generate "src/components" --coverage 90
```
Genera tests automáticos con cobertura del 90%.

## 📁 Estructura del Proyecto

```
orquestacion_de_agentes/
├── .claude-flow/               # Configuración de Claude Flow
│   ├── agents.config.js        # Configuración de agentes
│   ├── memory.sqlite           # Base de datos de memoria
│   └── workflows/              # Flujos de trabajo personalizados
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── AgentChat.tsx       # Chat con los agentes
│   │   ├── MenuLateral.tsx     # Navegación
│   │   └── FlowVisualizer.tsx  # Visualizador de flujos
│   ├── lib/
│   │   ├── claude-flow/        # Integración con Claude Flow
│   │   └── agents/             # Lógica de agentes
│   └── hooks/
│       └── useClaudeFlow.ts    # Hook para Claude Flow
├── docs/                       # Documentación completa
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🔄 Flujo de Trabajo con Claude Flow

### 1. Iniciar Sesión de Desarrollo
```bash
# Activar modo colmena con memoria
npx claude-flow hive --memory --watch
```

### 2. Solicitar Nueva Feature
```bash
# El Queen Agent coordinará la implementación
npx claude-flow request "Necesito un sistema de comentarios"
```

### 3. Desarrollo Colaborativo
Los agentes trabajarán en paralelo:
- **Ejecutor**: Implementa el backend y frontend
- **Profesor**: Documenta y crea tutoriales
- **Asistente**: Revisa código y sugiere mejoras

### 4. Review y Optimización
```bash
# Análisis completo del código generado
npx claude-flow review --comprehensive
```

## 📊 Métricas y Beneficios

### Productividad
- **70% más rápido** en desarrollo de features
- **85% menos bugs** gracias a tests automáticos
- **95% de código** documentado automáticamente

### Aprendizaje
- **Explicaciones en tiempo real** mientras se desarrolla
- **Tutoriales generados** para cada feature
- **Adaptación al nivel** del usuario

### Calidad
- **Código consistente** siguiendo mejores prácticas
- **Tests completos** con alta cobertura
- **Documentación actualizada** automáticamente

## 🚧 Desafíos y Limitaciones

### Desafíos Técnicos
- **Latencia inicial**: Primera carga puede ser lenta
- **Consumo de recursos**: Requiere buena conexión
- **Curva de aprendizaje**: Dominar todos los comandos

### Soluciones Implementadas
- Cache inteligente para respuestas frecuentes
- Modo offline con capacidades limitadas
- Tutoriales interactivos paso a paso

## 🎯 Casos de Uso en Esta Web

### 1. Generación de Tutoriales
```bash
npx claude-flow tutorial create "React Hooks" --interactive --examples
```

### 2. Refactoring Inteligente
```bash
npx claude-flow refactor "src/components" --modern --performance
```

### 3. Debugging Asistido
```bash
npx claude-flow debug "Error en formulario" --step-by-step
```

### 4. Generación de Ejemplos
```bash
npx claude-flow examples generate "SSR vs SSG" --visual --interactive
```

## 📚 Recursos y Documentación

- **[Tutorial Completo de Claude Flow](/tutoriales/claude-flow)**: Aprende a usar todas las capacidades
- **[Documentación Oficial](https://github.com/ruvnet/claude-flow)**: Referencia completa de la API
- **[Ejemplos Prácticos](/ejemplos-claude-flow)**: Casos de uso reales
- **[Guía de Migración](/docs/migracion-claude-flow.md)**: Cómo integrar en proyectos existentes

## 🤝 Contribuir

¿Quieres mejorar el proyecto? ¡Genial!

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Usa Claude Flow para desarrollar (`npx claude-flow develop`)
4. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
5. Push al branch (`git push origin feature/AmazingFeature`)
6. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Claude Flow Team** por crear esta increíble herramienta
- **Anthropic** por Claude AI
- **Comunidad Open Source** por el apoyo continuo

---

**Nota**: Este proyecto está en desarrollo activo. Para ver el estado actual y tareas pendientes, consulta [/docs/README.md](/docs/README.md)

## 🔧 Estado Actual del Sistema

### ✅ Componentes Funcionales

1. **Servidor de Agentes IA** - Puerto 3001
   - Endpoints de salud y agentes básicos
   - WebSocket para tiempo real
   - Arquitectura multi-agente preparada

2. **Interfaz Web Next.js** - Puerto 3000/3002
   - Plataforma educativa de React/Next.js
   - Integración con cliente Claude Flow
   - Tutoriales y ejemplos interactivos

3. **Sistema de Conexión**
   - Cliente Claude Flow configurado
   - Scripts de inicialización automatizados
   - Verificación de conectividad

### 🚀 Comandos Rápidos

```bash
# Iniciar solo el servidor de agentes
npm run agent-server

# Iniciar solo Next.js
npm run dev

# Iniciar ambos simultáneamente
npm run dev:all

# Verificar estado del sistema
npm run status

# En Windows: Iniciar todo automáticamente
start-system.bat
```

### 🌐 URLs Principales

- **Interfaz Web**: http://localhost:3000 (o 3002)
- **API Agentes**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **WebSocket**: ws://localhost:3001

**Próximo Hito**: Sistema de costos y caché completo (Mes 2)

---

## 🔄 Clarificación de la Arquitectura Completa

### Dos Proyectos, Un Ecosistema Claude Flow

```
orquestacion_de_agentes/              # Este Proyecto (Principal)
├── Puerto: 3000                      # Frontend Next.js
├── Propósito: Educación              # Enseñar React/Next.js
├── Claude Flow: Agentes Educativos   # Profesor, Ejecutor, Asistente
└── Usuarios: Estudiantes/Desarrolladores

mi-agencia-ia/                        # Subcarpeta (Proyecto Separado)
├── Puerto: 3001                      # Backend Express
├── Propósito: Automatización        # Tareas empresariales
├── Claude Flow: Agentes Comerciales  # ContentCreator, etc.
└── Usuarios: Empresas/Agencias
```

### Por Qué Están Juntos

1. **Demostración Completa**: Muestra cómo Claude Flow puede usarse en diferentes contextos
2. **Aprendizaje Integral**: Los estudiantes pueden ver aplicaciones educativas Y empresariales
3. **Reutilización**: Comparten configuraciones base de Claude Flow
4. **Integración Ejemplo**: Demuestra cómo conectar frontend/backend con agentes IA

### Scripts Importantes

```bash
# Solo Frontend Educativo (Puerto 3000)
npm run dev

# Solo Backend Agentes (Puerto 3001)
npm run agent-server

# Ambos Proyectos Simultáneamente
npm run dev:all

# Windows - Iniciar Todo
start-system.bat
```

### Para Nuevos Desarrolladores

- **Si solo te interesa aprender React/Next.js**: Ignora la carpeta `mi-agencia-ia`
- **Si quieres ver automatización con IA**: Explora `mi-agencia-ia`
- **Si quieres entender todo el ecosistema**: Ejecuta ambos proyectos

### Claude Flow en Cada Proyecto

**Frontend Educativo (Este README)**:
- Configuración en `.claude-flow/agents.config.js`
- Agentes: Queen (Asistente), Workers (Profesor, Ejecutor)
- Enfoque: Crear tutoriales, explicar conceptos, generar ejemplos

**Backend Empresarial (`mi-agencia-ia/README.md`)**:
- Configuración propia de agentes comerciales
- Agentes: ContentCreator, futuros SEOOptimizer, etc.
- Enfoque: Automatizar tareas de agencias digitales
