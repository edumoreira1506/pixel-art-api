type ValidationErrorType = {
  message: string;
  name: string;
}

export default class ValidationError extends Error {
  constructor(message: string) {
    super(message)

    this.name = 'ValidationError'
  }

  getError(): ValidationErrorType {
    return {
      message: this.message,
      name: this.name,
    }
  }
}
