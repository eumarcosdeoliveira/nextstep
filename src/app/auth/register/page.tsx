// src/app/auth/register/page.tsx
'use client'
import Image from 'next/image'
import Link from 'next/link'
import RegisterForm from '@/components/auth/RegisterForm' // assume este componente existe
import { Eye, EyeOff } from 'lucide-react' // se necessário para o RegisterForm

export default function RegisterPage() {
  return (
    <div className="flex h-screen bg-white font-sans">
      <div className="flex flex-1 h-screen px-16 space-x-12">
        {/* 1. Logo e textos: topo */}
        <div className="flex flex-col w-1/3 pt-20 space-y-14">
          <Image src="/logo.png" alt="nextstep" width={160} height={40} />
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Registrar-se</h1>
            <p className="text-3xl text-gray-600 font-semibold">Seja bem-vindo!</p>
          </div>
          <p className="text-sm text-gray-500">
            Se você já possui uma conta, você pode{' '}
            <Link
              href="/auth/login"
              className="font-semibold bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-transparent hover:underline"
            >
              ENTRAR
            </Link>
          </p>
        </div>

        {/* 2. Imagem alinhada embaixo */}
        <div className="flex w-1/3 items-end justify-center">
          <Image
            src="/Saly-14.svg"
            alt="Ilustração de usuário"
            width={320}
            height={320}
            priority
          />
        </div>

        {/* 3. Formulário centralizado verticalmente */}
        <div className="flex w-2/4 items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            {/* Componente de Registro */}
            <RegisterForm />


          </div>
        </div>
      </div>
    </div>
  )
}
