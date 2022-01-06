import { Product } from 'src/products/entities/Product';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  hashPassword: string;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  constructor(name: string, email: string, hashPassword: string) {
    this.id = uuidV4();
    this.name = name;
    this.email = email;
    this.hashPassword = hashPassword;
  }
}

export { User };
