import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from './helpers/encryptFunctions';
import { User } from 'src/users/entities/User';
import { IPayload } from './dto/IPayload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && comparePassword(password, user.hashPassword)) {
      const { id, name, email } = user;

      return {
        id,
        email,
        name,
      };
    }
    return null;
  }

  async login(user: User) {
    const payload: IPayload = {
      email: user.email,
      name: user.name,
      sub: user.id,
    };

    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
