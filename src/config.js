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
  db_admin_name: process.env.DB_ADMIN_NAME,
  db_admin_password: process.env.DB_ADMIN_PASSWORD,
  db_name: process.env.DB_NAME,
  db_user: process.env.DB_USER_NAME,
  db_password: process.env.DB_USER_PASSWORD,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_duration: process.env.JWT_ACCESS_DURATION,
  jwt_refresh_duration: process.env.JWT_REFRESH_DURATION,
};
