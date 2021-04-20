import ApiError from '@Errors/ApiError'

export default class InvalidTokenError extends ApiError {
  constructor(message: string) {
    super(message)

    this.name = 'InvalidTokenError'
  }
}
