const { HttpCode } = require(`../utlis/constants`);

module.exports = (service) => async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const user = await service.checkAuthData({ name, password });

    if (!user) {
      return res.status(HttpCode.FORBIDDEN).end();
    }

    res.locals.user = user;

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
