const TokenService = require('../services/TokenService')
const AppError = require('../exceptions/AppErrorHandler.js')
module.exports = async(req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return next(AppError.Unauthorized())
    }
    const accessToken = token.split(' ')[1]
    if (!accessToken) {
      return next(AppError.Unauthorized())
    }
    const userData = TokenService.validateAccessToken(accessToken)
    if (!userData) {
      return next(AppError.Unauthorized())
    }
    req.user = userData
    next()
  } catch (error) {
    return next(AppError.Unauthorized())
  }
}