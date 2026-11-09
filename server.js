// imports
const express = require("express"); // importing express package
const app = express(); // creates an express application
require("dotenv").config(); // allows me to use my .env values in this file
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const Novel = require("./models/Novel");
const novelRoutes = require("./route/route-novel");

// Middleware
app.use(express.static("public")); // all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // allows access to POST and PUT data
app.use(methodOverride("_method"));
app.use(morgan("dev"));

async function connectToDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error Occurred", error);
  }
}

connectToDB();

app.get("/", (req, res) => {
  res.render("homepage.ejs");
});

app.use("/", novelRoutes);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
