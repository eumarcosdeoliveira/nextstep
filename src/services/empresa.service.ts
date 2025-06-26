// src/services/empresa.service.ts
import axios from 'axios'
import type { EmpresaFormValues } from '@/components/ui/empresa/EmpresaForm'
import type { Empresa } from '@/types/empresa'

const BASE = '/api/empresas'

export async function createEmpresa(payload: EmpresaFormValues) {
  const { data } = await axios.post(BASE, payload)
  return data
}

export async function getAllEmpresas(): Promise<Empresa[]> {
  const { data } = await axios.get<Empresa[]>(BASE)
  return data
}