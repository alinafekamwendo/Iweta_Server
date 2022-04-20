const express = require("express");
const registerRouter = express.Router();
const { Users ,Officer,Roles} = require("../../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../../../middlewares/AuthMiddleware");
const {validateRole}=require("../../../middlewares/RoleMiddleware");
const { sign } = require("jsonwebtoken");
const role=require("../../models/Role.json");





registerRouter.get("/auth/user", validateToken, (req, res,next) => {

  try {
    res.status(200).json(req.user);  
  } catch (error) {
  next(error);
  }
    
  });

registerRouter.post("/auth/register",async (req, res,next) => {
  try {

      const { username,phone,email,role,address,password } = req.body;
      const Email=email.toLowerCase();
      const userRole=role.toLowerCase();
      const duplicaterUser = await Users.findOne({ where: { username: username ,phone:phone,email:Email} });
    
      if(duplicaterUser) {
        console.log("user already registered");
        return res.status(409).json("user already registered");
      }
        const roles=["farmer","officer","supplier"];
        if(roles.includes(userRole)){
      bcrypt.hash(password, 10).then((hash) => {
        Users.create({
          username: username,
          phone:phone,
          email:Email,
          role:userRole,
          address:address,
          password:hash,
        });
        res.status(200).json("user registred succesfully");
      });
    }else{
      console.log("Invalid role");
      res.status(400).json("INVALID ROLE");
    }
  } catch (error) {
    next(error);
  }
  
});

//register officer
//update
registerRouter.put("/auth/update/:id",validateToken, async (req, res,next) => {
  try {
    const id=req.params.id;
  const { username,role,password} = req.body;

  

  const findId=await Users.findByPk(id);
  if(!findId) {
    console.log("sorry id not found");
    return res.status(404).json('no user with that id');
  }

  bcrypt.hash(password, 10).then((hash) => {
    Users.update({
      username:username,
      role:role,
      password:hash},{
     where:{ id:id}
    });
    res.status(200).json("user updated succesfully");
  });

  } catch (error) {
    next(error);
  }
  
});

registerRouter.post("/auth/login", async (req, res,next) => {
  try {
    console.log(req.body);
    const {username,password } = req.body;
  const user = await Users.findOne({ where: { username: username} });

  if (!user) res.status(403).json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong username or password" });

    const accessToken =sign(
      { username:user.username,
         id: user.id },
      "importantsecret"
      //,{expiresIn:'24h'}
    );
    res.status(200).json({message:"successfull", token: accessToken, username:user.username,email:user.email,role:user.role,id: user.id});
  });
  } catch (error) {
    next(error);
  }
  
});


registerRouter.get("/auth/basicinfo/:id", validateToken,async (req, res,next) => {
  try {
    const id = req.params.id;

const basicInfo = await Users.findByPk(id, {
  attributes: {exclude: ["password "]},});

  res.json(basicInfo);
  } catch (error) {
    next(error);
  }

});

registerRouter.get("/auth/users",async (req, res,next) => {
 try {


  const allUsers = await Users.findAll({attributes: {exclude: ["password "]}});

  
  res.status(200).json(allUsers);
 } catch (error) {
   next(error);
 }
 
  
  });
  registerRouter.delete("/auth/delete/:id", validateToken, async (req, res,next) => {
    try {
      const id = req.params.id;
    await Users.destroy({
      where: {
        id:id,
      },
    });
    res.json("DELETED SUCCESSFULLY");
    } catch (error) {
      next(error);
    }
  
  });



  module.exports=registerRouter;