// src/app/alunos/page.tsx
import React from 'react'
import Link from 'next/link'
import { Aluno } from '@/types/aluno'
import { getAllAlunos } from '@/services/aluno.service'
import AlunoTable from '@/components/ui/aluno/AlunoTable'

export const metadata = {
  title: 'Alunos – NextStep',
  description: 'Lista de alunos cadastrados no NextStep',
}

export default async function AlunosPage() {
  // 1. Busca todos os alunos via serviço (server-side)
  const alunos: Aluno[] = await getAllAlunos()

  return (
    <main className="flex-1 p-8 bg-gray-50 min-h-screen">
      {/* Cabeçalho da página */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Alunos</h1>
        <Link
          href="/alunos/create"
          className="inline-block bg-gradient-to-r from-blue-600 to-green-400 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition-opacity"
        >
          + Novo Aluno
        </Link>
      </div>

      {/* Card branco contendo a tabela */}
      <div className="bg-white rounded-2xl shadow p-6">
        {alunos.length > 0 ? (
          <AlunoTable alunos={alunos} />
        ) : (
          <p className="text-gray-600 text-center py-10">
            Não há alunos cadastrados.
          </p>
        )}
      </div>
    </main>
  )
}
