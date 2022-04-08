
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
const {Khola,DailyRecordings}=require("../../models")
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
    let khola;
    let records;
    let totalRecords=0;
    const today=new Date();
    let nameOfKhola;
    let kholaId;
    console.log(`incoming is ${incoming}`);
if(text==="")
{
 response=`CON WELCOME TO i-WETA \n
              1.Chichewa
              2.English`
                  
}
if(text!=="")
{
  
  if(incoming[0]==="1"){
//logic for chichewa
// if(parseInt(incoming[1])>0){

// }
const length=incoming.length;
    switch (length) {
      case 1:{
        response='CON Lowetsani ID ya khola'
        
      }
        
        break;
      case 2:{
    
          kholaId=incoming[1];
        khola= await Khola.findByPk(
          kholaId,
        );
        if(!khola){
          response='END Khola Not found try again'
        }
      
        //records=DailyRecordings.findAll({where:{Day:today,KholaId:kholaId}});
        // if(records.length>0){
        //   const totalRecords=records.length;
        if(khola){
          nameOfKhola=khola.KholaName;
          response=`CON khola ${nameOfKhola}
              1.Today's schedule
              2.Total livestock
                `
        }
       
        //}
       
        }
          
        break;
       case 3:{
         const input=incoming[3];
         if(input==="1"){
           records=DailyRecordings.findAll({where:{Day:today,KholaId:kholaId}});
           if(records){
             totalRecords=records.length;
            response=`END khola: ${nameOfKhola}
            total of ${totalRecords} for today
            `
           }
           if(!records){
            response=`END khola: ${nameOfKhola}
            does not have scheduled activities
            today
            `
           }
         
        
         }
         else if(input==="2"){
           response='END input 2'
         }
       
        }
          
         break;
    
      default:{
        response=`END  Sorry internal error ${length}`
      }
        break;
    }
    }

  }else if(incoming[0]==="2"){
    //logic for english
      if(parseInt(incoming[1])>0){
         
  //  const user= await Users.findAll({where:{username:name,password:pass}}) ;
          
        // response='END your username is '+incoming[0]+'\n Your password is '+incoming[1]
        if(user){
          response=`END found `
        }else if(!user){
          response='END sorry user not found'
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