const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    max: 255,
  },
  password: {
    type: String,
    max: 255,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

/* userSchema.pre("delete", (next) => {
  console.log("preeeheet");
  this.model("RefreshToken").remove({ uid: this._id }, next);
}); */

module.exports = mongoose.model("User", userSchema);
