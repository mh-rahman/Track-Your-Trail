// import Models (Schemas)
require("./models/User");
require("./models/Track");

// Import Libraries
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Import routes
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");

// Import Middlewares
const requireAuth = require("./middlewares/requireAuth");

// app represents our entire application
// associate different route handlers with it
const app = express();

app.use(bodyParser.json());

// Use routers exported by route files
app.use(authRoutes);
app.use(trackRoutes);

require("dotenv").config();
const mongoUri = process.env.mongoUri;
const port = process.env.PORT || 3000;

mongoose.connect(mongoUri, {
  // Adding these lines to avoid some common errors/warnings
  useNewUrlParser: true,
  useCreateIndex: true,
});

// After connecting to server
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance!");
});

// If connection fails
mongoose.connection.on("error", (err) => {
  console.log("Error: Cannot connect to mongo instance!");
});

// Whenever a '/' request is made, the callback function, and any middlewares, is automatically called with res and req objects
app.get("/", requireAuth, (req, res) => {
  res.send(`Emamil = ${req.user.email}`);
});

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
