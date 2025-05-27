'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateProjetoPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    nivel_dificuldade: 'Básico',
    empresa_id: '',
    instituicao_id: '',
  })
  const [error, setError] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/projetos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/projetos')
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Erro ao criar projeto.')
    }
  }

  return (
    <div className="p-8 max-w-lg space-y-6">
      <h1 className="text-3xl font-bold">Novo Projeto</h1>
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <label>
          <span className="font-medium">Título *</span>
          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded"
          />
        </label>

        <label>
          <span className="font-medium">Descrição</span>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded"
          />
        </label>

        <label>
          <span className="font-medium">Nível de Dificuldade *</span>
          <select
            name="nivel_dificuldade"
            value={form.nivel_dificuldade}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded"
          >
            <option>Básico</option>
            <option>Intermediário</option>
            <option>Avançado</option>
          </select>
        </label>

        <label>
          <span className="font-medium">Empresa (ID) *</span>
          <input
            name="empresa_id"
            value={form.empresa_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded"
          />
        </label>

        <label>
          <span className="font-medium">Instituição (ID) *</span>
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
          Salvar
        </button>
      </form>
    </div>
  )
}
