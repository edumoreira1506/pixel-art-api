import { Request, Response } from 'express'

import BaseController from '@Controllers/BaseController'
import User from '@Entities/User'
import { UserDTOBuilder } from '@Dtos/UserDTO'
import UserRepository from '@Repositories/UserRepository'
import AuthService from '@Services/AuthService'

class UserController extends BaseController<User, UserRepository> {
  store = async (req: Request, res: Response): Promise<Response> => {
    const { username, password, confirmPassword } = req.body

    return await new UserDTOBuilder(this.repository)
      .setUsername(username)
      .setPassword(password)
      .setConfirmPassword(confirmPassword)
      .build()
      .then(async userDTO => {
        const user = await this.repository.save(userDTO)

        return this.successResponse(res, { user })
      })
      .catch(errors => this.errorResponse(res, errors))
  }

  auth = async (req: Request, res: Response) => {
    const { username, password } = req.body

    AuthService
      .login(username, password, this.repository)
      .then(token => this.successResponse(res, { token }))
      .catch(errors => this.errorResponse(res, errors))
  }
}

export default new UserController(UserRepository)
