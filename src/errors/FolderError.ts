import ApiError from '@Errors/ApiError'

export default class FolderError extends ApiError {
  constructor() {
    const message = 'Invalid folder.'

    super(message)

    this.name = 'FolderError'
  }
}
