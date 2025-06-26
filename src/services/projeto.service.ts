import axios from 'axios'
import type { ProjetoFormValues } from '@/components/ui/projeto/ProjetoForm'
import type { Projeto } from '@/types/projeto'

const BASE = '/api/projetos'

export async function createProjeto(payload: ProjetoFormValues): Promise<Projeto> {
  const { data } = await axios.post(BASE, payload)
  return data
}

/**
 * Busca todos os projetos
 */
export async function getAllProjetos(): Promise<Projeto[]> {
  const { data } = await axios.get(BASE) // GET /api/projetos
  return data
}
