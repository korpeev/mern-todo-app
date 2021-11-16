const route = require('express').Router()
const UserController = require('../controllers/UserController')
const { body } = require('express-validator')

route.post('/register',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  UserController.register)
route.post('/login', UserController.login)
route.post('/logout', UserController.logout)
route.get('/refresh', UserController.refresh)


module.exports = route