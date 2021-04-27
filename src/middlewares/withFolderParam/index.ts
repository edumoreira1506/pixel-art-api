import BaseController from '@Controllers/BaseController'

import withFolderParamFactory from './factory'

export default withFolderParamFactory(BaseController.errorResponse)
