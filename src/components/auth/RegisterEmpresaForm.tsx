'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RegisterEmpresaStep1, { Step1Data } from './RegisterEmpresaStep1'
import RegisterEmpresaStep2, { Step2Data } from './RegisterEmpresaStep2'
import { Toast } from '@/components/ui/Toast'

export default function RegisterEmpresaForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [empresa, setEmpresa] = useState<Step1Data>({
    name: '', cnpj: '', setor: '', site: '',
    contatoNome: '', contatoEmail: ''
  })
  const [user, setUser] = useState<Step2Data>({
    userName: '', userEmail: '', phone: '', password: '', confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ visible: boolean; type: 'success' | 'error'; message: string }>({
    visible: false, type: 'success', message: ''
  })

  const next = () => {
    setUser(u => ({ ...u, userName: empresa.contatoNome, userEmail: empresa.contatoEmail }))
    setStep(2)
  }
  const back = () => setStep(1)

  async function handleSubmit() {
    if (loading) return
    setLoading(true)
    try {
      const empRes = await fetch('/api/empresas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome:          empresa.name,
          cnpj:          empresa.cnpj.replace(/\D/g, ''),
          setor:         empresa.setor,
          site:          empresa.site || null,
          contato_nome:  empresa.contatoNome,
          contato_email: empresa.contatoEmail,
          telefone:      user.phone.replace(/\D/g, '')
        })
      })
      if (!(empRes.status === 200 || empRes.status === 201)) {
        const err = await empRes.json().catch(() => ({}))
        throw new Error(err.error || 'Falha ao criar/obter empresa.')
      }
      const empJson = await empRes.json()
      const empresaId = empJson.id

      const usrRes = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role_id:         1,
          empresa_id:      empresaId,
          name:            user.userName,
          email:           user.userEmail,
          phone:           user.phone.replace(/\D/g, ''),
          password:        user.password,
          confirmPassword: user.confirmPassword
        })
      })
      if (!usrRes.ok) {
        const err = await usrRes.json().catch(() => ({}))
        throw new Error(err.error || 'Falha ao criar usuário.')
      }

      setToast({ visible: true, type: 'success', message: 'Empresa e usuário criados com sucesso!' })
      setTimeout(() => router.push('/auth/login'), 2000)

    } catch (error: any) {
      setToast({ visible: true, type: 'error', message: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 relative">
      {toast.visible && (
        <Toast
          type={toast.type}
          message={toast.message}
          position="top-right"
          onClose={() => setToast(t => ({ ...t, visible: false }))}
        />
      )}

      {step === 1 ? (
        <RegisterEmpresaStep1
          data={empresa}
          onChange={f => setEmpresa(e => ({ ...e, ...f }))}
          onNext={next}
        />
      ) : (
        <RegisterEmpresaStep2
          data={user}
          onChange={f => setUser(u => ({ ...u, ...f }))}
          onBack={back}
          onSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </div>
  )
}
