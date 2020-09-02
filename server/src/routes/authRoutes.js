const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// Get access to user model without running the mongoose.model() statement
const User = mongoose.model("User");

const router = express.Router();

require("dotenv").config();
const secret = process.env.secret;

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    // async save the data in the DB
    await user.save();
    token = jwt.sign({ user_id: user._id }, secret);
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "Please provide valid email and password" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .send({ error: "Please provide valid email and password" });
  }

  try {
    // call the comparePassword function we wrote in User.js model file
    await user.comparePassword(password);
    const token = jwt.sign({ user_id: user._id }, secret);
    console.log("Signed in");
    res.send({ token });
  } catch (err) {
    return res
      .status(404)
      .send({ error: "Please provide valid email and password" });
  }
});

module.exports = router;
