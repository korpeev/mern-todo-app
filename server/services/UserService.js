const User = require("../models/User.js")
const bcrypt = require('bcryptjs')
const UserDto = require('../Dto/UserDto.js')
const TokenService = require('./TokenService.js')
const AppError = require('../exceptions/AppErrorHandler.js')
class UserService {
  async register(email, password, username) {
    const user = await User.findOne({email})
    if (user) {
      throw AppError.BadRequiest(`User already exists with this ${email}`)
    }
    const hashedPassword = await bcrypt.hash(password, 3)
    const newUser = await User.create({ email, password: hashedPassword, username })
    const userDto = new UserDto(newUser)
    const tokens = TokenService.generateToken({...userDto.generateToken})
    await TokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto
    }
  }
  async login(email, password) {
    const user = await User.findOne({email})
    if (!user) {
      throw AppError.BadRequiest(`User with this ${email} not found`)
    }
    const decodedPassword = await bcrypt.compare(password, user.password)
    if (!decodedPassword) {
      throw AppError.BadRequiest('Password is wrong, try again!')
    }
    const userDto = new UserDto(user)
    const tokens = TokenService.generateToken({...userDto})
    await TokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }
  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken)
    return token
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw AppError.Unauthorized()
    }
    const userData = await TokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await TokenService.findToken(refreshToken)
    if (!tokenFromDb || !userData) {
      throw AppError.Unauthorized()
    }
    
    const user = await User.findById(userData.id)
    
    const userDto = new UserDto(user)
    const tokens = TokenService.generateToken({...userDto})
    await TokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto
    }
  }
}

module.exports = new UserService