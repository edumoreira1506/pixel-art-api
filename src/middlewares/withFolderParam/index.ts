import BaseController from '@Controllers/BaseController'

import withFolderParamFactory from './factory'
import FolderController from '@Controllers/FolderController'

export default withFolderParamFactory(BaseController.errorResponse, FolderController.repository)
