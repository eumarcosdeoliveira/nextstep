'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Empresa } from '@/types/empresa'

export default function EditEmpresaPage() {
  const router = useRouter()
  const { empresaId } = useParams()
  const [form, setForm] = useState<Empresa | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!empresaId) return
    fetch(`/api/empresas/${empresaId}`)
      .then(res => {
        if (!res.ok) throw new Error('Não encontrada')
        return res.json()
      })
      .then(data => setForm(data))
      .catch(() => setError('Falha ao carregar empresa.'))
  }, [empresaId])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!form) return
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!empresaId || !form) return
    setError('')
    const res = await fetch(`/api/empresas/${empresaId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push(`/empresas/${empresaId}`)
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Erro ao atualizar empresa.')
    }
  }

  if (error) return <p className="p-8 text-red-600">{error}</p>
  if (!form) return <p className="p-8">Carregando...</p>

  return (
    <div className="p-8 max-w-lg space-y-6">
      <h1 className="text-3xl font-bold">Editar Empresa</h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        {[
          { name: 'nome', label: 'Nome *' },
          { name: 'cnpj', label: 'CNPJ *' },
          { name: 'setor', label: 'Setor *' },
          { name: 'contato_nome', label: 'Contato *' },
          { name: 'contato_email', label: 'E-mail *' },
          { name: 'telefone', label: 'Telefone' },
          { name: 'site', label: 'Site' },
        ].map(({ name, label }) => (
          <label key={name} className="block">
            <span className="font-medium">{label}</span>
            <input
              name={name}
              type={name === 'contato_email' ? 'email' : 'text'}
              value={(form as any)[name] ?? ''}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded"
              {...(label.endsWith('*') ? { required: true } : {})}
            />
          </label>
        ))}

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
