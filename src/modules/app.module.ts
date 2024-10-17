import { Module } from '@nestjs/common';
import { IaAssistentService } from '../ia-assistent/ia.assistent.service';
import { IaAssistentController } from '../ia-assistent/ia.assistent.controller';

@Module({
  imports: [],
  controllers: [IaAssistentController],
  providers: [IaAssistentService],
})
export class AppModule {}
