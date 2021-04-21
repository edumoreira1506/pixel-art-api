import { Response } from 'express'

import BaseController from '@Controllers/BaseController'
import { AppRequest } from '@Types/request'
import ArtRepository from '@Repositories/ArtRepository'
import Art from '@Entities/Art'
import ArtBuilder from '@Builders/ArtBuilder'
import FolderError from '@Errors/FolderError'

class ArtController extends BaseController<Art, ArtRepository> {
  constructor(repository: any) {
    super(repository)

    this.store = this.store.bind(this)
    this.index = this.index.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: AppRequest, res: Response): Promise<Response> {
    const { name, itemWidth, marginBetween, items } = req.body
    const { folder } = req

    if (!folder) throw new FolderError()

    const artDTO = new ArtBuilder()
      .setFolder(folder)
      .setName(name)
      .setItemWidth(itemWidth)
      .setMarginBetween(marginBetween)
      .setItems(items)
      .build()
    const art = await this.repository.save(artDTO)

    return BaseController.successResponse(res, { art })
  }

  @BaseController.errorHandler()
  async index(req: AppRequest, res: Response): Promise<Response> {
    const folder = req.folder

    if (!folder) throw new FolderError()
  
    const arts = folder.arts
  
    return BaseController.successResponse(res, { arts })
  }

  @BaseController.errorHandler()
  async update(req: AppRequest, res: Response): Promise<Response> {
    const artId = req.params.artId
    const folder = req.folder
    const { name, itemWidth, marginBetween, items } = req.body
   
    if (!folder) throw new FolderError()

    const artDTO = new ArtBuilder()
      .setFolder(folder)
      .setName(name)
      .setItemWidth(itemWidth)
      .setMarginBetween(marginBetween)
      .setItems(items)
      .build()
    await this.repository.update({ id: artId }, artDTO)

    return BaseController.successResponse(res, { message: 'Updated!' })
  }

  @BaseController.errorHandler()
  async remove(req: AppRequest, res: Response): Promise<Response> {
    const artId = req.params.artId

    await this.repository.delete({ id: artId })

    return BaseController.successResponse(res, { message: 'Deleted!' })
  }
}

export default new ArtController(ArtRepository)
