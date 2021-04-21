import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm'

export class CreateArts1618966988071 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'arts',
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
          name: 'itemWidth',
          type: 'int',
        },
        {
          name: 'marginBetween',
          type: 'int',
        },
        {
          name: 'folderId',
          type: 'uuid',
        },
        {
          name: 'items',
          type: 'json'
        }
      ]
    }))
    
    await queryRunner.createForeignKey('arts', new TableForeignKey({
      columnNames: ['folderId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'folders',
      onDelete: 'CASCADE'
    }))
  }
        
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('arts')
  }
}
