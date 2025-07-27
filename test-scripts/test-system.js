// test-system.js - Prueba completa del sistema de orquestación
const axios = require('axios');

const BASE_URL_ORCHESTRATOR = 'http://localhost:3000';
const BASE_URL_AGENTS = 'http://localhost:3001';

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

async function testEndpoint(name, url) {
  try {
    console.log(`\n${colors.blue}🔍 Probando ${name}...${colors.reset}`);
    const response = await axios.get(url);
    console.log(`${colors.green}✅ ${name} - OK${colors.reset}`);
    console.log(`${colors.magenta}Respuesta:${colors.reset}`, JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.log(`${colors.red}❌ ${name} - Error${colors.reset}`);
    console.log(`${colors.yellow}Detalles: ${error.message}${colors.reset}`);
    return false;
  }
}

async function runTests() {
  console.log(`${colors.blue}${'='.repeat(50)}${colors.reset}`);
  console.log(`${colors.magenta}🚀 PRUEBA COMPLETA DEL SISTEMA DE ORQUESTACIÓN${colors.reset}`);
  console.log(`${colors.blue}${'='.repeat(50)}${colors.reset}`);

  const tests = [
    // Servidor de Agentes (mi-agencia-ia)
    { name: 'Health Check - Agentes', url: `${BASE_URL_AGENTS}/health` },
    { name: 'Lista de Agentes', url: `${BASE_URL_AGENTS}/api/agents` },
    { name: 'Estado de Tareas', url: `${BASE_URL_AGENTS}/api/tasks` },
    
    // Servidor de Orquestación (Next.js)
    { name: 'API Health - Orquestación', url: `${BASE_URL_ORCHESTRATOR}/api/health` },
    { name: 'API Agents - Orquestación', url: `${BASE_URL_ORCHESTRATOR}/api/agents` }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    const result = await testEndpoint(test.name, test.url);
    if (result) passed++;
    else failed++;
  }

  // Resumen
  console.log(`\n${colors.blue}${'='.repeat(50)}${colors.reset}`);
  console.log(`${colors.magenta}📊 RESUMEN DE PRUEBAS${colors.reset}`);
  console.log(`${colors.blue}${'='.repeat(50)}${colors.reset}`);
  console.log(`${colors.green}✅ Exitosas: ${passed}${colors.reset}`);
  console.log(`${colors.red}❌ Fallidas: ${failed}${colors.reset}`);
  
  if (failed === 0) {
    console.log(`\n${colors.green}🎉 ¡SISTEMA FUNCIONANDO PERFECTAMENTE!${colors.reset}`);
  } else {
    console.log(`\n${colors.yellow}⚠️  Algunos componentes requieren atención${colors.reset}`);
  }
}

// Ejecutar pruebas
runTests().catch(console.error);