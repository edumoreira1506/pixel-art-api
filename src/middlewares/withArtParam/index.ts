import BaseController from '@Controllers/BaseController'
import ArtController from '@Controllers/ArtController'

import withArtParamFactory from './factory'

export default withArtParamFactory(BaseController.errorResponse, ArtController.repository)
