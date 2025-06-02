import Link from 'next/link'
import { get } from '@/services/api'
import { Instituicao } from '@/types/instituicao'
import InstituicoesClient from '@/components/ui/instituicao/InstituicaoClient'

export default async function InstituicoesPage() {
  const insts = await get<Instituicao[]>('/api/instituicoes')

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Instituições</h1>
        <Link
          href="/instituicoes/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Nova Instituição
        </Link>
      </header>

      {/* Renderiza o Client Wrapper */}
      <InstituicoesClient data={insts} />
    </div>
  )
}
