import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ICreateUser } from 'src/interfaces/user.interfaces';
import { createUserSchema } from 'src/schemas/user.validation';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async createUserStudent(@Body() user: ICreateUser) {
    const { error } = createUserSchema.validate(user);

    if (error) {
      throw new BadRequestException(error.details[0].message);
    }

    return this.userService.createStudent(user);
  }
}
