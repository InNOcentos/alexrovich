const { Router } = require("express");
const { HttpCode } = require("../utlis/constants");
const { validateAccessToken } = require("../middlewares");

const route = new Router();

const licenseRouter = (app, licenseService) => {
  app.use("/licenses", route);

  route.post("/", validateAccessToken, async (req, res, next) => {
    try {
      const { tin, company, product, issuedDate, endsDate, contactName, email } = req.body;
      const uid = res.locals.user.user_id;
      const license = await licenseService.save({
        tin,
        company,
        product,
        issuedDate,
        endsDate,
        contactName,
        email,
        uid,
      });

      return res.status(HttpCode.CREATED).json(license);
    } catch (err) {
      console.log(err);
      next(err);
    }
  });

  route.get("/", validateAccessToken, async (req, res, next) => {
    try {
      const { date } = req.query;
      const { user_id, user_role } = res.locals.user;

      const licenses = licenseService.findAll({ date, user_id, user_role });

      return res.status(HttpCode.OK).json(licenses);
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
};

module.exports = licenseRouter;
