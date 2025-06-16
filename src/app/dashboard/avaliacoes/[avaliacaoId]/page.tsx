// src/app/avaliacoes/[avaliacaoId]/page.tsx
import Link from 'next/link'
import { Avaliacao } from '@/types/avaliacao'

async function fetchAvaliacao(id: string): Promise<Avaliacao> {
  const res = await fetch(`/api/avaliacoes/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Falha ao buscar avaliação')
  return res.json()
}

export default async function AvaliacaoDetailsPage({
  params,
}: {
  params: Promise<{ avaliacaoId: string }>
}) {
  const { avaliacaoId } = await params
  const av = await fetchAvaliacao(avaliacaoId)

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Avaliação #{av.id}</h1>
        <Link href="/avaliacoes">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Voltar
          </button>
        </Link>
      </header>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-gray-700">
        <div>
          <dt className="font-semibold">Aluno ID</dt>
          <dd>{av.aluno_id}</dd>
        </div>
        <div>
          <dt className="font-semibold">Projeto ID</dt>
          <dd>{av.projeto_id}</dd>
        </div>
        <div>
          <dt className="font-semibold">Nota</dt>
          <dd>{av.nota}</dd>
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
          <dd>{new Date(av.data_avaliacao).toLocaleString()}</dd>
        </div>
      </dl>

      <div className="pt-4">
        <Link href={`/avaliacoes/${av.id}/edit`}>
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            Editar
          </button>
        </Link>
      </div>
    </div>
  )
}
