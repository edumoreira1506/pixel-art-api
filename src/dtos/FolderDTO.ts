import User from '@Entities/User'
import ValidationError from '@Errors/ValidatonError'
import { FolderDTOType } from '@Types/dtos'

export default class FolderDTO {
  public name: string;
  public user: User;

  constructor({ name, user }: FolderDTOType) {
    this.name = name
    this.user = user
  }
}

export class FolderDTOBuilder {
  private _user: User;
  private _name = '';

  setName(name: string): FolderDTOBuilder {
    this._name = name

    return this
  }

  setUser(user: User): FolderDTOBuilder {
    this._user = user

    return this
  }

  validate(): void {
    const errors = []

    if (!this._user) errors.push('Invalid user.')
    if (!this._name) errors.push('Invlaid name.')

    if (errors.length) {
      const errorMessage = errors.join(' ')

      throw new ValidationError(errorMessage).getError()
    }
  }

  build(): Promise<FolderDTO> {
    this.validate()

    return new Promise((resolve) => resolve(new FolderDTO({
      user: this._user,
      name: this._name,
    })))
  }
}
