'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RegisterInstituicaoStep1 from './RegisterInstituicaoStep1'
import RegisterInstituicaoStep2 from './RegisterInstituicaoStep2'
import { Toast } from '@/components/ui/Toast'

type FormState = {
  // Step1
  institutionName: string
  sigla: string
  tipo: string
  endereco: string
  site: string
  contatoNome: string
  contatoEmail: string
  telefone: string

  // Step2
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export default function RegisterInstituicaoForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>({
    institutionName: '',
    sigla: '',
    tipo: '',
    endereco: '',
    site: '',
    contatoNome: '',
    contatoEmail: '',
    telefone: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [toast, setToast] = useState<{ visible: boolean; type: 'success' | 'error'; message: string }>({
    visible: false,
    type: 'success',
    message: '',
  })

  const next = () => setStep((s) => Math.min(s + 1, 2))
  const back = () => setStep((s) => Math.max(s - 1, 1))
  const handleChange = (fields: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...fields }))
  }

  async function handleSubmit() {
    try {
      // 1) cria a instituição
      const instRes = await fetch('/api/instituicoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome:          form.institutionName,
          sigla:         form.sigla,
          tipo:          form.tipo,
          endereco:      form.endereco,
          contato_nome:  form.contatoNome,
          contato_email: form.contatoEmail,
          telefone:      form.telefone.replace(/\D/g, ''),
          site:          form.site || null,
        }),
      })
      if (!instRes.ok) {
        const err = await instRes.json().catch(() => ({}))
        throw new Error(err.error || 'Falha ao criar instituição.')
      }
      const { id: instituicao_id } = await instRes.json()

      // 2) cria o usuário vinculado
      const userRes = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role_id:         2,
          instituicao_id,  
          name:            form.contatoNome,
          email:           form.email,
          phone:           form.phone.replace(/\D/g, ''),
          password:        form.password,
          confirmPassword: form.confirmPassword,
        }),
      })
      if (!userRes.ok) {
        const err = await userRes.json().catch(() => ({}))
        throw new Error(err.error || 'Falha ao criar usuário.')
      }

      setToast({ visible: true, type: 'success', message: 'Instituição e usuário criados com sucesso!' })
      setTimeout(() => router.push('/auth/login'), 2000)

    } catch (error: any) {
      setToast({ visible: true, type: 'error', message: error.message })
    }
  }

  return (
    <div className="w-full max-w-md p-8 relative">
      {toast.visible && (
        <Toast
          type={toast.type}
          message={toast.message}
          position="top-right"
          onClose={() => setToast((t) => ({ ...t, visible: false }))}
        />
      )}

      {step === 1 ? (
        <RegisterInstituicaoStep1 data={form} onChange={handleChange} onNext={next} />
      ) : (
        <RegisterInstituicaoStep2
          data={form}
          onChange={handleChange}
          onBack={back}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}
