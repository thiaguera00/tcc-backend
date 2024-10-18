import { ICreateUser } from 'src/models/interfaces/user.interfaces';
import { prisma } from '..';
import * as bcrypt from 'bcrypt'; // Importar o bcrypt
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
}
