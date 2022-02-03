const express = require("express");
const app = new express();

const startConfig = require("./startup/config");
const startDb = require("./startup/db");
const startRoute = require("./startup/routes");

class App {
  constructor() {
    startConfig();
    startDb();
    startRoute(app);

    const PORT = process.env.PORT || 5000; //config.get('PORT')||2000;
    app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
  }
}

new App();
