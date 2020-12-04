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

  async findAll(user_role) {
    const { productSchema } = this._models;

    try {
      const products = await productSchema.find({ user_role });
      return products;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = License;
