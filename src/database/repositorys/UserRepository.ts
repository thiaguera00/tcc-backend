import { ICreateUserDTO, IUpdateUser } from "../../models/dtos/UserDto";
import * as bcrypt from 'bcrypt';
import { Role } from "../../models/enums/role";
import { prisma } from "..";
export class UserRepository {
    async createUserStudent(user: ICreateUserDTO) {
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

    async listAll() {
      return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            is_first_access: true,
            points: true,
            created_at: true,
            updated_at: true,
        }
    });
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
  }

  async findById(userId: string) {
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

  async updateUserSearch(
    userId: string,
    data: Partial<{
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

  async updateUser(userId: string, userData: IUpdateUser) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        ...userData,
        updated_at: new Date(),
      },
    });
  }
}