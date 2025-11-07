const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("User not authenticated, redirecting to welcome page");
  res.redirect("/");
};

module.exports = { isAuth };
