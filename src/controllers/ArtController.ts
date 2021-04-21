import { Response } from 'express'

import BaseController from '@Controllers/BaseController'
import FolderRepository from '@Repositories/FolderRepository'
import { AppRequest } from '@Types/request'
import ArtRepository from '@Repositories/ArtRepository'
import Art from '@Entities/Art'
import { ArtDTOBuilder } from '@Dtos/ArtDTO'
import FolderError from '@Errors/FolderError'

class ArtController extends BaseController<Art, ArtRepository> {
  store = async (req: AppRequest, res: Response): Promise<any> => {
    const { name, itemWidth, marginBetween, items } = req.body
    const { folder } = req

    if (!folder) throw new FolderError()

    return await new ArtDTOBuilder()
      .setFolder(folder)
      .setName(name)
      .setItemWidth(itemWidth)
      .setMarginBetween(marginBetween)
      .setItems(items)
      .build()
      .then(async (artDTO: Art) => {
        const art = new Art()

        art.name = artDTO.name
        art.itemWidth = artDTO.itemWidth
        art.items = artDTO.items
        art.marginBetween = artDTO.marginBetween
        folder.arts.push(art)

        await this.repository.save(folder)

        return BaseController.successResponse(res, { art: folder.arts })
      })
      .catch(errors => BaseController.errorResponse(res, errors))
  }
}

export default new ArtController(FolderRepository)
