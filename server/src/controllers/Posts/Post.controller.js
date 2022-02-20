const express = require("express");
const postRouter = express.Router();
const { Posts, Likes } = require("../../models");

const { validateToken } = require("../../../middlewares/AuthMiddleware");

postRouter.post("/", validateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post);
    res.json(post);
  });

  module.exports=postRouter;