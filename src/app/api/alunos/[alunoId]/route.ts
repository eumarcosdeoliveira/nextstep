// src/app/api/alunos/[alunoId]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: any
) {
  const id = Number(params.alunoId)
  const aluno = await prisma.aluno.findUnique({ where: { id } })
  if (!aluno) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
  return NextResponse.json(aluno)
}

export async function PUT(
  request: Request,
  { params }: any
) {
  const id = Number(params.alunoId)
  const data = await request.json()
  const updated = await prisma.aluno.update({ where: { id }, data })
  return NextResponse.json(updated)
}

export async function DELETE(
  request: Request,
  { params }: any
) {
  const id = Number(params.alunoId)
  await prisma.aluno.delete({ where: { id } })
  return NextResponse.json(null, { status: 204 })
}
