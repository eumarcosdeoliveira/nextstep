import Sidebar from '@/components/ui/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Sidebar />
        <main className="ml-16 md:ml-64 transition-all duration-300 pt-6">
          {children}
        </main>
      </body>
    </html>
  )
}
