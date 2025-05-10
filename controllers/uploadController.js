const prisma = require("../utils/prisma.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

exports.upload = [
    upload.single("file"),
    async (req, res, next) => {
        console.log(req.file);
        const { id } = req.params;

        await prisma.file.create({
            data: {
                name: req.file.originalname,
                url: "test",
                folderId: parseInt(id)
            }
        });


        return res.redirect("/");
    }
]