const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

userSchema.pre("save", function (next) {
  // using keyword function instead of arrow function to get access to user object using this
  const user = this;

  // If user has not changed password, then continue
  if (!user.isModified("password")) {
    return next();
  }

  // generate salt of 10 rounds and then call the callback function
  // if error occurs, send error to next middleware function
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    // salt generated and stored as salt
    // Now, generate hash
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

// automate the password checking by attaching a method to our schema
userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;

  // create a new promise that will reject if there is an error or if the hashes dont match
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

// Informs mongoose to associate any object of type 'User' to be associated with userSchema
// Only execute this one time. Hence import only once in index.js
mongoose.model("User", userSchema);
