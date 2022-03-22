const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require("../../middlewares/AuthMiddleware");

//get allcontroller
const all=require("../controllers/Posts/GetAll.controller");
router.get('/',all);

//by id again error
//const byId=require("../controllers/Posts/ById.controller");
//router.get('/',byId);

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

//create controller
const createPost=require("../controllers/Posts/Post.controller");
router.post('/',createPost);

//by user ID not able to pull and display list from the front

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({ where: {UserId: id}, include: [Likes],  });
  res.json(listOfPosts);
});


//deleting is triggering error when using controller, so for now will leave it here
//this is happening with login too
router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});


module.exports = router;