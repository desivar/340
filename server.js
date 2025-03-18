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

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // not at views root

/* ***********************
 * Routes
 *************************/
app.use(static);

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

// Option 2: Listen on the local loopback (IPv4)
// app.listen(port, '127.0.0.1', () => {
//   console.log(`app listening on http://127.0.0.1:${port}`);
// });

//Option 3: Listen on all IPv6 interfaces.
//app.listen(port, '::', () => {
// console.log(`app listening on http://[::]:${port}`);
//});

//Option 4: listen on the IPv6 loopback address.
//app.listen(port, '::1', () => {
// console.log(`app listening on http://[::1]:${port}`);
//});

//index route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});