const express = require("express");
const mongoose = require("mongoose");

// To make sure user is signed-in
const requireAuth = require("../middlewares/requireAuth");

// Get access to user model without running the mongoose.model() statement
const Track = mongoose.model("Track");

const router = express.Router();

// Make sure users are signed in
// requireAuth will also add the user to our request
// the req.user._id will be available to all the below routes
router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  try {
    const user = req.user;
    // console.log(user);
    // Track model have an attribue (column) named userId
    const tracks = await Track.find({ userId: user._id });
    res.send(tracks);
  } catch (err) {
    res.status(422).send("Invalid request");
  }
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;
  // console.log(name, locations);
  if (!name || !locations) {
    return res
      .status(422)
      .send("Invalid requests. Please provide valid name and location(s).");
  }

  try {
    const track = new Track({ userId: req.user._id, name, locations });
    await track.save();
    // console.log(tracks);
    res.send(track);
  } catch (err) {
    return res.status(422).send({
      message: "Invalid requests. Please provide valid name and location(s).",
      error: err.message,
    });
  }
});

module.exports = router;
