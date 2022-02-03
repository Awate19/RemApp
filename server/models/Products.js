const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

class ProductsModel {
  constructor() {
    this.defineProduct();
    this.setModel();
  }

  defineProduct() {
    this.name = {
      type: String,
      trim: true, // remove space from end & an begining if have
      required: true,
      maxlength: 35,
    };
    this.description = {
      type: String,
      required: true,
      maxlength: 3000,
    };
    this.price = {
      type: Number,
      trim: true,
      required: true,
    };
    this.category = {
      type: String,
      trim: true,
      required: true,
    };
    this.quantity = {
      type: Number,
      default: 50,
    };
    this.sold = {
      type: Number,
      default: 0,
    };
    this.photo = {
      data: Buffer,
      contentType: String,
    };
    this.shipping = {
      required: false,
      type: Boolean,
    };
  }

  getSchema() {
    const schema = new mongoose.Schema(this, { timestamps: true });
    return schema;
  }

  setModel() {
    this.Product = mongoose.model("product", this.getSchema());
  }
}

const productsModel = new ProductsModel();

module.exports = productsModel.Product;
