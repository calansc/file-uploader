const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  indexController.getIndex(req, res);
});

module.exports = indexRouter;
