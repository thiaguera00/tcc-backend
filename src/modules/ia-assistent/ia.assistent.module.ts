import { Module } from '@nestjs/common';
import { IaAssistentController } from './ia.assistent.controller';
import { IaAssistentService } from './ia.assistent.service';
import { SearchRepository } from 'src/database/repository/search.repository';

@Module({
  controllers: [IaAssistentController],
  providers: [IaAssistentService, SearchRepository],
  exports: [IaAssistentService, SearchRepository],
})
export class IaAssistentModule {}
