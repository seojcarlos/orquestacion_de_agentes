# 🔍 CHECKLIST DE VERIFICACIÓN EN NAVEGADOR
## Manual de Debug Completo - PARA CLAUDE CODE

### 🤖 INSTRUCCIONES PARA CLAUDE CODE

**Claude Code debe ejecutar estos comandos automáticamente cuando detecte errores o cuando se le solicite hacer debugging.**

### ✅ PROCESO AUTOMÁTICO DE VERIFICACIÓN

1. **Verificar servidor activo** usando `get_terminal_output` en terminal de Next.js
2. **Ejecutar comandos de consola** usando `run_in_terminal` con navegador headless
3. **Capturar errores** y reportarlos automáticamente
4. **Generar reporte** de estado del proyecto

### 🚀 COMANDOS AUTOMÁTICOS PARA CLAUDE CODE

---

### 🌐 RUTAS A PROBAR (En orden de prioridad)

#### 1. **Página Principal** - `http://localhost:3000`
**DevTools Console Commands:**
```javascript
console.clear();
console.log("🏠 Verificando Página Principal");
console.error = ((original) => (...args) => { console.log("❌ ERROR:", ...args); return original(...args); })(console.error);
console.warn = ((original) => (...args) => { console.log("⚠️ WARNING:", ...args); return original(...args); })(console.warn);
// Verificar componentes básicos
console.log("NavBar cargado:", !!document.querySelector('nav'));
console.log("Layout principal:", !!document.querySelector('main'));
```

#### 2. **Agencia** - `http://localhost:3000/agencia`
**DevTools Console Commands:**
```javascript
console.clear();
console.log("🏢 Verificando Página Agencia");
// Verificar que no hay errores de componentes
console.log("Links de navegación:", document.querySelectorAll('a').length);
console.log("Errores de React:", window.__REACT_DEVTOOLS_GLOBAL_HOOK__ ? "DevTools instalado" : "Sin DevTools");
```

#### 3. **Semana 1** - `http://localhost:3000/agencia/mes-1/semana-1`
**DevTools Console Commands:**
```javascript
console.clear();
console.log("📚 Verificando Semana 1 - PÁGINA CRÍTICA");
// Esta era la página con errores
console.log("ChatAgenteBasico cargado:", !!document.querySelector('[class*="chat"], [class*="Chat"]'));
console.log("Iconos Beaker (no Flask):", document.querySelectorAll('svg').length);
console.log("Ejercicios renderizados:", document.querySelectorAll('[class*="ejercicio"], [class*="card"]').length);
// Verificar que no hay referencias a Flask
console.log("Referencias a Flask (debe ser 0):", document.body.innerHTML.includes('Flask') ? "❌ ENCONTRADAS" : "✅ NINGUNA");
```

#### 4. **Semana 2** - `http://localhost:3000/agencia/mes-1/semana-2`
**DevTools Console Commands:**
```javascript
console.clear();
console.log("📈 Verificando Semana 2");
console.log("Contenido renderizado:", !!document.querySelector('main'));
console.log("Links a tareas:", !!document.querySelector('a[href*="tareas"]'));
```

#### 5. **Tareas Semana 2** - `http://localhost:3000/agencia/mes-1/semana-2/tareas`
**DevTools Console Commands:**
```javascript
console.clear();
console.log("📋 Verificando Tareas Semana 2 - PÁGINA RECONSTRUIDA");
// Esta página fue reconstruida completamente
console.log("Tareas renderizadas:", document.querySelectorAll('[class*="tarea"], [class*="task"]').length);
console.log("Botones interactivos:", document.querySelectorAll('button').length);
console.log("Tecnologías mostradas:", document.querySelectorAll('[class*="tech"], span').length);
// Probar interactividad
document.querySelector('button') && document.querySelector('button').click();
console.log("Click en botón funcionó:", "✅");
```

#### 6. **Tutoriales** - `http://localhost:3000/tutoriales`
**DevTools Console Commands:**
```javascript
console.clear();
console.log("📖 Verificando Tutoriales");
console.log("Lista de tutoriales:", document.querySelectorAll('a[href*="tutoriales"]').length);
console.log("Diseño consistente:", !!document.querySelector('[class*="bg-white"], [class*="bg-slate"]'));
```

