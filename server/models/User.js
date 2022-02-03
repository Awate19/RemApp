const mongoose = require("mongoose");
const joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");

class UsersModel {
  constructor() {
    this.defineUser();
    this.setModel();
  }

  defineUser() {
    this.name = {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    };
    this.email = {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    };
    this.password = {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    };
    this.role = {
      type: Number,
      default: 0,
    };
    this.about = {
      type: String,
      trim: true,
    };
    this.history = {
      type: Array,
      default: [],
    };
  }

  getSchema() {
    const schema = new mongoose.Schema(this, { timestamps: true });
    schema.methods.generateAuthToken = function() {
      const token = jwt.sign(
        {
          _id: this._id,
          name: this.name,
          email: this.email,
          role: this.role,
          history: this.history,
        },
        config.get("jwtPrivateKey")
      );
      return token;
    };
    return schema;
  }

  static getValidationSchema() {
    return {
      name: joi
        .string()
        .required()
        .min(1)
        .max(50),
      email: joi
        .string()
        .email()
        .required(),
      password: joi
        .string()
        .required()
        .min(6)
        .max(50),
    };
  }

  static errorMessages(errors) {
    errors.forEach((err) => {
      switch (err.type) {
        case "any.empty":
          err.message = "Value Should not be empty";
          break;
        case "string.min":
          err.message = `Value should have at least ${err.context.limit} characters`;
          break;
        case "string.max":
          err.message = `Value should have at least ${err.context.limit} characters`;
          break;
        default:
          break;
      }
      return err.message;
    });
    // return errors;
  }

  validateUser(user) {
    console.log("..........Validation.....", user);
    return joi.validate(user, UsersModel.getValidationSchema());
  }
  setModel() {
    this.User = mongoose.model("user", this.getSchema());
  }
}

const usersModel = new UsersModel();

module.exports.User = usersModel.User;
module.exports.validateUser = usersModel.validateUser;
