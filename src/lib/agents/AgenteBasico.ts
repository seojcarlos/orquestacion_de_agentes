/**
 * Agente Básico - Semana 1 de Academia de Agentes IA
 * 
 * Este es el primer agente que los estudiantes aprenden a construir.
 * Implementa los conceptos fundamentales sin frameworks externos.
 */

export interface MensajeConversacion {
  id: string
  contenido: string
  tipo: 'usuario' | 'agente'
  timestamp: Date
  contexto?: any
}

export interface PatronRespuesta {
  patron: RegExp[]
  respuestas: string[]
  accion?: (entrada: string) => string
  prioridad: number
}

export interface ConfiguracionAgente {
  nombre: string
  personalidad: string
  limiteMensajes: number
  usarContexto: boolean
}

export class AgenteBasico {
  private memoria: MensajeConversacion[] = []
  private patrones: PatronRespuesta[] = []
  private config: ConfiguracionAgente
  private contextoActual: string = ''
  private estadisticas = {
    mensajesProcesados: 0,
    patronesCoincididos: 0,
    conversacionesActivas: 0
  }

  constructor(config?: Partial<ConfiguracionAgente>) {
    this.config = {
      nombre: 'AgenteBasico',
      personalidad: 'amigable y servicial',
      limiteMensajes: 50,
      usarContexto: true,
      ...config
    }

    this.inicializarPatrones()
  }

  private inicializarPatrones(): void {
    this.patrones = [
      // Saludos
      {
        patron: [/^(hola|hey|buenos|buenas)/i, /salud/i],
        respuestas: [
          `¡Hola! Soy ${this.config.nombre}, tu asistente IA. ¿En qué puedo ayudarte?`,
          '¡Hola! Me alegra conocerte. ¿Qué te gustaría saber?',
          '¡Saludos! Estoy aquí para ayudarte con lo que necesites.'
        ],
        prioridad: 10
      },

      // Preguntas sobre identidad
      {
        patron: [/quien eres|que eres|tu nombre/i],
        respuestas: [
          `Soy ${this.config.nombre}, un agente de IA ${this.config.personalidad}. ` +
          'Estoy aquí para ayudarte y aprender de nuestras conversaciones.',
          `Me llamo ${this.config.nombre}. Soy un agente básico construido como ejemplo ` +
          'de la Academia de Agentes IA.'
        ],
        prioridad: 9
      },

      // Preguntas
      {
        patron: [/^(qué|que|cómo|como|cuándo|cuando|dónde|donde|por qué|porque)/i],
        respuestas: [
          'Esa es una excelente pregunta. Basándome en mi conocimiento, te puedo decir que...',
          'Interesante pregunta. Déjame pensar en la mejor forma de explicarlo...',
          'Me gusta que preguntes. La respuesta depende de varios factores...'
        ],
        accion: (entrada: string) => {
          const palabra = entrada.match(/^(qué|que|cómo|como|cuándo|cuando|dónde|donde|por qué|porque)/i)?.[0]
          return ` Has preguntado "${palabra}" - esto sugiere que buscas información específica.`
        },
        prioridad: 7
      },

      // Emociones positivas
      {
        patron: [/(gracias|thanks|genial|excelente|perfecto|bien)/i],
        respuestas: [
          '¡Me alegra poder ayudarte! ¿Hay algo más en lo que pueda asistirte?',
          '¡De nada! Es un placer ser útil. ¿Continuamos?',
          '¡Genial! Me gusta saber que estoy siendo de ayuda.'
        ],
        prioridad: 8
      },

      // Despedidas
      {
        patron: [/(adiós|adios|chao|hasta luego|bye|nos vemos)/i],
        respuestas: [
          '¡Hasta luego! Ha sido un placer conversar contigo.',
          '¡Adiós! Espero haber sido de ayuda. ¡Vuelve pronto!',
          '¡Nos vemos! Que tengas un excelente día.'
        ],
        prioridad: 10
      },

      // Ayuda
      {
        patron: [/(ayuda|help|no entiendo|no se|auxilio)/i],
        respuestas: [
          'Por supuesto, estoy aquí para ayudarte. ¿Puedes ser más específico sobre lo que necesitas?',
          'No hay problema, todos necesitamos ayuda a veces. ¿Qué es lo que te confunde?',
          'Claro, te ayudo. ¿Puedes explicarme mejor qué es lo que buscas?'
        ],
        prioridad: 9
      }
    ]
  }

  /**
   * Procesa un mensaje del usuario y genera una respuesta
   */
  public async procesar(entrada: string): Promise<string> {
    try {
      // Limpiar y validar entrada
      const entradaLimpia = this.limpiarEntrada(entrada)
      if (!entradaLimpia) {
        return 'No he recibido ningún mensaje. ¿Podrías repetirlo?'
      }

      // Registrar mensaje del usuario
      this.agregarAMemoria(entradaLimpia, 'usuario')

      // Actualizar contexto
      if (this.config.usarContexto) {
        this.actualizarContexto(entradaLimpia)
      }

      // Buscar patrón coincidente
      const respuesta = this.buscarPatronCoincidente(entradaLimpia)

      // Registrar respuesta del agente
      this.agregarAMemoria(respuesta, 'agente')

      // Actualizar estadísticas
      this.estadisticas.mensajesProcesados++

      return respuesta

    } catch (error) {
      console.error('Error procesando mensaje:', error)
      return 'Lo siento, he tenido un error interno. ¿Podrías intentar de nuevo?'
    }
  }

