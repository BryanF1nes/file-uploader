const prisma = require("../utils/prisma.js");

exports.getUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.send(users);
  } catch (error) {
    console.error(error);
  }
};
