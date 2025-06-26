// src/app/dashboard/projetos-recebidos/[projetos-recebidosid]/page.tsx

import { prisma } from '@/lib/db'
import ProjetosRecebidosForm from '@/components/ui/projeto/ProjetosRecebidosForm'

type PageProps = {
  params: Promise<{
    'projetos-recebidosid': string
  }>
}

export default async function EditProjetosRecebidosPage({ params }: PageProps) {
  // Aguarda a resolução dos parâmetros
  const resolvedParams = await params
  
  // Converte o id para number, pois o banco espera number
  const proj = await prisma.projetos_ie.findUnique({
    where: { id: Number(resolvedParams['projetos-recebidosid']) }
  })

  if (!proj)
    return <p className="text-red-600">Projeto não encontrado.</p>

  return (
    <div className="p-8 space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold">Editar Projeto Recebido</h1>
      <ProjetosRecebidosForm
        initial={{
          projeto_id: proj.projeto_id,
          instituicao_id: proj.instituicao_id,
          turma_id: proj.turma_id,
          data_inicio: proj.data_inicio?.toISOString().split('T')[0] ?? '',
          progresso: Number(proj.progresso ?? 0),
        }}
      />
    </div>
  )
}