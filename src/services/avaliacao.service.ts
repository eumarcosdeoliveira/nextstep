// src/services/avaliacao.service.ts
import axios from 'axios'
import type { Avaliacao } from '@/types/avaliacao'
import type { AvaliacaoFormValues } from '@/components/ui/avaliacao/AvaliacaoForm'

const BASE = '/api/avaliacoes'

export async function getAllAvaliacoes(): Promise<Avaliacao[]> {
  const { data } = await axios.get<Avaliacao[]>(BASE)
  return data
}

export async function createAvaliacao(payload: AvaliacaoFormValues) {
  const { data } = await axios.post<Avaliacao>(BASE, payload)
  return data
}

export async function updateAvaliacao(id: number, payload: AvaliacaoFormValues) {
  const { data } = await axios.put<Avaliacao>(`${BASE}/${id}`, payload)
  return data
}

export async function deleteAvaliacao(id: number) {
  await axios.delete(`${BASE}/${id}`)
}
