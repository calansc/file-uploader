const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");
const queries = require("../db/queries");

// Configure the local strategy for use by Passport.
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await queries.findUserByUsername(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      const isValid = await bcryptjs.compare(password, user.password);
      if (!isValid) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Serialize user instances to and from the session.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await queries.findUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
