import express from 'express'

import UserController from '@Controllers/UserController'
import FolderController from '@Controllers/FolderController'
import ArtController from '@Controllers/ArtController'

import withAuth from '@Middlewares/withAuth'
import withFolderParam from '@Middlewares/withFolderParam'
import withArtParam from '@Middlewares/withArtParam'

const routes = express.Router()

routes.post('/auth', UserController.auth)

routes.post('/users', UserController.store)

routes.post('/folders', withAuth, FolderController.store)
routes.get('/folders', withAuth, FolderController.index)
routes.delete('/folders/:folderId', withAuth, withFolderParam, FolderController.remove)
routes.patch('/folders/:folderId', withAuth, withFolderParam, FolderController.update)

routes.post('/folders/:folderId/arts', withAuth, withFolderParam, ArtController.store)
routes.get('/folders/:folderId/arts', withAuth, withFolderParam, ArtController.index)
routes.get('/folders/:folderId/arts/:artId', withAuth, withFolderParam, withArtParam, ArtController.show)
routes.patch('/folders/:folderId/arts/:artId', withAuth, withFolderParam, withArtParam, ArtController.update)
routes.delete('/folders/:folderId/arts/:artId', withAuth, withFolderParam, withArtParam, ArtController.remove)

export default routes
