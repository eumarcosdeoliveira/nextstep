// src/components/ui/avaliacao/AvaliacaoForm.tsx
'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { getAllAlunos } from '@/services/aluno.service'
import { getAllProjetos } from '@/services/projeto.service'
import type { Aluno } from '@/types/aluno'

// Interface mínima para projetos (apenas o necessário para o dropdown)
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
  onCancel(): void
}

export default function AvaliacaoForm({
  initialValues = {},
  onSave,
  onCancel,
}: Props) {
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [projetos, setProjetos] = useState<ProjetoMinimal[]>([])
  const [form, setForm] = useState<AvaliacaoFormValues>({
    alunoId: initialValues.alunoId ?? 0,
    projetoId: initialValues.projetoId ?? 0,
    nota: initialValues.nota ?? 0,
    feedback: initialValues.feedback ?? '',
    avaliadorNome: initialValues.avaliadorNome ?? '',
  })

  useEffect(() => {
    getAllAlunos().then(setAlunos)
    getAllProjetos().then((projetoOptions) => {
      // Transformar ProjetoOption[] em ProjetoMinimal[]
      const projetosFormatados = projetoOptions.map(projeto => ({
        id: projeto.id,
        titulo: (projeto as any).nome || (projeto as any).title || (projeto as any).label || `Projeto ${projeto.id}`, // Ajuste conforme a propriedade correta
      }))
      setProjetos(projetosFormatados)
    })
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
        name === 'nota' || name === 'alunoId' || name === 'projetoId'
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
          id="alunoId"
          name="alunoId"
          value={form.alunoId}
          onChange={handleChange}
          className="w-full"
          required
        >
          <option value={0} disabled>
            Selecione um aluno
          </option>
          {alunos.map(a => (
            <option key={a.id} value={a.id}>
              {a.nome}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Projeto</label>
        <Select
          id="projetoId"
          name="projetoId"
          value={form.projetoId}
          onChange={handleChange}
          className="w-full"
          required
        >
          <option value={0} disabled>
            Selecione um projeto
          </option>
          {projetos.map(p => (
            <option key={p.id} value={p.id}>
              {p.titulo}
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
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  )
}