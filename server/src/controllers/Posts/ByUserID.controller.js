const express = require("express");
const byUserID = express.Router();
const { Posts, Likes } = require("../../models");
const { validateToken } = require("../../config/middlewares/AuthMiddleware");

byUserID.get("/byuserId/:id", async (req, res) => {
    const id = req.params.id;
    const listOfPosts = await Posts.findAll({ where: {UserId: id}, include: [Likes],  });
    res.json(listOfPosts);
  });

  module.exports=byUserID;