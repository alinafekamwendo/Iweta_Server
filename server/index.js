const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUI=require("swagger-ui-express");
const YAML=require('yamljs');
const bodyPrser=require('body-parser');
const swaggerJSDocs=YAML.load("./swagger.yaml");
const logger = require('morgan');
const dotenv=require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(logger('dev'))
//app.use(bodyPrser.json());
//app.use(bodyPrser.urlencoded({extended:true}))
app.use(express.urlencoded({extended:true}));


app.use('/api/swagger-docs',swaggerUI.serve,swaggerUI.setup(swaggerJSDocs));

const db = require("./src/models");

// Routers
const postRouter = require("./src/routes/Posts");
app.use("/posts", postRouter);
const commentsRouter = require("./src/routes/Comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./src/routes/Users");
app.use("/", usersRouter);
const likesRouter = require("./src/routes/Likes");
app.use("/likes", likesRouter);
const breedsRouter=require("./src/routes/Breeds");
app.use("/api/breeds",breedsRouter);
const livestockRouter=require("./src/routes/Livestock");
const userLivestock=require("./src/routes/UserLivestockRoute");
app.use("/",userLivestock);
app.use("/api/livestock",livestockRouter);
const kholaRoute=require("./src/routes/Khola");
app.use("/",kholaRoute);

//USSD SESSIONS
const {Users,Khola}=require("./src/models");
app.get('/',(req,res)=>{
  res.send("IWETA API  RUNNING ");

});

// app.post('/',(req,res)=>{
//   console.log("USSD session begins");
//   console.log(req.body);
  
//   const{phoneNumber,text,sessionId}=req.body;
//   let response;
//   const User = Users.findOne({ where: { username:text} });
//   let count=User.length;
//   if(text===""){
//     response='CON WELCOME TO IWETA'
//     response='CON Enter your ID'
//   }
 
 


//   setTimeout(() => {
//     res.send(response);
//     res.send()
//   }, 2000);
// });

app.post('*', (req, res) => {
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
})

const   PORT=process.env.PORT||3001;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
});