'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateAlunoPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    nome: '',
    email: '',
    matricula: '',
    nivel_instrucao: 'Graduação',
    instituicao_id: '',
  })
  const [error, setError] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const payload = {
      ...form,
      data_cadastro: new Date().toISOString(),
    }
    const res = await fetch('/api/alunos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      router.push('/alunos')
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Erro ao criar aluno.')
    }
  }

  return (
    <div className="p-8 max-w-lg space-y-6">
      <h1 className="text-3xl font-bold">Novo Aluno</h1>
      {error && <p className="text-red-600">{error}</p>}

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
              value={form[name as keyof typeof form]}
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
          Salvar
        </button>
      </form>
    </div>
  )
}
