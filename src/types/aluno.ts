// src/types/aluno.ts
export interface Aluno {
  /** Identificador único */
  id: string

  /** Nome completo */
  nome: string

  /** E-mail de acesso */
  email: string

  /** Número de matrícula */
  matricula: string

  /** Nível de instrução (e.g. "Graduação", "Pós") */
  nivel_instrucao: string

  /** ID da instituição à qual o aluno pertence */
  instituicao_id: string

  /** Timestamp de cadastro */
  data_cadastro: string
}
