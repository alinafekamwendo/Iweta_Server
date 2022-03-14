const express = require("express");
const postRouter = express.Router();
const { Comments } = require("../../models");
const { validateToken } = require("../../../middlewares/AuthMiddleware");

postRouter.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment);
    res.json(comment);
  });
   

module.exports=postRouter;