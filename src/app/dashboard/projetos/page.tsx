// src/app/projetos/page.tsx
import Link from 'next/link'
import { get } from '@/services/api'
import { Projeto } from '@/types/projeto'
import ProjetoTable from '@/components/ui/projeto/ProjetoTable'

export default async function ProjetosPage() {
  // chama sempre uma URL absoluta no servidor (ou relativa no cliente)
  const projetos = await get<Projeto[]>('/api/projetos')

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projetos</h1>
        <Link href="/projetos/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            + Novo Projeto
          </button>
        </Link>
      </header>

      <ProjetoTable projetos={projetos} />
    </div>
  )
}
