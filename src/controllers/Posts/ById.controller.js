const express = require("express");
const byIdRouter = express.Router();
const { Posts, Likes } = require("../../models");

const { validateToken } = require("../../config/middlewares/AuthMiddleware");

 

  module.exports=byIdRouter;
