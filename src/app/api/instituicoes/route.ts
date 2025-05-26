// src/app/api/instituicoes/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const insts = await prisma.instituicao_ensino.findMany()
  return NextResponse.json(insts)
}

export async function POST(request: Request) {
  const data = await request.json()
  const created = await prisma.instituicao_ensino.create({ data })
  return NextResponse.json(created, { status: 201 })
}
