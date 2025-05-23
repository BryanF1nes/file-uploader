const { Router } = require("express");
const uploadRouter = Router();
const uploadController = require("../controllers/uploadController.js");

uploadRouter.post("/:id", uploadController.upload);

module.exports = uploadRouter;