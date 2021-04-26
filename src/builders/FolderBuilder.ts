import Folder from '@Entities/Folder'
import User from '@Entities/User'
import ValidationError from '@Errors/ValidatonError'

export default class FolderBuilder {
  private _user: User;
  private _name = '';

  setName(name: string): FolderBuilder {
    this._name = name

    return this
  }

  setUser(user: User): FolderBuilder {
    this._user = user

    return this
  }

  validate(): void {
    const errors = []

    if (!this._user) errors.push('Invalid user.')
    if (!this._name) errors.push('Invalid name.')

    if (errors.length) {
      const errorMessage = errors.join(' ')

      throw new ValidationError(errorMessage)
    }
  }

  build = (): Folder => {
    this.validate()
 
    const folder = new Folder()

    folder.user = this._user
    folder.name = this._name

    return folder
  }
}
