const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../../middlewares/AuthMiddleware");
const deleteComment=require("../controllers/Comments/DeleteComment.controller");


//posting comment route
//localhost:3001/comments
const postCommentRouter = require("../controllers/Comments/PostComment.controller");
router.post('/',postCommentRouter);

//get comment by Id
// const getCommentController=require("../controllers/Comments/GetComment.controller");
// router.get('/',getCommentController);
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

//delete comment route
//router.delete('/',deleteComment);
router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});


module.exports = router;
