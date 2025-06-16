// src/app/dashboard/empresas/[empresaId]/page.tsx

import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'

interface PageProps {
  params: Promise<{ empresaId: string }>
}

export default async function EmpresaDashboardPage({ params }: PageProps) {
  // aguardamos a resolução de params para extrair o ID
  const { empresaId } = await params
  const id = Number(empresaId)

  // busca direta no banco (Server Component)
  const emp = await prisma.empresa.findUnique({ where: { id } })
  if (!emp) {
    // se não existir, renderiza a 404 do Next
    notFound()
  }

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{emp.nome}</h1>
        <Link href="/dashboard/empresas">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            ← Voltar
          </button>
        </Link>
      </header>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-gray-700">
        <div>
          <dt className="font-semibold">CNPJ</dt>
          <dd>{emp.cnpj}</dd>
        </div>
        <div>
          <dt className="font-semibold">Setor</dt>
          <dd>{emp.setor}</dd>
        </div>
        <div>
          <dt className="font-semibold">Contato</dt>
          <dd>
            {emp.contato_nome} —{' '}
            <a href={`mailto:${emp.contato_email}`} className="text-blue-600 hover:underline">
              {emp.contato_email}
            </a>
          </dd>
        </div>
        {emp.telefone && (
          <div>
            <dt className="font-semibold">Telefone</dt>
            <dd>{emp.telefone}</dd>
          </div>
        )}
        {emp.site && (
          <div>
            <dt className="font-semibold">Site</dt>
            <dd>
              <a
                href={emp.site}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {emp.site}
              </a>
            </dd>
          </div>
        )}
      </dl>

      <div className="pt-4">
        <Link href={`/dashboard/empresas/${emp.id}/edit`}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Editar
          </button>
        </Link>
      </div>
    </div>
  )
}
