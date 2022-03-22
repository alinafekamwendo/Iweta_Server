
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

<<<<<<< HEAD
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
  
=======
const phoneNumber=req.body.phoneNumber;
const serviceCode=req.body.serviceCode;
const text=req.body.text;
const sessionId=req.body.sessionId;
const networkCode=req.body.networkCode;
  try {
    let {sessionId, serviceCode, phoneNumber, text} = req.body
    if (text == '') {
      console.log(req.body);
      // This is the first request. Note how we start the response with CON
      let response = `CON WELCOME TO IWETA
      1. CHICHEWA
      2. ENGLISH`
      res.send(response)
      //console.log(`welcome text ${text}`);
    } else if (text == '1') {
      // Business logic for first level response
      let response = `CON YAMBANI
       Lowetsani nambala ya chinsinsi`
      res.send(response)
      //console.log(`chichewa text ${text}`);
    } else if (text == '2') {
  
        let response = `CON LETS START
        Enter your ID`
        res.send(response)
       // console.log(`english text ${text}`);
     
      
    
      // Business logic for first level response
      
      
    } else if (text == '1*1') {
      // Business logic for first level response
      // This is a terminal request. Note how we start the response with END
      let response = `CON  Sakhani khola
      1.Lilongwe khola
      2.Chinamwali khola
      3.Matawale`
      res.send(response)
      //console.log(`kusakha khola text ${text}`);
    } else if (text == '1*2') {
      // This is a second level response where the user selected 1 in the first instance
      // This is a terminal request. Note how we start the response with END
      let response = `CON Choose khola
      1.Lilongwe
      2.Chinamwali
      3.Matawale`
      res.send(response)
      console.log(`choosing khola text ${text}`);
    } else {
     // console.log(text);
      res.status(400).send('Bad request!')
    }
>>>>>>> parent of f0ab576 (Update ussdController.js)
  } catch (error) {
    next(error);
  }
 
})

  module.exports =ussdController;