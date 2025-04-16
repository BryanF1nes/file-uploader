const prisma = require("../utils/prisma.js");
const passport = require("passport");
const bcrypt = require("bcryptjs");

exports.getUser = async (req, res) => {
  res.send("Hello world");
};

exports.signUp = async (req, res) => {
  if (req.method === "GET") {
    res.render("./template/base", { title: "Sign Up", body: "../signupform" });
  }

  if (req.method === "POST") {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      await prisma.user.create({
        data: {
          email: req.body.email,
          password: hashedPassword,
        },
      });

      return res.send("Successfully created an account.");
    } catch (error) {
      return next(error);
    }
  }
};

exports.signIn = async (req, res, next) => {
  if (req.method === "GET") {
    return res.render("./template/base", {
      title: "Log In",
      body: "../signinform",
    });
  }

  if (req.method === "POST") {
    return passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/sign-in",
    })(req, res, next);
  }
};
