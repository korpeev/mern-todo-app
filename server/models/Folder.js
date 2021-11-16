const { Schema, model, Types } = require("mongoose");

const FolderSchema = new Schema({
  name: { type: String, required: true },
  userID: { type: Types.ObjectId, ref: "User" },
  pinned: { type: Boolean, default: false },
});

module.exports = model("Folder", FolderSchema);
