import User from '@Entities/User'
import ValidationError from '@Errors/ValidatonError'
import UserRepository from '@Repositories/UserRepository'
import EncryptService from '@Services/EncryptService'

export default class UserBuilder {
  private _username = '';
  private _password = '';
  private _confirmPassword = '';
  private _repository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._repository = userRepository
  }

  setUsername(username: string): UserBuilder {
    this._username = username

    return this
  }

  setPassword(password: string): UserBuilder {
    this._password = password

    return this
  }

  setConfirmPassword(confirmPassword: string): UserBuilder {
    this._confirmPassword = confirmPassword

    return this
  }

  encryptPassword(): void {
    this._password = EncryptService.hash(this._password)
  }

  async validate(): Promise<void> {
    const errors = []

    if (!this._username) errors.push('Invalid username.')
    if (!this._password || !this._confirmPassword) errors.push('Invalid password.')
    if (this._password !== this._confirmPassword) errors.push('Password and confirm password are differents.')

    const userOfUsername = await this._repository.findByUsername(this._username)
    const isDuplicatedUsername = Boolean(userOfUsername)

    if (isDuplicatedUsername) errors.push('Duplicated username')

    if (errors.length) {
      const errorMessage = errors.join(' ')

      throw new ValidationError(errorMessage)
    }
  }

  async build(): Promise<User> {
    await this.validate()

    this.encryptPassword()

    const user = new User()

    user.username = this._username
    user.password = this._password

    return user
  }
}
