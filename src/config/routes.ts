import express from 'express'

import UserController from '@Controllers/UserController'
import FolderController from '@Controllers/FolderController'

import withAuth from '@Middlewares/withAuth'

const routes = express.Router()

routes.post('/auth', UserController.auth)

routes.post('/users', UserController.store)

routes.post('/folders', withAuth, FolderController.store)
routes.get('/folders', withAuth, FolderController.index)

export default routes
