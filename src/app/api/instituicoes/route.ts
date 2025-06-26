import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const insts = await prisma.instituicao_ensino.findMany({
      select: { id: true, nome: true },
      orderBy: { nome: 'asc' },
    })
    return NextResponse.json(insts)
  } catch (err) {
    console.error('Erro ao buscar instituições:', err)
    return NextResponse.json({ error: 'Erro ao carregar instituições.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const data = await request.json()
  try {
    const created = await prisma.instituicao_ensino.create({ data })
    return NextResponse.json(created, { status: 201 })
  } catch (err) {
    console.error('Erro ao criar instituição:', err)
    return NextResponse.json({ error: 'Erro ao criar instituição.' }, { status: 500 })
  }
}
