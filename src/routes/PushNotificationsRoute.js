const express = require("express");
const pushNotificationsRoute = express.Router();
const pushNotififcationsController = require("../controllers/Notifications/pushNotificationsController");

pushNotificationsRoute.get("/",pushNotififcationsController);


module.exports = pushNotificationsRoute;