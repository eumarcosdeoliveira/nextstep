'use client'
import { ChangeEvent, FormEvent } from 'react'
import { formatPhone } from '@/utils/formatPhone'

type Step1Data = {
  institutionName: string
  sigla: string
  tipo: string
  endereco: string
  site: string
  contatoNome: string
  contatoEmail: string
  telefone: string
}

type Props = {
  data: Step1Data
  onChange: (fields: Partial<Step1Data>) => void
  onNext: () => void
}

export default function RegisterInstituicaoStep1({ data, onChange, onNext }: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ telefone: formatPhone(e.target.value) })
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        1. Dados da Instituição
      </h2>

      <input
        type="text"
        value={data.institutionName}
        onChange={(e) => onChange({ institutionName: e.target.value })}
        placeholder="Nome da Instituição"
        className="w-full bg-indigo-50 px-4 py-4 rounded-xl focus:outline-none focus:ring-0"
        required
      />

      <input
        type="text"
        value={data.sigla}
        onChange={(e) => onChange({ sigla: e.target.value })}
        placeholder="Sigla"
        className="w-full bg-indigo-50 px-4 py-4 rounded-xl focus:outline-none focus:ring-0"
        required
      />

      <input
        type="text"
        value={data.tipo}
        onChange={(e) => onChange({ tipo: e.target.value })}
        placeholder="Tipo (Ex: Pública, Privada)"
        className="w-full bg-indigo-50 px-4 py-4 rounded-xl focus:outline-none focus:ring-0"
        required
      />

      <input
        type="text"
        value={data.endereco}
        onChange={(e) => onChange({ endereco: e.target.value })}
        placeholder="Endereço"
        className="w-full bg-indigo-50 px-4 py-4 rounded-xl focus:outline-none focus:ring-0"
        required
      />

      <input
        type="url"
        value={data.site}
        onChange={(e) => onChange({ site: e.target.value })}
        placeholder="Site (opcional)"
        className="w-full bg-indigo-50 px-4 py-4 rounded-xl focus:outline-none focus:ring-0"
      />

      <input
        type="text"
        value={data.contatoNome}
        onChange={(e) => onChange({ contatoNome: e.target.value })}
        placeholder="Nome do Contato"
        className="w-full bg-indigo-50 px-4 py-4 rounded-xl focus:outline-none focus:ring-0"
        required
      />

      <input
        type="email"
        value={data.contatoEmail}
        onChange={(e) => onChange({ contatoEmail: e.target.value })}
        placeholder="E-mail do Contato"
        className="w-full bg-indigo-50 px-4 py-4 rounded-xl focus:outline-none focus:ring-0"
        required
      />

      <input
        type="tel"
        value={data.telefone}
        onChange={handlePhone}
        placeholder="Telefone (XX) XXXXX-XXXX"
        className="w-full bg-indigo-50 px-4 py-4 rounded-xl focus:outline-none focus:ring-0"
        required
      />

      <button
        type="submit"
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-green-400 text-white"
      >
        Próximo
      </button>
    </form>
  )
}
