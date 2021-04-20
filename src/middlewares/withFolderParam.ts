import { NextFunction, Response } from 'express'

import { ApiErrorType } from '@Types/apiErrors'
import BaseController from '@Controllers/BaseController'
import { AppRequest } from '@Types/request'
import InvalidFolderError from '@Errors/InvalidFolderError'
import FolderController from '@Controllers/FolderController'

const withFolderParamFactory = (errorCallback: (res: Response, error: ApiErrorType) => Response) => {
  return async (request: AppRequest, response: Response, next: NextFunction): Promise<void> => {
    const folderId = request?.params?.folderId

    FolderController.repository.findById(String(folderId))
      .then(folder => {
        request.folder = folder

        next()
      })
      .catch(() => errorCallback(response, new InvalidFolderError().getError()))
  }
}

export default withFolderParamFactory(BaseController.errorResponse)
