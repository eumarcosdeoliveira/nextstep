// layout simples (login e registro)
import React from 'react'
import '../globals.css' // Importando o CSS global

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex items-center justify-center bg-gray-50">
        {children}
      </body>
    </html>
  )
}
