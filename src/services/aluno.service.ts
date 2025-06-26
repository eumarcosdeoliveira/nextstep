// src/services/aluno.service.ts

import { Aluno } from '@/types/aluno'
import { AlunoFormData } from '@/components/ui/aluno/AlunoForm'

/**
 * Busca todos os alunos
 */
export async function getAllAlunos(): Promise<Aluno[]> {
  const res = await fetch('/api/alunos', { cache: 'no-store' })
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}))
    throw new Error((errBody.error as string) || res.statusText)
  }
  return res.json()
}

/**
 * Busca um aluno específico por ID
 */
export async function getAluno(id: string): Promise<Aluno> {
  const res = await fetch(`/api/alunos/${id}`, { cache: 'no-store' })
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}))
    throw new Error((errBody.error as string) || res.statusText)
  }
  return res.json()
}

/**
 * Cria um novo aluno
 */
export async function createAluno(data: AlunoFormData): Promise<Aluno> {
  const payload = {
    ...data,
    instituicao_id: Number(data.instituicao_id),
  }

  const res = await fetch('/api/alunos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}))
    throw new Error((errBody.error as string) || res.statusText)
  }

  return res.json()
}

/**
 * Atualiza um aluno existente
 */
export async function updateAluno(id: string, data: AlunoFormData): Promise<Aluno> {
  const payload = {
    ...data,
    instituicao_id: Number(data.instituicao_id),
  }

  const res = await fetch(`/api/alunos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}))
    throw new Error((errBody.error as string) || res.statusText)
  }

  return res.json()
}

/**
 * Deleta um aluno
 */
export async function deleteAluno(id: string): Promise<void> {
  const res = await fetch(`/api/alunos/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}))
    throw new Error((errBody.error as string) || res.statusText)
  }
}