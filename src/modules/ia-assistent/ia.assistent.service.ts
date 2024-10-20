import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SearchRepository } from 'src/database/repository/search.repository';

@Injectable()
export class IaAssistentService {
  constructor(private readonly searchRepository: SearchRepository) {}
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
    responseStundent: string[],
    userId: string,
  ): Promise<string> {
    try {
      console.log(
        'Enviando respostas para a IA:',
        responseStundent[0],
        responseStundent[1],
        responseStundent[2],
      );

      const response = await axios.post(
        'https://ia-assistente-python.onrender.com/classificar-nivel/',
        {
          resposta1: responseStundent[0],
          resposta2: responseStundent[1],
          resposta3: responseStundent[2],
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

      const createSearchData = {
        userId,
        level_knowledge: responseStundent[0],
        language: responseStundent[1],
        learning_objective: responseStundent[2],
        created_at: new Date(),
        updated_at: new Date(),
      };

      await this.searchRepository.create(createSearchData);

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
}
