
const express =require("express");
const CommentsRoute= express.Router();
const { Comments } = require("../../models");
const { validateToken } = require("../../../middlewares/AuthMiddleware");


CommentsRoute.get("/All", async (req, res,next) => {
  try {
    const comments = await Comments.findAll();
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
  
  });
CommentsRoute.get("/byPost/:postId", async (req, res,next) => {
  try {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId } });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
  
  });
  
  CommentsRoute.post("/postComment/:postId", validateToken, async (req,res ,next) => {
    try {
      const comment = req.body;
      const username = req.user.username;
      comment.username = username;
      await Comments.create(comment);
      res.status(200).json(comment);
      console.log("successfully commented");
    } catch (error) {
      next(error)
    }
   
  });
    
  CommentsRoute.put("/updateComment/:commentId", validateToken, async (req,res ,next) => {
    try {
      const id=req.params.commentId;
      const comment = req.body;
      const available=await Comments.findByPk(id);
      if(!available){return res.status(404).json("Comment to be updated not found");}
      //const username = req.user.username;
     // comment.username = username;
      await Comments.update(comment,{
        where:{
          id:id,
        }
        });
      res.status(200).json(comment);
      console.log("successfully updated comment");
    } catch (error) {
      next(error)
    }
   
  });
  
  CommentsRoute.delete("/delete/:commentId", validateToken, async (req, res,next) => {
    try {
      const commentId = req.params.commentId;
      const available=await Comments.findByPk(commentId);
      if(!available){return res.status(404).json("Sorry Comment with  given ID cannot be found");}
  
      await Comments.destroy({
        where: {
          id: commentId,
        },
      });
    
      res.status(200).json("DELETED SUCCESSFULLY");
    } catch (error) {
      next(error);
    }
   
  });
//delete comment route
module.exports=CommentsRoute;
