const { Router } = require("express");
const { HttpCode } = require("../utlis/constants");
const { userExistanceCheck, authenticateUser, tokenExistanceCheck, validateRefreshToken } = require("../middlewares");
const { makeTokens } = require("../helpers/jwt-helper");

const route = new Router();

const userRouter = (app, userService, refreshTokenService) => {
  app.use("/users", route);

  route.post("/register", userExistanceCheck(userService), async (req, res, next) => {
    try {
      const { name, password, role } = req.body;
      const user = await userService.save({ name, password, role });

      res.status(HttpCode.OK).json(user);
    } catch (err) {
      console.log(err);
      next(err);
    }
  });

  route.post(
    "/login",
    [authenticateUser(userService), tokenExistanceCheck(refreshTokenService)],
    async (req, res, next) => {
      try {
        const { _id: user_id, name: user_name, role: user_role } = res.locals.user;

        const { accessToken, refreshToken } = makeTokens({ user_id, user_name, user_role });

        await refreshTokenService.save({ refreshToken, user_id });

        res.status(HttpCode.OK);
        res.header("accessToken", `${accessToken}`);
        res.header("refreshToken", `${refreshToken}`);
        res.end();
      } catch (err) {
        console.log(err);
        next(err);
      }
    }
  );
  route.post(`/logout`, validateRefreshToken(refreshTokenService), async (req, res, next) => {
    try {
      const refreshToken = res.locals.token;
      const deletedTokenStatus = await refreshTokenService.drop(refreshToken);
      res.status(HttpCode.NO_CONTENT);
      res.end();
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
  route.post(`/refresh`, validateRefreshToken(refreshTokenService), async (req, res, next) => {
    try {
      const { _id: user_id, name: user_name, role: user_role } = res.locals.user;
      const existToken = res.locals.token;
      const { accessToken, refreshToken } = makeTokens({ user_id, user_name, user_role });

      await refreshTokenService.drop(existToken);
      await refreshTokenService.save({ refreshToken, user_id });
      res.status(HttpCode.OK);
      res.header("accessToken", `${accessToken}`);
      res.header("refreshToken", `${refreshToken}`);
      res.end();
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
};

module.exports = userRouter;
