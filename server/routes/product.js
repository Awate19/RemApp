//authentication part

const express = require("express");
const ProductController = require("../controllers/product");
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
    this.router.post(
      "/product/create/:userId",
      auth,
      authRole(1),
      ProductController.create
    );
    this.router.get("/products", ProductController.list);
    this.router.get("/product/:category", ProductController.readCategory);
    this.router.get("/product/photo/:productId", ProductController.photo);
    this.router.get("/products/:productId", ProductController.readProduct);
    this.router.get(
      "/products/related/:productId",
      ProductController.relatedProducts
    );
  }
}

const router = new Router().router;
module.exports = router;
