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
    // info on success
    failureRedirect: "/",
    // info on failure
  })(req, res, next);
  // res.redirect("/");
}

module.exports = {
  getIndex,
  getRegister,
  postRegister,
  postLogin,
};
