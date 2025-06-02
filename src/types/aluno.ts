// src/types/aluno.ts
export interface Aluno {
  id: number
  nome: string
  email: string
  matricula: string
  nivel_instrucao: string
  instituicao_id: number
  data_cadastro: string   // ou Date, conforme você preferir
}

export interface AlunoOption {
  value: number
  label: string
}
