import BaseController from '@Controllers/BaseController'

import withAuthFactory from './factory'

export default withAuthFactory(BaseController.errorResponse)
