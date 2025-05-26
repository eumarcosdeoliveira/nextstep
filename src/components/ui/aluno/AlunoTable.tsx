'use client'
import React from 'react'
import Link from 'next/link'
import { Aluno } from '@/types/aluno'

interface AlunoTableProps {
  alunos: Aluno[]
}

export default function AlunoTable({ alunos }: AlunoTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">E-mail</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Matrícula</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nível</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instituição ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {alunos.map((al) => (
            <tr key={al.id}>
              <td className="px-6 py-4 whitespace-nowrap">{al.nome}</td>
              <td className="px-6 py-4 whitespace-nowrap">{al.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{al.matricula}</td>
              <td className="px-6 py-4 whitespace-nowrap">{al.nivel_instrucao}</td>
              <td className="px-6 py-4 whitespace-nowrap">{al.instituicao_id}</td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                <Link href={`/alunos/${al.id}/edit`}>
                  <button className="text-blue-600 hover:text-blue-800">Editar</button>
                </Link>
                <Link href={`/alunos/${al.id}`}>
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
