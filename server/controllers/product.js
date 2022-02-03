const Product = require("../models/Products");
//const { errorHandler } = require("../helpers/dbErrorHandler");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

module.exports = {
  productById: (id) => (req, res, next, id) => {
    Product.findById(id)
      .populate("category")
      .exec((err, product) => {
        if (err || !product) {
          return res.status(400).json({
            error: "Product Not found",
          });
        }
        req.product = product;
        next();
      });
  },

  readCategory: async (req, res) => {
    const products = await Product.find({ category: req.params.category });
    if (products.length === 0)
      return res.status(400).json({ error: "Products Not Found" });
    res.status(200).json(products);
  },

  readProduct: async (req, res) => {
    const products = await Product.findOne({ _id: req.params.productId });
    if (products.length === 0)
      return res.status(400).json({ error: "Products Not Found" });
    res.status(200).json(products);
  },

  relatedProducts: async (req, res) => {
    console.log("related called");
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const product = await Product.findOne({ _id: req.params.productId });
    await Product.find({
      _id: { $ne: req.params.productId },
      category: product.category,
    }).exec((err, data) => {
      if (err) return res.status(400).json({ error: err.message });
      res.status(200).json(data);
    });
  },

  photo: async (req, res, next) => {
    const products = await Product.findOne({ _id: req.params.productId });
    res.set("Content-Type", products.photo.contentType);
    return res.send(products.photo.data);

    next();
  },
  list: (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;

    Product.find()
      .sort([[sortBy, order]])
      .limit(limit)
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: err.message,
          });
        }
        res.json(data);
      });
  },
  create: async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image Could not be uploaded",
        });
      }
      // check for fileds
      const { name, description, price, category, quantity, shipping } = fields;
      if (!name || !description || !price || !category || !shipping) {
        return res.status(400).json({
          error: "All fileds are required",
        });
      }
      let product = new Product(fields);
      if (files.photo) {
        //console.log('FILES PHOTO',files.photo) 1kb=100 1mb=100000
        if (files.photo.size > 200000) {
          return res.status(400).json({
            error: "Image Size should less than 2mb",
          });
        }

        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }
      product.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: err.message,
          });
        }
        res.json(result);
      });
    });
  },
};
