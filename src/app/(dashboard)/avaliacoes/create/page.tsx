'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateAvaliacaoPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    aluno_id: '',
    projeto_id: '',
    nota: '',
    feedback: '',
    avaliador_nome: '',
  })
  const [error, setError] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const payload = {
      aluno_id: Number(form.aluno_id),
      projeto_id: Number(form.projeto_id),
      nota: parseFloat(form.nota),
      feedback: form.feedback || null,
      avaliador_nome: form.avaliador_nome || null,
    }
    const res = await fetch('/api/avaliacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      router.push('/avaliacoes')
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Erro ao criar avaliação.')
    }
  }

  return (
    <div className="p-8 max-w-lg space-y-6">
      <h1 className="text-3xl font-bold">Nova Avaliação</h1>
      {error && <p className="text-red-600">{error}</p>}

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
            value={form.nota}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded"
          />
        </label>

        <label className="block">
          <span className="font-medium">Feedback</span>
          <textarea
            name="feedback"
            value={form.feedback}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded"
          />
        </label>

        <label className="block">
          <span className="font-medium">Avaliador</span>
          <input
            name="avaliador_nome"
            type="text"
            value={form.avaliador_nome}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded"
          />
        </label>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Salvar
        </button>
      </form>
    </div>
  )
}
