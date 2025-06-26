// src/app/dashboard/page.tsx
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  // Se não estiver logado, redireciona ao login
  if (!session?.user) {
    redirect("/auth/login")
  }

  // Role==1 => rota de empresa
  if (session.user.role === "1") {
    redirect("/dashboard/empresa")
  }

  // Role==2 => rota de instituição
  if (session.user.role === "2") {
    redirect("/dashboard/instituicao")
  }

  // Qualquer outro caso, manda ao login
  redirect("/auth/login")
}
