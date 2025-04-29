const passport = require("passport");
const bcrypt = require("bcryptjs");
const prisma = require("../utils/prisma.js");

exports.signup = async (req, res, next) => {
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