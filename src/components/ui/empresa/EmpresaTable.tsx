'use client'
import React from 'react'
import Link from 'next/link'
import { Empresa } from '@/types/empresa'

interface EmpresaTableProps {
  empresas: Empresa[]
}

export default function EmpresaTable({ empresas }: EmpresaTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CNPJ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Setor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contato</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {empresas.map(emp => (
            <tr key={emp.id}>
              <td className="px-6 py-4 whitespace-nowrap">{emp.nome}</td>
              <td className="px-6 py-4 whitespace-nowrap">{emp.cnpj}</td>
              <td className="px-6 py-4 whitespace-nowrap">{emp.setor}</td>
              <td className="px-6 py-4 whitespace-nowrap">{emp.contato_nome} — {emp.contato_email}</td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                <Link href={`/empresas/${emp.id}/edit`}>
                  <button className="text-blue-600 hover:text-blue-800">Editar</button>
                </Link>
                <Link href={`/empresas/${emp.id}`}>  
                  <button className="text-gray-600 hover:text-gray-800">Ver</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
