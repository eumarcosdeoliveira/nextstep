'use client'
import React from 'react'
import Link from 'next/link'
import { Projeto } from '@/types/projeto'

interface ProjetoTableProps {
  projetos: Projeto[]
}

export default function ProjetoTable({ projetos }: ProjetoTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dificuldade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Empresa ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instituição ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Criado em</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projetos.map((proj) => (
            <tr key={proj.id}>
              <td className="px-6 py-4 whitespace-nowrap">{proj.titulo}</td>
              <td className="px-6 py-4 whitespace-nowrap">{proj.nivel_dificuldade}</td>
              <td className="px-6 py-4 whitespace-nowrap">{proj.empresa_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{proj.instituicao_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(proj.data_criacao).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                <Link href={`/projetos/${proj.id}/edit`}>
                  <button className="text-blue-600 hover:text-blue-800">Editar</button>
                </Link>
                <Link href={`/projetos/${proj.id}`}>
                  <button className="text-gray-600 hover:text-gray-800">Ver</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
