// src/app/auth/register/instituicao/page.tsx
import RegisterInstituicaoForm from '@/components/auth/RegisterInstituicaoForm'
import Image from 'next/image'
import Link from 'next/link'

export default function RegisterInstituicaoPage() {
  const placeholderGradientClasses =
    'bg-gradient-to-r from-purple-600 to-pink-400 bg-clip-text text-transparent' // Gradiente de cor diferente

  return (
    <div className="flex h-screen bg-white font-sans">
      <div className="flex flex-1 h-screen px-16 space-x-12">
        {/* 1. Logo e textos: topo */}
        <div className="flex flex-col w-1/3 pt-20 space-y-14">
          <Image src="/logo.png" alt="nextstep" width={160} height={40} />
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Cadastro de Instituição</h1>
            <p className="text-3xl text-gray-600 font-semibold">Preencha seus dados</p>
          </div>
          <p className="text-sm text-gray-500">
            Já tem uma conta?{' '}
            <Link
              href="/auth/login"
              className={`font-semibold ${placeholderGradientClasses} hover:underline`}
            >
              ENTRAR
            </Link>
          </p>
        </div>

        {/* 2. Imagem alinhada embaixo */}
        <div className="flex w-1/3 items-end justify-center">
          <Image
            src="/Saly-14.svg" // Mantendo a mesma imagem
            alt="Ilustração de usuário"
            width={320}
            height={320}
            priority
          />
        </div>

        {/* 3. Formulário centralizado verticalmente */}
        <div className="flex w-2/4 items-center justify-center">
          <RegisterInstituicaoForm />
        </div>
      </div>
    </div>
  )
}