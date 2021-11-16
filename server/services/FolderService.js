const { Types, Schema } = require("mongoose");
const { ObjectId } = Types;
const FolderDto = require("../Dto/FileDto");
const AppError = require("../exceptions/AppErrorHandler");
const FolderSchema = require("../models/Folder");
class FolderService {
  async createFolder(userId, data) {
    const { name, pinned } = data;
    const hasFolder = await FolderSchema.findOne({ name });
    if (hasFolder) {
      throw AppError.BadRequiest(
        `Folder already exists with this name: '${name}', please use another name!`
      );
    }
    const folderData = await FolderSchema.create({
      name,
      pinned,
      userID: userId,
    });
    return new FolderDto(folderData);
  }
  async updateFolder(userId, id, data) {
    const folderData = await FolderSchema.findOneAndUpdate(
      { _id: ObjectId(id), userID: ObjectId(userId) },
      data,
      { new: true }
    );
    if (!folderData) {
      throw AppError.BadRequiest(`${id} not found!`);
    }
    return new FolderDto(folderData);
  }
  async deleteFolder(userId, id) {
    const folderData = await FolderSchema.findOneAndDelete({
      _id: ObjectId(id),
      userID: ObjectId(userId),
    });
    if (!folderData) {
      throw AppError.BadRequiest(`Error in deleting folder, try again`);
    }
    return new FolderDto(folderData);
  }
  async getFolders(userId) {
    const folderData = await FolderSchema.find({ userID: userId });
    const folders = folderData.map((folder) => new FolderDto(folder));
    return folders;
  }
}

module.exports = new FolderService();
