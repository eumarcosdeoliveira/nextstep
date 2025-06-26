'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
import { formatPhone } from '@/utils/formatPhone'
import { validatePhone } from '@/utils/validatePhone'
import { Eye, EyeOff } from 'lucide-react'

export type Step2Data = {
  userName: string
  userEmail: string
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

export default function RegisterEmpresaStep2({
  data,
  onChange,
  onBack,
  onSubmit,
  loading = false
}: Props) {
  const [showPass, setShowPass] = useState(false)
  const [showConf, setShowConf] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  const handlePhone = (e: ChangeEvent<HTMLInputElement>) =>
    onChange({ phone: formatPhone(e.target.value) })

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-800 text-center">2. Conta de Acesso</h2>

      <input
        type="text"
        value={data.userName}
        onChange={(e) => onChange({ userName: e.target.value })}
        placeholder="Nome de Usuário"
        className="w-full bg-indigo-50 px-4 py-4 rounded-xl"
        required
      />

      <input
        type="email"
        value={data.userEmail}
        onChange={(e) => onChange({ userEmail: e.target.value })}
        placeholder="E-mail de Acesso"
        className="w-full bg-indigo-50 px-4 py-4 rounded-xl"
        required
      />

      <div>
        <input
          type="tel"
          value={data.phone}
          onChange={handlePhone}
          placeholder="Telefone"
          className="w-full bg-indigo-50 px-4 py-4 rounded-xl"
          required
        />
        {!validatePhone(data.phone) && data.phone.replace(/\D/g, '').length > 0 && (
          <span className="text-red-500 text-sm">✗ Telefone inválido.</span>
        )}
      </div>

      <div className="relative">
        <input
          type={showPass ? 'text' : 'password'}
          value={data.password}
          onChange={(e) => onChange({ password: e.target.value })}
          placeholder="Senha"
          className="w-full bg-indigo-50 px-4 py-4 rounded-xl pr-12"
          required
        />
        <button type="button" onClick={() => setShowPass(v => !v)} className="absolute inset-y-0 right-0 pr-4">
          {showPass ? <EyeOff size={20}/> : <Eye size={20}/>}
        </button>
      </div>

      <div className="relative">
        <input
          type={showConf ? 'text' : 'password'}
          value={data.confirmPassword}
          onChange={(e) => onChange({ confirmPassword: e.target.value })}
          placeholder="Confirmar Senha"
          className="w-full bg-indigo-50 px-4 py-4 rounded-xl pr-12"
          required
        />
        <button type="button" onClick={() => setShowConf(v => !v)} className="absolute inset-y-0 right-0 pr-4">
          {showConf ? <EyeOff size={20}/> : <Eye size={20}/>}
        </button>
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={onBack} className="px-6 py-3 rounded-xl border">
          Voltar
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`
            px-6 py-3 rounded-2xl text-white
            ${loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-400 hover:opacity-90'
            }
          `}
        >
          {loading ? 'Enviando...' : 'Finalizar'}
        </button>
      </div>
    </form>
  )
}
