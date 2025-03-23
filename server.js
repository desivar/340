// server.js

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const app = express();
const static = require("./routes/static");
const path = require("path");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

app.use(express.static(path.join(__dirname, "public")));

// Define the messages function HERE, before the routes.
function messages() {
    console.log("messages function called"); // Log when the function is called
    return "<p>This is a test message</p>";
}

app.get("/", (req, res) => {
    // Log the data passed to res.render()
    console.log("Data passed to render:", { title: "Home", messages: messages });
    res.render("index", { title: "Home", messages: messages });
});

// Test route
app.get("/test", (req, res) => {
    res.render("test", { message: messages() }); // Use messages() here
});

app.use(static);

const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port, '0.0.0.0', () => {
    console.log(`app listening on http://0.0.0.0:${port}`);
});

// 404 Error Handler (Optional but Recommended)
app.use((req, res, next) => {
    res.status(404).render('404', { title: "404 - Page Not Found" });
});