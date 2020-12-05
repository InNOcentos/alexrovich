class Product {
  constructor(models) {
    this._models = models;
  }

  async save({ value, user_id }) {
    const { commentSchema } = this._models;
    console.log(user_id);
    try {
      const newComment = new commentSchema({
        value,
        uid: user_id,
      });

      return await newComment.save();
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findAll(user_id) {
    const { commentSchema } = this._models;

    try {
      const comments = await commentSchema.find({ user_id });
      return comments;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findAllAdmin(user_id) {
    const { commentSchema } = this._models;

    try {
      const comments = await commentSchema.find({});
      return comments;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = Product;
