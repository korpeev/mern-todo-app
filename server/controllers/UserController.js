const UserService = require('../services/UserService.js')
const { validationResult } = require('express-validator')
const AppError = require('../exceptions/AppErrorHandler.js')
class UserController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        next(AppError.BadRequiest('Error in validation', errors.array()))
      }
      const { email, password, username } = req.body
      const newUser = await UserService.register(email, password, username)
      res.cookie('refreshToken', newUser.refreshToken)
      return res.json(newUser)
    } catch (error) {
      next(error)
    }
  }
  async login(req, res, next) {
    try {
      const {email, password} = req.body
      const user = await UserService.login(email, password)
      res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(user)
    } catch (error) {
      next(error)
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const token = await UserService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (error) {
      next(error)
    }
  }
  async refresh(req, res, next) {
    try {
    const { refreshToken } = req.cookies
    const user = await UserService.refresh(refreshToken)
    res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return res.json(user)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController