import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from 'src/database/repository/user.repository';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UsersModule {}
