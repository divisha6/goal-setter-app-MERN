const jwt = require("jsonwebtoken");

// bcrypt is a password-hashing function
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @description:  Register new user
// @route: POST/api/users
// @access: public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Register user-- displayed data or error 
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token : generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
})

// @description:  Login user
// @route: POST/api/users/login
// @access: public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Login user -- data and token which will be displayed
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token : generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }

});

// @description:  Get user data
// @route: GET/api/users/me
// @access: private
const getMe = asyncHandler(async (req, res) => {
  // displays data of the user requesting only, using their ids 
  const {_id, name , email} = await User.findById(req.user.id)
  res.status(100).json({
    id: _id,
    name ,
    email,
  })
  res.json({ message: "User data displayed!" });
});

// Generate JWT
const generateToken = (id) => { //id is the parameter because we want it to be the payload
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn : '30d',
  })
}

module.exports = { registerUser, loginUser, getMe };
