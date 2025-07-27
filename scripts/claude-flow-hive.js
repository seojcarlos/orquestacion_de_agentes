#!/usr/bin/env node

/**
 * Script de Hive Mode de Claude Flow
 * Simula el comportamiento de `npx claude-flow hive --memory --watch`
 */

const path = require('path');
const axios = require('axios');
const Database = require('better-sqlite3');
const EventSource = require('eventsource');
const readline = require('readline');

class HiveMind {
  constructor() {
    this.db = new Database(path.join(process.cwd(), '.claude-flow/memory/claude-flow.db'));
    this.sessionId = `hive-${Date.now()}`;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '🐝 Hive> '
    });
  }

  async start() {
    console.log('🏰 Claude Flow Hive-Mind iniciado');
    console.log('📊 Modo: Memoria persistente + Observación en tiempo real');
    console.log(`🆔 Sesión: ${this.sessionId}\n`);

    // Verificar servidor
    try {
      await axios.get('http://localhost:3001/health');
      console.log('✅ Conectado al servidor de agentes\n');
    } catch (error) {
      console.error('❌ El servidor de agentes no está ejecutándose');
      console.log('💡 Ejecuta primero: npm run dev:all');
      process.exit(1);
    }

    // Conectar a eventos en tiempo real
    this.connectToEventStream();

    // Mostrar estadísticas
    this.showStats();

    // Iniciar CLI interactivo
    this.startCLI();
  }

  connectToEventStream() {
    // En producción, esto se conectaría a un EventSource real
    // Por ahora, simulamos con polling
    setInterval(async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/dashboard');
        // Actualizar estadísticas en memoria si hay cambios
      } catch (error) {
        // Silenciosamente ignorar errores de conexión
      }
    }, 2000);
  }

  showStats() {
    const stats = this.db.prepare(`
      SELECT 
        COUNT(DISTINCT task_id) as total_tasks,
        COUNT(DISTINCT agent_id) as active_agents,
        AVG(duration_ms) as avg_duration
      FROM task_history
      WHERE created_at > datetime('now', '-24 hours')
    `).get();

    console.log('📊 Estadísticas (últimas 24h):');
    console.log(`- Tareas procesadas: ${stats.total_tasks || 0}`);
    console.log(`- Agentes activos: ${stats.active_agents || 0}`);
    console.log(`- Duración promedio: ${Math.round(stats.avg_duration || 0)}ms\n`);
  }

  startCLI() {
    console.log('Comandos disponibles:');
    console.log('- task <descripción>: Crear nueva tarea');
    console.log('- status: Ver estado del sistema');
    console.log('- memory <agent>: Ver memoria del agente');
    console.log('- workflow <name>: Ejecutar workflow');
    console.log('- stats: Actualizar estadísticas');
    console.log('- exit: Salir\n');

    this.rl.prompt();

    this.rl.on('line', async (line) => {
      const [command, ...args] = line.trim().split(' ');

      switch (command) {
        case 'task':
          await this.createTask(args.join(' '));
          break;
        case 'status':
          await this.showSystemStatus();
          break;
        case 'memory':
          await this.showAgentMemory(args[0]);
          break;
        case 'workflow':
          await this.runWorkflow(args[0]);
          break;
        case 'stats':
          this.showStats();
          break;
        case 'exit':
          this.cleanup();
          process.exit(0);
        default:
          if (command) {
            console.log(`❌ Comando desconocido: ${command}`);
          }
      }

      this.rl.prompt();
    });

    this.rl.on('close', () => {
      this.cleanup();
      process.exit(0);
    });
  }

  async createTask(description) {
    if (!description) {
      console.log('❌ Debes proporcionar una descripción de la tarea');
      return;
    }

    try {
      console.log('\n🚀 Creando tarea...');
      const response = await axios.post('http://localhost:3001/api/tasks', {
        projectId: this.sessionId,
        targetAgent: 'asistente',
        prompt: description,
        context: {
          mode: 'hive-mind',
          session: this.sessionId,
          memory: true
        },
        priority: 8
      });

      console.log(`✅ Tarea creada: ${response.data.taskId}`);
      
      // Guardar en memoria
      this.saveToMemory('asistente', 'task_created', {
        taskId: response.data.taskId,
        description: description
      });

      // Monitorear progreso
      await this.monitorTask(response.data.taskId);
      
    } catch (error) {
      console.error('❌ Error al crear tarea:', error.message);
    }
  }

  async monitorTask(taskId) {
    console.log('⏳ Monitoreando progreso...\n');
    
    let completed = false;
    while (!completed) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        const response = await axios.get(`http://localhost:3001/api/tasks/${taskId}`);
        const task = response.data;
        
        if (task.status === 'completed') {
          completed = true;
          console.log('\n✅ Tarea completada');
          if (task.output?.result) {
            console.log('\n📄 Resultado:');
            console.log(task.output.result);
          }
        } else if (task.status === 'failed') {
          completed = true;
          console.log('\n❌ Tarea fallida');
        }
      } catch (error) {
        // Continuar monitoreando
      }
    }
  }

  async showSystemStatus() {
    try {
      const response = await axios.get('http://localhost:3001/api/dashboard');
      const data = response.data;
      
      console.log('\n📊 Estado del Sistema:');
      console.log(`- Total de tareas: ${data.totalTasks || 0}`);
      console.log(`- Tareas pendientes: ${data.tasksByStatus?.pending || 0}`);
      console.log(`- Tareas en progreso: ${data.tasksByStatus?.in_progress || 0}`);
      console.log(`- Tareas completadas: ${data.tasksByStatus?.completed || 0}`);
      
      if (data.agentMetrics) {
        console.log('\n🤖 Métricas de Agentes:');
        Object.entries(data.agentMetrics).forEach(([agent, metrics]) => {
          console.log(`\n${agent}:`);
          console.log(`  - Tareas procesadas: ${metrics.tasksProcessed || 0}`);
          console.log(`  - Tasa de éxito: ${metrics.successRate || 0}%`);
        });
      }
    } catch (error) {
      console.error('❌ Error al obtener estado:', error.message);
    }
  }

  async showAgentMemory(agentId) {
    if (!agentId) {
      console.log('❌ Debes especificar un agente (asistente, ejecutor, profesor)');
      return;
    }

    const memories = this.db.prepare(`
      SELECT context_type, content, created_at
      FROM memory_contexts
      WHERE agent_id = ?
      ORDER BY created_at DESC
      LIMIT 10
    `).all(agentId);

    console.log(`\n🧠 Memoria de ${agentId}:`);
    if (memories.length === 0) {
      console.log('  (sin memoria reciente)');
    } else {
      memories.forEach(mem => {
        console.log(`\n  📝 ${mem.context_type} (${new Date(mem.created_at).toLocaleString()})`);
        console.log(`     ${JSON.parse(mem.content).description || mem.content}`);
      });
    }
  }

  async runWorkflow(workflowName) {
    const name = workflowName || 'default';
    console.log(`\n🔄 Ejecutando workflow: ${name}`);
    
    try {
      // Cargar workflow
      const fs = require('fs').promises;
      const workflowPath = path.join(process.cwd(), `.claude-flow/workflows/${name}.json`);
      const workflow = JSON.parse(await fs.readFile(workflowPath, 'utf8'));
      
      console.log(`📋 Pasos: ${workflow.steps.map(s => s.id).join(' → ')}`);
      
      // Por ahora, crear una tarea que ejecutará el workflow
      const response = await axios.post('http://localhost:3001/api/tasks', {
        projectId: this.sessionId,
        targetAgent: 'asistente',
        prompt: `Ejecutar workflow: ${name}`,
        context: {
          workflow: workflow,
          mode: 'workflow'
        },
        priority: 9
      });
      
      console.log(`✅ Workflow iniciado: ${response.data.taskId}`);
      await this.monitorTask(response.data.taskId);
      
    } catch (error) {
      console.error('❌ Error al ejecutar workflow:', error.message);
    }
  }

  saveToMemory(agentId, contextType, content) {
    const stmt = this.db.prepare(`
      INSERT INTO memory_contexts (agent_id, context_type, content)
      VALUES (?, ?, ?)
    `);
    
    stmt.run(agentId, contextType, JSON.stringify(content));
  }

  cleanup() {
    console.log('\n👋 Cerrando Hive-Mind...');
    this.db.close();
  }
}

// Verificar si eventsource está disponible, si no, usar polyfill básico
if (!global.EventSource) {
  global.EventSource = class {
    constructor() {}
    addEventListener() {}
    close() {}
  };
}

// Iniciar Hive Mind
const hive = new HiveMind();
hive.start();
