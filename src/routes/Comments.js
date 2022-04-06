const express = require("express");
const CommentsRouter = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../../middlewares/AuthMiddleware");



const CommentsController=require("../controllers/Comments/CommentsController");

CommentsRouter.get('/byPost/:postId',CommentsController);
CommentsRouter.get('/All',CommentsController);
CommentsRouter.post('/postComment/:postId',CommentsController);
CommentsRouter.delete('/delete/:commentId',CommentsController);
CommentsRouter.put('/updateComment/:commentId',CommentsController);


module.exports = CommentsRouter;
