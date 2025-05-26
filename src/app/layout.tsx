// src/app/layout.tsx
import './globals.css'
import Link from 'next/link'
import React from 'react'

export const metadata = {
  title: 'NextStep',
  description: 'Painel de Gerenciamento NextStep',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Garante favicon caso o metadata não esteja sendo injetado */}
        <link rel="icon" href="/icons/Icon-Isotipo.ico" />
      </head>
      <body className="min-h-screen bg-gray-100 text-gray-800">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-white shadow-md flex flex-col">
            {/* Logo */}
            <div className="p-4 flex items-center gap-2">
              {/* OPÇÃO 1: tag nativa img (debug rápido) */}
              <img
                src="/logo.png"
                alt="NextStep Logo"
                width={32}
                height={32}
                className="block"
              />

              {/* OPÇÃO 2 (voltar a usar next/image, se quiser):
              import Image from 'next/image'
              <Image
                src="/logo.png"
                alt="NextStep Logo"
                width={32}
                height={32}
                unoptimized
                priority
              /> */}

              <span className="text-2xl font-semibold">NextStep</span>
            </div>

            {/* Navegação */}
            <nav className="mt-4 flex-1">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link href="/alunos">Alunos</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link href="/avaliacoes">Avaliações</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link href="/empresas">Empresas</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link href="/instituicoes">Instituições</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link href="/projetos">Projetos</Link>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Conteúdo principal */}
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </body>
    </html>
  )
}
