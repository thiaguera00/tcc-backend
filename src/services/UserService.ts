import axios from "axios";
import { UserRepository } from "../database/repositorys/UserRepository";
import { ICreateUserDTO, IUpdateUser } from "../models/dtos/UserDto";
import { SearchRepository } from "../database/repositorys/SearchRepository";
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import { PasswordResetRepository } from "../database/repositorys/PasswordResetRepository";
import * as bcrypt from 'bcrypt';
import { UserConquestRepository } from "../database/repositorys/UserConquestRepository";
import { ConquestRepository } from "../database/repositorys/ConquestRepository";

export class UserService {
    constructor(
      private userRepository: UserRepository, 
      private searchRepository: SearchRepository,
      private passwordResetRepository: PasswordResetRepository,
      private userConquestRepository: UserConquestRepository,
      private conquestRepository: ConquestRepository
    ) {}
    async create(user: ICreateUserDTO) {
      try {
          const newUser = await this.userRepository.createUserStudent(user);
          return newUser;
      } catch (error) {
          console.error('Error creating user:', error);
          throw error;
      }
    }

    async createAdmin(user: ICreateUserDTO) {
      try {
          const newUser = await this.userRepository.createUserAdmin(user);
          return newUser;
      } catch (error) {
          console.error('Error creating user:', error);
          throw error;
      }
    }

    async listAll() {
      const allUser = await this.userRepository.listAll();
      return allUser;
    }

    async findByEmail(email: string) {
      const user = await this.userRepository.findByEmail(email);
      return user;
    }

    async findById(userId: string) {
      const user = await this.userRepository.findById(userId);
      return user;
    }

    async updateUser(userId: string, updateData: IUpdateUser) {
      const existingUser = await this.userRepository.findById(userId);
    
      if (!existingUser) {
        throw new Error('User not found');
      }
    
      if (Object.keys(updateData).length === 0) {
        throw new Error('No data provided to update');
      }
    
      if (updateData.points !== undefined) {
        updateData.points = (existingUser.points || 0) + updateData.points;
      }
    
      const validFields: (keyof IUpdateUser)[] = [
        'name',
        'email',
        'level',
        'points',
        'password',
        'is_first_access',
      ];
    
      const dataToUpdate: Partial<IUpdateUser> = {};
    
      for (const field of validFields) {
        if (updateData[field] !== undefined) {
          dataToUpdate[field] = updateData[field] as any;
        }
      }
    
      if (dataToUpdate.password) {
        const hashedPassword = await bcrypt.hash(dataToUpdate.password, 10);
        dataToUpdate.password = hashedPassword;
      }
    
      const updatedUser = await this.userRepository.updateUser(userId, dataToUpdate);
      return updatedUser;
    }
    
    async assignConquest(userId: string, conquestName: string) {
      try {
        const conquest = await this.conquestRepository.findByName(conquestName);
  
        if (!conquest) {
          throw new Error('Conquista não encontrada');
        }
  
        const userConquest = await this.userConquestRepository.assignConquestToUser(userId, conquest.id);
        return userConquest;
      } catch (error) {
        console.error('Erro ao atribuir conquista ao usuário:', error);
        throw error;
      }
    }

    async classificationStudent(
      responseStudent: string[],
      userId: string,
    ): Promise<string> {
      try {
        console.log(
          'Enviando respostas para a IA:',
          responseStudent[0],
          responseStudent[1],
          responseStudent[2],
        );
  
        const response = await axios.post(
          'https://ia-assistente-python.onrender.com/classificar-nivel/',
          {
            resposta1: responseStudent[0],
            resposta2: responseStudent[1],
            resposta3: responseStudent[2],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );
  
        if (response.status !== 200) {
          throw new Error(
            `Erro na API de classificação da IA. Status code: ${response.status}`,
          );
        }
  
        const nivel = response.data.nivel;
        console.log('Nível determinado pela IA:', nivel);
  
        const createSearchData = {
          userId,
          level_knowledge: responseStudent[0],
          language: responseStudent[1],
          learning_objective: responseStudent[2],
          created_at: new Date(),
          updated_at: new Date(),
        };
  
        await this.searchRepository.create(createSearchData);
  
        const userLevel = this.extractLevelFromIAResponse(nivel);
        await this.userRepository.updateUserSearch(userId, {
          level: userLevel,
          is_first_access: false,
          updated_at: new Date(),
        });
  
        return nivel;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            'Erro ao fazer a requisição:',
            error.response?.data || error.message,
          );
        } else {
          console.error('Erro inesperado:', error);
        }
        throw new Error('Não foi possível obter uma resposta da IA');
      }
  }

    private extractLevelFromIAResponse(response: string): string {
      const nivel = response.toLowerCase();
      const levelsMap = new Map<string, string>([
          ['iniciante', 'Iniciante'],
          ['intermediário', 'Intermediário'],
          ['avançado', 'Avançado']
      ]);
  
      for (const [key, value] of levelsMap.entries()) {
          if (nivel.includes(key)) {
              return value;
          }
      }
      return 'Não identificado';
  } 

  async inactive(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error(`User Not Found: ${userId}`);
    }

    const inactiveUser = await this.userRepository.inactiveUser(userId);

    return inactiveUser
  }

  async recoverPasswordUser(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
        throw new Error("Usuário não encontrado");
    }

    const resetToken = uuidv4();
    const tokenExpires = new Date();
    tokenExpires.setHours(tokenExpires.getHours() + 1);

    await this.passwordResetRepository.createToken(user.id, resetToken, tokenExpires);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env["PASSWORD-EMAIL"],
        },
    });

    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
    const mailOptions = {
        from: '"Nix"',
        to: email,
        subject: "Recuperação de Senha",
        text: `Olá, você solicitou a recuperação de senha. Acesse o link abaixo para redefinir sua senha:\n\n${resetLink}`,
        html: `<p>Olá, você solicitou a recuperação de senha. Acesse o link abaixo para redefinir sua senha:</p><a href="${resetLink}">Redefinir senha</a>`,
    };

    await transporter.sendMail(mailOptions);

    return { message: "E-mail de recuperação enviado com sucesso" };
}

async resetPassword(token: string, newPassword: string) {
    const tokenData = await this.passwordResetRepository.findByToken(token);
    if (!tokenData) {
        throw new Error("Token inválido ou expirado");
    }

    const user = await this.userRepository.findById(tokenData.userId);
    if (!user) {
        throw new Error("Usuário não encontrado");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.updateUser(user.id, { password: hashedPassword });

    await this.passwordResetRepository.deleteToken(token);

    return { message: "Senha redefinida com sucesso" };
  }
}
