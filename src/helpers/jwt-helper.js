const JWT = require(`jsonwebtoken`);
const { jwt_access_secret, jwt_access_duration, jwt_refresh_secret, jwt_refresh_duration } = require("../config");

const makeTokens = (tokenData) => {
  const accessToken = JWT.sign(tokenData, jwt_access_secret, { expiresIn: jwt_access_duration });
  const refreshToken = JWT.sign(tokenData, jwt_refresh_secret, { expiresIn: jwt_refresh_duration });
  return { accessToken, refreshToken };
};

module.exports = {
  makeTokens,
};
