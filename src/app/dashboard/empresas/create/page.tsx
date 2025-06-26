'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import ProjetoForm, { ProjetoFormValues } from '@/components/ui/projeto/ProjetoForm'
import { createProjeto } from '@/services/projeto.service'
import { Button } from '@/components/ui/Button'
import { Toast } from '@/components/ui/Toast'

export default function CreateProjetoPage() {
  const router = useRouter()
  const [loadingSave, setLoadingSave] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const initialData: Partial<ProjetoFormValues> = {
    titulo:            '',
    descricao:         '',
    nivel_dificuldade: 'Básico',
    empresaId:         0,
    areaId:            0,
  }

  const handleSave = async (data: ProjetoFormValues) => {
    setToast(null)
    setLoadingSave(true)
    try {
      await createProjeto(data)
      setToast({ type: 'success', message: 'Projeto criado com sucesso!' })
      setTimeout(() => router.push('/projetos'), 1000)
    } catch (err: unknown) {
      console.error('Erro ao salvar projeto:', err)
      const msg = err instanceof Error ? err.message : 'Erro ao salvar projeto.'
      setToast({ type: 'error', message: msg })
    } finally {
      setLoadingSave(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">Novo Projeto</h1>
        <Link href="/projetos">
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

          <ProjetoForm
            initialValues={initialData}
            onSave={handleSave}
            submitLabel={loadingSave ? 'Salvando…' : 'Salvar Projeto'}
          />
        </section>
      </main>
    </div>
  )
}
