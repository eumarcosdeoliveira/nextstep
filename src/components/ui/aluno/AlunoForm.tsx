'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Instituicao } from '@/types/instituicao'

export interface AlunoFormData {
  nome: string
  email: string
  matricula: string
  nivel_instrucao: string
  instituicao_id: number
}

interface AlunoFormProps {
  initialData?: Partial<AlunoFormData>
  instituicoes: Instituicao[]
  onSubmit(data: AlunoFormData): void
  submitLabel?: string
}

export default function AlunoForm({
  initialData = {},
  instituicoes,
  onSubmit,
  submitLabel = 'Salvar',
}: AlunoFormProps) {
  const [form, setForm] = useState<AlunoFormData>({
    nome: initialData.nome ?? '',
    email: initialData.email ?? '',
    matricula: initialData.matricula ?? '',
    nivel_instrucao: initialData.nivel_instrucao ?? 'Graduação',
    instituicao_id: initialData.instituicao_id ?? 0,
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setForm((f) => ({
      ...f,
      [name]:
        name === 'instituicao_id'
          ? Number(value)
          : value,
    } as any))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="nome" className="block mb-1 font-medium">
          Nome *
        </label>
        <Input
          id="nome"
          name="nome"
          placeholder="Digite o nome completo"
          value={form.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          E-mail *
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="matricula" className="block mb-1 font-medium">
          Matrícula *
        </label>
        <Input
          id="matricula"
          name="matricula"
          placeholder="00000000"
          value={form.matricula}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="nivel_instrucao" className="block mb-1 font-medium">
          Nível de Instrução *
        </label>
        <Select
          id="nivel_instrucao"
          name="nivel_instrucao"
          value={form.nivel_instrucao}
          onChange={handleChange}
          required
        >
          <option value="Graduação">Graduação</option>
          <option value="Pós">Pós</option>
          <option value="Mestrado">Mestrado</option>
          <option value="Doutorado">Doutorado</option>
        </Select>
      </div>

      <div>
        <label htmlFor="instituicao_id" className="block mb-1 font-medium">
          Instituição de Ensino *
        </label>
        <Select
          id="instituicao_id"
          name="instituicao_id"
          value={String(form.instituicao_id)}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Selecione uma instituição
          </option>
          {instituicoes.map((inst) => (
            <option key={inst.id} value={inst.id}>
              {inst.nome}
            </option>
          ))}
        </Select>
      </div>

      <div className="pt-4">
        <Button type="submit" fullWidth>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
