// src/app/api/projetos/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.empresa_id) {
      console.error('❌ empresaId inválido ou ausente:', session?.user?.empresa_id)
      return NextResponse.json({ error: 'Usuário não autenticado como empresa.' }, { status: 400 })
    }

    const body = await request.json()
    const {
      titulo,
      descricao,
      nivel_dificuldade,
      areaId,
      modulos = []
    } = body

    const projeto = await prisma.projeto.create({
      data: {
        titulo,
        descricao,
        nivel_dificuldade,
        qtd_modulos: modulos.length,
        empresa: { connect: { id: session.user.empresa_id } },
        area:    { connect: { id: Number(areaId) } },
        modulo: {
          create: modulos.map((m: any) => ({
            titulo: m.titulo,
            descricao: m.descricao,
            ordem: m.ordem,
            duracao_estim: m.duracao_estim
          }))
        }
      },
      include: { modulo: true }
    })

    return NextResponse.json(projeto, { status: 201 })
  } catch (error: any) {
    console.error('❌ Erro ao criar projeto:', error)
    return NextResponse.json({ error: 'Erro ao criar projeto.' }, { status: 500 })
  }
}
