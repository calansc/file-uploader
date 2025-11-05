const queries = require("../db/queries");
const bcryptjs = require("bcryptjs");
const passport = require("../config/passport");
// require("../config/passport.js");

async function getIndex(req, res) {
  res.render("index", { title: "File Uploader", user: req.user });
}

async function getRegister(req, res) {
  res.render("register", { title: "Register" });
}

async function postRegister(req, res) {
  const { username, password } = req.body;
  console.log("postRegister:", username, password);
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);
    const newUser = await queries.createUser(username, hashedPassword);
    req.flash("success", "Registered successfully. Please log in.");
    res.status(201).redirect("/");
  } catch (err) {
    console.error(err);
    req.flash("error", "Registration failed. Please try again.");
    return next(err);
  }
}

async function postLogin(req, res, next) {
  // const { username, password } = req.body;
  console.log("postLogin called", req.body);
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true,
  })(req, res, next);
}

async function getLogout(req, res) {
  req.logout((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return next(err);
    } else {
      req.flash("success", "Logged out successfully.");
      res.redirect("/");
    }
  });
}

module.exports = {
  getIndex,
  getRegister,
  postRegister,
  postLogin,
  getLogout,
};
