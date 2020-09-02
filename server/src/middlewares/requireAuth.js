// middleware function
// If token is valid, we will allow access to API routes
// Else send back error

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

// export a function that accepts request, response and next
// next - since this is a middleware function and will have to use next to notify the middlewares down in line to be run
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send("Error: You must be logged in 1");
  }

  const token = authorization.replace("Bearer ", "");
  // jwt verify arguments: token, secret, callback with error and pyload
  // if error, some error will be set and payload will be empty.
  // Else err is note and payload will be set.
  jwt.verify(token, "My_Secret", async (err, payload) => {
    if (err) {
      return res.status(401).send("Error: You must be logged in 2");
    }

    // get usuerid from token
    const { user_id } = payload;
    console.log(user_id);

    // making a async call to DB to get user details
    const user = await User.findById(user_id);
    console.log(user);

    // add user to header and pass it to next middleware to be used (display profile screen etc)
    req.user = user;
    next();
  });
};