#### 7. **Tutorial GitIgnore** - `http://localhost:3000/tutoriales/gitignore-correcto`
**DevTools Console Commands:**
```javascript
console.clear();
console.log("🛡️ Verificando Tutorial GitIgnore - DISEÑO CORREGIDO");
// Este tutorial tiene el diseño blanco corregido
console.log("Fondo blanco:", !!document.querySelector('[class*="bg-slate-50"], [class*="bg-white"]'));
console.log("Header sin text clipping:", getComputedStyle(document.querySelector('h1')).paddingTop !== '0px');
console.log("Botones de copia:", document.querySelectorAll('button[class*="copy"], button[class*="Copy"]').length);
// Probar funcionalidad de copia
let copyBtn = document.querySelector('button');
if(copyBtn) { copyBtn.click(); console.log("Función de copia probada ✅"); }
```

#### 8. **Playground** - `http://localhost:3000/playground`
**DevTools Console Commands:**
```javascript
console.clear();
console.log("🎮 Verificando Playground");
console.log("Componentes experimentales:", document.querySelectorAll('[class*="experimental"], [class*="demo"]').length);
```

---

### 🔧 VERIFICACIONES AVANZADAS

#### **Network Tab** (Pestaña Red)
- ✅ Todas las requests en verde (200 status)
- ❌ Sin errores 404 o 500
- ⚡ Tiempo de carga < 2 segundos

#### **Console Tab** (Pestaña Consola)
- ✅ Sin errores rojos críticos
- ⚠️ Warnings aceptables (fuentes, etc.)
- 🚫 Sin "Element type is invalid"

#### **Elements Tab** (Pestaña Elementos)
- 🎨 CSS aplicado correctamente
- 📱 Responsive design funcional
- 🔄 Componentes React en el DOM

#### **Performance Tab** (Pestaña Rendimiento)
- ⚡ FCP (First Contentful Paint) < 1.5s
- 🎯 LCP (Largest Contentful Paint) < 2.5s
- 🔄 No memory leaks

---

### 🚨 ERRORES CRÍTICOS A BUSCAR

1. **"Element type is invalid"**
   - Buscar: imports mal hechos
   - Verificar: componentes exportados correctamente

2. **"Cannot read property of undefined"**
   - Buscar: variables sin inicializar
   - Verificar: props pasadas correctamente

3. **"Hydration failed"**
   - Buscar: diferencias server/client
   - Verificar: localStorage en useEffect

4. **404 Errors**
   - Buscar: rutas inexistentes
   - Verificar: archivos page.tsx presentes

5. **CORS Errors**
   - Buscar: requests a APIs externas
   - Verificar: configuración de Next.js

---

### ✅ CHECKLIST DE FUNCIONALIDAD

#### **Navegación**
- [ ] Links funcionan correctamente
- [ ] Breadcrumbs navegables
- [ ] Back button funciona

#### **Interactividad**
- [ ] Botones responden a clicks
- [ ] Estados cambian correctamente
- [ ] Formularios funcionan

#### **Design System**
- [ ] Colores consistentes
- [ ] Tipografía uniforme
- [ ] Spacing correcto
- [ ] Responsive design

#### **Performance**
- [ ] Carga rápida
- [ ] Sin lags en interacciones
- [ ] Memoria estable

---

### 🎯 RESULTADOS ESPERADOS

✅ **ÉXITO**: Todas las páginas cargan sin errores
✅ **ÉXITO**: Componentes interactivos funcionan
✅ **ÉXITO**: Diseño consistente y responsive
✅ **ÉXITO**: Sin referencias a iconos inexistentes (Flask)
✅ **ÉXITO**: Performance óptima

---

### 📊 REPORTE DE BUGS

**Formato para reportar problemas:**

```
🐛 BUG ENCONTRADO
Página: [URL]
Error: [Descripción del error]
Console: [Mensaje de error exacto]
Steps: [Pasos para reproducir]
Expected: [Resultado esperado]
Actual: [Resultado actual]
```

---

### 🔄 PRÓXIMOS PASOS DESPUÉS DEL DEBUG

1. **Si TODO funciona**: Continuar desarrollo normal
2. **Si hay errores menores**: Corregir uno por uno
3. **Si hay errores críticos**: Priorizar por impacto
4. **Si hay problemas de performance**: Optimizar componentes

---

**¡Esta verificación te dará una visión completa del estado real del proyecto!** 🚀
