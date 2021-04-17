import ValidationError from '@Errors/ValidatonError'
import { UserRepository } from '@Repositories/UserRepository'

type UserDTOType = {
  username: string;
  password: string;
}

export default class UserDTO {
  username: string;
  password: string;

  constructor({ username, password }: UserDTOType) {
    this.username = username
    this.password = password
  }
}

export class UserDTOBuilder {
  private _username = '';
  private _password = '';
  private _confirmPassword = '';
  private _repository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._repository = userRepository
  }

  setUsername(username: string): UserDTOBuilder {
    this._username = username

    return this
  }

  setPassword(password: string): UserDTOBuilder {
    this._password = password

    return this
  }

  setConfirmPassword(confirmPassword: string): UserDTOBuilder {
    this._confirmPassword = confirmPassword

    return this
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

      throw new ValidationError(errorMessage).getError()
    }
  }

  async build(): Promise<UserDTO> {
    await this.validate()

    return new UserDTO({
      username: this._username,
      password: this._password,
    })
  }
}
