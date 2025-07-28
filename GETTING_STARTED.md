# 🚀 **GETTING STARTED - Orquestación de Agentes IA**

> Guía rápida para comenzar con la plataforma en 5 minutos

---

## ⚡ **Inicio Súper Rápido**

### **1. Clonar e Instalar**
```bash
git clone https://github.com/seojcarlos/orquestacion_de_agentes.git
cd orquestacion_de_agentes
npm install
```

### **2. Iniciar Sistema Completo**
```bash
# Opción A: Script automático (recomendado)
start-system.bat

# Opción B: Manual
npm run dev          # Frontend en puerto 3000
# En otra terminal:
cd mi-agencia-ia && npm run dev:simple  # Backend en puerto 3001
```

### **3. Abrir Navegador**
- **Plataforma Principal**: `http://localhost:3000`
- **API Backend**: `http://localhost:3001/health`

¡Listo! Ya tienes el sistema funcionando. 🎉

---

## 🎯 **¿Qué Verás?**

### **Frontend (localhost:3000)**
- 🏠 **Dashboard Principal** - Overview completo
- 🎓 **Academia** - Programa de 4 semanas con agentes IA  
- 🏢 **Agencia** - Sistema de 48 semanas (en desarrollo)
- 📚 **Tutoriales** - Guías interactivas de tecnologías

### **Backend (localhost:3001)**
- 🤖 **Sistema de Agentes IA** - Procesamiento en tiempo real
- 🔌 **WebSocket** - Comunicación bidireccional
- 📡 **REST APIs** - Gestión completa de tareas
- ✅ **Health Check** - Estado del sistema

---

## 📋 **Flujo de Trabajo Típico**

### **Como Estudiante:**
1. **Explora la Academia** → `http://localhost:3000/academia`
2. **Interactúa con Agentes** → Chat en tiempo real
3. **Completa Ejercicios** → Sistema de progreso gamificado
4. **Ve Estadísticas** → Dashboard personal

### **Como Desarrollador:**
1. **Lee Documentación** → `docs/` (perfectamente organizada)
2. **Usa Claude Code** → `docs/04-prompts/` para desarrollo
3. **Debug Issues** → `docs/02-guides/debugging-browser.md`
4. **Crea Contenido** → `docs/03-templates/content-template.md`

---

## 🔧 **Configuración Avanzada**

### **Variables de Entorno (Opcional)**
```bash
# Crear .env en la raíz (opcional)
NEXT_PUBLIC_API_URL=http://localhost:3001
CLAUDE_CODE_MAX_OUTPUT_TOKENS=30000
```

### **Para Claude Code**
```bash
# Configurar tokens máximos
setx CLAUDE_CODE_MAX_OUTPUT_TOKENS "30000"
setx CLAUDE_CODE_AUTO_CONTINUE "true"
```

---

## 🆘 **Solución de Problemas Comunes**

### **Error: Puerto ocupado**
```bash
# Cambiar puerto del frontend
npm run dev -- -p 3002

# O verificar qué está usando el puerto
netstat -ano | findstr :3000
```

### **Error: Backend no conecta**
```bash
# Verificar que el backend esté corriendo
curl http://localhost:3001/health

# Reiniciar backend
cd mi-agencia-ia
npm run dev:simple
```

### **Error: WebSocket no funciona**
- Verificar firewall/antivirus
- Comprobar proxy o VPN
- Ver consola del navegador para errores específicos

---

## 📚 **Siguientes Pasos**

### **Explorar Documentación:**
- **📊 Estado del Proyecto**: `docs/01-project/current-status.md`
- **🤖 Para Claude Code**: `docs/04-prompts/executable-prompt.md`
- **🏗️ Arquitectura**: `docs/01-project/architecture.md`

### **Crear Contenido:**
- **📝 Usar Plantillas**: `docs/03-templates/content-template.md`
- **🎓 Ejemplos**: `docs/03-templates/page-example.tsx`

### **Desarrollo Avanzado:**
- **🔌 APIs Backend**: `docs/06-reference/backend-api-endpoints.md`
- **🏗️ Estructura**: `docs/06-reference/mi-agencia-ia-structure.md`

---

## 💡 **Tips Pro**

### **Navegación Rápida:**
- `Ctrl+` en navegador para zoom
- F12 para DevTools
- Usa múltiples pestañas para frontend y backend

### **Desarrollo Eficiente:**
- Usa `start-system.bat` para iniciar todo
- Mantén consola abierta para ver logs
- Guarda cambios automáticos con hot reload

### **Claude Code Optimizado:**
- Todos los prompts listos en `docs/04-prompts/`
- Comandos copy/paste en `quick-commands.md`
- Documentación backend completa para contexto

---

## 🎉 **¡Ya Estás Listo!**

Tu sistema está configurado y funcionando. Ahora puedes:

1. **🎓 Comenzar la Academia** - Aprende desarrollo de agentes IA
2. **🔧 Experimentar** - Usa el playground y laboratorio  
3. **📖 Estudiar** - Explora los tutoriales interactivos
4. **🚀 Desarrollar** - Crea tu propio contenido con Claude Code

**¿Necesitas ayuda?** Consulta `docs/05-emergency/` para protocolos de emergencia. 🆘
