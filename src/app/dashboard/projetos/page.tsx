import Link from 'next/link'
import { prisma } from '@/lib/db'
import ProjetoKanban from '@/components/ui/projeto/ProjetoKanban'
import { Projeto as ProjetoType } from '@/types/projeto'
import { Button } from '@/components/ui/Button'

export default async function ProjetosPage() {
  const rawProjetos = await prisma.projeto.findMany({
    include: {
      empresa: { select: { id: true, nome: true } },
      area:    { select: { nome: true } },
      modulo: {
        orderBy: { ordem: 'asc' },
        select: {
          id: true,
          titulo: true,
          ordem: true,
          descricao: true,
          duracao_estim: true,
          projeto_id: true
        }
      },
      projetos_ie: {
        include: {
          instituicao_ensino: { select: { id: true, nome: true } }
        }
      }
    },
    orderBy: { data_criacao: 'desc' }
  })

  const projetos: ProjetoType[] = rawProjetos.map((p) => ({
    id: p.id.toString(),
    titulo: p.titulo,
    descricao: p.descricao ?? '',
    nivel_dificuldade: p.nivel_dificuldade as 'Básico' | 'Intermediário' | 'Avançado',
    empresa_id: p.empresa_id.toString(),
    empresa_nome: p.empresa?.nome ?? '',
    data_criacao: p.data_criacao.toISOString(),
    area_nome: p.area?.nome ?? '',
    modulos: p.modulo.map((m) => ({
      id: m.id,
      projeto_id: m.projeto_id,
      titulo: m.titulo,
      descricao: m.descricao ?? '',
      ordem: m.ordem,
      duracao_estim: m.duracao_estim ? m.duracao_estim.toString() : ''
    })),
    instituicoes: p.projetos_ie.map((v) => ({
      id: v.instituicao_ensino.id,
      nome: v.instituicao_ensino.nome,
      data_inicio: v.data_inicio?.toISOString().split('T')[0] ?? '',
      progresso: Number(v.progresso ?? 0)
    }))
  }))

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projetos</h1>
        <Button>
          <Link href="/dashboard/projetos/create">
            + Novo Projeto
          </Link>
        </Button>
      </header>

      <ProjetoKanban projetos={projetos} />
    </div>
  )
}
