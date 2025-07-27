# Agencia IA Multi-Agente

Sistema de orquestación inteligente de agentes IA con arquitectura escalable, memoria persistente y página web de gestión.

## 🚀 Características

- **Sistema Multi-Agente**: Arquitectura modular con agentes especializados
- **Base de Datos SQLite**: Persistencia de tareas, memoria y métricas
- **Interfaz Web**: Dashboard completo para gestión de tareas
- **WebSocket**: Actualizaciones en tiempo real
- **API REST**: Endpoints completos para integración
- **Sistema de Prompts**: Gestión centralizada y dinámica
- **Métricas y Análisis**: Seguimiento de rendimiento de agentes

## 📋 Requisitos

- Node.js 18+ 
- npm o yarn
- SQLite (incluido con better-sqlite3)

## 🛠️ Instalación

1. Clona el repositorio:
```bash
cd C:\Users\jcdia\Desktop\dev\orquestacion_de_agentes\mi-agencia-ia
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` (opcional):
```bash
PORT=3001
NODE_ENV=development
```

## 🚀 Ejecución

### Modo Desarrollo
```bash
npm run dev
```

### Modo Producción
```bash
npm start
```

El servidor se iniciará en `http://localhost:3001`

## 🌐 Acceso a la Interfaz

Una vez iniciado el servidor, accede a:

- **Página Principal**: http://localhost:3001
- **Dashboard API**: http://localhost:3001/api/dashboard
- **Health Check**: http://localhost:3001/health

## 📊 Base de Datos

La base de datos SQLite se crea automáticamente en `data/agency.db` con las siguientes tablas:

- `tasks`: Almacena todas las tareas
- `memory_contexts`: Memoria de contextos para Claude Flow
- `agent_interactions`: Registro de interacciones entre agentes
- `task_history`: Historial completo de acciones
- `projects`: Gestión de proyectos
- `agent_metrics`: Métricas de rendimiento

## 🤖 Agentes Disponibles

- **content_creator**: Creación de contenido
- **asistente**: Asistente general (próximamente)
- **ejecutor**: Ejecución de tareas (próximamente)
- **profesor**: Enseñanza y explicaciones (próximamente)

## 📡 API Endpoints

### Tareas
- `POST /api/tasks` - Crear nueva tarea
- `GET /api/tasks/:id` - Obtener tarea específica
- `GET /api/tasks` - Listar tareas
- `POST /api/tasks/:id/feedback` - Aplicar feedback
- `POST /api/tasks/:id/process` - Procesar tarea manualmente

### Métricas
- `GET /api/agents/:id/metrics` - Métricas de agente
- `GET /api/dashboard` - Dashboard general

## 🧪 Testing

```bash
npm test
```

## 📁 Estructura del Proyecto

```
mi-agencia-ia/
├── data/                  # Base de datos SQLite
├── public/               # Archivos estáticos
│   └── index.html       # Interfaz web
├── src/
│   ├── agents/          # Agentes especializados
│   ├── core/           # Núcleo del sistema
│   ├── database/       # Gestión de base de datos
│   ├── prompts/        # Biblioteca de prompts
│   └── server.js       # Servidor principal
└── tests/              # Suite de pruebas
```

## 🔧 Solución de Problemas

### Error: No se puede inicializar la base de datos
- Asegúrate de tener permisos de escritura en el directorio `data/`
- Verifica que no haya otra instancia ejecutándose

### Error: Puerto en uso
- Cambia el puerto en el archivo `.env`
- O termina el proceso que está usando el puerto 3001

### La página web no carga
- Verifica que el servidor esté ejecutándose
- Revisa la consola del navegador para errores
- Asegúrate de acceder a http://localhost:3001

## 📝 Licencia

MIT

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request
