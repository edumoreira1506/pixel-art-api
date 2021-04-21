import dotEnv from 'dotenv'

import user from './user'
import folder from './folder'

dotEnv.config()

export default {
  swagger: '2.0',
  title : 'Pixel Art API - Documentation',
  description : 'Pixel Art API',
  version: '1.0.0',
  host: process.env.APP_URL,
  basePath: '/',
  schemes: [ 'http', 'https' ],
  consumes: [ 'application/json' ],
  produces: [ 'application/json' ],
  paths: {
    ...user,
    ...folder,
  }
}
