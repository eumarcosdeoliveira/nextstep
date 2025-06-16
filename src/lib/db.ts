// src/lib/db.ts
import { PrismaClient } from '@prisma/client'

// Use 'var' para declaração de variável global para compatibilidade com hot-reload e TypeScript.
// Adicione um comentário para desabilitar o eslint 'no-var' nesta linha, se necessário.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // opcional: loga cada consulta SQL
  })

// Em ambiente de desenvolvimento, anexa a instância do Prisma ao objeto global.
// Isso evita que o hot-reload do Next.js crie múltiplas instâncias do PrismaClient
// a cada recarregamento, o que pode esgotar as conexões do banco de dados.
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}