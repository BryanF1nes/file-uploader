const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController.js");

indexRouter.get("/sign-up", indexController.signup);
indexRouter.get("/logout", indexController.logout);

indexRouter.post("/sign-up", indexController.signup);
indexRouter.post("/login", indexController.login);

module.exports = indexRouter;