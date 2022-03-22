

const express =require("express");
const deleteRouter= express.Router();
const { Comments } = require("../../models");
const { validateToken } = require("../../../middlewares/AuthMiddleware");

deleteRouter.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId } });
    res.json(comments);
  });
  
  deleteRouter.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment);
    res.json(comment);
  });
  
  deleteRouter.delete("/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId;
    console.log("commentid is"+{commentId})
  
    await Comments.destroy({
      where: {
        id: commentId,
      },
    });
  
    res.json("DELETED SUCCESSFULLY");
  });
module.exports=deleteRouter;
