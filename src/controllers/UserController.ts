import { Request, Response } from 'express'

import BaseController from '@Controllers/BaseController'
import User from '@Entities/User'
import UserBuilder from '@Builders/UserBuilder'
import UserRepository from '@Repositories/UserRepository'
import AuthService from '@Services/AuthService'

class UserController extends BaseController<User, UserRepository> {
  constructor(repository: any) {
    super(repository)

    this.auth = this.auth.bind(this)
    this.store = this.store.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: Request, res: Response): Promise<Response> {
    const { username, password, confirmPassword } = req.body

    const userDTO = await new UserBuilder(this.repository)
      .setUsername(username)
      .setPassword(password)
      .setConfirmPassword(confirmPassword)
      .build()
    const user = await this.repository.save(userDTO)

    return BaseController.successResponse(res, { user })
  }

  @BaseController.errorHandler()
  async auth(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body

    const token = await AuthService.login(username, password, this.repository)

    return BaseController.successResponse(res, { token })
  }
}

export default new UserController(UserRepository)
