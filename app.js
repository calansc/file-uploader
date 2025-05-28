const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
// const pg = require("pg");
const pool = require("pg-pool");
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
// const { PrismaClient } = require("@prisma/client");
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();
require("dotenv").config();
const indexRouter = require("./routes/indexRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Prisma Session Store
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
// expressSession middleware must be initialized before passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`File Uploader Dev - Listening on port ${PORT}`);
});
// ^^ dev -- deploy >>
// app.listen(PORT, () =>
//     console.log(`File Uploader - Listening on port ${PORT}`)
//   );
