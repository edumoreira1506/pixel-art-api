import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn  } from 'typeorm'

import User from '@Entities/User'

@Entity('folders')
export default class Folder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
