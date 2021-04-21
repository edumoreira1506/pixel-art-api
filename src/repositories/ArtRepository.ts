import { EntityRepository, Repository } from 'typeorm'

import Art from '@Entities/Art'
import Folder from '@Entities/Folder'

@EntityRepository(Art)
export default class ArtRepository extends Repository<Art> {
  findByFolder(folder: Folder): Promise<Art[]> {
    return this.find({ where: { folder } })
  }

  findById(id: string): Promise<Art | undefined> {
    return this.findOne({ id })
  }
}
