import React, { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen } from 'lucide-react'

interface TheorySectionProps {
  title: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export function TheorySection({ 
  title, 
  icon = <BookOpen className="w-8 h-8 text-blue-400" />,
  children, 
  className = "" 
}: TheorySectionProps) {
  return (
    <div className={`space-y-8 animate-fade-in ${className}`}>
      <Card className="bg-gray-800/50 backdrop-blur border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-3xl text-white flex items-center gap-3">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <div className="space-y-8 text-gray-300">
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}