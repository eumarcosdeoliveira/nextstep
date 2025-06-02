'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Avaliacao } from '@/types/avaliacao'

export default function EditAvaliacaoPage() {
  const router = useRouter()
  const { avaliacaoId } = useParams()
  const [form, setForm] = useState<Omit<Avaliacao, 'data_avaliacao'> | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!avaliacaoId) return
    fetch(`/api/avaliacoes/${avaliacaoId}`)
      .then(res => {
        if (!res.ok) throw new Error('Não encontrada')
        return res.json()
      })
      .then((data: Avaliacao) => {
        // Aqui extraímos apenas o timestamp,
        // mantendo 'id' e os demais campos em 'rest'
        const { data_avaliacao, ...rest } = data
        setForm(rest)
      })
      .catch(() => setError('Falha ao carregar avaliação.'))
  }, [avaliacaoId])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (!form) return
    setForm({ ...form, [e.target.name]: e.target.value } as any)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!avaliacaoId || !form) return
    setError('')
    const payload = {
      ...form,
      aluno_id: Number(form.aluno_id),
      projeto_id: Number(form.projeto_id),
      nota: parseFloat(String(form.nota)),
      feedback: form.feedback || null,
      avaliador_nome: form.avaliador_nome || null,
    }
    const res = await fetch(`/api/avaliacoes/${avaliacaoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      router.push(`/avaliacoes/${avaliacaoId}`)
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Erro ao atualizar avaliação.')
    }
  }

  if (error) return <p className="p-8 text-red-600">{error}</p>
  if (!form) return <p className="p-8">Carregando...</p>

  return (
    <div className="p-8 max-w-lg space-y-6">
      <h1 className="text-3xl font-bold">Editar Avaliação</h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="block">
          <span className="font-medium">Aluno ID *</span>
          <input
            name="aluno_id"
            type="number"
            value={String(form.aluno_id)}
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
            value={String(form.projeto_id)}
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
            value={String(form.nota)}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded"
          />
        </label>

        <label className="block">
          <span className="font-medium">Feedback</span>
          <textarea
            name="feedback"
            value={form.feedback ?? ''}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded"
          />
        </label>

        <label className="block">
          <span className="font-medium">Avaliador</span>
          <input
            name="avaliador_nome"
            type="text"
            value={form.avaliador_nome ?? ''}
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
