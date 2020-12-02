const mongoose = require("mongoose");

const licenseTypeSchema = new mongoose.Schema({
  value: {
    type: String,
    max: 255,
  },
});

module.exports = mongoose.model("LicenseType", licenseTypeSchema);
