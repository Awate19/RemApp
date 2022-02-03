const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = {
  auth: (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ error: "Access Denied. No token provided" }); // res.status(401).send(message[9]);

    try {
      const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

      //check the user whether it exists or not or verified or not
      console.log("decoded = ", decoded);

      req.user = decoded;
      next();
    } catch (err) {
      res.status(403).json({ error: "Access Denied. Invalied token." });
    }
  },

  authRole: (role) => {
    return (req, res, next) => {
      console.log(req.user.name + " has roles " + req.user.role);
      if (req.user.role !== role)
        return res.status(403).json({
          error: `Access Denied .${req.user.name} has no Admmin role`,
        });
      next();
    };
  },
};
