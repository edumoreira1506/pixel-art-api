import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm'

export class CreateFolders1618714004990 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'folders',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'name',
          type: 'varchar',
          isUnique: false,
        },
        {
          name: 'userId',
          type: 'uuid',
        }
      ]
    }))

    await queryRunner.createForeignKey('folders', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE'
    }))
  }
    
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('folders')
  }
}
