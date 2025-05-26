// src/app/page.tsx
import Link from 'next/link'
import React from 'react'

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Bem-vindo ao NextStep</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/alunos"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">Alunos</h2>
          <p>Gerencie os alunos cadastrados</p>
        </Link>

        <Link
          href="/avaliacoes"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">Avaliações</h2>
          <p>Registre e revise avaliações de projetos</p>
        </Link>

        <Link
          href="/empresas"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">Empresas</h2>
          <p>Cadastre e edite empresas parceiras</p>
        </Link>

        <Link
          href="/instituicoes"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">Instituições</h2>
          <p>Gerencie instituições de ensino</p>
        </Link>

        <Link
          href="/projetos"
          className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">Projetos</h2>
          <p>Visualize e crie novos projetos</p>
        </Link>
      </div>
    </div>
  )
}
