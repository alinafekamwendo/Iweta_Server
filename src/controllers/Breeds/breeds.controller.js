const express = require("express");
const breedsRouter = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require("../../config/middlewares/AuthMiddleware");

//get allcontroller
const all=require("../controllers/Posts/GetAll.controller");
breedsRouter.get('/',all);

//by id again error
//const byId=require("../controllers/Posts/ById.controller");
//router.get('/',byId);

breedsRouter.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

//create controller
const createPost=require("../controllers/Posts/Post.controller");
breedsRouter.post('/',createPost);

//by user ID not able to pull and display list from the front

breedsRouter.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({ where: {UserId: id}, include: [Likes],  });
  res.json(listOfPosts);
});

//delete post
breedsRouter.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});


module.exports = breedsRouter;