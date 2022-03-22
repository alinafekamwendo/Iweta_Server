
const express = require("express");
const ussdController = express();
const cors = require("cors");
const swaggerUI=require("swagger-ui-express");
const YAML=require('yamljs');
const bodyPrser=require('body-parser');
const swaggerJSDocs=YAML.load("./swagger.yaml");
const logger = require('morgan');
const dotenv=require("dotenv").config();
const {Users,Khola}=require("../../models")
//const dairy=require("./src/models/DairyData.json");

ussdController.use(express.json());
ussdController.use(cors());
ussdController.use(logger('dev'))
//
// const str = '01-01-2020';

// // get everything after first dash
// const slug = str.substring(str.indexOf('-') + 1); // 01-2020

//app.use(bodyPrser.json());
//app.use(bodyPrser.urlencoded({extended:true}))
ussdController.use(express.urlencoded({extended:true}));

ussdController.post('/', async (req, res,next) => {

  let {sessionId,
    serviceCode, 
    phoneNumber, 
    text} = req.body
    let response;
    let incoming;
if(text==="")
{
 response='CON Enter your username'
}
if(text!=="")
{
  incoming=text.split('*');
 console.log(incoming.length);
  if(incoming.length===1){
  response='CON enter your password'
  }else if(incoming.length>1){
      if(parseInt(incoming[1])>0){
        const password=parseInt(incoming[1]);
        const  username=incoming[0];
        //const user=await Users.findOne({where:{username:username,id:password},attributes: ['id', ['username', 'role']]});
        const khola=await Khola.findAll({where:{UserId:password}});
        console.log(khola);
        response='END your username is '+username+'\n Your password is '+password
      }
  }else{
    response='END error';
  }


// console.log(`incomings ${incoming}`);
}

setTimeout(()=>{
  console.log(`incoming status ${incoming}`);
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