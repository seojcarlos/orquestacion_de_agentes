import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MenuLateral from '@/components/MenuLateral'
import Breadcrumb from '@/components/Breadcrumb'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Orquestación de Agentes con Claude Flow',
  description: 'Sistema de aprendizaje inteligente con múltiples agentes IA coordinados por Claude Flow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Menú lateral izquierdo */}
        <MenuLateral />
        
        {/* Contenido principal con margen izquierdo */}
        <div className="lg:ml-64 min-h-screen bg-gray-50">
          {/* Breadcrumb mejorado */}
          <Breadcrumb />
          
          {/* Contenido de la página */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
