import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const areas = await prisma.area.findMany({
      select: { id: true, nome: true },
      orderBy: { nome: 'asc' },
    })
    return NextResponse.json(areas)
  } catch (err) {
    console.error('Erro ao buscar áreas:', err)
    return NextResponse.json({ error: 'Erro ao carregar áreas.' }, { status: 500 })
  }
}
