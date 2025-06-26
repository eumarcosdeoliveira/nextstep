// src/app/dashboard/DashboardEmpresa.tsx
'use client'

import React, { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer,
} from 'recharts'

// Dados estáticos ou vindos via props (você pode parametrizar depois)
const performanceData = [
  { name: 'Jan', score: 75 },
  { name: 'Fev', score: 60 },
  { name: 'Mar', score: 80 },
  { name: 'Abr', score: 55 },
  { name: 'Mai', score: 90 },
  { name: 'Jun', score: 70 },
]

const empregData = [
  { name: 'Empregáveis', value: 120 },
  { name: 'Não Empregáveis', value: 80 },
]

const parceriaData = [
  { name: 'Andamento', value: 14 },
  { name: 'Concluídas', value: 6 },
]

export default function DashboardEmpresa() {
  const pieColors = ['#4F46E5', '#E5E7EB']

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Performance dos alunos */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Performance dos Projetos</h2>
        <div className="bg-white rounded-2xl shadow p-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
              <YAxis tick={{ fill: '#6B7280' }} />
              <Tooltip />
              <Bar dataKey="score" fill="#4F46E5" barSize={24} radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Empregabilidade */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Melhores Instituições</h2>
        <div className="bg-white rounded-2xl shadow p-6 flex justify-center">
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie data={empregData} dataKey="value" outerRadius={80} innerRadius={50} paddingAngle={4}>
                {empregData.map((_, idx) => (
                  <Cell key={idx} fill={pieColors[idx % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Parcerias em andamento */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Parcerias em andamento</h2>
        <div className="bg-white rounded-2xl shadow p-6 flex justify-center">
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie data={parceriaData} dataKey="value" outerRadius={80} innerRadius={50} paddingAngle={4}>
                {parceriaData.map((_, idx) => (
                  <Cell key={idx} fill={pieColors[idx % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}
