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
    return (_target: unknown, _propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
      const originalMethod = descriptor.value
  
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      descriptor.value = function(...args: any[]) {
        const response = args[1]

        try {
          const result = originalMethod.apply(this, args)
                  
          if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
            return result.catch((error: ApiError) => BaseController.errorResponse(response, error))
          }
  
          return result
        } catch (error) {
          return BaseController.errorResponse(response, error)
        }
      }
  
      return descriptor
    }
  }

  static updateHandler() {
    return (_target: unknown, _propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
      const originalMethod = descriptor.value
  
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      descriptor.value = async function(...args: any[]) {
        const response = args[1]

        await originalMethod.apply(this, args)

        return BaseController.successResponse(response, { message: 'Updated!' })
      }

      return descriptor
    }
  }

  static removeHandler() {
    return (_target: unknown, _propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
      const originalMethod = descriptor.value
  
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      descriptor.value = async function(...args: any[]) {
        const response = args[1]

        await originalMethod.apply(this, args)

        return BaseController.successResponse(response, { message: 'Deleted!' })
      }

      return descriptor
    }
  }
}
