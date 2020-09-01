require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");

// app represents our entire application
// associate different route handlers with it
const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

// const mongoUri =
//   "mongodb+srv://admin:KzCzp1M1G0n3usnR@cluster0.n6vnk.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";
require("dotenv").config();
const mongoUri = process.env.mongoUri;

mongoose.connect(mongoUri, {
  // Adding these lines to avoid some common errors/warnings
  useNewUrlParser: true,
  useCreateIndex: true,
});

// After connecting to server or to detect errors
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance!");
});

mongoose.connection.on("error", (err) => {
  console.log("Error: Cannot connect to mongo instance!");
});

// Whenever a '/' request is made the callback function is automatically called with res and req objects
app.get("/", (req, res) => {
  res.send("Hi There!!");
});

app.listen(3000, () => {
  console.log("Connected to port 3000");
});
