const prisma = require("../utils/prisma.js");

exports.getProfile = async (req, res, next) => {
  const user = req.user;
  return res.render("./template/base", { title: "Profile", body: "../profile", user: user })
}