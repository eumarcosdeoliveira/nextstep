// src/app/api/alunos/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const alunos = await prisma.aluno.findMany()
  return NextResponse.json(alunos)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Extrai e converte os campos numéricos
    const {
      nome,
      email,
      matricula,
      nivel_instrucao,
      instituicao_id,
    } = body

    const created = await prisma.aluno.create({
      data: {
        nome: String(nome),
        email: String(email),
        matricula: String(matricula),
        nivel_instrucao: String(nivel_instrucao),
        instituicao_id: Number(instituicao_id),
        // se seu schema define data_cadastro como @default(now()), não precisa passar
      },
    })

    return NextResponse.json(created, { status: 201 })
  } catch (err: any) {
    console.error('Erro ao criar Aluno:', err)
    return NextResponse.json(
      { error: err.message || 'Erro interno' },
      { status: 500 }
    )
  }
}
