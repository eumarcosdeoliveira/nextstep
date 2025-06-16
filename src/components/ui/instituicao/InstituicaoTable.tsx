'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { Instituicao } from '@/types/instituicao'

interface Props {
  data: Instituicao[]
  onEdit(item: Instituicao): void
  onDelete(id: number): void
}

export default function InstituicaoTable({ data, onEdit, onDelete }: Props) {
  if (data.length === 0) {
    return <p className="p-4 text-center">Nenhuma instituição cadastrada.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Nome</th>
            <th className="px-4 py-2 text-left">Sigla</th>
            <th className="px-4 py-2 text-left">Tipo</th>
            <th className="px-4 py-2 text-left">Contato</th>
            <th className="px-4 py-2 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((inst) => (
            <tr key={inst.id} className="border-t">
              <td className="px-4 py-2">{inst.id}</td>
              <td className="px-4 py-2">{inst.nome}</td>
              <td className="px-4 py-2">{inst.sigla || '—'}</td>
              <td className="px-4 py-2">{inst.tipo}</td>
              <td className="px-4 py-2">
                {inst.contato_nome}{' '}
                <a
                  href={`mailto:${inst.contato_email}`}
                  className="text-blue-600 hover:underline"
                >
                  ({inst.contato_email})
                </a>
              </td>
              <td className="px-4 py-2 text-right space-x-2">
                <Button
                  
                  variant="outline"
                  onClick={() => onEdit(inst)}
                >
                  Editar
                </Button>
                <Button
                  
                  variant="primary"
                  onClick={() => onDelete(inst.id)}
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
