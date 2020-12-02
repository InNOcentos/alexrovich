const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    max: 1000,
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("User", commentSchema);
