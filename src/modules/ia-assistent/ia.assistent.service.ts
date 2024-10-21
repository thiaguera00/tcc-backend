import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SearchRepository } from 'src/database/repository/search.repository';
import { UserRepository } from 'src/database/repository/user.repository';

@Injectable()
export class IaAssistentService {
  constructor(
    private readonly searchRepository: SearchRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async sendQuestion(level: string, content: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://ia-assistente-python.onrender.com/gerar-questao/',
        null,
        {
          params: {
            nivel: level,
            conteudo: content,
          },
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error(
        'Erro ao fazer a requisição:',
        error.response ? error.response.data : error.message,
      );
      throw new Error('Não foi possível obter uma resposta da IA');
    }
  }

  async codeCorretion(code: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://ia-assistente-python.onrender.com/corrigir-codigo/',
        null,
        {
          params: {
            codigo: code,
          },
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error(
        'Erro ao fazer a requisição:',
        error.response ? error.response.data : error.message,
      );
      throw new Error('Não foi possível obter uma resposta da IA');
    }
  }

  async sendFeedbackCode(code: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://ia-assistente-python.onrender.com/dar-feedback/',
        null,
        {
          params: {
            codigo: code,
          },
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error(
        'Erro ao fazer a requisição:',
        error.response ? error.response.data : error.message,
      );
      throw new Error('Não foi possível obter uma resposta da IA');
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
    if (nivel.includes('iniciante')) {
      return 'Iniciante';
    } else if (nivel.includes('intermediário')) {
      return 'Intermediário';
    } else if (nivel.includes('avançado')) {
      return 'Avançado';
    }
    return 'Não identificado';
  }
}
