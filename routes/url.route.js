const express = require("express");
const {
  generateNewShortUrl,
  handleAnalytic,
} = require("../controllers/url.controller");
const urlRouter = express.Router();

urlRouter.post("/", generateNewShortUrl);
urlRouter.get("/analytic/:id", handleAnalytic);

module.exports = urlRouter;
