// src/app/avaliacoes/create/page.tsx
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import AvaliacaoForm, { AvaliacaoFormValues } from '@/components/ui/avaliacao/AvaliacaoForm'
import { createAvaliacao } from '@/services/avaliacao.service'
import { Button } from '@/components/ui/Button'
import { Toast } from '@/components/ui/Toast'

export default function CreateAvaliacaoPage() {
  const router = useRouter()
  const [loadingSave, setLoadingSave] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const initialData: Partial<AvaliacaoFormValues> = {
    alunoId: 0,
    projetoId: 0,
    nota: 0,
    feedback: '',
    avaliadorNome: '',
  }

  const handleSave = async (data: AvaliacaoFormValues) => {
    setToast(null)
    setLoadingSave(true)
    try {
      await createAvaliacao(data)
      setToast({ type: 'success', message: 'Avaliação criada com sucesso!' })
      setTimeout(() => router.push('/avaliacoes'), 1000)
    } catch (err: unknown) {
      console.error('Erro ao salvar avaliação:', err)
      const msg = err instanceof Error ? err.message : 'Erro ao salvar avaliação.'
      setToast({ type: 'error', message: msg })
    } finally {
      setLoadingSave(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">Nova Avaliação</h1>
        <Link href="/dashboard/avaliacoes">
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

          <AvaliacaoForm
            initialValues={initialData}
            onSave={handleSave}
            submitLabel={loadingSave ? 'Salvando…' : 'Salvar Avaliação'}
          />
        </section>
      </main>
    </div>
  )
}
