const express = require("express");
const dailyRecordsController = express.Router();
const nodeCron=require('node-cron');
const {Users,DailyRecordings} = require("../../models");
const { validateToken } = require("../../../middlewares/AuthMiddleware");


dailyRecordsController.get("/records/All",validateToken, async (req, res,next) => {
try {
  
const records = await DailyRecordings.findAll();
  res.status(200).json(records);
  console.log(records)

} catch (error) {
  next(error);
}

});

 dailyRecordsController.get("/records/bykhola/:kholaId", async (req, res,next) => {
try {
 
  const id = req.params.kholaId;
  const recordsByKhola = await DailyRecordings.findAll({ where: {UserId: id}});
  res.status(200).json(recordsByKhola);
} catch (error) {
  next(error);
}
 });


 dailyRecordsController.get("/records/byId/:id", async (req, res,next) => {
   try {
    const id = req.params.id;
    const record=await DailyRecordings.findOne({where:{id:id}});
    if(record){
     res.status(200).json(record);
    }else{
      res.status(404).json("Not found");
    }
   } catch (error) {
     next(error);
   }
  
  });


dailyRecordsController.post("/records/create/:id",validateToken, async (req, res,next) => {

  //variables
 
  try {
    const {Day}=req.body;
    const id=req.params.id;
   
    const duplicateRecord=await DailyRecordings.findOne({where:{Day:Day,KholaId:id}});
    console.log(duplicateRecord);
    if(duplicateRecord){return res.status(409).json("already registered")};
  
        const record=req.body;
        record.KholaId=id;
      
       await DailyRecordings.create(record);
            res.status(200).json(record);
            console.log("successful");
  
  
  } catch (error) {
      next(error);
  }
  
  
});


 dailyRecordsController.delete("/records/delete/:id", async (req, res,next) => {
   try {
    const id = req.params.id;
    const record=await DailyRecordings.findByPk(id);
    if(!record){return res.status(404).json("Record with that ID not found");}
    await DailyRecordings.destroy({
      where: {
        id:id,
      },
    });
    res.status(200).json("DELETED SUCCESSFULLY");
   } catch (error) {
     next(error);
   }
 
});

dailyRecordsController.put("/records/update/:id", async (req, res,next) => {
 
try {
  const id = req.params.id;
  const available=await DailyRecordings.findOne({where:{id:id}})
  if(available){
    await DailyRecordings.update(req.body,{
        where: {
          id:id,
        },
      });
      res.status(200).json("updated succesfully");
  }else{
    return res.status(400).json("NO such record available");
  }
  
} catch (error) {
next(error);
}

});


module.exports = dailyRecordsController;