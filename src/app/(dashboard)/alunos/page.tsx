// src/app/alunos/page.tsx
import Link from 'next/link'
import { get } from '@/services/api'
import { Aluno } from '@/types/aluno'
import AlunoTable from '@/components/ui/aluno/AlunoTable'

export default async function AlunosPage() {
  // no servidor: fetch('http://localhost:3000/api/alunos')
  // no cliente: fetch('/api/alunos')
  const alunos = await get<Aluno[]>('/api/alunos')

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Alunos</h1>
        <Link href="/alunos/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            + Novo Aluno
          </button>
        </Link>
      </header>
      <AlunoTable alunos={alunos} />
    </div>
  )
}
