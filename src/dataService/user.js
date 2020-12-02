class User {
  constructor(models) {
    this._models = models;
  }

  async create({ name, password, role }) {
    const { userSchema } = this._models;

    try {
      const user = new userSchema({
        name,
        password,
        role,
      });
      const savedUser = await user.save();
      return savedUser;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = User;
