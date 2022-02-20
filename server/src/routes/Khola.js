
const express = require("express");
const kholaRouter = require("../controllers/Khola/KholaController");
const Khola = express.Router();

 
const KholaController=require("../controllers/Khola/KholaController");

//register at /khola/create
Khola.post("/khola/create",KholaController);
//all of specific user
Khola.get("/khola/ByUserId/:UserId",kholaRouter);
//find all users  at auth/users
Khola.get("/khola/All",KholaController);

//get a specific khola by id
Khola.get("/khola/ById/:id",KholaController);
//update
Khola.put("/khola/update/:id",KholaController);

//delete  by id at 3001/khola/delete/:id
Khola.delete("/khola/delete/:id",KholaController);



module.exports = Khola;
