// src/app/api/avaliacoes/route.ts

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const avaliacoes = await prisma.avaliacao.findMany({
    include: {
      aluno: {
        select: { id: true, nome: true },
      },
      projeto: {
        select: { id: true, titulo: true },
      },
    },
  })
  return NextResponse.json(avaliacoes)
}

export async function POST(request: Request) {
  const data = await request.json()

  // Use snake_case para os campos relacionais conforme seu schema Prisma
  const created = await prisma.avaliacao.create({
    data: {
      aluno_id:       data.alunoId,
      projeto_id:     data.projetoId,
      nota:           data.nota,
      feedback:       data.feedback,
      avaliador_nome: data.avaliador_nome,
    },
  })

  // Rebusca para devolver também as relações de aluno e projeto
  const full = await prisma.avaliacao.findUnique({
    where: { id: created.id },
    include: {
      aluno:   { select: { id: true, nome: true } },
      projeto: { select: { id: true, titulo: true } },
    },
  })

  return NextResponse.json(full, { status: 201 })
}
