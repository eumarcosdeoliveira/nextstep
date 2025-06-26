'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function HomePage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'loading') return

    if (session?.user) {
      if (session.user.role === '1') {
        router.replace('/dashboard/empresa')
      } else if (session.user.role === '2') {
        router.replace('/dashboard/instituicao')
      } else {
        router.replace('/auth/login')
      }
    } else {
      router.replace('/auth/login')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-green-400 animate-spin" />
      </div>
    )
  }

  return null
}
