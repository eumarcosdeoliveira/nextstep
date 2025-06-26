'use client'

import React from 'react'
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
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aluno</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Projeto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nota</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avaliador</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {avaliacoes.map((av) => (
            <tr key={av.id}>
              <td className="px-6 py-4 whitespace-nowrap">{av.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{av.aluno.nome}</td>
              <td className="px-6 py-4 whitespace-nowrap">{av.projeto.titulo}</td>
              <td className="px-6 py-4 whitespace-nowrap">{av.nota.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{av.avaliador_nome}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(av.data_avaliacao).toLocaleDateString('pt-BR')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                <button
                  onClick={() => onEdit(av)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(av.id)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}