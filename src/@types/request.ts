import { Request } from 'express'

import User from '@Entities/User'

export interface RequestWithUserInfo extends Request {
  user?: User
}
