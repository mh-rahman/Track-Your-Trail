const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const pointSchema = new mongoose.Schema({
  timeStamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});

const trackSchema = new mongoose.Schema({
  userId: {
    // Indicating that userId is a reference to another object stored inside mongoDB
    type: mongoose.Schema.Types.ObjectId,
    // userID is referencing the collection 'User'
    ref: "User",
  },
  name: {
    type: String,
    default: "",
  },
  locations: [pointSchema],
});

// This is the step that ties mongoose schemas with mongoDB collections.
// SInce we dont need a points collections in our DB, we wont assign it a model like for Tracks
mongoose.model("Track", trackSchema);
