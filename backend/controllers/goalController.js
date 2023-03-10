// we can use try and catch block or install express-async-handler. We chose the latter.
const asyncHandler = require("express-async-handler");
//bringing the package in and then wrapping all functions with the newly created function that requires 'express-async-handler

const Goal = require("../models/goalModel");
// Goal will have a bunch of mongoose models that we can use to create, read our database
const User = require('../models/userModel')

// @description:  Get goals
// @route: GET/api/goals
// @access: private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({user : req.user.id});
  // find() method because it aligns with GET API method
  //in the () of find, we will put the parameters using which we will find the goals. For us, it will be the user.
  res.status(200).json(goals);
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
    text: req.body.text,
    user : req.user.id,
  }); // create because it aligns with the POST API method

  res.status(200).json(goal);
});

// @description:  Update goals
// @route: PUT/api/goals
// @access: private
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id)

  // Check for user
  if(!user){
    res.status(401)
    throw new Error('User not found')
  }

  // make sure the logged in user matches the goal user
  if(goal.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //options object which will create it if it doesnt exist
  });

  res.status(200).json(updatedGoal);
});

// @description:  Delete goals
// @route: GET/api/goals
// @access: private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id)

  // Check for user
  if(!user){
    res.status(401)
    throw new Error('User not found')
  }

  // make sure the logged in user matches the goal user
  if(goal.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.remove
  res.status(200).json({ id: req.params.id })
})

// eexporting
module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
