import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword } from 'src/auth/helpers/encryptFunctions';
import { Repository } from 'typeorm';
import { ICreateAndUpdateUser } from './dtos/ICreateAndUpdateUser';
import { User } from './entities/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findBy(field: string, value: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        [field]: value,
      },
    });
  }
  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async create({ name, email, password }: ICreateAndUpdateUser) {
    const hashPassword = encryptPassword(password);
    const user = new User(name, email, hashPassword);

    const userRegisted = await this.usersRepository.save(user);

    return {
      email: userRegisted.email,
      name: userRegisted.name,
    };
  }
}
