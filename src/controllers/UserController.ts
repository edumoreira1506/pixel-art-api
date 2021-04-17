import { Request, Response } from 'express'

import BaseController from '@Controllers/BaseController'
import User from '@Entities/User'
import { UserDTOBuilder } from '@Dtos/UserDTO'
import { UserRepository } from '@Repositories/UserRepository'

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

        return res.status(200).send({
          ok: true,
          user,
        })
      })
      .catch(errors => {
        return res.status(400).send({
          ok: false,
          errors,
        })
      })
  }
}

export default new UserController(UserRepository)
