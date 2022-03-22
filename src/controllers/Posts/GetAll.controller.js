const express = require("express");
const getRoute = express.Router();
const { Posts, Likes } = require("../../models");
const { validateToken } = require("../../../middlewares/AuthMiddleware");


getRoute.get("/", validateToken, async (req, res,next) => {
  try {
    const listOfPosts = await Posts.findAll({ include: [Likes] });
    const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
    res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
    
  } catch (error) {
    next(error);
  }
  
  });

  module.exports=getRoute;