import React, { ReactNode, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ExampleCardProps {
  title: string
  level: 'basic' | 'intermediate' | 'advanced' | 'production'
  expandable?: boolean
  defaultExpanded?: boolean
  icon?: string
  children: ReactNode
  className?: string
}

const levelColors = {
  basic: 'from-green-900/20 to-blue-900/20 border-green-500/30',
  intermediate: 'from-purple-900/20 to-pink-900/20 border-purple-500/30',
  advanced: 'from-blue-900/20 to-cyan-900/20 border-blue-500/30',
  production: 'from-orange-900/20 to-red-900/20 border-orange-500/30'
}

const levelTextColors = {
  basic: 'text-green-400',
  intermediate: 'text-purple-400',
  advanced: 'text-blue-400',
  production: 'text-orange-400'
}

export function ExampleCard({
  title,
  level,
  expandable = true,
  defaultExpanded = false,
  icon,
  children,
  className = ''
}: ExampleCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <Card className={`mb-4 bg-gradient-to-r ${levelColors[level]} ${className}`}>
      <CardHeader 
        className={expandable ? "cursor-pointer" : ""}
        onClick={() => expandable && setIsExpanded(!isExpanded)}
      >
        <CardTitle className={`text-xl ${levelTextColors[level]} flex items-center justify-between`}>
          <span className="flex items-center gap-2">
            {icon && <span className="text-2xl">{icon}</span>}
            {title}
          </span>
          {expandable && (
            <span className="text-sm text-gray-400">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      {(!expandable || isExpanded) && (
        <CardContent className="space-y-4">
          {children}
        </CardContent>
      )}
    </Card>
  )
}

interface CodeEditorProps {
  code: string
  language?: string
  editable?: boolean
  onChange?: (value: string) => void
  withExplanation?: boolean
  withHighlights?: string[]
  readOnly?: boolean
  className?: string
}

export function CodeEditor({
  code,
  language = 'json',
  editable = false,
  onChange,
  withExplanation = false,
  withHighlights = [],
  readOnly = false,
  className = ''
}: CodeEditorProps) {
  return (
    <div className={`bg-gray-900 p-4 rounded-lg ${className}`}>
      {editable && !readOnly ? (
        <textarea
          className="w-full bg-transparent text-gray-300 font-mono text-sm outline-none"
          value={code}
          onChange={(e) => onChange?.(e.target.value)}
          rows={15}
        />
      ) : (
        <pre className="text-sm overflow-x-auto">
          <code className={`language-${language} text-gray-300`}>
            {code}
          </code>
        </pre>
      )}
    </div>
  )
}

interface ConceptExplanationProps {
  children: ReactNode
  className?: string
}

export function ConceptExplanation({ children, className = '' }: ConceptExplanationProps) {
  return (
    <div className={`bg-blue-900/20 p-4 rounded-lg border border-blue-500/30 ${className}`}>
      <div className="space-y-3 text-gray-300">
        {children}
      </div>
    </div>
  )
}