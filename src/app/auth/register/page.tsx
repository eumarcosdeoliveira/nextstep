// src/app/auth/register/page.tsx
'use client'
import { useRouter } from 'next/navigation' // Importe useRouter
import Image from 'next/image'
import Link from 'next/link'

export default function RegisterPage() { // Renomeado de ChooseRolePage para RegisterPage
  const router = useRouter()

  const placeholderGradientClasses =
    'bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-transparent' // Classe do gradiente para reutilizar

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
              href="/auth/login" // Link correto para o login
              className={`font-semibold ${placeholderGradientClasses} hover:underline`} // Reutilizando a classe
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

        {/* 3. Formulário centralizado verticalmente - AGORA COM OS BOTÕES DE ESCOLHA */}
        <div className="flex w-2/4 items-center justify-center">
          <div className="w-full max-w-md space-y-8 p-8 text-center"> {/* Adicionado bg e shadow para destaque */}
            <div className="space-y-6">
               <button
                onClick={() => router.push('/auth/register/instituicao')}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-green-400 text-white text-lg font-medium shadow-xl hover:opacity-95 transition-opacity"
              >
                Eu sou uma Instituição de Ensino
              </button>
              <button
                onClick={() => router.push('/auth/register/empresa')}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-400 text-white text-lg font-medium shadow-xl hover:opacity-95 transition-opacity"
              >
                Eu sou uma Empresa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}