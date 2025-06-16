// src/app/alunos/[alunoId]/page.tsx
import Link from 'next/link'
import { Aluno } from '@/types/aluno'

async function fetchAluno(id: string): Promise<Aluno> {
  const res = await fetch(`/api/alunos/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Falha ao buscar aluno')
  return res.json()
}

export default async function AlunoDetailsPage({
  params,
}: {
  params: Promise<{ alunoId: string }>
}) {
  const { alunoId } = await params
  const al = await fetchAluno(alunoId)

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{al.nome}</h1>
        <Link href="/alunos">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Voltar
          </button>
        </Link>
      </header>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-gray-700">
        <div>
          <dt className="font-semibold">E-mail</dt>
          <dd>{al.email}</dd>
        </div>
        <div>
          <dt className="font-semibold">Matrícula</dt>
          <dd>{al.matricula}</dd>
        </div>
        <div>
          <dt className="font-semibold">Nível de Instrução</dt>
          <dd>{al.nivel_instrucao}</dd>
        </div>
        <div>
          <dt className="font-semibold">Instituição ID</dt>
          <dd>{al.instituicao_id}</dd>
        </div>
        <div>
          <dt className="font-semibold">Data de Cadastro</dt>
          <dd>{new Date(al.data_cadastro).toLocaleDateString()}</dd>
        </div>
      </dl>

      <div className="pt-4">
        <Link href={`/alunos/${al.id}/edit`}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Editar
          </button>
        </Link>
      </div>
    </div>
  )
}
