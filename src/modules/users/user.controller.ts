import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CustomRequest,
  ICreateUser,
  IUpdateUser,
} from 'src/models/dtos/user.dto';
import { createUserSchema } from 'src/schemas/user.validation';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async findMe(@Req() request: CustomRequest) {
    const userId = request.user.userId;
    return this.userService.findMe(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/updateUser')
  async update(@Body() userData: IUpdateUser, userId: string) {
    return this.userService.update(userData, userId);
  }
}
