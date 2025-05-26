// src/components/empresa/EmpresaForm.tsx
'use client'
import { useState } from 'react'
import { Empresa } from '@/types/empresa'

export type EmpresaFormData = Omit<Empresa, 'id'>

interface EmpresaFormProps {
  initialData?: Partial<EmpresaFormData>
  onSubmit: (data: EmpresaFormData) => void
  submitLabel?: string
}

export default function EmpresaForm({
  initialData = {},
  onSubmit,
  submitLabel = 'Salvar',
}: EmpresaFormProps) {
  const [form, setForm] = useState<EmpresaFormData>({
    nome: initialData.nome || '',
    cnpj: initialData.cnpj || '',
    setor: initialData.setor || '',
    contato_nome: initialData.contato_nome || '',
    contato_email: initialData.contato_email || '',
    telefone: initialData.telefone || '',
    site: initialData.site || '',
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
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
        <span className="font-medium">CNPJ *</span>
        <input
          name="cnpj"
          value={form.cnpj}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded"
        />
      </label>

      <label className="block">
        <span className="font-medium">Setor *</span>
        <input
          name="setor"
          value={form.setor}
          onChange={handleChange}
          required
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
          value={form.telefone}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded"
        />
      </label>

      <label className="block">
        <span className="font-medium">Site</span>
        <input
          name="site"
          value={form.site}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded"
        />
      </label>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {submitLabel}
      </button>
    </form>
  )
}
