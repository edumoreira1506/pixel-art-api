import ApiError from '@Errors/ApiError'

export default class TokenError extends ApiError {
  constructor(message: string) {
    super(message)

    this.name = 'TokenError'
  }
}
