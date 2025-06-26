'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'

interface Modulo {
  id?: number
  titulo: string
  descricao: string
  ordem: number
  duracao_estim: string
}

interface ProjetoForm {
  titulo: string
  descricao: string
  nivel_dificuldade: string
  areaId: string
  modulos: Modulo[]
}

export default function EditProjetoPage() {
  const router = useRouter()
  const params = useParams()
  const projetoId = params['projetos-recebidosid'] as string
  
  const [form, setForm] = useState<ProjetoForm>({
    titulo: '',
    descricao: '',
    nivel_dificuldade: 'Básico',
    areaId: '',
    modulos: [],
  })
  const [areas, setAreas] = useState<{ id: number; nome: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Carrega dados do projeto e áreas
  useEffect(() => {
    if (!projetoId) return
    
    async function fetchData() {
      try {
        const [areasRes, projetoRes] = await Promise.all([
          fetch('/api/areas'),
          fetch(`/api/projetos/${projetoId}`)
        ])
        
        if (!areasRes.ok || !projetoRes.ok) {
          throw new Error('Erro ao carregar dados')
        }
        
        const areasData = await areasRes.json()
        const projetoData = await projetoRes.json()
        
        setAreas(areasData)
        setForm({
          titulo: projetoData.titulo,
          descricao: projetoData.descricao,
          nivel_dificuldade: projetoData.nivel_dificuldade,
          areaId: projetoData.area_id?.toString() || '',
          modulos: projetoData.modulo || []
        })
      } catch (err) {
        setError('Erro ao carregar dados do projeto')
        console.error(err)
      }
    }
    
    fetchData()
  }, [projetoId])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleModuloChange(index: number, field: keyof Modulo, value: string) {
    setForm(f => ({
      ...f,
      modulos: f.modulos.map((m, i) =>
        i === index ? { ...m, [field]: field === 'ordem' ? Number(value) : value } : m
      )
    }))
  }

  function addModulo() {
    setForm(f => ({
      ...f,
      modulos: [...f.modulos, {
        titulo: '',
        descricao: '',
        ordem: f.modulos.length + 1,
        duracao_estim: ''
      }]
    }))
  }

  function removeModulo(index: number) {
    setForm(f => ({
      ...f,
      modulos: f.modulos.filter((_, i) => i !== index).map((m, i) => ({ ...m, ordem: i + 1 }))
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!projetoId) return
    
    setLoading(true)
    setError('')
    
    try {
      const res = await fetch(`/api/projetos/${projetoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      
      if (res.ok) {
        router.push('/dashboard/projetos')
      } else {
        const data = await res.text()
        setError(data || 'Erro ao atualizar projeto.')
      }
    } catch (err) {
      setError('Erro ao atualizar projeto.')
      console.error(err)
    }
    
    setLoading(false)
  }

  async function handleDelete() {
    if (!projetoId || !confirm('Deseja realmente excluir este projeto?')) return
    
    setLoading(true)
    
    try {
      const res = await fetch(`/api/projetos/${projetoId}`, {
        method: 'DELETE'
      })
      
      if (res.ok) {
        router.push('/dashboard/projetos')
      } else {
        const data = await res.text()
        setError(data || 'Erro ao excluir projeto.')
      }
    } catch (err) {
      setError('Erro ao excluir projeto.')
      console.error(err)
    }
    
    setLoading(false)
  }

  if (!projetoId) {
    return <div className="p-6">Carregando...</div>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Projeto</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <label>
          <span className="font-medium">Título</span>
          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
            className="block w-full border rounded mt-1 px-3 py-2"
          />
        </label>

        <label>
          <span className="font-medium">Descrição</span>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className="block w-full border rounded mt-1 px-3 py-2"
            rows={4}
          />
        </label>

        <label>
          <span className="font-medium">Nível de Dificuldade</span>
          <select
            name="nivel_dificuldade"
            value={form.nivel_dificuldade}
            onChange={handleChange}
            className="block w-full border rounded mt-1 px-3 py-2"
          >
            <option>Básico</option>
            <option>Intermediário</option>
            <option>Avançado</option>
          </select>
        </label>

        <label>
          <span className="font-medium">Área</span>
          <select
            name="areaId"
            value={form.areaId}
            onChange={handleChange}
            required
            className="block w-full border rounded mt-1 px-3 py-2"
          >
            <option value="">Selecione</option>
            {areas.map(area => (
              <option key={area.id} value={area.id}>{area.nome}</option>
            ))}
          </select>
        </label>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">Módulos</h2>
            <Button type="button" variant="outline" onClick={addModulo}>+ Adicionar</Button>
          </div>

          {form.modulos.map((mod, index) => (
            <div key={index} className="grid gap-3 border p-4 rounded bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Módulo {index + 1}</span>
                <span className="text-xs text-gray-500">Ordem: {mod.ordem}</span>
              </div>
              <input
                placeholder="Título"
                value={mod.titulo}
                onChange={e => handleModuloChange(index, 'titulo', e.target.value)}
                className="border rounded px-3 py-2"
              />
              <textarea
                placeholder="Descrição"
                value={mod.descricao}
                onChange={e => handleModuloChange(index, 'descricao', e.target.value)}
                className="border rounded px-3 py-2"
                rows={3}
              />
              <input
                placeholder="Duração estimada (ex: 2h)"
                value={mod.duracao_estim}
                onChange={e => handleModuloChange(index, 'duracao_estim', e.target.value)}
                className="border rounded px-3 py-2"
              />
              <Button 
                type="button" 
                variant="outline" 
                className="text-red-600 hover:bg-red-50" 
                onClick={() => removeModulo(index)}
              >
                Remover Módulo
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 pt-6 border-t">
          <Button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="text-red-600 hover:bg-red-50" 
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Excluindo...' : 'Excluir Projeto'}
          </Button>
        </div>
      </form>
    </div>
  )
}