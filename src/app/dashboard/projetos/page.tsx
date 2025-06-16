// src/app/projetos/page.tsx

import Link from 'next/link'
import { prisma } from '@/lib/db'
import ProjetoTable from '@/components/ui/projeto/ProjetoTable'
import { Projeto as ProjetoType } from '@/types/projeto'

export default async function ProjetosPage() {
  // Busca direta no banco (Server Component)
  const rawProjetos = await prisma.projeto.findMany({
    include: {
      empresa:            { select: { id: true, nome: true } },
      instituicao_ensino: { select: { id: true, nome: true } },
    },
    orderBy: { data_criacao: 'desc' },
  })

  // Mapeia e ajusta tipos literais conforme seu ProjetoType
  const projetos: ProjetoType[] = rawProjetos.map((p) => ({
    id:                 p.id.toString(),
    titulo:             p.titulo,
    descricao:          p.descricao ?? '',
    nivel_dificuldade:  p.nivel_dificuldade as
      | 'Básico'
      | 'Intermediário'
      | 'Avançado',                     // cast para o union correto
    empresa_id:         p.empresa_id.toString(),
    instituicao_id:     p.instituicao_id.toString(),
    data_criacao:       p.data_criacao.toISOString(),
    // campos extras para exibição, se constarem no seu type:
    empresa_nome:       p.empresa.nome,
    instituicao_nome:   p.instituicao_ensino.nome,
  }))

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projetos</h1>
        <Link href="/projetos/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            + Novo Projeto
          </button>
        </Link>
      </header>

      <ProjetoTable projetos={projetos} />
    </div>
  )
}
