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

  async findAll({ date, user_id }) {
    const { licenseSchema } = this._models;
    if (date & (date !== 0)) {
      try {
        const licenses = await licenseSchema.find({
          endsDate: { $lte: endsDate + date },
          uid: user_id,
        });
        return licenses;
      } catch (err) {
        console.log(err);
        return null;
      }
    } else {
      try {
        const licenses = await licenseSchema.find({
          uid: user_id,
        });
        return licenses;
      } catch (err) {
        console.log(err);
        return null;
      }
    }
  }

  async findAllAdmin({ date }) {
    const { licenseSchema } = this._models;

    if (date & (date !== 0)) {
      try {
        const licenses = await licenseSchema.find({
          endsDate: { $lte: endsDate + date },
        });
        return licenses;
      } catch (err) {
        console.log(err);
        return null;
      }
    } else {
      try {
        const licenses = await licenseSchema.find({});
        return licenses;
      } catch (err) {
        console.log(err);
        return null;
      }
    }
  }
}

module.exports = License;
