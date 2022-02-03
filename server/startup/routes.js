const express = require("express");
const path = require("path");
const accessControl = require("../middlewares/access");

const auth = require("../routes/auth");
const category = require("../routes/category");
const product = require("../routes/product");
//const order = require("../routes/order");
//const user = require("../routes/user");

module.exports = function(app) {
  app.use(express.json());
  app.use(accessControl);

  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use("/api", auth);
  //app.use("/api", user);
  app.use("/api", category);
  app.use("/api", product);
  //app.use("/api", order);
};
