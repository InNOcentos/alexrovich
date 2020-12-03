const { compareHash, createHash } = require("../utlis/functions");

class User {
  constructor(models) {
    this._models = models;
  }

  async findByUser(name) {
    const { userSchema, refreshTokenSchema } = this._models;
    try {
      const user = await userSchema.findOne({ name });
      console.log(user);
      if (user) {
        const storedRefreshToken = await refreshTokenSchema.findOne({ uid: user._id });
        return storedRefreshToken;
      }
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async save({ refreshToken, user_id }) {
    const { refreshTokenSchema } = this._models;
    const token = new refreshTokenSchema({
      token: refreshToken,
      uid: user_id,
    });
    try {
      const storedRefreshToken = await token.save();
      return storedRefreshToken;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = User;
