const mongoose = require("mongoose");
const config = require("config");

connectDb = () => {
  const db = config.get("db");
  console.log("connection string  : ", db);
  console.log("connecting to db.....");
  return mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

module.exports = function() {
  connectDb().then((mongoinstance) => {
    const db = mongoinstance.connection.db.databaseName;
    console.log(`MongoDb Connected to ${db} database.`);
  });
  // .catch(err => console.log(`Failed to connect to mongoDb:${err}`));
};
