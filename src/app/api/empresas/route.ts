// src/app/api/empresas/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const empresas = await prisma.empresa.findMany()
  return NextResponse.json(empresas)
}

export async function POST(request: Request) {
  const data = await request.json()
  const created = await prisma.empresa.create({ data })
  return NextResponse.json(created, { status: 201 })
}
