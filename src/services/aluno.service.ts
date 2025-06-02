// src/services/aluno.service.ts
import { get, post, put, del } from './api'
import { Aluno } from '@/types/aluno'

export function getAllAlunos(): Promise<Aluno[]> {
  return get<Aluno[]>('/api/alunos')
}

export function getAluno(id: string): Promise<Aluno> {
  return get<Aluno>(`/api/alunos/${id}`)
}

export function createAluno(
  data: Omit<Aluno, 'id' | 'data_cadastro'> & { data_cadastro: string }
): Promise<Aluno> {
  return post<Aluno>('/api/alunos', data)
}

export function updateAluno(
  id: string,
  data: Omit<Aluno, 'id' | 'data_cadastro'> & { data_cadastro: string }
): Promise<Aluno> {
  return put<Aluno>(`/api/alunos/${id}`, data)
}

export function deleteAluno(id: string): Promise<void> {
  return del<void>(`/api/alunos/${id}`)
}
