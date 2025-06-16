// src/app/dashboard/alunos/page.tsx
import Link from 'next/link'
import { prisma } from '@/lib/db'
import AlunoTable from '@/components/ui/aluno/AlunoTable'
import { Aluno as AlunoType } from '@/types/aluno'
import { Button } from '@/components/ui/Button' // Importar o componente Button

export default async function AlunosDashboardPage() {
  const rawAlunos = await prisma.aluno.findMany({
    orderBy: { nome: 'asc' },
    include: { instituicao_ensino: { select: { nome: true } } },
  })

  const alunos: AlunoType[] = rawAlunos.map((a) => ({
    id:               a.id,
    nome:             a.nome,
    email:            a.email,
    matricula:        a.matricula,
    nivel_instrucao:  a.nivel_instrucao,
    instituicao_id:   a.instituicao_id,
    data_cadastro:    a.data_cadastro.toISOString(),
    instituicao_nome: a.instituicao_ensino.nome,
  }))

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Alunos</h1> {/* Adicionado text-gray-900 para consistência */}
        <Link href="/dashboard/alunos/create">
          {/* Usando o componente Button padronizado */}
          <Button variant="primary" > {/* 'primary' para o azul padrão, 'md' para o tamanho */}
            + Novo Aluno
          </Button>
        </Link>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6"> {/* Ajustado para rounded-lg e shadow-lg para consistência */}
        <AlunoTable alunos={alunos} />
      </div>
    </div>
  )
}