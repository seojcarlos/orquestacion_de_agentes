/**
 * 🤖 SISTEMA DE EXPANSIÓN AUTOMÁTICA DE CONTENIDO
 * 
 * Automatiza la generación de prompts para Claude Code
 * Rastrea el progreso y evita trabajo manual repetitivo
 */

const fs = require('fs');
const path = require('path');

class AutoExpansionTracker {
  constructor() {
    this.roadmapPath = './docs/01-project/roadmap-48-weeks.md';
    this.progressFile = './docs/05-emergency/expansion-progress.json';
    this.baseStructure = './src/app/agencia/';
    
    // Cargar progreso existente
    this.progress = this.loadProgress();
  }

  /**
   * 📊 ANALIZAR ESTADO ACTUAL
   * Detecta qué está creado y qué falta
   */
  async analyzeCurrentState() {
    console.log('🔍 Analizando estado actual...');
    
    const analysis = {
      created: [],
      missing: [],
      incomplete: [],
      totalTasks: 48 * 5, // 48 semanas × 5 días
      tokenEstimate: 0
    };

    // Escanear estructura actual
    for (let mes = 1; mes <= 12; mes++) {
      for (let semana = 1; semana <= 4; semana++) {
        const weekPath = `${this.baseStructure}mes-${mes}/semana-${semana}/`;
        
        if (fs.existsSync(weekPath)) {
          // Verificar días dentro de la semana
          for (let dia = 1; dia <= 5; dia++) {
            const dayPath = `${weekPath}dia-${dia}/page.tsx`;
            
            if (fs.existsSync(dayPath)) {
              const content = fs.readFileSync(dayPath, 'utf8');
              
              if (this.isContentComplete(content)) {
                analysis.created.push(`F${Math.ceil(mes/3)}-M${mes}-S${semana}-D${dia}`);
              } else {
                analysis.incomplete.push(`F${Math.ceil(mes/3)}-M${mes}-S${semana}-D${dia}`);
              }
            } else {
              analysis.missing.push(`F${Math.ceil(mes/3)}-M${mes}-S${semana}-D${dia}`);
            }
          }
        } else {
          // Semana completa faltante
          for (let dia = 1; dia <= 5; dia++) {
            analysis.missing.push(`F${Math.ceil(mes/3)}-M${mes}-S${semana}-D${dia}`);
          }
        }
      }
    }

    // Estimar tokens necesarios
    analysis.tokenEstimate = analysis.missing.length * 25000 + analysis.incomplete.length * 15000;

    this.saveAnalysis(analysis);
    return analysis;
  }

  /**
   * 🎯 GENERAR PROMPT AUTOMÁTICO
   * Basado en el roadmap y el estado actual
   */
  generateSmartPrompt(taskId) {
    const taskInfo = this.extractTaskInfo(taskId);
    const dependencies = this.findDependencies(taskId);
    
    const prompt = `
EXPANDIR TAREA ${taskId} - ${taskInfo.title}

CONTEXTO AUTOMÁTICO:
${this.getAutomaticContext(taskId)}

DEPENDENCIAS DETECTADAS:
${dependencies.map(dep => `- ${dep}`).join('\n')}

ESTRUCTURA A CREAR:
📁 src/app/agencia/mes-${taskInfo.mes}/semana-${taskInfo.semana}/
  📁 dia-1/ → dia-5/
    📄 page.tsx (estructura completa educativa)

CONTENIDO POR DÍA:
${this.generateDayContent(taskInfo)}

TOKENS: Usar MÁXIMO disponible para contenido denso
ESTILO: Nivel universitario + componentes interactivos
VALIDACIÓN: Incluir sistema de progreso automático

INTEGRAR CON ROADMAP EXISTENTE - NO crear desde cero
`;

    return prompt;
  }

  /**
   * 🔄 DETECTAR CUANDO SE QUEDA SIN TOKENS
   * Y generar siguiente prompt automáticamente
   */
  detectTokenExhaustion(lastOutput) {
    const exhaustionSignals = [
      'token limit',
      'maximum length',
      'content truncated',
      '<!-- Contenido continúa',
      'parte 2/4',
      'Continuing in next'
    ];

    const hasExhaustion = exhaustionSignals.some(signal => 
      lastOutput.toLowerCase().includes(signal.toLowerCase())
    );

    if (hasExhaustion) {
      return this.generateContinuationPrompt(lastOutput);
    }

    return null;
  }

  /**
   * 📝 PROMPT DE CONTINUACIÓN AUTOMÁTICO
   */
  generateContinuationPrompt(lastOutput) {
    const taskId = this.extractTaskIdFromOutput(lastOutput);
    const lastSection = this.extractLastSection(lastOutput);
    
    return `
CONTINUAR TAREA ${taskId} - DESDE ${lastSection}

ARCHIVO: ${this.getFilePathFromTask(taskId)}

⚠️ CONTINUACIÓN AUTOMÁTICA detectada
NO repetir contenido previo

COMPLETAR DESDE: ${lastSection}
SECCIONES RESTANTES: ${this.getRemainingContent(taskId, lastSection)}

MANTENER: Todo el contenido anterior intacto
AGREGAR: Solo las secciones faltantes

TOKENS: Usar máximo disponible para completar
`;
  }

