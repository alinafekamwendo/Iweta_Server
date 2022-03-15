const express=require("express");
const ussd = express.Router();
const ussdController=require("../controllers/Ussd/ussdController");


ussd.use(express.json());
ussd.use(express.urlencoded({extended:true}));

ussd.post("/ussd/post",ussdController);
ussd.get("/ussd/get",ussdController);

module.exports =ussd;