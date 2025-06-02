// src/app/auth/layout.tsx
'use client'

import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-white">
      {children}
    </main>
  )
}
