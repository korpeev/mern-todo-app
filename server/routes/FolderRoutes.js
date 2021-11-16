const FolderController = require("../controllers/FolderController");
const { body } = require("express-validator");
const route = require("express").Router();

route.post(
  "/folder/:userId/",
  body("name")
    .isLength({ min: 2, max: 10 })
    .withMessage("name length min 3 symbols"),
  FolderController.createFolder
);
route.get("/folder/:userId", FolderController.getFolders);
route.patch("/folder/:userId/:id", FolderController.updateFolder);
route.delete("/folder/:userId/:id", FolderController.deleteFolder);

module.exports = route;
