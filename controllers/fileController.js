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
