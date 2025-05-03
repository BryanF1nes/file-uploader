const prisma = require("../utils/prisma.js");

exports.createFolder = async (req, res, next) => {
    if (req.user) {
        try {
            await prisma.folder.create({
                data: {
                    name: req.body.name,
                    userId: req.user.id
                }
            });
            
            return res.redirect("/");
        } catch (error) {
            console.error(error);
            res.send("Error could not create file.");
        }
    }
}
