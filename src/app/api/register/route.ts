// src/app/api/register/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  try {
    const { name, email, password, confirmPassword } = await request.json()

    // 1) Validação de campos obrigatórios
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'Nome, e-mail e ambas as senhas são obrigatórios.' },
        { status: 400 }
      )
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

    // 5) Criar usuário no banco (somente campos que existem no schema: name, email, password)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        // role, emailVerified, image e createdAt são preenchidos pelos defaults do schema
      },
    })

    // 6) Responder sem retornar a senha
    return NextResponse.json(
      { id: user.id, email: user.email, name: user.name },
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
