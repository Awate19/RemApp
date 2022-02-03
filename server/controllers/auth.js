const { User, validateUser } = require("../models/User");
const bcrypt = require("bcrypt");
const joi = require("joi");
validateLogin = (login) => {
  const validationSchema = {
    email: joi
      .string()
      .email()
      .max(256)
      .required(),
    password: joi
      .string()
      .min(6)
      .max(256)
      .required(),
  };
  return joi.validate(login, validationSchema);
};

async function authorise(email, password, res) {
  const one = await User.findOne({ email: email });
  if (!one) return null;
  const validatePassword = await bcrypt.compare(password, one.password);

  if (!validatePassword) return null;

  return one;
}

module.exports = {
  signout: async (req, res) => {},
  signin: async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const { email, password } = req.body;

    const user = await authorise(email, password, res);

    if (!user) res.status(400).json({ error: "Invalid email or password" });

    const token = user.generateAuthToken();
    const { _id, name, email1, role, history } = user;
    res
      .header("x-auth-token", token)
      .header("Access-Control-Expose-headers", "x-auth-token")
      .status(200)
      .json({ token, user: { _id, name, email1, role, history } });
  },

  signup: async (req, res) => {
    const { error } = validateUser(req.body);

    if (error) return res.status(400).json({ error: error.message });
    const { email } = req.body;
    const one = await User.findOne({ email: email });
    if (one)
      return res.status(400).json({
        error: "Already Registered Email",
      });

    const user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save((err, user) => {
      if (err) {
        return res.status(400).json({ error: err.message[0] });
      }
      res.status(200).json(`Succesfully Registered`);
    });
  },
};
