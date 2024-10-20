import { ICreateUser } from 'src/models/dtos/user.dto';
import { prisma } from '..';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/models/enums/role';

export class UserRepository {
  async createUserStudent(user: ICreateUser) {
    if (!user.password) {
      throw new Error('Password is required');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: Role.STUDENT,
        created_at: new Date(),
        updated_at: new Date(),
        is_first_access: true,
        points: 0,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findMe(userId: string) {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        level: true,
        points: true,
        is_first_access: true,
      },
    });
  }

  async update(
    userId: string,
    data: Partial<{
      name: string;
      email: string;
      level: string;
      is_first_access: boolean;
      updated_at: Date;
    }>,
  ) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
  }
}
