const express = require("express");
const userLivestockController = express.Router();
const { UserLivestock: UserLivestocks } = require("../../models");
const { validateToken } = require("../../../middlewares/AuthMiddleware");

userLivestockController.get("/api/khola/livestock", async (req, res) => {
  const allKholaLivestock = await UserLivestocks.findAll();
  res.status(200).json({ listOfKholas: allKholaLivestock});
});

 userLivestockController.get("/api/khola/livestock/byId/:id", async (req, res) => {
 const id = req.params.id;
  const userlivestock = await UserLivestocks.findAll({where:{KholaId:id}});
  res.json(userlivestock);
 });


userLivestockController.post("/api/khola/livestock/:id",async (req, res) => {
  const id=req.params.id;
  const {Name,type,Breed}=req.body;
    const UserLivestock = req.body;
    const duplicate=await UserLivestocks.findOne({where:{Name:Name,type:type,Breed:Breed,KholaId:id}})
  // UserLivestock.username = req.user.username;
  if(duplicate){return res.status(406).json("duplicates are not allowed")}

  try {
    UserLivestock.KholaId = id;
  await UserLivestocks.create(UserLivestock);
  res.status(200).json(UserLivestock);
  } catch (error) {
    
  }
  
});


 userLivestockController.delete("/api/khola/livestock/:id", async (req, res) => {
  const livestockID = req.params.id;
  await UserLivestocks.destroy({
    where: {
      id:livestockID,
    },
  });
  res.status(200).json("DELETED SUCCESSFULLY");
});

userLivestockController.put("/api/khola/livestock/:id", async (req, res) => {
  const id = req.params.id;
  await UserLivestocks.update(req.body,{
    where: {
      id:id,
    },
  });
  res.status(200).json("updated succesfully");
});

module.exports = userLivestockController;