  /**
   * 📊 TRACKING AUTOMÁTICO DE PROGRESO
   */
  updateProgress(taskId, status, tokens_used = 0) {
    this.progress[taskId] = {
      status, // 'started', 'incomplete', 'completed'
      timestamp: new Date().toISOString(),
      tokens_used,
      attempts: (this.progress[taskId]?.attempts || 0) + 1
    };

    this.saveProgress();
    this.generateProgressReport();
  }

  /**
   * 📈 REPORTE AUTOMÁTICO DE PROGRESO
   */
  generateProgressReport() {
    const report = {
      completed: Object.values(this.progress).filter(p => p.status === 'completed').length,
      incomplete: Object.values(this.progress).filter(p => p.status === 'incomplete').length,
      remaining: 240 - Object.keys(this.progress).length,
      totalTokens: Object.values(this.progress).reduce((sum, p) => sum + (p.tokens_used || 0), 0),
      estimatedTime: this.calculateEstimatedTime()
    };

    console.log('📊 PROGRESO AUTOMÁTICO:');
    console.log(`✅ Completadas: ${report.completed}/240`);
    console.log(`🔄 Incompletas: ${report.incomplete}`);
    console.log(`⏳ Restantes: ${report.remaining}`);
    console.log(`🎯 Tokens usados: ${report.totalTokens.toLocaleString()}`);
    console.log(`⏱️ Tiempo estimado restante: ${report.estimatedTime}`);

    return report;
  }

  /**
   * 🎯 SIGUIENTE TAREA AUTOMÁTICA
   * Basada en dependencias y progreso
   */
  async getNextTask() {
    const analysis = await this.analyzeCurrentState();
    
    // Priorizar por dependencias
    const nextTasks = analysis.missing
      .filter(taskId => this.areDependenciesMet(taskId))
      .sort((a, b) => this.getTaskPriority(a) - this.getTaskPriority(b));

    if (nextTasks.length > 0) {
      const nextTask = nextTasks[0];
      const prompt = this.generateSmartPrompt(nextTask);
      
      console.log(`🎯 SIGUIENTE TAREA AUTOMÁTICA: ${nextTask}`);
      console.log(`📝 PROMPT GENERADO:\n${prompt}`);
      
      return { task: nextTask, prompt };
    }

    return null;
  }

  // Método helper para verificar dependencias
  areDependenciesMet(taskId) {
    // Por ahora, asumimos que las dependencias están en orden secuencial
    const [phase, month, week, day] = taskId.split('-').map(p => parseInt(p.slice(1)) || parseInt(p));
    
    // Si es el primer día de cualquier cosa, no tiene dependencias
    if (day === 1 && week === 1 && month === 1) return true;
    
    // Verificar día anterior
    if (day > 1) {
      const prevDay = `F${phase}-M${month}-S${week}-D${day-1}`;
      return this.progress[prevDay]?.status === 'completed';
    }
    
    return true; // Simplificado por ahora
  }

  // Método helper para prioridad
  getTaskPriority(taskId) {
    const [phase, month, week, day] = taskId.split('-').map(p => parseInt(p.slice(1)) || parseInt(p));
    return phase * 1000 + month * 100 + week * 10 + day;
  }

  // Métodos helper
  isContentComplete(content) {
    const requiredSections = ['TheorySection', 'ExamplesSection', 'PracticeSection', 'EvaluationSection', 'ProjectSection'];
    return requiredSections.every(section => 
      content.includes(section) && !content.includes(`// ${section} pendiente`)
    );
  }

  loadProgress() {
    try {
      return JSON.parse(fs.readFileSync(this.progressFile, 'utf8'));
    } catch {
      return {};
    }
  }

  saveProgress() {
    fs.writeFileSync(this.progressFile, JSON.stringify(this.progress, null, 2));
  }

  saveAnalysis(analysis) {
    fs.writeFileSync('./docs/05-emergency/current-analysis.json', JSON.stringify(analysis, null, 2));
  }
}

// 🚀 USAR EL SISTEMA
const tracker = new AutoExpansionTracker();

// Comando principal
if (process.argv[2] === 'analyze') {
  tracker.analyzeCurrentState().then(analysis => {
    console.log('📊 Análisis completado:', analysis);
  });
}

if (process.argv[2] === 'next') {
  const next = tracker.getNextTask();
  if (next) {
    console.log('\n🎯 COPIA ESTE PROMPT EN CLAUDE CODE:');
    console.log('=' .repeat(50));
    console.log(next.prompt);
    console.log('=' .repeat(50));
  } else {
    console.log('🎉 ¡TODAS LAS TAREAS COMPLETADAS!');
  }
}

module.exports = AutoExpansionTracker;
