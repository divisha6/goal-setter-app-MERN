// we can use try and catch block or install express-async-handler. We chose the latter.
const asyncHandler = require("express-async-handler");
//bringing the package in and then wrapping all functions with the newly created function that requires 'express-async-handler

const Goal = require("../models/goalModel");
// Goal will have a bunch of mongoose models that we can use to create, read our database

// @description:  Get goals
// @route: GET/api/goals
// @access: private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find()
  // find() method because it aligns with GET API method
  //in the () of find, we will put the parameters using which we will find the goals. For us, it will be the user.
  res.status(200).json(goals)
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

  const goal = await Goal.create({
    text: req.body.text
  })  // create because it aligns with the POST API method

  res.status(200).json(goal);
})

// @description:  Update goals
// @route: PUT/api/goals
// @access: private
const updateGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
});

// @description:  Delete goals
// @route: GET/api/goals
// @access: private
const deleteGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
});

// eexporting
module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
