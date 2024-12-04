import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const conquistas = [
    { name: 'Cérebro', description: 'VOCÊ JÁ PENSA COMO UM PROGRAMADOR!', reward: 50 },
    { name: 'Variável', description: 'VARIÁVEIS E TIPOS DE DADOS? FÁCIL PARA VOCÊ!', reward: 50 },
    { name: 'Decisão', description: 'DECISÕES INTELIGENTES NO CÓDIGO, ÓTIMO TRABALHO!', reward: 50 },
    { name: 'Estrutura', description: 'ESTRUTURAS LÓGICAS? FEITAS COM SUCESSO!', reward: 50 },
    { name: 'Projeto Final', description: 'VOCÊ CHEGOU AO GRANDE DESAFIO FINAL!', reward: 100 }
  ];

  for (const conquista of conquistas) {
    try {
      await prisma.conquest.create({
        data: {
          name: conquista.name,
          description: conquista.description,
          reward: conquista.reward,
        },
      });
      console.log(`Conquista '${conquista.name}' inserida com sucesso!`);
    } catch (error) {
      console.error(`Erro ao inserir conquista '${conquista.name}':`, error);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
