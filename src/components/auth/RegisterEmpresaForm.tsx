// src/components/auth/RegisterEmpresaForm.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { Toast } from '@/components/ui/Toast' // Caminho conforme seu projeto
import { signIn } from 'next-auth/react'

type FormData = {
  email: string
  name: string // Nome da Empresa
  cnpj: string // CNPJ da Empresa
  phone: string // Telefone da Empresa
  password: string
  confirmPassword: string
  role: 'empresa' // Campo fixo para o tipo de usuário
}

export default function RegisterEmpresaForm() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>({
    email: '',
    name: '',
    cnpj: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'empresa', // Define o role como 'empresa'
  })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

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
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
          phone: form.phone,
          document: form.cnpj, // Mapeia cnpj para o campo 'document' na API de registro
          role: form.role, // Envia o role
        }),
      })

      if (res.ok) {
        setToast({ visible: true, type: 'success', message: 'Conta de empresa criada com sucesso!' })
        setTimeout(() => {
          router.push('/auth/login') // Redireciona para a rota correta de login
        }, 2000)
      } else {
        const data = await res.json().catch(() => ({}))
        const msg = data.error || 'Erro ao registrar empresa'
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
      {toast.visible && (
        <Toast
          type={toast.type}
          message={toast.message}
          position="top-right"
          onClose={() => setToast((t) => ({ ...t, visible: false }))}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Cadastro de Empresa</h2>

        {/* Nome da Empresa */}
        <div>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Nome da Empresa"
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

        {/* E-mail da Empresa */}
        <div>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="E-mail da Empresa"
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

        {/* CNPJ */}
        <div>
          <input
            type="text"
            required
            value={form.cnpj}
            onChange={(e) => setForm((prev) => ({ ...prev, cnpj: e.target.value }))}
            placeholder="CNPJ"
            maxLength={18} // Exemplo de máscara: 99.999.999/9999-99
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

        {/* Telefone de Contato */}
        <div>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
            placeholder="Telefone de Contato"
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
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
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

        {/* Confirmar Senha */}
        <div className="relative">
          <input
            type={showConfirm ? 'text' : 'password'}
            required
            value={form.confirmPassword}
            onChange={(e) => setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
            placeholder="Confirmar Senha"
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

        {/* Botão Criar conta de Empresa */}
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
          Criar conta de Empresa
        </button>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </form>

      <div className="mt-8 mb-8 text-center text-gray-400">ou entre com</div>

      <button
        onClick={() => signIn('google', { callbackUrl: '/' })}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 hover:bg-gray-100"
      >
        <Image src="/google.svg" alt="Google Logo" width={24} height={24} />
        <span className="text-base font-medium">Entrar com Google</span>
      </button>
      

      <div className="mt-4 text-center text-gray-500">
        <p className="text-sm text-gray-500">
          Não é uma empresa?{' '}
          <Link
            href="/auth/register" // Volta para a escolha de perfil
            className={`font-semibold ${placeholderGradientClasses} hover:underline`}
          >
            Voltar
          </Link>
        </p>
      </div>
    </div>
  )
}