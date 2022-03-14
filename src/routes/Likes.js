const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../../middlewares/AuthMiddleware");

//post comment controller
//localhost:3001/posts
const postComment=require("../controllers/Likes/PostComment.controller");
router.post('/',postComment);

module.exports = router;
