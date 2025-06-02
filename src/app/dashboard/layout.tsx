// src/app/dashboard/layout.tsx
'use client'

import { ReactNode, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from '@/components/ui/Sidebar'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  // Se o usuário não estiver autenticado (fora de /auth/*), redireciona
  useEffect(() => {
    if (!pathname.startsWith('/auth') && status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [pathname, status, router])

  // Enquanto a sessão carrega, mostra spinner
  if (status === 'loading') {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-green-400 animate-spin"></div>
      </div>
    )
  }

  // Se estiver em /auth/... permite renderizar a página de login/register (este caso dificilmente acontece aqui,
  // pois todo /auth acontece antes deste layout, mas mantive a lógica para garantir)
  if (pathname.startsWith('/auth')) {
    return <>{children}</>
  }

  // Se não autenticado (fora de /auth), o useEffect já fez router.push, então não retorna nada
  if (status === 'unauthenticated') {
    return null
  }

  // Se chegou até aqui, o usuário está autenticado — renderiza o dashboard “protegido”
  return (
    <div className="flex h-scree bg-gray-100">
      <Sidebar />
      <section className="flex flex-1 ml-20 flex-col overflow-y-auto">
        {children}
      </section>
    </div>
  )
}
