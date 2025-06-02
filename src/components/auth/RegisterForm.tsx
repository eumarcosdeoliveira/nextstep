// src/components/RegisterForm.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { Toast } from '@/components/ui/Toast' // ajuste o caminho conforme seu projeto
import { signIn } from 'next-auth/react'

type FormData = {
  email: string
  name: string
  phone: string
  document: string
  password: string
  confirmPassword: string
}

export default function RegisterForm() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>({
    email: '',
    name: '',
    phone: '',
    document: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // Estados para controlar o Toast
  const [toast, setToast] = useState<{
    visible: boolean
    type: 'success' | 'error'
    message: string
  }>({ visible: false, type: 'success', message: '' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setToast({ visible: true, type: 'error', message: 'As senhas não coincidem.' })
      return
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setToast({ visible: true, type: 'success', message: 'Conta criada com sucesso!' })
        // Aguarda o Toast fechar (5s) ou redireciona antes
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        const data = await res.json().catch(() => ({}))
        const msg = data.error || 'Erro ao registrar'
        setToast({ visible: true, type: 'error', message: msg })
      }
    } catch {
      setToast({ visible: true, type: 'error', message: 'Erro de conexão. Tente novamente.' })
    }
  }

  const placeholderGradientClasses =
    'placeholder:bg-gradient-to-r placeholder:from-blue-600 placeholder:to-green-400 placeholder:bg-clip-text placeholder:text-transparent'

  return (
    <div className="w-full max-w-md p-8 relative">
      {/* Exibe o Toast quando toast.visible for true */}
      {toast.visible && (
        <Toast
          type={toast.type}
          message={toast.message}
          position="top-right"
          onClose={() => setToast((t) => ({ ...t, visible: false }))}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* E-mail */}
        <div>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Digite seu e-mail"
            className={`
              w-full 
              bg-indigo-50 
              text-gray-900 
              px-4 py-4 
              rounded-xl 
              focus:outline-none focus:ring-0
              ${placeholderGradientClasses}
            `}
          />
        </div>

        {/* Nome */}
        <div>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Nome"
            className={`
              w-full 
              bg-indigo-50 
              text-gray-900 
              px-4 py-4 
              rounded-xl 
              focus:outline-none focus:ring-0
              ${placeholderGradientClasses}
            `}
          />
        </div>

        {/* Telefone */}
        <div>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, phone: e.target.value }))
            }
            placeholder="Telefone"
            className={`
              w-full 
              bg-indigo-50 
              text-gray-900 
              px-4 py-4 
              rounded-xl 
              focus:outline-none focus:ring-0
              ${placeholderGradientClasses}
            `}
          />
        </div>

        {/* CNPJ/CPF */}
        <div>
          <input
            type="text"
            required
            value={form.document}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, document: e.target.value }))
            }
            placeholder="CNPJ/CPF"
            className={`
              w-full 
              bg-indigo-50 
              text-gray-900 
              px-4 py-4 
              rounded-xl 
              focus:outline-none focus:ring-0
              ${placeholderGradientClasses}
            `}
          />
        </div>

        {/* Senha */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Senha"
            className={`
              w-full 
              bg-indigo-50 
              text-gray-900 
              px-4 py-4 
              rounded-xl 
              focus:outline-none focus:ring-0 
              pr-12
              ${placeholderGradientClasses}
            `}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-indigo-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirmar senha */}
        <div className="relative">
          <input
            type={showConfirm ? 'text' : 'password'}
            required
            value={form.confirmPassword}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            placeholder="Confirmar senha"
            className={`
              w-full 
              bg-indigo-50 
              text-gray-900 
              px-4 py-4 
              rounded-xl 
              focus:outline-none focus:ring-0 
              pr-12
              ${placeholderGradientClasses}
            `}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-indigo-500"
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Botão Criar conta */}
        <button
          type="submit"
          className="
            w-full 
            py-4 
            rounded-2xl 
            bg-gradient-to-r from-blue-600 to-green-400 
            text-white 
            text-lg font-medium 
            shadow-xl 
            hover:opacity-95 
            transition-opacity
          "
        >
          Criar conta
        </button>

        {/* Exibir mensagem de erro, se houver */}
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>

      {/* “ou entre com” */}
      <div className="mt-8 mb-8 text-center text-gray-400">ou entre com</div>

      {/* Ícone de login social (Google) */}
      <button
        onClick={() => signIn('google', { callbackUrl: '/' })}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 hover:bg-gray-100"
                >
                  {/* Substitui o SVG inline pelo arquivo em public/google.svg */}
                  <Image
                    src="/google.svg"
                    alt="Google Logo"
                    width={24}
                    height={24}
                  />
      <span className="text-base font-medium">Entrar com Google</span>
      </button>
    </div>
  )
}
