// src/app/dashboard/page.tsx
import DashboardClient from './DashboardClient'

export default function DashboardPage() {
  // Este componente roda no servidor e só importa o Client Component
  return <DashboardClient />
}
