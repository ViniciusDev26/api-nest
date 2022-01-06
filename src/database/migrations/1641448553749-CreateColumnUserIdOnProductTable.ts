import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateColumnUserIdOnProductTable1641448553749
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'userId',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'userId');
  }
}
