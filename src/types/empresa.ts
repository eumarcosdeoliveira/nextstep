export interface Empresa {
  /** Identificador único */
  id: string

  /** Nome comercial da empresa */
  nome: string

  /** CNPJ no formato “00.000.000/0000-00” */
  cnpj: string

  /** Setor de atuação */
  setor: string

  /** Pessoa de contato */
  contato_nome: string

  /** E-mail de contato */
  contato_email: string

  /** Telefone (opcional) */
  telefone?: string

  /** Site ou LinkedIn (opcional) */
  site?: string
}