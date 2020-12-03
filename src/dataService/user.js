const { compareHash, createHash } = require("../utlis/functions");

class User {
  constructor(models) {
    this._models = models;
  }

  async save({ name, password, role }) {
    const { userSchema } = this._models;
    try {
      const hash = await createHash(password);
      const user = new userSchema({
        name,
        password: hash,
        role,
      });
      await user.save();
      return { status: 1 };
    } catch (err) {
      console.log(err);
      return { status: 0 };
    }
  }

  async checkExistance(name) {
    const { userSchema } = this._models;
    try {
      const userMatch = await userSchema.findOne({ name });
      return userMatch;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async checkAuthData({ name, password }) {
    const { userSchema } = this._models;
    try {
      const userMatch = await userSchema.findOne({ name });
      if (!userMatch) return null;
      const userPasswordMatch = await compareHash(password, userMatch.password);
      if (!userPasswordMatch) return null;

      return userMatch;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = User;
