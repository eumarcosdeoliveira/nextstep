// src/app/dashboard/instituicoes/[instituicaoId]/page.tsx

import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'

interface PageProps {
  /** No App Router do Next.js 15+, params vem como Promise */
  params: Promise<{ instituicaoId: string }>
}

export default async function InstituicaoDashboardPage({ params }: PageProps) {
  // aguardamos a promise para extrair o ID
  const { instituicaoId } = await params
  const id = Number(instituicaoId)

  // buscamos direto no banco (Server Component)
  const inst = await prisma.instituicao_ensino.findUnique({
    where: { id },
  })

  if (!inst) {
    // dispara a página 404 do Next
    notFound()
  }

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{inst.nome}</h1>
        <Link href="/dashboard/instituicoes">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            ← Voltar
          </button>
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
            {inst.contato_nome} —{' '}
            <a
              href={`mailto:${inst.contato_email}`}
              className="text-blue-600 hover:underline"
            >
              {inst.contato_email}
            </a>
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
        <Link href={`/dashboard/instituicoes/${inst.id}/edit`}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Editar
          </button>
        </Link>
      </div>
    </div>
  )
}
