// schema, fields that we want our user to have

const mongoose = require("mongoose");

// fields that user should have

const userSchema = mongoose.Schema(
  {
    // fields
    name: {
      type: String,
      required: [true, "Please add a name"],
    },

    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please put a password"],
    },
  },

  {
    timestamps: true,
  }
);

// User is the model name 
module.exports= mongoose.model('User', userSchema);
