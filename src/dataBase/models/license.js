const mongoose = require("mongoose");
const moment = require("moment");

const licenseListSchema = new mongoose.Schema({
  tin: {
    type: Number,
    length: 10,
    required: true,
  },
  company: {
    type: String,
    max: 255,
    required: true,
  },
  product: {
    type: String,
    enum: ["product 1", "product 2", "product 3", "product 4"],
    required: true,
    unique: true,
  },
  issuedDate: {
    type: Date,
    default: moment(new Date(Date.now())),
  },
  endsDate: {
    type: Date,
    default: moment(new Date().setFullYear(new Date().getFullYear() + 1)), //1y
  },
  contactName: {
    type: String,
    max: 255,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("License", licenseListSchema);
