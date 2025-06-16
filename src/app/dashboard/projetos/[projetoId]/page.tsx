// src/app/dashboard/projetos/[projetoId]/page.tsx

import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'

interface PageProps {
  /** No App Router do Next.js 15+, params vem como Promise */
  params: Promise<{ projetoId: string }>
}

export default async function ProjetoDashboardPage({ params }: PageProps) {
  // aguardamos a promise para extrair o ID
  const { projetoId } = await params
  const id = Number(projetoId)

  // busca direta no banco (Server Component)
  const proj = await prisma.projeto.findUnique({
    where: { id },
  })

  if (!proj) {
    // dispara a página 404 do Next
    notFound()
  }

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{proj.titulo}</h1>
        <Link href="/dashboard/projetos">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            ← Voltar
          </button>
        </Link>
      </header>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-gray-700">
        <div>
          <dt className="font-semibold">Descrição</dt>
          <dd>{proj.descricao ?? '—'}</dd>
        </div>
        <div>
          <dt className="font-semibold">Nível de Dificuldade</dt>
          <dd>{proj.nivel_dificuldade}</dd>
        </div>
        <div>
          <dt className="font-semibold">Empresa ID</dt>
          <dd>{proj.empresa_id}</dd>
        </div>
        <div>
          <dt className="font-semibold">Instituição ID</dt>
          <dd>{proj.instituicao_id}</dd>
        </div>
        <div>
          <dt className="font-semibold">Data de Criação</dt>
          <dd>
            {new Date(proj.data_criacao).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </dd>
        </div>
      </dl>

      <div className="pt-4">
        <Link href={`/dashboard/projetos/${proj.id}/edit`}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Editar
          </button>
        </Link>
      </div>
    </div>
  )
}
