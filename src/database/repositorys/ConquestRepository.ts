import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ConquestRepository {
  async findByName(name: string) {
    try {
      const conquest = await prisma.conquest.findUnique({
        where: {
          name: name,
        },
      });
      return conquest;
    } catch (error) {
      console.error('Erro ao buscar conquista pelo nome:', error);
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const conquest = await prisma.conquest.findUnique({
        where: {
          id: id,
        },
      });
      return conquest;
    } catch (error) {
      console.error('Erro ao buscar conquista pelo ID:', error);
      throw error;
    }
  }
}
