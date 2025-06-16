// src/app/dashboard/alunos/create/page.tsx
'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import AlunoForm, { AlunoFormData } from '@/components/ui/aluno/AlunoForm'
import { createAluno } from '@/services/aluno.service'
import { getAllInstituicoes } from '@/services/instituicao.service'  // CORREÇÃO AQUI
import { Instituicao } from '@/types/instituicao'
import { Button } from '@/components/ui/Button'
import { Toast } from '@/components/ui/Toast'

export default function DashboardCreateAlunoPage() {
  const router = useRouter()
  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([])
  const [loadingInst, setLoadingInst] = useState(true)
  const [loadingSave, setLoadingSave] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Matrícula aleatória de 8 dígitos
  const generatedMatricula = useMemo(
    () => Math.floor(Math.random() * 1e8).toString().padStart(8, '0'),
    []
  )

  // Carrega instituições ao montar
  useEffect(() => {
    getAllInstituicoes()
      .then(setInstituicoes)
      .catch((err: unknown) => {  // agora tipado como unknown
        console.error('Erro ao carregar instituições:', err)
        setToast({ type: 'error', message: 'Erro ao carregar instituições.' })
      })
      .finally(() => setLoadingInst(false))
  }, [])

  const initialData: Partial<AlunoFormData> = {
    matricula: generatedMatricula,
    nivel_instrucao: 'Graduação',
    instituicao_id: 0,
  }

  const handleSave = async (data: AlunoFormData) => {
    setToast(null)
    setLoadingSave(true)
    try {
      await createAluno(data)
      setToast({ type: 'success', message: 'Aluno criado com sucesso!' })
      setTimeout(() => {
        router.push('/dashboard/alunos')
      }, 1000)
    } catch (err: unknown) {
      console.error('Erro ao salvar aluno:', err)
      const msg = err instanceof Error ? err.message : 'Erro ao salvar aluno.'
      setToast({ type: 'error', message: msg })
    } finally {
      setLoadingSave(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">Novo Aluno</h1>
        <Link href="/dashboard/alunos" passHref>
          <Button variant="outline">Cancelar</Button>
        </Link>
      </header>

      <main className="flex-1 overflow-auto p-6 lg:p-8">
        <section className="max-w-3xl mx-auto p-8 md:p-10">
          {toast && (
            <Toast
              type={toast.type}
              message={toast.message}
              position="bottom-right"
              onClose={() => setToast(null)}
            />
          )}

          {loadingInst ? (
            <p className="text-center text-gray-600">Carregando instituições…</p>
          ) : (
            <AlunoForm
              initialData={initialData}
              instituicoes={instituicoes}
              submitLabel={loadingSave ? 'Salvando…' : 'Salvar Aluno'}
              onSubmit={handleSave}
            />
          )}
        </section>
      </main>
    </div>
  )
}
