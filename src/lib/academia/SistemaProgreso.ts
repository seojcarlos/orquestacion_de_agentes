/**
 * Sistema de Progreso de la Academia de Agentes IA
 * 
 * Gestiona el progreso del usuario a través de las 4 semanas del programa,
 * incluyendo ejercicios, logros, estadísticas y persistencia de datos.
 */

export interface EjercicioProgreso {
  id: string
  semana: number
  titulo: string
  tipo: 'concepto' | 'practica' | 'proyecto'
  completado: boolean
  puntuacion?: number
  tiempoInvertido: number
  intentos: number
  fechaCompletado?: Date
  notas?: string
}

export interface LogroAcademia {
  id: string
  titulo: string
  descripcion: string
  icono: string
  categoria: 'progreso' | 'habilidad' | 'tiempo' | 'social' | 'especial'
  puntos: number
  desbloqueado: boolean
  fechaDesbloqueo?: Date
  progreso: number
  maxProgreso: number
  requisitos: string[]
  rareza: 'comun' | 'poco_comun' | 'raro' | 'epico' | 'legendario'
}

export interface EstadisticasAcademia {
  nivel: number
  experiencia: number
  experienciaSiguienteNivel: number
  puntosTotal: number
  semanasCompletadas: number
  ejerciciosCompletados: number
  tiempoTotal: number
  rachaActual: number
  mejorRacha: number
  fechaUltimaActividad: Date
  promedioCalificaciones: number
  totalIntentos: number
}

export interface ProgresoSemana {
  numero: number
  titulo: string
  completada: boolean
  porcentajeProgreso: number
  ejercicios: EjercicioProgreso[]
  tiempoTotal: number
  fechaInicio?: Date
  fechaCompletado?: Date
  bloqueada: boolean
}

export interface ProgresoUsuario {
  userId: string
  fechaRegistro: Date
  ultimaActividad: Date
  semanas: ProgresoSemana[]
  logros: LogroAcademia[]
  estadisticas: EstadisticasAcademia
  configuracion: {
    notificaciones: boolean
    recordatorios: boolean
    tema: 'oscuro' | 'claro'
    dificultad: 'principiante' | 'intermedio' | 'avanzado'
  }
}

export class SistemaProgreso {
  private readonly STORAGE_KEY = 'academia-progreso'
  private readonly LOGROS_PREDEFINIDOS: Omit<LogroAcademia, 'desbloqueado' | 'fechaDesbloqueo' | 'progreso'>[] = [
    {
      id: 'primer-ejercicio',
      titulo: 'Primeros Pasos',
      descripcion: 'Completa tu primer ejercicio',
      icono: 'target',
      categoria: 'progreso',
      puntos: 50,
      maxProgreso: 1,
      requisitos: ['Completar cualquier ejercicio'],
      rareza: 'comun'
    },
    {
      id: 'primera-semana',
      titulo: 'Fundamentos Sólidos',
      descripcion: 'Completa la Semana 1: Agente Básico',
      icono: 'star',
      categoria: 'progreso',
      puntos: 200,
      maxProgreso: 1,
      requisitos: ['Completar todos los ejercicios de la Semana 1'],
      rareza: 'poco_comun'
    },
    {
      id: 'velocista',
      titulo: 'Velocista',
      descripcion: 'Completa 5 ejercicios en un día',
      icono: 'zap',
      categoria: 'tiempo',
      puntos: 150,
      maxProgreso: 5,
      requisitos: ['Completar 5 ejercicios en 24 horas'],
      rareza: 'raro'
    },
    {
      id: 'perfeccionista',
      titulo: 'Perfeccionista',
      descripcion: 'Obtén 100% en 3 ejercicios consecutivos',
      icono: 'trophy',
      categoria: 'habilidad',
      puntos: 300,
      maxProgreso: 3,
      requisitos: ['Puntuación perfecta en ejercicios consecutivos'],
      rareza: 'epico'
    },
    {
      id: 'maratonista',
      titulo: 'Maratonista',
      descripcion: 'Estudia durante más de 10 horas en total',
      icono: 'clock',
      categoria: 'tiempo',
      puntos: 250,
      maxProgreso: 600, // 10 horas en minutos
      requisitos: ['Acumular 10 horas de estudio'],
      rareza: 'raro'
    },
    {
      id: 'constancia',
      titulo: 'Constancia',
      descripcion: 'Mantén una racha de 7 días',
      icono: 'zap',
      categoria: 'tiempo',
      puntos: 400,
      maxProgreso: 7,
      requisitos: ['Actividad diaria durante 7 días consecutivos'],
      rareza: 'epico'
    },
    {
      id: 'maestro-agentes',
      titulo: 'Maestro de Agentes',
      descripcion: 'Completa todas las 4 semanas',
      icono: 'brain',
      categoria: 'progreso',
      puntos: 1000,
      maxProgreso: 4,
      requisitos: ['Completar las 4 semanas del programa'],
      rareza: 'legendario'
    }
  ]

