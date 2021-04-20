import { Request } from 'express'

import User from '@Entities/User'
import Folder from '@Entities/Folder'

export interface AppRequest extends Request {
  user?: User
  folder?: Folder
}
