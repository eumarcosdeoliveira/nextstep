// src/components/aluno/AlunoForm.tsx
'use client'
import { useState } from 'react'
import { Aluno } from '@/types/aluno'

export type AlunoFormData = Omit<Aluno, 'id' | 'data_cadastro'>

interface AlunoFormProps {
  initialData?: Partial<AlunoFormData>
  onSubmit: (data: AlunoFormData) => void
  submitLabel?: string
}

export default function AlunoForm({
  initialData = {},
  onSubmit,
  submitLabel = 'Salvar',
}: AlunoFormProps) {
  const [form, setForm] = useState<AlunoFormData>({
    nome: initialData.nome || '',
    email: initialData.email || '',
    matricula: initialData.matricula || '',
    nivel_instrucao: initialData.nivel_instrucao || 'Graduação',
    instituicao_id: initialData.instituicao_id ?? 0,
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
        <span className="font-medium">E-mail *</span>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded"
        />
      </label>

      <label className="block">
        <span className="font-medium">Matrícula *</span>
        <input
          name="matricula"
          value={form.matricula}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded"
        />
      </label>

      <label className="block">
        <span className="font-medium">Nível de Instrução *</span>
        <select
          name="nivel_instrucao"
          value={form.nivel_instrucao}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded"
        >
          <option>Graduação</option>
          <option>Pós</option>
          <option>Mestrado</option>
          <option>Doutorado</option>
        </select>
      </label>

      <label className="block">
        <span className="font-medium">Instituição ID *</span>
        <input
          name="instituicao_id"
          value={form.instituicao_id}
          onChange={handleChange}
          required
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
)}
