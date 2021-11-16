const { Schema, model } = require("mongoose");
const Todo = new Schema({
  name: { type: String, required: true },
  complete: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  folderID: { type: Schema.Types.ObjectId, ref: "Folder" },
  userID: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Todo", Todo);
