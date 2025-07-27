# 🎯 CÓMO CONTINUAR EL PROYECTO

## ⚠️ IMPORTANTE: MANTENER LA DOCUMENTACIÓN ACTUALIZADA
**El README.md es la MEMORIA del proyecto. Sin él actualizado, cada sesión empieza desde cero.**

## Para Claude (o cualquier IA):

### 1. INICIO DE SESIÓN
Siempre comenzar leyendo estos archivos en orden:
1. `/docs/README.md` - Estado general del proyecto
2. `/docs/tareas/[fecha-actual]-tareas.md` - Tareas del día
3. Verificar que el proyecto compile sin errores

### 2. SELECCIÓN DE TAREAS
Consultar en `/docs/README.md` la sección "Tareas Pendientes" y elegir según:
- **Prioridad ALTA**: Tutoriales intermedios
- **Prioridad MEDIA**: Tutoriales avanzados
- **Prioridad BAJA**: Mejoras del sistema

### 3. PROCESO DE TRABAJO

#### Para crear un nuevo tutorial:
1. Usar `/docs/plantilla-tutorial.md` como base
2. Crear directorio: `/src/app/tutoriales/[nombre-tutorial]`
3. Crear `page.tsx` siguiendo la plantilla
4. Actualizar `/src/app/tutoriales/page.tsx` con la nueva entrada
5. Probar que funcione correctamente
6. Actualizar documentación

#### Para corregir errores:
1. Identificar el archivo afectado
2. Hacer los cambios mínimos necesarios
3. Verificar que no rompa otras partes
4. Documentar la solución

### 4. AL FINALIZAR CADA TAREA (CRÍTICO ⚠️)
**NUNCA terminar una sesión sin actualizar la documentación**

1. **OBLIGATORIO** - Actualizar `/docs/README.md`:
   - ✅ Marcar tarea como completada en la sección correspondiente
   - ✅ Actualizar fecha de última modificación
   - ✅ Agregar descripción detallada en "Últimos Cambios"
   - ✅ Si es una funcionalidad nueva, agregarla en "Estructura de Archivos"

2. **OBLIGATORIO** - Crear/actualizar archivo de tareas del día:
   `/docs/tareas/[YYYY-MM-DD]-tareas.md`
   - Detallar qué se hizo
   - Problemas encontrados y soluciones
   - Estado final de la tarea

3. Commitear cambios con mensaje descriptivo

## COMANDOS ÚTILES

```bash
# Verificar estructura de archivos
filesystem:list_directory path="C:\Users\jcdia\Desktop\dev\orquestacion_de_agentes\src\app"

# Leer estado del proyecto
filesystem:read_file path="C:\Users\jcdia\Desktop\dev\orquestacion_de_agentes\docs\README.md"

# Ver tareas del día
filesystem:read_file path="C:\Users\jcdia\Desktop\dev\orquestacion_de_agentes\docs\tareas\2025-07-24-tareas.md"
```

## ESTRUCTURA DE MEMORIA

```
docs/
├── README.md              # Estado general (SIEMPRE actualizar)
├── plantilla-tutorial.md  # Para crear nuevos tutoriales
├── como-continuar.md      # Este archivo
└── tareas/
    └── YYYY-MM-DD-tareas.md  # Registro diario
```

## CONVENCIONES IMPORTANTES

### Iconos de Estado:
- ✅ Completado
- 🔄 En progreso  
- ❌ Pendiente
- ⚠️ Requiere atención
- 🐛 Bug conocido

### Estructura de Commits:
- `feat: ` Para nuevas características
- `fix: ` Para correcciones
- `docs: ` Para documentación
- `style: ` Para cambios de estilo

### Notas de Diseño:
- Siempre usar `'use client'` en componentes interactivos
- Mantener grid 1/3 - 2/3 en tutoriales
- Incluir al menos una demo interactiva
- Usar colores consistentes por nivel

## PROBLEMAS CONOCIDOS

2. **Warning de Hidratación**: Por diferencias de tiempo cliente/servidor (no crítico)
3. **Iconos de lucide**: 'Hook' no existe, usar 'Wrench' o similar

## EJEMPLO DE FLUJO DE TRABAJO

```
1. Leer documentación
   ↓
2. Elegir tarea pendiente
   ↓
3. Implementar siguiendo plantillas
   ↓
4. Probar funcionamiento
   ↓
5. Actualizar documentación
   ↓
6. Crear registro de tareas del día
```

---

## 📋 DÓNDE REGISTRAR NUEVAS TAREAS PENDIENTES

### Cuando el usuario pide una nueva funcionalidad:

1. **INMEDIATAMENTE** agregar en `/docs/README.md` en la sección apropiada:
   ```markdown
   ## 🚧 Tareas Pendientes
   
   ### [Categoría Apropiada]
   - [ ] Nombre de la nueva funcionalidad (`/ruta/donde/irá`)
   ```

2. **Categorías disponibles**:
   - **Tutoriales Básicos**: Conceptos fundamentales
   - **Tutoriales Intermedios**: Funcionalidades complejas
   - **Tutoriales Avanzados**: Optimización, SSR, etc.
   - **Tutoriales de Despliegue**: Docker, CI/CD, etc.
   - **Nuevas Secciones Planeadas**: Funcionalidades del sistema
   - **Herramientas y APIs**: Endpoints y servicios

3. **Si no encaja en ninguna categoría**, crear una nueva:
   ```markdown
   ### Nueva Categoría (Descripción)
   - [ ] Nueva funcionalidad
   ```

### Ejemplo práctico:
Si el usuario pide: "Quiero un sistema de autenticación con login social"

**Agregar en README.md:**
```markdown
### Sistema de Autenticación (Nuevo)
- [ ] Login con email/password (`/tutoriales/auth-basica`)
- [ ] Login social (Google, GitHub) (`/tutoriales/auth-social`)
- [ ] Middleware de protección de rutas (`/tutoriales/auth-middleware`)
- [ ] API de autenticación (`/api/auth/*`)
```

## 🔴 REGLA DE ORO
**Cada tarea solicitada = Una entrada en README.md INMEDIATAMENTE**

No esperar a implementarla. Registrarla en el momento que se pide.

---

**Recuerda**: La documentación es la memoria del proyecto. Sin ella, cada sesión empieza desde cero.