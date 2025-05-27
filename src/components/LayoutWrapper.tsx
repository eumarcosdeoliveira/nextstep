// src/components/LayoutWrapper.tsx
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideLayout = ['/login', '/register'].includes(pathname)

  if (hideLayout) {
    // só renderiza a página filho (login, register)
    return <>{children}</>
  }

  // renderiza o dashboard com sidebar nas demais rotas
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 flex items-center gap-2">
          <img
            src="/logo.png"
            alt="NextStep Logo"
            width={32}
            height={32}
          />
          <span className="text-2xl font-semibold">NextStep</span>
        </div>
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
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  )
}
