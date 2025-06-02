// src/app/dashboard/page.tsx
'use client'

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts'

export default function DashboardPage() {
  // Dados de exemplo para o BarChart (Performance dos alunos)
  const performanceData = [
    { name: 'Jan', score: 75 },
    { name: 'Fev', score: 60 },
    { name: 'Mar', score: 80 },
    { name: 'Abr', score: 55 },
    { name: 'Mai', score: 90 },
    { name: 'Jun', score: 70 },
  ]

  // Dados de exemplo para Empregabilidade (quatro setores de pizza)
  const empregData1 = [{ name: 'Empregáveis', value: 30 }, { name: 'Não Empregáveis', value: 70 }]
  const empregData2 = [{ name: 'Empregáveis', value: 50 }, { name: 'Não Empregáveis', value: 50 }]
  const empregData3 = [{ name: 'Empregáveis', value: 40 }, { name: 'Não Empregáveis', value: 60 }]
  const empregData4 = [{ name: 'Empregáveis', value: 65 }, { name: 'Não Empregáveis', value: 35 }]

  // Dados de exemplo para Parcerias em andamento (quatro setores de donut)
  const parceriaData1 = [{ name: 'Andamento', value: 45 }, { name: 'Concluídas', value: 55 }]
  const parceriaData2 = [{ name: 'Andamento', value: 60 }, { name: 'Concluídas', value: 40 }]
  const parceriaData3 = [{ name: 'Andamento', value: 25 }, { name: 'Concluídas', value: 75 }]
  const parceriaData4 = [{ name: 'Andamento', value: 80 }, { name: 'Concluídas', value: 20 }]

  // Cores para as pizzas/roscas
  const pieColors = ['#4F46E5', '#E5E7EB'] // azul e cinza claro
  const pieColorsAlt = ['#A855F7', '#E5E7EB'] // violeta e cinza claro
  const pieColorsOrange = ['#F59E0B', '#E5E7EB'] // laranja e cinza claro
  const pieColorsBlue = ['#3B82F6', '#E5E7EB'] // azul claro e cinza claro

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Seção: Gráficos */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Gráficos</h2>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-medium mb-4">Performance dos alunos</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
                <YAxis tick={{ fill: '#6B7280' }} />
                <Tooltip />
                <Bar dataKey="score" fill="#4F46E5" barSize={24} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Seção: Empregabilidade */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Empregabilidade</h2>

        <div className="bg-white rounded-2xl shadow p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Pizza 1 */}
            <div className="flex flex-col items-center">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={empregData1}
                    dataKey="value"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={4}
                  >
                    {empregData1.map((entry, index) => (
                      <Cell key={`cell1-${index}`} fill={pieColors[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <span className="mt-2 text-gray-600">Janeiro</span>
            </div>
            {/* Pizza 2 */}
            <div className="flex flex-col items-center">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={empregData2}
                    dataKey="value"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={4}
                  >
                    {empregData2.map((entry, index) => (
                      <Cell key={`cell2-${index}`} fill={pieColorsAlt[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <span className="mt-2 text-gray-600">Fevereiro</span>
            </div>
            {/* Pizza 3 */}
            <div className="flex flex-col items-center">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={empregData3}
                    dataKey="value"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={4}
                  >
                    {empregData3.map((entry, index) => (
                      <Cell key={`cell3-${index}`} fill={pieColorsOrange[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <span className="mt-2 text-gray-600">Março</span>
            </div>
            {/* Pizza 4 */}
            <div className="flex flex-col items-center">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={empregData4}
                    dataKey="value"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={4}
                  >
                    {empregData4.map((entry, index) => (
                      <Cell key={`cell4-${index}`} fill={pieColorsBlue[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <span className="mt-2 text-gray-600">Abril</span>
            </div>
          </div>
        </div>
      </section>

      {/* Seção: Parcerias em andamento */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Parcerias em andamento</h2>

        <div className="bg-white rounded-2xl shadow p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Donut 1 */}
            <div className="flex flex-col items-center">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={parceriaData1}
                    dataKey="value"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={4}
                  >
                    {parceriaData1.map((entry, index) => (
                      <Cell key={`cellp1-${index}`} fill={pieColorsAlt[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <span className="mt-2 text-gray-600">Projeto A</span>
            </div>
            {/* Donut 2 */}
            <div className="flex flex-col items-center">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={parceriaData2}
                    dataKey="value"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={4}
                  >
                    {parceriaData2.map((entry, index) => (
                      <Cell key={`cellp2-${index}`} fill={pieColorsBlue[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <span className="mt-2 text-gray-600">Projeto B</span>
            </div>
            {/* Donut 3 */}
            <div className="flex flex-col items-center">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={parceriaData3}
                    dataKey="value"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={4}
                  >
                    {parceriaData3.map((entry, index) => (
                      <Cell key={`cellp3-${index}`} fill={pieColors[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <span className="mt-2 text-gray-600">Projeto C</span>
            </div>
            {/* Donut 4 */}
            <div className="flex flex-col items-center">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={parceriaData4}
                    dataKey="value"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={4}
                  >
                    {parceriaData4.map((entry, index) => (
                      <Cell key={`cellp4-${index}`} fill={pieColorsOrange[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <span className="mt-2 text-gray-600">Projeto D</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
