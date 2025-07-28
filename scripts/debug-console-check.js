// Debug Script para Verificación Completa del Proyecto
// Ejecutar: node scripts/debug-console-check.js

const fs = require('fs');
const path = require('path');

console.log('🔍 INICIANDO DEBUG COMPLETO DEL PROYECTO');
console.log('=====================================\n');

// Configuración de rutas a verificar
const routesToCheck = [
  'http://localhost:3000',
  'http://localhost:3000/agencia',
  'http://localhost:3000/agencia/mes-1/semana-1',
  'http://localhost:3000/agencia/mes-1/semana-2',
  'http://localhost:3000/agencia/mes-1/semana-2/tareas',
  'http://localhost:3000/tutoriales',
  'http://localhost:3000/tutoriales/gitignore-correcto',
  'http://localhost:3000/playground'
];

// Verificación de archivos críticos
const criticalFiles = [
  'src/app/agencia/mes-1/semana-1/page.tsx',
  'src/app/agencia/mes-1/semana-2/tareas/page.tsx',
  'src/components/academia/ChatAgenteBasico.tsx',
  'src/lib/agents/AgenteBasico.ts',
  'src/app/tutoriales/gitignore-correcto/page.tsx'
];

function checkFileExists(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  const exists = fs.existsSync(fullPath);
  
  console.log(`📄 ${filePath}: ${exists ? '✅ EXISTE' : '❌ FALTA'}`);
  
  if (exists) {
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Verificaciones específicas
      if (filePath.includes('semana-1') && content.includes('Flask')) {
        console.log(`  ⚠️  PROBLEMA: Aún contiene referencias a 'Flask'`);
      }
      
      if (content.includes('```') && !content.includes('\\`\\`\\`')) {
        console.log(`  ⚠️  PROBLEMA: Posibles bloques de markdown mal formateados`);
      }
      
      if (content.includes('undefined') && content.includes('export')) {
        console.log(`  ⚠️  PROBLEMA: Posibles exports undefined`);
      }
      
      console.log(`  📊 Tamaño: ${Math.round(content.length / 1024)}KB`);
    } catch (error) {
      console.log(`  ❌ ERROR al leer: ${error.message}`);
    }
  }
}

// Función para generar comandos de verificación en navegador
function generateBrowserChecks() {
  console.log('\n🌐 COMANDOS PARA VERIFICAR EN CONSOLA DEL NAVEGADOR:');
  console.log('=================================================\n');
  
  routesToCheck.forEach((route, index) => {
    console.log(`${index + 1}. Navegar a: ${route}`);
    console.log(`   Abrir DevTools (F12) y ejecutar:`);
    console.log(`   console.clear(); console.log("✅ Verificando ${route}");`);
    console.log(`   console.log("Errores:", console.error.length || "Ninguno");`);
    console.log(`   console.log("Warnings:", console.warn.length || "Ninguno");`);
    console.log('');
  });
}

// Función para verificar dependencias
function checkDependencies() {
  console.log('\n📦 VERIFICANDO DEPENDENCIAS:');
  console.log('============================\n');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    const criticalDeps = [
      'next',
      'react',
      'lucide-react',
      'tailwindcss'
    ];
    
    criticalDeps.forEach(dep => {
      const version = packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep];
      console.log(`📦 ${dep}: ${version ? `✅ ${version}` : '❌ FALTA'}`);
    });
    
  } catch (error) {
    console.log(`❌ Error al leer package.json: ${error.message}`);
  }
}

// Ejecutar verificaciones
console.log('📁 VERIFICANDO ARCHIVOS CRÍTICOS:');
console.log('=================================\n');

criticalFiles.forEach(checkFileExists);

checkDependencies();
generateBrowserChecks();

console.log('\n🎯 PLAN DE VERIFICACIÓN SISTEMÁTICA:');
console.log('===================================\n');
console.log('1. ✅ Verificar que el servidor esté ejecutándose en http://localhost:3000');
console.log('2. 🌐 Navegar a cada ruta de la lista superior');
console.log('3. 🔧 Abrir DevTools (F12) en cada página');
console.log('4. 📊 Verificar la pestaña Console por errores');
console.log('5. 🔍 Verificar la pestaña Network por fallos de carga');
console.log('6. ⚡ Verificar la pestaña Performance si hay lentitud');
console.log('7. 📱 Probar responsive design en diferentes tamaños');
console.log('8. 🔄 Verificar que los componentes interactivos funcionen');

console.log('\n🚨 ERRORES COMUNES A BUSCAR:');
console.log('===========================\n');
console.log('• "Element type is invalid" - Componentes mal importados');
console.log('• "Cannot read property" - Variables undefined');
console.log('• "Failed to fetch" - Problemas de API');
console.log('• "Hydration error" - Diferencias server/client');
console.log('• 404 errors - Rutas o assets faltantes');
console.log('• CORS errors - Problemas de configuración');

console.log('\n✅ DEBUG SCRIPT COMPLETADO');
console.log('========================\n');
