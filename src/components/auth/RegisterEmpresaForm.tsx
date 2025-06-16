// src/components/auth/RegisterEmpresaForm.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { Toast } from '@/components/ui/Toast' // Caminho conforme seu projeto
import { signIn } from 'next-auth/react'

type FormData = {
  email: string
  name: string // Nome da Empresa
  cnpj: string // CNPJ da Empresa
  phone: string // Telefone da Empresa
  password: string
  confirmPassword: string
  role: 'empresa' // Campo fixo para o tipo de usuário
}

export default function RegisterEmpresaForm() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>({
    email: '',
    name: '',
    cnpj: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'empresa',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // Estados para exibir erros após tentativa de submit
  const [showValidationErrors, setShowValidationErrors] = useState(false)
  const [passwordMismatchError, setPasswordMismatchError] = useState(false)

  // Estados para validação de senha (serão verificados e usados pelos spans no submit)
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    hasLetter: false,
    hasNumber: false,
    hasSpecialChar: false,
  })

  // Estados para controlar o Toast (feedback geral de sucesso/falha na API)
  const [toast, setToast] = useState<{
    visible: boolean
    type: 'success' | 'error'
    message: string
  }>({ visible: false, type: 'success', message: '' })

  // Função para formatar CNPJ
  const formatCnpj = (value: string) => {
    let cleanedValue = value.replace(/\D/g, '');
    cleanedValue = cleanedValue.substring(0, 14);

    if (cleanedValue.length > 12) {
      return cleanedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    } else if (cleanedValue.length > 8) {
      return cleanedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4');
    } else if (cleanedValue.length > 5) {
      return cleanedValue.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else if (cleanedValue.length > 2) {
      return cleanedValue.replace(/(\d{2})(\d{0,3})/, '$1.$2');
    } else {
      return cleanedValue;
    }
  };

  // Função para formatar Telefone
  const formatPhone = (value: string) => {
    let cleanedValue = value.replace(/\D/g, '')
    cleanedValue = cleanedValue.substring(0, 11)

    if (cleanedValue.length > 10) { // (XX) XXXXX-XXXX
      cleanedValue = cleanedValue.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (cleanedValue.length > 6) { // (XX) XXXX-XXXX
      cleanedValue = cleanedValue.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (cleanedValue.length > 2) { // (XX) XXX
      cleanedValue = cleanedValue.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
    } else if (cleanedValue.length > 0) { // (X
      cleanedValue = cleanedValue.replace(/^(\d*)/, '($1');
    }
    return cleanedValue
  }

  // Função para validar a senha (complexidade)
  const checkPasswordComplexity = (password: string) => {
    const minLength = password.length >= 8
    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)

    return {
      isValid: minLength && hasLetter && hasNumber && hasSpecialChar,
      criteria: { minLength, hasLetter, hasNumber, hasSpecialChar }
    }
  }

  // Função para validar o telefone (min 10 ou 11 dígitos puros)
  const validatePhone = (phone: string) => {
    const cleanedPhone = phone.replace(/\D/g, '')
    return cleanedPhone.length >= 10 && cleanedPhone.length <= 11
  }

  // Funções de onChange dos inputs
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, password: e.target.value }))
    if (passwordMismatchError) setPasswordMismatchError(false);
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
    if (passwordMismatchError) setPasswordMismatchError(false);
  }

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCnpj = formatCnpj(e.target.value)
    setForm((prev) => ({ ...prev, cnpj: formattedCnpj }))
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value)
    setForm((prev) => ({ ...prev, phone: formattedPhone }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowValidationErrors(true);
    setPasswordMismatchError(false);

    let hasErrors = false;

    // 1. Validação de campos obrigatórios
    if (!form.email.trim() || !form.name.trim() || !form.password.trim() || !form.confirmPassword.trim() || !form.cnpj.trim() || !form.phone.trim()) {
      setToast({ visible: true, type: 'error', message: 'Por favor, preencha todos os campos obrigatórios.' });
      hasErrors = true;
    }

    // 2. Validação de senhas coincidentes
    if (form.password !== form.confirmPassword) {
      setPasswordMismatchError(true);
      setToast({ visible: true, type: 'error', message: 'As senhas não coincidem.' });
      hasErrors = true;
    }

    // 3. Validação de complexidade da senha
    const passwordCheckResult = checkPasswordComplexity(form.password);
    setPasswordCriteria(passwordCheckResult.criteria);
    if (!passwordCheckResult.isValid) {
      setToast({ visible: true, type: 'error', message: 'A senha não atende a todos os critérios de segurança.' });
      hasErrors = true;
    }

    // 4. Validação de CNPJ
    if (form.cnpj.replace(/\D/g, '').length !== 14) {
      setToast({ visible: true, type: 'error', message: 'Por favor, insira um CNPJ válido com 14 dígitos.' });
      hasErrors = true;
    }

    // 5. Validação de Telefone
    if (!validatePhone(form.phone)) {
      setToast({ visible: true, type: 'error', message: 'Por favor, insira um telefone válido com 10 ou 11 dígitos (com DDD).' });
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
          phone: form.phone.replace(/\D/g, ''),
          document: form.cnpj.replace(/\D/g, ''),
          role: form.role,
        }),
      })

      if (res.ok) {
        setToast({ visible: true, type: 'success', message: 'Conta de empresa criada com sucesso!' });
        setShowValidationErrors(false);
        setTimeout(() => {
          router.push('/auth/login')
        }, 2000)
      } else {
        const data = await res.json().catch(() => ({}))
        const msg = data.error || 'Erro ao registrar empresa'
        setToast({ visible: true, type: 'error', message: msg })
      }
    } catch {
      setToast({ visible: true, type: 'error', message: 'Erro de conexão. Tente novamente.' })
    }
  }

  const placeholderGradientClasses =
    'placeholder:bg-gradient-to-r placeholder:from-blue-600 placeholder:to-green-400 placeholder:bg-clip-text placeholder:text-transparent'

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

      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Cadastro de Empresa</h2>

        {/* Nome da Empresa */}
        <div>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Nome da Empresa"
            className={`
              w-full
              bg-indigo-50
              text-gray-900
              px-4 py-4
              rounded-xl
              focus:outline-none focus:ring-0
              ${placeholderGradientClasses}
            `}
          />
        </div>

        {/* E-mail da Empresa */}
        <div>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="E-mail da Empresa"
            className={`
              w-full
              bg-indigo-50
              text-gray-900
              px-4 py-4
              rounded-xl
              focus:outline-none focus:ring-0
              ${placeholderGradientClasses}
            `}
          />
        </div>

        {/* CNPJ */}
        <div>
          <input
            type="text"
            required
            value={form.cnpj}
            onChange={handleCnpjChange}
            placeholder="CNPJ (Ex: 00.000.000/0000-00)"
            maxLength={18}
            className={`
              w-full
              bg-indigo-50
              text-gray-900
              px-4 py-4
              rounded-xl
              focus:outline-none focus:ring-0
              ${placeholderGradientClasses}
            `}
          />
          {/* Validação de CNPJ após tentativa de submit */}
          {showValidationErrors && form.cnpj.replace(/\D/g, '').length !== 14 && (
            <span className="block text-red-500 text-sm pl-2 mt-1">
              ✗ CNPJ deve ter 14 dígitos.
            </span>
          )}
        </div>

        {/* Telefone de Contato */}
        <div>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={handlePhoneChange}
            placeholder="Telefone (Ex: (XX) XXXXX-XXXX)"
            maxLength={15}
            className={`
              w-full
              bg-indigo-50
              text-gray-900
              px-4 py-4
              rounded-xl
              focus:outline-none focus:ring-0
              ${placeholderGradientClasses}
            `}
          />
          {/* Validação de Telefone após tentativa de submit */}
          {showValidationErrors && !validatePhone(form.phone) && form.phone.replace(/\D/g, '').length > 0 && (
            <span className="block text-red-500 text-sm pl-2 mt-1">
              ✗ Telefone deve ter 10 ou 11 dígitos (com DDD).
            </span>
          )}
        </div>

        {/* Senha */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={form.password}
            onChange={handlePasswordChange}
            placeholder="Senha (mín. 8 caracteres)"
            className={`
              w-full
              bg-indigo-50
              text-gray-900
              px-4 py-4
              rounded-xl
              focus:outline-none focus:ring-0
              pr-12
              ${placeholderGradientClasses}
            `}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-indigo-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Spans de Validação de Senha - Visíveis apenas após a tentativa de submit */}
        {showValidationErrors && (!passwordCriteria.minLength || !passwordCriteria.hasLetter || !passwordCriteria.hasNumber || !passwordCriteria.hasSpecialChar) && (
          <div className="text-sm text-gray-600 pl-2 space-y-1">
            <span className={`block ${passwordCriteria.minLength ? 'text-green-600' : 'text-red-500'}`}>
              {passwordCriteria.minLength ? '✓' : '✗'} Mínimo de 8 caracteres
            </span>
            <span className={`block ${passwordCriteria.hasLetter ? 'text-green-600' : 'text-red-500'}`}>
              {passwordCriteria.hasLetter ? '✓' : '✗'} Pelo menos uma letra (a-z, A-Z)
            </span>
            <span className={`block ${passwordCriteria.hasNumber ? 'text-green-600' : 'text-red-500'}`}>
              {passwordCriteria.hasNumber ? '✓' : '✗'} Pelo menos um número (0-9)
            </span>
            <span className={`block ${passwordCriteria.hasSpecialChar ? 'text-green-600' : 'text-red-500'}`}>
              {passwordCriteria.hasSpecialChar ? '✓' : '✗'} Pelo menos um caractere especial (!@#$...)
            </span>
          </div>
        )}

        {/* Confirmar Senha */}
        <div className="relative">
          <input
            type={showConfirm ? 'text' : 'password'}
            required
            value={form.confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirmar Senha"
            className={`
              w-full
              bg-indigo-50
              text-gray-900
              px-4 py-4
              rounded-xl
              focus:outline-none focus:ring-0
              pr-12
              ${placeholderGradientClasses}
            `}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-indigo-500"
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Erro de senhas não conferem - Visível apenas após a tentativa de submit */}
        {showValidationErrors && passwordMismatchError && (
          <span className="block text-red-500 text-sm pl-2 mt-1">
            ✗ As senhas não conferem.
          </span>
        )}

        {/* Botão Criar conta de Empresa */}
        <button
          type="submit"
          className="
            w-full
            py-4
            rounded-2xl
            bg-gradient-to-r from-blue-600 to-green-400
            text-white
            text-lg font-medium
            shadow-xl
            hover:opacity-95
            transition-opacity
          "
        >
          Criar conta de Empresa
        </button>

        {/* O 'error' genérico foi removido, substituído pelos Toast e spans específicos. */}
        {/* {error && <p className="text-red-600 text-sm text-center">{error}</p>} */}
      </form>

      <div className="mt-8 mb-8 text-center text-gray-400">ou entre com</div>

      <button
        onClick={() => signIn('google', { callbackUrl: '/' })}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 hover:bg-gray-100"
      >
        <Image src="/google.svg" alt="Google Logo" width={24} height={24} />
        <span className="text-base font-medium">Entrar com Google</span>
      </button>
      

      <div className="mt-4 text-center text-gray-500">
        <p className="text-sm text-gray-500">
          Não é uma empresa?{' '}
          <Link
            href="/auth/register" // Volta para a escolha de perfil
            className={`font-semibold ${placeholderGradientClasses} hover:underline`}
          >
            Voltar
          </Link>
        </p>
      </div>
    </div>
  )
}