import { Request, Response } from 'express'

export default class HomeController {
  static index(_: Request, res: Response): Response {
    return res.send('Online api!')
  }
}