  private progreso: ProgresoUsuario

  constructor(userId: string = 'default') {
    this.progreso = this.cargarProgreso(userId)
    this.inicializarLogros()
  }

  private cargarProgreso(userId: string): ProgresoUsuario {
    if (typeof window === 'undefined') {
      return this.crearProgresoInicial(userId)
    }

    const progresoGuardado = localStorage.getItem(`${this.STORAGE_KEY}-${userId}`)
    
    if (progresoGuardado) {
      try {
        const progreso = JSON.parse(progresoGuardado)
        // Convertir fechas de string a Date
        progreso.fechaRegistro = new Date(progreso.fechaRegistro)
        progreso.ultimaActividad = new Date(progreso.ultimaActividad)
        progreso.estadisticas.fechaUltimaActividad = new Date(progreso.estadisticas.fechaUltimaActividad)
        
        progreso.semanas.forEach((semana: ProgresoSemana) => {
          if (semana.fechaInicio) semana.fechaInicio = new Date(semana.fechaInicio)
          if (semana.fechaCompletado) semana.fechaCompletado = new Date(semana.fechaCompletado)
          
          semana.ejercicios.forEach((ejercicio: EjercicioProgreso) => {
            if (ejercicio.fechaCompletado) {
              ejercicio.fechaCompletado = new Date(ejercicio.fechaCompletado)
            }
          })
        })

        progreso.logros.forEach((logro: LogroAcademia) => {
          if (logro.fechaDesbloqueo) {
            logro.fechaDesbloqueo = new Date(logro.fechaDesbloqueo)
          }
        })

        return progreso
      } catch (error) {
        console.error('Error cargando progreso:', error)
        return this.crearProgresoInicial(userId)
      }
    }

    return this.crearProgresoInicial(userId)
  }

  private crearProgresoInicial(userId: string): ProgresoUsuario {
    const ahora = new Date()
    
    return {
      userId,
      fechaRegistro: ahora,
      ultimaActividad: ahora,
      semanas: this.crearSemanasIniciales(),
      logros: [],
      estadisticas: {
        nivel: 1,
        experiencia: 0,
        experienciaSiguienteNivel: 1000,
        puntosTotal: 0,
        semanasCompletadas: 0,
        ejerciciosCompletados: 0,
        tiempoTotal: 0,
        rachaActual: 0,
        mejorRacha: 0,
        fechaUltimaActividad: ahora,
        promedioCalificaciones: 0,
        totalIntentos: 0
      },
      configuracion: {
        notificaciones: true,
        recordatorios: true,
        tema: 'oscuro',
        dificultad: 'principiante'
      }
    }
  }

