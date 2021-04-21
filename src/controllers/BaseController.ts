import ApiError from '@Errors/ApiError'
import { ApiErrorType } from '@Types/apiErrors'
import { Response } from 'express'
import {  getCustomRepository, ObjectType } from 'typeorm'

export default class BaseController<T, I> {
  protected entity: ObjectType<T>;

  get repository(): I {
    const repository = getCustomRepository<I>(this.entity)

    return repository
  }

  constructor(entityParam: ObjectType<T>) {
    this.entity = entityParam
  }

  static successResponse(res: Response, payload: Record<string, unknown>): Response {
    return res.status(200).send({
      ok: true,
      ...payload
    })
  }

  static errorResponse(res: Response, error: ApiErrorType): Response {
    return res.status(400).send({
      ok: false,
      error
    })
  }

  static errorHandler() {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value
  
      descriptor.value = function(...args: any[]) {
        try {
          const result = originalMethod.apply(this, args)
                  
          if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
            return result.catch((error: ApiError) => {
              return BaseController.errorResponse(args[1], error)
            })
          }
  
          return result
        } catch (error) {
          return BaseController.errorResponse(args[1], error)
        }
      }
  
      return descriptor
    }
  }
}
