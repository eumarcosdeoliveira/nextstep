// src/components/avaliacao/AvaliacoesClient.tsx
'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { del } from '@/services/api'
import { Avaliacao } from '@/types/avaliacao'
import AvaliacaoTableProps from '@/components/ui/avaliacao/AvaliacaoTable'

interface Props {
  avaliacoes: Avaliacao[]
}

export default function AvaliacoesClient({ avaliacoes }: Props) {
  const router = useRouter()

  const handleEdit = (item: Avaliacao) => {
    router.push(`/avaliacoes/${item.id}/edit`)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta avaliação?')) return
    await del<void>(`/api/avaliacoes/${id}`)
    router.refresh()
  }

  return (
    <AvaliacaoTableProps
      avaliacoes={avaliacoes}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}
