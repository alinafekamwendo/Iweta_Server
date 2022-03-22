const express = require("express");
const getComment = express.Router();
const { Comments } = require("../../models");
const { validateToken } = require("../../../config/middlewares/AuthMiddleware");

getComment.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId } });
    res.json(comments);
  });
  
module.exports=getComment;


