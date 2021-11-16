module.exports = class FolderDto {
  constructor(folder) {
    this.id = folder._id;
    this.name = folder.name;
    this.pinned = folder.pinned;
    this.userID = folder.userID;
  }
};
