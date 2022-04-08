const express = require("express");
const postRouter = express.Router();
const { Posts, Likes } = require("../../models");

const { validateToken } = require("../../../middlewares/AuthMiddleware");

postRouter.post("/create", validateToken, async (req, res,next) => {
  try {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }

  });
  postRouter.put("/updatePost/:postId", validateToken, async (req, res,next) => {
    try {
      const post = req.body;
      const postId=req.params.postId;
      
      await Posts.update(post,{
        where:{
          id:postId,
        }
      });
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  
    });

  postRouter.get("/byuserId/:id", async (req, res) => {
    const id = req.params.id;
    const listOfPosts = await Posts.findAll({ where: {UserId: id}, include: [Likes],  });
    res.json(listOfPosts);
  });
  
  
  //deleting is triggering error when using controller, so for now will leave it here
  //this is happening with login too
  postRouter.delete("/delete/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({
      where: {
        id: postId,
      },
    });
  
    res.json("DELETED SUCCESSFULLY");
  });
  
postRouter.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});


  postRouter.get("/All", async (req, res,next) => {
    try {
     const listOfPosts = await Posts.findAll({ include: [Likes] });
    const likedPosts = await Likes.findAll();
    res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
    } catch (error) {
      next(error);
    }
     
    });
  


module.exports=postRouter;