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
    // user role
    // new Date(new Date().setDate(new Date().getDate() - date))
    if (date & (date !== 0)) {
      try {
        const licenses = await licenseSchema.find({
          endsDate: { $gte: endsDate - 5 },
          uid: user_id,
        });
        console.log("licenses");
        console.log(licenses);
        return licenses;
      } catch (err) {
        console.log(err);
        return null;
      }
    } else {
      try {
        console.log(user_id);
        const licenses = await licenseSchema.find({
          uid: user_id,
        });
        console.log(licenses);
        return licenses;
      } catch (err) {
        console.log(err);
        return null;
      }
    }
  }
}

module.exports = License;
