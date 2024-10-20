import { Controller, Body, Post, UseGuards, Req } from '@nestjs/common';
import { IaAssistentService } from './ia.assistent.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CustomRequest } from 'src/models/dtos/user.dto';

@Controller('ia')
export class IaAssistentController {
  constructor(private readonly iaAssistentService: IaAssistentService) {}

  @Post('/questions')
  async generateQuestions(
    @Body('level') level: string,
    @Body('content') content: string,
  ): Promise<string> {
    return this.iaAssistentService.sendQuestion(level, content);
  }

  @Post('/correctCode')
  async correctCode(@Body('code') code: string): Promise<string> {
    return this.iaAssistentService.codeCorretion(code);
  }

  @Post('/feedback')
  async feedbackCode(@Body('code') code: string): Promise<string> {
    return this.iaAssistentService.sendFeedbackCode(code);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/classificationStudent')
  async classificationStudent(
    @Body('responses') responses: string[],
    @Req() request: CustomRequest,
  ): Promise<string> {
    try {
      const userId = request.user.userId;
      console.log(userId);
      return await this.iaAssistentService.classificationStudent(
        responses,
        userId,
      );
    } catch (error) {
      console.error('Erro na classificação do estudante:', error.message);
      throw new Error('Erro na classificação do estudante');
    }
  }
}
