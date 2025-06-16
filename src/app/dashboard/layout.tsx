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

  useEffect(() => {
    if (!pathname.startsWith('/auth') && status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [pathname, status, router])

  if (status === 'loading') {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-green-400 animate-spin" />
      </div>
    )
  }

  if (pathname.startsWith('/auth')) {
    return <>{children}</>
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <section className="flex-1 ml-20 overflow-y-auto">
        {children}
      </section>
    </div>
  )
}
