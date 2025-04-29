const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController.js");

fileRouter.post("/", fileController.upload);

module.exports = fileRouter;