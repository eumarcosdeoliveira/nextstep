import ProjetosRecebidosForm from '@/components/ui/projeto/ProjetosRecebidosForm'

export default function CreateProjetosRecebidosPage() {
  return (
    <div className="p-8 space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold">Novo Projeto Recebido</h1>
      <ProjetosRecebidosForm />
    </div>
  )
}
