//authentication part

const express = require("express");
const authController = require("../controllers/auth");

class Router {
  constructor() {
    this.startup();
    this.routing();
  }
  startup() {
    this.router = express.Router();
  }

  routing() {
    this.router.get("/signout", authController.signout);
    this.router.post("/signup", authController.signup);
    this.router.post("/signin", authController.signin);
  }
}

const router = new Router().router;
module.exports = router;
