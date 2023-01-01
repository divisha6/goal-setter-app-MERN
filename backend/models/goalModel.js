// model is where we define any resources that we have
// here is where we define our schemas which will be the fields for this particular resource
const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // when _id fails we create a new resource. thats an object id
      required: true,
      ref: "User",
    },

    text: {
      type: String,
      required: [true, "Please add a text"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
