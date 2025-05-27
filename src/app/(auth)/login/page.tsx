'use client'
import Image from 'next/image'
import Link from 'next/link'
import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar Fixa */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 flex items-center gap-2">
          <Image src="/logo.png" alt="NextStep" width={32} height={32} />
          <span className="text-2xl font-semibold">NextStep</span>
        </div>
        <nav className="flex-1 flex flex-col px-4 space-y-2 text-gray-700">
          <Link href="/alunos">Alunos</Link>
          <Link href="/avaliacoes">Avaliações</Link>
          <Link href="/empresas">Empresas</Link>
          <Link href="/instituicoes">Instituições</Link>
          <Link href="/projetos">Projetos</Link>
        </nav>
        {/* Rodapé sidebar, opcional */}
        <div className="p-4 text-xs text-gray-400">N</div>
      </aside>

      {/* Main: 3 colunas */}
      <div className="flex flex-1 h-screen">
        {/* 1. Logo e textos: topo */}
        <div className="flex flex-col w-1/3 pl-16 pt-16">
          <Image src="/logo.png" alt="nextstep" width={160} height={40} />
          <h1 className="mt-4 text-4xl font-bold">Entrar</h1>
          <p className="mt-2 text-lg text-gray-600">Seja bem-vindo!</p>
          <p className="mt-4 text-sm text-gray-500">
            Se você não possui uma conta,{' '}
            <Link
              href="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              REGISTRAR-SE
            </Link>
          </p>
        </div>
        {/* 2. Imagem centralizada verticalmente */}
        <div className="flex w-1/3 items-center justify-center">
          <Image
            src="/Saly-14.png"
            alt="Ilustração de usuário"
            width={320}
            height={320}
            priority
          />
        </div>
        {/* 3. Formulário centralizado verticalmente */}
        <div className="flex w-1/3 items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
