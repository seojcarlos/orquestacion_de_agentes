import { NextRequest, NextResponse } from 'next/server';

// Sistema de tracking de progreso integrado con Claude Flow
interface UserProgress {
  userId: string;
  currentMonth: number;
  currentWeek: number;
  completedTasks: string[];
  totalTimeSpent: number; // en minutos
  lastActivityDate: string;
  streakDays: number;
  achievements: Achievement[];
  weeklyReports: WeeklyReport[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlockedAt: string;
  icon: string;
}

interface WeeklyReport {
  week: number;
  month: number;
  completedTasks: number;
  totalTasks: number;
  timeSpent: number;
  concepts: string[];
  strengths: string[];
  improvements: string[];
  generatedAt: string;
}

interface TaskCompletionData {
  taskId: string;
  month: number;
  week: number;
  day: string;
  timeSpent: number;
  difficulty: string;
  feedback?: string;
}

// Simulación de base de datos en memoria (en producción sería una base de datos real)
const progressDatabase = new Map<string, UserProgress>();

// Logros disponibles
const ACHIEVEMENTS = {
  FIRST_WEEK: {
    id: 'first_week',
    name: 'Primera Semana',
    description: 'Completaste tu primera semana de formación',
    icon: '🎯'
  },
  STREAK_7: {
    id: 'streak_7',
    name: 'Constancia',
    description: '7 días consecutivos de práctica',
    icon: '🔥'
  },
  FIRST_MONTH: {
    id: 'first_month',
    name: 'Fundamentos Sólidos',
    description: 'Completaste el primer mes de formación',
    icon: '🏗️'
  },
  SPEED_DEMON: {
    id: 'speed_demon',
    name: 'Velocista',
    description: 'Completaste 10 tareas en un día',
    icon: '⚡'
  },
  PERFECTIONIST: {
    id: 'perfectionist',
    name: 'Perfeccionista',
    description: 'Completaste una semana sin errores',
    icon: '💎'
  }
};

function getUserProgress(userId: string): UserProgress {
  if (!progressDatabase.has(userId)) {
    progressDatabase.set(userId, {
      userId,
      currentMonth: 1,
      currentWeek: 1,
      completedTasks: [],
      totalTimeSpent: 0,
      lastActivityDate: new Date().toISOString(),
      streakDays: 0,
      achievements: [],
      weeklyReports: []
    });
  }
  return progressDatabase.get(userId)!;
}

function updateUserProgress(userId: string, updates: Partial<UserProgress>) {
  const current = getUserProgress(userId);
  const updated = { ...current, ...updates };
  progressDatabase.set(userId, updated);
  return updated;
}

function calculateStreak(userId: string): number {
  const progress = getUserProgress(userId);
  const lastActivity = new Date(progress.lastActivityDate);
  const now = new Date();
  const daysDiff = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDiff <= 1) {
    return progress.streakDays + (daysDiff === 1 ? 1 : 0);
  } else {
    return 0; // Racha rota
  }
}

function checkAchievements(userId: string, progress: UserProgress): Achievement[] {
  const newAchievements: Achievement[] = [];
  const existingIds = progress.achievements.map(a => a.id);
  
  // Primera semana completada
  if (!existingIds.includes('first_week') && progress.completedTasks.length >= 10) {
    newAchievements.push({
      ...ACHIEVEMENTS.FIRST_WEEK,
      unlockedAt: new Date().toISOString()
    });
  }
  
  // Racha de 7 días
  if (!existingIds.includes('streak_7') && progress.streakDays >= 7) {
    newAchievements.push({
      ...ACHIEVEMENTS.STREAK_7,
      unlockedAt: new Date().toISOString()
    });
  }
  
  // Primer mes completado
  if (!existingIds.includes('first_month') && progress.currentMonth > 1) {
    newAchievements.push({
      ...ACHIEVEMENTS.FIRST_MONTH,
      unlockedAt: new Date().toISOString()
    });
  }
  
  return newAchievements;
}

