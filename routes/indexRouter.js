const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();
const { isAuth } = require("../middleware/authMiddleware");

indexRouter.post("/upload/:id", isAuth, (req, res) => {
  indexController.postUploadFile(req, res);
});

indexRouter.post("/delete/:id", isAuth, (req, res) => {
  indexController.postDeleteFolder(req, res);
});

indexRouter.get("/edit/:id", isAuth, (req, res) => {
  indexController.getEditFolder(req, res);
});

indexRouter.post("/edit/:id", isAuth, (req, res) => {
  indexController.postEditFolder(req, res);
});

indexRouter.get("/folder/:id", isAuth, (req, res) => {
  indexController.getIndex(req, res);
});

indexRouter.post("/newFolder", isAuth, (req, res) => {
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

indexRouter.get("/directory", isAuth, (req, res) => {
  indexController.getIndex(req, res);
});

indexRouter.get("/", (req, res) => {
  indexController.welcomePage(req, res);
});

module.exports = indexRouter;
