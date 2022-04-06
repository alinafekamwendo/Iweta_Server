const express = require("express");
const DailyRecords = require("../controllers/DailyRecords/dailyRecordsController");
const Record = express.Router();



Record.post("/records/create/:id",DailyRecords);

Record.get("records/bykhola/:kholaId",DailyRecords);

Record.get("/records/All",DailyRecords);

Record.get("/records/byId/:id",DailyRecords);
//update
Record.put("/records/update/:id",DailyRecords);

Record.delete("/records/delete/:id",DailyRecords);

module.exports = Record;
