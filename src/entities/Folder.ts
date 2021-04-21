import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn  } from 'typeorm'

import User from '@Entities/User'
import Art from '@Entities/Art'

@Entity('folders')
export default class Folder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @ManyToOne(() => User, user => user.folders)
  @JoinColumn()
  user: User;

  @OneToMany(() => Art, art => art.folder)
  arts: Art[];
}
