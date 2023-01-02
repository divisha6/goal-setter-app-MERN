const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // http header has an authorization request and we will be checking them in the following LOC

  // with express, we can look for headers and their authorization using the following function
  // when the token is sent to the authorization it is written something like 'Bearer jvfuwkbkqu' so we check if the token that exists starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1]

      //   verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //   get user from the token
      // doing -password because we don't want the hashed password
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
