const { Category } = require("../models/Category");
//const { errorHandler } = require("../helpers/dbErrorHandler");

module.exports = {
  create: (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err.message,
        });
      }
      res.json({ data });
    });
  },

  categoryById: (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
      if (err || !category) {
        return res.status(400).json({
          error: "Category Not found",
        });
      }
      req.category = category;
      next();
    });
  },

  read: (req, res) => {
    return res.json(req.category);
  },

  update: (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err.message,
        });
      }
      res.json(data);
    });
  },

  remove: (req, res) => {
    const category = req.category;
    category.remove((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err.message,
        });
      }
      res.json({
        message: "Category deleted",
      });
    });
  },

  list: (req, res) => {
    Category.find().exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err.message,
        });
      }
      res.json(data);
    });
  },
};
