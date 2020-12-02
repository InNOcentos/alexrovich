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
    required: true,
  },
  issuedDate: {
    type: Date,
    value: moment(new Date()).format("YYYY-MM-DD"),
  },
  endsDate: {
    type: Date,
    value: moment(new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)).format("YYYY-MM-DD"),
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
});

module.exports = mongoose.model("LicenseList", licenseListSchema);
