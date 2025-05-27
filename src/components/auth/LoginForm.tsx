'use client'
import { useState } from 'react'
import Link from 'next/link'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function LoginForm() {
  const [showPwd, setShowPwd] = useState(false)

  const inputClasses = `
    w-full
    bg-indigo-50               /* fundo lilás-claro */
    rounded-xl
    py-4 px-6
    text-gray-900              /* cor do texto que o usuário digita */
    placeholder:text-transparent      /* placeholder fica transparente */
    placeholder:bg-clip-text           /* habilita clip do bg no texto do placeholder */
    placeholder:bg-gradient-to-r       /* gradiente da esquerda pra direita */
    placeholder:from-blue-500          /* cor inicial do placeholder */
    placeholder:to-green-400           /* cor final do placeholder */
    focus:outline-none focus:ring-0
  `

  return (
    <form className="space-y-6">
      {/* E-mail */}
      <div>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Digite seu e-mail"
          className={inputClasses}
          required
        />
      </div>

      {/* Senha */}
      <div className="relative">
        <input
          id="password"
          name="password"
          type={showPwd ? 'text' : 'password'}
          placeholder="Senha"
          className={`${inputClasses} pr-12`}
          required
        />
        <button
          type="button"
          onClick={() => setShowPwd(!showPwd)}
          className="absolute inset-y-0 right-4 flex items-center"
        >
          {showPwd
            ? <EyeSlashIcon className="w-5 h-5 text-gray-500" />
            : <EyeIcon className="w-5 h-5 text-gray-500" />
          }
        </button>
      </div>

      {/* Esqueceu a senha */}
      <div className="text-right text-sm">
        <Link
          href="/forgot-password"
          className="text-gray"
        >
          Esqueceu a senha?
        </Link>
      </div>

      {/* Botão Entrar */}
      <button
        type="submit"
        className="
          w-full py-3 rounded-xl
          bg-gradient-to-r from-blue-500 to-green-400
          text-white font-semibold
          hover:opacity-95 transition
        "
      >
        Entrar
      </button>
    </form>
  )
}
