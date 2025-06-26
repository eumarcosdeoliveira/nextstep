'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface ProjetoForm {
  titulo: string
  descricao: string
  nivel_dificuldade: string
  areaId: string
}

interface ModuloForm {
  titulo: string
  descricao: string
  ordem: number
  duracao_estim: string
}

interface Area {
  id: number
  nome: string
}

export default function CreateProjetoPage() {
  const router = useRouter()

  const [form, setForm] = useState<ProjetoForm>({
    titulo: '',
    descricao: '',
    nivel_dificuldade: 'Básico',
    areaId: ''
  })

  const [modulos, setModulos] = useState<ModuloForm[]>([
    { titulo: '', descricao: '', ordem: 1, duracao_estim: '' }
  ])

  const [areas, setAreas] = useState<Area[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/areas')
      .then(res => res.json())
      .then(data => setAreas(data))
      .catch(() => setAreas([]))
  }, [])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleModuloChange(index: number, field: keyof ModuloForm, value: string) {
    setModulos((prev) =>
      prev.map((m, i) =>
        i === index ? { ...m, [field]: field === 'ordem' ? Number(value) : value } : m
      )
    )
  }

  function addModulo() {
    setModulos((prev) => [
      ...prev,
      { titulo: '', descricao: '', ordem: prev.length + 1, duracao_estim: '' }
    ])
  }

  function removeModulo(index: number) {
    setModulos((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/projetos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, modulos }),
    })

    if (res.ok) {
      router.push('/dashboard/projetos')
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Erro ao criar projeto.')
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">Novo Projeto</h1>
        <Link href="/dashboard/projetos">
          <Button variant="outline">Cancelar</Button>
        </Link>
      </header>

      <main className="flex-1 overflow-auto p-6 lg:p-8">
        <section className="max-w-3xl mx-auto p-8 md:p-10">
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="grid gap-6">
            <label>
              <span className="font-medium">Título *</span>
              <input
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded"
              />
            </label>

            <label>
              <span className="font-medium">Descrição</span>
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded"
              />
            </label>

            <label>
              <span className="font-medium">Nível de Dificuldade *</span>
              <select
                name="nivel_dificuldade"
                value={form.nivel_dificuldade}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded"
              >
                <option>Básico</option>
                <option>Intermediário</option>
                <option>Avançado</option>
              </select>
            </label>

            <label>
              <span className="font-medium">Área *</span>
              <select
                name="areaId"
                value={form.areaId}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded"
              >
                <option value="">Selecione uma área</option>
                {areas.map(area => (
                  <option key={area.id} value={area.id}>{area.nome}</option>
                ))}
              </select>
            </label>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Módulos</h3>
                <Button type="button" onClick={addModulo} variant="outline">
                  + Adicionar Módulo
                </Button>
              </div>

              {modulos.map((mod, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded bg-gray-50">
                  <label>
                    <span className="text-sm font-medium">Título</span>
                    <input
                      value={mod.titulo}
                      onChange={(e) => handleModuloChange(i, 'titulo', e.target.value)}
                      required
                      className="w-full mt-1 rounded border"
                    />
                  </label>
                  <label>
                    <span className="text-sm font-medium">Duração Estimada</span>
                    <input
                      value={mod.duracao_estim}
                      onChange={(e) => handleModuloChange(i, 'duracao_estim', e.target.value)}
                      placeholder="ex: 2h, 01:30"
                      className="w-full mt-1 rounded border"
                    />
                  </label>
                  <label className="md:col-span-2">
                    <span className="text-sm font-medium">Descrição</span>
                    <textarea
                      value={mod.descricao}
                      onChange={(e) => handleModuloChange(i, 'descricao', e.target.value)}
                      className="w-full mt-1 rounded border"
                    />
                  </label>
                  <div className="md:col-span-2 text-right">
                    <Button type="button" onClick={() => removeModulo(i)} variant="outline" className="text-red-600">
                      Remover
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button type="submit" disabled={loading} className="mt-4">
              {loading ? 'Salvando…' : 'Salvar Projeto'}
            </Button>
          </form>
        </section>
      </main>
    </div>
  )
}
