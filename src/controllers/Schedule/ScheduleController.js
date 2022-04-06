const express = require("express");
const ScheduleController = express.Router();
const nodeCron=require('node-cron');
const {Schedule:Schedules} = require("../../models");
const { validateToken } = require("../../../middlewares/AuthMiddleware");


ScheduleController.get("/schedules/All", async (req, res,next) => {
try {
  
const schedules = await Schedules.findAll();
  res.status(200).json(schedules);
  console.log(schedules)

} catch (error) {
  next(error);
}

});

 ScheduleController.get("/schedules/bykhola/:kholaId", async (req, res,next) => {
try {
 
  const id = req.params.kholaId;
  const schedulebyKhola = await Schedules.findAll({ where: {UserId: id}});
  res.status(200).json(schedulebyKhola);
} catch (error) {
  next(error);
}
 });


 ScheduleController.get("/schedules/byId/:id", async (req, res,next) => {
   try {
    const id = req.params.id;
    const schedule=await Schedules.findOne({where:{id:id}});
    if(schedule){
     res.status(200).json(schedule);
    }else{
      res.status(404).json("Not found");
    }
   } catch (error) {
     next(error);
   }
  
  });


ScheduleController.post("/schedules/create/:id",validateToken, async (req, res,next) => {

  //variables
 
  try {
    const {Day}=req.body;
    const id=req.params.id;
   
    const duplicateSchedule=await Schedules.findOne({where:{Day:Day,KholaId:id}});
    console.log(duplicateSchedule);
    if(duplicateSchedule){return res.status(409).json("already registered")};
  
        const schedule=req.body;
        schedule.KholaId=id;
       await Schedules.create(schedule);
            res.status(200).json(schedule);
            console.log("successful");
  
  
  } catch (error) {
      next(error);
  }
  
  
});


 ScheduleController.delete("/schedules/delete/:id", async (req, res,next) => {
   try {
    const id = req.params.id;
    await Schedules.destroy({
      where: {
        id:id,
      },
    });
    res.status(200).json("DELETED SUCCESSFULLY");
   } catch (error) {
     next(error);
   }
 
});

ScheduleController.put("/schedules/update/:id", async (req, res,next) => {
 
try {
  const id = req.params.id;
  const available=await Schedules.findOne({where:{id:id}})
  if(available){
    await Schedules.update(req.body,{
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

  // nodeCron.schedule('* * * * *', function() {
  //   try {
   
  //   console.log('running a task every SECOND');
  // } catch (error) {
  //   res.send(500).json({error:error.message});
  // }  
  // });


module.exports = ScheduleController;