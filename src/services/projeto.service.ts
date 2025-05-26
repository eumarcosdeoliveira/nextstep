export type ProjetoOption = {
  id: number
  label: string
}

const baseURL = process.env.NEXT_PUBLIC_API_URL

export async function getAllProjetos(): Promise<ProjetoOption[]> {
  const res = await fetch(`${baseURL}/api/projetos`, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error(`Erro ao buscar projetos: ${res.statusText}`)
  }

  const data: { id: number; titulo: string }[] = await res.json()
  return data.map(p => ({ id: p.id, label: p.titulo }))
}
