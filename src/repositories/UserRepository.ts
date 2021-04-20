import { EntityRepository, Repository } from 'typeorm'

import User from '@Entities/User'

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  findByUsername(username: string): Promise<User | undefined> {
    return this.findOne({ username })
  }

  findById(id: string): Promise<User | undefined> {
    return this.findOne({ id })
  }
}
