const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Informs mongoose to associate any object of type 'User' to be associated with userSchema
// Only execute this one time. Hence import only once in index.js
mongoose.model("User", userSchema);
