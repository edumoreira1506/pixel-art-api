import { Response } from 'express'

import BaseController from '@Controllers/BaseController'
import Folder from '@Entities/Folder'
import FolderRepository from '@Repositories/FolderRepository'
import { AppRequest } from '@Types/request'
import FolderBuilder from '@Builders/FolderBuilder'
import UserError from '@Errors/UserError'

class FolderController extends BaseController<Folder, FolderRepository> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(repository: any) {
    super(repository)

    this.store = this.store.bind(this)
    this.index = this.index.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: AppRequest, res: Response): Promise<Response> {
    const { name } = req.body
    const user = req.user

    if (!user) throw new UserError()

    const folderDTO = new FolderBuilder()
      .setName(name)
      .setUser(user)
      .build()

    const folder = await this.repository.save(folderDTO)

    return BaseController.successResponse(res, { folder })
  }

  @BaseController.errorHandler()
  async index(req: AppRequest, res: Response): Promise<Response> {
    const user = req.user

    if (!user) throw new UserError()

    const folders = await this.repository.findByUser(user)

    return BaseController.successResponse(res, { folders })
  }

  @BaseController.errorHandler()
  @BaseController.removeHandler()
  async remove(req: AppRequest): Promise<void> {
    const folderId = req.params.folderId

    await this.repository.delete({ id: folderId })
  }

  @BaseController.errorHandler()
  @BaseController.updateHandler()
  async update(req: AppRequest): Promise<void> {
    const folderId = req.params.folderId
    const user = req.user
    const { name } = req.body
   
    if (!user) throw new UserError()

    const folderDTO = new FolderBuilder()
      .setName(name)
      .setUser(user)
      .build()

    await this.repository.update({ id: folderId }, folderDTO)
  }
}

export default new FolderController(FolderRepository)
