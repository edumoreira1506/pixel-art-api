import BaseController from '@Controllers/BaseController'
import UserController from '@Controllers/UserController'

import withAuthFactory from './factory'

export default withAuthFactory(BaseController.errorResponse, UserController.repository)
