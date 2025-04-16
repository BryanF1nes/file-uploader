const prisma = require("../utils/prisma.js");

exports.getUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.render("./template/base", { title: "File Uploader", body: "../signupform"})
  } catch (error) {
    console.error(error);
  }
};
