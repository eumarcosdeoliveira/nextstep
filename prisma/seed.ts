// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1) Instituição de Ensino
  const instituicao = await prisma.instituicao_ensino.create({
    data: {
      nome: 'Universidade de Recife',
      sigla: 'UR',
      tipo: 'Pública',
      endereco: 'Av. dos Testes, 123',
      contato_nome: 'Ana Souza',
      contato_email: 'contato@ur.edu.br',
      telefone: null,
      site: null,
    },
  })

  // 2) Alunos
  const aluno1 = await prisma.aluno.create({
    data: {
      nome: 'João Silva',
      email: 'joao@example.com',
      matricula: '2025001',
      nivel_instrucao: 'Graduação',
      instituicao_id: instituicao.id,
      // data_cadastro deixamos o default CURRENT_TIMESTAMP
    },
  })

  const aluno2 = await prisma.aluno.create({
    data: {
      nome: 'Maria Oliveira',
      email: 'maria@example.com',
      matricula: '2025002',
      nivel_instrucao: 'Mestrado',
      instituicao_id: instituicao.id,
    },
  })

  // 3) (Opcional) Empresa — ajuste ou crie antes se já tiver tabela empresa
  const empresa = await prisma.empresa.create({
    data: {
      nome: 'Empresa Exemplo Ltda',
      cnpj: '12.345.678/0001-90',
      setor: 'Educação',
      contato_nome: 'Carlos Pereira',
      contato_email: 'carlos@exemplo.com',
      telefone: null,
      site: null,
    },
  })

  // 4) Projetos
  const projeto1 = await prisma.projeto.create({
    data: {
      titulo: 'Projeto NextStep',
      descricao: 'Plataforma de gestão acadêmica',
      nivel_dificuldade: 'Médio',
      empresa_id: empresa.id,
      instituicao_id: instituicao.id,
      // data_criacao deixamos o default CURRENT_TIMESTAMP
    },
  })

  const projeto2 = await prisma.projeto.create({
    data: {
      titulo: 'Projeto HarmonyPay',
      descricao: 'Sistema de pagamentos integrado',
      nivel_dificuldade: 'Alto',
      empresa_id: empresa.id,
      instituicao_id: instituicao.id,
    },
  })

  console.log({
    instituicao,
    aluno1,
    aluno2,
    empresa,
    projeto1,
    projeto2,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
