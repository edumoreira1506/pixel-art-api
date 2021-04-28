import { NextFunction, Response } from 'express'

import { ApiErrorType } from '@Types/apiErrors'
import { AppRequest } from '@Types/request'
import UserError from '@Errors/UserError'
import ArtError from '@Errors/ArtError'
import FolderError from '@Errors/FolderError'
import ArtRepository from '@Repositories/ArtRepository'
import BaseController from '@Controllers/BaseController'
import ArtController from '@Controllers/ArtController'

export const withArtParamFactory = (errorCallback: (res: Response, error: ApiErrorType) => Response, repository?: ArtRepository) => {
  return async (request: AppRequest, response: Response, next: NextFunction): Promise<void | Response<string, Record<string, string>>> => {
    const artId = request?.params?.artId

    const artRepository = repository || ArtController.repository

    return artRepository.findById(String(artId))
      .then(art => {
        if (!art) throw new ArtError()

        const { user, folder } = request

        if (!folder) throw new FolderError()
        if (!user) throw new UserError()

        if (art.folder.id !== folder.id) throw new FolderError()

        request.art = art

        next()
      })
      .catch((error) => errorCallback(response, error))
  }
}

export default withArtParamFactory(BaseController.errorResponse)
