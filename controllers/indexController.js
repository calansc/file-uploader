// const db = require("../db/queries");
const bcrypt = require("bcryptjs");
// const pool = require("../db/pool");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require("../config/passport.js");

async function index(req, res) {
  res.render("index", { user: req.user });
}

async function redirectIndex(req, res, next) {
  res.redirect("/");
}

async function login(req, res, next) {
  console.log("call login", req.body);
  passport.authenticate("local", {
    successRedirect: "/login-success",
    failureRedirect: "/login-failure",
  })(req, res, next);
}

async function loginFailure(req, res) {
  res.render("index", {
    errors: [{ msg: "Username or password did not match", req }],
  });
}

async function logout(req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

async function signUp(req, res) {
  res.render("sign-up-form");
}

// CHANGE TO PRISMA SQL
// async function postSignUp(req, res, next) {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     await pool.query(
//       "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)",
//       [req.body.firstname, req.body.lastname, req.body.email, hashedPassword]
//     );
//     res.redirect("/");
//   } catch (err) {
//     console.error(err);
//     return next(err);
//   }
// }

module.exports = {
  index,
  redirectIndex,
  login,
  loginFailure,
  logout,
  signUp,
};
