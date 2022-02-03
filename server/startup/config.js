const config = require("config");

module.exports = function() {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey not");
  } else {
    console.log("Environmental Variable set....");
  }
};
