// src/services/dbService.ts
import { prisma } from '@/lib/db'

/**
 * Testa a conexão contando quantos alunos existem.
 */
export async function getAlunoCount(): Promise<number> {
  return prisma.aluno.count()
}
