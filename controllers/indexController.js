const queries = require("../db/queries");
const bcryptjs = require("bcryptjs");
const passport = require("../config/passport");

async function getIndex(req, res) {
  res.render("index", { title: "File Uploader" });
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

async function postLogin(req, res) {
  const { username, password } = req.body;
  console.log("postLogin called");
  try {
    res.redirect("/");
  } catch (err) {
    console.error(err);
    req.flash("error", "Login failed. Please try again.");
    return next(err);
  }
}

module.exports = {
  getIndex,
  getRegister,
  postRegister,
  postLogin,
};
