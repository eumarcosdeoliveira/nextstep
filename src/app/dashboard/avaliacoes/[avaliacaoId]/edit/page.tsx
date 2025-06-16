'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface FormState {
  id: number
  aluno_id: number
  projeto_id: number
  nota: number
  feedback: string | null
  avaliador_nome: string | null
}

export default function EditAvaliacaoPage() {
  const router = useRouter()
  const { avaliacaoId } = useParams()
  const [form, setForm] = useState<FormState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // 1) Carrega a avaliação existente em snake_case
  useEffect(() => {
    if (!avaliacaoId) return
    fetch(`/api/avaliacoes/${avaliacaoId}`, { cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error('Não encontrada')
        return res.json()
      })
      .then((data: FormState & { data_avaliacao: string }) => {
        // descarta data_avaliacao
        const { data_avaliacao, ...rest } = data
        setForm(rest)
      })
      .catch(() => setError('Falha ao carregar avaliação.'))
      .finally(() => setLoading(false))
  }, [avaliacaoId])

  // 2) Manipula mudança de qualquer campo
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (!form) return
    const { name, value } = e.target
    setForm(prev => prev && ({
      ...prev,
      [name]:
        name === 'aluno_id' || name === 'projeto_id' || name === 'nota'
          ? Number(value)
          : value,
    }))
  }

  // 3) Envia o PUT já em snake_case
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form || !avaliacaoId) return

    setError('')
    const { id, ...payload } = form

    const res = await fetch(`/api/avaliacoes/${avaliacaoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push(`/dashboard/avaliacoes/${avaliacaoId}`)
    } else {
      const json = await res.json().catch(() => ({}))
      setError(json.error || 'Erro ao atualizar avaliação.')
    }
  }

  if (loading) return <p className="p-8">Carregando...</p>
  if (error)   return <p className="p-8 text-red-600">{error}</p>
  if (!form)   return null

  return (
    <div className="p-8 max-w-lg space-y-6">
      <h1 className="text-3xl font-bold">Editar Avaliação #{form.id}</h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="block">
          <span className="font-medium">Aluno ID *</span>
          <input
            name="aluno_id"
            type="number"
            value={form.aluno_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded"
          />
        </label>

        <label className="block">
          <span className="font-medium">Projeto ID *</span>
          <input
            name="projeto_id"
            type="number"
            value={form.projeto_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded"
          />
        </label>

        <label className="block">
          <span className="font-medium">Nota *</span>
          <input
            name="nota"
            type="number"
            step="0.01"
            value={form.nota.toString()}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded"
          />
        </label>

        <label className="block">
          <span className="font-medium">Feedback</span>
          <textarea
            name="feedback"
            value={form.feedback || ''}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded"
          />
        </label>

        <label className="block">
          <span className="font-medium">Avaliador</span>
          <input
            name="avaliador_nome"
            type="text"
            value={form.avaliador_nome || ''}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded"
          />
        </label>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Atualizar
        </button>
      </form>
    </div>
  )
}
