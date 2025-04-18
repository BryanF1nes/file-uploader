const { Router } = require("express");
const profileController = require("../controllers/profileController.js");
const profileRouter = Router();

profileRouter.get("/", profileController.getProfile);

module.exports = profileRouter;