import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn  } from 'typeorm'

import Folder from './Folder'

@Entity('arts')
export default class Art {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('int')
  itemWidth: number;

  @Column('int')
  marginBetween: number;

  @Column('json')
  items: string;

  @ManyToOne(() => Folder, folder => folder.arts)
  @JoinColumn()
  folder: Folder;
}
