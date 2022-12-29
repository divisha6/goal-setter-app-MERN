// we can use try and catch block or install express-async-handler. We chose the latter.
const asyncHandler = require("express-async-handler"); 
//bringing the package in and then wrapping all functions with the newly created function that requires 'express-async-handler

// @description:  Get goals
// @route: GET/api/goals
// @access: private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get goals" });
});

// @description:  Set goals
// @route: POST/api/goals
// @access: private
const setGoals = asyncHandler(async (req, res) => {
  // to use the following console log, we need a few lines of middleware
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field"); //express's default way of handling errors
  }

  res.status(200).json({ message: "Set goals" });
})

// @description:  Update goals
// @route: PUT/api/goals
// @access: private
const updateGoals = asyncHandler( async (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
})

// @description:  Delete goals
// @route: GET/api/goals
// @access: private
const deleteGoals =asyncHandler( async (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
})

// eexporting
module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
