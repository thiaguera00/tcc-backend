import { ICreateUser } from 'src/interfaces/user.interfaces';
import { prisma } from '..';
import * as bcrypt from 'bcrypt'; // Importar o bcrypt
import { Role } from 'src/enums/role';

export class UserRepository {
  async createUserStudent(user: ICreateUser) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return prisma.user.create({
      data: {
        password: hashedPassword,
        role: Role.STUDENT,
        ...user,
      },
    });
  }
}
