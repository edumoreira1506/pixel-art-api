import ApiError from '@Errors/ApiError'

export default class ArtError extends ApiError {
  constructor() {
    const message = 'Invalid art.'

    super(message)

    this.name = 'ArtError'
  }
}
