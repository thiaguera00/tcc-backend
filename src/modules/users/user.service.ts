import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/database/repository/user.repository';
import { ICreateUser, IUpdateUser } from 'src/models/dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createStudent(user: ICreateUser) {
    try {
      const existingStudent = await this.userRepository.findByEmail(user.email);

      if (existingStudent) {
        throw new ConflictException('Email já cadastrado');
      }

      const createdUser = await this.userRepository.createUserStudent(user);
      return { message: 'sucesso', createdUser };
    } catch (error) {
      console.error('Error ao criar usuario:', error);
      throw new ConflictException('Error ao criar usuario');
    }
  }

  async findMe(userId: string) {
    const user = await this.userRepository.findMe(userId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }
  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async update(userData: IUpdateUser, userId: string) {
    try {
      const existingUser = await this.userRepository.findMe(userId);

      if (!existingUser) {
        throw new NotFoundException('Usuário não encontrado');
      }
      return await this.userRepository.updateUser(userId, userData);
    } catch (error) {
      console.error('Error ao criar usuario:', error);
      throw new ConflictException('Error ao criar usuario');
    }
  }
}
