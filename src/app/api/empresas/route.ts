import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      nome: string
      cnpj: string
      setor: string
      site?: string | null
      contato_nome: string
      contato_email: string
      telefone: string
    }
    console.log('📥 [empresas] Body recebido:', body)

    const { nome, cnpj, setor, site, contato_nome, contato_email, telefone } = body
    if (!nome || !cnpj || !setor || !contato_nome || !contato_email || !telefone) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 })
    }

    const existing = await prisma.empresa.findFirst({ where: { cnpj } })
    if (existing) {
      console.log('ℹ️ [empresas] Empresa já existe:', existing.id)
      return NextResponse.json(existing, { status: 200 })
    }

    const created = await prisma.empresa.create({
      data: { nome, cnpj, setor, site: site || null, contato_nome, contato_email, telefone }
    })
    console.log('✅ [empresas] Empresa criada:', created.id)
    return NextResponse.json(created, { status: 201 })

  } catch (err) {
    console.error('🔥 [empresas] Erro interno:', err)
    return NextResponse.json({ error: 'Erro ao criar empresa.' }, { status: 500 })
  }
}
