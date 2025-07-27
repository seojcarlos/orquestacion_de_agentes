#!/usr/bin/env node

/**
 * Script de Swarm de Claude Flow
 * Simula el comportamiento de `npx claude-flow swarm`
 */

const path = require('path');
const axios = require('axios');

async function runSwarm(task) {
  if (!task) {
    console.error('❌ Error: Debes proporcionar una tarea');
    console.log('Uso: npm run claude-flow:swarm "tu tarea aquí"');
    process.exit(1);
  }

  console.log('🐝 Iniciando enjambre de Claude Flow...');
  console.log(`📋 Tarea: ${task}\n`);

  try {
    // Verificar que el servidor de agentes esté ejecutándose
    try {
      await axios.get('http://localhost:3001/health');
    } catch (error) {
      console.error('❌ El servidor de agentes no está ejecutándose');
      console.log('💡 Ejecuta primero: npm run dev:all');
      process.exit(1);
    }

    // Crear tarea principal
    console.log('🚀 Enviando tarea al coordinador...');
    const response = await axios.post('http://localhost:3001/api/tasks', {
      projectId: 'claude-flow-swarm',
      targetAgent: 'asistente',
      prompt: task,
      context: {
        mode: 'swarm',
        autoDistribute: true,
        includeAllAgents: true
      },
      priority: 10
    });

    const taskId = response.data.taskId;
    console.log(`✅ Tarea creada: ${taskId}`);
    console.log('\n⏳ Procesando con el enjambre...\n');

    // Monitorear progreso
    let completed = false;
    let lastStatus = '';
    
    while (!completed) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        const statusResponse = await axios.get(`http://localhost:3001/api/tasks/${taskId}`);
        const task = statusResponse.data;
        
        if (task.status !== lastStatus) {
          lastStatus = task.status;
          console.log(`📊 Estado: ${task.status}`);
          
          if (task.execution && task.execution.currentAgent) {
            console.log(`🤖 Agente activo: ${task.execution.currentAgent}`);
          }
        }
        
        if (task.status === 'completed') {
          completed = true;
          console.log('\n✅ ¡Tarea completada!');
          console.log('\n📄 Resultado:');
          console.log('─'.repeat(50));
          
          if (task.output && task.output.result) {
            console.log(task.output.result);
          }
          
          console.log('─'.repeat(50));
          
          if (task.execution) {
            console.log('\n📈 Métricas:');
            console.log(`- Duración: ${task.execution.duration}ms`);
            console.log(`- Tokens usados: ${task.execution.totalTokens || 'N/A'}`);
            console.log(`- Agentes involucrados: ${task.execution.agentsInvolved?.join(', ') || 'N/A'}`);
          }
        } else if (task.status === 'failed') {
          completed = true;
          console.error('\n❌ La tarea falló:', task.error);
        }
      } catch (error) {
        console.error('❌ Error al verificar estado:', error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Error en el enjambre:', error.message);
    process.exit(1);
  }
}

// Obtener tarea de los argumentos
const task = process.argv.slice(2).join(' ');
runSwarm(task);
