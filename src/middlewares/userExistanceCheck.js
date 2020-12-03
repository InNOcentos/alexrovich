const { HttpCode } = require("../utlis/constants");

module.exports = (service) => async (req, res, next) => {
  const { name } = req.body;
  try {
    const user = await service.checkExistance(name);

    if (user) {
      return res.status(HttpCode.CONFLICT).end();
    }

    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};
