import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserConquestRepository {
  async assignConquestToUser(userId: string, conquestId: string) {
    try {
      const userConquest = await prisma.userConquest.create({
        data: {
          user_id: userId,
          conquest_id: conquestId,
          obtained_at: new Date(),
        },
      });
      return userConquest;
    } catch (error) {
      console.error('Erro ao atribuir conquista ao usuário:', error);
      throw error;
    }
  }
}
