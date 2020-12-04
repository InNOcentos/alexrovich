const { Router } = require("express");
const { HttpCode } = require("../utlis/constants");
const { validateAccessToken } = require("../middlewares");

const route = new Router();

const productRouter = (app, productService) => {
  app.use("/products", route);

  route.post("/", validateAccessToken, async (req, res, next) => {
    try {
      const { name } = req.body;
      const { user_id, user_role, user_name } = res.locals.user;

      if (user_name !== "admin" && user_role !== "admin") {
        return res.status(HttpCode.FORBIDDEN).end();
      }

      const newProduct = await productService.save({ name, user_id });

      return res.status(HttpCode.OK).json(newProduct);
    } catch (err) {
      console.log(err);
      next(err);
    }
  });

  route.get("/", validateAccessToken, async (req, res, next) => {
    try {
      const { user_role } = res.locals.user;
      const products = await productService.findAll(user_role);
      console.log(products);
      return res.status(HttpCode.OK).json(products);
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
};

module.exports = productRouter;
