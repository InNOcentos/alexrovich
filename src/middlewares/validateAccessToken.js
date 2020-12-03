const { HttpCode } = require("../utlis/constants");
const JWT = require("jsonwebtoken");
const { jwt_access_secret } = require("../config");

module.exports = async (req, res, next) => {
  const authorization = req.headers[`authorization`];
  if (!authorization) {
    return res.status(HttpCode.UNAUTHORIZED).end();
  }

  const [, token] = authorization.split(` `);

  if (!token) {
    return res.status(HttpCode.UNAUTHORIZED).end();
  }

  const verifyToken = await JWT.verify(token, jwt_access_secret, (err, userData) => {
    if (err) {
      return false;
    }
    return userData;
  });

  if (!verifyToken) {
    return res.status(HttpCode.FORBIDDEN).end();
  }

  res.locals.user = verifyToken; // user data
  res.locals.token = token; // user token
  next();
};
