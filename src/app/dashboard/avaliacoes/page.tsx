// src/app/avaliacoes/page.tsx
import Link from 'next/link'
import { prisma } from '@/lib/db'
import AvaliacoesClient from '@/components/ui/avaliacao/AvaliacoesClient'
import { Avaliacao as AvaliacaoType } from '@/types/avaliacao'
import { Button } from '@/components/ui/Button'

export default async function AvaliacoesPage() {
  // Server‐side fetch
  const raw = await prisma.avaliacao.findMany({
    include: {
      aluno:   { select: { id: true, nome: true } },
      projeto: { select: { id: true, titulo: true } },
    },
    orderBy: { data_avaliacao: 'desc' },
  })

  // Map para tipo cliente, convertendo Decimal → number e Date → ISO string
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
        <h1 className="text-3xl font-bold text-gray-900">Avaliações</h1>
        <Link href="/dashboard/avaliacoes/create">
          <Button variant="primary">
            + Nova Avaliação
          </Button>
        </Link>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <AvaliacoesClient avaliacoes={avaliacoes} />
      </div>
    </div>
  )
}
