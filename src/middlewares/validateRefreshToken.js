const { HttpCode } = require("../utlis/constants");
const JWT = require("jsonwebtoken");
const { jwt_refresh_secret } = require("../config");

module.exports = (service) => async (req, res, next) => {
  const refreshToken = req.headers["refreshtoken"];
  if (!refreshToken) {
    return res.status(HttpCode.BAD_REQUEST).end();
  }

  const storedRefreshToken = await service.findByToken(refreshToken);
  if (!storedRefreshToken) {
    return res.status(HttpCode.NOT_FOUND).end();
  }

  const verifyToken = await JWT.verify(storedRefreshToken.token, jwt_refresh_secret, (err, userData) => {
    if (err) {
      return false;
    }
    return userData;
  });

  if (!verifyToken) {
    return res.status(HttpCode.FORBIDDEN).end();
  }
  res.locals.token = refreshToken;
  res.locals.user = verifyToken;
  next();
};
