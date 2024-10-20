import { IcreateSeach } from 'src/models/dtos/search.dto';
import { prisma } from '..';

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
}
