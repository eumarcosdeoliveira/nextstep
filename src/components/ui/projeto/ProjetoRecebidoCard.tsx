// src/components/ui/projeto/ProjetoRecebidoCard.tsx
import { ProjetoRecebido } from '@/types/projeto'

type Props = {
  projeto: ProjetoRecebido
}

export default function ProjetoRecebidoCard({ projeto }: Props) {
  const { projeto: dados, data_inicio, progresso } = projeto

  return (
    <div className="bg-white rounded-xl shadow p-4 border space-y-3">
      <div className="space-y-1">
        <h2 className="text-xl font-bold">{dados.titulo}</h2>
        <p className="text-sm text-gray-600">{dados.empresa.nome}</p>
        <p className="text-sm text-gray-500">Iniciado em: {data_inicio?.split('T')[0]}</p>
      </div>

      <div>
        <div className="text-sm text-gray-700 mb-1">Progresso</div>
        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-full"
            style={{ width: `${progresso ?? 0}%` }}
          />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">Módulos:</p>
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          {dados.modulo.map((m) => (
            <li key={m.id}>{m.ordem}. {m.titulo}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
