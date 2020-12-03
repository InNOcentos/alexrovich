const bcrypt = require("bcrypt");
const { SaltRounds } = require("./constants");

const createHash = async (password) => {
  return await bcrypt.hash(password, SaltRounds);
};

const compareHash = async (password, storedPassword) => {
  return await bcrypt.compare(password, storedPassword);
};

module.exports = {
  createHash,
  compareHash,
};
