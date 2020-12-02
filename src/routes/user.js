const { Router } = require("express");
const { HttpCode } = require("../utlis/constants");

const route = new Router();

const userRouter = (app, userService) => {
  app.use("/users", route);

  route.post("/", async (req, res, next) => {
    try {
      const { name, password, role } = req.body;
      console.log(name, password);
      const user = await userService.create({ name, password, role });

      res.status(200).send("Success");
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
};

module.exports = userRouter;