  private crearSemanasIniciales(): ProgresoSemana[] {
    const semanas = [
      {
        numero: 1,
        titulo: 'Agente Básico',
        ejercicios: [
          { id: 'concepto-agentes', titulo: 'Qué es un Agente IA', tipo: 'concepto' as const },
          { id: 'arquitectura-basica', titulo: 'Arquitectura Básica', tipo: 'concepto' as const },
          { id: 'primer-agente', titulo: 'Primer Agente Simple', tipo: 'practica' as const },
          { id: 'sistema-memoria', titulo: 'Sistema de Memoria', tipo: 'practica' as const },
          { id: 'chatbot-personal', titulo: 'Chatbot Personal', tipo: 'proyecto' as const }
        ]
      },
      {
        numero: 2,
        titulo: 'Agente con Memoria',
        ejercicios: [
          { id: 'persistencia-datos', titulo: 'Persistencia de Datos', tipo: 'concepto' as const },
          { id: 'sqlite-basico', titulo: 'SQLite Básico', tipo: 'practica' as const },
          { id: 'memoria-agente', titulo: 'Implementar Memoria', tipo: 'practica' as const },
          { id: 'contexto-conversacion', titulo: 'Contexto de Conversación', tipo: 'practica' as const },
          { id: 'agente-persistente', titulo: 'Agente Persistente', tipo: 'proyecto' as const }
        ]
      },
      {
        numero: 3,
        titulo: 'Sistema Multi-Agente',
        ejercicios: [
          { id: 'comunicacion-agentes', titulo: 'Comunicación entre Agentes', tipo: 'concepto' as const },
          { id: 'coordinador', titulo: 'Agente Coordinador', tipo: 'practica' as const },
          { id: 'especializacion', titulo: 'Agentes Especializados', tipo: 'practica' as const },
          { id: 'workflow-agentes', titulo: 'Workflow de Agentes', tipo: 'practica' as const },
          { id: 'sistema-completo', titulo: 'Sistema Multi-Agente', tipo: 'proyecto' as const }
        ]
      },
      {
        numero: 4,
        titulo: 'Integración Claude Flow',
        ejercicios: [
          { id: 'claude-flow-intro', titulo: 'Introducción a Claude Flow', tipo: 'concepto' as const },
          { id: 'integracion-api', titulo: 'Integración con API', tipo: 'practica' as const },
          { id: 'prompts-avanzados', titulo: 'Prompts Avanzados', tipo: 'practica' as const },
          { id: 'deployment', titulo: 'Deployment en Producción', tipo: 'practica' as const },
          { id: 'agente-production', titulo: 'Agente de Producción', tipo: 'proyecto' as const }
        ]
      }
    ]

    return semanas.map((semana, index) => ({
      numero: semana.numero,
      titulo: semana.titulo,
      completada: false,
      porcentajeProgreso: 0,
      ejercicios: semana.ejercicios.map(ej => ({
        id: ej.id,
        semana: semana.numero,
        titulo: ej.titulo,
        tipo: ej.tipo,
        completado: false,
        tiempoInvertido: 0,
        intentos: 0
      })),
      tiempoTotal: 0,
      bloqueada: index > 0 // Solo la primera semana está desbloqueada inicialmente
    }))
  }

  private inicializarLogros(): void {
    // Crear logros si no existen
    const logrosExistentes = new Set(this.progreso.logros.map(l => l.id))
    
    this.LOGROS_PREDEFINIDOS.forEach(logroPredefinido => {
      if (!logrosExistentes.has(logroPredefinido.id)) {
        const logro: LogroAcademia = {
          ...logroPredefinido,
          desbloqueado: false,
          progreso: 0
        }
        this.progreso.logros.push(logro)
      }
    })
  }

