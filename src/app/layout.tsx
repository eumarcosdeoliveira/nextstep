// src/app/layout.tsx
'use client'

import '../globals.css'
import { ReactNode, useEffect } from 'react'
import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from '@/components/ui/Sidebar' // Importação do Sidebar

interface RootLayoutProps { children: ReactNode }

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <head>
        {/* metatags, título, etc. */}
      </head>
      <body>
        <SessionProvider>
          <AuthWrapper>{children}</AuthWrapper>
        </SessionProvider>
      </body>
    </html>
  )
}

function AuthWrapper({ children }: { children: ReactNode }) {
  const { status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  // 1) Chama o useEffect sempre, mas só redireciona em condições específicas:
  useEffect(() => {
    // Se NÃO estivermos em /auth/* e o usuário NÃO estiver autenticado, redireciona
    // Isso é para proteger rotas que não são de autenticação.
    if (!pathname?.startsWith('/auth') && status === 'unauthenticated') {
      router.push('/auth/login')
    }
    // Se estiver em uma rota de auth e o usuário ESTIVER autenticado, redireciona para o dashboard
    if (pathname?.startsWith('/auth') && status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [pathname, status, router])

  // 2) Se estivermos em qualquer página de /auth/* (login, register, link-account, choose-role),
  //    apenas renderiza os filhos (o layout de auth específico).
  //    Não exibe sidebar ou loading aqui, pois o objetivo é a interface de autenticação.
  if (pathname?.startsWith('/auth')) {
    return <>{children}</>
  }

  // 3) Se ainda estiver carregando a sessão (fora de /auth/*), exibe loading
  if (status === 'loading') {
    return (
      <div className="h-screen flex items-center justify-center">
        {/* Spinner com gradiente de azul para verde */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-green-400 animate-spin"></div>
      </div>
    )
  }

  // 4) Se NÃO estiver autenticado (e não estamos em /auth/*), não renderiza nada aqui.
  //    O useEffect já disparou router.push para /auth/login.
  if (status === 'unauthenticated') {
    return null
  }

  // 5) Se chegamos até aqui, o usuário está autenticado e não está em uma rota de autenticação:
  //    renderiza o layout com sidebar e o conteúdo protegido (dashboard).
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar /> {/* <--- CORREÇÃO AQUI: O Sidebar agora é RENDERIZADO */}
      <section className="flex flex-1 flex-col overflow-y-auto">
        {children}
      </section>
    </div>
  )
}