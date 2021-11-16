module.exports = class TodoDto {
  constructor(todo) {
    this.userID = todo.userID;
    this.id = todo._id;
    this.createdAt = todo.createdAt;
    this.updatedAt = todo.updatedAt;
    this.name = todo.name;
    this.complete = todo.complete;
    this.folderID = todo.folderID;
  }
};
