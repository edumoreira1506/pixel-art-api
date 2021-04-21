import { Request } from 'express'

import User from '@Entities/User'
import Folder from '@Entities/Folder'
import Art from '@Entities/Art'

export interface AppRequest extends Request {
  user?: User
  folder?: Folder
  art?: Art
}
