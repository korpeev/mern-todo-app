module.exports = class User {
  constructor(model) {
    this.id = model._id
    this.email = model.email
    this.username = model.username
  }
}