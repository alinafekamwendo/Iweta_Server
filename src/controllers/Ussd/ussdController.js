
const express = require("express");
const ussdController = express();
const cors = require("cors");
const axios=require('axios');
const swaggerUI=require("swagger-ui-express");
const YAML=require('yamljs');
const bodyPrser=require('body-parser');
const swaggerJSDocs=YAML.load("./swagger.yaml");
const logger = require('morgan');
const dotenv=require("dotenv").config();
const {Users}=require("../../models")
//const dairy=require("./src/models/DairyData.json");

ussdController.use(express.json());
ussdController.use(cors());
ussdController.use(logger('dev'))
//

//app.use(bodyPrser.json());
//app.use(bodyPrser.urlencoded({extended:true}))
ussdController.use(express.urlencoded({extended:true}));

ussdController.post('/', async (req, res,next) => {

  let {sessionId,
    serviceCode, 
    phoneNumber, 
    text} = req.body
    let response;
    let incoming=text.split('*');
    console.log(`incoming is ${incoming}`);
if(text==="")
{
 response='CON Enter your username'
}
if(text!=="")
{
  
 console.log(incoming.length);
  if(incoming.length===1){
  response='CON enter your password'
  }else if(incoming.length>1){
      if(parseInt(incoming[1])>0){
          const name=incoming[0];
          const pass=incoming[1];
   const user= await Users.findAll({where:{username:name,password:pass}}) ;
          
        // response='END your username is '+incoming[0]+'\n Your password is '+incoming[1]
        if(user){
          response=`END found `
        }else if(!user){
          response='END sorry user not found'
        }
       
      }
  }else{
    response='END error';
  }


// console.log(`incomings ${incoming}`);
}

setTimeout(()=>{
  console.log(incoming);
  res.send(response);
  res.end();
},2000);
   
  });

ussdController.get("/get",(req,res,next)=>{
  try {
    res.status(200).send("USSD RUNNING");
  
  } catch (error) {
    next(error);
  }
 
})

  module.exports =ussdController;