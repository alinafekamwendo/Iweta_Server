const express = require("express");
const breedsRouter = express.Router();
const { Breeds: Breeds } = require("../models");
const { validateToken } = require("../../middlewares/AuthMiddleware");

//this is route for breeds
//get all breeds via localhost:3001/api/breeds
breedsRouter.get("/", validateToken, async (req, res) => {
  const listOfBreeds = await Breeds.findAll();
  res.json({ listOfBreeds: listOfBreeds});
});

//get by id
 breedsRouter.get("/byId/:id", async (req, res) => {
 const id = req.params.id;
  const breed = await Breeds.findByPk(id);
  res.json(breed);
 });

breedsRouter.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfBreeds = await Breeds.findAll({ where: {UserId: id}});
  res.json(listOfBreeds);
});


breedsRouter.post("/", validateToken, async (req, res) => {
  console.log("executing posting breed now will console log req body");
  console.log(req.body);
  console.log("finished printing breed req body");
  const Breed = req.body;
  Breed.username = req.user.username;
  Breed.UserId = req.user.id;
  await Breeds.create(Breed);
  res.json(Breed);
});

 breedsRouter.delete("/:breedId", validateToken, async (req, res) => {
  const breedId = req.params.breedId;
  await Breeds.destroy({
    where: {
      id: breedId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = breedsRouter;