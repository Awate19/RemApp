//authentication part

const express = require("express");
const categoryController = require("../controllers/category");
const { auth, authRole } = require("../middlewares/auth");

class Router {
  constructor() {
    this.startup();
    this.routing();
  }

  startup() {
    this.router = express.Router();
  }

  routing() {
    this.router.get("/category/:categoryId", categoryController.read);

    this.router.post(
      "/category/create/:userId",
      auth,
      authRole(1),
      categoryController.create
    );

    this.router.put(
      "/category/:categoryId/:userId",
      auth,
      authRole(1),
      categoryController.update
    );

    this.router.delete(
      "/category/:categoryId/:userId",
      auth,
      authRole(1),
      categoryController.remove
    );

    this.router.get("/categories", categoryController.list);
    this.router.param("categoryId", categoryController.categoryById);
    // this.router.param("userId", categoryController.userById);
  }
}

const router = new Router().router;
module.exports = router;
