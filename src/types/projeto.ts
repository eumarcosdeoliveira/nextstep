export type Modulo = {
  id: number
  projeto_id: number
  titulo: string
  descricao: string
  ordem: number
  duracao_estim: string
}

export type InstituicaoVinculada = {
  id: number
  nome: string
  data_inicio: string
  progresso: number
}

export type Projeto = {
  id: string
  titulo: string
  descricao: string
  nivel_dificuldade: 'Básico' | 'Intermediário' | 'Avançado'
  data_criacao: string
  empresa_id: string
  empresa_nome: string
  area_nome: string
  modulos: Modulo[]
  instituicoes: InstituicaoVinculada[]
}

export type ProjetoRecebido = {
  id: number
  data_inicio: string
  progresso: number
  projeto: {
    titulo: string
    empresa: { nome: string }
    modulo: {
      id: number
      titulo: string
      ordem: number
    }[]
  }
}

