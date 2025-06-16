// src/app/dashboard/avaliacoes/[avaliacaoId]/page.tsx

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'

interface PageProps {
  params: Promise<{ avaliacaoId: string }>
}

export default async function AvaliacaoDashboardPage({ params }: PageProps) {
  const { avaliacaoId } = await params
  const id = Number(avaliacaoId)

  const av = await prisma.avaliacao.findUnique({
    where: { id },
    include: {
      aluno:   { select: { id: true, nome: true } },
      projeto: { select: { id: true, titulo: true } }
    }
  })

  if (!av) {
    notFound()
  }

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Avaliação #{av.id}</h1>
        <Link href="/dashboard/avaliacoes">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            ← Voltar
          </button>
        </Link>
      </header>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-gray-700">
        <div>
          <dt className="font-semibold">Aluno</dt>
          <dd>{av.aluno.nome}</dd>
        </div>
        <div>
          <dt className="font-semibold">Projeto</dt>
          <dd>{av.projeto.titulo}</dd>
        </div>
        <div>
          <dt className="font-semibold">Nota</dt>
          <dd>{av.nota.toString()}</dd>
        </div>
        {av.feedback && (
          <div>
            <dt className="font-semibold">Feedback</dt>
            <dd>{av.feedback}</dd>
          </div>
        )}
        {av.avaliador_nome && (
          <div>
            <dt className="font-semibold">Avaliador</dt>
            <dd>{av.avaliador_nome}</dd>
          </div>
        )}
        <div>
          <dt className="font-semibold">Data de Avaliação</dt>
          <dd>
            {new Date(av.data_avaliacao).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </dd>
        </div>
      </dl>

      <div className="pt-4">
        <Link href={`/dashboard/avaliacoes/${av.id}/edit`}>
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            Editar
          </button>
        </Link>
      </div>
    </div>
  )
}
