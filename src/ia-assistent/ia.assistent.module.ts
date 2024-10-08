import { Module } from '@nestjs/common';
import { IaAssistentController } from './ia.assistent.controller';
import { IaAssistentService } from './ia.assistent.service';

@Module({
  controllers: [IaAssistentController],
  providers: [IaAssistentService],
})
export class IaAssistentModule {}
