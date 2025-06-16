// src/types/avaliacao.ts

export interface Avaliacao {
  id: number
  aluno_id: number
  projeto_id: number
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
  aluno_id: number
  projeto_id: number
  nota: number
  feedback: string
  avaliador_nome: string
}

export type AvaliacaoUpdateInput = Partial<AvaliacaoCreateInput>
