// src/app/dashboard/alunos/[alunoId]/page.tsx

import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'

/**
 * No Next.js 15+, o objeto params nas páginas do App Router
 * é passado como Promise<{ alunoId: string }>.
 */
interface PageProps {
  params: Promise<{ alunoId: string }>
}

export default async function AlunoDashboardPage({ params }: PageProps) {
  // aguardamos a resolução de params para extrair o alunoId
  const { alunoId } = await params
  const id = Number(alunoId)

  // busca direta no banco (server component)
  const aluno = await prisma.aluno.findUnique({ where: { id } })

  // se não encontrado, renderiza 404
  if (!aluno) {
    notFound()
  }

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{aluno.nome}</h1>
        <Link href="/dashboard/alunos">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            ← Voltar
          </button>
        </Link>
      </header>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-gray-700">
        <div>
          <dt className="font-semibold">E-mail</dt>
          <dd>{aluno.email}</dd>
        </div>
        <div>
          <dt className="font-semibold">Matrícula</dt>
          <dd>{aluno.matricula}</dd>
        </div>
        <div>
          <dt className="font-semibold">Nível de Instrução</dt>
          <dd>{aluno.nivel_instrucao}</dd>
        </div>
        <div>
          <dt className="font-semibold">Instituição ID</dt>
          <dd>{aluno.instituicao_id}</dd>
        </div>
        <div>
          <dt className="font-semibold">Data de Cadastro</dt>
          <dd>
            {new Date(aluno.data_cadastro).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </dd>
        </div>
      </dl>

      <div className="pt-4">
        <Link href={`/dashboard/alunos/${aluno.id}/edit`}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Editar
          </button>
        </Link>
      </div>
    </div>
  )
}
