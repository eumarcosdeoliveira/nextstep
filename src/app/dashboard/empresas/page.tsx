// src/app/empresas/page.tsx

import React from 'react'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import EmpresaTable from '@/components/ui/empresa/EmpresaTable'
import { Empresa as EmpresaType } from '@/types/empresa'

export const metadata = {
  title: 'Empresas – NextStep',
  description: 'Lista de empresas cadastradas no NextStep',
}

export default async function EmpresasPage() {
  // Busca todas as empresas diretamente do banco
  const rawEmpresas = await prisma.empresa.findMany({
    orderBy: { nome: 'asc' },
  })

  // Mapeia para o seu tipo "Empresa", convertendo id para string
  const empresas: EmpresaType[] = rawEmpresas.map((e) => ({
    id:             e.id.toString(),      // converte number → string
    nome:           e.nome,
    cnpj:           e.cnpj,
    setor:          e.setor,
    contato_nome:   e.contato_nome,
    contato_email:  e.contato_email,
    telefone:       e.telefone ?? '',
    site:           e.site ?? '',
  }))

  return (
    <main className="flex-1 p-8 bg-gray-50 min-h-screen">
      {/* Cabeçalho da página */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Empresas</h1>
        <Link
          href="/dashboard/empresas/create"
          className="inline-block bg-gradient-to-r from-blue-600 to-green-400 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition-opacity"
        >
          + Nova Empresa
        </Link>
      </div>

      {/* Card branco contendo a tabela */}
      <div className="bg-white rounded-2xl shadow p-6">
        {empresas.length > 0 ? (
          <EmpresaTable empresas={empresas} />
        ) : (
          <p className="text-gray-600 text-center py-10">
            Não há empresas cadastradas.
          </p>
        )}
      </div>
    </main>
  )
}
