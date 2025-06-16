// src/app/api/alunos/[alunosId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

type ContextParams = {
  params: Promise<{ alunosId: string }>
}

export async function GET(
  req: NextRequest,
  { params }: ContextParams
) {
  const { alunosId } = await params
  const id = Number(alunosId)

  const aluno = await prisma.aluno.findUnique({ where: { id } })
  if (!aluno) {
    return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
  }
  return NextResponse.json(aluno)
}

export async function PUT(
  req: NextRequest,
  { params }: ContextParams
) {
  const { alunosId } = await params
  const id = Number(alunosId)
  const data = await req.json()

  const updated = await prisma.aluno.update({
    where: { id },
    data,
  })
  return NextResponse.json(updated)
}

export async function DELETE(
  req: NextRequest,
  { params }: ContextParams
) {
  const { alunosId } = await params
  const id = Number(alunosId)

  await prisma.aluno.delete({ where: { id } })
  return NextResponse.json(null, { status: 204 })
}
