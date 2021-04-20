import ApiError from '@Errors/ApiError'

export default class UserError extends ApiError {
  constructor() {
    const message = 'Invalid user.'

    super(message)

    this.name = 'UserError'
  }
}
