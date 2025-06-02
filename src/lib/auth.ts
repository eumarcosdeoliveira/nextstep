// src/lib/auth.ts
import { prisma } from './db'
import bcrypt from 'bcryptjs'

export async function verifyUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.password) return null
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return null
  // Retorne no formato que o NextAuth espera
  return {
  id: String(user.id), // OBRIGATÓRIO: string
  name: user.name,
  email: user.email,
  image: user.image,
  role: user.role,
  emailVerified: user.emailVerified,
  createdAt: user.createdAt,
}
}
