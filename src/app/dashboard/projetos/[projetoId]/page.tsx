// src/app/projetos/[projetoId]/page.tsx
import Link from 'next/link'
import { Projeto } from '@/types/projeto'

async function fetchProjeto(id: string): Promise<Projeto> {
  const res = await fetch(`/api/projetos/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Falha ao buscar projeto')
  return res.json()
}

export default async function ProjetoDetailsPage({
  params,
}: {
  params: Promise<{ projetoId: string }>
}) {
  const { projetoId } = await params
  const proj = await fetchProjeto(projetoId)

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{proj.titulo}</h1>
        <Link href="/projetos">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Voltar
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
          <dd>{new Date(proj.data_criacao).toLocaleDateString()}</dd>
        </div>
      </dl>

      <div className="pt-4">
        <Link href={`/projetos/${proj.id}/edit`}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Editar
          </button>
        </Link>
      </div>
    </div>
  )
}
