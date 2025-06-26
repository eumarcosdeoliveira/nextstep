// src/components/ui/avaliacao/AvaliacaoForm.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { getAllAlunos } from '@/services/aluno.service'
import { getAllProjetos } from '@/services/projeto.service'
import type { Aluno } from '@/types/aluno'

interface ProjetoMinimal {
  id: number
  titulo: string
}

export interface AvaliacaoFormValues {
  alunoId: number
  projetoId: number
  nota: number
  feedback: string
  avaliadorNome: string
}

interface Props {
  initialValues?: Partial<AvaliacaoFormValues>
  onSave(values: AvaliacaoFormValues): void
  submitLabel?: string
}

export default function AvaliacaoForm({
  initialValues = {},
  onSave,
  submitLabel = 'Salvar',
}: Props) {
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [projetos, setProjetos] = useState<ProjetoMinimal[]>([])
  const [form, setForm] = useState<{
    alunoId: number
    projetoId: number
    nota: string
    feedback: string
    avaliadorNome: string
  }>({
    alunoId:       initialValues.alunoId ?? 0,
    projetoId:     initialValues.projetoId ?? 0,
    nota:          initialValues.nota != null ? String(initialValues.nota) : '',
    feedback:      initialValues.feedback ?? '',
    avaliadorNome: initialValues.avaliadorNome ?? '',
  })

  useEffect(() => {
    getAllAlunos().then(setAlunos)
    getAllProjetos().then((opts: any[]) =>
      setProjetos(
        opts.map(p => ({
          id: p.id,
          titulo:
            (p as any).nome ||
            (p as any).title ||
            (p as any).label ||
            `Projeto ${p.id}`,
        })),
      )
    )
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]:
        name === 'alunoId' || name === 'projetoId'
          ? Number(value)
          : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      alunoId:       form.alunoId,
      projetoId:     form.projetoId,
      nota:          Number(form.nota),
      feedback:      form.feedback,
      avaliadorNome: form.avaliadorNome,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="alunoId" className="block mb-1 font-medium">
          Aluno *
        </label>
        <Select
          id="alunoId"
          name="alunoId"
          value={String(form.alunoId)}
          onChange={handleChange}
          required
          className="w-full"
        >
          <option value="0" disabled>Selecione um aluno</option>
          {alunos.map(a => (
            <option key={a.id} value={a.id}>{a.nome}</option>
          ))}
        </Select>
      </div>

      <div>
        <label htmlFor="projetoId" className="block mb-1 font-medium">
          Projeto *
        </label>
        <Select
          id="projetoId"
          name="projetoId"
          value={String(form.projetoId)}
          onChange={handleChange}
          required
          className="w-full"
        >
          <option value="0" disabled>Selecione um projeto</option>
          {projetos.map(p => (
            <option key={p.id} value={p.id}>{p.titulo}</option>
          ))}
        </Select>
      </div>

      <div>
        <label htmlFor="nota" className="block mb-1 font-medium">
          Nota (0–10) *
        </label>
        <Input
          id="nota"
          name="nota"
          type="number"
          min={0}
          max={10}
          step={1}
          placeholder="Digite de 0 a 10"
          value={form.nota}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="feedback" className="block mb-1 font-medium">
          Feedback
        </label>
        <Textarea
          id="feedback"
          name="feedback"
          rows={4}
          value={form.feedback}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="avaliadorNome" className="block mb-1 font-medium">
          Avaliador
        </label>
        <Input
          id="avaliadorNome"
          name="avaliadorNome"
          placeholder="Nome do avaliador"
          value={form.avaliadorNome}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <div className="pt-4">
        <Button type="submit" fullWidth>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
