require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const path = require("node:path");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('./generated/prisma');
const prisma = require("./utils/prisma.js");
const app = express();

// Routers
const indexRouter = require("./routes/indexRouter.js");
const fileRouter = require("./routes/fileRouter.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(
  expressSession({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: `${process.env.SESSION_SECRET}`,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
        try {
            const user = await prisma.user.findFirstOrThrow({
              where: {
                username: username
              }
            })
            
            if (!user) return done(null, false, { message: "Incorrect username" });

            const match = await bcrypt.compare(password, user.password);
            if (!match) return done(null, false, { message: "Incorrect password" })
                
                return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findFirstOrThrow({
        where: {
          id: id
        }
    })

    done(null, user);
  } catch(err) {
    done(err);
  }
});


app.use("/", indexRouter);
app.use("/upload", fileRouter);

const SERVER_PORT = process.env.SERVER_PORT
app.listen(SERVER_PORT, () => {
    console.log(`Server running on port: ${SERVER_PORT}`);
})