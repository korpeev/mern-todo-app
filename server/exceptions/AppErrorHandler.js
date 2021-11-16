
module.exports = class AppError extends Error {
  constructor(status, message, errors = []) {
    super(message)
    this.errors = errors
    this.status = status
    this.message = message
  }
  static Unauthorized() {
    return new AppError(401, 'User unauthorized')
  }

  static BadRequiest(message, error = []) {
    return new AppError(400, message, error)
  }
}