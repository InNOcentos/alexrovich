const { db_admin_name, db_admin_password } = require("../config");
const { UserService } = require("../dataService");
const db = require("./models");

const createUser = async () => {
  try {
    const admin = await new UserService(db).save({
      name: db_admin_name,
      role: "admin",
      password: db_admin_password,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = createUser;
