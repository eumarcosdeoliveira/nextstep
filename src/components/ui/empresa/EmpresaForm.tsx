// src/components/ui/empresa/EmpresaForm.tsx
'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export interface EmpresaFormValues {
  nome: string
  cnpj: string
  setor: string
  contato_nome: string
  contato_email: string
  telefone?: string
  site?: string
}

interface Props {
  initialValues?: Partial<EmpresaFormValues>
  onSave(values: EmpresaFormValues): void
  submitLabel?: string
}

export default function EmpresaForm({
  initialValues = {},
  onSave,
  submitLabel = 'Salvar',
}: Props) {
  const [form, setForm] = useState<EmpresaFormValues>({
    nome:           initialValues.nome           ?? '',
    cnpj:           initialValues.cnpj           ?? '',
    setor:          initialValues.setor          ?? '',
    contato_nome:   initialValues.contato_nome   ?? '',
    contato_email:  initialValues.contato_email  ?? '',
    telefone:       initialValues.telefone       ?? '',
    site:           initialValues.site           ?? '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
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
          value={form.nome}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="cnpj" className="block mb-1 font-medium">
          CNPJ *
        </label>
        <Input
          id="cnpj"
          name="cnpj"
          value={form.cnpj}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="setor" className="block mb-1 font-medium">
          Setor *
        </label>
        <Input
          id="setor"
          name="setor"
          value={form.setor}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="contato_nome" className="block mb-1 font-medium">
          Contato *
        </label>
        <Input
          id="contato_nome"
          name="contato_nome"
          value={form.contato_nome}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="contato_email" className="block mb-1 font-medium">
          E-mail *
        </label>
        <Input
          id="contato_email"
          name="contato_email"
          type="email"
          value={form.contato_email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="telefone" className="block mb-1 font-medium">
          Telefone
        </label>
        <Input
          id="telefone"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="site" className="block mb-1 font-medium">
          Site
        </label>
        <Input
          id="site"
          name="site"
          value={form.site}
          onChange={handleChange}
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
