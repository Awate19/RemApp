//to allow access for the React NodeServer

module.exports = function access(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT,GET,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,x-auth-token"
  );
  res.header("Access-Control-Expose-Heaaders", "x-auth-token");
  next();
};
