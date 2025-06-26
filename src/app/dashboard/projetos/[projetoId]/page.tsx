// src/app/dashboard/projetos/[projetoId]/page.tsx

import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'

interface PageProps {
  /** No App Router do Next.js 15+, params vem como Promise */
  params: Promise<{ projetoId: string }>
}

export default async function ProjetoDashboardPage({ params }: PageProps) {
  // aguardamos a promise para extrair o ID
  const { projetoId } = await params
  const id = Number(projetoId)

  // busca o projeto com relacionamentos
  const proj = await prisma.projeto.findUnique({
    where: { id },
    include: {
      empresa: true, // inclui dados da empresa
      // incluir outros relacionamentos conforme seu schema
    }
  })

  if (!proj) {
    // dispara a página 404 do Next
    notFound()
  }

  // busca as instituições relacionadas ao projeto através da tabela projetos_ie
  const projetosIE = await prisma.projetos_ie.findMany({
    where: { projeto_id: id },
    include: {
      instituicao_ensino: true, // inclui dados da instituição
      turma: true, // se tiver relação com turma
    }
  })

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{proj.titulo}</h1>
        <Link href="/dashboard/projetos">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            ← Voltar
          </button>
        </Link>
      </header>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-gray-700">
        <div>
          <dt className="font-semibold">Descrição</dt>
          <dd>{proj.descricao ?? '—'}</dd>
        </div>
        <div>
          <dt className="font-semibold">Nível de Dificuldade</dt>
          <dd>{proj.nivel_dificuldade}</dd>
        </div>
        <div>
          <dt className="font-semibold">Empresa</dt>
          <dd>{proj.empresa?.nome ?? `ID: ${proj.empresa_id}`}</dd>
        </div>
        <div>
          <dt className="font-semibold">Área ID</dt>
          <dd>{proj.area_id}</dd>
        </div>
        <div>
          <dt className="font-semibold">Quantidade de Módulos</dt>
          <dd>{proj.qtd_modulos}</dd>
        </div>
        <div>
          <dt className="font-semibold">Data de Criação</dt>
          <dd>
            {new Date(proj.data_criacao).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </dd>
        </div>
      </dl>

      {/* Seção para mostrar instituições relacionadas */}
      {projetosIE.length > 0 && (
        <div className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Instituições Participantes</h2>
          <div className="space-y-4">
            {projetosIE.map((projetoIE: any, index: number) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm">
                  <div>
                    <dt className="font-semibold">Instituição</dt>
                    <dd>{projetoIE.instituicao_ensino?.nome ?? `ID: ${projetoIE.instituicao_id}`}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Data de Início</dt>
                    <dd>
                      {projetoIE.data_inicio 
                        ? new Date(projetoIE.data_inicio).toLocaleDateString('pt-BR')
                        : '—'
                      }
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Progresso</dt>
                    <dd>{projetoIE.progresso ?? 0}%</dd>
                  </div>
                  {projetoIE.turma && (
                    <div>
                      <dt className="font-semibold">Turma</dt>
                      <dd>{projetoIE.turma.nome ?? `ID: ${projetoIE.turma_id}`}</dd>
                    </div>
                  )}
                </dl>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4">
        <Link href={`/dashboard/projetos/${proj.id}/edit`}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Editar
          </button>
        </Link>
      </div>
    </div>
  )
}