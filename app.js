// DEPENDENCIES
const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors("http://localhost:3000"));
app.use(express.json()); // Parse incoming JSON

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

/////////////////////////////////////
// REMOVE AFTER SUCCESSFUL DEPLOYMENT
/////////////////////////////////////
const db = require("./db/dbConfig");

app.get("/test", async (req, res) => {
  try {
    const allDays = await db.any("SELECT * FROM test");
    res.json({allDays});
  } catch (err) {
    // res.json(err);
    res.status(500).json({
      error: {
        message: err.message,
        code: err.code,
      },
    });
  }
});

/////////////////////////////////////
// REMOVE AFTER SUCCESSFUL DEPLOYMENT
/////////////////////////////////////

// EXPORT
module.exports = app;