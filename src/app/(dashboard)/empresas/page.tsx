// src/app/empresas/page.tsx
import Link from 'next/link'
import { get } from '@/services/api'
import { Empresa } from '@/types/empresa'
import EmpresaTable from '@/components/ui/empresa/EmpresaTable'

export default async function EmpresasPage() {
  const empresas = await get<Empresa[]>('/api/empresas')

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Empresas</h1>
        <Link href="/empresas/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            + Nova Empresa
          </button>
        </Link>
      </header>
      <EmpresaTable
        empresas={empresas}
      />
    </div>
  )
}
