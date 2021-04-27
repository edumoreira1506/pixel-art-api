import { NextFunction, Response } from 'express'

import { ApiErrorType } from '@Types/apiErrors'
import { AppRequest } from '@Types/request'
import FolderError from '@Errors/FolderError'
import UserError from '@Errors/UserError'
import AuthError from '@Errors/AuthError'
import FolderRepository from '@Repositories/FolderRepository'

export default function withFolderParamFactory(errorCallback: (res: Response, error: ApiErrorType) => Response, repository: FolderRepository) {
  return async (request: AppRequest, response: Response, next: NextFunction): Promise<void | Response<string, Record<string, string>>> => {
    const folderId = request?.params?.folderId

    return repository.findById(String(folderId))
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
