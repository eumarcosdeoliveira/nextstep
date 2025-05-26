// src/app/api/avaliacoes/[avaliacaoId]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { avaliacaoId: string } }
) {
  const id = Number(params.avaliacaoId)
  const av = await prisma.avaliacao.findUnique({
    where: { id },
    include: {
      aluno: { select: { id: true, nome: true } },
      projeto: { select: { id: true, titulo: true } }
    }
  })
  if (!av) return NextResponse.json({ error: 'Não encontrada' }, { status: 404 })
  return NextResponse.json(av)
}

export async function PUT(
  request: Request,
  { params }: { params: { avaliacaoId: string } }
) {
  const id = Number(params.avaliacaoId)
  const data = await request.json()
  const updated = await prisma.avaliacao.update({
    where: { id },
    data: {
      alunoId: data.alunoId,
      projetoId: data.projetoId,
      nota: data.nota,
      feedback: data.feedback,
      avaliador_nome: data.avaliador_nome
    }
  })
  const full = await prisma.avaliacao.findUnique({
    where: { id: updated.id },
    include: {
      aluno: { select: { id: true, nome: true } },
      projeto: { select: { id: true, titulo: true } }
    }
  })
  return NextResponse.json(full)
}

export async function DELETE(
  request: Request,
  { params }: { params: { avaliacaoId: string } }
) {
  const id = Number(params.avaliacaoId)
  await prisma.avaliacao.delete({ where: { id } })
  return NextResponse.json(null, { status: 204 })
}
