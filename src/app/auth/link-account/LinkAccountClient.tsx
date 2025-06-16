// src/app/auth/link-account/LinkAccountClient.tsx
'use client'

import { useState, useEffect, Suspense } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Toast } from '@/components/ui/Toast'
import Link from 'next/link'

function LinkAccountForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{
    visible: boolean
    type: 'error' | 'success'
    message: string
  }>({ visible: false, type: 'error', message: '' })

  useEffect(() => {
    if (!email) {
      setToast({
        visible: true,
        type: 'error',
        message: 'E-mail para vincular não encontrado.',
      })
      router.push('/auth/login')
    }
  }, [email, router])

  const handleLinkAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setToast({ visible: false, type: 'error', message: '' })

    if (!email) {
      setToast({ visible: true, type: 'error', message: 'E-mail não fornecido.' })
      setLoading(false)
      return
    }

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl,
    })

    setLoading(false)

    if (result?.error) {
      const msg = result.error.includes('CredentialsSignin')
        ? 'Senha incorreta. Tente novamente.'
        : result.error
      setToast({ visible: true, type: 'error', message: msg })
    } else {
      const session = await getSession()
      if (session) {
        setToast({ visible: true, type: 'success', message: 'Conta vinculada com sucesso!' })
        router.push(callbackUrl)
      } else {
        setToast({
          visible: true,
          type: 'error',
          message: 'Erro ao vincular conta. Tente novamente.',
        })
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {toast.visible && (
        <Toast
          type={toast.type}
          message={toast.message}
          position="top-right"
          onClose={() => setToast((t) => ({ ...t, visible: false }))}
        />
      )}
      <div className="w-full max-w-md bg-white shadow p-6 rounded">
        <h1 className="text-2xl font-bold mb-4">Vincular Conta</h1>
        <p className="mb-4">
          Já existe uma conta com o e-mail{' '}
          <span className="font-semibold text-blue-600">{email}</span>.
        </p>
        <form onSubmit={handleLinkAccount} className="space-y-4">
          <input
            type="password"
            placeholder="Sua senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Vinculando...' : 'Vincular Conta'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Cancelar e voltar para o login
          </Link>
        </div>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white shadow p-6 rounded">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default function LinkAccountClient() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LinkAccountForm />
    </Suspense>
  )
}