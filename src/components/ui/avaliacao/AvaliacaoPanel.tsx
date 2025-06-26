'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import AvaliacaoTable from './AvaliacaoTable'
import AvaliacaoForm, { AvaliacaoFormValues } from './AvaliacaoForm'
import {
  getAllAvaliacoes,
  createAvaliacao,
  updateAvaliacao,
  deleteAvaliacao,
} from '@/services/avaliacao.service'
import { Avaliacao } from '@/types/avaliacao'

export default function AvaliacaoPanel() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([])
  const [editing, setEditing] = useState<Avaliacao | null>(null)
  const [showForm, setShowForm] = useState(false)

  // carrega lista
  const fetchList = async () => {
    const list = await getAllAvaliacoes()
    setAvaliacoes(list)
  }

  useEffect(() => {
    fetchList()
  }, [])

  // salvar (create ou update)
  const handleSave = async (data: AvaliacaoFormValues) => {
    if (editing) {
      await updateAvaliacao(editing.id, data)
    } else {
      await createAvaliacao(data)
    }
    setShowForm(false)
    setEditing(null)
    fetchList()
  }

  // cancelar formulário
  const handleCancel = () => {
    setShowForm(false)
    setEditing(null)
  }

  // editar
  const handleEdit = (av: Avaliacao) => {
    setEditing(av)
    setShowForm(true)
  }

  // deletar
  const handleDelete = async (id: number) => {
    if (confirm('Confirma exclusão desta avaliação?')) {
      await deleteAvaliacao(id)
      fetchList()
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Avaliações</h2>
        <Button onClick={() => setShowForm(true)}>Nova Avaliação</Button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              {editing ? 'Editar Avaliação' : 'Nova Avaliação'}
            </h3>
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
          </div>
          <AvaliacaoForm
            initialValues={
              editing
                ? {
                    ...editing,
                    feedback: editing.feedback ?? undefined,
                  }
                : undefined
            }
            onSave={handleSave}
          />
        </div>
      )}

      <AvaliacaoTable
        avaliacoes={avaliacoes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}