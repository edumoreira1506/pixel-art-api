import { NextFunction, Response } from 'express'

import { ApiErrorType } from '@Types/apiErrors'
import TokenError from '@Errors/TokenError'
import TokenService from '@Services/TokenService'
import BaseController from '@Controllers/BaseController'
import UserController from '@Controllers/UserController'
import { AppRequest } from '@Types/request'

const withAuthFactory = (errorCallback: (res: Response, error: ApiErrorType) => Response) => {
  return (request: AppRequest, response: Response, next: NextFunction): any => {
    const token = request?.header('Authorization')

    if (!token) return errorCallback(response, new TokenError('Token not sended').getError())

    return TokenService.open(token)
      .then(async (decoded: Record<string, unknown>): Promise<void> => {
        const userId = decoded.id
        const user = await UserController.repository.findById(String(userId))

        if (!user) throw new TokenError('Invalid user of token')

        request.user = user

        next()
      })
      .catch((error: ApiErrorType) => errorCallback(response, error))
  }
}

export default withAuthFactory(BaseController.errorResponse)
