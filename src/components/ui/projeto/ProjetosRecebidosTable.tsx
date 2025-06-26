'use client'

import { ProjetoRecebido } from '@/types/projeto'
import { Progress } from '@/components/ui/Progress'

type Props = {
  projetos: ProjetoRecebido[]
}

export default function ProjetosRecebidosTable({ projetos }: Props) {
  return (
    <div className="overflow-hidden border rounded-xl shadow-sm">
      <table className="min-w-full table-auto bg-white text-sm text-gray-800">
        <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
          <tr>
            <th className="px-6 py-4 text-left">Projeto</th>
            <th className="px-6 py-4 text-left">Empresa</th>
            <th className="px-6 py-4 text-left">Data de Início</th>
            <th className="px-6 py-4 text-left">Progresso</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {projetos.map((proj) => (
            <tr
              key={proj.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 font-medium">
                {/* Use as propriedades conforme definidas no tipo ProjetoRecebido */}
                {(proj as any).titulo || (proj as any).nome || (proj as any).title || 'Sem título'}
              </td>
              <td className="px-6 py-4">
                {(proj as any).empresa_nome || (proj as any).empresa?.nome || 'Sem empresa'}
              </td>
              <td className="px-6 py-4">
                {(proj as any).data_inicio || (proj as any).dataInicio || 'Sem data'}
              </td>
              <td className="px-6 py-4">
                <Progress value={(proj as any).progresso || 0} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}