const express = require("express");
const ReportController = express.Router();
const { UserLivestock: UserLivestocks } = require("../../models");
const { validateToken } = require("../../../middlewares/AuthMiddleware");

ReportController.get("/api/khola/livestock", async (req, res) => {
  const allKholaLivestock = await UserLivestocks.findAll();
  res.status(200).json({ listInThisKhola: allKholaLivestock});
});

 ReportController.get("/api/khola/livestock/byId/:id", async (req, res) => {
 const id = req.params.id;
  const userlivestock = await UserLivestocks.findAll({ where: {KholaId: id}});
  res.status(200).json({ listInThisKhola: userlivestock});
 });

 ReportController.get("/api/khola/livestock/Report/:id", async (req, res,next) => {
   try {
    const id = req.params.id;
    const vaccinated = await UserLivestocks.findAll({ where: {KholaId: id,Vaccinated:true}});
   //const vaccinated = await UserLivestocks.findAll({ where: {Vaccinated:true}});
    const unVaccinated = await UserLivestocks.findAll({ where: {KholaId: id,Vaccinated:false}});
   //const unVaccinated = await UserLivestocks.findAll({ where: {Vaccinated:false}});
    const totalVaccinated=vaccinated.length;
    const totalUnvaccinated=unVaccinated.length;
   // const allLivestock=totalUnvaccinated+totalVaccinated;
   const userlivestock=[{
     "Vaccinated":"vaccinated",
     "Total":totalVaccinated
   },{
     "Vaccinated":"unVaccinated",
     "Total":totalUnvaccinated
   }
 ];
    res.status(200).json({list:userlivestock});
   } catch (error) {
     next(error);
   }
  
  });


ReportController.post("/api/khola/livestock/:id",async (req, res,next) => {
  try {
    const id=req.params.id;
    const {IdentityNumber,type,Breed}=req.body;
      const UserLivestock = req.body;
      const duplicate=await UserLivestocks.findOne({where:{IdentityNumber:IdentityNumber,type:type,Breed:Breed,KholaId:id}})
    // UserLivestock.username = req.user.username;
  

    if(duplicate){return res.status(406).json("duplicates are not allowed")}
  
    UserLivestock.KholaId = id;
  await UserLivestocks.create(UserLivestock);
  res.status(200).json(UserLivestock);
 
  } catch (error) {
    next(error);
  }

  
});



module.exports = ReportController;