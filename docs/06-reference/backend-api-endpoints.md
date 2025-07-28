# 🔌 **Backend API Endpoints - mi-agencia-ia**

> Documentación completa de todas las APIs disponibles en el backend

---

## 🏁 **Base URL**
```
http://localhost:3001
```

---

## 📡 **HTTP REST Endpoints**

### **🔍 Health Check**
```http
GET /health
```
**Propósito**: Verificar estado del servidor  
**Respuesta**:
```json
{
  "status": "healthy",
  "timestamp": "2025-07-28T...",
  "uptime": 3600,
  "version": "1.0.0"
}
```

### **📋 Gestión de Tareas**

#### **Crear Nueva Tarea**
```http
POST /api/tasks
Content-Type: application/json
```
**Body**:
```json
{
  "title": "Crear agente de contenido",
  "description": "Desarrollar agente para generación automática",
  "type": "content-generation",
  "priority": "high",
  "metadata": {
    "targetLength": 1000,
    "style": "technical"
  }
}
```

#### **Obtener Tarea Específica**
```http
GET /api/tasks/:id
```
**Parámetros**: 
- `id` (string): ID único de la tarea

#### **Actualizar Tarea**
```http
PUT /api/tasks/:id
Content-Type: application/json
```
**Body**: Campos a actualizar (parcial)

#### **Listar Todas las Tareas**
```http
GET /api/tasks
```
**Query Parameters**:
- `status` (optional): `pending|running|completed|failed`
- `type` (optional): Filtrar por tipo de tarea
- `limit` (optional): Número máximo de resultados

---

## 🔌 **WebSocket Events**

### **Conexión Base**
```javascript
const socket = io('http://localhost:3001');
```

### **📤 Eventos del Cliente → Servidor**

#### **Unirse a Room de Tarea**
```javascript
socket.emit('join-task', {
  taskId: 'task-123',
  userId: 'user-456'
});
```

#### **Enviar Comando a Agente**
```javascript
socket.emit('agent-command', {
  taskId: 'task-123',
  command: 'generate-content',
  parameters: {
    topic: 'IA y automatización',
    length: 500
  }
});
```

#### **Solicitar Estado de Tarea**
```javascript
socket.emit('task-status', {
  taskId: 'task-123'
});
```

### **📥 Eventos del Servidor → Cliente**

#### **Cliente Conectado**
```javascript
socket.on('connected', (data) => {
  console.log('Conectado:', data.clientId);
});
```

#### **Tarea Creada**
```javascript
socket.on('task:created', (task) => {
  console.log('Nueva tarea:', task);
});
```

#### **Tarea Actualizada**
```javascript
socket.on('task:updated', (update) => {
  console.log('Actualización:', update);
  // update.taskId, update.status, update.progress
});
```

#### **Respuesta del Agente IA**
```javascript
socket.on('agent:response', (response) => {
  console.log('Respuesta IA:', response);
  // response.taskId, response.content, response.metadata
});
```

#### **Progreso en Tiempo Real**
```javascript
socket.on('task:progress', (progress) => {
  console.log('Progreso:', progress);
  // progress.taskId, progress.percentage, progress.currentStep
});
```

#### **Error del Sistema**
```javascript
socket.on('error', (error) => {
  console.error('Error:', error);
  // error.code, error.message, error.taskId (optional)
});
```

---

## 🧠 **Integración con Agentes IA**

### **Tipos de Tareas Soportadas**
```json
{
  "content-generation": "Generación automática de contenido",
  "code-review": "Revisión y análisis de código",
  "task-automation": "Automatización de procesos",
  "data-analysis": "Análisis y procesamiento de datos",
  "multi-agent": "Coordinación entre múltiples agentes"
}
```

### **Estados de Tarea**
```json
{
  "pending": "En cola, esperando procesamiento",
  "running": "Siendo procesada por agente",
  "completed": "Completada exitosamente",
  "failed": "Error en procesamiento",
  "cancelled": "Cancelada por usuario"
}
```

---

## 🔒 **Autenticación y Seguridad**

### **CORS Configuration**
```javascript
{
  "origin": [
    "http://localhost:3000",
    "http://localhost:3001"
  ],
  "credentials": true,
  "methods": ["GET", "POST", "PUT", "DELETE"]
}
```

### **Rate Limiting**
- **API Calls**: 100 requests/minute por IP
- **WebSocket**: 50 messages/minute por conexión

---

## 📊 **Códigos de Respuesta HTTP**

| Código | Significado | Uso |
|--------|-------------|-----|
| 200 | OK | Operación exitosa |
| 201 | Created | Tarea creada |
| 400 | Bad Request | Datos inválidos |
| 404 | Not Found | Tarea no encontrada |
| 429 | Too Many Requests | Rate limit excedido |
| 500 | Internal Error | Error del servidor |

---

## 💡 **Ejemplos de Uso Completos**

### **1. Crear y Monitorear Tarea**
```javascript
// 1. Crear tarea via HTTP
const response = await fetch('http://localhost:3001/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Generar tutorial',
    type: 'content-generation'
  })
});
const task = await response.json();

// 2. Monitorear via WebSocket
socket.emit('join-task', { taskId: task.id });
socket.on('task:progress', (progress) => {
  updateProgressBar(progress.percentage);
});
```

### **2. Comunicación en Tiempo Real**
```javascript
// Frontend envía comando
socket.emit('agent-command', {
  taskId: 'task-123',
  command: 'analyze-code',
  parameters: {
    codeSnippet: 'function example() {...}',
    analysisType: 'performance'
  }
});

// Frontend recibe respuesta
socket.on('agent:response', (response) => {
  if (response.taskId === 'task-123') {
    displayAnalysisResults(response.content);
  }
});
```

---

## 🛠️ **Para Desarrollo Frontend**

### **Configuración Típica Next.js**
```javascript
// utils/api.js
export const API_BASE = 'http://localhost:3001';
export const WS_URL = 'http://localhost:3001';

// hooks/useSocket.js
import io from 'socket.io-client';
export const useSocket = () => {
  return io(WS_URL, {
    autoConnect: true,
    reconnection: true
  });
};
```
