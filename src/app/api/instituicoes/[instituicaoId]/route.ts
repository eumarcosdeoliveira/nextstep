// src/app/api/instituicoes/[instituicaoId]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { instituicaoId: string } }
) {
  const id = Number(params.instituicaoId)
  const inst = await prisma.instituicao_ensino.findUnique({ where: { id } })
  if (!inst) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
  return NextResponse.json(inst)
}

export async function PUT(
  request: Request,
  { params }: { params: { instituicaoId: string } }
) {
  const id = Number(params.instituicaoId)
  const data = await request.json()
  const updated = await prisma.instituicao_ensino.update({ where: { id }, data })
  return NextResponse.json(updated)
}

export async function DELETE(
  request: Request,
  { params }: { params: { instituicaoId: string } }
) {
  const id = Number(params.instituicaoId)
  await prisma.instituicao_ensino.delete({ where: { id } })
  return NextResponse.json(null, { status: 204 })
}
