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
      const { user_id, user_role, user_name } = res.locals.user;

      if (user_name === "admin" && user_role === "admin") {
        const licenses = await licenseService.findAllAdmin({ date });
        return res.status(HttpCode.OK).json(licenses);
      }

      const licenses = await licenseService.findAll({ date, user_id });
      return res.status(HttpCode.OK).json(licenses);
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
};

module.exports = licenseRouter;
