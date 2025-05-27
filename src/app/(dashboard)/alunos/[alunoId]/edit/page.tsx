'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Aluno } from '@/types/aluno'

export default function EditAlunoPage() {
  const router = useRouter()
  const { alunoId } = useParams()
  const [form, setForm] = useState<Aluno | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!alunoId) return
    fetch(`/api/alunos/${alunoId}`)
      .then(res => {
        if (!res.ok) throw new Error('Não encontrado')
        return res.json()
      })
      .then((data: Aluno) => setForm(data))
      .catch(() => setError('Falha ao carregar aluno.'))
  }, [alunoId])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    if (!form) return
    setForm({ ...form, [e.target.name]: e.target.value } as Aluno)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!alunoId || !form) return
    setError('')
    const payload = {
      ...form,
      data_cadastro: form.data_cadastro,
    }
    const res = await fetch(`/api/alunos/${alunoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      router.push(`/alunos/${alunoId}`)
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Erro ao atualizar aluno.')
    }
  }

  if (error) return <p className="p-8 text-red-600">{error}</p>
  if (!form) return <p className="p-8">Carregando...</p>

  return (
    <div className="p-8 max-w-lg space-y-6">
      <h1 className="text-3xl font-bold">Editar Aluno</h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        {[
          { name: 'nome', label: 'Nome *', type: 'text' },
          { name: 'email', label: 'E-mail *', type: 'email' },
          { name: 'matricula', label: 'Matrícula *', type: 'text' },
        ].map(({ name, label, type }) => (
          <label key={name} className="block">
            <span className="font-medium">{label}</span>
            <input
              name={name}
              type={type}
              value={(form as any)[name] ?? ''}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded"
            />
          </label>
        ))}

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
            type="text"
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
