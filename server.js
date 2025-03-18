/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/
/* ***********************/
/* Require Statements*/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const app = express();
const static = require("./routes/static");
const path = require("path"); // Add this line

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // not at views root

/* ***********************
 * Static Middleware
 *************************/
app.use(express.static(path.join(__dirname, "public"))); // Add this line

/* ***********************
 * Routes
 *************************/
//app.use(static); //Move this line.

//index route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.use(static); //Place the static route at the end.

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 * Log statement to confirm server operation
 *************************/

// Option 1: Listen on all IPv4 interfaces (recommended)
app.listen(port, '0.0.0.0', () => {
  console.log(`app listening on http://0.0.0.0:${port}`);
});