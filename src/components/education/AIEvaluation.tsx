import React, { ReactNode, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Award,
  Brain, 
  CheckCircle, 
  Code,
  FileCheck,
  Target,
  TrendingUp,
  Trophy
} from 'lucide-react'

interface AIEvaluationProps {
  children: ReactNode
  className?: string
}

export function AIEvaluationSystem({ children, className = '' }: AIEvaluationProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="bg-gray-800/50 backdrop-blur border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <Brain className="w-7 h-7 text-purple-400" />
            Evaluación IA: Demuestra tu Dominio
          </CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  )
}

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

interface AdaptiveQuizProps {
  questions: QuizQuestion[]
  onComplete?: (score: number) => void
  className?: string
}

export function AdaptiveQuiz({ questions, onComplete, className = '' }: AdaptiveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: number}>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswer = (questionId: string, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    })
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++
      }
    })
    setScore(correct)
    setShowResults(true)
    onComplete?.(correct)
  }

  const question = questions[currentQuestion]

  return (
    <Card className={`bg-purple-900/20 border-purple-500/30 ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl text-purple-400 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Quiz Conceptual Adaptativo
          </span>
          <span className="text-sm text-gray-400">
            {currentQuestion + 1} / {questions.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showResults ? (
          <>
            <div className="bg-gray-900/50 p-4 rounded">
              <h4 className="text-lg text-blue-400 mb-3">
                {question?.question}
              </h4>
              <div className="space-y-2">
                {question?.options.map((option, i) => (
                  <label key={i} className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-800/50">
                    <input 
                      type="radio" 
                      name={`q${question.id}`} 
                      value={i}
                      checked={selectedAnswers[question.id] === i}
                      onChange={() => handleAnswer(question.id, i)}
                      className="text-purple-500"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              {currentQuestion > 0 && (
                <Button 
                  variant="outline"
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                >
                  Anterior
                </Button>
              )}
              {currentQuestion < questions.length - 1 ? (
                <Button 
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  disabled={selectedAnswers[question.id] === undefined}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  Siguiente
                </Button>
              ) : (
                <Button 
                  onClick={calculateScore}
                  disabled={Object.keys(selectedAnswers).length < questions.length}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Finalizar Quiz
                </Button>
              )}
            </div>
          </>
        ) : (
          <QuizResults 
            score={score} 
            total={questions.length}
            questions={questions}
            selectedAnswers={selectedAnswers}
          />
        )}
      </CardContent>
    </Card>
  )
}

interface QuizResultsProps {
  score: number
  total: number
  questions: QuizQuestion[]
  selectedAnswers: {[key: string]: number}
}

function QuizResults({ score, total, questions, selectedAnswers }: QuizResultsProps) {
  const percentage = (score / total) * 100

  return (
    <div className="space-y-4">
      <div className="text-center p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
        <h3 className="text-2xl font-bold text-white mb-2">
          ¡Quiz Completado!
        </h3>
        <p className="text-3xl font-bold text-purple-400">
          {score} / {total}
        </p>
        <p className="text-lg text-gray-300 mt-2">
          {percentage >= 80 ? '¡Excelente trabajo!' :
           percentage >= 60 ? 'Buen trabajo, sigue practicando' :
           'Necesitas repasar el contenido'}
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-blue-400">
          Revisión de Respuestas
        </h4>
        {questions.map((q, i) => {
          const isCorrect = selectedAnswers[q.id] === q.correctAnswer
          return (
            <div key={q.id} className={`p-3 rounded ${
              isCorrect ? 'bg-green-900/20' : 'bg-red-900/20'
            }`}>
              <p className="text-sm text-gray-300 mb-2">
                <span className="font-semibold">P{i + 1}:</span> {q.question}
              </p>
              <p className={`text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                Tu respuesta: {q.options[selectedAnswers[q.id]]}
              </p>
              {!isCorrect && (
                <p className="text-sm text-green-400 mt-1">
                  Respuesta correcta: {q.options[q.correctAnswer]}
                </p>
              )}
              {q.explanation && (
                <p className="text-xs text-gray-400 mt-2">
                  💡 {q.explanation}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface CodeReviewProps {
  onSubmit?: (code: string) => void
  className?: string
}

export function CodeReviewAI({ onSubmit, className = '' }: CodeReviewProps) {
  const [code, setCode] = useState('')
  const [feedback, setFeedback] = useState<any>(null)
  const [isReviewing, setIsReviewing] = useState(false)

  const handleReview = async () => {
    setIsReviewing(true)
    // Simulación de revisión
    setTimeout(() => {
      setFeedback({
        overall: 'good',
        score: 85,
        criteria: {
          correctness: { score: 90, comment: 'La lógica es correcta, validación funcional' },
          performance: { score: 75, comment: 'Considera usar cache para schemas compilados' },
          bestPractices: { score: 85, comment: 'Buen uso de patrones, falta documentación' },
          security: { score: 95, comment: 'Excelente validación de inputs' },
          maintainability: { score: 80, comment: 'Código legible, podría ser más modular' }
        }
      })
      setIsReviewing(false)
      onSubmit?.(code)
    }, 2000)
  }

  return (
    <Card className={`bg-gray-900/50 border-gray-700 ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg text-green-400 flex items-center gap-2">
          <Code className="w-5 h-5" />
          AI Code Review
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 mb-2 block">
            Pega tu implementación de TaskValidator aquí:
          </label>
          <textarea
            className="w-full h-48 bg-gray-900 text-gray-300 p-3 rounded font-mono text-sm"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="class TaskValidator {&#10;  // Tu código aquí&#10;}"
          />
        </div>

        <Button 
          onClick={handleReview}
          disabled={!code || isReviewing}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isReviewing ? 'Analizando código...' : 'Solicitar Revisión IA'}
        </Button>

        {feedback && (
          <CodeReviewFeedback feedback={feedback} />
        )}
      </CardContent>
    </Card>
  )
}

interface CodeReviewFeedbackProps {
  feedback: any
}

function CodeReviewFeedback({ feedback }: CodeReviewFeedbackProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-900/20 p-4 rounded">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold text-blue-400">
            Resultado del Review
          </h4>
          <span className={`text-2xl font-bold ${getScoreColor(feedback.score)}`}>
            {feedback.score}/100
          </span>
        </div>

        <div className="space-y-3">
          {Object.entries(feedback.criteria).map(([key, data]: [string, any]) => (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className={`text-sm font-bold ${getScoreColor(data.score)}`}>
                  {data.score}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    data.score >= 90 ? 'bg-green-500' :
                    data.score >= 70 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${data.score}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">{data.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <Card className="bg-green-900/20 border-green-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-green-400">
            💡 Sugerencias de Mejora
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Implementa cache LRU para schemas compilados</li>
            <li>• Agrega JSDoc comments para mejor documentación</li>
            <li>• Considera extraer validadores a módulos separados</li>
            <li>• Añade tests para casos edge</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

interface MiniProjectProps {
  title: string
  description: string
  requirements: string[]
  onSubmit?: () => void
  className?: string
}

export function MiniProject({ 
  title, 
  description, 
  requirements, 
  onSubmit,
  className = '' 
}: MiniProjectProps) {
  const [checkedRequirements, setCheckedRequirements] = useState<boolean[]>(
    new Array(requirements.length).fill(false)
  )

  const toggleRequirement = (index: number) => {
    const newChecked = [...checkedRequirements]
    newChecked[index] = !newChecked[index]
    setCheckedRequirements(newChecked)
  }

  const completionPercentage = 
    (checkedRequirements.filter(Boolean).length / requirements.length) * 100

  return (
    <Card className={`bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/30 ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl text-orange-400 flex items-center gap-2">
          <Target className="w-6 h-6" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300">{description}</p>

        <div className="bg-gray-900/50 p-4 rounded">
          <h4 className="text-lg text-green-400 mb-3 flex items-center gap-2">
            <FileCheck className="w-5 h-5" />
            Requisitos del Proyecto
          </h4>
          <div className="space-y-2">
            {requirements.map((req, i) => (
              <label key={i} className="flex items-start gap-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={checkedRequirements[i]}
                  onChange={() => toggleRequirement(i)}
                  className="mt-1 text-green-500"
                />
                <span className={`text-sm ${
                  checkedRequirements[i] ? 'text-green-400 line-through' : 'text-gray-300'
                }`}>
                  {req}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-blue-900/20 p-3 rounded">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Progreso</span>
            <span className="text-sm font-bold text-blue-400">
              {completionPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <Button 
          onClick={onSubmit}
          disabled={completionPercentage < 100}
          className="w-full bg-orange-600 hover:bg-orange-700"
        >
          {completionPercentage < 100 
            ? `Completa todos los requisitos (${checkedRequirements.filter(Boolean).length}/${requirements.length})`
            : 'Enviar Proyecto'
          }
        </Button>
      </CardContent>
    </Card>
  )
}