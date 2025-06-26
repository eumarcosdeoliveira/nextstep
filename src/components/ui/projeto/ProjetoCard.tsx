'use client'

import { Projeto } from '@/types/projeto'
import { Progress } from '@/components/ui/Progress'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

type Props = {
  projeto: Projeto
}

export default function ProjetoCard({ projeto }: Props) {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-5 space-y-4 flex flex-col">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">{projeto.titulo}</h2>
        <span className="text-xs text-gray-400">
          {new Date(projeto.data_criacao).toLocaleDateString()}
        </span>
      </div>

      <p className="text-sm text-gray-600 line-clamp-3">{projeto.descricao}</p>

      <div className="text-sm text-gray-700">
        <b>{projeto.nivel_dificuldade}</b> | Área: {projeto.area_nome}
      </div>

      {projeto.modulos.length > 0 && (
        <div className="space-y-1">
          <h4 className="text-sm font-semibold mt-2">Módulos:</h4>
          {projeto.modulos.map((m) => (
            <div key={m.id} className="text-sm px-3 py-1 bg-indigo-50 rounded shadow-sm">
              <b>{m.ordem}.</b> {m.titulo} — {m.duracao_estim || '?h'}
            </div>
          ))}
        </div>
      )}

      {projeto.instituicoes.length > 0 && (
        <div className="space-y-2 border-t pt-3">
          <h4 className="text-sm font-bold">Instituições vinculadas:</h4>
          {projeto.instituicoes.map((inst) => (
            <div key={inst.id} className="text-sm">
              <div className="font-medium">{inst.nome}</div>
              <div className="text-xs text-gray-500">Início: {inst.data_inicio}</div>
              <Progress value={inst.progresso} className="mt-1" />
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto pt-3 flex justify-end gap-2">
        <Link href={`/dashboard/projetos/${projeto.id}/edit`}>
          <Button variant="outline">Editar</Button>
        </Link>
      </div>
    </div>
  )
}
