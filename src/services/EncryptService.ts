import bcrypt from 'bcrypt'

export default class EncryptService {
  static hash(originalString: string): string {
    return bcrypt.hashSync(originalString, 8)
  }
}
