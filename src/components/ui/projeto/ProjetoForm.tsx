'use client'

import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
// Alternativa: usando import padrão se as funções não estão nomeadas
import * as empresaService from '@/services/empresa.service'
import * as areaService from '@/services/area.service'
import type { Empresa } from '@/types/empresa'
import type { Area } from '@/types/area'

export interface ProjetoFormValues {
  titulo: string
  descricao: string
  nivel_dificuldade: 'Básico' | 'Intermediário' | 'Avançado'
  empresaId: number
  areaId: number
}

interface Props {
  initialValues?: Partial<ProjetoFormValues>
  onSave(values: ProjetoFormValues): void
  submitLabel?: string
}

export default function ProjetoForm({
  initialValues = {},
  onSave,
  submitLabel = 'Salvar',
}: Props) {
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [areas, setAreas] = useState<Area[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<ProjetoFormValues>({
    titulo:              initialValues.titulo              ?? '',
    descricao:           initialValues.descricao           ?? '',
    nivel_dificuldade:   initialValues.nivel_dificuldade   ?? 'Básico',
    empresaId:           initialValues.empresaId           ?? 0,
    areaId:              initialValues.areaId              ?? 0,
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [empresasList, areasList] = await Promise.all([
          empresaService.getAllEmpresas(),
          areaService.getAllAreas()
        ])
        setEmpresas(empresasList)
        setAreas(areasList)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]:
        name === 'empresaId' || name === 'areaId'
          ? Number(value)
          : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validação básica
    if (form.empresaId === 0 || form.areaId === 0) {
      alert('Por favor, selecione uma empresa e uma área')
      return
    }
    
    onSave(form)
  }

  if (loading) {
    return <div className="text-center py-4">Carregando...</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Título */}
      <div>
        <label htmlFor="titulo" className="block mb-1 font-medium">
          Título *
        </label>
        <Input
          id="titulo"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          required
        />
      </div>

      {/* Descrição */}
      <div>
        <label htmlFor="descricao" className="block mb-1 font-medium">
          Descrição
        </label>
        <Textarea
          id="descricao"
          name="descricao"
          rows={4}
          value={form.descricao}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      {/* Nível de Dificuldade */}
      <div>
        <label htmlFor="nivel_dificuldade" className="block mb-1 font-medium">
          Nível de Dificuldade *
        </label>
        <Select
          id="nivel_dificuldade"
          name="nivel_dificuldade"
          value={form.nivel_dificuldade}
          onChange={handleChange}
          className="w-full"
          required
        >
          <option value="Básico">Básico</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </Select>
      </div>

      {/* Empresa */}
      <div>
        <label htmlFor="empresaId" className="block mb-1 font-medium">
          Empresa *
        </label>
        <Select
          id="empresaId"
          name="empresaId"
          value={String(form.empresaId)}
          onChange={handleChange}
          className="w-full"
          required
        >
          <option value="0" disabled>
            Selecione uma empresa
          </option>
          {empresas.map(e => (
            <option key={e.id} value={e.id}>
              {e.nome}
            </option>
          ))}
        </Select>
      </div>

      {/* Área */}
      <div>
        <label htmlFor="areaId" className="block mb-1 font-medium">
          Área *
        </label>
        <Select
          id="areaId"
          name="areaId"
          value={String(form.areaId)}
          onChange={handleChange}
          className="w-full"
          required
        >
          <option value="0" disabled>
            Selecione uma área
          </option>
          {areas.map(a => (
            <option key={a.id} value={a.id}>
              {a.nome}
            </option>
          ))}
        </Select>
      </div>

      {/* Botão Salvar */}
      <div className="pt-4">
        <Button type="submit" fullWidth>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}