import ApiError from '@Errors/ApiError'

export default class AuthError extends ApiError {
  constructor(message: string) {
    super(message)

    this.name = 'AuthError'
  }
}
