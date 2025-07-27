#!/usr/bin/env node

/**
 * Script de inicialización de Claude Flow
 * Simula el comportamiento de `npx claude-flow init --hive-mind`
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

async function initClaudeFlow() {
  console.log('🚀 Inicializando Claude Flow con modo Hive-Mind...\n');

  try {
    // 1. Crear estructura de directorios
    const dirs = [
      '.claude-flow',
      '.claude-flow/workflows',
      '.claude-flow/memory',
      '.claude-flow/tools',
      'src/lib/claude-flow',
      'src/lib/agents',
      'src/hooks'
    ];

    for (const dir of dirs) {
      const dirPath = path.join(process.cwd(), dir);
      await fs.mkdir(dirPath, { recursive: true });
      console.log(`✅ Creado: ${dir}`);
    }

    // 2. Crear archivo de memoria SQLite
    const Database = require('better-sqlite3');
    const dbPath = path.join(process.cwd(), '.claude-flow/memory/claude-flow.db');
    const db = new Database(dbPath);

    // Crear tablas de memoria
    db.exec(`
      CREATE TABLE IF NOT EXISTS memory_contexts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        agent_id TEXT NOT NULL,
        context_type TEXT NOT NULL,
        content TEXT NOT NULL,
        metadata TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS agent_interactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        agent_from TEXT NOT NULL,
        agent_to TEXT NOT NULL,
        message TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS task_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id TEXT NOT NULL,
        agent_id TEXT NOT NULL,
        action TEXT NOT NULL,
        result TEXT,
        duration_ms INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_memory_agent ON memory_contexts(agent_id);
      CREATE INDEX IF NOT EXISTS idx_interactions_session ON agent_interactions(session_id);
      CREATE INDEX IF NOT EXISTS idx_task_history ON task_history(task_id);
    `);

    db.close();
    console.log('✅ Base de datos de memoria creada');

    // 3. Crear archivo de manifiesto de herramientas
    const toolsManifest = {
      version: '1.0.0',
      tools: {
        code_generation: {
          name: 'Generador de Código',
          description: 'Genera código optimizado para diferentes frameworks',
          agent: 'ejecutor'
        },
        test_creation: {
          name: 'Creador de Tests',
          description: 'Genera tests unitarios y de integración',
          agent: 'ejecutor'
        },
        documentation: {
          name: 'Generador de Documentación',
          description: 'Crea documentación técnica y de usuario',
          agent: 'profesor'
        },
        refactoring: {
          name: 'Refactorizador',
          description: 'Mejora la calidad del código existente',
          agent: 'ejecutor'
        },
        performance_analysis: {
          name: 'Analizador de Rendimiento',
          description: 'Analiza y optimiza el rendimiento',
          agent: 'ejecutor'
        },
        tutorial_generator: {
          name: 'Generador de Tutoriales',
          description: 'Crea tutoriales interactivos',
          agent: 'profesor'
        },
        project_planner: {
          name: 'Planificador de Proyectos',
          description: 'Organiza y estructura proyectos',
          agent: 'asistente'
        }
      }
    };

    await fs.writeFile(
      path.join(process.cwd(), '.claude-flow/tools/manifest.json'),
      JSON.stringify(toolsManifest, null, 2)
    );
    console.log('✅ Manifiesto de herramientas creado');

    // 4. Crear workflow por defecto
    const defaultWorkflow = {
      name: 'default',
      description: 'Flujo de trabajo por defecto',
      steps: [
        {
          id: 'analyze',
          agent: 'asistente',
          action: 'analyze_request',
          next: 'plan'
        },
        {
          id: 'plan',
          agent: 'asistente',
          action: 'create_plan',
          next: 'execute'
        },
        {
          id: 'execute',
          agent: 'ejecutor',
          action: 'implement',
          parallel: ['document']
        },
        {
          id: 'document',
          agent: 'profesor',
          action: 'create_documentation',
          next: 'review'
        },
        {
          id: 'review',
          agent: 'asistente',
          action: 'review_results',
          end: true
        }
      ]
    };

    await fs.writeFile(
      path.join(process.cwd(), '.claude-flow/workflows/default.json'),
      JSON.stringify(defaultWorkflow, null, 2)
    );
    console.log('✅ Workflow por defecto creado');

    // 5. Crear archivo de estado
    const initialState = {
      version: '1.0.0',
      mode: 'hive-mind',
      initialized: new Date().toISOString(),
      agents: {
        asistente: { status: 'ready', lastActive: null },
        ejecutor: { status: 'ready', lastActive: null },
        profesor: { status: 'ready', lastActive: null }
      },
      stats: {
        tasksCompleted: 0,
        totalRuntime: 0,
        successRate: 100
      }
    };

    await fs.writeFile(
      path.join(process.cwd(), '.claude-flow/state.json'),
      JSON.stringify(initialState, null, 2)
    );
    console.log('✅ Estado inicial creado');

    console.log('\n🎉 Claude Flow inicializado correctamente!');
    console.log('\nPróximos pasos:');
    console.log('1. Ejecuta: npm run dev:all');
    console.log('2. Usa: npm run claude-flow:swarm "tu tarea"');
    console.log('3. O inicia modo colmena: npm run claude-flow:hive\n');

  } catch (error) {
    console.error('❌ Error al inicializar Claude Flow:', error.message);
    process.exit(1);
  }
}

// Ejecutar
initClaudeFlow();
