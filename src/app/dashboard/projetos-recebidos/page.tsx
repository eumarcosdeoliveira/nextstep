// src/app/dashboard/projetos-recebidos/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { ProjetoRecebido } from '@/types/projeto'
// Update the import path if the file exists elsewhere, for example:
import ProjetoRecebidoCard from '../../../components/ui/projeto/ProjetoRecebidoCard'

export default function ProjetosRecebidosPage() {
  const [projetos, setProjetos] = useState<ProjetoRecebido[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/projetos-recebidos')
      .then(res => res.json())
      .then(data => setProjetos(data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Projetos Recebidos</h1>

      {loading ? (
        <p>Carregando projetos…</p>
      ) : projetos.length === 0 ? (
        <p>Nenhum projeto recebido ainda.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projetos.map((p) => (
            <ProjetoRecebidoCard key={p.id} projeto={p} />
          ))}
        </div>
      )}
    </div>
  )
}
