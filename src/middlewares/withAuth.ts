import { NextFunction, Response } from 'express'

import { ApiErrorType } from '@Types/apiErrors'
import InvalidTokenError from '@Errors/InvalidTokenError'
import TokenService from '@Services/TokenService'
import BaseController from '@Controllers/BaseController'
import UserController from '@Controllers/UserController'
import { RequestWithUserInfo } from '@Types/request'

const withAuthFactory = (errorCallback: (res: Response, error: ApiErrorType) => Response) => {
  return (request: RequestWithUserInfo, response: Response, next: NextFunction): any => {
    const token = request?.header('Authorization')

    if (!token) return errorCallback(response, new InvalidTokenError('Token not sended').getError())

    return TokenService.open(token)
      .then(async (decoded: Record<string, unknown>): Promise<any> => {
        const userId = decoded.id
        const user = await UserController.repository.findById(String(userId))

        if (!user) throw new InvalidTokenError('Invalid user of token')

        request.user = user

        next()
      })
      .catch((error: ApiErrorType) => errorCallback(response, error))
  }
}

export default withAuthFactory(BaseController.errorResponse)
