import { Module } from '@nestjs/common';
import { IaAssistentService } from './ia-assistent/ia.assistent.service';
import { IaAssistentController } from './ia-assistent/ia.assistent.controller';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { SearchRepository } from 'src/database/repository/search.repository';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [IaAssistentController],
  providers: [IaAssistentService, SearchRepository],
})
export class AppModule {}
