const express = require("express");
const userLivestockRouter = express.Router();




const userLivestockController = require("../controllers/UserLivestockController/userLivestockController");

//get all user livestock
userLivestockRouter.get('/api/khola/livestock',userLivestockController);

//get userlivestock by ID of the user livestock
userLivestockRouter.get("/api/khola/livestock/byId/:id",userLivestockController);

userLivestockRouter.get("/api/khola/livestock/Report/:id",userLivestockController);
//userLivestockRouter.get("/api/khola/livestock/Report",userLivestockController);

//post user livestock with with body {userLivestockName,origin,active}
userLivestockRouter.post("/api/khola/livestock/:id",userLivestockController);

//delete userlivestock by ID
userLivestockRouter.delete("/api/khola/livestock/:id",userLivestockController);

//updating
userLivestockRouter.put("/api/khola/livestock/:id",userLivestockController);

module.exports = userLivestockRouter;