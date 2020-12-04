class License {
  constructor(models) {
    this._models = models;
  }

  async save({ name, user_id }) {
    const { productSchema } = this._models;
    try {
      const newProduct = new productSchema({
        name,
        uid: user_id,
      });

      return await newProduct.save();
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = License;
