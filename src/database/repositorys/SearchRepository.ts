import { prisma } from "..";
import { IcreateSeach } from "../../models/dtos/SearchDto";

export class SearchRepository {
    async create(search: IcreateSeach) {
      return prisma.search.create({
        data: {
          user_id: search.userId,
          language: search.language,
          learning_objective: search.learning_objective,
          level_knowledge: search.level_knowledge,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    }

    async listAllResponses() {
      return prisma.search.findMany({
        include: { user: true },
      });
    }
  }