import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IaAssistentService {
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
}
