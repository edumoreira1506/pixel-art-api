import { NextFunction, Response } from 'express'

import { ApiErrorType } from '@Types/apiErrors'
import TokenError from '@Errors/TokenError'
import TokenService from '@Services/TokenService'
import { AppRequest } from '@Types/request'
import UserRepository from '@Repositories/UserRepository'
import UserController from '@Controllers/UserController'
import BaseController from '@Controllers/BaseController'

export const withAuthFactory = (errorCallback: (res: Response, error: ApiErrorType) => Response, repository?: UserRepository) => {
  return (request: AppRequest, response: Response, next: NextFunction): Promise<void | Response<string, Record<string, string>>> | Response => {
    const token = request?.header('Authorization')

    if (!token) return errorCallback(response, new TokenError('Token not sended').getError())

    const userRepository = repository || UserController.repository

    return TokenService.open(token)
      .then(async (decoded: Record<string, unknown>): Promise<void> => {
        const userId = decoded.id
        const user = await userRepository.findById(String(userId))

        if (!user) throw new TokenError('Invalid user of token')

        request.user = user

        next()
      })
      .catch((error: ApiErrorType) => errorCallback(response, error))
  }
}

export default withAuthFactory(BaseController.errorResponse)
