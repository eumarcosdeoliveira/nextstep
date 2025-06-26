'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
import { formatPhone } from '@/utils/formatPhone'
import { validatePhone } from '@/utils/validatePhone'
import { validateEmail } from '@/utils/validateEmail'
import { Eye, EyeOff } from 'lucide-react'

type Step2Data = {
  email: string
  phone: string
  password: string
  confirmPassword: string
}

type Props = {
  data: Step2Data
  onChange: (fields: Partial<Step2Data>) => void
  onBack: () => void
  onSubmit: () => void
  loading?: boolean
}

export default function RegisterInstituicaoStep2({
  data,
  onChange,
  onBack,
  onSubmit,
  loading = false,
}: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!loading) onSubmit()
  }

  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ phone: formatPhone(e.target.value) })
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        2. Conta de Acesso
      </h2>

      <input
        type="email"
        value={data.email}
        onChange={(e) => onChange({ email: e.target.value })}
        placeholder="E-mail de Acesso"
        className="w-full bg-indigo-50 px-4 py-4 rounded-xl focus:outline-none focus:ring-0"
        required
      />

      <div>
        <input
          type="tel"
          value={data.phone}
          onChange={handlePhone}
          placeholder="Telefone (XX) XXXXX-XXXX"
          className="w-full bg-indigo-50 px-4 py-4 rounded-xl focus:outline-none focus:ring-0"
          required
        />
        {!validatePhone(data.phone) &&
          data.phone.replace(/\D/g, '').length > 0 && (
            <span className="block text-red-500 text-sm pl-2 mt-1">
              ✗ Telefone inválido (10 ou 11 dígitos).
            </span>
          )}
      </div>

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={data.password}
          onChange={(e) => onChange({ password: e.target.value })}
          placeholder="Senha (mín. 8 caracteres)"
          className="w-full bg-indigo-50 px-4 py-4 rounded-xl focus:outline-none focus:ring-0 pr-12"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-indigo-500"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="relative">
        <input
          type={showConfirm ? 'text' : 'password'}
          value={data.confirmPassword}
          onChange={(e) => onChange({ confirmPassword: e.target.value })}
          placeholder="Confirmar Senha"
          className="w-full bg-indigo-50 px-4 py-4 rounded-xl focus:outline-none focus:ring-0 pr-12"
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirm((v) => !v)}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-indigo-500"
        >
          {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={onBack} className="px-6 py-3 rounded-xl border">
          Voltar
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-3 rounded-2xl text-white ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-green-400 hover:opacity-90'
          }`}
        >
          {loading ? 'Enviando...' : 'Finalizar'}
        </button>
      </div>
    </form>
  )
}
