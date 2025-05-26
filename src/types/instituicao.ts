// src/types/instituicao.ts
export interface Instituicao {
  id: number
  nome: string
  sigla: string | null
  tipo: 'Pública' | 'Privada'
  endereco: string | null
  contato_nome: string
  contato_email: string
  telefone: string | null
  site: string | null
}

export type InstituicaoCreateInput = Omit<Instituicao, 'id'>
export type InstituicaoUpdateInput = Partial<Omit<Instituicao, 'id'>>
