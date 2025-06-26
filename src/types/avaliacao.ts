// src/types/avaliacao.ts
export interface Avaliacao {
  id: number
  aluno: { id: number; nome: string }
  projeto: { id: number; titulo: string }
  nota: number
  feedback: string | null
  avaliador_nome: string | null
  data_avaliacao: string
}

// Reexportar também o tipo usado no form:
export interface AvaliacaoFormValues {
  alunoId: number
  projetoId: number
  nota: number
  feedback: string
  avaliadorNome: string
}
