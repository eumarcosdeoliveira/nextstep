'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { del } from '@/services/api'
import { Instituicao } from '@/types/instituicao'
import InstituicaoTable from './InstituicaoTable'

interface Props {
  data: Instituicao[]
}

export default function InstituicoesClient({ data }: Props) {
  const router = useRouter()

  const handleEdit = (inst: Instituicao) => {
    router.push(`/instituicoes/${inst.id}/edit`)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Confirmar exclusão?')) return
    await del(`/api/instituicoes/${id}`)
    router.refresh()
  }

  return (
    <InstituicaoTable
      data={data}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}
