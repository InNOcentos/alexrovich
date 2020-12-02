const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
  },
});

module.exports = mongoose.model("User", productSchema);
