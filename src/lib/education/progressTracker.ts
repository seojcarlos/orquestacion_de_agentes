// Sistema de seguimiento de progreso educativo

export interface LearningSession {
  id: string
  taskId: string
  startTime: Date
  endTime?: Date
  timeSpent: number // minutes
  sectionsCompleted: string[]
  quizScores: { [quizId: string]: number }
  interactionCount: number
  focusTime: number // time actively engaged
}

export interface ProgressMetrics {
  totalTimeSpent: number
  averageSessionTime: number
  completionRate: number
  quizAverageScore: number
  streakDays: number
  lastActivityDate: Date
}

export interface LearningGoal {
  id: string
  title: string
  description: string
  targetDate: Date
  progress: number // 0-100
  milestones: Milestone[]
}

export interface Milestone {
  id: string
  title: string
  description: string
  completed: boolean
  completedAt?: Date
  requiredSections: string[]
}

export class ProgressTracker {
  private sessions: LearningSession[] = []
  private goals: LearningGoal[] = []
  private currentSession: LearningSession | null = null

  constructor() {
    this.loadFromStorage()
  }

  /**
   * Inicia una nueva sesión de aprendizaje
   */
  startSession(taskId: string): string {
    const sessionId = this.generateSessionId()
    
    this.currentSession = {
      id: sessionId,
      taskId,
      startTime: new Date(),
      timeSpent: 0,
      sectionsCompleted: [],
      quizScores: {},
      interactionCount: 0,
      focusTime: 0
    }

    return sessionId
  }

  /**
   * Finaliza la sesión actual
   */
  endSession() {
    if (!this.currentSession) return

    this.currentSession.endTime = new Date()
    this.currentSession.timeSpent = this.calculateSessionTime(this.currentSession)
    
    this.sessions.push({ ...this.currentSession })
    this.currentSession = null
    
    this.saveToStorage()
    this.updateGoalsProgress()
  }

  /**
   * Marca una sección como completada
   */
  markSectionCompleted(sectionId: string) {
    if (!this.currentSession) return

    if (!this.currentSession.sectionsCompleted.includes(sectionId)) {
      this.currentSession.sectionsCompleted.push(sectionId)
      this.currentSession.interactionCount++
    }

    this.saveToStorage()
  }

  /**
   * Registra el resultado de un quiz
   */
  recordQuizScore(quizId: string, score: number) {
    if (!this.currentSession) return

    this.currentSession.quizScores[quizId] = score
    this.currentSession.interactionCount++
    
    this.saveToStorage()
  }

  /**
   * Registra interacción del usuario
   */
  recordInteraction() {
    if (!this.currentSession) return
    
    this.currentSession.interactionCount++
    this.currentSession.focusTime += 0.5 // Incrementa medio minuto de foco
  }

  /**
   * Obtiene métricas de progreso
   */
  getProgressMetrics(): ProgressMetrics {
    const totalSessions = this.sessions.length
    if (totalSessions === 0) {
      return {
        totalTimeSpent: 0,
        averageSessionTime: 0,
        completionRate: 0,
        quizAverageScore: 0,
        streakDays: 0,
        lastActivityDate: new Date()
      }
    }

    const totalTimeSpent = this.sessions.reduce((sum, session) => sum + session.timeSpent, 0)
    const averageSessionTime = totalTimeSpent / totalSessions

    const allSections = ['teoria', 'ejemplos', 'practica', 'evaluacion', 'proyecto']
    const completedSections = new Set()
    this.sessions.forEach(session => {
      session.sectionsCompleted.forEach(section => completedSections.add(section))
    })
    const completionRate = (completedSections.size / allSections.length) * 100

    const allQuizScores = this.sessions.reduce((scores, session) => {
      return scores.concat(Object.values(session.quizScores))
    }, [] as number[])
    const quizAverageScore = allQuizScores.length > 0 
      ? allQuizScores.reduce((a, b) => a + b, 0) / allQuizScores.length 
      : 0

    const streakDays = this.calculateStreakDays()
    const lastActivityDate = this.sessions.length > 0 
      ? new Date(Math.max(...this.sessions.map(s => s.endTime?.getTime() || 0)))
      : new Date()

    return {
      totalTimeSpent,
      averageSessionTime,
      completionRate,
      quizAverageScore,
      streakDays,
      lastActivityDate
    }
  }

  /**
   * Crea una meta de aprendizaje
   */
  createGoal(title: string, description: string, targetDate: Date, milestones: Omit<Milestone, 'id' | 'completed' | 'completedAt'>[]): string {
    const goalId = this.generateGoalId()
    
    const goal: LearningGoal = {
      id: goalId,
      title,
      description,
      targetDate,
      progress: 0,
      milestones: milestones.map((milestone, index) => ({
        ...milestone,
        id: `${goalId}-milestone-${index}`,
        completed: false
      }))
    }

    this.goals.push(goal)
    this.saveToStorage()
    
    return goalId
  }

  /**
   * Actualiza el progreso de las metas
   */
  private updateGoalsProgress() {
    this.goals.forEach(goal => {
      const completedMilestones = goal.milestones.filter(m => {
        if (m.completed) return true
        
        // Verificar si todos los requisitos están completados
        const allCompleted = m.requiredSections.every(section => 
          this.sessions.some(session => session.sectionsCompleted.includes(section))
        )
        
        if (allCompleted) {
          m.completed = true
          m.completedAt = new Date()
          return true
        }
        
        return false
      })
      
      goal.progress = (completedMilestones.length / goal.milestones.length) * 100
    })
    
    this.saveToStorage()
  }

  /**
   * Obtiene el historial de sesiones
   */
  getSessionHistory(): LearningSession[] {
    return [...this.sessions].sort((a, b) => 
      b.startTime.getTime() - a.startTime.getTime()
    )
  }

