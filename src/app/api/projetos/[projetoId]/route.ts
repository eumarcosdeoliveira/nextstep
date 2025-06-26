import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET - Obter projeto por ID com módulos e área
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projetoId: string }> }
) {
  const { projetoId } = await params
  const id = Number(projetoId)

  const projeto = await prisma.projeto.findUnique({
    where: { id },
    include: {
      area: true,
      modulo: { orderBy: { ordem: 'asc' } },
    },
  })

  if (!projeto) {
    return new NextResponse('Projeto não encontrado.', { status: 404 })
  }

  return NextResponse.json(projeto)
}

// PUT - Atualizar projeto e seus módulos
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ projetoId: string }> }
) {
  try {
    const { projetoId } = await params
    const id = Number(projetoId)
    const data = await request.json()

    const {
      titulo,
      descricao,
      nivel_dificuldade,
      areaId,
      modulos = [],
    } = data

    // Atualiza os dados principais do projeto
    await prisma.projeto.update({
      where: { id },
      data: {
        titulo,
        descricao,
        nivel_dificuldade,
        area: { connect: { id: Number(areaId) } },
        qtd_modulos: modulos.length,
      },
    })

    // Remove os módulos existentes
    await prisma.modulo.deleteMany({ where: { projeto_id: id } })

    // Reinsere os módulos atualizados
    await prisma.modulo.createMany({
      data: modulos.map((m: any) => ({
        titulo: m.titulo,
        descricao: m.descricao,
        ordem: m.ordem,
        duracao_estim: m.duracao_estim,
        projeto_id: id,
      })),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('❌ Erro ao atualizar projeto:', error)
    return new NextResponse('Erro ao atualizar projeto.', { status: 500 })
  }
}

// DELETE - Remover projeto e seus módulos
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ projetoId: string }> }
) {
  try {
    const { projetoId } = await params
    const id = Number(projetoId)

    // Remove os módulos antes
    await prisma.modulo.deleteMany({ where: { projeto_id: id } })

    // Remove o projeto
    await prisma.projeto.delete({ where: { id } })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('❌ Erro ao excluir projeto:', error)
    return new NextResponse('Erro ao excluir projeto.', { status: 500 })
  }
}