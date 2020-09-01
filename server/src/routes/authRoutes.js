const express = require("express");
const mongoose = require("mongoose");

// Get access to user model without running the mongoose.model() statement
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  // async save the data in the DB
  await user.save();
  res.send("Received your post request!");
});

module.exports = router;
