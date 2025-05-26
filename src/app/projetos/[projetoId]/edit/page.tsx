'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Projeto } from '@/types/projeto'

export default function EditProjetoPage() {
  const router = useRouter()
  const { projetoId } = useParams()
  const [form, setForm] = useState<Projeto | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!projetoId) return
    fetch(`/api/projetos/${projetoId}`)
      .then(res => {
        if (!res.ok) throw new Error('Não encontrado')
        return res.json()
      })
      .then(data => setForm(data))
      .catch(() => setError('Falha ao carregar projeto.'))
  }, [projetoId])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    if (!form) return
    setForm({ ...form, [e.target.name]: e.target.value } as Projeto)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!projetoId || !form) return
    setError('')
    const res = await fetch(`/api/projetos/${projetoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push(`/projetos/${projetoId}`)
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Erro ao atualizar projeto.')
    }
  }

  if (error) return <p className="p-8 text-red-600">{error}</p>
  if (!form) return <p className="p-8">Carregando...</p>

  return (
    <div className="p-8 max-w-lg space-y-6">
      <h1 className="text-3xl font-bold">Editar Projeto</h1>

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
            value={form.descricao ?? ''}
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
          Atualizar
        </button>
      </form>
    </div>
  )
}
