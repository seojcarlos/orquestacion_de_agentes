import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/layout/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Orquestación de Agentes IA',
  description: 'Plataforma educativa unificada: Academia IA, Agencia Digital, Tutoriales y Playground con Claude Flow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Navegación unificada */}
        <NavBar />
        
        {/* Contenido principal */}
        <main className="min-h-screen bg-gray-950">
          {children}
        </main>
      </body>
    </html>
  )
}
