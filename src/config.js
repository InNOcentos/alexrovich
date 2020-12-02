const path = require("path");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, "../settings.env"),
});
const { ExitCode } = require("./utlis/constants");

if (dotenv.error) {
  console.error(`Can't get env variables. Error: ${dotenv.error}`);
  process.exit(ExitCode.error);
}

module.exports = {
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
};
