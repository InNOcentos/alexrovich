const { LicenseService } = require(".");
const moment = require("moment");

class License {
  constructor(models) {
    this._models = models;
  }

  async save({ tin, company, product, issuedDate, endsDate, contactName, email, uid }) {
    const { licenseSchema } = this._models;

    try {
      const license = new licenseSchema({
        tin,
        company,
        product,
        issuedDate,
        endsDate,
        contactName,
        email,
        uid,
      });

      return await license.save();
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findAll({ date, user_id, user_role }) {
    const { licenseSchema } = this._models;
    console.log(date);

    try {
      const licenses = await licenseSchema.find({
        date: { $lte: new Date().setDate(new Date().getDate() + 3) },
      });
      return licenses;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = License;
