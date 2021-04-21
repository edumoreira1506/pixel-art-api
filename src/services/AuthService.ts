import AuthError from '@Errors/AuthError'
import UserRepository from '@Repositories/UserRepository'
import EncryptService from './EncryptService'
import TokenService from './TokenService'

export default class AuthService {
  static async login(username: string, password: string, userRepository: UserRepository): Promise<string> {
    if (!username || !password) throw new AuthError('Username and password are required')

    const user = await userRepository.findByUsername(username)

    if (!user) throw new AuthError('Invalid username')

    const isValidPassword = await EncryptService.check(password, user.password)

    if (!isValidPassword) throw new AuthError('Invalid password')

    const token = TokenService.create(user.username, user.id)

    return token
  }
}
