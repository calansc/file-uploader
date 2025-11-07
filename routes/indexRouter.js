const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();
const { isAuth } = require("../middleware/authMiddleware");

indexRouter.get("/folder/:name", (req, res) => {
  indexController.getIndex(req, res);
});

indexRouter.post("/newFolder", (req, res) => {
  indexController.postNewFolder(req, res);
});

indexRouter.get("/logout", (req, res) => {
  indexController.getLogout(req, res);
});

indexRouter.post("/login", (req, res) => {
  indexController.postLogin(req, res);
});

indexRouter.post("/register", (req, res) => {
  indexController.postRegister(req, res);
});

indexRouter.get("/register", (req, res) => {
  indexController.getRegister(req, res);
});

indexRouter.get("/directory", (req, res) => {
  indexController.getIndex(req, res);
});

indexRouter.get("/", (req, res) => {
  indexController.welcomePage(req, res);
});

module.exports = indexRouter;
