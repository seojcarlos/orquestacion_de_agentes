# 📋 Comandos Claude Flow - Guía Completa

## 🚀 Instalación y Configuración

### 1. Instalación inicial
```bash
# Instalar Claude Flow globalmente
npm install -g claude-flow@alpha

# Verificar instalación
claude-flow --version

# Ver ayuda
claude-flow help
```

### 2. Inicializar en tu proyecto
```bash
# Navegar a tu proyecto
cd C:\Users\jcdia\Desktop\dev\orquestacion_de_agentes

# Inicializar Claude Flow con configuración Hive-Mind
npx claude-flow init --hive-mind

# Configurar agentes para proyecto educativo
npx claude-flow configure agents --preset educational

# Verificar configuración
npx claude-flow status
```

## 🎮 Comandos de Desarrollo

### Desarrollo General
```bash
# Iniciar sesión de desarrollo con memoria
npx claude-flow hive --memory --watch

# Crear componente nuevo
npx claude-flow@alpha swarm "crear [nombre del componente]" --claude

# Refactorizar código existente
npx claude-flow@alpha refactor "src/components/[componente].tsx" --modern --optimize

# Analizar código
npx claude-flow@alpha analyze "src/" --performance --suggestions
```

### Mejoras Específicas para tu Proyecto
```bash
# Mejorar Breadcrumb
npx claude-flow@alpha swarm "mejorar componente Breadcrumb con mejor navegación, diseño responsive y accesibilidad" --with-tests

# Mejorar MenuLateral
npx claude-flow@alpha swarm "optimizar MenuLateral con animaciones suaves, mejor UX y estado persistente" --claude

# Crear sistema de navegación completo
npx claude-flow@alpha hive-mind spawn "sistema de navegación completo con breadcrumb, menú lateral y búsqueda" --agents 5
```

## 📚 Comandos para Tutoriales

```bash
# Crear nuevo tutorial
npx claude-flow@alpha tutorial create "[nombre del tutorial]" --interactive --examples

# Generar ejemplos para tutorial
npx claude-flow@alpha examples generate "[tema]" --visual --react

# Crear demos interactivas
npx claude-flow@alpha demo build "[concepto]" --typescript

# Validar tutorial
npx claude-flow@alpha validate tutorial "[ruta]" --comprehensive
```

## 🧪 Testing y Calidad

```bash
# Generar tests
npx claude-flow@alpha test generate "src/components" --coverage 90

# Tests específicos para componentes
npx claude-flow@alpha test generate "src/components/Breadcrumb.tsx" --unit --e2e
npx claude-flow@alpha test generate "src/components/MenuLateral.tsx" --unit --e2e

# Ejecutar análisis de calidad
npx claude-flow@alpha quality check --fix

# Revisar accesibilidad
npx claude-flow@alpha a11y check "src/" --fix
```

## 📖 Documentación

```bash
# Generar documentación
npx claude-flow@alpha docs generate --format markdown

# Documentar componente específico
npx claude-flow@alpha docs generate "src/components/MenuLateral.tsx" --detailed

# Crear README automático
npx claude-flow@alpha readme generate --comprehensive
```

## 🔧 Optimización y Performance

```bash
# Análisis de performance
npx claude-flow@alpha analyze "src/app" --performance --bundle-size

# Optimizar componentes
npx claude-flow@alpha optimize "src/components" --aggressive

# Limpiar y optimizar proyecto
npx claude-flow@alpha clean --cache --optimize
```

## 🤝 Trabajo con Agentes

```bash
# Ver estado de agentes
npx claude-flow@alpha agents status

# Coordinar tarea específica
npx claude-flow@alpha coordinate "implementar sistema de autenticación" --agents asistente,ejecutor,profesor

# Ejecutar workflow predefinido
npx claude-flow@alpha workflow run "createTutorial" --params "React Hooks"

# Ver memoria del sistema
npx claude-flow@alpha memory status
```

## ⚡ Comandos Rápidos (Alias)

```bash
# Desarrollo rápido
npx cf swarm "tarea" --claude

# Análisis rápido
npx cf analyze

# Tests rápidos
npx cf test

# Review rápido
npx cf review
```

## 🛠️ Configuración en package.json

Agrega estos scripts a tu `package.json`:

```json
{
  "scripts": {
    "cf:dev": "npx claude-flow@alpha hive --memory --watch",
    "cf:swarm": "npx claude-flow@alpha swarm",
    "cf:analyze": "npx claude-flow@alpha analyze src/",
    "cf:test": "npx claude-flow@alpha test generate",
    "cf:docs": "npx claude-flow@alpha docs generate",
    "cf:review": "npx claude-flow@alpha review --suggestions",
    "cf:optimize": "npx claude-flow@alpha optimize",
    "cf:status": "npx claude-flow@alpha status",
    "cf:menu": "npx claude-flow@alpha swarm 'mejorar MenuLateral' --claude",
    "cf:breadcrumb": "npx claude-flow@alpha swarm 'mejorar Breadcrumb' --claude"
  }
}
```

## 🎯 Casos de Uso Específicos

### 1. Mejorar Navegación Completa
```bash
# Comando todo-en-uno
npx claude-flow@alpha hive-mind spawn "mejorar sistema completo de navegación: breadcrumb responsive, menú lateral con animaciones, integración con Claude Flow" --agents 5 --parallel
```

### 2. Crear Feature Completa
```bash
# Ejemplo: Sistema de búsqueda
npx claude-flow@alpha feature create "sistema de búsqueda global" --with-tests --with-docs --with-demo
```

### 3. Migrar Componente a TypeScript Moderno
```bash
# Migrar y optimizar
npx claude-flow@alpha migrate "src/components/[old-component].js" --to-typescript --modern --optimize
```

### 4. Generar Componente desde Diseño
```bash
# Si tienes un diseño o mockup
npx claude-flow@alpha generate component --from-design "ruta/al/diseño.png" --responsive
```

## 🐛 Solución de Problemas

### Error: Command not found
```bash
# Reinstalar globalmente
npm uninstall -g claude-flow
npm install -g claude-flow@alpha
```

### Error: Agentes no responden
```bash
# Reiniciar agentes
npx claude-flow@alpha agents restart

# Limpiar memoria
npx claude-flow@alpha memory clean
```

### Performance lento
```bash
# Optimizar configuración
npx claude-flow@alpha config optimize

# Reducir agentes concurrentes
npx claude-flow@alpha config set maxAgents 2
```

## 📊 Monitoreo

```bash
# Ver métricas en tiempo real
npx claude-flow@alpha monitor

# Ver logs
npx claude-flow@alpha logs --tail 50

# Exportar métricas
npx claude-flow@alpha metrics export --format json
```

## 💡 Tips Pro

1. **Usa `--parallel`** para tareas que pueden ejecutarse simultáneamente
2. **Usa `--cache`** para operaciones repetitivas
3. **Usa `--watch`** durante desarrollo para cambios en tiempo real
4. **Combina agentes** para tareas complejas
5. **Guarda workflows** personalizados en `.claude-flow/workflows/`

---

**Nota**: Todos estos comandos están optimizados para tu proyecto de orquestación de agentes. Ajusta los parámetros según tus necesidades específicas.
