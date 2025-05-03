const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController.js");
const fileController = require("../controllers/fileController.js");

indexRouter.get("/", indexController.home);
indexRouter.get("/sign-up", indexController.signup);
indexRouter.get("/login", indexController.login);
indexRouter.get("/logout", indexController.logout);
indexRouter.get("/:folderName/:id", indexController.folderPage);

indexRouter.post("/sign-up", indexController.signup);
indexRouter.post("/login", indexController.login);
indexRouter.post("/create", fileController.createFolder);

module.exports = indexRouter;