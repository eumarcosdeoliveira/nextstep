'use client'
import { ChangeEvent, FormEvent } from 'react'
import { formatCnpj } from '@/utils/formatCnpj'

export type Step1Data = {
  name: string
  cnpj: string
  setor: string
  site: string
  contatoNome: string
  contatoEmail: string
}

type Props = {
  data: Step1Data
  onChange: (fields: Partial<Step1Data>) => void
  onNext: () => void
}

export default function RegisterEmpresaStep1({ data, onChange, onNext }: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const handleCnpj = (e: ChangeEvent<HTMLInputElement>) =>
    onChange({ cnpj: formatCnpj(e.target.value) })

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-800 text-center">1. Dados da Empresa</h2>

      <input
        type="text"
        value={data.name}
        onChange={(e) => onChange({ name: e.target.value })}
        placeholder="Nome da Empresa"
        className="w-full bg-indigo-50 px-4 py-4 rounded-xl"
        required
      />

      <input
        type="text"
        value={data.cnpj}
        onChange={handleCnpj}
        placeholder="CNPJ (00.000.000/0000-00)"
        maxLength={18}
        className="w-full bg-indigo-50 px-4 py-4 rounded-xl"
        required
      />

      <input
        type="text"
        value={data.setor}
        onChange={(e) => onChange({ setor: e.target.value })}
        placeholder="Setor"
        className="w-full bg-indigo-50 px-4 py-4 rounded-xl"
        required
      />

      <input
        type="url"
        value={data.site}
        onChange={(e) => onChange({ site: e.target.value })}
        placeholder="Site (opcional)"
        className="w-full bg-indigo-50 px-4 py-4 rounded-xl"
      />

      <input
        type="text"
        value={data.contatoNome}
        onChange={(e) => onChange({ contatoNome: e.target.value })}
        placeholder="Nome do Contato Comercial"
        className="w-full bg-indigo-50 px-4 py-4 rounded-xl"
        required
      />

      <input
        type="email"
        value={data.contatoEmail}
        onChange={(e) => onChange({ contatoEmail: e.target.value })}
        placeholder="E-mail do Contato Comercial"
        className="w-full bg-indigo-50 px-4 py-4 rounded-xl"
        required
      />

      <button type="submit" className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-400 text-white">
        Próximo
      </button>
    </form>
  )
}
