// src/app/api/register/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  const { name, email, password } = await request.json()
  if (!email || !password) {
    return NextResponse.json({ error: 'Email e senha são obrigatórios' }, { status: 400 })
  }
  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) {
    return NextResponse.json({ error: 'Usuário já existe' }, { status: 409 })
  }
  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  })
  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 })
}
