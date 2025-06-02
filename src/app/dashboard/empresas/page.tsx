// src/app/empresas/page.tsx

import React from 'react'
import Link from 'next/link'
import Sidebar from '@/components/ui/Sidebar'
import { getEmpresas } from '@/services/empresa.service'
import EmpresaTable from '@/components/ui/empresa/EmpresaTable'
import { Empresa } from '@/types/empresa'

export const metadata = {
  title: 'Empresas – NextStep',
  description: 'Lista de empresas cadastradas no NextStep',
}

export default async function EmpresasPage() {
  // Busca todas as empresas do banco (server-side)
  const empresas: Empresa[] = await getEmpresas()

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <main className="flex-1 bg-gray-50 min-h-screen p-8 overflow-auto">
        {/* Cabeçalho da página */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold">Empresas</h1>
          <Link
            href="/empresas/create"
            className="inline-block bg-gradient-to-r from-blue-600 to-green-400 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition-opacity"
          >
            + Nova Empresa
          </Link>
        </div>

        {/* Card branco com tabela de empresas */}
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
    </div>
  )
}
