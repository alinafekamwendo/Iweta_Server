const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require("../../middlewares/AuthMiddleware");

//get allcontroller
const postController=require("../controllers/Posts/PostController");
router.post('/create',postController);
router.delete('/delete/:postId',postController);
router.get('/byId/:id',postController);
router.get('/byuserId/:id',postController);
router.get('/All',postController);
router.put('/updatePost/:id',postController);

module.exports = router;