// src/app/instituicoes/[instituicaoId]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Instituicao } from '@/types/instituicao'

/**
 * Base URL absoluta para chamadas de API no servidor.
 * Usa NEXT_PUBLIC_API_URL se definido, caso contrário assume localhost.
 */
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  `http://localhost:${process.env.PORT ?? 3000}`

/**
 * Busca uma instituição pelo ID. Em caso de falha retorna notFound(),
 * que dispara o render da página 404.
 */
async function fetchInstituicao(id: string): Promise<Instituicao> {
  const res = await fetch(`${BASE_URL}/api/instituicoes/${id}`, {
    next: { revalidate: 60 }, // revalida a cada 60 segundos
  })
  if (!res.ok) {
    return notFound()
  }
  return (await res.json()) as Instituicao
}

export default async function InstituicaoDetailsPage({
  params,
}: {
  params: Promise<{ instituicaoId: string }>
}) {
  const { instituicaoId } = await params
  const inst = await fetchInstituicao(instituicaoId)

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{inst.nome}</h1>
        <Link
          href="/instituicoes"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Voltar
        </Link>
      </header>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-gray-700">
        <div>
          <dt className="font-semibold">Sigla</dt>
          <dd>{inst.sigla ?? '—'}</dd>
        </div>
        <div>
          <dt className="font-semibold">Tipo</dt>
          <dd>{inst.tipo}</dd>
        </div>
        <div>
          <dt className="font-semibold">Endereço</dt>
          <dd>{inst.endereco ?? '—'}</dd>
        </div>
        <div>
          <dt className="font-semibold">Contato</dt>
          <dd>
            {inst.contato_nome} — {inst.contato_email}
          </dd>
        </div>
        {inst.telefone && (
          <div>
            <dt className="font-semibold">Telefone</dt>
            <dd>{inst.telefone}</dd>
          </div>
        )}
        {inst.site && (
          <div>
            <dt className="font-semibold">Site</dt>
            <dd>
              <a
                href={inst.site}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {inst.site}
              </a>
            </dd>
          </div>
        )}
      </dl>

      <div className="pt-4">
        <Link
          href={`/instituicoes/${inst.id}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Editar
        </Link>
      </div>
    </div>
  )
}
