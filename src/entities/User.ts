import { Column, Entity, PrimaryGeneratedColumn  } from 'typeorm'

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column('varchar')
  password: string;
}
