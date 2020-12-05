const { Router } = require("express");
const { HttpCode } = require("../utlis/constants");
const { validateAccessToken } = require("../middlewares");

const route = new Router();

const commentRouter = (app, commentService) => {
  app.use("/comments", route);

  route.post("/", validateAccessToken, async (req, res, next) => {
    try {
      const { value } = req.body;
      const { user_id } = res.locals.user;

      const newComment = await commentService.save({ value, user_id });

      return res.status(HttpCode.OK).json(newComment);
    } catch (err) {
      console.log(err);
      next(err);
    }
  });

  route.get("/", validateAccessToken, async (req, res, next) => {
    try {
      const { user_id, user_role, user_name } = res.locals.user;

      if (user_name === "admin" && user_role === "admin") {
        const allComments = await commentService.findAllAdmin();
        return res.status(HttpCode.OK).json(allComments);
      }

      const comments = await commentService.findAll(user_id);

      return res.status(HttpCode.OK).json(comments);
    } catch (err) {
      console.log(err);
      next(err);
    }
  });
};

module.exports = commentRouter;
