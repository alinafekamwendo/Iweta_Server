const express = require("express");
const livestockRouter = express.Router();
const { Livestock: Livestock } = require("../models");
const { validateToken } = require("../../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const { Breeds } = require("../models");

livestockRouter.get("/", validateToken, async (req, res) => {
  const listOfLivestock = await Livestock.findAll();
  res.json({ listOfLivestock: listOfLivestock});
});

 livestockRouter.get("/byId/:id", async (req, res) => {
 const id = req.params.id;
  const breed = await Livestock.findByPk(id);
  res.json(livestock);
 });

livestockRouter.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOflivestock = await Livestock.findAll({ where: {UserId: id}});
  res.json(listOflivestock);
});

livestockRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const listOflivestock = await Livestock.findAll({ where: {BreedId: id}});
  res.json(listOflivestock);
});


livestockRouter.post("/:breedId/:userId", async (req, res) => {
  const{breedId, userId} = req.params
  const{userBreedName, origin, region, active, Dob, id} = req.body
  // const{userName, origin, region, active, Dob, id} = req.body
let userBreadName = {}
  console.log(userId, userBreadName)
  userBreadName.userBreedName = userBreedName;
  userBreadName.userBreedId=id;
  userBreadName.BreedId = breedId
  userBreadName.origin = origin
  userBreadName.region = region
  userBreadName.active = active
  userBreadName.UserId = userId
  userBreadName.Dob = Dob
 await Livestock.create(userBreadName);
  res.json(userBreadName); 
});

 livestockRouter.delete("/:livestockId", validateToken, async (req, res) => {
  const livestockId = req.params.livestockId;
  await Livestock.destroy({
    where: {
      id: livestockId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = livestockRouter;