const express = require("express");
const KholaReportController = express.Router();
const nodeCron=require('node-cron');
//io
const { Server } = require("socket.io");


//socket

// const io = new Server({
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// let onlineUsers = [];

// const addNewUser = (username, socketId) => {
//   !onlineUsers.some((user) => user.username === username) &&
//     onlineUsers.push({ username, socketId });
// };

// const removeUser = (socketId) => {
//   onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
// };

// const getUser = (username) => {
//   return onlineUsers.find((user) => user.username === username);
// };

// io.on("connection", (socket) => {
//   socket.on("newUser", (username) => {
//     addNewUser(username, socket.id);
//   });

//   socket.on("sendNotification", ({ senderName, receiverName, type }) => {
//     const receiver = getUser(receiverName);
//     console.log("invoked");
//     io.to(receiver.socketId).emit("getNotification", {
//       senderName,
//       type,
//     });
//   });

//   socket.on("sendText", ({ senderName, receiverName, text }) => {
//     const receiver = getUser(receiverName);
//     io.to(receiver.socketId).emit("getText", {
//       senderName,
//       text,
//     });
//   });

//   socket.on("disconnect", () => {
//     removeUser(socket.id);
//   });
// });

// io.listen(3002)
// KholaReportController.get("/",(req,res,next)=>{
//     try {
//         //nodeCron.schedule('* * * * *', function() {
//           // var http    = require('http').Server(app);
//           //    var io      = require('socket.io')(http);
         
//         //  io.on('connection',function(socket){
//         //   console.log("socket connected");
//         //   //  This event will trigger when any user is connected.
//         //   // You can use 'socket' to emit and receive events.

//         //     });
       
//             //console.log('Notification running a task every SECOND');
//          //});
        
//           res.status(200).json();
//     } catch (error) {
//         next(error);
//     }


//})

 
module.exports = KholaReportController;