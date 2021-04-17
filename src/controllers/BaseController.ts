import {  getCustomRepository, ObjectType } from 'typeorm'

export default class BaseController<T, I> {
  entity: ObjectType<T>;

  get repository(): I {
    const repository = getCustomRepository<I>(this.entity)

    return repository
  }

  constructor(entityParam: ObjectType<T>) {
    this.entity = entityParam
  }
}
