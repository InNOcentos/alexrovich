module.exports.PORT = process.env.PORT || 8080;
module.exports.ExitCode = {
  error: 1,
  success: 0,
};
module.exports.API_PREFIX = `/api`;
module.exports.SaltRounds = 10;
module.exports.HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
};
