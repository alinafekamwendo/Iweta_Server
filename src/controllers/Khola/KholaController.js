const express = require("express");
const KholaController = express.Router();
const cors=require("cors");
const nodeCron=require('node-cron');
const {CattleVaccinationData,PigsVaccinationData,FeedingData,Khola } = require("../../models");
const { validateToken } = require("../../../middlewares/AuthMiddleware");
const cattleVaccines=require("../../models/CattleVaccines.json");
const pigsVaccines=require("../../models/PigsVaccines.json");
const feeding=require("../../models/FeedingRequirementsData.json");
const dotenv=require("dotenv").config();

KholaController.get("/khola/All", async (req, res,next) => {
try {
  
const makola = await Khola.findAll();
  res.status(200).json({makola});
  console.log(makola)

} catch (error) {
  next(error);
}

});

 KholaController.get("/khola/ByUserId/:id", async (req, res,next) => {
try {
  feeding.map((element) => {
    const id=element.id;
    const populated= FeedingData.findAll({where:{id:id}});
  if(!populated){
    FeedingData.destroy(element)&&CattleVaccinationData.create(element);
    console.log("created");
  }
//   if(populated){

//   console.log("feeding populated");
// }
});
  const id = req.params.id;
  const makolaById = await Khola.findAll({ where: {UserId: id}});
  res.status(200).json(makolaById);
} catch (error) {
  next(error);
}
 });


 
 KholaController.get("/khola/ById/:id", async (req, res,next) => {
   try {
    const id = req.params.id;
    const khola=await Khola.findAll({where:{id:id}});
    if(khola){
     res.status(200).json(khola);
    }else{
      res.status(404).json("Not found");
    }
   } catch (error) {
     next(error);
   }
  
  });

 KholaController.get("/api/khola/livestock/Report/:id", async (req, res,next) => {
   try {
    const id = req.params.id;
    const vaccinated = await Khola.findAll({ where: {KholaId: id,Vaccinated:true}});
   //const vaccinated = await UserLivestocks.findAll({ where: {Vaccinated:true}});
    const unVaccinated = await Khola.findAll({ where: {KholaId: id,Vaccinated:false}});
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
    res.status(200).json({userlivestock});
   } catch (error) {
     next(error);
   }
  
  });


KholaController.post("/khola/create/:id",validateToken, async (req, res,next) => {

  //variables
   
  const id=req.params.id;
  const {KholaName,Location,AnimalType,Breed,Number,DateOfBirth}=req.body;
  const animal=AnimalType.toLowerCase();

//functions populate  vaccine data
if(animal==="cattle"){

    cattleVaccines.map((element) => {
      const id=element.id;
      const populated= CattleVaccinationData.findAll({where:{id:id}});
    if(!populated){
      CattleVaccinationData.destroy(element)&&CattleVaccinationData.create(element);
      console.log("created");
    }
  //   if(populated){
  //   // CattleVaccinationData.destroy({where:{
  //   //   id:element.id
  //   // }})&&CattleVaccinationData.create(element);
  //   // console.log("updated");
  // }
  });

}else if(animal==="pig"){
    pigsVaccines.map((element) => {
      const id=element.id;
      const populated= PigsVaccinationData.findAll({where:{id:id}});
    // if(populated){
    //   // PigsVaccinationData.update(element,{
    //   //   where:{
    //   //     id:element.id,
    //   //   }
    //   // });
    //   console.log("populated");
    // }
    if(!populated){
    PigsVaccinationData.destroy({where:{
      id:element.id
    }})&&PigsVaccinationData.create(element);
    console.log("created");
  }
  });
};
 
const khola = req.body;
  try{
        const duplicate=await Khola.findOne({where:{KholaName:KholaName,Location:Location,AnimalType:AnimalType,Breed:Breed,Number:Number,UserId:id}})
      // UserLivestock.username = req.user.username;
      if(duplicate){
        return res.status(406).json("duplicates are not allowed")
      }
    
      try {
        khola.username=req.user.username;
        khola.UserId=id;
        khola.createdAt=DateOfBirth;
             await Khola.create(khola);
      res.status(200).json(khola);
      
//the following twilio sends sms as a comfirmation of khola created
// //sms code starts here
var sid='';
//||process.env.SID;
 var authToken='';
 //||process.env.AUTH_TOKEN;
  var twilio=require('twilio')(sid,authToken);
  twilio.messages
  .create({
    from:'+16672269487',
    to: '+265881814628',
    body: `You have succesfully created khola.Name: ${KholaName},
     Type: ${AnimalType}, 
     Total Animals: ${Number}`,
  })
  .then((res)=>{console.log("message sent")})
  .catch((err)=>{
    console.log(err)});
  //sms code ends here
 
      } catch (error) {
        
      }
    
  } catch (error) {
    next(error);
  }

  
});


 KholaController.delete("/khola/delete/:id", async (req, res,next) => {
   try {
    const kholaId = req.params.id;
    await Khola.destroy({
      where: {
        id:kholaId,
      },
    });
    res.status(200).json("DELETED SUCCESSFULLY");
   } catch (error) {
     next(error);
   }
 
});

KholaController.put("/khola/update/:id", async (req, res,next) => {
 
try {
  const id = req.params.id;
  
  await Khola.update(req.body,{
    where: {
      id:id,
    },
  });
  res.status(200).json("updated succesfully");
} catch (error) {
next(error);
}

});

  // nodeCron.schedule('* * * * *', function() {
  //   try {
   
  //   console.log('running a task every SECOND');
  // } catch (error) {
  //   res.send(500).json({error:error.message});
  // }  
  // });


module.exports = KholaController;