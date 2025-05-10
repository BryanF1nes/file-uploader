const passport = require("passport");
const bcrypt = require("bcryptjs");
const prisma = require("../utils/prisma.js");

exports.home = async (req, res, next) => {
    if (!req.user) {
        return res.redirect("/sign-up")
    }
    return res.render("template", { body: "dashboard", title: "Home", user: req.user });
}

exports.signup = async (req, res, next) => {
    if (req.method === "GET") {
        return res.render("template", { title: "Signup", body: "signup" }) 
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await prisma.user.create({
            data: {
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
            }
        });

        res.redirect("/login");
    } catch (error) {
        console.error("Error: " + error);
        next(error);
    }
};

exports.login = (req, res, next) => {
    if (req.method === "GET") {
        return res.render("template", { title: "Login", body: "login" })
    }
    return passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/"
        })(req, res, next);
};

exports.logout = (req, res, next) => {
    req.logout((error) => {
        if (error) return next(error);
        res.redirect("/");
    });
};

exports.folderPage = async (req, res, next) => {    
    try {
        const { folderName, id } = req.params;
        const folder = await prisma.folder.findFirst({
            where: {
                id: parseInt(id),
            },
            include: {
                files: true
            }
        });

        return res.render("template", { body: "folderPage", title: folderName, user: req.user, folderName, path: `/upload/${id}`, files: folder.files });
    } catch (error) {
        console.error(error);
    }
};