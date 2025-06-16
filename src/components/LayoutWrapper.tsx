// src/components/LayoutWrapper.tsx
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image' // Adicione esta importação

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // As rotas de login/registro/escolha de perfil/link-account não devem ter o layout completo
  const hideLayout = ['/auth/login', '/auth/register', '/auth/choose-role', '/auth/link-account'].includes(pathname)

  if (hideLayout) {
    // só renderiza a página filho (login, register, etc.)
    return <>{children}</>
  }

  // renderiza o dashboard com sidebar nas demais rotas
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 flex items-center gap-2">
          <Image // Substitua <img> por Image
            src="/logo.png"
            alt="NextStep Logo"
            width={32}
            height={32}
            //priority // Adicione priority se for um logo importante na primeira renderização
          />
          <span className="text-2xl font-semibold">NextStep</span>
        </div>
        <nav className="mt-4 flex-1">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-200">
              <Link href="/dashboard/alunos">Alunos</Link> {/* Ajustar link para dashboard */}
            </li>
            <li className="px-4 py-2 hover:bg-gray-200">
              <Link href="/dashboard/avaliacoes">Avaliações</Link> {/* Ajustar link para dashboard */}
            </li>
            <li className="px-4 py-2 hover:bg-gray-200">
              <Link href="/dashboard/empresas">Empresas</Link> {/* Ajustar link para dashboard */}
            </li>
            <li className="px-4 py-2 hover:bg-gray-200">
              <Link href="/dashboard/instituicoes">Instituições</Link> {/* Ajustar link para dashboard */}
            </li>
            <li className="px-4 py-2 hover:bg-gray-200">
              <Link href="/dashboard/projetos">Projetos</Link> {/* Ajustar link para dashboard */}
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