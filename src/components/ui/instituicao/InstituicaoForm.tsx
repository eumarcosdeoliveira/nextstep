// src/components/instituicao/InstituicaoForm.tsx
'use client'
import { useState } from 'react'
import { Instituicao } from '@/types/instituicao'

export type InstituicaoFormData = Omit<Instituicao, 'id'>

interface InstituicaoFormProps {
  initialData?: Partial<InstituicaoFormData>
  onSubmit: (data: InstituicaoFormData) => void
  submitLabel?: string
}

export default function InstituicaoForm({
  initialData = {},
  onSubmit,
  submitLabel = 'Salvar',
}: InstituicaoFormProps) {
  const [form, setForm] = useState<InstituicaoFormData>({
    nome: initialData.nome || '',
    sigla: initialData.sigla || '',
    tipo: initialData.tipo || 'Pública',
    endereco: initialData.endereco || '',
    contato_nome: initialData.contato_nome || '',
    contato_email: initialData.contato_email || '',
    telefone: initialData.telefone || '',
    site: initialData.site || '',
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <label className="block">
        <span className="font-medium">Nome *</span>
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded"
        />
      </label>

      <label className="block">
        <span className="font-medium">Sigla</span>
        <input
          name="sigla"
          value={form.sigla ?? ''}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded"
        />
      </label>

      <label className="block">
        <span className="font-medium">Tipo *</span>
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded"
        >
          <option>Pública</option>
          <option>Privada</option>
        </select>
      </label>

      <label className="block">
        <span className="font-medium">Endereço</span>
        <input
          name="endereco"
          value={form.endereco ?? ''}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded"
        />
      </label>

      <label className="block">
        <span className="font-medium">Contato Nome *</span>
        <input
          name="contato_nome"
          value={form.contato_nome}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded"
        />
      </label>

      <label className="block">
        <span className="font-medium">Contato Email *</span>
        <input
          name="contato_email"
          type="email"
          value={form.contato_email}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded"
        />
      </label>

      <label className="block">
        <span className="font-medium">Telefone</span>
        <input
          name="telefone"
          value={form.telefone ?? ''}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded"
        />
      </label>

      <label className="block">
        <span className="font-medium">Site</span>
        <input
          name="site"
          value={form.site ?? ''}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded"
        />
      </label>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {submitLabel}
      </button>
    </form>
  )
}
