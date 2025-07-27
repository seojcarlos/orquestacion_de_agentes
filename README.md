# 🚀 Agencia Digital IA - Formación Completa de 12 Meses

[![GitHub license](https://img.shields.io/github/license/seojcarlos/orquestacion_de_agentes)](https://github.com/seojcarlos/orquestacion_de_agentes/blob/master/LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-blue)](https://www.typescriptlang.org/)

Una plataforma educativa unificada para crear tu propia **Agencia Digital potenciada por IA** desde cero hasta producción. Plan completo de **12 meses** con **960+ tareas** guiadas paso a paso.

## 🏁 Inicio Rápido

```bash
# Clonar el repositorio
git clone https://github.com/seojcarlos/orquestacion_de_agentes.git
cd orquestacion_de_agentes

# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev

# Acceder a la aplicación
# http://localhost:3000 - Plataforma completa
```

## 🎯 ¿Qué vas a construir?

### 🏢 **Tu Propia Agencia Digital IA**
En 12 meses construirás un **sistema SaaS completo** que incluye:

- **11 Agentes Especializados** trabajando en orquestación
- **Arquitectura Multi-Tenant** lista para múltiples clientes
- **Sistema de Facturación** integrado con Stripe
- **Canvas Visual** para gestionar agentes con React Flow
- **Optimización Automática** de costos con router de modelos
- **Sistema de Aprendizaje** que mejora con cada uso

### 📈 **Roadmap de Transformación**
- **Mes 1-3**: Fundamentos (Agentes básicos → Claude Flow)
- **Mes 4-6**: Orquestación (Multi-agente → MVP)
- **Mes 7-9**: Visualización (React Flow → Analytics)
- **Mes 10-12**: Productización (SaaS → Lanzamiento)

## 🌟 Características de la Plataforma

### 🎓 **Formación Estructurada**
- **48 semanas** de contenido progresivo
- **960+ tareas** con validación automática
- **Sistema de progreso** con gamificación
- **Laboratorio interactivo** para experimentación

### 🤖 **Agentes IA Funcionales**
- **AgenteBasico** implementado desde cero
- **Sistema de memoria** persistente
- **Chat interactivo** en tiempo real
- **Claude Flow** integrado (modo mock + producción)

### ⚡ **Tecnología Moderna**
- **Next.js 14** con App Router
- **TypeScript** para tipado estático
- **Tailwind CSS** para diseño responsive
- **React Hooks** personalizados

## 🗺️ Navegación de la Plataforma

### **URLs Principales**
- **🏠 Inicio**: `/` - Dashboard principal
- **🏢 Agencia**: `/agencia` - Formación completa de 12 meses
- **📚 Tutoriales**: `/tutoriales` - Guías complementarias
- **🧪 Playground**: `/playground` - Área experimental

### **Formación por Meses**
- **Mes 1**: `/agencia/mes-1` - **Fundamentos** (4 semanas)
  - Semana 1: `/agencia/mes-1/semana-1` - Agente Básico
  - Semana 2: Agente con Memoria
  - Semana 3: Sistema Multi-Agente  
  - Semana 4: Integración Claude Flow

- **Mes 2**: `/agencia/mes-2` - **Prompts y Optimización**
- **Mes 3**: `/agencia/mes-3` - **Sistema de Corrección**
- **...** (Mes 4-12 en desarrollo)

### **Herramientas**
- **Laboratorio**: `/agencia/laboratorio` - Experimentación avanzada

## 🏗️ Estructura del Proyecto

```
src/
├── app/                          # Next.js App Router
│   ├── agencia/                  # 🏢 Formación de 12 meses
│   │   ├── page.tsx              # Landing con roadmap completo
│   │   ├── mes-1/                # Mes 1: Fundamentos
│   │   │   ├── page.tsx          # Overview del mes
│   │   │   └── semana-1/         # Semana 1: Agente Básico
│   │   │       └── page.tsx      # Ejercicios interactivos
│   │   ├── mes-2/                # Mes 2: Prompts (futuro)
│   │   └── laboratorio/          # Área de experimentación
│   │       └── page.tsx          # Chat configurable + herramientas
│   ├── tutoriales/               # 📚 Tutoriales complementarios
│   ├── playground/               # 🧪 Área experimental
│   ├── api/                      # APIs necesarias
│   │   └── mi-agencia-ia/        # APIs de contenido
│   ├── layout.tsx                # Layout con navegación unificada
│   └── page.tsx                  # Página de inicio
├── components/                   # Componentes React
│   ├── academia/                 # Componentes educativos
│   │   ├── ChatAgenteBasico.tsx  # Chat con agente real
│   │   ├── EjercicioInteractivo.tsx # Ejercicios con evaluación
│   │   ├── ProgresoSemana.tsx    # Tracking de progreso
│   │   ├── PanelLogros.tsx       # Sistema de logros
│   │   └── DashboardProgreso.tsx # Dashboard completo
│   └── layout/
│       └── NavBar.tsx            # Navegación unificada
├── hooks/                        # React Hooks personalizados
│   ├── useProgresoAcademia.ts    # Estado y progreso
│   └── useClaudeFlowAcademia.ts  # Integración Claude Flow
├── lib/                          # Lógica de negocio
│   ├── academia/                 # Sistema educativo
│   │   ├── SistemaProgreso.ts    # Gestión completa de progreso
│   │   └── ClaudeFlowAcademia.ts # Claude Flow con modo mock
│   └── agents/
│       └── AgenteBasico.ts       # Agente IA funcional
└── styles/
    └── globals.css               # Estilos base
```

## 🎯 Guía de Uso

### **1. Empezar la Formación**

#### **Paso 1: Acceder a la Agencia**
```
http://localhost:3000/agencia
```
- Revisa el **roadmap completo** de 12 meses
- Comprende las **4 fases** de desarrollo
- Ve el **stack tecnológico** que dominarás

#### **Paso 2: Comenzar Mes 1**
```
http://localhost:3000/agencia/mes-1
```
- **4 semanas** de fundamentos sólidos
- **18-23 horas** de contenido práctico
- **Sistema de progreso** con persistencia automática

#### **Paso 3: Semana 1 - Tu Primer Agente**
```
http://localhost:3000/agencia/mes-1/semana-1
```

**Flujo de Aprendizaje:**
1. **Conceptos fundamentales** - ¿Qué es un Agente IA?
2. **Arquitectura básica** - Input → Procesamiento → Output
3. **Primer agente simple** - JavaScript puro, sin frameworks
4. **Sistema de memoria** - Persistencia de conversaciones
5. **Proyecto final** - Chatbot personal completo

### **2. Sistema de Progreso**

#### **Progreso Automático**
- ✅ **Ejercicios completados** se marcan automáticamente
- 📊 **Estadísticas en tiempo real** de tu avance
- 🏆 **Sistema de logros** con 7 niveles diferentes
- 💾 **Persistencia automática** en localStorage

#### **Logros Disponibles**
- **🎯 Primeros Pasos** (Común) - Completa tu primer ejercicio
- **⭐ Fundamentos Sólidos** (Poco común) - Completa Mes 1
- **⚡ Velocista** (Raro) - 5 ejercicios en un día
- **🏆 Perfeccionista** (Épico) - Puntuación perfecta 3 veces
- **⏰ Maratonista** (Raro) - 10+ horas de estudio
- **🔥 Constancia** (Épico) - Racha de 7 días
- **🧠 Maestro de Agentes** (Legendario) - Completa la formación

### **3. Laboratorio de Experimentación**

```
http://localhost:3000/agencia/laboratorio
```

#### **Funcionalidades del Laboratorio**
- **Chat en tiempo real** con agente configurable
- **Configuraciones personalizadas**:
  - Personalidad del agente
  - Límite de mensajes en memoria
  - Activar/desactivar contexto
- **Estadísticas en vivo**: patrones, contexto, calidad
- **Exportar conversaciones** en formato JSON
- **Evaluación automática** de respuestas

### **4. Claude Flow (Modo Mock + Producción)**

#### **Funcionalidades Implementadas**
- **Evaluación de código** con análisis inteligente
- **Generación de ejercicios** dinámicos
- **Feedback personalizado** basado en progreso
- **Adaptación de dificultad** automática

#### **Configuración de Producción**
```bash
# .env.local (opcional - por defecto usa modo mock)
CLAUDE_API_KEY=sk-ant-...
CLAUDE_FLOW_MODE=production
```

## 💻 Desarrollo y Personalización

### **Scripts Disponibles**

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo (puerto 3000)
npm run build           # Construir para producción
npm start              # Servidor de producción

# Calidad de código
npm run lint           # Verificar código con ESLint
npm run type-check     # Verificar tipos TypeScript
```

### **Crear Nuevos Ejercicios**

```typescript
const nuevoEjercicio = {
  id: 'mi-ejercicio-unico',
  titulo: 'Mi Ejercicio Personalizado',
  descripcion: 'Descripción detallada del ejercicio',
  tipo: 'practica' as const,
  dificultad: 'medio' as const,
  tiempoEstimado: 45,
  puntos: 150,
  codigoBase: `// Tu código base aquí
class MiAgente {
  constructor() {
    // Implementación inicial
  }
}`,
  solucionEsperada: `// Solución completa`,
  tests: [
    {
      input: 'entrada de prueba',
      expectedOutput: 'salida esperada',
      descripcion: 'Descripción del test'
    }
  ],
  pistas: ['Pista útil 1', 'Pista útil 2']
}
```

### **Integrar con Sistema de Progreso**

```typescript
import { useProgresoAcademia } from '@/hooks/useProgresoAcademia'

function MiComponenteFormacion() {
  const { 
    completarEjercicio, 
    estadisticas, 
    logros,
    obtenerPorcentajeProgreso 
  } = useProgresoAcademia()
  
  const manejarCompletado = async () => {
    try {
      const logrosNuevos = await completarEjercicio(
        1,             // mes
        1,             // semana  
        'ejercicio-1', // id del ejercicio
        90,            // puntuación (0-100)
        35             // tiempo en minutos
      )
      
      // Mostrar logros desbloqueados
      if (logrosNuevos.length > 0) {
        console.log('¡Nuevos logros desbloqueados!', logrosNuevos)
      }
    } catch (error) {
      console.error('Error completando ejercicio:', error)
    }
  }
  
  return (
    <div>
      <h3>Progreso: {obtenerPorcentajeProgreso()}%</h3>
      <button onClick={manejarCompletado}>
        Completar Ejercicio
      </button>
    </div>
  )
}
```

### **Personalizar Claude Flow**

```typescript
import { useClaudeFlowAcademia } from '@/hooks/useClaudeFlowAcademia'

function ComponenteEvaluacion() {
  const { evaluarCodigo, loading, error } = useClaudeFlowAcademia()
  
  const evaluarSolucion = async () => {
    try {
      const resultado = await evaluarCodigo(
        codigoDelEstudiante,  // string
        'ejercicio-basico-1', // id del ejercicio
        solucionCorrecta,     // string con la solución
        testsDelEjercicio     // array de tests
      )
      
      console.log('Resultado:', {
        puntuacion: resultado.puntuacion,      // 0-100
        errores: resultado.errores,            // array de strings
        sugerencias: resultado.sugerencias,    // array de strings
        explicacion: resultado.explicacion     // string descriptiva
      })
    } catch (error) {
      console.error('Error en evaluación:', error)
    }
  }
  
  return (
    <button 
      onClick={evaluarSolucion} 
      disabled={loading}
    >
      {loading ? 'Evaluando...' : 'Evaluar Código'}
    </button>
  )
}
```

## 📊 Estado del Proyecto

### ✅ **Completado**

#### **🏗️ Arquitectura Base**
- ✅ **Estructura unificada** bajo `/agencia`
- ✅ **Navegación coherente** con subnav contextual
- ✅ **Sistema de rutas** Next.js 14 optimizado
- ✅ **TypeScript** configurado en todo el proyecto

#### **🎓 Contenido Educativo**
- ✅ **Mes 1 completo** con 4 semanas estructuradas
- ✅ **Semana 1 funcional** con ejercicios interactivos
- ✅ **Agente básico** implementado y funcional
- ✅ **Chat interactivo** en tiempo real
- ✅ **Sistema de progreso** con gamificación

#### **🤖 Sistema de Agentes**
- ✅ **AgenteBasico.ts** - Implementación completa
- ✅ **Gestión de memoria** y contexto
- ✅ **Patrones de respuesta** inteligentes
- ✅ **Evaluación automática** de código

#### **⚡ Claude Flow**
- ✅ **Modo mock** completamente funcional
- ✅ **Evaluación de código** con feedback detallado
- ✅ **Generación de contenido** dinámico
- ✅ **Hooks de React** para integración fácil

#### **📈 Progreso y Gamificación**
- ✅ **7 logros diferentes** con sistema de rareza
- ✅ **Tracking automático** de ejercicios completados
- ✅ **Persistencia localStorage** con import/export
- ✅ **Dashboard completo** de estadísticas
- ✅ **Sistema de niveles** y experiencia

### 🚧 **En Desarrollo Activo**

#### **📚 Contenido Educativo**
- [ ] **Mes 1 - Semanas 2-4** - Memoria, Multi-agente, Claude Flow
- [ ] **Mes 2-3** - Prompts avanzados y sistema de corrección
- [ ] **Mes 4-6** - Orquestación multi-agente y MVP
- [ ] **Mes 7-9** - React Flow y visualización avanzada
- [ ] **Mes 10-12** - SaaS multi-tenant y lanzamiento

#### **🔧 Funcionalidades Técnicas**
- [ ] **Claude Flow Real** - Integración con API Anthropic
- [ ] **Tests automatizados** - Suite de testing completa
- [ ] **Base de datos** - PostgreSQL para producción
- [ ] **Autenticación** - Sistema de usuarios

### 🔮 **Roadmap Futuro**

#### **🌟 Funcionalidades Avanzadas**
- [ ] **Certificaciones digitales** con blockchain
- [ ] **Modo colaborativo** para equipos
- [ ] **Marketplace de agentes** desarrollados
- [ ] **API pública** para integraciones

#### **📱 Expansión**
- [ ] **PWA** - Funcionalidad offline
- [ ] **Mobile app** - React Native
- [ ] **Desktop app** - Electron
- [ ] **VS Code extension** - Desarrollo integrado

## 🛠️ Configuración del Entorno

### **Variables de Entorno (Opcionales)**

```bash
# .env.local (para producción con Claude Flow real)
CLAUDE_API_KEY=sk-ant-...
CLAUDE_FLOW_MODE=production  # o "mock" para desarrollo
DATABASE_URL=postgresql://user:pass@localhost:5432/agencia_ia
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **Configuración por Defecto**
- **Puerto**: 3000 (con fallback automático)
- **Claude Flow**: Modo mock activado
- **Base de datos**: localStorage del navegador
- **Persistencia**: Automática en cliente

## 🎯 Plan de Contenidos Futuros

### **Mes 2: Prompts y Optimización**
**Objetivo**: Dominar el arte de los prompts y optimizar costos

#### **Semana 5-8: Prompts Profesionales**
- **Semana 5**: PromptManager y plantillas reutilizables
- **Semana 6**: A/B testing de prompts con métricas
- **Semana 7**: Router inteligente de modelos (GPT vs Claude vs Llama)
- **Semana 8**: Caché inteligente con Redis y optimización de costos

### **Mes 3: Sistema de Corrección**
**Objetivo**: Crear un sistema que aprende de sus errores

#### **Semana 9-12: Aprendizaje Automático**
- **Semana 9**: CorrectionLoop - detectar y corregir errores
- **Semana 10**: Memoria de correcciones con SQLite
- **Semana 11**: Métricas de calidad y ROI automático
- **Semana 12**: Dashboard de rendimiento en tiempo real

### **Mes 4-6: Orquestación Multi-Agente**
**Objetivo**: Construir un sistema distribuido de agentes

#### **Arquitectura de Eventos**
- **EventBus** para comunicación asíncrona
- **Orchestrator** que asigna tareas automáticamente
- **Workflows** complejos con múltiples pasos
- **Sistema de respaldo** y tolerancia a fallos

### **Mes 7-9: Visualización con React Flow**
**Objetivo**: UI/UX avanzada para gestionar agentes

#### **Canvas Interactivo**
- **Nodos personalizados** para cada tipo de agente
- **Animaciones** en tiempo real del flujo de datos
- **Validación visual** de workflows
- **Historial interactivo** de ejecuciones

### **Mes 10-12: SaaS Multi-Tenant**
**Objetivo**: Producto listo para producción y monetización

#### **Arquitectura SaaS**
- **Multi-tenancy** con aislamiento de datos
- **Billing** automático con Stripe
- **Customer portal** para gestión de suscripciones
- **Métricas de negocio** y customer success

## 🤝 Contribución

### **Cómo Contribuir**
1. **Fork** el repositorio
2. **Crea** una rama: `git checkout -b feature/nueva-funcionalidad`
3. **Desarrolla** siguiendo las convenciones del proyecto
4. **Testa** en la formación y laboratorio
5. **Commit**: `git commit -m 'Añadir nueva funcionalidad'`
6. **Push**: `git push origin feature/nueva-funcionalidad` 
7. **Pull Request** con descripción detallada

### **Áreas de Contribución Prioritarias**
- **📚 Contenido Mes 2-12**: Ejercicios y proyectos guiados
- **🤖 Agentes Especializados**: Nuevas implementaciones
- **⚡ Claude Flow Real**: Integración con API Anthropic
- **🎨 UI/UX**: Mejoras en la experiencia de usuario
- **🧪 Testing**: Suite de tests automatizados
- **📱 Mobile**: Versión responsive optimizada
- **🌍 i18n**: Internacionalización a otros idiomas

### **Convenciones del Proyecto**
- **TypeScript** obligatorio en todos los componentes
- **Comentarios JSDoc** en funciones públicas
- **Hooks personalizados** para lógica reutilizable
- **Componentes pequeños** y especializados
- **Estados locales** con persistencia cuando sea necesario

## 📈 Métricas y Analytics

### **Métricas de Aprendizaje Implementadas**
- ⏱️ **Tiempo de estudio** por sesión y acumulado
- 📊 **Progreso por mes/semana** con tendencias
- 🎯 **Tasa de completado** de ejercicios
- 🏆 **Logros desbloqueados** y rareza
- 📈 **Puntuaciones promedio** y mejora over time
- 🔥 **Streaks de estudio** y constancia

### **Dashboard de Progreso Personal**
Accede a tu dashboard personalizado para ver:
- **Gráficos de progreso** mes a mes
- **Heatmap de actividad** (como GitHub)
- **Comparación** con objetivos personales
- **Predicción** de fecha de completado
- **Exportar progreso** en PDF para portfolio

## 🔒 Seguridad y Privacidad

### **Datos del Usuario**
- **Almacenamiento local**: Todo el progreso se guarda en tu navegador
- **Sin tracking**: No enviamos datos personales a terceros
- **Exportación libre**: Puedes exportar todo tu progreso en cualquier momento
- **Código abierto**: Toda la lógica es transparente y auditable

### **Claude Flow (Modo Producción)**
- **API Keys seguras**: Nunca se almacenan en el cliente
- **Rate limiting**: Protección contra abuso
- **Validación de entrada**: Sanitización de todo input del usuario
- **Logs mínimos**: Solo métricas agregadas, sin contenido personal

## 📞 Soporte y Comunidad

### **Documentación y Ayuda**
- **📚 Documentación completa**: Integrada en cada ejercicio
- **🔧 Troubleshooting**: Guías de resolución de problemas
- **💡 FAQ**: Preguntas frecuentes con respuestas detalladas
- **📹 Video tutoriales**: Explicaciones paso a paso (futuro)

### **Comunidad**
- **🐛 Issues**: [GitHub Issues](https://github.com/seojcarlos/orquestacion_de_agentes/issues)
- **💬 Discusiones**: [GitHub Discussions](https://github.com/seojcarlos/orquestacion_de_agentes/discussions)
- **📧 Contacto directo**: Para consultas específicas del proyecto

### **Feedback y Mejoras**
Tu feedback es esencial para mejorar la plataforma:
- **⭐ Califica ejercicios** después de completarlos
- **💭 Sugiere mejoras** a través de issues
- **🔄 Reporta bugs** con reproducción paso a paso
- **📝 Comparte tu experiencia** en discussions

## 📝 Licencia

Este proyecto está bajo la **Licencia MIT**. Ver [LICENSE](LICENSE) para más detalles.

**Esto significa que puedes:**
- ✅ Usar comercialmente
- ✅ Modificar y distribuir
- ✅ Usar en proyectos privados
- ✅ Sublicenciar

**Con la condición de:**
- 📋 Incluir el aviso de copyright
- 📋 Incluir la licencia MIT

## 🙏 Agradecimientos

### **Tecnologías Principales**
- **[Anthropic](https://anthropic.com)** - Por Claude y la inspiración en IA
- **[Vercel](https://vercel.com)** - Por Next.js y las herramientas de desarrollo
- **[Tailwind CSS](https://tailwindcss.com)** - Por el sistema de diseño excepcional
- **[React Team](https://react.dev)** - Por el framework que hace todo posible

### **Inspiración y Recursos**
- **Comunidad Open Source** - Por todas las librerías que hacen esto posible
- **Desarrolladores de IA** - Por compartir conocimiento y mejores prácticas
- **Estudiantes** - Por el feedback constante para mejorar la experiencia

---

## 🎯 Próximos Pasos

### **Si eres nuevo aquí:**
1. **[🚀 Inicia la aplicación](#-inicio-rápido)** con `npm run dev`
2. **[📋 Ve el roadmap completo](http://localhost:3000/agencia)** en `/agencia`
3. **[🎯 Comienza Mes 1](http://localhost:3000/agencia/mes-1)** - Fundamentos sólidos
4. **[🧪 Experimenta](http://localhost:3000/agencia/laboratorio)** en el laboratorio

### **Si ya empezaste:**
- **📊 Revisa tu progreso** en el dashboard integrado
- **🏆 Desbloquea logros** completando ejercicios consecutivos
- **🔥 Mantén tu streak** estudiando diariamente
- **💡 Comparte feedback** para ayudar a otros estudiantes

---

<div align="center">

## 🚀 **¡Comienza tu transformación hoy mismo!**

**De cero a Agencia IA Multi-Tenant en 12 meses**

[🏢 **Ir a la Agencia**](http://localhost:3000/agencia) | [📚 **Ver Tutoriales**](http://localhost:3000/tutoriales) | [🧪 **Explorar Laboratorio**](http://localhost:3000/agencia/laboratorio)

### **📈 Tu viaje hacia la maestría en IA empieza aquí**

**2-3 horas diarias × 12 meses = Arquitecto de Sistemas IA de Nivel Mundial**

---

**⭐ Si este proyecto te ha sido útil, ¡dale una estrella en GitHub! ⭐**

*Cada estrella nos motiva a crear más contenido de calidad*

</div>