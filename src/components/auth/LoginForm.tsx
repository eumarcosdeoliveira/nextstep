'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { Toast } from '@/components/ui/Toast' // ajuste caso o caminho seja diferente

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const inputClasses = `
    w-full
    bg-indigo-50
    rounded-xl
    py-4 px-6
    text-gray-900
    placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-400
  `

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setToast(null)
    setLoading(true)

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    setLoading(false)

    if (res?.ok) {
      setToast({ type: 'success', message: 'Login realizado com sucesso!' })
      setTimeout(() => {
        setToast(null)
        router.push('/dashboard')
      }, 800)
    } else {
      setToast({ type: 'error', message: 'Email ou senha inválidos.' })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* E-mail */}
        <div>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>

        {/* Senha */}
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPwd ? 'text' : 'password'}
            placeholder="Senha"
            className={`${inputClasses} pr-12`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPwd((prev) => !prev)}
            className="absolute inset-y-0 right-4 flex items-center"
            aria-label={showPwd ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPwd ? (
              <EyeSlashIcon className="w-5 h-5 text-gray-500" />
            ) : (
              <EyeIcon className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>

        {/* Esqueceu a senha */}
        <div className="text-right text-sm">
          <Link href="/auth/forgot-password" className="text-gray-600 hover:underline">
            Esqueceu a senha?
          </Link>
        </div>

        {/* Botão Entrar */}
        <button
          type="submit"
          className="
            w-full py-3 rounded-xl
            bg-gradient-to-r from-blue-500 to-green-400
            text-white font-semibold
            hover:opacity-95 transition
            flex items-center justify-center
          "
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-20"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-80"
                  fill="url(#gradientSpinner)"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
                <defs>
                  <linearGradient id="gradientSpinner" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" /> {/* blue-600 */}
                    <stop offset="100%" stopColor="#22C55E" /> {/* green-400 */}
                  </linearGradient>
                </defs>
              </svg>
              Entrando...
            </span>
          ) : (
            'Entrar'
          )}
        </button>
      </form>

      {/* Toast na tela */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          position="bottom-right"
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}
