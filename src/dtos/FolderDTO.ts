import Folder from '@Entities/Folder'
import User from '@Entities/User'
import ValidationError from '@Errors/ValidatonError'

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

  build(): Promise<Folder> {
    return new Promise((resolve, reject) => {
      try {
        this.validate()
 
        const folder = new Folder()

        folder.user = this._user
        folder.name = this._name

        return resolve(folder)
      } catch (error) {
        return reject(error)
      }
    })
  }
}
