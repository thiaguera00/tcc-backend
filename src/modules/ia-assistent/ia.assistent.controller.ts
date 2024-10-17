import { Controller, Body, Post } from '@nestjs/common';
import { IaAssistentService } from './ia.assistent.service';

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
}
