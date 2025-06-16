// src/app/avaliacoes/page.tsx

import Link from 'next/link'
import { prisma } from '@/lib/db'
import AvaliacoesClient from '@/components/ui/avaliacao/AvaliacoesClient'
import { Avaliacao as AvaliacaoType } from '@/types/avaliacao'

export default async function AvaliacoesPage() {
  // Busca direta no banco em um Server Component
  const raw = await prisma.avaliacao.findMany({
    include: {
      aluno:   { select: { id: true, nome: true } },
      projeto: { select: { id: true, titulo: true } },
    },
    orderBy: { data_avaliacao: 'desc' },
  })

  // Converte Decimal → number e elimina nulls em feedback/avaliador_nome
  // Converte Date → string (ISO) se seu type Avaliacao.data_avaliacao for string
  const avaliacoes: AvaliacaoType[] = raw.map((av) => ({
    id:             av.id,
    aluno_id:       av.aluno_id,
    projeto_id:     av.projeto_id,
    nota:           av.nota.toNumber(),
    feedback:       av.feedback ?? '',
    avaliador_nome: av.avaliador_nome ?? '',
    data_avaliacao: av.data_avaliacao.toISOString(),
    aluno:          av.aluno,
    projeto:        av.projeto,
  }))

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Avaliações</h1>
        <Link href="/avaliacoes/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            + Nova Avaliação
          </button>
        </Link>
      </header>

      <AvaliacoesClient avaliacoes={avaliacoes} />
    </div>
  )
}
