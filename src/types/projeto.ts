// src/types/projeto.ts

export interface Projeto {
  /** Identificador único */
  id: string

  /** Título curto do desafio */
  titulo: string

  /** Descrição detalhada (opcional) */
  descricao?: string

  /** Nível de dificuldade */
  nivel_dificuldade: 'Básico' | 'Intermediário' | 'Avançado'

  /** ID da empresa que criou o projeto */
  empresa_id: string

  /** ID da instituição vinculada ao projeto */
  instituicao_id: string

  /** Timestamp ISO de criação */
  data_criacao: string
}
