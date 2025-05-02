const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController.js");

fileRouter.post("/", fileController.upload);
fileRouter.post("/create", fileController.createFolder);

module.exports = fileRouter;