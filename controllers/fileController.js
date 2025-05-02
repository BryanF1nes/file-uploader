const prisma = require("../utils/prisma.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" })

exports.upload = [
    upload.single("file"), 
    (req, res, next) => {
        if (req.user) {
            console.log(req.file)
            return res.redirect("/")
        }
        return res.send("You can't upload here.").redirect("/");
    }
];

exports.createFolder = async (req, res, next) => {
    if (req.user) {
        try {
            await prisma.folder.create({
                data: {
                    name: req.body.name,
                    userId: req.user.id
                }
            });
            
            return res.send("File created.");
        } catch (error) {
            console.error(error);
            res.send("Error could not create file.");
        }
    }
}
