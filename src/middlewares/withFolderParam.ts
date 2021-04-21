import { NextFunction, Response } from 'express'

import { ApiErrorType } from '@Types/apiErrors'
import BaseController from '@Controllers/BaseController'
import { AppRequest } from '@Types/request'
import FolderError from '@Errors/FolderError'
import FolderController from '@Controllers/FolderController'
import UserError from '@Errors/UserError'
import AuthError from '@Errors/AuthError'

const withFolderParamFactory = (errorCallback: (res: Response, error: ApiErrorType) => Response) => {
  return async (request: AppRequest, response: Response, next: NextFunction): Promise<void> => {
    const folderId = request?.params?.folderId

    FolderController.repository.findById(String(folderId))
      .then(folder => {
        if (!folder) throw new FolderError()

        const user = request.user

        if (!user) throw new UserError()
        if (user.id !== folder.user.id) throw new AuthError('Not allowed')

        request.folder = folder

        next()
      })
      .catch((error) => errorCallback(response, error))
  }
}

export default withFolderParamFactory(BaseController.errorResponse)
