import { Column, Entity, OneToMany, PrimaryGeneratedColumn  } from 'typeorm'

import Folder from '@Entities/Folder'

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column('varchar')
  password: string;

  @OneToMany(() => Folder, folder => folder.user)
  folders: Folder[];
}
