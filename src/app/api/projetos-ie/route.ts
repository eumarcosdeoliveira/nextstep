// src/app/api/projetos-recebidos/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getToken } from 'next-auth/jwt'

export async function GET(req: NextRequest) {
  const token = await getToken({ req })
  const instituicaoId = Number(token?.id)

  if (!token || token.role !== '2') {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 403 })
  }

  const projetos = await prisma.projetos_ie.findMany({
    where: { instituicao_id: instituicaoId },
    include: {
      projeto: {
        include: {
          empresa: { select: { nome: true } },
          modulo: { orderBy: { ordem: 'asc' } }
        }
      }
    },
    orderBy: { data_inicio: 'desc' }
  })

  return NextResponse.json(projetos)
}
