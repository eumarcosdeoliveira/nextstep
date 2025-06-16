// src/app/api/register/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  try {
    const { name, email, password, confirmPassword, phone, document, role } = await request.json()

    console.log('Dados recebidos no backend /api/register:', { name, email, password, confirmPassword, phone, document, role }); // ADICIONE ESTA LINHA

    // 1) Validação de campos obrigatórios
    if (!name || !email || !password || !confirmPassword || !role) {
      return NextResponse.json(
        { error: 'Nome, e-mail, senhas e tipo de perfil são obrigatórios.' },
        { status: 400 }
      )
    }

    // Valide phone e document se forem obrigatórios (ajuste conforme a necessidade)
    if (!phone) {
        return NextResponse.json({ error: 'Telefone é obrigatório.' }, { status: 400 });
    }
    if (!document) {
        return NextResponse.json({ error: 'Documento (CNPJ/CPF) é obrigatório.' }, { status: 400 });
    }

    // 2) Verificar se as senhas coincidem
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'As senhas não coincidem.' },
        { status: 400 }
      )
    }

    // 3) Checar se já existe usuário com este e-mail
    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) {
      return NextResponse.json(
        { error: 'Já existe um usuário com este e-mail.' },
        { status: 409 }
      )
    }

    // 4) Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // 5) Criar usuário no banco (inclua phone, document e role)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        document,
        role, // Salva o role do usuário
        // emailVerified, image e createdAt são preenchidos pelos defaults do schema
      },
    })

    // 6) Responder sem retornar a senha
    return NextResponse.json(
      { id: user.id, email: user.email, name: user.name, role: user.role }, // Retorna o role
      { status: 201 }
    )
  } catch (err) {
    console.error('Erro em /api/register:', err)
    return NextResponse.json(
      { error: 'Erro interno ao registrar usuário.' },
      { status: 500 }
    )
  }
}