  private guardarProgreso(): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(
        `${this.STORAGE_KEY}-${this.progreso.userId}`,
        JSON.stringify(this.progreso)
      )
    } catch (error) {
      console.error('Error guardando progreso:', error)
    }
  }

  private actualizarRacha(): void {
    const ahora = new Date()
    const ultimaActividad = this.progreso.estadisticas.fechaUltimaActividad
    const diferenciaDias = Math.floor((ahora.getTime() - ultimaActividad.getTime()) / (1000 * 60 * 60 * 24))

    if (diferenciaDias === 1) {
      // Continuar racha
      this.progreso.estadisticas.rachaActual++
    } else if (diferenciaDias > 1) {
      // Romper racha
      this.progreso.estadisticas.rachaActual = 1
    }
    // Si es el mismo día, no cambiar la racha

    // Actualizar mejor racha
    if (this.progreso.estadisticas.rachaActual > this.progreso.estadisticas.mejorRacha) {
      this.progreso.estadisticas.mejorRacha = this.progreso.estadisticas.rachaActual
    }

    this.progreso.estadisticas.fechaUltimaActividad = ahora
    this.progreso.ultimaActividad = ahora
  }

  private actualizarNivel(): void {
    const { experiencia, experienciaSiguienteNivel, nivel } = this.progreso.estadisticas

    if (experiencia >= experienciaSiguienteNivel) {
      this.progreso.estadisticas.nivel = nivel + 1
      this.progreso.estadisticas.experiencia = experiencia - experienciaSiguienteNivel
      this.progreso.estadisticas.experienciaSiguienteNivel = (nivel + 1) * 1000 // Aumentar requisitos
    }
  }

  private verificarLogros(): LogroAcademia[] {
    const logrosDesbloqueados: LogroAcademia[] = []

    this.progreso.logros.forEach(logro => {
      if (logro.desbloqueado) return

      let progresoCumplido = false

      switch (logro.id) {
        case 'primer-ejercicio':
          logro.progreso = this.progreso.estadisticas.ejerciciosCompletados
          progresoCumplido = logro.progreso >= 1
          break

        case 'primera-semana':
          logro.progreso = this.progreso.estadisticas.semanasCompletadas
          progresoCumplido = logro.progreso >= 1
          break

        case 'velocista':
          // Verificar ejercicios completados hoy
          const hoy = new Date()
          const ejerciciosHoy = this.progreso.semanas
            .flatMap(s => s.ejercicios)
            .filter(e => 
              e.completado && 
              e.fechaCompletado &&
              e.fechaCompletado.toDateString() === hoy.toDateString()
            ).length
          logro.progreso = ejerciciosHoy
          progresoCumplido = ejerciciosHoy >= 5
          break

        case 'perfeccionista':
          // Verificar puntuaciones perfectas consecutivas
          const ejerciciosOrdenados = this.progreso.semanas
            .flatMap(s => s.ejercicios)
            .filter(e => e.completado && e.puntuacion !== undefined)
            .sort((a, b) => (a.fechaCompletado?.getTime() || 0) - (b.fechaCompletado?.getTime() || 0))
          
          let consecutivos = 0
          let maxConsecutivos = 0
          
          ejerciciosOrdenados.forEach(ejercicio => {
            if (ejercicio.puntuacion === 100) {
              consecutivos++
              maxConsecutivos = Math.max(maxConsecutivos, consecutivos)
            } else {
              consecutivos = 0
            }
          })
          
          logro.progreso = maxConsecutivos
          progresoCumplido = maxConsecutivos >= 3
          break

        case 'maratonista':
          logro.progreso = this.progreso.estadisticas.tiempoTotal
          progresoCumplido = logro.progreso >= 600 // 10 horas
          break

        case 'constancia':
          logro.progreso = this.progreso.estadisticas.rachaActual
          progresoCumplido = logro.progreso >= 7
          break

        case 'maestro-agentes':
          logro.progreso = this.progreso.estadisticas.semanasCompletadas
          progresoCumplido = logro.progreso >= 4
          break
      }

      if (progresoCumplido && !logro.desbloqueado) {
        logro.desbloqueado = true
        logro.fechaDesbloqueo = new Date()
        this.progreso.estadisticas.puntosTotal += logro.puntos
        this.progreso.estadisticas.experiencia += logro.puntos * 2
        logrosDesbloqueados.push(logro)
      }
    })

    return logrosDesbloqueados
  }

  private actualizarProgresioSemanas(): void {
    this.progreso.semanas.forEach((semana, index) => {
      const ejerciciosCompletados = semana.ejercicios.filter(e => e.completado).length
      const totalEjercicios = semana.ejercicios.length
      
      semana.porcentajeProgreso = totalEjercicios > 0 
        ? (ejerciciosCompletados / totalEjercicios) * 100 
        : 0
      
      semana.tiempoTotal = semana.ejercicios.reduce((acc, e) => acc + e.tiempoInvertido, 0)
      
      // Marcar como completada si todos los ejercicios están hechos
      if (ejerciciosCompletados === totalEjercicios && totalEjercicios > 0) {
        if (!semana.completada) {
          semana.completada = true
          semana.fechaCompletado = new Date()
          this.progreso.estadisticas.semanasCompletadas++
          
          // Desbloquear siguiente semana
          if (index + 1 < this.progreso.semanas.length) {
            this.progreso.semanas[index + 1].bloqueada = false
          }
        }
      }
    })
  }

  // Métodos públicos
  public completarEjercicio(
    semana: number, 
    ejercicioId: string, 
    puntuacion: number = 100, 
    tiempoInvertido: number = 0
  ): { logrosDesbloqueados: LogroAcademia[] } {
    this.actualizarRacha()

    const semanaObj = this.progreso.semanas.find(s => s.numero === semana)
    if (!semanaObj) throw new Error(`Semana ${semana} no encontrada`)

    const ejercicio = semanaObj.ejercicios.find(e => e.id === ejercicioId)
    if (!ejercicio) throw new Error(`Ejercicio ${ejercicioId} no encontrado`)

    if (!ejercicio.completado) {
      ejercicio.completado = true
      ejercicio.fechaCompletado = new Date()
      this.progreso.estadisticas.ejerciciosCompletados++
    }

    ejercicio.puntuacion = puntuacion
    ejercicio.tiempoInvertido += tiempoInvertido
    ejercicio.intentos++

    // Actualizar estadísticas globales
    this.progreso.estadisticas.tiempoTotal += tiempoInvertido
    this.progreso.estadisticas.totalIntentos++
    this.progreso.estadisticas.experiencia += Math.floor(puntuacion * 2)

    // Calcular promedio de calificaciones
    const ejerciciosConPuntuacion = this.progreso.semanas
      .flatMap(s => s.ejercicios)
      .filter(e => e.completado && e.puntuacion !== undefined)
    
    if (ejerciciosConPuntuacion.length > 0) {
      this.progreso.estadisticas.promedioCalificaciones = 
        ejerciciosConPuntuacion.reduce((acc, e) => acc + (e.puntuacion || 0), 0) / ejerciciosConPuntuacion.length
    }

    this.actualizarProgresioSemanas()
    this.actualizarNivel()
    const logrosDesbloqueados = this.verificarLogros()

    this.guardarProgreso()

    return { logrosDesbloqueados }
  }

  public obtenerProgreso(): ProgresoUsuario {
    return { ...this.progreso }
  }

  public obtenerEstadisticas(): EstadisticasAcademia {
    return { ...this.progreso.estadisticas }
  }

  public obtenerSemana(numero: number): ProgresoSemana | undefined {
    return this.progreso.semanas.find(s => s.numero === numero)
  }

  public obtenerLogros(): LogroAcademia[] {
    return [...this.progreso.logros]
  }

  public reiniciarProgreso(): void {
    this.progreso = this.crearProgresoInicial(this.progreso.userId)
    this.inicializarLogros()
    this.guardarProgreso()
  }

  public exportarProgreso(): string {
    return JSON.stringify(this.progreso, null, 2)
  }

  public importarProgreso(data: string): boolean {
    try {
      const progreso = JSON.parse(data)
      // Validar estructura básica
      if (progreso.userId && progreso.semanas && progreso.logros && progreso.estadisticas) {
        this.progreso = progreso
        this.guardarProgreso()
        return true
      }
      return false
    } catch (error) {
      console.error('Error importando progreso:', error)
      return false
    }
  }

  public actualizarConfiguracion(config: Partial<ProgresoUsuario['configuracion']>): void {
    this.progreso.configuracion = { ...this.progreso.configuracion, ...config }
    this.guardarProgreso()
  }
}