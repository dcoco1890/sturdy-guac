// dependencies
require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");

// sets up express and port
const app = express();
const PORT = process.env.PORT || 3000;

// required models for syncing 
const db = require("./models");

// express middleware for data parsing and serving static files
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// when testing, set syncOptions.force to true
let syncOptions = { force: false };

if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

// syncing sequelize models and then starting express app
db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT,() => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });

});

module.exports = app;
