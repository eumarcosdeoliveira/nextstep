// src/lib/db.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // Para evitar múltiplas instâncias em hot-reload
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // opcional: loga cada consulta SQL
  })

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
