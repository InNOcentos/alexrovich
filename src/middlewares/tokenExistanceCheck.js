const { HttpCode } = require("../utlis/constants");

module.exports = (service) => async (req, res, next) => {
  const { name } = req.body;

  try {
    const storedRefreshToken = await service.findByUser(name);
    if (storedRefreshToken) {
      return res.status(HttpCode.OK).end();
    }

    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};
