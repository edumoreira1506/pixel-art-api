import { NextFunction, Response } from 'express'

import { ApiErrorType } from '@Types/apiErrors'
import TokenError from '@Errors/TokenError'
import TokenService from '@Services/TokenService'
import { AppRequest } from '@Types/request'
import UserRepository from '@Repositories/UserRepository'

export default function withAuthFactory(errorCallback: (res: Response, error: ApiErrorType) => Response, repository: UserRepository) {
  return (request: AppRequest, response: Response, next: NextFunction): Promise<void | Response<string, Record<string, string>>> | Response => {
    const token = request?.header('Authorization')

    if (!token) return errorCallback(response, new TokenError('Token not sended').getError())

    return TokenService.open(token)
      .then(async (decoded: Record<string, unknown>): Promise<void> => {
        const userId = decoded.id
        const user = await repository.findById(String(userId))

        if (!user) throw new TokenError('Invalid user of token')

        request.user = user

        next()
      })
      .catch((error: ApiErrorType) => errorCallback(response, error))
  }
}
