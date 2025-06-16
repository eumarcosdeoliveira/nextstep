import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  const { nome, email, matricula, nivel_instrucao, instituicao_id } = await request.json()

  const instId = Number(instituicao_id)
  if (Number.isNaN(instId) || instId < 1) {
    return NextResponse.json(
      { error: 'ID da instituição inválido. Deve ser um número válido.' },
      { status: 400 }
    )
  }

  try {
    const created = await prisma.aluno.create({
      data: {
        nome: String(nome),
        email: String(email),
        matricula: String(matricula),
        nivel_instrucao: String(nivel_instrucao),
        instituicao_id: instId,
      },
    })
    return NextResponse.json(created, { status: 201 })
  } catch (err: any) {
    console.error('Erro ao criar aluno:', err)
    return NextResponse.json({ error: 'Erro interno ao criar aluno.' }, { status: 500 })
  }
}

export async function GET() {
  const alunos = await prisma.aluno.findMany({
    include: { instituicao_ensino: { select: { nome: true } } },
    orderBy: { nome: 'asc' },
  })
  const result = alunos.map(a => ({
    id: a.id,
    nome: a.nome,
    email: a.email,
    matricula: a.matricula,
    nivel_instrucao: a.nivel_instrucao,
    instituicao_id: a.instituicao_id,
    data_cadastro: a.data_cadastro.toISOString(),
    instituicao_nome: a.instituicao_ensino.nome,
  }))
  return NextResponse.json(result)
}
