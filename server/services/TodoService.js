const TodoDto = require("../Dto/TodoDto.js");
const AppError = require("../exceptions/AppErrorHandler.js");

const TodoScheme = require("../models/Todo.js");
const mongoose = require("mongoose");
const { Types } = mongoose;
const { ObjectId } = Types;
class TodoService {
  async createTodo(todo) {
    if (!todo) {
      throw AppError.BadRequiest("Incorrect Todo!");
    }
    const { name, userID, folder, updatedAt, folderID } = todo;
    const newTodo = await TodoScheme.create({
      name,
      userID,
      folder,
      updatedAt,
      folderID,
    });
    const todoDto = new TodoDto(newTodo);
    return todoDto;
  }
  async updateTodo(userId, id, todo) {
    const updatedTodo = await TodoScheme.findOneAndUpdate(
      { _id: ObjectId(id), userID: ObjectId(userId) },
      todo,
      { new: true }
    );
    const todoDto = new TodoDto(updatedTodo);
    return todoDto;
  }
  async removeTodo(id) {
    const removedTodo = await TodoScheme.findOneAndDelete({ _id: id });
    if (!removedTodo) {
      throw AppError.BadRequiest(`In db not found id ${id}`);
    }
    const todoDto = new TodoDto(removedTodo);
    return todoDto;
  }

  async removeTodosByFolder(userID, folderID) {
    const removedTodos = await TodoScheme.deleteMany({ userID, folderID });
    console.log(removedTodos);
    if (!removedTodos) {
      throw AppError.BadRequiest(`Todos not found by folder`);
    }
    return removedTodos;
  }

  async getAllTodos(userID) {
    const todosData = await TodoScheme.find({ userID });
    const todosDto = todosData.map((item) => new TodoDto(item));
    return todosDto;
  }
  async getTodoByFolder(userID, folderID) {
    const todosData = await TodoScheme.find({ userID, folderID });
    const todosDto = todosData.map((item) => new TodoDto(item));
    return todosDto;
  }
  async getOneTodo(id) {
    const todo = await TodoScheme.findById({ _id: id });
    if (!todo) {
      throw AppError.BadRequiest(`${id} not found!`);
    }
    const todoDto = new TodoDto(todo);
    return todoDto;
  }
}

module.exports = new TodoService();
