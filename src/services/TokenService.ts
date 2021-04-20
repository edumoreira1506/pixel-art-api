import jwt from 'jsonwebtoken'

import { JWT_ENCRYPT_SECRET } from '@Constants/jwt'

export default class TokenService {
  static async create(username: string, id: string): Promise<string> {
    return jwt.sign({ username, id }, JWT_ENCRYPT_SECRET, { expiresIn: '1d' })
  }

  static open(token: string): Promise<Record<string, unknown>> {
    return new Promise ((resolve, reject) => {
      jwt.verify(token, JWT_ENCRYPT_SECRET, (error, decoded: any): void => {
        if (error) reject(error)
  
        return resolve(decoded)
      })
    })
  }
}
