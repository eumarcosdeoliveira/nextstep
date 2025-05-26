// src/app/api/empresas/[empresaId]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: { empresaId: string } }
) {
  const id = Number(params.empresaId)
  const emp = await prisma.empresa.findUnique({ where: { id } })
  if (!emp) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
  return NextResponse.json(emp)
}

export async function PUT(
  request: Request,
  { params }: { params: { empresaId: string } }
) {
  const id = Number(params.empresaId)
  const data = await request.json()
  const updated = await prisma.empresa.update({ where: { id }, data })
  return NextResponse.json(updated)
}

export async function DELETE(
  request: Request,
  { params }: { params: { empresaId: string } }
) {
  const id = Number(params.empresaId)
  await prisma.empresa.delete({ where: { id } })
  return NextResponse.json(null, { status: 204 })
}
