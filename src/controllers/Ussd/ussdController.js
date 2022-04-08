
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
    let total=0;
    let location;
    let lastUpdate;
    let nameOfKhola;
    let kholaId;
    let length;
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
 length=incoming.length;
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
          response='END Pepani silidapezeke khola la ID imeneyo'
        }
      
        //records=DailyRecordings.findAll({where:{Day:today,KholaId:kholaId}});
        // if(records.length>0){
        //   const totalRecords=records.length;
        if(khola){
          nameOfKhola=khola.KholaName;
          total=khola.Number;
          location=khola.Location;
          lastUpdate=khola.updatedAt;
          response=`END  khola la: ${nameOfKhola}
              Nyama zokwana: ${total},
              dera la :${location},
              kufikira: ${lastUpdate}
                `
        }
       
        //}
       
        }
          
        break;
       case 3:{
         const input=incoming[3];
         if(input==="1"){
           records=DailyRecordings.findAll({where:{KholaId:kholaId}});
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

  }
   if(incoming[0]==="2"){
     length=incoming.length;
    switch (length) {
      case 1:{
        response='CON Enter Khola ID'
        
      }
        
        break;
      case 2:{
    
          kholaId=incoming[1];
        khola= await Khola.findByPk(
          kholaId,
        );
        if(!khola){
          response='END Pepani silidapezeke khola la ID imeneyo'
        }
      
        //records=DailyRecordings.findAll({where:{Day:today,KholaId:kholaId}});
        // if(records.length>0){
        //   const totalRecords=records.length;
        if(khola){
          nameOfKhola=khola.KholaName;
          total=khola.Number;
          location=khola.Location;
          lastUpdate=khola.updatedAt;
          response=`END Summary of khola: ${nameOfKhola}
              total livestock: ${total},
              location :${location},
              updated on: ${lastUpdate}
                `
        }
       
        //}
       
        }
          
        break;
       case 3:{
         const input=incoming[3];
         if(input==="1"){
           records=DailyRecordings.findAll({where:{KholaId:kholaId}});
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


// console.log(`incomings ${incoming}`);


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