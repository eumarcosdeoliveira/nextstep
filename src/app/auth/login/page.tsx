'use client'
import Image from 'next/image'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="flex h-screen bg-white font-sans">
      {/* Aumento de padding lateral e gap entre colunas */}
      <div className="flex flex-1 h-screen px-16 space-x-12">
        {/* 1. Logo e textos: topo */}
        {/* 1. Logo e textos: topo */}
        <div className="flex flex-col w-1/3 pt-20 space-y-14">
          <Image src="/logo.png" alt="nextstep" width={160} height={40} />
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Entrar</h1>
            <p className="text-3xl text-gray-600 font-semibold">Seja bem-vindo!</p>
          </div>
          <p className="text-sm text-gray-500">
            Se você não possui uma conta,{' '}
            você pode{' '}
            <Link
              href="/auth/register"
              className="font-semibold bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-transparent hover:underline"
            >
              REGISTRAR-SE
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
            {/* Formulário de login padrão */}
            <LoginForm />

            {/* Separador */}
            <div className="flex items-center space-x-6">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="text-gray-500">ou</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* Botão de Login com Google */}
            <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
  className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 hover:bg-gray-100"
          >
            {/* Substitui o SVG inline pelo arquivo em public/google.svg */}
            <Image
              src="/google.svg"
              alt="Google Logo"
              width={24}
              height={24}
            />
            <span className="text-base font-medium">Entrar com Google</span>
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}
