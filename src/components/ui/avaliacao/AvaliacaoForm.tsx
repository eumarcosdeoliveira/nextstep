// src/components/ui/avaliacao/AvaliacaoForm.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { getAllAlunos, AlunoOption } from '@/services/aluno.service'
import { getAllProjetos, ProjetoOption } from '@/services/projeto.service'

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
  onCancel(): void
}

export default function AvaliacaoForm({
  initialValues = {},
  onSave,
  onCancel,
}: Props) {
  const [alunos, setAlunos] = useState<AlunoOption[]>([])
  const [projetos, setProjetos] = useState<ProjetoOption[]>([])
  const [form, setForm] = useState<AvaliacaoFormValues>({
    alunoId: initialValues.alunoId ?? 0,
    projetoId: initialValues.projetoId ?? 0,
    nota: initialValues.nota ?? 0,
    feedback: initialValues.feedback ?? '',
    avaliadorNome: initialValues.avaliadorNome ?? '',
  })

  useEffect(() => {
    getAllAlunos().then(setAlunos)
    getAllProjetos().then(setProjetos)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'nota' || name.endsWith('Id')
          ? Number(value)
          : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Aluno</label>
        <Select
          name="alunoId"
          value={form.alunoId}
          onChange={handleChange}
          className="w-full"
        >
          <option value={0} disabled>
            Selecione um aluno
          </option>
          {alunos.map((a) => (
            <option key={a.id} value={a.id}>
              {a.label}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Projeto</label>
        <Select
          name="projetoId"
          value={form.projetoId}
          onChange={handleChange}
          className="w-full"
        >
          <option value={0} disabled>
            Selecione um projeto
          </option>
          {projetos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Nota</label>
        <Input
          type="number"
          name="nota"
          step="0.01"
          value={form.nota}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Feedback</label>
        <Textarea
          name="feedback"
          rows={4}
          value={form.feedback}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Avaliador</label>
        <Input
          type="text"
          name="avaliadorNome"
          value={form.avaliadorNome}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
)
}
