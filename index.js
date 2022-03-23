const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUI=require("swagger-ui-express");
const YAML=require('yamljs');
const bodyPrser=require('body-parser');
const swaggerJSDocs=YAML.load("./swagger.yaml");
const logger = require('morgan');
const nodeCron=require('node-cron');
const dotenv=require("dotenv").config();
app.use(express.json());
app.use(cors());

app.use(logger('dev'))
//socket

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
// const breedsRouter=require("./src/routes/Breeds");
// app.use("/api/breeds",breedsRouter);
const livestockRouter=require("./src/routes/Livestock");
const userLivestock=require("./src/routes/UserLivestockRoute");
app.use("/",userLivestock);
app.use("/api/livestock",livestockRouter);
const kholaRoute=require("./src/routes/Khola");
app.use("/",kholaRoute);
//notifications
const pushNotifications=require("./src/routes/PushNotificationsRoute");
app.use("/notifications",pushNotifications);
//
const Products=require("./src/routes/Product");
app.use('/',Products);
//ussd
const ussd=require("./src/routes/Ussd");
app.use("/ussd",ussd);

//for khola report
//whole route is localhost:3001/khola/report/vaccination/:id
//the id is khola id , you neeed to pass khola id 
const kholaReports=require("./src/routes/Reports");
app.use("/",kholaReports);

// ...

// Schedule tasks to be run on the server.no
//roles

app.get('/',(req,res)=>{

  res.send("IWETA SERVER RUNNING");
});

//populate roles
// nodeCron.schedule('* * * * * *', function() {
//     try {
   
    // console.log('running a task every SECOND');
  // } catch (error) {
  //   res.send(500).json({error:error.message});
  // }  
  // });



app.use((error,req,res,next)=>{
  const statusCode=error.status||500
  res.status(statusCode).json({
    message: error.message,
    stack:error.stack
  });
  next(error);
});
const   PORT=process.env.PORT||5000;
// db.sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port http://localhost:${PORT}`);
//   });
// });
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});