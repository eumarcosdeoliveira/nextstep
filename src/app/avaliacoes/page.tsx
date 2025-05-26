// src/app/avaliacoes/page.tsx
import Link from 'next/link'
import { get } from '@/services/api'
import { Avaliacao } from '@/types/avaliacao'
import AvaliacoesClient from '@/components/ui/avaliacao/AvaliacoesClient'

export default async function AvaliacoesPage() {
  const avaliacoes = await get<Avaliacao[]>('/api/avaliacoes')

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
