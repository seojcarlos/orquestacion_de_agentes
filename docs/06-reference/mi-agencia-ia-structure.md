# 🤖 **mi-agencia-ia/** - Documentación del Backend

> Sistema backend completo para agentes IA - Puerto 3001

---

## 📁 **Estructura del Directorio**

```
mi-agencia-ia/
├── package.json                ← Config independiente Node.js
├── package-lock.json          ← Lockfile de dependencias
├── node_modules/               ← Dependencias backend separadas
└── src/
    ├── server.js              ← Servidor completo con SQLite
    ├── simple-server.js       ← Servidor simplificado (ACTUAL)
    └── core/
        └── taskValidator.js   ← Validación de tareas IA
```

---

## ⚙️ **Configuración Actual**

### **package.json - Información Clave:**
- **Nombre**: `mi-agencia-ia`
- **Versión**: `1.0.0`
- **Tipo**: `module` (ES Modules)
- **Puerto**: 3001
- **Main**: `src/server.js`

### **Scripts Disponibles:**
```bash
npm run dev         # Servidor completo (con SQLite)
npm run dev:simple  # Servidor simplificado (SIN SQLite) ← ACTIVO
npm start          # Producción
npm test           # Tests con Jest
```

---

## 🚀 **Estado Actual del Sistema**

### **✅ Servidor Activo: `simple-server.js`**
- **Puerto**: 3001
- **Tecnologías**: Express + Socket.io + CORS
- **Funcionalidades**:
  - ✅ Health check: `/health`
  - ✅ WebSocket connection
  - ✅ CORS configurado para localhost:3000
  - ✅ JSON middleware

### **🔄 Servidor Completo: `server.js`**
- **Estado**: Disponible pero no activo
- **Incluye**: SQLite + Sistema completo de agentes
- **Uso**: Para desarrollo avanzado

---

## 🔌 **APIs y Endpoints**

### **HTTP Endpoints:**
```
GET  /health              → Status del servidor
POST /api/tasks           → Crear nueva tarea
GET  /api/tasks/:id       → Obtener tarea específica  
PUT  /api/tasks/:id       → Actualizar tarea
```

### **WebSocket Events:**
```
connect                   → Cliente conectado
disconnect               → Cliente desconectado
task:created            → Nueva tarea creada
task:updated            → Tarea actualizada
agent:response          → Respuesta del agente IA
```

---

## 🧠 **Componentes Clave**

### **taskValidator.js**
- **Propósito**: Validación de tareas para agentes IA
- **Ubicación**: `src/core/taskValidator.js`
- **Funciones**: Validar formato, parámetros y tipos de tareas

### **Dependencias Principales:**
```json
{
  "express": "^5.1.0",        // Framework web
  "socket.io": "^4.8.1",     // WebSocket real-time
  "cors": "^2.8.5",          // Cross-origin requests
  "dotenv": "^17.2.1",       // Variables de entorno
  "jest": "^30.0.5"          // Testing framework
}
```

---

## 🔄 **Comunicación Frontend-Backend**

### **Flujo de Datos:**
```
Frontend (localhost:3000)
    ↓ HTTP/WebSocket
Backend (localhost:3001)
    ↓ Processing
Agentes IA (interno)
    ↓ Response
Frontend (actualización)
```

### **Integración con Next.js:**
- CORS configurado para localhost:3000
- WebSocket client en frontend se conecta a puerto 3001
- APIs REST para operaciones CRUD

---

## 🛠️ **Desarrollo y Debug**

### **Iniciar Backend Solo:**
```bash
cd mi-agencia-ia
npm run dev:simple
```

### **Logs Importantes:**
- `🚀 Iniciando servidor simple...`
- `✅ Servidor corriendo en puerto 3001`
- `🔌 Cliente conectado via WebSocket`

### **Troubleshooting:**
1. **Puerto ocupado**: Cambiar PORT en variables de entorno
2. **CORS errors**: Verificar origen en configuración
3. **WebSocket fails**: Comprobar firewall y proxy

---

## 📋 **Para Claude Code**

### **Información Crítica:**
- ✅ **Backend independiente** - No tocar estructura
- ✅ **Puerto 3001** - Siempre disponible
- ✅ **API endpoints** documentados arriba
- ✅ **WebSocket** para tiempo real
- ✅ **taskValidator** para validaciones

### **Al crear contenido frontend:**
- Usar `http://localhost:3001` para APIs
- Conectar WebSocket a `ws://localhost:3001`
- Validar tareas con taskValidator patterns
- Manejar estados de conexión
