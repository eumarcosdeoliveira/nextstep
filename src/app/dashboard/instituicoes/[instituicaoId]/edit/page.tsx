'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Instituicao } from '@/types/instituicao'

type FormData = Omit<Instituicao, 'id'>

export default function EditInstituicaoPage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.instituicaoId)
  const [form, setForm] = useState<FormData>({
    nome: '',
    sigla: '',
    tipo: 'Pública',
    endereco: '',
    contato_nome: '',
    contato_email: '',
    telefone: '',
    site: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 1) Carrega os dados iniciais
  useEffect(() => {
    if (!id) {
      setError('ID inválido')
      setLoading(false)
      return
    }

    fetch(`/api/instituicoes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Instituição não encontrada')
        return res.json()
      })
      .then((data: Instituicao) => {
        // desmonta o objeto para tirar o `id`
        const { id: _, ...rest } = data
        setForm(rest)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  // 2) Atualiza o estado do form
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  // 3) Submete o PUT sem o `id` no body
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch(`/api/instituicoes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form), // só os campos editáveis
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Erro ao atualizar instituição.')
      }

      router.push(`/instituicoes/${id}`)
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) return <p className="p-8">Carregando...</p>
  if (error) return <p className="p-8 text-red-600">{error}</p>

  return (
    <div className="p-8 max-w-lg space-y-6">
      <h1 className="text-3xl font-bold">Editar Instituição</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* Mesmos inputs que você já tem, todos controlados por `form` */}
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
        {/* …os outros campos (sigla, tipo, etc.) */}
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
