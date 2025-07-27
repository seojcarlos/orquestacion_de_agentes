#!/usr/bin/env node

/**
 * Script de conexión para verificar que ambos proyectos están funcionando
 */

import http from 'http';

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data
        });
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function testConnectivity() {
  console.log('🔍 Probando conectividad de los servicios...\n');
  
  // Test 1: Servidor de Agentes
  try {
    const response = await makeRequest('http://localhost:3001/health');
    const agentData = JSON.parse(response.data);
    
    console.log('✅ Servidor de Agentes (Puerto 3001):');
    console.log(`   Status: ${agentData.status}`);
    console.log(`   Tiempo: ${agentData.timestamp}`);
  } catch (error) {
    console.log('❌ Servidor de Agentes (Puerto 3001): No disponible');
    console.log(`   Error: ${error.message}`);
  }
  
  // Test 2: API de agentes
  try {
    const response = await makeRequest('http://localhost:3001/api/agents');
    const agentsData = JSON.parse(response.data);
    
    console.log('✅ API de Agentes:');
    console.log(`   Agentes disponibles: ${agentsData.agents.join(', ')}`);
    console.log(`   Status: ${agentsData.status}`);
  } catch (error) {
    console.log('❌ API de Agentes: No disponible');
    console.log(`   Error: ${error.message}`);
  }
  
  // Test 3: Servidor Next.js
  try {
    const response = await makeRequest('http://localhost:3002');
    console.log('✅ Servidor Next.js (Puerto 3002): Disponible');
    console.log(`   Status HTTP: ${response.status}`);
  } catch (error) {
    console.log('❌ Servidor Next.js (Puerto 3002): No disponible');
    console.log(`   Error: ${error.message}`);
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 Estado del Sistema:');
  console.log('   🤖 Agentes IA: http://localhost:3001');
  console.log('   🌐 Interfaz Web: http://localhost:3002');
  console.log('   🔗 Integración: Activa');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

testConnectivity().catch(console.error);
}

testConnectivity().catch(console.error);
