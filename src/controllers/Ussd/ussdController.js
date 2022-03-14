
const express = require("express");
const ussd = express();
const cors = require("cors");
const swaggerUI=require("swagger-ui-express");
const YAML=require('yamljs');
const bodyPrser=require('body-parser');
const swaggerJSDocs=YAML.load("./swagger.yaml");
const logger = require('morgan');
const dotenv=require("dotenv").config();
const dairy=require("./src/models/DairyData.json");

ussd.use(express.json());
ussd.use(cors());
ussd.use(logger('dev'))
//app.use(bodyPrser.json());
//app.use(bodyPrser.urlencoded({extended:true}))
ussd.use(express.urlencoded({extended:true}));

ussd.post('*', (req, res,next) => {
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
  } catch (error) {
    next(error);
  }
   
  })

  export default ussd;