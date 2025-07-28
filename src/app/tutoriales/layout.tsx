import { ReactNode } from 'react'
import MenuLateral from '@/components/MenuLateral'

interface TutorialesLayoutProps {
  children: ReactNode
}

export default function TutorialesLayout({ children }: TutorialesLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Menu lateral solo para tutoriales */}
      <MenuLateral />
      
      {/* Contenido principal con margen para el sidebar */}
      <main className="lg:ml-64 transition-all duration-300">
        {children}
      </main>
    </div>
  )
}
