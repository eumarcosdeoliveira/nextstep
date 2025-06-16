// src/app/api/instituicoes/[instituicaoId]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

/**
 * No Next.js 15+, context.params é uma Promise que resolve
 * um objeto contendo seus parâmetros dinâmicos.
 */
type ContextParams = {
  params: Promise<{ instituicaoId: string }>
}

export async function GET(
  request: Request,
  { params }: ContextParams
) {
  const { instituicaoId } = await params
  const id = Number(instituicaoId)

  const inst = await prisma.instituicao_ensino.findUnique({
    where: { id },
  })
  if (!inst) {
    return NextResponse.json(
      { error: 'Instituição não encontrada' },
      { status: 404 }
    )
  }

  return NextResponse.json(inst)
}

export async function PUT(
  request: Request,
  { params }: ContextParams
) {
  const { instituicaoId } = await params
  const id = Number(instituicaoId)
  const data = await request.json()

  const updated = await prisma.instituicao_ensino.update({
    where: { id },
    data,
  })

  return NextResponse.json(updated)
}

export async function DELETE(
  request: Request,
  { params }: ContextParams
) {
  const { instituicaoId } = await params
  const id = Number(instituicaoId)

  await prisma.instituicao_ensino.delete({ where: { id } })
  return NextResponse.json(null, { status: 204 })
}
