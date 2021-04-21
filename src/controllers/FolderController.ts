import { Response } from 'express'

import BaseController from '@Controllers/BaseController'
import Folder from '@Entities/Folder'
import FolderRepository from '@Repositories/FolderRepository'
import { AppRequest } from '@Types/request'
import FolderBuilder from '@Builders/FolderBuilder'
import UserError from '@Errors/UserError'

class FolderController extends BaseController<Folder, FolderRepository> {
  store = async (req: AppRequest, res: Response): Promise<Response> => {
    const { name } = req.body
    const user = req.user

    try {
      if (!user) throw new UserError()

      const folderDTO = new FolderBuilder()
        .setName(name)
        .setUser(user)
        .build()
      const folder = await this.repository.save(folderDTO)

      return BaseController.successResponse(res, { folder })
    } catch(errors: any) {
      return BaseController.errorResponse(res, errors)
    }
  }

  index = async (req: AppRequest, res: Response): Promise<Response> => {
    const user = req.user

    try {
      if (!user) throw new UserError()

      const folders = await this.repository.findByUser(user)

      return BaseController.successResponse(res, { folders })
    } catch(errors: any) {
      return BaseController.errorResponse(res, errors)
    }
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
   
    try {
      if (!user) throw new UserError()

      const folderDTO = new FolderBuilder()
        .setName(name)
        .setUser(user)
        .build()
      await this.repository.update({ id: folderId }, folderDTO)

      return BaseController.successResponse(res, { message: 'Updated!' })
    } catch(errors: any) {
      return BaseController.errorResponse(res, errors)
    }
  }
}

export default new FolderController(FolderRepository)
