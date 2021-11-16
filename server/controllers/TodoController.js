const TodoService = require("../services/TodoService");

class TodoController {
  async createTodo(req, res, next) {
    try {
      const todoData = await TodoService.createTodo(req.body);
      return res.status(200).json(todoData);
    } catch (e) {
      next(e);
    }
  }

  async updateTodo(req, res, next) {
    try {
      const todoData = await TodoService.updateTodo(
        req.params.userId,
        req.params.id,
        req.body
      );
      return res.status(200).json(todoData);
    } catch (e) {
      next(e);
    }
  }
  async removeTodo(req, res, next) {
    try {
      const todoData = await TodoService.removeTodo(req.params.id);
      return res.status(200).json(todoData);
    } catch (e) {
      next(e);
    }
  }
  async removeTodosByFolder(req, res, next) {
    try {
      const todosData = await TodoService.removeTodosByFolder(
        req.params.userId,
        req.params.folderId
      );
      return res.status(200).json(todosData);
    } catch (error) {
      next(error);
    }
  }
  async getAllTodos(req, res, next) {
    try {
      const todoData = await TodoService.getAllTodos(req.params.userId);
      return res.status(200).json(todoData);
    } catch (error) {
      next(error);
    }
  }
  async getOneTodo(req, res, next) {
    try {
      const todoData = await TodoService.getOneTodo(req.params.id);
      return res.status(200).json(todoData);
    } catch (e) {
      next(e);
    }
  }
  async getTodoByFolder(req, res, next) {
    try {
      const todoData = await TodoService.getTodoByFolder(
        req.params.userID,
        req.params.folderID
      );
      return res.json(todoData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TodoController();
