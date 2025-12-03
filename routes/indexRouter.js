const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();
const { isAuth } = require("../middleware/authMiddleware");
const multer = require("multer");
const { fileSizeLimitErrorHandler } = require("../middleware/errorMiddleware");
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
}); // 5 MB limit

indexRouter.get("/sharedLink/download/:id", (req, res) => {
  indexController.downloadSharedLink(req, res);
});

indexRouter.get("/sharedLink/:id", (req, res) => {
  indexController.getSharedLink(req, res);
});

indexRouter.post("/share/file/:id", isAuth, (req, res) => {
  indexController.postShareFile(req, res);
});

indexRouter.get("/share/file/:id", isAuth, (req, res) => {
  indexController.getShareFile(req, res);
});

indexRouter.post("/share/folder/:id", isAuth, (req, res) => {
  indexController.postShareFolder(req, res);
});

indexRouter.get("/share/folder/:id", isAuth, (req, res) => {
  indexController.getShareFolder(req, res);
});

indexRouter.get("/files/:id", isAuth, (req, res) => {
  indexController.getFile(req, res);
});

indexRouter.post("/delete/file/:id", isAuth, (req, res) => {
  indexController.postDeleteFile(req, res);
});

indexRouter.get("/delete/file/:id", isAuth, (req, res) => {
  indexController.getDeleteFile(req, res);
});

indexRouter.post(
  "/upload/:id",
  isAuth,
  upload.single("fileUpload"),
  fileSizeLimitErrorHandler,
  (req, res) => {
    // console.log("Uploaded file info:", req.file);
    indexController.postUploadFile(req, res);
  }
);

indexRouter.post("/delete/folder/:id", isAuth, (req, res) => {
  indexController.postDeleteFolder(req, res);
});

indexRouter.get("/delete/folder/:id", isAuth, (req, res) => {
  indexController.getDeleteFolder(req, res);
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