  private limpiarEntrada(entrada: string): string {
    return entrada.trim().replace(/\s+/g, ' ')
  }

  private buscarPatronCoincidente(entrada: string): string {
    // Ordenar patrones por prioridad
    const patronesOrdenados = [...this.patrones].sort((a, b) => b.prioridad - a.prioridad)

    for (const patron of patronesOrdenados) {
      if (patron.patron.some(p => p.test(entrada))) {
        this.estadisticas.patronesCoincididos++
        
        // Seleccionar respuesta aleatoria
        const respuestaBase = patron.respuestas[Math.floor(Math.random() * patron.respuestas.length)]
        
        // Aplicar acción personalizada si existe
        const accionExtra = patron.accion ? patron.accion(entrada) : ''
        
        return respuestaBase + accionExtra
      }
    }

    // Respuesta por defecto con contexto
    return this.generarRespuestaDefault(entrada)
  }

  private generarRespuestaDefault(entrada: string): string {
    const respuestasDefault = [
      'Interesante. Cuéntame más sobre eso.',
      'No estoy seguro de cómo responder a eso, pero me gustaría aprender más.',
      'Esa es una perspectiva única. ¿Podrías elaborar?',
      'Hmm, eso es algo nuevo para mí. ¿Puedes darme más detalles?'
    ]

    let respuesta = respuestasDefault[Math.floor(Math.random() * respuestasDefault.length)]

    // Añadir contexto si está disponible
    if (this.contextoActual && this.config.usarContexto) {
      respuesta += ` Por cierto, recuerdo que estábamos hablando de ${this.contextoActual}.`
    }

    return respuesta
  }

  private agregarAMemoria(contenido: string, tipo: 'usuario' | 'agente'): void {
    const mensaje: MensajeConversacion = {
      id: Math.random().toString(36).substr(2, 9),
      contenido,
      tipo,
      timestamp: new Date(),
      contexto: this.contextoActual
    }

    this.memoria.push(mensaje)

    // Limitar memoria si es necesario
    if (this.memoria.length > this.config.limiteMensajes) {
      this.memoria.shift()
    }
  }

  private actualizarContexto(entrada: string): void {
    // Extraer palabras clave para contexto
    const palabrasClave = entrada.toLowerCase()
      .split(' ')
      .filter(palabra => palabra.length > 3)
      .filter(palabra => !['esto', 'eso', 'aquí', 'ahí', 'entonces', 'porque'].includes(palabra))

    if (palabrasClave.length > 0) {
      this.contextoActual = palabrasClave[0]
    }
  }

  /**
   * Métodos públicos para interactuar con el agente
   */
  
  public obtenerMemoria(): MensajeConversacion[] {
    return [...this.memoria]
  }

  public obtenerEstadisticas() {
    return {
      ...this.estadisticas,
      mensajesEnMemoria: this.memoria.length,
      contextoActual: this.contextoActual,
      configuracion: this.config
    }
  }

  public limpiarMemoria(): void {
    this.memoria = []
    this.contextoActual = ''
  }

  public agregarPatronPersonalizado(patron: PatronRespuesta): void {
    this.patrones.push(patron)
  }

  public obtenerUltimosMensajes(cantidad: number = 5): MensajeConversacion[] {
    return this.memoria.slice(-cantidad)
  }

  /**
   * Método para exportar el estado del agente (útil para debugging)
   */
  public exportarEstado() {
    return {
      memoria: this.memoria,
      patrones: this.patrones.length,
      contexto: this.contextoActual,
      estadisticas: this.estadisticas,
      config: this.config
    }
  }

  /**
   * Método para evaluar la calidad de la conversación
   */
  public evaluarConversacion(): { puntuacion: number; feedback: string } {
    const mensajesUsuario = this.memoria.filter(m => m.tipo === 'usuario').length
    const mensajesAgente = this.memoria.filter(m => m.tipo === 'agente').length
    const proporcionPatrones = this.estadisticas.patronesCoincididos / this.estadisticas.mensajesProcesados

    let puntuacion = 0
    let feedback = ''

    // Evaluar longitud de conversación
    if (mensajesUsuario >= 3) puntuacion += 30
    else if (mensajesUsuario >= 1) puntuacion += 15

    // Evaluar proporción de patrones reconocidos
    if (proporcionPatrones >= 0.7) puntuacion += 40
    else if (proporcionPatrones >= 0.4) puntuacion += 25
    else puntuacion += 10

    // Evaluar uso de contexto
    if (this.contextoActual) puntuacion += 20

    // Evaluar equilibrio en la conversación
    const equilibrio = Math.abs(mensajesUsuario - mensajesAgente) / Math.max(mensajesUsuario, mensajesAgente)
    if (equilibrio <= 0.2) puntuacion += 10

    // Generar feedback
    if (puntuacion >= 80) feedback = 'Excelente conversación! El agente está funcionando muy bien.'
    else if (puntuacion >= 60) feedback = 'Buena conversación. Hay margen de mejora en el reconocimiento de patrones.'
    else if (puntuacion >= 40) feedback = 'Conversación básica. Considera añadir más patrones o mejorar el contexto.'
    else feedback = 'La conversación necesita mejoras significativas.'

    return { puntuacion, feedback }
  }
}