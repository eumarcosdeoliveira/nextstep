export type AlunoOption = {
  id: number
  label: string
}

const baseURL = process.env.NEXT_PUBLIC_API_URL

export async function getAllAlunos(): Promise<AlunoOption[]> {
  const res = await fetch(`${baseURL}/api/alunos`, { cache: 'no-store' })
  
  if (!res.ok) {
    throw new Error(`Erro ao buscar alunos: ${res.statusText}`)
  }

  const data: { id: number; nome: string }[] = await res.json()
  return data.map(a => ({ id: a.id, label: a.nome }))
}
