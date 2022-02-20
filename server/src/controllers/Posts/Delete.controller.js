const express = require("express");
const deleteRouter = express.Router();
const { Posts, Likes } = require("../../models");
const { validateToken } = require("../../config/middlewares/AuthMiddleware");


  module.exports=deleteRouter;