// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const usersController = require("./controllers/usersController.js");
const middleware = require("./middleware")

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors("http://localhost:3000"));
app.use(express.json()); // Parse incoming JSON
app.use(middleware.decodeToken)

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/users", usersController);

/////////////////////////////////////
// REMOVE AFTER SUCCESSFUL DEPLOYMENT
/////////////////////////////////////
const db = require("./db/dbConfig");
/////////////////////////////////////
// REMOVE AFTER SUCCESSFUL DEPLOYMENT
/////////////////////////////////////

// EXPORT
module.exports = app;