async function generateWeeklyReport(userId: string, month: number, week: number): Promise<WeeklyReport> {
  const progress = getUserProgress(userId);
  const weekTasks = progress.completedTasks.filter(taskId => 
    taskId.includes(`m${month}-w${week}`)
  );
  
  // Aquí integraríamos con Claude Flow para generar un reporte personalizado
  const mockReport: WeeklyReport = {
    week,
    month,
    completedTasks: weekTasks.length,
    totalTasks: 20, // Estimado
    timeSpent: Math.floor(Math.random() * 600) + 300, // Mock: 5-15 horas
    concepts: [
      'Clean Code principles',
      'Task Management patterns',
      'JSON Schema validation',
      'Unit testing fundamentals'
    ],
    strengths: [
      'Excelente comprensión de patrones de diseño',
      'Consistencia en la práctica diaria',
      'Código limpio y bien documentado'
    ],
    improvements: [
      'Dedicar más tiempo a los tests',
      'Practicar más ejemplos complejos',
      'Revisar conceptos de arquitectura'
    ],
    generatedAt: new Date().toISOString()
  };
  
  return mockReport;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userId = 'default-user' } = body;

    switch (action) {
      case 'complete_task': {
        const { taskId, month, week, day, timeSpent, difficulty, feedback }: TaskCompletionData = body;
        
        const progress = getUserProgress(userId);
        const newStreak = calculateStreak(userId);
        
        // Actualizar progreso
        const updatedProgress = updateUserProgress(userId, {
          completedTasks: [...progress.completedTasks, taskId],
          totalTimeSpent: progress.totalTimeSpent + timeSpent,
          lastActivityDate: new Date().toISOString(),
          streakDays: newStreak
        });
        
        // Verificar logros
        const newAchievements = checkAchievements(userId, updatedProgress);
        if (newAchievements.length > 0) {
          updateUserProgress(userId, {
            achievements: [...updatedProgress.achievements, ...newAchievements]
          });
        }
        
        // Enviar a Claude Flow para análisis
        // await claudeFlow.executeFlow('task_completed', { userId, taskId, feedback });
        
        return NextResponse.json({
          success: true,
          progress: getUserProgress(userId),
          newAchievements
        });
      }

      case 'generate_weekly_report': {
        const { month, week } = body;
        
        const report = await generateWeeklyReport(userId, month, week);
        
        // Agregar reporte al progreso del usuario
        const progress = getUserProgress(userId);
        updateUserProgress(userId, {
          weeklyReports: [...progress.weeklyReports, report]
        });
        
        return NextResponse.json(report);
      }

      case 'update_current_position': {
        const { month, week } = body;
        
        updateUserProgress(userId, {
          currentMonth: month,
          currentWeek: week
        });
        
        return NextResponse.json({
          success: true,
          progress: getUserProgress(userId)
        });
      }

      case 'get_analytics': {
        const progress = getUserProgress(userId);
        
        // Calcular estadísticas avanzadas
        const analytics = {
          totalProgress: Math.floor((progress.completedTasks.length / 960) * 100), // 960 = 48 semanas * 20 tareas aprox
          currentPhase: progress.currentMonth <= 3 ? 'Fundamentos' : 
                      progress.currentMonth <= 6 ? 'Orquestación' :
                      progress.currentMonth <= 9 ? 'Visualización' : 'Productización',
          averageTimePerWeek: progress.totalTimeSpent / Math.max(progress.currentWeek, 1),
          streakRecord: Math.max(...progress.weeklyReports.map(r => r.completedTasks), 0),
          conceptsMastered: progress.weeklyReports.reduce((acc, r) => acc + r.concepts.length, 0),
          achievementCount: progress.achievements.length,
          estimatedCompletion: calculateEstimatedCompletion(progress)
        };
        
        return NextResponse.json(analytics);
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in progress API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId') || 'default-user';
  const action = searchParams.get('action') || 'get_progress';

  try {
    switch (action) {
      case 'get_progress': {
        const progress = getUserProgress(userId);
        return NextResponse.json(progress);
      }

      case 'get_leaderboard': {
        // Simular leaderboard (en producción sería una consulta real)
        const leaderboard = [
          { userId: 'user1', completedTasks: 145, streak: 23, achievements: 8 },
          { userId: 'user2', completedTasks: 132, streak: 15, achievements: 6 },
          { userId: 'user3', completedTasks: 127, streak: 12, achievements: 7 }
        ];
        
        return NextResponse.json(leaderboard);
      }

      case 'get_achievements': {
        return NextResponse.json(Object.values(ACHIEVEMENTS));
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in progress GET API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function calculateEstimatedCompletion(progress: UserProgress): string {
  const tasksPerWeek = 20; // Estimado
  const totalTasks = 48 * tasksPerWeek; // 48 semanas
  const completedTasks = progress.completedTasks.length;
  const remainingTasks = totalTasks - completedTasks;
  
  // Calcular velocidad promedio (tareas por semana)
  const weeksActive = Math.max(progress.currentWeek, 1);
  const averageTasksPerWeek = completedTasks / weeksActive;
  
  if (averageTasksPerWeek === 0) {
    return 'No estimable aún';
  }
  
  const remainingWeeks = Math.ceil(remainingTasks / averageTasksPerWeek);
  const completionDate = new Date();
  completionDate.setDate(completionDate.getDate() + (remainingWeeks * 7));
  
  return completionDate.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}