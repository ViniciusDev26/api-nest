import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPayload } from 'src/auth/dto/IPayload';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { ICreateAndUpdateProduct } from './dtos/ICreateAndUpdateProduct';
import { Product } from './entities/Product';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,

    private readonly usersService: UsersService,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productsRepository.findOne(id);
  }

  async create(productData: ICreateAndUpdateProduct, userPayload: IPayload) {
    const user = await this.usersService.findBy('id', userPayload.sub);
    const product = new Product(productData.name, user);

    const registedProduct = await this.productsRepository.save(product);
    return {
      name: registedProduct.name,
    };
  }
}
