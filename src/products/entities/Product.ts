import { User } from 'src/users/entities/User';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('products')
class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  constructor(name: string, user: User) {
    this.id = uuidV4();
    this.name = name;
    this.user = user;
  }
}

export { Product };
