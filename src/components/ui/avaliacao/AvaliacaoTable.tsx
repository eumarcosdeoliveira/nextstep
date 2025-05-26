// src/components/ui/avaliacao/AvaliacaoTable.tsx
'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { Avaliacao } from '@/types/avaliacao'

export interface AvaliacaoTableProps {
  avaliacoes: Avaliacao[]
  onEdit(item: Avaliacao): void
  onDelete(id: number): void
}

export default function AvaliacaoTable({
  avaliacoes,
  onEdit,
  onDelete,
}: AvaliacaoTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Aluno</th>
            <th className="px-4 py-2 text-left">Projeto</th>
            <th className="px-4 py-2 text-left">Nota</th>
            <th className="px-4 py-2 text-left">Avaliador</th>
            <th className="px-4 py-2 text-left">Data</th>
            <th className="px-4 py-2 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {avaliacoes.map((av) => (
            <tr key={av.id} className="border-t">
              <td className="px-4 py-2">{av.id}</td>
              <td className="px-4 py-2">{av.aluno.nome}</td>
              <td className="px-4 py-2">{av.projeto.titulo}</td>
              <td className="px-4 py-2">{av.nota.toFixed(2)}</td>
              <td className="px-4 py-2">{av.avaliador_nome}</td>
              <td className="px-4 py-2">
                {new Date(av.data_avaliacao).toLocaleDateString('pt-BR')}
              </td>
              <td className="px-4 py-2 text-right space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(av)}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(av.id)}
                >
                  Deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
