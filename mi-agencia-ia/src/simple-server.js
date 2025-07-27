import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cors from 'cors';

console.log('🚀 Iniciando servidor simple...');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

const port = process.env.PORT || 3001;

// Middleware básico
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', '*'],
  credentials: true
}));

app.use(express.json());

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'Servidor de agentes funcionando'
  });
});

// Ruta básica de agentes
app.get('/api/agents', (req, res) => {
  res.json({
    agents: ['content_creator'],
    status: 'active'
  });
});

// WebSocket básico
io.on('connection', (socket) => {
  console.log(`🔌 Cliente conectado: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log(`❌ Cliente desconectado: ${socket.id}`);
  });
});

// Iniciar servidor
server.listen(port, () => {
  console.log(`
🚀 Servidor de Agentes IA - Versión Simple
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Puerto: ${port}
🔗 WebSocket: ws://localhost:${port}
💊 Health: http://localhost:${port}/health
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});

export default app;
