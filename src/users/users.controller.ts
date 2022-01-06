import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { ICreateAndUpdateUser } from './dtos/ICreateAndUpdateUser';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('/')
  async create(@Body() userToRegister: ICreateAndUpdateUser) {
    const requiredFields = ['name', 'email', 'password'];

    for (const field of requiredFields) {
      if (!userToRegister[field]) {
        throw new BadRequestException(`${field} is required`);
      }
    }

    const user = await this.usersService.create(userToRegister);

    return user;
  }
}
