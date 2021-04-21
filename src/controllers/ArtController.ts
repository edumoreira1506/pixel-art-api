import { Response } from 'express'

import BaseController from '@Controllers/BaseController'
import { AppRequest } from '@Types/request'
import ArtRepository from '@Repositories/ArtRepository'
import Art from '@Entities/Art'
import ArtBuilder from '@Builders/ArtBuilder'
import FolderError from '@Errors/FolderError'

class ArtController extends BaseController<Art, ArtRepository> {
  store = async (req: AppRequest, res: Response): Promise<Response> => {
    const { name, itemWidth, marginBetween, items } = req.body
    const { folder } = req

    try {
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
    } catch (errors: any) {
      return BaseController.errorResponse(res, errors)
    }
  }

  index = async (req: AppRequest, res: Response): Promise<Response> => {
    try {
      const folder = req.folder

      if (!folder) throw new FolderError()
  
      const arts = folder.arts
  
      return BaseController.successResponse(res, { arts })
    } catch (errors: any) {
      return BaseController.errorResponse(res, errors)
    }
  }

  update = async (req: AppRequest, res: Response): Promise<Response> => {
    const artId = req.params.artId
    const folder = req.folder
    const { name, itemWidth, marginBetween, items } = req.body
   
    try {
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
    } catch (errors: any) {
      return BaseController.errorResponse(res, errors)
    }
  }

  remove = async (req: AppRequest, res: Response): Promise<Response> => {
    const artId = req.params.artId

    return this.repository.delete({ id: artId })
      .then(() => BaseController.successResponse(res, { message: 'Deleted!' }))
      .catch(errors => BaseController.errorResponse(res, errors))
  }
}

export default new ArtController(ArtRepository)
