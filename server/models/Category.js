const mongoose = require("mongoose");

class CategoryModel {
  constructor() {
    this.defineCategory();
    this.setModel();
  }

  defineCategory() {
    this.name = {
      type: String,
      trim: true, // remove space from end & an begining if have
      required: true,
      maxlength: 35,
      unique: true,
    };
  }

  getSchema() {
    const schema = new mongoose.Schema(this, { timestamps: true });
    return schema;
  }

  setModel() {
    this.Category = mongoose.model("category", this.getSchema());
  }
}

const categoryModel = new CategoryModel();

module.exports.Category = categoryModel.Category;
