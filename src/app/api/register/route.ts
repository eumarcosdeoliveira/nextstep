// src/app/api/register/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcrypt'
import { Prisma } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      role_id,
      empresa_id,
      instituicao_id,
    } = (await request.json()) as Record<string, any>

    const parsedRoleId =
      typeof role_id === 'string' ? parseInt(role_id, 10) : role_id

    // — Validações omitidas —

    const hashed = await bcrypt.hash(password, 10)

    const data: any = {
      name,
      email,
      password: hashed,
      phone,
      roleRelation: { connect: { id: parsedRoleId } },
    }

    if (parsedRoleId === 1) {
      data.empresa = { connect: { id: Number(empresa_id) } }
    } else if (parsedRoleId === 2) {
      data.instituicao_ensino = { connect: { id: Number(instituicao_id) } }
    }

    const user = await prisma.user.create({ data })

    return NextResponse.json(
      { id: user.id, name: user.name, email: user.email, roleId: parsedRoleId },
      { status: 201 }
    )
  } catch (err: any) {
    console.error('🔥 [register] Erro interno:', err)

    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      Array.isArray((err.meta as any)?.target) &&
      (err.meta as any).target.includes('email')
    ) {
      return NextResponse.json(
        { error: 'Já existe um usuário cadastrado com este e-mail.' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Erro interno ao registrar usuário.' },
      { status: 500 }
    )
  }
}
