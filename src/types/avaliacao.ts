// src/types/avaliacao.ts

export interface Avaliacao {
  id: number
  nota: number
  feedback: string
  avaliador_nome: string
  data_avaliacao: string
  // Relações incluídas pelo include no Prisma:
  aluno: {
    id: number
    nome: string
  }
  projeto: {
    id: number
    titulo: string
  }
}

// Se você quiser tipos auxiliares para criar/atualizar:
export type AvaliacaoCreateInput = {
  alunoId: number
  projetoId: number
  nota: number
  feedback: string
  avaliador_nome: string
}

export type AvaliacaoUpdateInput = Partial<AvaliacaoCreateInput>
