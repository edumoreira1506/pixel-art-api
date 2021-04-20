import { Response } from 'express'

import BaseController from '@Controllers/BaseController'
import Folder from '@Entities/Folder'
import FolderRepository from '@Repositories/FolderRepository'
import { RequestWithUserInfo } from '@Types/request'
import { FolderDTOBuilder } from '@Dtos/FolderDTO'
import UserError from '@Errors/UserError'

class FolderController extends BaseController<Folder, FolderRepository> {
  store = async (req: RequestWithUserInfo, res: Response): Promise<Response> => {
    const { name } = req.body
    const user = req.user

    if (!user) throw new UserError()
    
    return await new FolderDTOBuilder()
      .setName(name)
      .setUser(user)
      .build()
      .then(async folderDTO => {
        const folder = await this.repository.save(folderDTO)

        return BaseController.successResponse(res, { folder })
      })
      .catch(errors => BaseController.errorResponse(res, errors))
  }

  index = async (req: RequestWithUserInfo, res: Response): Promise<Response> => {
    const user = req.user

    if (!user) throw new UserError()

    const folders = await this.repository.findByUser(user)

    return BaseController.successResponse(res, { folders })
  }
}

export default new FolderController(FolderRepository)
