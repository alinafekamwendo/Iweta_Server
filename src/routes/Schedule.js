const express = require("express");
const ScheduleController = require("../controllers/Schedule/ScheduleController");
const Schedule = express.Router();



Schedule.post("/schedules/create/:id",ScheduleController);

Schedule.get("/schedules/bykhola/:kholaId",ScheduleController);

Schedule.get("/schedules/All",ScheduleController);

Schedule.get("/schedules/byId/:id",ScheduleController);
//update
Schedule.put("/schedules/update/:id",ScheduleController);

Schedule.delete("/schedules/delete/:id",ScheduleController);

module.exports = Schedule;
