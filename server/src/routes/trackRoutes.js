const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const jwt = require("jsonwebtoken");
// Get access to user model without running the mongoose.model() statement
const Track = mongoose.model("Track");

const router = express.Router();

module.exports = router;
