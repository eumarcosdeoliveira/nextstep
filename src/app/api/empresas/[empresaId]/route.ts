// src/app/api/empresas/[empresaId]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

/**
 * No Next.js 15, context.params é uma Promise que resolve
 * o objeto com os parâmetros dinâmicos.
 */
type ContextParams = {
  params: Promise<{ empresaId: string }>
}

export async function GET(
  request: Request,
  { params }: ContextParams
) {
  const { empresaId } = await params
  const id = Number(empresaId)

  const emp = await prisma.empresa.findUnique({ where: { id } })
  if (!emp) {
    return NextResponse.json(
      { error: 'Empresa não encontrada' },
      { status: 404 }
    )
  }

  return NextResponse.json(emp)
}

export async function PUT(
  request: Request,
  { params }: ContextParams
) {
  const { empresaId } = await params
  const id = Number(empresaId)
  const data = await request.json()

  const updated = await prisma.empresa.update({
    where: { id },
    data,
  })

  return NextResponse.json(updated)
}

export async function DELETE(
  request: Request,
  { params }: ContextParams
) {
  const { empresaId } = await params
  const id = Number(empresaId)

  await prisma.empresa.delete({ where: { id } })
  return NextResponse.json(null, { status: 204 })
}
