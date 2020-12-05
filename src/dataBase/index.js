const mongoose = require("mongoose");
const config = require("../config");
const { ExitCode } = require("../utlis/constants");
const createAdminUser = require("./seed.js");

const initDb = async () => {
  await mongoose.connect(
    `mongodb+srv://${config.db_user}:${config.db_password}@alexrovich-api.hpuk7.mongodb.net/${config.db_name}?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err) => {
      if (err) {
        console.log(err);
        process.exit(ExitCode.error);
      }
      console.log("Connected to DB");
    }
  );
};

createAdminUser();

module.exports = initDb;
