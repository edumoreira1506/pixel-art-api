import { Response } from 'express'

import BaseController from '@Controllers/BaseController'
import Folder from '@Entities/Folder'
import FolderRepository from '@Repositories/FolderRepository'
import { AppRequest } from '@Types/request'
import { FolderDTOBuilder } from '@Dtos/FolderDTO'
import UserError from '@Errors/UserError'

class FolderController extends BaseController<Folder, FolderRepository> {
  store = async (req: AppRequest, res: Response): Promise<Response> => {
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

  index = async (req: AppRequest, res: Response): Promise<Response> => {
    const user = req.user

    if (!user) throw new UserError()

    return this.repository.findByUser(user)
      .then((folders) => BaseController.successResponse(res, { folders }))
      .catch(errors => BaseController.errorResponse(res, errors))
  }

  remove = async (req: AppRequest, res: Response): Promise<Response> => {
    const folderId = req.params.folderId

    return this.repository.delete({ id: folderId })
      .then(() => BaseController.successResponse(res, { message: 'Deleted!' }))
      .catch(errors => BaseController.errorResponse(res, errors))
  }

  update = async (req: AppRequest, res: Response): Promise<Response> => {
    const folderId = req.params.folderId
    const user = req.user
    const { name } = req.body
   
    if (!user) throw new UserError()

    return await new FolderDTOBuilder()
      .setName(name)
      .setUser(user)
      .build()
      .then(async folderDTO => {
        await this.repository.update({ id: folderId }, folderDTO)

        return BaseController.successResponse(res, { message: 'Updated!' })
      })
      .catch(errors => BaseController.errorResponse(res, errors))
  }
}

export default new FolderController(FolderRepository)
