const mongoose = require("mongoose");
const config = require("../config");

const initDb = async () => {
  mongoose.connect(
    `mongodb+srv://${config.db_user}:${config.db_password}@cluster0.rugaj.mongodb.net/${config.db_name}?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
      console.log("Connected to DB");
    }
  );
};

module.exports = initDb;
