const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const prisma = require("./db/prismaClient");
// const { PrismaClient } = require("@prisma/client");
// const { PrismaClient } = require("./generated/prisma");
// const prisma = new PrismaClient();
const flash = require("connect-flash");

const indexRouter = require("./routes/indexRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
// Flash Middleware
app.use(flash());
// middleware for flash messages in all templates
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// middleware to make 'user' available in all templates
app.use((req, res, next) => {
  console.log("Req.user: ", req.user);
  res.locals.user = req.user;
  console.log("Locals.user: ", res.locals.user);
  next();
});

app.use("/", indexRouter);

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send("Error!: ", err);
});

// development
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`File Uploader Dev - Listening on port ${PORT}`);
});
// deploy
// app.listen(PORT, () =>
//     console.log(`File Uploader - Listening on port ${PORT}`)
//   );
