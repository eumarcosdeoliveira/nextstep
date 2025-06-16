'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import AlunoForm, { AlunoFormData } from '@/components/ui/aluno/AlunoForm'
import { getAluno, updateAluno } from '@/services/aluno.service'
import { getAllInstituicoes} from '@/services/instituicao.service' // ajuste o caminho se necessário
import { Button } from '@/components/ui/Button'
import { Aluno } from '@/types/aluno'
import { Instituicao } from '@/types/instituicao' // ajuste o caminho e tipo conforme seu projeto

export default function DashboardEditAlunoPage() {
  const router = useRouter()
  const { alunoId: raw } = useParams()
  const alunoId = Array.isArray(raw) ? raw[0] : raw

  const [formData, setFormData] = useState<AlunoFormData | null>(null)
  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([])
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  // Carregar dados do aluno
  useEffect(() => {
    if (!alunoId) return
    getAluno(alunoId)
      .then((al: Aluno) => {
        const { nome, email, matricula, nivel_instrucao, instituicao_id } = al
        setFormData({ nome, email, matricula, nivel_instrucao, instituicao_id })
      })
      .catch(() => setError('Falha ao carregar dados do aluno.'))
  }, [alunoId])

  // Carregar instituições para o select
  useEffect(() => {
    getAllInstituicoes()
      .then(setInstituicoes)
      .catch(() => setError('Falha ao carregar instituições.'))
  }, [])

  const handleSave = async (data: AlunoFormData) => {
    setError('')
    setLoading(true)
    try {
      await updateAluno(alunoId!, data)
      router.push('/dashboard/alunos')
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar aluno.')
    } finally {
      setLoading(false)
    }
  }

  if (error) return <p className="p-8 text-red-600">{error}</p>
  if (!formData) return <p className="p-8">Carregando...</p>

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-semibold">Editar Aluno</h1>
        <Link href="/dashboard/alunos" passHref>
          <Button variant="outline">Cancelar</Button>
        </Link>
      </header>

      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto p-8">
          {error && <p className="mb-4 text-red-600">{error}</p>}
          <AlunoForm
            initialData={formData}
            instituicoes={instituicoes}
            submitLabel={loading ? 'Atualizando...' : 'Atualizar'}
            onSubmit={handleSave}
          />
        </div>
      </div>
    </div>
  )
}
