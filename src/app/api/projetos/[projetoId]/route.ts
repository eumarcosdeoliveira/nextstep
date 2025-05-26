// src/app/api/projetos/[projetoId]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { projetoId: string } }
) {
  const id = Number(params.projetoId)
  const projeto = await prisma.projeto.findUnique({ where: { id } })
  if (!projeto) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
  return NextResponse.json(projeto)
}

export async function PUT(
  request: Request,
  { params }: { params: { projetoId: string } }
) {
  const id = Number(params.projetoId)
  const data = await request.json()
  const updated = await prisma.projeto.update({ where: { id }, data })
  return NextResponse.json(updated)
}

export async function DELETE(
  request: Request,
  { params }: { params: { projetoId: string } }
) {
  const id = Number(params.projetoId)
  await prisma.projeto.delete({ where: { id } })
  return NextResponse.json(null, { status: 204 })
}
