# 🧠 Orquestación de Agentes IA

> Plataforma personal de auto-formación para crear tu agencia digital con IA en 48 semanas

[![GitHub license](https://img.shields.io/github/license/seojcarlos/orquestacion_de_agentes)](https://github.com/seojcarlos/orquestacion_de_agentes/blob/master/LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black)](https://nextjs.org/)

## 🚀 Inicio Rápido

```bash
# Clonar e instalar
git clone https://github.com/seojcarlos/orquestacion_de_agentes.git
cd orquestacion_de_agentes
npm install

# Iniciar desarrollo
npm run dev                    # Solo frontend (puerto 3000)
# O iniciar sistema completo
start-system.bat              # Frontend + Backend (puertos 3000 y 3001)
```

## 🏗️ Arquitectura

**Sistema Dual Frontend + Backend:**
- **Frontend**: Next.js + React (puerto 3000) - Interfaz educativa
- **Backend**: Node.js + Express (puerto 3001) - Sistema de agentes IA  
- **Comunicación**: REST APIs + WebSocket en tiempo real

```
Frontend (3000) ←→ Backend (3001) ←→ Agentes IA
```

## 📚 Documentación Organizada

Toda la documentación está ahora **perfectamente organizada** en `docs/`:

### **📊 01-project/** - Información del Proyecto
- `architecture.md` - Arquitectura técnica completa
- `current-status.md` - Estado actual y próximos pasos  
- `roadmap-48-weeks.md` - Plan maestro de 48 semanas
- `modular-structure.md` - Sistema modular implementado

### **📖 02-guides/** - Guías de Uso
- `claude-code-setup.md` - Configuración Claude Code optimizada
- `debugging-browser.md` - Manual de debug en navegador
- `content-creation.md` - Guía para crear contenido educativo
- `ux-reorganization.md` - Mejoras UX implementadas

### **📝 03-templates/** - Plantillas
- `content-template.md` - Plantilla oficial para contenido
- `page-example.tsx` - Ejemplo de página educativa avanzada

### **🤖 04-prompts/** - Para Claude Code
- `executable-prompt.md` - Prompt principal ejecutable  
- `quick-commands.md` - Comandos copy/paste listos
- `advanced-content.md` - Contenido educativo avanzado
- `token-emergency.md` - Comandos de emergencia

### **🚨 05-emergency/** - Protocolos de Emergencia
- `file-recovery.md` - Recuperación de archivos eliminados
- `code-protection.md` - Sistema de protección implementado
- `auto-testing.md` - Testing automático con Claude Code

### **📋 06-reference/** - Referencia Técnica
- `mi-agencia-ia-structure.md` - **Documentación completa del backend**
- `backend-api-endpoints.md` - **APIs y WebSocket endpoints**
- `claude-code-summary.md` - Resumen ejecutivo Claude Code
- `project-summary.md` - Resumen del proyecto completo

## 🎯 Comenzar Ahora

1. **Lee la guía rápida**: `GETTING_STARTED.md` (próximamente)
2. **Inicia el sistema**: `start-system.bat`
3. **Explora la plataforma**: `http://localhost:3000`
4. **Ve el backend**: `http://localhost:3001/health`

## 🔧 Para Claude Code

**Contexto optimizado** - Claude Code ahora tiene acceso directo a:
- **Prompts**: `docs/04-prompts/` - Todo listo para ejecutar
- **Backend**: `docs/06-reference/mi-agencia-ia-structure.md` - Sistema completo
- **APIs**: `docs/06-reference/backend-api-endpoints.md` - Endpoints documentados

## 🚀 Inicio Rápido

```bash
# Clonar el repositorio
git clone https://github.com/seojcarlos/orquestacion_de_agentes.git
cd orquestacion_de_agentes

# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev

# O iniciar ambos servidores
npm run dev:all

# Acceder a la aplicación
# http://localhost:3000 - Plataforma unificada
# http://localhost:3001 - API de agentes (opcional)
```

## 🌟 Características Principales

### 🎓 Academia de Agentes IA
**Programa progresivo de 4 semanas** para construir agentes IA desde cero:

- **Semana 1**: Agente Básico - Arquitectura fundamental sin frameworks
- **Semana 2**: Agente con Memoria - Persistencia con SQLite  
- **Semana 3**: Sistema Multi-Agente - Orquestación y comunicación
- **Semana 4**: Integración Claude Flow - Producción profesional

✨ **Características**:
- **Chat interactivo** con agente funcional
- **Laboratorio experimental** con configuraciones personalizadas
- **Sistema de progreso** completo con persistencia
- **Gamificación** con logros, niveles y experiencia
- **Evaluación IA** con Claude Flow para feedback inteligente

### 🏢 Agencia Digital IA
**Programa personal de 48 semanas efectivas (52 con vacaciones)** para crear tu propia agencia digital:

- **48 semanas** de formación estructurada + 4 semanas de vacaciones = 1 año completo
- **Uso personal**: Tu progreso, tu ritmo, tu agencia
- **Sistema modular**: Cada semana se enfoca en una competencia específica
- **Datos reales**: Tu progreso se guarda localmente (localStorage + SQLite)

> ⚠️ **Nota importante**: Los datos de progreso son REALES y se guardan localmente. Las evaluaciones de IA están en modo demo/mock hasta que conectes APIs reales de OpenAI/Claude.
- **4 fases** de desarrollo: Fundamentos, Orquestación, Visualización, Productización
- **11 agentes especializados** para servicios completos
- **Sistema SaaS** multi-tenant con facturación

### 📚 Tutoriales Interactivos
Guías paso a paso sobre tecnologías modernas:
- Next.js 14 y React Server Components
- TypeScript y desarrollo web moderno
- Optimización y performance
- Integración con herramientas IA

### 🧪 Playground Experimental
Laboratorio para probar nuevas ideas y conceptos avanzados.

## 🎯 Navegación de la Plataforma

### URLs Principales
- **🏠 Inicio**: `http://localhost:3000` - Dashboard principal
- **🎓 Academia**: `http://localhost:3000/academia` - Programa de 4 semanas
- **🏢 Agencia**: `http://localhost:3000/agencia` - Programa de 12 meses
- **📚 Tutoriales**: `http://localhost:3000/tutoriales` - Guías interactivas
- **🧪 Playground**: `http://localhost:3000/playground` - Área experimental

### Rutas de la Academia
- **Semana 1**: `http://localhost:3000/academia/semana-1` - Agente Básico
- **Laboratorio**: `http://localhost:3000/academia/laboratorio` - Experimentación
- **Dashboard**: Botón de estadísticas en la academia principal

## 🚀 Tecnologías

### Frontend
- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **Lucide React** - Iconografía moderna

### Backend & Datos
- **Claude Flow** - Orquestación de IA (modo mock implementado)
- **localStorage** - Persistencia del progreso
- **JSON** - Estructura de datos
- **Mock APIs** - Desarrollo y testing

### Arquitectura de Agentes
- **AgenteBasico** - Implementación completa en TypeScript
- **Sistema de Progreso** - Tracking con gamificación
- **Claude Flow Academia** - Integración IA para evaluación
- **Hooks personalizados** - Estado reactivo

## 🏗️ Estructura del Proyecto

```
src/
├── app/                          # App Router de Next.js
│   ├── academia/                 # 🎓 Academia de Agentes IA
│   │   ├── page.tsx             # Dashboard principal con progreso
│   │   ├── semana-1/            # Semana 1: Agente Básico
│   │   │   └── page.tsx         # Ejercicios interactivos + demo
│   │   └── laboratorio/         # Laboratorio de experimentación
│   │       └── page.tsx         # Chat configurable + herramientas
│   ├── agencia/                 # 🏢 Redirección a programa completo
│   ├── mi-agencia-ia/           # Programa de 12 meses (existente)
│   ├── tutoriales/              # 📚 Tutoriales interactivos
│   ├── playground/              # 🧪 Área experimental
│   ├── layout.tsx               # Layout unificado con NavBar
│   └── page.tsx                 # Página de inicio
├── components/                   # Componentes React
│   ├── academia/                # Componentes específicos de academia
│   │   ├── ChatAgenteBasico.tsx # Chat interactivo con agente real
│   │   ├── ProgresoSemana.tsx   # Tracking de progreso semanal
│   │   ├── EjercicioInteractivo.tsx # Ejercicios con evaluación IA
│   │   ├── PanelLogros.tsx      # Sistema de logros y gamificación
│   │   └── DashboardProgreso.tsx # Dashboard completo de estadísticas
│   └── layout/                  # Layout components
│       └── NavBar.tsx           # Navegación unificada con subnav
├── lib/                         # Lógica de negocio
│   ├── academia/                # Sistema de la academia
│   │   ├── SistemaProgreso.ts   # Gestión completa de progreso
│   │   └── ClaudeFlowAcademia.ts # Integración Claude Flow
│   └── agents/                  # Implementaciones de agentes
│       └── AgenteBasico.ts      # Agente IA funcional completo
├── hooks/                       # React Hooks personalizados
│   ├── useProgresoAcademia.ts   # Estado y funciones de progreso
│   └── useClaudeFlowAcademia.ts # Integración con Claude Flow
└── styles/
    └── globals.css              # Estilos base con Tailwind
```

## 🎯 Guía de Uso

### 1. Academia de Agentes IA

La **Academia** es el punto de partida perfecto para principiantes:

#### Comenzar el Aprendizaje
1. **Ir a Academia**: `http://localhost:3000/academia`
2. **Ver Dashboard**: Botón de estadísticas para progreso completo
3. **Iniciar Semana 1**: `http://localhost:3000/academia/semana-1`

#### Flujo de la Semana 1
1. **Estudiar Conceptos**: 
   - Qué es un Agente IA
   - Arquitectura Básica
2. **Ejercicios Prácticos**:
   - Primer Agente Simple (con código base)
   - Sistema de Memoria
3. **Proyecto Final**: Chatbot Personal
4. **Chat Interactivo**: Probar el agente implementado
5. **Laboratorio**: Experimentar con configuraciones

#### Sistema de Progreso
- **Progreso automático** al completar ejercicios
- **Logros desbloqueables**: 7 diferentes con rareza
- **Niveles y XP**: Sistema de gamificación completo
- **Estadísticas detalladas**: Tiempo, puntuaciones, rachas
- **Persistencia**: Todo se guarda automáticamente

### 2. Laboratorio de Experimentación

En `http://localhost:3000/academia/laboratorio`:

#### Configuraciones Disponibles
- **Personalidad del agente**: Formal, casual, académico
- **Límite de mensajes**: 10-200 mensajes en memoria
- **Contexto**: Activar/desactivar seguimiento
- **Ejemplos predefinidos**: 3 configuraciones listas

#### Funcionalidades
- **Chat en tiempo real** con agente configurable
- **Estadísticas en vivo**: Patrones, contexto, calidad
- **Exportar conversaciones**: JSON completo
- **Evaluación automática**: Puntuación de calidad

### 3. Sistema de Logros

#### Logros Disponibles
- **🎯 Primeros Pasos** (Común) - Completa tu primer ejercicio
- **⭐ Fundamentos Sólidos** (Poco común) - Completa Semana 1
- **⚡ Velocista** (Raro) - 5 ejercicios en un día
- **🏆 Perfeccionista** (Épico) - Puntuación perfecta en 3 consecutivos
- **⏰ Maratonista** (Raro) - 10+ horas de estudio
- **🔥 Constancia** (Épico) - Racha de 7 días
- **🧠 Maestro de Agentes** (Legendario) - Completa las 4 semanas

#### Sistema de Niveles
- **XP por ejercicios**: Basado en puntuación y tiempo
- **XP por logros**: Bonificación al desbloquear
- **Niveles progresivos**: Cada 1000 XP = nuevo nivel
- **Rachas de estudio**: Bonificación por constancia

### 4. Claude Flow (Modo Mock)

#### Funcionalidades Implementadas
- **Evaluación de código**: Análisis inteligente con feedback
- **Generación de ejercicios**: Contenido dinámico adaptado
- **Feedback personalizado**: Sugerencias basadas en progreso
- **Adaptación de dificultad**: Ajuste automático

#### Activar en Ejercicios
```typescript
<EjercicioInteractivo 
  ejercicio={miEjercicio}
  usarClaudeFlow={true} // Activa evaluación IA
  onCompletado={(puntuacion, tiempo) => {
    // Manejar completion
  }}
/>
```

## 🔧 Desarrollo y Personalización

### Crear Nuevos Ejercicios

```typescript
const nuevoEjercicio = {
  id: 'mi-ejercicio',
  titulo: 'Mi Ejercicio Personalizado',
  descripcion: 'Descripción del ejercicio',
  tipo: 'practica' as const,
  dificultad: 'medio' as const,
  codigoBase: `// Tu código base aquí
class MiAgente {
  constructor() {
    // Implementar
  }
}`,
  solucionEsperada: `// Solución completa`,
  tests: [
    {
      input: 'test input',
      expectedOutput: 'expected result',
      descripcion: 'Test description'
    }
  ],
  pistas: ['Pista 1', 'Pista 2'],
  tiempo_estimado: 30,
  puntos: 100
}
```

### Integrar con Sistema de Progreso

```typescript
import { useProgresoAcademia } from '@/hooks/useProgresoAcademia'

function MiComponente() {
  const { 
    completarEjercicio, 
    estadisticas, 
    logros,
    obtenerPorcentajeProgreso 
  } = useProgresoAcademia()
  
  const handleCompletion = async () => {
    try {
      const logrosNuevos = await completarEjercicio(
        1,           // semana
        'ejercicio-1', // id
        85,          // puntuación
        30           // tiempo en minutos
      )
      
      if (logrosNuevos.length > 0) {
        console.log('¡Nuevos logros!', logrosNuevos)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
}
```

### Personalizar Claude Flow

```typescript
import { useClaudeFlowAcademia } from '@/hooks/useClaudeFlowAcademia'

function ComponenteEvaluacion() {
  const { evaluarCodigo, loading } = useClaudeFlowAcademia()
  
  const evaluar = async () => {
    try {
      const resultado = await evaluarCodigo(
        codigo,           // string
        ejercicioId,      // string
        solucion,         // string esperada
        tests            // array de tests
      )
      
      console.log('Evaluación:', {
        puntuacion: resultado.puntuacion,
        errores: resultado.errores,
        sugerencias: resultado.sugerencias
      })
    } catch (error) {
      console.error('Error evaluando:', error)
    }
  }
}
```

## 📊 Estado del Proyecto

### 🔍 **DATOS REALES vs DATOS DEMO**

> ⚠️ **IMPORTANTE**: Para evitar confusiones sobre qué datos son reales y cuáles son de demostración.

#### ✅ **DATOS REALES (Se guardan y persisten)**
- **Tu progreso personal**: Semana actual, ejercicios completados, tiempo invertido
- **Tus logros**: Logros desbloqueados, fechas de obtención, rachas reales
- **Tus configuraciones**: Preferencias de interfaz, configuración de agentes
- **Tu historial**: Ejercicios intentados, puntuaciones reales obtenidas
- **Base de datos local**: SQLite en mi-agencia-ia para tareas y memoria de agentes

**Ubicación**: `localStorage` del navegador + `./mi-agencia-ia/database/` (SQLite)

#### 🧪 **DATOS DEMO/MOCK (Solo para demostración)**
- **Evaluaciones de IA**: Las evaluaciones automáticas de código están simuladas
- **Feedback inteligente**: Las sugerencias "de IA" están pre-programadas
- **Análisis de complejidad**: Los análisis automáticos usan algoritmos básicos
- **Adaptación de dificultad**: Lógica simplificada, no IA real

**Cambiar a datos reales**:
```typescript
// src/lib/academia/ClaudeFlowAcademia.ts - Línea 72
private mockMode: boolean = false // ⬅️ Cambiar a false

// Luego configurar API keys en .env.local
CLAUDE_API_KEY=tu_api_key_real
OPENAI_API_KEY=tu_api_key_real
```

### ✅ Completado

#### 🎓 Academia de Agentes IA
- ✅ **Estructura completa** de 4 semanas
- ✅ **Agente básico funcional** con chat interactivo
- ✅ **Sistema de progreso** con persistencia REAL
- ✅ **Gamificación completa** con logros y niveles REALES
- ✅ **Laboratorio** de experimentación
- ✅ **Dashboard** de estadísticas detalladas REALES
- ✅ **Ejercicios interactivos** con evaluación (MODO DEMO)

#### 🌐 Navegación Unificada
- ✅ **NavBar responsive** con subnav contextual
- ✅ **Rutas integradas** entre todas las secciones
- ✅ **Indicador Claude Flow** en tiempo real
- ✅ **Navegación móvil** completamente funcional

#### 🤖 Sistema de Agentes
- ✅ **AgenteBasico** implementado en TypeScript
- ✅ **Claude Flow** modo mock funcional
- ✅ **Evaluación IA** con feedback detallado
- ✅ **Hooks de integración** React

#### 📈 Sistema de Progreso
- ✅ **Tracking automático** de ejercicios
- ✅ **7 logros diferentes** con sistema de rareza
- ✅ **Niveles y experiencia** con cálculo automático
- ✅ **Persistencia localStorage** con importar/exportar
- ✅ **Estadísticas detalladas** tiempo real

### 🚧 En Desarrollo
- [ ] **Semanas 2-4** - Contenido completo restante
- [ ] **Claude Flow Real** - Integración con API Anthropic
- [ ] **Tests automatizados** - Suite de testing
- [ ] **Certificaciones** - Sistema de certificados

### 🔮 Roadmap Futuro
- [ ] **Modo colaborativo** - Múltiples usuarios
- [ ] **Análisis avanzado** - Métricas de aprendizaje
- [ ] **Mobile app** - Aplicación nativa
- [ ] **PWA** - Funcionalidad offline

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Solo frontend (puerto 3000)
npm run agent-server     # Solo backend agentes (puerto 3001)
npm run dev:all          # Ambos servidores

# Producción
npm run build           # Construir aplicación
npm start              # Servidor de producción

# Utilidades
npm run lint           # Verificar código
npm run type-check     # Verificar tipos TypeScript

# Windows
start-system.bat       # Iniciar todo automáticamente
```

## 🔗 URLs del Sistema

### Desarrollo
- **Frontend Principal**: http://localhost:3000
- **API Agentes**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **WebSocket**: ws://localhost:3001

### Rutas Principales
- **🏠 Inicio**: `/` - Dashboard con overview de todas las secciones
- **🎓 Academia**: `/academia` - Programa de 4 semanas con dashboard
- **🏢 Agencia**: `/agencia` - Programa de 12 meses (redirección)
- **📚 Tutoriales**: `/tutoriales` - Guías interactivas existentes
- **🧪 Playground**: `/playground` - Área experimental

### Academia - Rutas Específicas
- **Semana 1**: `/academia/semana-1` - Agente Básico con ejercicios
- **Laboratorio**: `/academia/laboratorio` - Experimentación libre
- **Futuras Semanas**: `/academia/semana-[2-4]` - Contenido avanzado

## 📋 Configuración del Entorno

### Variables de Entorno (Opcionales)
```bash
# .env.local (para producción con Claude Flow real)
CLAUDE_API_KEY=sk-ant-...
CLAUDE_FLOW_MODE=production  # o "mock" para desarrollo
DATABASE_URL=sqlite:./academia.db
```

### Configuración por Defecto
- **Claude Flow**: Modo mock activado
- **Base de datos**: localStorage del navegador
- **Puerto frontend**: 3000 (con fallback a 3002)
- **Puerto backend**: 3001

## 🤝 Contribución

### Cómo Contribuir
1. **Fork** el repositorio
2. **Crea** una rama: `git checkout -b feature/mi-feature`
3. **Desarrolla** usando los componentes existentes
4. **Testa** en la academia y laboratorio
5. **Commit**: `git commit -m 'Añadir mi feature'`
6. **Push**: `git push origin feature/mi-feature`
7. **Pull Request** con descripción detallada

### Áreas de Contribución
- **Contenido Semanas 2-4**: Ejercicios y proyectos
- **Agentes Especializados**: Nuevas implementaciones
- **Claude Flow Real**: Integración con API
- **UI/UX**: Mejoras en la experiencia
- **Testing**: Suite de tests automatizados

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- **Anthropic** por Claude y la inspiración en IA
- **Vercel** por Next.js y las herramientas de desarrollo
- **Tailwind CSS** por el sistema de diseño
- **React Team** por el framework fundamental
- **Comunidad Open Source** por todas las librerías utilizadas

---

## 📞 Soporte y Comunidad

- **📚 Documentación**: [Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code)
- **🐛 Issues**: [GitHub Issues](https://github.com/anthropics/claude-code/issues)
- **💬 Discusiones**: [GitHub Discussions](https://github.com/anthropics/claude-code/discussions)
- **📧 Contacto**: Para consultas específicas del proyecto

---

<div align="center">

**🚀 ¡Comienza tu viaje en el desarrollo de agentes IA hoy mismo!**

[🎓 Ir a la Academia](http://localhost:3000/academia) | [🏢 Ver Programa Completo](http://localhost:3000/agencia) | [📚 Explorar Tutoriales](http://localhost:3000/tutoriales)

**⭐ Si este proyecto te ha sido útil, ¡dale una estrella en GitHub! ⭐**

</div>
