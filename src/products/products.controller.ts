import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ICreateAndUpdateProduct } from './dtos/ICreateAndUpdateProduct';
import { Product } from './entities/Product';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get('/')
  async findAll(): Promise<Product[]> {
    const products = await this.productsService.findAll();

    return products;
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    try {
      const product = await this.productsService.findOne(id);

      return product;
    } catch (error) {
      return {};
    }
  }

  @Post('/')
  async create(
    @Request() req,
    @Body() productToRegister: ICreateAndUpdateProduct,
  ) {
    const product = await this.productsService.create(
      productToRegister,
      req.user,
    );

    return product;
  }
}
