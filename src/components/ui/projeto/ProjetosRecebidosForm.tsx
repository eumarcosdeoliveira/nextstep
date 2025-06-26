'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

type Props = {
  initial?: {
    projeto_id: number
    instituicao_id: number
    turma_id: number
    data_inicio: string
    progresso: number
  }
}

export default function ProjetosRecebidosForm({ initial }: Props) {
  const router = useRouter()
  const [form, setForm] = useState(initial || {
    projeto_id: 1,
    instituicao_id: 1,
    turma_id: 1,
    data_inicio: '',
    progresso: 0
  })
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: name === 'progresso' ? Number(value) : value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    await fetch('/api/projetos-ie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    router.push('/dashboard/projetos-recebidos')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <label className="block">
        <span className="text-sm font-medium">Data de Início</span>
        <input
          type="date"
          name="data_inicio"
          value={form.data_inicio}
          onChange={handleChange}
          required
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Progresso (%)</span>
        <input
          type="number"
          name="progresso"
          value={form.progresso}
          onChange={handleChange}
          min={0}
          max={100}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </label>

      <Button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Salvar'}
      </Button>
    </form>
  )
}
