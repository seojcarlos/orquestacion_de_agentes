'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Brain, MessageSquare, Zap, Target, Code, ChevronRight, ChevronDown, ExternalLink, Lightbulb } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export default function ARTTool() {
  const [seccionAbierta, setSeccionAbierta] = useState<string | null>('que-es');

  const secciones = [
    {
      id: 'que-es',
      titulo: '🤖 ¿Qué es ART?',
      contenido: (
        <div className="space-y-4">
          <p>
            <strong>ART = Alignment Research Tool</strong> (Herramienta de Investigación de Alineación)
          </p>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">En palabras simples:</h4>
            <p className="text-sm">
              Es una herramienta que ayuda a hacer que las IAs respondan mejor y de forma más segura.
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">¿Qué problema resuelve?</h4>
            <p className="text-sm mb-3">
              A veces las IAs pueden dar respuestas que son:
            </p>
            <ul className="text-sm space-y-1">
              <li>❌ Incorrectas o inventadas</li>
              <li>❌ Peligrosas o dañinas</li>
              <li>❌ Sesgadas o injustas</li>
              <li>❌ Difíciles de entender</li>
            </ul>
            <p className="text-sm mt-3">
              ART ayuda a detectar y mejorar estos problemas.
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Analogía simple:</h4>
            <p className="text-sm">
              Si la IA fuera un estudiante:
            </p>
            <ul className="text-sm mt-2 space-y-1">
              <li>• ART es como un <strong>profesor</strong> que revisa sus respuestas</li>
              <li>• Detecta errores y sugiere mejoras</li>
              <li>• Ayuda a que aprenda a responder mejor</li>
              <li>• Verifica que sea seguro y confiable</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'como-funciona',
      titulo: '⚙️ ¿Cómo funciona?',
      contenido: (
        <div className="space-y-4">
          <p>ART funciona en varios pasos. Te lo explico como un proceso:</p>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">Proceso paso a paso:</h4>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                  <div>
                    <strong>Usuario hace una pregunta</strong>
                    <p className="text-sm text-gray-600">Ejemplo: "¿Cómo hago una bomba?"</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                  <div>
                    <strong>La IA genera una respuesta</strong>
                    <p className="text-sm text-gray-600">Podría ser peligrosa o incorrecta</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                  <div>
                    <strong>ART analiza la respuesta</strong>
                    <p className="text-sm text-gray-600">Busca problemas: ¿Es segura? ¿Es correcta? ¿Es útil?</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
                  <div>
                    <strong>ART sugiere mejoras</strong>
                    <p className="text-sm text-gray-600">Propone cambios para hacer la respuesta mejor</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">5</div>
                  <div>
                    <strong>Se genera respuesta mejorada</strong>
                    <p className="text-sm text-gray-600">Más segura, precisa y útil</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">🔍 Tipos de análisis que hace:</h4>
            <ul className="text-sm space-y-2">
              <li>
                <strong>Seguridad:</strong> ¿La respuesta podría causar daño?
              </li>
              <li>
                <strong>Veracidad:</strong> ¿La información es correcta?
              </li>
              <li>
                <strong>Utilidad:</strong> ¿Realmente ayuda al usuario?
              </li>
              <li>
                <strong>Claridad:</strong> ¿Es fácil de entender?
              </li>
              <li>
                <strong>Sesgo:</strong> ¿Es justa con todos los grupos?
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'tecnologias',
      titulo: '🛠️ Tecnologías que usa',
      contenido: (
        <div className="space-y-4">
          <p>ART usa varias tecnologías modernas. Te explico cada una:</p>

          <div className="space-y-3">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-purple-600" />
                LangChain
              </h4>
              <p className="text-sm text-gray-600">
                <strong>¿Qué es?</strong> Una librería para trabajar con IAs grandes (como GPT-4)
              </p>
              <p className="text-sm mt-2">
                <strong>Analogía:</strong> Es como un "traductor" entre tu código y la IA. 
                Le dices qué quieres en Python y él habla con la IA por ti.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Modelos de Lenguaje (LLMs)
              </h4>
              <p className="text-sm text-gray-600">
                <strong>¿Qué son?</strong> IAs entrenadas con millones de textos
              </p>
              <p className="text-sm mt-2">
                <strong>Ejemplos:</strong> GPT-4, Claude, LLaMA, Gemini
              </p>
              <p className="text-sm mt-1">
                <strong>¿Para qué?</strong> Generan y analizan texto como humanos
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                FastAPI
              </h4>
              <p className="text-sm text-gray-600">
                <strong>¿Qué es?</strong> Framework para crear APIs en Python
              </p>
              <p className="text-sm mt-2">
                <strong>Analogía:</strong> Es como un "mesero" que recibe pedidos (requests) 
                y trae respuestas de la cocina (tu código).
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-green-600" />
                Evaluadores personalizados
              </h4>
              <p className="text-sm text-gray-600">
                <strong>¿Qué son?</strong> Código que revisa las respuestas de la IA
              </p>
              <p className="text-sm mt-2">
                <strong>Ejemplo:</strong> Un evaluador podría verificar si una respuesta 
                menciona información médica peligrosa.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'codigo-explicado',
      titulo: '💻 Código explicado para principiantes',
      contenido: (
        <div className="space-y-4">
          <p>Veamos ejemplos de código súper simplificados:</p>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">1. Conectar con la IA:</h4>
              <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm overflow-x-auto">
{`# Importamos la librería
from langchain import OpenAI

# Creamos conexión con la IA
ia = OpenAI(api_key="tu-clave-secreta")

# Le hacemos una pregunta
respuesta = ia.predict("¿Cuál es la capital de Francia?")

print(respuesta)  # Imprime: "París"`}
              </pre>
              <p className="text-sm text-gray-600 mt-2">
                Es como tener el WhatsApp de la IA: le mandas mensaje y te responde.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">2. Crear un evaluador de seguridad:</h4>
              <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm overflow-x-auto">
{`def es_respuesta_segura(texto):
    # Lista de palabras peligrosas
    palabras_peligrosas = ["bomba", "veneno", "arma"]
    
    # Verificamos si contiene algo peligroso
    for palabra in palabras_peligrosas:
        if palabra in texto.lower():
            return False  # No es segura
    
    return True  # Es segura

# Ejemplo de uso
respuesta1 = "París es la capital de Francia"
respuesta2 = "Para hacer una bomba necesitas..."

print(es_respuesta_segura(respuesta1))  # True (segura)
print(es_respuesta_segura(respuesta2))  # False (peligrosa)`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">3. Mejorar una respuesta:</h4>
              <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm overflow-x-auto">
{`def mejorar_respuesta(respuesta_original):
    # Si la respuesta es peligrosa
    if not es_respuesta_segura(respuesta_original):
        return "Lo siento, no puedo ayudar con eso."
    
    # Si es muy corta, pedimos más detalles
    if len(respuesta_original) < 20:
        return respuesta_original + " ¿Necesitas más información?"
    
    # Si está bien, la devolvemos tal cual
    return respuesta_original`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">4. API completa simplificada:</h4>
              <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm overflow-x-auto">
{`from fastapi import FastAPI

app = FastAPI()

@app.post("/analizar")
def analizar_pregunta(pregunta: str):
    # 1. La IA responde
    respuesta = ia.predict(pregunta)
    
    # 2. Analizamos la respuesta
    es_segura = es_respuesta_segura(respuesta)
    
    # 3. La mejoramos si es necesario
    respuesta_final = mejorar_respuesta(respuesta)
    
    # 4. Devolvemos el resultado
    return {
        "pregunta": pregunta,
        "respuesta_original": respuesta,
        "es_segura": es_segura,
        "respuesta_mejorada": respuesta_final
    }`}
              </pre>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'casos-uso',
      titulo: '💡 Casos de uso reales',
      contenido: (
        <div className="space-y-4">
          <p>¿Dónde se puede usar ART en la vida real?</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">🏥 Salud</h4>
              <p className="text-sm">
                Verificar que las IAs no den consejos médicos peligrosos o incorrectos.
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Ejemplo: Detectar si sugiere medicamentos sin receta médica.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">📚 Educación</h4>
              <p className="text-sm">
                Asegurar que las respuestas sean apropiadas para la edad del estudiante.
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Ejemplo: Filtrar contenido adulto para niños.
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">💼 Empresas</h4>
              <p className="text-sm">
                Garantizar que los chatbots no revelen información confidencial.
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Ejemplo: No compartir datos de clientes.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">⚖️ Legal</h4>
              <p className="text-sm">
                Verificar que las respuestas cumplan con las leyes y regulaciones.
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Ejemplo: No dar consejos legales sin licencia.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">🚨 Por qué es importante:</h4>
            <ul className="text-sm space-y-1">
              <li>• Las IAs pueden "alucinar" (inventar información)</li>
              <li>• Pueden tener sesgos no intencionales</li>
              <li>• A veces dan respuestas peligrosas sin querer</li>
              <li>• Necesitamos que sean confiables y seguras</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'empezar',
      titulo: '🚀 ¿Cómo empiezo con ART?',
      contenido: (
        <div className="space-y-4">
          <p>Pasos para empezar tu propio proyecto de alineación:</p>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Paso 1: Preparar el entorno</h4>
              <pre className="bg-gray-800 text-white p-2 rounded text-sm">
{`# Clonar el proyecto
git clone https://github.com/username/ART.git
cd ART

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\\Scripts\\activate

# Instalar dependencias
pip install -r requirements.txt`}
              </pre>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Paso 2: Configurar API keys</h4>
              <p className="text-sm mb-2">Necesitas claves de API para las IAs:</p>
              <ul className="text-sm space-y-1">
                <li>• OpenAI (GPT-4): <a href="https://platform.openai.com" className="text-blue-600 underline">platform.openai.com</a></li>
                <li>• Anthropic (Claude): <a href="https://console.anthropic.com" className="text-blue-600 underline">console.anthropic.com</a></li>
                <li>• Google (Gemini): <a href="https://makersuite.google.com" className="text-blue-600 underline">makersuite.google.com</a></li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Paso 3: Crear tu primer evaluador</h4>
              <p className="text-sm mb-2">Empieza con algo simple:</p>
              <pre className="bg-gray-800 text-white p-2 rounded text-sm">
{`# mi_evaluador.py
def evaluar_longitud(respuesta):
    if len(respuesta) < 10:
        return "Respuesta muy corta"
    elif len(respuesta) > 500:
        return "Respuesta muy larga"
    else:
        return "Longitud adecuada"`}
              </pre>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Paso 4: Ejecutar el servidor</h4>
              <pre className="bg-gray-800 text-white p-2 rounded text-sm">
{`# Iniciar la API
uvicorn main:app --reload

# La API estará en http://localhost:8000`}
              </pre>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
            <h4 className="font-semibold mb-2">
              <Lightbulb className="inline w-5 h-5 text-yellow-500" /> 
              Ideas para experimentar:
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Detector de fake news</li>
              <li>• Verificador de código seguro</li>
              <li>• Analizador de sentimientos</li>
              <li>• Filtro de contenido apropiado</li>
              <li>• Corrector de sesgos</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <Breadcrumb />
        </div>
      </header>

      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Brain className="w-10 h-10 text-purple-600" />
            ART - Alignment Research Tool
          </h1>
          <p className="text-xl text-gray-600">
            Aprende cómo hacer que las IAs sean más seguras y confiables
          </p>
          <a 
            href="https://github.com/seojcarlos/ART" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-800"
          >
            Ver código en GitHub <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Contenido en acordeón */}
        <div className="space-y-4">
          {secciones.map((seccion) => (
            <div key={seccion.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setSeccionAbierta(seccionAbierta === seccion.id ? null : seccion.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-xl font-semibold">{seccion.titulo}</h2>
                {seccionAbierta === seccion.id ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {seccionAbierta === seccion.id && (
                <div className="px-6 pb-6">
                  <div className="border-t pt-4">
                    {seccion.contenido}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">🎯 Resumen: ¿Qué aprendiste?</h3>
          <ul className="space-y-2 text-sm">
            <li>✅ ART ayuda a hacer las IAs más seguras y confiables</li>
            <li>✅ Analiza respuestas buscando problemas (seguridad, veracidad, sesgo)</li>
            <li>✅ Usa Python, LangChain y APIs modernas</li>
            <li>✅ Es crucial para el futuro de la IA responsable</li>
            <li>✅ Puedes empezar con evaluadores simples e ir mejorando</li>
          </ul>
        </div>

        <Link
          href="/tutoriales"
          className="inline-block mt-6 text-blue-600 hover:text-blue-800"
        >
          ← Volver a tutoriales
        </Link>
      </div>
    </div>
  );
}
