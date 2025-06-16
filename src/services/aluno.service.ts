import { get, post, put, del } from './api'
import { Aluno } from '@/types/aluno'

// GET /api/alunos
export function getAllAlunos(): Promise<Aluno[]> {
  return get<Aluno[]>('/api/alunos')
}

// GET /api/alunos/:id
export function getAluno(id: string): Promise<Aluno> {
  return get<Aluno>(`/api/alunos/${id}`)
}

// POST /api/alunos
export function createAluno(
  data: Omit<Aluno, 'id' | 'data_cadastro' | 'instituicao_id'>
): Promise<Aluno> {
  return post<Aluno>('/api/alunos', data)
}

// PUT /api/alunos/:id
export function updateAluno(
  id: string,
  data: Omit<Aluno, 'id' | 'data_cadastro' | 'instituicao_id'>
): Promise<Aluno> {
  return put<Aluno>(`/api/alunos/${id}`, data)
}

// DELETE /api/alunos/:id
export function deleteAluno(id: string): Promise<void> {
  return del<void>(`/api/alunos/${id}`)
}
