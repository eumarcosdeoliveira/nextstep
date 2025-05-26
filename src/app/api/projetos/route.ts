// src/app/api/projetos/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const projetos = await prisma.projeto.findMany()
  return NextResponse.json(projetos)
}

export async function POST(request: Request) {
  const data = await request.json()
  const created = await prisma.projeto.create({ data })
  return NextResponse.json(created, { status: 201 })
}
