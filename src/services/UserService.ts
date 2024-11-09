import axios from "axios";
import { UserRepository } from "../database/repositorys/UserRepository";
import { ICreateUserDTO } from "../models/dtos/UserDto";
import { SearchRepository } from "../database/repositorys/SearchRepository";

export class UserService {
    constructor(private userRepository: UserRepository, private searchRepository: SearchRepository) {}
    async create(user: ICreateUserDTO) {
        try {
            const newUser = await this.userRepository.createUserStudent(user);
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
    
}