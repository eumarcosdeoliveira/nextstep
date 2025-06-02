'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateInstituicaoPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    nome: '',
    sigla: '',
    tipo: 'Pública',
    endereco: '',
    contato_nome: '',
    contato_email: '',
    telefone: '',
    site: '',
  })
  const [error, setError] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/instituicoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/instituicoes')
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Erro ao criar instituição.')
    }
  }

  return (
    <div className="p-8 max-w-lg space-y-6">
      <h1 className="text-3xl font-bold">Nova Instituição</h1>
      {error && <p className="text-red-600">{error}</p>}

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
            value={form.sigla}
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
            value={form.endereco}
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
            type="email"
            name="contato_email"
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
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Salvar
        </button>
      </form>
    </div>
  )
}
