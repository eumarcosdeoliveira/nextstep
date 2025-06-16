// src/app/instituicoes/page.tsx
import Link from 'next/link'
import { prisma } from '@/lib/db'
import InstituicoesClient from '@/components/ui/instituicao/InstituicaoClient'
import { Instituicao as InstituicaoType } from '@/types/instituicao'

export default async function InstituicoesPage() {
  const raw = await prisma.instituicao_ensino.findMany({
    orderBy: { nome: 'asc' },
  })

  const insts: InstituicaoType[] = raw.map((inst) => ({
    id:            inst.id,
    nome:          inst.nome,
    sigla:         inst.sigla ?? '',
    tipo:          inst.tipo as 'Pública' | 'Privada', // cast para a união correta
    endereco:      inst.endereco ?? '',
    contato_nome:  inst.contato_nome,
    contato_email: inst.contato_email,
    telefone:      inst.telefone ?? '',
    site:          inst.site ?? '',
  }))

  return (
    <div className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Instituições</h1>
        <Link
          href="/instituicoes/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Nova Instituição
        </Link>
      </header>

      <InstituicoesClient data={insts} />
    </div>
  )
}
