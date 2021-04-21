import { Request, Response } from 'express'

import BaseController from '@Controllers/BaseController'
import User from '@Entities/User'
import UserBuilder from '@Builders/UserBuilder'
import UserRepository from '@Repositories/UserRepository'
import AuthService from '@Services/AuthService'
import ApiError from '@Errors/ApiError'

class UserController extends BaseController<User, UserRepository> {
  store = async (req: Request, res: Response): Promise<Response> => {
    const { username, password, confirmPassword } = req.body

    return await new UserBuilder(this.repository)
      .setUsername(username)
      .setPassword(password)
      .setConfirmPassword(confirmPassword)
      .build()
      .then(async (userDTO: User) => {
        const user = await this.repository.save(userDTO)

        return BaseController.successResponse(res, { user })
      })
      .catch((errors: ApiError) => BaseController.errorResponse(res, errors))
  }

  auth = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body

    return AuthService
      .login(username, password, this.repository)
      .then(token => BaseController.successResponse(res, { token }))
      .catch(errors => BaseController.errorResponse(res, errors))
  }
}

export default new UserController(UserRepository)