  /**
   * Obtiene estadísticas por día
   */
  getDailyStats(days: number = 7): Array<{
    date: Date
    timeSpent: number
    sectionsCompleted: number
    quizzesTaken: number
    averageScore: number
  }> {
    const stats = []
    const now = new Date()
    
    for (let i = 0; i < days; i++) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      
      const nextDay = new Date(date)
      nextDay.setDate(nextDay.getDate() + 1)
      
      const daySessions = this.sessions.filter(session => {
        const sessionDate = session.startTime
        return sessionDate >= date && sessionDate < nextDay
      })
      
      const timeSpent = daySessions.reduce((sum, session) => sum + session.timeSpent, 0)
      const sectionsCompleted = new Set()
      const quizScores: number[] = []
      
      daySessions.forEach(session => {
        session.sectionsCompleted.forEach(section => sectionsCompleted.add(section))
        Object.values(session.quizScores).forEach(score => quizScores.push(score))
      })
      
      const averageScore = quizScores.length > 0 
        ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length 
        : 0
      
      stats.push({
        date,
        timeSpent,
        sectionsCompleted: sectionsCompleted.size,
        quizzesTaken: quizScores.length,
        averageScore
      })
    }
    
    return stats.reverse()
  }

  /**
   * Obtiene recomendaciones personalizadas
   */
  getRecommendations(): string[] {
    const metrics = this.getProgressMetrics()
    const recommendations = []

    // Recomendaciones basadas en tiempo
    if (metrics.averageSessionTime < 15) {
      recommendations.push('Intenta estudiar por períodos más largos (20-30 min) para mejor retención')
    } else if (metrics.averageSessionTime > 60) {
      recommendations.push('Considera tomar descansos más frecuentes para mantener la concentración')
    }

    // Recomendaciones basadas en quiz scores
    if (metrics.quizAverageScore < 70) {
      recommendations.push('Repasa los conceptos fundamentales antes de avanzar')
    } else if (metrics.quizAverageScore > 85) {
      recommendations.push('¡Excelente! Estás listo para contenido más avanzado')
    }

    // Recomendaciones basadas en completión
    if (metrics.completionRate < 50) {
      recommendations.push('Enfócate en completar las secciones básicas primero')
    }

    // Recomendaciones basadas en streak
    if (metrics.streakDays === 0) {
      recommendations.push('Intenta estudiar un poco cada día para crear un hábito')
    } else if (metrics.streakDays >= 7) {
      recommendations.push('¡Increíble racha! Mantén la consistencia')
    }

    // Recomendaciones basadas en última actividad
    const daysSinceLastActivity = Math.floor(
      (Date.now() - metrics.lastActivityDate.getTime()) / (1000 * 60 * 60 * 24)
    )
    
    if (daysSinceLastActivity > 3) {
      recommendations.push('Has estado ausente por un tiempo. ¡Retoma donde lo dejaste!')
    }

    return recommendations
  }

  private calculateSessionTime(session: LearningSession): number {
    if (!session.endTime) return 0
    return Math.round((session.endTime.getTime() - session.startTime.getTime()) / (1000 * 60))
  }

  private calculateStreakDays(): number {
    if (this.sessions.length === 0) return 0

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    let streak = 0
    let currentDate = new Date(today)
    
    while (true) {
      const nextDay = new Date(currentDate)
      nextDay.setDate(nextDay.getDate() + 1)
      
      const hasActivity = this.sessions.some(session => {
        const sessionDate = new Date(session.startTime)
        sessionDate.setHours(0, 0, 0, 0)
        return sessionDate.getTime() === currentDate.getTime()
      })
      
      if (hasActivity) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }
    
    return streak
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private generateGoalId(): string {
    return `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      const data = {
        sessions: this.sessions,
        goals: this.goals
      }
      localStorage.setItem('learningProgress', JSON.stringify(data))
    }
  }

  private loadFromStorage() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('learningProgress')
      if (stored) {
        try {
          const data = JSON.parse(stored)
          this.sessions = data.sessions?.map((s: any) => ({
            ...s,
            startTime: new Date(s.startTime),
            endTime: s.endTime ? new Date(s.endTime) : undefined
          })) || []
          this.goals = data.goals?.map((g: any) => ({
            ...g,
            targetDate: new Date(g.targetDate),
            milestones: g.milestones?.map((m: any) => ({
              ...m,
              completedAt: m.completedAt ? new Date(m.completedAt) : undefined
            })) || []
          })) || []
        } catch (error) {
          console.warn('Error loading progress from storage:', error)
        }
      }
    }
  }

  /**
   * Exporta el progreso para backup
   */
  exportProgress(): string {
    return JSON.stringify({
      sessions: this.sessions,
      goals: this.goals,
      exported: new Date().toISOString()
    }, null, 2)
  }

  /**
   * Importa progreso desde backup
   */
  importProgress(data: string): boolean {
    try {
      const parsed = JSON.parse(data)
      if (parsed.sessions && parsed.goals) {
        this.sessions = parsed.sessions.map((s: any) => ({
          ...s,
          startTime: new Date(s.startTime),
          endTime: s.endTime ? new Date(s.endTime) : undefined
        }))
        this.goals = parsed.goals.map((g: any) => ({
          ...g,
          targetDate: new Date(g.targetDate),
          milestones: g.milestones?.map((m: any) => ({
            ...m,
            completedAt: m.completedAt ? new Date(m.completedAt) : undefined
          })) || []
        }))
        this.saveToStorage()
        return true
      }
      return false
    } catch (error) {
      console.error('Error importing progress:', error)
      return false
    }
  }
}

// Instancia global del tracker
export const globalProgressTracker = new ProgressTracker()