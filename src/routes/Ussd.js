const { application } = require("express");
const express=require("express");
const ussd=express();


ussd.use(express.json());
ussd.use(express.urlencoded({extended:true}));
const ussdController=require("../controllers/Ussd/ussdController");
ussd.post("/",ussdController);
ussd.get("/get",ussdController);


module.exports =ussd;