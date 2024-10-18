import { Module } from '@nestjs/common';
import { IaAssistentService } from './ia-assistent/ia.assistent.service';
import { IaAssistentController } from './ia-assistent/ia.assistent.controller';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [IaAssistentController],
  providers: [IaAssistentService],
})
export class AppModule {}
