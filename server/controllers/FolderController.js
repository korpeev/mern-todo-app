const { validationResult } = require("express-validator");
const AppError = require("../exceptions/AppErrorHandler");
const FolderService = require("../services/FolderService");

class FolderController {
  async createFolder(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw AppError.BadRequiest("Error in validation", errors.array());
      }
      const folder = await FolderService.createFolder(
        req.params.userId,
        req.body
      );
      return res.status(200).json(folder);
    } catch (e) {
      next(e);
    }
  }
  async updateFolder(req, res, next) {
    try {
      const folderData = await FolderService.updateFolder(
        req.params.userId,
        req.body.id,
        req.body
      );
      return res.status(200).json(folderData);
    } catch (error) {
      next(error);
    }
  }
  async deleteFolder(req, res, next) {
    try {
      const folderData = await FolderService.deleteFolder(
        req.params.userId,
        req.params.id
      );
      return res.status(200).json(folderData);
    } catch (e) {
      next(e);
    }
  }
  async getFolders(req, res, next) {
    try {
      const folderData = await FolderService.getFolders(req.params.userId);
      return res.status(200).json(folderData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new FolderController();
