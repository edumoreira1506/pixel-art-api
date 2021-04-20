import { EntityRepository, Repository } from 'typeorm'

import Folder from '@Entities/Folder'
import User from '@Entities/User'

@EntityRepository(Folder)
export default class FolderRepository extends Repository<Folder> {
  findByUser(user: User): Promise<Folder[]> {
    return this.find({ where: { user } })
  }
}
