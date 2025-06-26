'use client'

import { Projeto } from '@/types/projeto'
import ProjetoCard from '@/components/ui/projeto/ProjetoCard'

type Props = {
  projetos: Projeto[]
}

export default function ProjetoKanban({ projetos }: Props) {
  if (!projetos.length) {
    return <p className="text-center text-gray-500">Nenhum projeto cadastrado.</p>
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projetos.map((projeto) => (
        <ProjetoCard key={projeto.id} projeto={projeto} />
      ))}
    </div>
  )
}
