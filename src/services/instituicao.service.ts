// src/services/instituicao.service.ts

import { Instituicao, InstituicaoCreateInput, InstituicaoUpdateInput } from '@/types/instituicao'

/**
 * No cliente, sempre usamos rota relativa para garantir
 * que a chamada vá a /api/instituicoes, independente da página.
 */
const CLIENT_BASE = ''

/**
 * No server (ex.: getStaticProps, getServerSideProps),
 * usar NEXT_PUBLIC_API_URL se quiser apontar a uma instância remota.
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL || CLIENT_BASE

export async function getAllInstituicoes(): Promise<Instituicao[]> {
  const res = await fetch(`${CLIENT_BASE}/api/instituicoes`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Erro ao buscar instituições')
  return res.json()
}

export async function getInstituicao(id: number): Promise<Instituicao> {
  const res = await fetch(`${CLIENT_BASE}/api/instituicoes/${id}`, {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Instituição não encontrada')
  return res.json()
}

export async function createInstituicao(
  data: InstituicaoCreateInput
): Promise<Instituicao> {
  const res = await fetch(`${CLIENT_BASE}/api/instituicoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Erro ao criar instituição')
  return res.json()
}

export async function updateInstituicao(
  id: number,
  data: InstituicaoUpdateInput
): Promise<Instituicao> {
  const res = await fetch(`${CLIENT_BASE}/api/instituicoes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Erro ao atualizar instituição')
  return res.json()
}

export async function deleteInstituicao(id: number): Promise<void> {
  const res = await fetch(`${CLIENT_BASE}/api/instituicoes/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Erro ao deletar instituição')
}
