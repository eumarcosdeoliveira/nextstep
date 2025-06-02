// src/services/empresa.service.ts
import { get, post, put, del } from './api'
import { Empresa } from '@/types/empresa'

export function getEmpresas(): Promise<Empresa[]> {
  return get<Empresa[]>('/api/empresas')
}

export function getEmpresa(id: string): Promise<Empresa> {
  return get<Empresa>(`/api/empresas/${id}`)
}

export function createEmpresa(
  data: Omit<Empresa, 'id'>
): Promise<Empresa> {
  return post<Empresa>('/api/empresas', data)
}

export function updateEmpresa(
  id: string,
  data: Omit<Empresa, 'id'>
): Promise<Empresa> {
  return put<Empresa>(`/api/empresas/${id}`, data)
}

export function deleteEmpresa(id: string): Promise<void> {
  return del<void>(`/api/empresas/${id}`)
}
