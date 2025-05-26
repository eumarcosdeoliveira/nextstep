'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateEmpresaPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    nome: '',
    cnpj: '',
    setor: '',
    contato_nome: '',
    contato_email: '',
    telefone: '',
    site: '',
  })
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/empresas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/empresas')
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Erro ao criar empresa.')
    }
  }

  return (
    <div className="p-8 max-w-lg space-y-6">
      <h1 className="text-3xl font-bold">Nova Empresa</h1>
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="grid gap-4">
        {[
          { name: 'nome', label: 'Nome *', type: 'text' },
          { name: 'cnpj', label: 'CNPJ *', type: 'text' },
          { name: 'setor', label: 'Setor *', type: 'text' },
          { name: 'contato_nome', label: 'Contato *', type: 'text' },
          { name: 'contato_email', label: 'E-mail *', type: 'email' },
          { name: 'telefone', label: 'Telefone', type: 'text' },
          { name: 'site', label: 'Site', type: 'text' },
        ].map(({ name, label, type }) => (
          <label key={name} className="block">
            <span className="font-medium">{label}</span>
            <input
              name={name}
              type={type}
              value={form[name as keyof typeof form]}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded"
              {...(label.endsWith('*') ? { required: true } : {})}
            />
          </label>
        ))}

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Salvar
        </button>
      </form>
    </div>
  )
}
