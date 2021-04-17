import express from 'express'

import UserController from '@Controllers/UserController'

const routes = express.Router()

routes.post('/users', UserController.store)

export default routes
