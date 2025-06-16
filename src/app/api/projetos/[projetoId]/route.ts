// src/app/api/projetos/[projetoId]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

/**
 * No Next.js 15+, context.params é uma Promise que resolve
 * um objeto contendo seus parâmetros dinâmicos.
 */
type ContextParams = {
  params: Promise<{ projetoId: string }>
}

export async function GET(
  request: Request,
  { params }: ContextParams
) {
  const { projetoId } = await params
  const id = Number(projetoId)

  const projeto = await prisma.projeto.findUnique({
    where: { id },
  })
  if (!projeto) {
    return NextResponse.json(
      { error: 'Projeto não encontrado' },
      { status: 404 }
    )
  }
  return NextResponse.json(projeto)
}

export async function PUT(
  request: Request,
  { params }: ContextParams
) {
  const { projetoId } = await params
  const id = Number(projetoId)
  const data = await request.json()

  const updated = await prisma.projeto.update({
    where: { id },
    data,
  })
  return NextResponse.json(updated)
}

export async function DELETE(
  request: Request,
  { params }: ContextParams
) {
  const { projetoId } = await params
  const id = Number(projetoId)

  await prisma.projeto.delete({ where: { id } })
  return NextResponse.json(null, { status: 204 })
}
