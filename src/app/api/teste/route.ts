// src/app/api/teste/route.ts
import { NextResponse } from 'next/server'
import { getAlunoCount } from '@/services/dbService'

export async function GET() {
  const count = await getAlunoCount()
  return NextResponse.json({ alunosCadastrados: count })
}
